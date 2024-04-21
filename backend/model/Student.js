import mongoose from "mongoose";
const schema = mongoose.Schema;

const userSchema = new schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    pno: { type: String, required: true },
    dob: { type: String, required: true },
    password: { type: String, required: true },
    sessions: [
      {
        session_id: { type: String, required: true },
        date: { type: String, required: true },
        time: { type: String, required: true },
        name: { type: String, required: true },
        duration: { type: String, required: true },
        distance: { type: String, required: true },
        radius: { type: String, required: true },
        student_location: { type: String, required: true },
        image: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

export const Student = mongoose.model("student", userSchema);
