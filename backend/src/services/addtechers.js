const teacher_model = require("../models/techersModel");

exports.add_teacher = async (req, res) => {
    try {
        const { 
            techer_name, 
            techer_ID, 
            course_name, 
            phone, 
            email, 
            address 
        } = req.body;

        if (!techer_name || !techer_ID) {
            return {
                message: "Teacher name and ID are required",
                success: false,
            };
        }

        const existingTeacher = await teacher_model.findOne({ techer_ID: techer_ID });
        if (existingTeacher) {
            return {
                message: "Teacher ID already exists",
                success: false,
            };
        }

        const teacher_Data = new teacher_model({ 
            techer_name, 
            techer_ID, 
            course_name, 
            phone, 
            email, 
            address 
        });

        if (!teacher_Data) {
            return {
                message: "Teacher addition failed",
                success: false,
            };
        }

        // Persist to database
        const saved = await teacher_Data.save();

        return {
            teacher_Data: saved,
            message: "Teacher added successfully",
            success: true,
        };
    } catch (error) {
        console.log(error);
        return {
            message: error.message || "Internal server error",
            success: false,
        };
    }
};

exports.allTeachers = async (req, res) => {
    try {
        const teachers = await teacher_model.find({}).sort({ created_at: -1 });
        return {
            success: true,
            data: teachers
        };
    } catch (error) {
        console.log("Error fetching teachers:", error);
        return {
            success: false,
            message: error.message || "Internal server error"
        };
    }
};
