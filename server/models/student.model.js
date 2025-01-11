const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: [true, "Student ID is required"],
    unique: true,
    trim: true,
  },
  firstName: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/\S+@\S+\.\S+/, "Please provide a valid email address"],
  },
  phoneNumber: {
    type: String,
    trim: true,
  },
  dateOfBirth: {
      type: Date,
      required: true,
  },
  gradeLevel:{
    type: String,
    required: [true, "Grade level is required"],
    trim: true
  },
    parentName:{
        type: String,
        trim: true,
    },
    parentPhoneNumber:{
      type: String,
      trim: true,
    },
  address:{
      type: String,
      trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Student", studentSchema);