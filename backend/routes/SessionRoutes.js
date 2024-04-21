import { Router } from "express";
const router = Router();
import upload from "../middleware/Multer.js";
import SessionController from "../controllers/SessionController.js";
import JWT from "../middleware/JWT.js";

//login
router.post("/create", JWT.verifyToken, SessionController.CreateNewSession);
//get sessions
router.post(
  "/getSessions",
  JWT.verifyToken,
  SessionController.GetAllTeacherSessions
);
//get QR
router.post("/getQR", JWT.verifyToken, SessionController.GetQR);
//attend session
router.post(
  "/attend_session",
  JWT.verifyToken,
  upload.single("image"),
  SessionController.AttendSession
);
//get student sessions
router.post(
  "/getStudentSessions",
  JWT.verifyToken,
  SessionController.GetStudentSessions
);

export default router;
