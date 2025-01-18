const express = require('express');
const { registerStudent, loginStudent, getStudentProfile, softDeleteStudentProfile } = require('../controllers/studentController');
const authenticateStudent = require('../middleware/authenticateStudent');  // ✅ Import middleware
const router = express.Router();

// Student Registration Route (No auth needed)
router.post('/register', registerStudent);

// Student Login Route (No auth needed)
router.post('/login', loginStudent);

// Student Profile Route (Protected)
router.get('/profile', authenticateStudent, getStudentProfile);

// Soft Delete Profile Route (Protected)
router.put('/delete', authenticateStudent, softDeleteStudentProfile);

module.exports = router;
