import mongoose from "mongoose";
const schema = mongoose.Schema; //create a schema

const userSchema = new schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        pno: { type: String, required: true },
        dob: { type: String, required: true },
        password: { type: String, required: true },
    },
    { timestamps: true }
);

export const Student = mongoose.model("student", userSchema);
