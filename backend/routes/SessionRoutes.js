import { Router } from "express";
const router = Router();
import { Teacher } from "../model/Teacher.js";
import querystring from "querystring";

function getQR(session_id) {
    let url = `http://localhost:3000/login?${querystring.stringify({
        session_id,
    })}`;
    return url;
}

//login
router.post("/create", async (req, res) => {
    let { session_id, name, duration, location, radius, date } = req.body;
    let newSession = {
        session_id,
        date,
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
            url: getQR(session_id),
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
        let url = getQR(req.body.session_id);
        res.status(200).json({ url });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

export default router;
