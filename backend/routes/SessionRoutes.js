import { Router } from "express";
const router = Router();
import { Teacher } from "../model/Teacher.js";
import querystring from "querystring";

//login
router.post("/create", async (req, res) => {
    let { session_id, name, duration, location, radius } = req.body;
    let newSession = {
        session_id,
        name,
        duration,
        location,
        radius,
    };

    try {
        const teacher = await Teacher.findOne({ email: req.body.email });
        await Teacher.findOneAndUpdate({ email: req.body.email }, { $push: { sessions: newSession } });
        res.status(200).json({ url: `http://localhost:3000/login?${querystring.stringify({ session_id })}`, message: "Session created successfully" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


export default router;
