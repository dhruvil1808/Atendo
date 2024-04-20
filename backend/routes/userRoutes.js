import { Router } from "express";
const router = Router();
import UserController from "../controllers/UserController.js";


//login
router.post("/signin", UserController.Login);
// Create a new user
router.post("/signup", UserController.Signup);

export default router;
