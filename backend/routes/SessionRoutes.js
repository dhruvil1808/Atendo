import { Router } from "express";
const router = Router();
import { Teacher } from "../model/Teacher.js";
import querystring from "querystring";
import multer from "multer";
import fs from "fs";
import path from "path";

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

var upload = multer({ storage: storage });

function getQR(session_id, email) {
    let url = `http://localhost:3000/login?${querystring.stringify({ session_id, email })}`;
    return url;
}

//login
router.post("/create", async (req, res) => {
    let { session_id, name, duration, location, radius, date, time } = req.body;
    let newSession = {
        session_id,
        date,
        time,
        name,
        duration,
        location,
        radius,
    };

    try {
        const teacher = await Teacher.findOne({ email: req.body.email });
        await Teacher.findOneAndUpdate(
            { email: req.body.email },
            { $push: { sessions: newSession } }
        );

        res.status(200).json({
            url: getQR(session_id, teacher.email),
            message: "Session created successfully",
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
//get sessions
router.post("/getSessions", async (req, res) => {
    try {
        const teacher = await Teacher.findOne({ email: req.body.email });
        res.status(200).json({ sessions: teacher.sessions });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
//get QR
router.post("/getQR", async (req, res) => {
    try {
        console.log(req.body.session_id);
        console.log(req.body.email);
        let url = getQR(req.body.session_id, req.body.email);
        res.status(200).json({ url });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//attend session
router.post("/attend_session", upload.single("image"), async (req, res) => {
    let { session_id, teacher_email, regno, IP, student_email, Location } = req.body;
    let image = fs.readFileSync(path.join('./public/uploads', req.file.filename));
    let imagetype = req.file.mimetype;
    let data = {
        data: image,
        contentType: imagetype
    }
    //delete the image
    fs.unlink(path.join('./public/uploads', req.file.filename), (err) => {
        if (err) throw new Error(err);
    }
    );
    console.log(req.body);
    try {
        const teacher = await Teacher.findOne({ email: teacher_email });
        teacher.sessions.map((session) => {
            if (session.session_id === session_id) {
                session.attendance.push({
                    regno,
                    image: data,
                    IP,
                    student_email,
                    Location,
                });
            }
        });
        await Teacher.findOneAndUpdate(
            { email: teacher_email },
            { sessions: teacher.sessions }
        );
        res.status(200).json({ message: "Attendance marked successfully" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

export default router;
