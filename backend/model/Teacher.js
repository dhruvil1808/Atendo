import mongoose from "mongoose";
const schema = mongoose.Schema;

const userSchema = new schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    pno: { type: String, required: true },
    dob: { type: String, required: true },
    password: { type: String, required: true }, // Password save as hash
    sessions: [
      {
        session_id: { type: String, required: true },
        date: { type: Date, required: true },
        time: { type: String, required: true },
        name: { type: String, required: true },
        duration: { type: String, required: true },
        location: { type: String, required: true },
        radius: { type: String, required: true },
        attendance: [
          {
            regno: { type: String, required: true },
            image: { type: String, required: true },
            IP: { type: String, required: true },
            date: { type: Date, required: true },
            student_email: { type: String, required: true },
            Location: { type: String, required: true },
            distance: { type: String, required: true },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

export const Teacher = mongoose.model("teacher", userSchema);
