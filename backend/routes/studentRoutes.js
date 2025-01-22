const express = require('express');
const { registerStudent, loginStudent, getStudentProfile, softDeleteStudentProfile, } = require('../controllers/studentController');
const authenticateStudent = require('../middleware/authenticateStudent');  
const router = express.Router();


router.post('/register', registerStudent);


router.post('/login', loginStudent);


router.get('/profile', authenticateStudent, getStudentProfile);


router.put('/delete', authenticateStudent, softDeleteStudentProfile);

//router.get('/verify-email', verifyEmail);

module.exports = router;
