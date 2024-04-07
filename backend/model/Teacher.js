import mongoose from "mongoose";
const schema = mongoose.Schema; //create a schema

const userSchema = new schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        pno: { type: String, required: true },
        dob: { type: String, required: true },
        password: { type: String, required: true },
        sessions: [{
            session_id: { type: String, required: true },
            date: { type: Date, required: true },
            name: { type: String, required: true },
            duration: { type: String, required: true },
            location: { type: String, required: true },
            radius: { type: String, required: true },
        }],
    },
    { timestamps: true }
);

export const Teacher = mongoose.model("teacher", userSchema);
