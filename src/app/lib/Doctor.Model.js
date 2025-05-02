import mongoose, { Schema } from "mongoose";

const DoctorSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    specialist: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    checkupfee: {
      type: Number,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    worktype: {
      type: String,
      required: true,
    },
    language: {
      type: [String],
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Doctor = mongoose.models.Doctor || mongoose.model("Doctor", DoctorSchema);
export default Doctor;
