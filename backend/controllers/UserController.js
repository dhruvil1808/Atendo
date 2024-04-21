import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";
import { Student } from "../model/Student.js";
import { Teacher } from "../model/Teacher.js";
import JWT from "../middleware/JWT.js";

//login
async function Login(req, res) {
  const { email, password } = req.body;
  let type = "student";
  //check if user is a student
  let user = await Student.findOne({ email });
  if (!user) {
    type = "teacher";
    user = await Teacher.findOne({ email });
  }

  if (user) {
    if (user.password === password) {
      const token = JWT.generateToken({ email: user.email });
      user.type = type;
      res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        })
        .status(200)
        .json({ user: user, type: type, token: token });
    } else {
      res.status(400).json({ message: "Invalid email or password" });
    }
  } else {
    res.status(400).json({ message: "No such User" });
  }
}

// Create a new user
async function Signup(req, res) {
  const { name, email, pno, dob, password, type } = req.body;
  if (type === "student") {
    const user = new Student({
      name: name,
      email: email,
      pno: pno,
      dob: dob,
      password: password,
    });
    try {
      const existingUser = await Student.findOne({ email: email }).exec();
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      } else {
        const newUser = await user.save();
        res.status(201).json(newUser);
      }
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  } else {
    const user = new Teacher({
      name: name,
      email: email,
      pno: pno,
      dob: dob,
      password: password,
    });
    try {
      const existingUser = await Teacher.findOne({ email: email }).exec();
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      } else {
        const newUser = await user.save();
        res.status(201).json(newUser);
      }
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
}

function SendMail(req, res) {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "OTP for registration",
    text: `Your OTP is ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(400).json({ message: error.message });
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).json({ message: "OTP sent successfully", otp: otp });
    }
  });
}

const UserController = {
  Login,
  Signup,
  SendMail,
};

export default UserController;
