const express = require('express');
const router = express.Router();
const { adminLogin, getAllStudents, approveStudent } = require('../controllers/adminController');
const Student = require('../models/Student');

router.post('/login', adminLogin);
router.get('/students', async (req, res) => {
    try {
        const students = await Student.find({ isDeleted: false });  // ✅ Exclude soft-deleted students
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});
router.put('/approve/:id', approveStudent);
router.put('/delete-student/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const student = await Student.findByIdAndUpdate(id, { isDeleted: true }, { new: true });

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.status(200).json({ message: 'Student deleted successfully', student });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting student', error });
    }
});



module.exports = router;