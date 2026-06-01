import { useState } from "react";
import { X } from "lucide-react";
import { Teacher } from "../types";

export function TeacherModal({ teacher, onClose, onSave }: any) {
  const [form, setForm] = useState<Teacher>(
    teacher || {
      id: "",
      name: "",
      subject: "",
      email: "",
      phone: "",
      address: ""
    }
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm animate-in fade-in" onClick={onClose}></div>
      <div className="relative bg-white border border-neutral-200 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
        
        <div className="px-8 py-5 border-b border-neutral-100 flex justify-between items-center bg-white relative z-10">
          <h2 className="text-xl font-bold text-neutral-900">{teacher ? 'Edit Teacher' : 'Add New Teacher'}</h2>
          <button type="button" onClick={onClose} className="p-2 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded-full transition-colors cursor-pointer">
            <X size={20} />
          </button>
        </div>

        <div className="p-8 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-200 relative z-10">
          <form id="teacher-form" onSubmit={(e) => { e.preventDefault(); onSave(form); }} className="space-y-6">
             <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-semibold text-neutral-600 block mb-1.5">Teacher ID *</label>
                  <input type="text" required disabled={!!teacher} value={form.id} onChange={e => setForm({...form, id: e.target.value})} className={`w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:border-purple-500 focus:bg-white focus:outline-none transition-all text-neutral-900 ${teacher ? 'bg-neutral-100 cursor-not-allowed' : 'bg-neutral-50'}`} placeholder="e.g. T-101" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-neutral-600 block mb-1.5">Full Name *</label>
                  <input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 focus:border-purple-500 focus:bg-white focus:outline-none transition-all text-neutral-900" placeholder="e.g. John Doe" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-neutral-600 block mb-1.5">Subject / Course *</label>
                  <input type="text" required value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 focus:border-purple-500 focus:bg-white focus:outline-none transition-all text-neutral-900" placeholder="e.g. Digital Marketing" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-neutral-600 block mb-1.5">Phone Number *</label>
                  <input type="text" required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 focus:border-purple-500 focus:bg-white focus:outline-none transition-all text-neutral-900" placeholder="+91 9876543210" />
                </div>
                <div className="col-span-2">
                  <label className="text-xs font-semibold text-neutral-600 block mb-1.5">Email Address *</label>
                  <input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 focus:border-purple-500 focus:bg-white focus:outline-none transition-all text-neutral-900" placeholder="teacher@rizeworld.com" />
                </div>
                <div className="col-span-2">
                  <label className="text-xs font-semibold text-neutral-600 block mb-1.5">Address *</label>
                  <textarea required value={form.address} onChange={e => setForm({...form, address: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 focus:border-purple-500 focus:bg-white focus:outline-none transition-all text-neutral-900 min-h-[100px]" placeholder="Full address..." />
                </div>
             </div>
          </form>
        </div>

        <div className="p-6 border-t border-neutral-200 flex justify-end gap-3 shrink-0 bg-white relative z-10">
          <button type="button" onClick={onClose} className="px-6 py-2.5 rounded-xl font-semibold text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 transition-all cursor-pointer">Cancel</button>
          <button type="submit" form="teacher-form" className="px-8 py-2.5 rounded-xl font-semibold text-white bg-linear-to-r from-purple-600 to-indigo-600 hover:shadow-lg transition-all cursor-pointer">Save Teacher</button>
        </div>
      </div>
    </div>
  );
}
