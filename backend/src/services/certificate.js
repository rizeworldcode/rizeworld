const student_model = require("../models/studentModel");

exports.certificateData = async (req,res)=>{

    try {
        const student = req.user
        if(!student){
            return{
                message: "Student not found",
                success: false,
            }
        }
        const certificate = student.certificate_photo;
        const student_name = student.student_name;
        const student_id = student.student_ID;
        const certificate_photo = student.certificate_photo;

        return {
            message: "Student data fetched",
            success: true,
            certificateStatus: certificate ? "issued" : "unissued",
            student_name,
            student_id,
            certificate_photo,
        };
    
    } catch (error) {
        console.log(error);
        return {
            message: error.message || "Internal server error",
            success: false,
        };
    }
} 