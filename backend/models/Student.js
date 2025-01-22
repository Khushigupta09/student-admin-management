const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: { type: String, required: true, unique: true },
  course: String,
  password: String,
  isApproved: {
    type: Boolean,
    default: false,
  },
  
  isDeleted: {
    type: Boolean,
    default: false,  // New field for soft delete
  },
  status: { type: String, default: 'Active' },
},  { timestamps: true });

module.exports = mongoose.model('students', studentSchema);

