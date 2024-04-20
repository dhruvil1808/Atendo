import { Router } from "express";
const router = Router();
import upload from "../middleware/multer.js";
import SessionController from "../controllers/SessionController.js";


//login
router.post("/create", SessionController.CreateNewSession);
//get sessions
router.post("/getSessions", SessionController.GetAllTeacherSessions);
//get QR
router.post("/getQR", SessionController.GetQR);
//attend session
router.post("/attend_session", upload.single('image'), SessionController.AttendSession);
//get student sessions
router.post("/getStudentSessions", SessionController.GetStudentSessions);

export default router;
