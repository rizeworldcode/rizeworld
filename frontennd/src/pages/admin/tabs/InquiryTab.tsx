import { useState, useEffect } from "react";
import { Inquiry } from "../types";

export function InquiryTab() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  useEffect(() => {
    const loadInquiries = () => {
      const stored = JSON.parse(localStorage.getItem('rw_inquiries') || '[]');
      if (stored.length === 0) {
        const defaultInqs: Inquiry[] = [
          { id: "INQ-001", name: "Rohan Gupta", phone: "9876543210", course: "AI Tools + DM Basics", date: "2026-05-29", status: "New" },
          { id: "INQ-002", name: "Anjali Verma", phone: "8765432109", course: "Video Editing", date: "2026-05-28", status: "Contacted" }
        ];
        setInquiries(defaultInqs);
        localStorage.setItem('rw_inquiries', JSON.stringify(defaultInqs));
      } else {
        setInquiries(stored);
      }
    };
    loadInquiries();
    
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'rw_inquiries') {
        loadInquiries();
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <div className="max-w-[1400px] mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="bg-white border border-neutral-200 rounded-3xl overflow-hidden shadow-sm">
          <div className="p-6 border-b border-neutral-200 bg-neutral-50/50">
            <h3 className="text-xl font-bold text-neutral-900">Recent Inquiries</h3>
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-neutral-50 border-b border-neutral-200 text-neutral-500 text-xs uppercase tracking-wider font-semibold">
                <th className="py-5 px-6">Name</th>
                <th className="py-5 px-6">Phone Number</th>
                <th className="py-5 px-6">Interested Course</th>
                <th className="py-5 px-6">Message</th>
                <th className="py-5 px-6">Date</th>
                <th className="py-5 px-6">Status</th>
                <th className="py-5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-sm">
                {inquiries.map(inq => (
                  <tr key={inq.id} className="hover:bg-neutral-50/50 transition-colors">
                      <td className="py-4 px-6 font-semibold text-neutral-900">{inq.name}</td>
                      <td className="py-4 px-6 text-neutral-600">{inq.phone}</td>
                      <td className="py-4 px-6 text-neutral-700">{inq.course}</td>
                      <td className="py-4 px-6 text-neutral-600 max-w-xs truncate" title={inq.message}>{inq.message || "-"}</td>
                      <td className="py-4 px-6 text-neutral-500">{inq.date}</td>
                      <td className="py-4 px-6">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                            inq.status === "New" ? "bg-blue-100 text-blue-700 border-blue-200" :
                            "bg-emerald-100 text-emerald-700 border-emerald-200"
                        }`}>
                            {inq.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button className="px-3 py-1.5 text-xs font-semibold bg-white hover:bg-neutral-50 text-neutral-700 rounded-lg border border-neutral-200 shadow-sm transition-all">
                          Contact
                        </button>
                      </td>
                  </tr>
                ))}
            </tbody>
          </table>
      </div>
    </div>
  );
}
