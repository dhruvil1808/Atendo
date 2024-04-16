import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes.js";
import SessionRoutes from "./routes/SessionRoutes.js";



// Initialize the app
const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB;
// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
// Connect to MongoDB
mongoose
    .connect(MONGODB_URI, {})
    .then(() => {
        console.log("Database Connected");
    })
    .catch((err) => console.log(err));

// Routes
app.use("/users", userRoutes);
app.use("/sessions", SessionRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
