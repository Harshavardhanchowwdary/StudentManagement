const Students = require('../models/StudentSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Register = async (req, res) => {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password || !phone) {
        return res.status(401).json({ success: false, message: "Please Fill the required Fields" })
    }

    if (password.length <= 6) {
        return res.status(401).json({ success: false, message: "Password is to small" });
    }

    const ExistingStudent = await Students.findOne({ name: name })

    if (ExistingStudent) {
        return res.status(401).json({ success: false, message: "User Has Already Exists" })
    }
    const ExistingStudentemail = await Students.findOne({ email: email })

    if (ExistingStudentemail) {
        return res.status(401).json({ success: false, message: "Email has already Exists" })
    }
    // Encrypting Password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newStudent = await Students({
        name, email, password: hashedPassword, phone
    })


    await newStudent.save();

    // jwt Token Generation
    const token = await jwt.sign({ id: newStudent._id }, process.env.JWT_SECRET_TOKEN, { expiresIn: '7d' });

    res.status(200).json({ success: true, message: "Student Regsitered Successfully", token });
    console.log("Student Registered Successfully", req.body, token)

}
const getAllStudents = async (req, res) => {
    try {
        const students = await Students.find();   // fetch all documents
        res.status(200).json({ success: true, data: students });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error });
    }
};

const Deletestudent = async (req, res) => {
    try {
        const { id } = req.params;

        const student = await Students.findById(id);

        if (!student) {
            return res.status(404).json({ success: false, message: "Student Not Found" }); // ❌ use 404, not 401
        }

        await Students.findByIdAndDelete(id);

        res.status(200).json({ success: true, message: "Student deleted successfully" });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting student",
            error: error.message,
        });
    }
};

const UpdateStudent = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if student exists
        const student = await Students.findById(id);
        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student Not Found",
            });
        }

        const { name, email, password, phone } = req.body;

        // Validation
        if (!name || !email || !password || !phone) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields",
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters",
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update student
        const updatedStudent = await Students.findByIdAndUpdate(
            id,
            {
                name,
                email,
                phone,
                password: hashedPassword,
            },
            { new: true } // ✅ returns updated document
        );

        res.status(200).json({
            success: true,
            message: "Student updated successfully",
            student: updatedStudent,
        });
    } catch (error) {
        console.error("Update Error:", error.message);
        res.status(500).json({
            success: false,
            message: "Server error while updating student",
            error: error.message,
        });
    }
};

module.exports = {
    Register,
    getAllStudents,
    Deletestudent,
    UpdateStudent
}
