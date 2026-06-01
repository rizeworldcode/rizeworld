import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Student } from "../types";

export function StudentModal({ student, onClose, onSave }: any) {
  const [form, setForm] = useState<Student>(
    student ? {
      ...student,
      paidFees: "" // Clear paid fees field in edit mode so admin can enter NEW payment amount
    } : {
      id: `RW-${Math.floor(1000 + Math.random() * 9000)}`,
      name: "",
      password: "",
      email: "",
      phone: "",
      course: "",
      duration: "",
      totalFees: "",
      paidFees: "",
      feesInstallment: "",
      pendingFees: 0,
      address: "",
      startDate: "",
      endDate: "",
      feesStatus: "Pending",
      feeType: "Online",
      utrNumber: "",
      certificates: [],
      referredByName: "",
      referredByPhone: ""
    }
  );

  const [certificateFile, setCertificateFile] = useState<File | null>(null);

  // Auto calculate pending fees
  useEffect(() => {
     const total = Number(form.totalFees) || 0;
     const paid = Number(form.paidFees) || 0;
     
     // If editing, we should only consider the fee_amount (new payment) if the user is explicitly adding it.
     // However, the frontend currently uses 'paidFees' as the field for the NEW payment amount in edit mode.
     // To show correct pending fees in UI during edit:
     const currentTotalPaid = student ? (Number(student.paidFees) || 0) : 0;
     const newPayment = student ? (Number(form.paidFees) || 0) : paid;
     const displayTotalPaid = student ? currentTotalPaid + newPayment : paid;
     
     const pending = Math.max(0, total - displayTotalPaid);
     
     let status: "Clear" | "Pending" | "Partial" = "Pending";
     if (displayTotalPaid > 0 && pending > 0) status = "Partial";
     if (displayTotalPaid >= total && total > 0) status = "Clear";
     
     setForm(prev => ({ ...prev, pendingFees: pending, feesStatus: prev.totalFees ? status : prev.feesStatus }));
  }, [form.totalFees, form.paidFees, student]);

  const submit = async (e: any) => {
    e.preventDefault();
    if (!/^\d+$/.test(form.phone || "")) {
       alert("Phone number should contain only numbers.");
       return;
    }
    const total = Number(form.totalFees) || 0;
    const paid = Number(form.paidFees) || 0;
    if (paid > total) {
       alert("Paid Fees cannot exceed Total Fees.");
       return;
    }
    if (form.startDate && form.endDate && new Date(form.endDate) < new Date(form.startDate)) {
       alert("Course End Date cannot be earlier than Start Date.");
       return;
    }
    if (form.password && form.password.length < 6) {
       alert("Password must contain minimum 6 characters.");
       return;
    }
    
    // Real API Call
    try {
      const isNew = !student;
      
      if (isNew) {
        // Prepare JSON payload for adding student
        const payload = {
          student_ID: form.id,
          student_name: form.name,
          status: form.feesStatus,
          student_password: form.password,
          selected_course_name: form.course,
          course_duration: form.duration,
          total_fee: (form.totalFees || "0").toString(),
          total_paid_fee: (form.paidFees || "0").toString(),
          fee_type: form.feeType,
          fee_utr: form.utrNumber || "",
          phone: form.phone,
          email: form.email,
          address: form.address,
          course_start_date: form.startDate,
          course_end_date: form.endDate,
          fee_installment: (form.feesInstallment || "0").toString(),
          referredByName: form.referredByName,
          referredByPhone: form.referredByPhone
        };

        const res = await fetch("http://localhost:3001/add_student", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        
        if (data.success) {
           onSave(form);
        } else {
          alert(data.message || "Failed to add student");
        }
      } else {
        // Handle edit/update with certificate photo if needed
        const formData = new FormData();
        formData.append("student_password", form.password || "");
        formData.append("fee_amount", (form.paidFees || "0").toString());
        formData.append("fee_type", form.feeType || "Online");
        formData.append("fee_utr", form.utrNumber || "");
        formData.append("total_fee", (form.totalFees || "0").toString());
        formData.append("fee_installment", (form.feesInstallment || "0").toString());
        
        if (certificateFile) {
          formData.append("certificate_photo", certificateFile);
        }

        const res = await fetch(`http://localhost:3001/updateStudentdetails/${form.id}`, {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        
        if (data.success) {
           onSave(form);
        } else {
          alert(data.message || "Failed to update student");
        }
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while saving student data.");
    }
  };

  return (
    <div className="fixed inset-0 bg-neutral-900/40 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-white border border-neutral-200 rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl flex flex-col animate-in slide-in-from-bottom-8 duration-300 max-h-[90vh]">
        <div className="p-6 border-b border-neutral-100 flex justify-between items-center bg-neutral-50 shrink-0">
          <h3 className="font-display text-xl font-bold text-neutral-900 flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-blue-500"></div>
             {student ? "Edit Student Record" : "Add New Student"}
          </h3>
          <button type="button" onClick={onClose} className="text-neutral-400 hover:text-neutral-900 transition-colors bg-white hover:bg-neutral-100 p-2 rounded-full border border-neutral-200 shadow-sm cursor-pointer"><X size={18} /></button>
        </div>
        
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-200">
          <form id="student-form" onSubmit={submit} className="p-6 space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {/* Personal Info */}
               <div className="space-y-4 bg-neutral-50 p-5 rounded-2xl border border-neutral-100">
                  <h4 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-4">Personal Information</h4>
                  <div>
                    <label className="text-xs font-semibold text-neutral-600 block mb-1.5">Student ID *</label>
                    <input readOnly type="text" value={form.id} className="w-full px-4 py-2.5 rounded-xl bg-neutral-100 border border-neutral-200 text-neutral-500 font-semibold cursor-not-allowed shadow-sm" />
                  </div>
                  {!student && (
                     <div>
                       <label className="text-xs font-semibold text-neutral-600 block mb-1.5">Student Name *</label>
                       <input required type="text" placeholder="E.g. Rahul Sharma" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-white border border-neutral-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-all text-neutral-900 shadow-sm" />
                     </div>
                  )}
                  <div>
                    <label className="text-xs font-semibold text-neutral-600 block mb-1.5">Student Password *</label>
                    <input required type="password" minLength={6} placeholder="Minimum 6 characters" value={form.password || ""} onChange={e => setForm({...form, password: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-white border border-neutral-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-all text-neutral-900 shadow-sm" />
                  </div>
                  {!student && (
                     <>
                        <div>
                          <label className="text-xs font-semibold text-neutral-600 block mb-1.5">Student Phone Number *</label>
                          <div className="relative flex items-center w-full px-4 py-2.5 rounded-xl bg-white border border-neutral-200 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all shadow-sm overflow-hidden">
                            <span className="text-neutral-500 font-bold pr-3 border-r border-neutral-200">+91</span>
                            <input required type="tel" maxLength={10} value={form.phone || ""} onChange={e => setForm({...form, phone: e.target.value.replace(/\D/g, '')})} className="w-full pl-3 bg-transparent outline-none text-neutral-900" />
                          </div>
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-neutral-600 block mb-1.5">Student Email *</label>
                          <input required type="email" placeholder="example@email.com" value={form.email || ""} onChange={e => setForm({...form, email: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-white border border-neutral-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-all text-neutral-900 shadow-sm" />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-neutral-600 block mb-1.5">Student Address *</label>
                          <textarea required placeholder="Full Address" value={form.address || ""} onChange={e => setForm({...form, address: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-white border border-neutral-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-all text-neutral-900 shadow-sm min-h-[80px] resize-none" />
                        </div>
                     </>
                  )}
               </div>

               {/* Course & Fees */}
               <div className="space-y-4 bg-neutral-50 p-5 rounded-2xl border border-neutral-100">
                  <h4 className="text-xs font-bold text-purple-600 uppercase tracking-widest mb-4">Course & Fees Details</h4>
                  <div>
                    <label className="text-xs font-semibold text-neutral-600 block mb-1.5">Course Selection *</label>
                    <select required disabled={!!student} value={form.course || ""} onChange={e => setForm({...form, course: e.target.value})} className={`w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:border-purple-500 focus:outline-none transition-all text-neutral-900 appearance-none shadow-sm ${student ? 'bg-neutral-100 cursor-not-allowed text-neutral-500' : 'bg-white cursor-pointer'}`}>
                      <option value="" disabled className="bg-blue-600 text-white font-semibold">Choose a topic</option>
                      <option value="Master Course Program">Master Course Program</option>
                      <optgroup label="INDIVIDUAL MODULES" className="font-bold text-neutral-900">
                        <option value="AI Tools + DM Basics" className="font-normal">AI Tools + DM Basics</option>
                        <option value="Graphic Design + Photoshop" className="font-normal">Graphic Design + Photoshop</option>
                        <option value="Video Editing" className="font-normal">Video Editing</option>
                        <option value="SMO" className="font-normal">SMO</option>
                        <option value="SEO" className="font-normal">SEO</option>
                        <option value="Performance Marketing" className="font-normal">Performance Marketing</option>
                        <option value="Website Development" className="font-normal">Website Development</option>
                      </optgroup>
                      <optgroup label="COMBO PACKAGES" className="font-bold text-neutral-900">
                        <option value="Marketing Pro (SEO+SMO+Performance)" className="font-normal">Marketing Pro (SEO+SMO+Performance)</option>
                        <option value="Creative Pro (Graphic+Video)" className="font-normal">Creative Pro (Graphic+Video)</option>
                        <option value="Tech Pro (Web Dev+AI Tools)" className="font-normal">Tech Pro (Web Dev+AI Tools)</option>
                      </optgroup>
                      <option value="Other Inquiry">Other Inquiry</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-neutral-600 block mb-1.5">Course Duration *</label>
                    <select required disabled={!!student} value={form.duration || ""} onChange={e => setForm({...form, duration: e.target.value})} className={`w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:border-purple-500 focus:outline-none transition-all text-neutral-900 appearance-none shadow-sm ${student ? 'bg-neutral-100 cursor-not-allowed text-neutral-500' : 'bg-white cursor-pointer'}`}>
                      <option value="" disabled>Select duration</option>
                      <option value="1 Month">1 Month</option>
                      <option value="2 Months">2 Months</option>
                      <option value="3 Months">3 Months</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div>
                       <label className="text-xs font-semibold text-neutral-600 block mb-1.5">Total Fees (₹) *</label>
                       <input type="number" required placeholder="50000" min={0} value={form.totalFees || ""} onChange={e => setForm({...form, totalFees: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-white border border-neutral-200 focus:border-purple-500 focus:outline-none transition-all text-neutral-900 shadow-sm" />
                     </div>
                     <div>
                       <label className="text-xs font-semibold text-neutral-600 block mb-1.5">{student ? "Add Payment (₹)" : "Paid Fees (₹) *"}</label>
                       <input type="number" required={!student} placeholder={student ? "E.g. 5000" : "25000"} min={0} max={Number(form.totalFees) || undefined} value={form.paidFees || ""} onChange={e => setForm({...form, paidFees: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-white border border-neutral-200 focus:border-purple-500 focus:outline-none transition-all text-green-600 font-bold shadow-sm" />
                     </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div>
                       <label className="text-xs font-semibold text-neutral-600 block mb-1.5">Fee Type *</label>
                       <select required value={form.feeType || "Online"} onChange={e => setForm({...form, feeType: e.target.value as any})} className="w-full px-4 py-2.5 rounded-xl bg-white border border-neutral-200 focus:border-purple-500 focus:outline-none transition-all text-neutral-900 appearance-none shadow-sm cursor-pointer">
                         <option value="Online">Online</option>
                         <option value="Cash">Cash</option>
                       </select>
                     </div>
                     {form.feeType === "Online" ? (
                       <div>
                         <label className="text-xs font-semibold text-neutral-600 block mb-1.5">UTR Number *</label>
                         <input type="text" required placeholder="e.g. UTR123456789" value={form.utrNumber || ""} onChange={e => setForm({...form, utrNumber: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-white border border-neutral-200 focus:border-purple-500 focus:outline-none transition-all text-neutral-900 shadow-sm" />
                       </div>
                     ) : (
                       <div>
                         <label className="text-xs font-semibold text-neutral-600 block mb-1.5">Payment Reference</label>
                         <input type="text" disabled value="Cash Payment" className="w-full px-4 py-2.5 rounded-xl bg-neutral-100 border border-neutral-200 text-neutral-500 cursor-not-allowed shadow-sm" />
                       </div>
                     )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div>
                       <label className="text-xs font-semibold text-neutral-600 block mb-1.5">Pending Fees (Auto)</label>
                       <input type="text" readOnly value={`₹${form.pendingFees}`} className="w-full px-4 py-2.5 rounded-xl bg-neutral-100 border border-neutral-200 text-red-600 font-bold cursor-not-allowed" />
                     </div>
                     <div>
                       <label className="text-xs font-semibold text-neutral-600 block mb-1.5">Fee Installments Paid *</label>
                       <input type="number" required placeholder="e.g. 1" min={0} value={form.feesInstallment || ""} onChange={e => setForm({...form, feesInstallment: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-white border border-neutral-200 focus:border-purple-500 focus:outline-none transition-all text-neutral-900 shadow-sm" />
                     </div>
                  </div>
                  {!student && (
                     <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-semibold text-neutral-600 block mb-1.5">Course Start Date *</label>
                          <input type="date" required value={form.startDate || ""} onChange={e => setForm({...form, startDate: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-white border border-neutral-200 focus:border-purple-500 focus:outline-none transition-all text-neutral-900 shadow-sm" />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-neutral-600 block mb-1.5">Course End Date *</label>
                          <input type="date" required min={form.startDate || undefined} value={form.endDate || ""} onChange={e => setForm({...form, endDate: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-white border border-neutral-200 focus:border-purple-500 focus:outline-none transition-all text-neutral-900 shadow-sm" />
                        </div>
                     </div>
                  )}
               </div>
            </div>

             {/* Referred By (Only in Add mode) */}
             {!student && (
                <div className="space-y-4 bg-neutral-50 p-5 rounded-2xl border border-neutral-100">
                   <h4 className="text-xs font-bold text-orange-600 uppercase tracking-widest mb-4">Referred By</h4>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-xs font-semibold text-neutral-600 block mb-1.5">Referral Name</label>
                        <input type="text" value={form.referredByName || ""} onChange={e => setForm({...form, referredByName: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-white border border-neutral-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none transition-all text-neutral-900 shadow-sm" />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-neutral-600 block mb-1.5">Referral Phone Number</label>
                        <div className="relative flex items-center w-full px-4 py-2.5 rounded-xl bg-white border border-neutral-200 focus-within:border-orange-500 focus-within:ring-1 focus-within:ring-orange-500 transition-all shadow-sm overflow-hidden">
                          <span className="text-neutral-500 font-bold pr-3 border-r border-neutral-200">+91</span>
                          <input type="tel" maxLength={10} value={form.referredByPhone || ""} onChange={e => setForm({...form, referredByPhone: e.target.value.replace(/\D/g, '')})} className="w-full pl-3 bg-transparent outline-none text-neutral-900" />
                        </div>
                      </div>
                   </div>
                </div>
             )}

             {/* Certificate Upload */}
             {form.feesStatus === "Clear" && (
                <div className="space-y-4 bg-green-50 p-5 rounded-2xl border border-green-200 shadow-sm animate-in slide-in-from-top-4 duration-300">
                   <h4 className="text-xs font-bold text-green-700 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                      Certificate Management
                   </h4>
                   <div>
                     <label className="text-xs font-semibold text-green-800 block mb-1.5">
                        {form.certificates && form.certificates.length > 0 ? "Replace Certificate (PDF/Image)" : "Upload Course Certificate (PDF/Image)"}
                     </label>
                     <input type="file" accept="application/pdf, image/*" onChange={(e) => setCertificateFile(e.target.files?.[0] || null)} className="w-full px-4 py-2.5 rounded-xl bg-white border border-green-200 focus:border-green-500 focus:outline-none transition-all text-neutral-900 shadow-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 cursor-pointer" />
                     {form.certificates && form.certificates[0] && (
                        <p className="mt-2 text-[10px] text-green-600 font-bold italic flex items-center gap-1">
                           <X size={10} className="rotate-45" /> Current certificate already uploaded.
                        </p>
                     )}
                   </div>
                </div>
             )}
            
          </form>
        </div>

        <div className="p-6 border-t border-neutral-200 flex justify-end gap-3 shrink-0 bg-white relative z-10">
          <button type="button" onClick={onClose} className="px-6 py-2.5 rounded-xl font-semibold text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 transition-all cursor-pointer">Cancel</button>
          <button type="submit" form="student-form" className="px-8 py-2.5 rounded-xl font-semibold text-white bg-linear-to-r from-blue-600 to-indigo-600 hover:shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:-translate-y-0.5 transition-all cursor-pointer">Save Student</button>
        </div>
      </div>
    </div>
  );
}
