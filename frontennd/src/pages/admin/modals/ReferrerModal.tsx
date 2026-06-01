import { useState } from "react";
import { X } from "lucide-react";

export function ReferrerModal({ referrer, onClose, onSave }: { referrer: any, onClose: () => void, onSave: (data: any) => void }) {
  const [form, setForm] = useState(referrer || { id: "", name: "", phone: "", studentsReferred: 0, totalAmount: "", pendingAmount: "" });
  const [payAmount, setPayAmount] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...form, payAmount: Number(payAmount) || 0 });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm animate-in fade-in" onClick={onClose}></div>
      <div className="relative bg-white border border-neutral-200 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="px-6 py-5 border-b border-neutral-100 flex justify-between items-center bg-white relative z-10">
          <h2 className="text-xl font-bold text-neutral-900">Process Referral Payment</h2>
          <button type="button" onClick={onClose} className="p-2 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded-full transition-colors cursor-pointer">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 relative z-10">
          <form id="referrer-form" onSubmit={handleSubmit} className="space-y-4">
            <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100 mb-6">
              <div className="text-[10px] font-bold text-orange-600 uppercase tracking-widest mb-1">Referrer Name</div>
              <div className="text-lg font-bold text-neutral-900">{form.name}</div>
              <div className="text-xs text-neutral-500 mt-1">{form.phone}</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-neutral-600 block mb-1.5">Total Earned</label>
                <div className="w-full px-4 py-2.5 rounded-xl bg-neutral-100 border border-neutral-200 text-neutral-900 font-bold">{form.totalAmount}</div>
              </div>
              <div>
                <label className="text-xs font-semibold text-neutral-600 block mb-1.5">Pending Dues</label>
                <div className="w-full px-4 py-2.5 rounded-xl bg-red-50 border border-red-100 text-red-600 font-bold">{form.pendingAmount}</div>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-neutral-600 block mb-1.5">Amount to Pay (₹)</label>
              <input 
                type="number" 
                required 
                value={payAmount} 
                onChange={e => setPayAmount(e.target.value)} 
                className="w-full px-4 py-3 rounded-xl bg-white border-2 border-orange-500 focus:ring-4 focus:ring-orange-500/10 focus:outline-none transition-all text-neutral-900 text-lg font-bold" 
                placeholder="Enter payment amount" 
              />
              <p className="text-[10px] text-neutral-400 mt-2 italic">* This amount will be added to Paid and deducted from Pending.</p>
            </div>
          </form>
        </div>

        <div className="p-6 border-t border-neutral-200 flex justify-end gap-3 shrink-0 bg-neutral-50 relative z-10">
          <button type="button" onClick={onClose} className="px-6 py-2.5 rounded-xl font-semibold text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-all cursor-pointer">Cancel</button>
          <button type="submit" form="referrer-form" className="px-8 py-2.5 rounded-xl font-semibold text-white bg-orange-600 hover:bg-orange-700 hover:shadow-lg transition-all cursor-pointer shadow-md shadow-orange-600/20">Confirm Payment</button>
        </div>
      </div>
    </div>
  );
}
