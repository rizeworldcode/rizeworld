const mongoose = require("mongoose");
const { type } = require("node:os");

const StudentSchema = new mongoose.Schema({

    student_name: {
        type: String,
        required: true,
    },
    student_ID: {
        type: String,
        required: true,
    },
    student_password:{
        type:String,
        required: true,
    },
    fee_status: {
        type: String,
        required: true,
        default: "pending",
    },
    certificate_photo: {
        type: String,
        default: "",
    },
    selected_course_name: {
        type: String,
        default: "",
        required: true,
    },
    course_duration: {
        type: String,
        default: "",
        required: true,
    },
    total_fee: {
        type: String,
        default: "",
        required: true,
    },
    total_paid_fee: {
        type: String,
        default: "",
        required: true,
    },
    fee:[{
        amount:{
            type:String,
            default:"",
        },
        utr_Number:{
            type:String,
            default:"",
        },
        date:{
            type:Date,
            default:Date.now,
        },
        payment_method:{
            type:String,
            default:"cash",
        },
    }],
    phone:{
        type:String,
        default:"",
    },
    email:{
        type:String,
        default:"",
    },
    address:{
        type:String,
        default:"",
    },
    course_start_date:{
        type:Date,
        default:"",
    },
    course_end_date:{
        type:Date,
        default:"",
    },
    fee_installment:{
        type:String,
        default:"",
    }, 
    referred_by_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "referred",
        default: null,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
});

const Student  = mongoose.model("Student ", StudentSchema);
module.exports = Student ;
