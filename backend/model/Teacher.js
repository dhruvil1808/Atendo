import mongoose from "mongoose";
const schema = mongoose.Schema; //create a schema

const userSchema = new schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        pno: { type: String, required: true },
        dob: { type: String, required: true },
        password: { type: String, required: true },
        sessions: {
            type: Array,
            default: [
                {
                    date: { type: String, required: true },
                    time: { type: String, required: true },
                    duration: { type: Number, required: true },
                    subject: { type: String, required: true },
                    radius: { type: Number, required: true },
                    location: {
                        type: {
                            type: String,
                            enum: ["Point"],
                            required: true,
                        },
                        coordinates: {
                            type: [Number],
                            required: true,
                        },
                    },
                    students: {
                        type: Array, default: [
                            {
                                name: "",
                                email: "",
                                pno: "",
                            },
                        ],
                        required: false,
                    },
                },
            ],
            required: false,
        },
    },
    { timestamps: true }
);

export const Teacher = mongoose.model("teacher", userSchema);
