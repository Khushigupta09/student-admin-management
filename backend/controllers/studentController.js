const Student = require("../models/Student");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerStudent = async (req, res) => {
  try {
    const { name, email, password, course, phone } = req.body;
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: "Student already registered" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const student = new Student({
      name,
      email,
      password: hashedPassword,
      course,
      phone,      
      isApproved: false,
    });
    let result = await student.save();
    result = result.toObject();
    delete result.password;
    res
      .status(201)
      .json({
        message: "Registration successful. Await admin approval.",
        student: result,
      });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ error: "Registration failed" });
  }
};

const loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const student = await Student.findOne({ email });

    if (!student) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (!student.isApproved) {
      return res
        .status(403)
        .json({
          message:
            "Your account is not approved yet. Please wait for admin approval.",
        });
    }

    const isPasswordMatch = await bcrypt.compare(password, student.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: student._id },
      process.env.JWT_SECRET || "student_secret",
      { expiresIn: "1h" }
    );

    res
      .status(200)
      .json({
        message: "Login successful",
        token,
        student: { id: student._id, name: student.name, email: student.email },
      });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Login failed" });
  }
};

// Get Student Profile
const getStudentProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.user.id).select("-password"); // Exclude password
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(student);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Soft Delete Student Profile
const softDeleteStudentProfile = async (req, res) => {
  try {
    await Student.findByIdAndUpdate(req.user.id, { status: "Inactive" });
    res
      .status(200)
      .json({ message: "Profile deleted (soft delete) successfully" });
  } catch (error) {
    console.error("Error deleting profile:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  registerStudent,
  loginStudent,
  getStudentProfile,
  softDeleteStudentProfile,
};
