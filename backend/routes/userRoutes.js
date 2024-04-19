import { Router } from "express";
const router = Router();
import { Student } from "../model/Student.js";
import { Teacher } from "../model/Teacher.js";


//login
router.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    let type = "student"
    //check if user is a student
    let user = await Student.findOne({ email });
    if (!user) {
        type = "teacher"
        user = await Teacher.findOne({ email });
    }

    if (user) {
        if (user.password === password) {
            user.type = type;
            res.send({ "user": user, "type": type });
        } else {
            res.status(400).json({ message: "Invalid email or password" });
        }
    } else {
        res.status(400).json({ message: "No such User" });
    }
});

// Create a new user
router.post("/signup", async (req, res) => {
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
});

// // Get all users
// router.get("/getAllUsers", async (req, res) => {
//     try {
//         const users = await User.find();
//         res.json(users);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// // Get a specific user
// router.get("/getUserByEmail", async (req, res) => {
//     let user = await User.findOne({ email: req.body.email });
//     res.json(user);
// });

// router.post("/saveToken", async (req, res) => {
//     console.log("hello");
//     const { token, refresh_token, expires_in, auth } = req.body;
//     try {
//         const existingUser = await User.findOne({ email: auth }).exec();
//         if (existingUser) {
//             if (existingUser.spotifyexpires_on < new Date()) {
//                 existingUser.spotifytoken = token;
//                 existingUser.spotifyrefresh_token = refresh_token;
//                 //get today's date
//                 let date = new Date();
//                 //add the number of seconds to the date
//                 date.setSeconds(date.getSeconds() + expires_in);
//                 existingUser.spotifyexpires_on = date;
//                 const newUser = await existingUser.save();
//                 res.status(201).json(newUser);
//             } else {
//                 //token still valid
//                 res.status(201).json({ message: "Token still Valid" });
//             }
//         } else {
//             res.status(400).json({ message: "User does not exist" });
//         }
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// });

// Update a user
// router.patch('/users/:id', getUser, async (req, res) => {
//     if (req.body.name != null) {
//         res.user.name = req.body.name;
//     }
//     if (req.body.email != null) {
//         res.user.email = req.body.email;
//     }
//     if (req.body.pno != null) {
//         res.user.pno = req.body.pno;
//     }
//     if (req.body.dob != null) {
//         res.user.dob = req.body.dob;
//     }
//     if (req.body.password != null) {
//         res.user.password = req.body.password;
//     }
//     try {
//         const updatedUser = await res.user.save();
//         res.json(updatedUser);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// });

// Delete a user
// router.delete('/users/:id', getUser, async (req, res) => {
//     try {
//         await res.user.remove();
//         res.json({ message: 'User deleted' });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

export default router;
