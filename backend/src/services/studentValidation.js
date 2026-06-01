const Tc_model = require("../models/studentModel")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.student_login = async (req, res) => {

    try {
            const { student_ID, student_Password, password } = req.body;
            // frontend may send 'password' or 'student_Password'
            const providedPassword = student_Password || password;
            if (!student_ID || !providedPassword) {
                return {
                    message: "Student ID and password are required",
                    success: false
                }
            }
        const validStudent = await Tc_model.findOne({ student_ID })
        if (!validStudent) {
            return {
                message: "student data not found",
                success: false
            }
        }
        const isPasswordValid = await bcrypt.compare(
            providedPassword,
            validStudent.student_password
        );

        if (!isPasswordValid) {
            return {
                message: "Invalid ID or password",
                success: false
            }
        }

        const token = jwt.sign({ id: validStudent._id }, process.env.SECRET_KEY);
        if (!token) {
            return res.json({ message: " Token generation failed" });
        }
        // Set the token to cookies
        res.cookie("token", token);
        const authKeyInsertion = await Tc_model.findOneAndUpdate(
            { _id: validStudent._id },
            { auth_key: token },
            { new: true }
        );

        if (!authKeyInsertion) {
            return res.json({ message: "Token updation failed" });
        }

        return {
            message: "Student logged in successfully",
            success: true,
            token: token,
            // Provide both identifiers: external student_ID and internal Mongo _id
            studentId: validStudent.student_ID, // frontend expects this for /TC_view/:student_ID
            studentObjectId: validStudent._id
        };

    } catch (error) {
        console.log(error);
        return {
            message: error.message || "Internal server error",
            success: false,
        }

    }
}