
const refferel_model = require("../../models/referreledModel.js");
const student_model = require("../../models/studentModel.js");

exports.admin_dashboardGet = async (req, res) => {
    try {
        const refferelId = req.user._id;
        const refferel = await refferel_model.findById(refferelId);
        
        if (!refferel) {
            return { success: false, message: "Referrer not found" };
        }

        const students = await student_model.find({ referred_by_id: refferelId })
            .select('student_name phone selected_course_name created_at student_ID total_fee total_paid_fee')
            .sort({ created_at: -1 });

        return {
            success: true,
            data: {
                stats: {
                    totalReferred: students.length,
                    totalEarnings: parseFloat(refferel.amount.total || 0),
                    paidAmount: parseFloat(refferel.amount.paid || 0),
                    pendingAmount: parseFloat(refferel.amount.pending || 0)
                },
                students: students.map(s => {
                    const totalFee = parseFloat(s.total_fee || 0);
                    const paidFee = parseFloat(s.total_paid_fee || 0);
                    const pendingFee = totalFee - paidFee;
                    
                    return {
                        id: s._id,
                        studentID: s.student_ID,
                        name: s.student_name,
                        phone: s.phone,
                        course: s.selected_course_name,
                        date: s.created_at,
                        total_fee: s.total_fee,
                        paid_fee: s.total_paid_fee,
                        pending_fee: pendingFee.toString(),
                        status: pendingFee > 0 ? "Pending" : "Clear"
                    };
                }),
                referrer: {
                    name: refferel.name,
                    phone: refferel.phone
                }
            }
        };
    } catch (error) {
        console.log("Dashboard Error:", error);
        return { success: false, message: "Error fetching dashboard data" };
    }
};

