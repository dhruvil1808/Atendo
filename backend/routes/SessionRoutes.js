import { Router } from "express";
const router = Router();
import { Teacher } from "../model/Teacher.js";
import { Student } from "../model/Student.js";
import querystring from "querystring";

function getQR(session_id, email) {
    let url = `http://localhost:3000/login?${querystring.stringify({
        session_id,
        email,
    })}`;
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
        let url = getQR(req.body.session_id, req.body.email);
        res.status(200).json({ url });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//attend session
router.post("/attend_session", async (req, res) => {
    let { session_id, teacher_email, regno, IP, student_email, Location, image } = req.body;
    try {
        let present = false;
        const teacher = await Teacher.findOne({ email: teacher_email });
        let session_details = {};
        teacher.sessions.map((session) => {
            if (session.session_id === session_id) {
                session_details = {
                    session_id: session.session_id,
                    teacher_email: teacher.email,
                    name: session.name,
                    date: session.date,
                    time: session.time,
                    duration: session.duration,
                    location: session.location,
                    radius: session.radius,
                };
                session.attendance.map((student) => {
                    if (student.regno === regno || student.student_email === student_email) {
                        present = true;
                    }
                });
                if (!present) {
                    session.attendance.push({
                        regno,
                        image,
                        IP,
                        student_email,
                        Location,
                    });
                }
            }
        });
        if (!present) {
            await Teacher.findOneAndUpdate(
                { email: teacher_email },
                { sessions: teacher.sessions }
            );
            const student = await Student.findOneAndUpdate(
                { email: student_email },
                { $push: { sessions: session_details } }
            );
            res.status(200).json({ message: "Attendance marked successfully" });
        }
        else {
            res.status(200).json({ message: "Attendance already marked" });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//get student sessions
router.post("/getStudentSessions", async (req, res) => {
    try {
        const student = await Student.findOne({
            email: req
                .body.email
        });
        res.status(200).json({ sessions: student.sessions });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

export default router;
