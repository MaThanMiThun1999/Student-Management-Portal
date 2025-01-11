const express = require("express");
const router = express.Router();
const studentController = require("../controllers/student.controller");

// Create a new student
router.post('/create', studentController.createStudent);
// Get all students
router.get('/all', studentController.getAllStudents);
// Get student by ID
router.get('/:id', studentController.getStudentById);
// Update an existing student
router.put("/:id", studentController.updateStudent);
// Delete a student
router.delete("/:id", studentController.deleteStudent);
module.exports = router;