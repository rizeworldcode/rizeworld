const jwt = require("jsonwebtoken");
const admin_model = require("../../models/referreledModel");
const student_model = require("../../models/studentModel");

exports.get_referrer_dashboard_data = async (req, res) => {
    try {
        const referrerId = req.user._id;
        
        const referrer = await admin_model.findById(referrerId);
        if (!referrer) {
            return {
                success: false,
                message: "Referrer not found",
            };
        }

        const students = await student_model.find({ referred_by_id: referrerId })
            .select('student_name phone selected_course_name created_at student_ID')
            .sort({ created_at: -1 });

        return {
            success: true,
            data: {
                stats: {
                    totalReferred: students.length,
                    totalEarnings: parseFloat(referrer.amount.total || 0),
                    paidAmount: parseFloat(referrer.amount.paid || 0),
                    pendingAmount: parseFloat(referrer.amount.pending || 0)
                },
                students: students.map(s => ({
                    id: s._id,
                    studentID: s.student_ID,
                    name: s.student_name,
                    phone: s.phone,
                    course: s.selected_course_name,
                    date: s.created_at
                }))
            }
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Internal server error",
        };
    }
};

exports.referred_login = async (req, res) => {
    try {
        
        const password = process.env.REFFERLED_PASSWORD;


        const {frontend_password,frontend_email} = req.body;
        const refferlData = await admin_model.findOne({ email: frontend_email });
        if(!refferlData){
            return {
                success: false,
                message: "Invalid email or not registered!",
            };
        }
        if (frontend_password !== password) {
            return {
                success: false,
                message: "Invalid password",
            };
        }
        if (!refferlData) {         
            return {
                success: false,
                message: "Invalid email or not registered!",
            };
        }
        const token = jwt.sign({ id: refferlData._id }, process.env.SECRET_KEY);
        if (!token) {
            return { success: false, message: " Token generation failed" };
        }
        // Set the token to cookies
        res.cookie("token", token);
        const authKeyInsertion = await admin_model.findOneAndUpdate(
            { _id: refferlData._id },
            { auth_key: token },
            { new: true }
        );

        if (!authKeyInsertion) {
            return { success: false, message: "Token updation failed" };
        }

        return {
            message: "User logged in successfully",
            success: true,
            token: token,
            userId: refferlData._id
        };
    } catch (error) {
        console.log(error);
        return {
            message: error.message || "Internal server error",
            success: false,
        };
    }
};

exports.referred_logout = async (req, res) => {
    try {

        if (!req.user) {
            return {
                success: false,
                message: "Unauthorized",
            };
        }
        // Remove auth_key from the referred record so the token can't be reused    
        try {
            // prefer unsetting the field, but setting to null is also acceptable
            await admin_model.findByIdAndUpdate(req.user._id, { $unset: { auth_key: "" } });
        } catch (dbErr) {
            console.log('Failed to remove auth_key on logout:', dbErr);
            // don't block logout response if DB update fails
        }

        // Invalidate the token (token blacklist can be implemented here if needed)
        res.clearCookie("token");
        return {
            success: true,
            message: "Logged out successfully",
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Internal server error",
        };
    }
};