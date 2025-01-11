const studentModel = require("../models/student.model");
const { handleError, sendSuccessResponse } = require("../utils/responseUtils");

module.exports = {
    createStudent: async (req, res, next) => {
      const { studentId, firstName, lastName, email, dateOfBirth, gradeLevel, parentName, parentPhoneNumber, address, phoneNumber } = req.body;
        try {
            if (!studentId || !firstName || !lastName || !email || !dateOfBirth || !gradeLevel) {
                return handleError(next, "All fields are required", 400);
              }

          const existingStudent = await studentModel.findOne({ studentId });
            if (existingStudent) {
            return handleError(next, "Student ID already exists", 400);
            }

          const newStudent = await studentModel.create({
            studentId,
            firstName,
            lastName,
            email,
            phoneNumber,
              dateOfBirth,
              gradeLevel,
              parentName,
              parentPhoneNumber,
              address
          });
            return sendSuccessResponse(
            res,
            "Student created successfully",
            newStudent,
            201
            );
        } catch (error) {
            return handleError(
              next,
                error.message || "Server Error Comes in Create Student Controller",
                500
            );
        }
    },
  
  getAllStudents: async (req, res, next) => {
    try {
      const students = await studentModel.find();
      return sendSuccessResponse(res, "All students fetched successfully", students);
    } catch (error) {
      return handleError(next, "Error fetching students", 500);
    }
  },
  getStudentById: async (req, res, next) => {
    const { id } = req.params;
    try {
      const student = await studentModel.findById(id);
      if (!student) {
        return handleError(next, "Student not found", 404);
      }
      return sendSuccessResponse(res, "Student fetched successfully", student);
    } catch (error) {
      return handleError(next, "Error fetching student", 500);
    }
  },

    updateStudent: async (req, res, next) => {
      const { id } = req.params;
      try{
        const updateStudent = await studentModel.findByIdAndUpdate(id, req.body, {new: true});
        if(!updateStudent){
          return handleError(next, "Student not found", 404);
        }
         return sendSuccessResponse(res, "Student updated successfully", updateStudent);
      } catch(error){
         return handleError(next, "Error updating student", 500);
      }
  },

    deleteStudent: async (req, res, next) => {
      const { id } = req.params;
      try {
        const deletedStudent = await studentModel.findByIdAndDelete(id);
        if (!deletedStudent) {
          return handleError(next, "Student not found", 404);
        }
        return sendSuccessResponse(res, "Student deleted successfully", {});
      } catch (error) {
        return handleError(next, "Error deleting student", 500);
      }
    },
};