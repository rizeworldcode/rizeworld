import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { 
  Users, LogOut, LayoutDashboard, IndianRupee, CheckCircle2, AlertCircle
} from "lucide-react";

export default function ReferrerDashboard() {
  const navigate = useNavigate();
  const { expandedStat } = useParams();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  // Mock Stats for the Referrer
  const stats = {
    totalReferrers: 1, // Represents themselves or sub-referrers depending on business logic
    totalReferredStudents: 24,
    totalReferralEarnings: 120000,
    paidReferralAmount: 80000,
    pendingReferralAmount: 40000,
    activeReferrers: 1
  };

  useEffect(() => {
    // Basic auth check
    const token = localStorage.getItem("referrerAuthToken");
    if (!token) {
      navigate("/referrer/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("referrerAuthToken");
    navigate("/referrer/login");
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col md:flex-row font-sans">
      
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-neutral-200 flex flex-col shrink-0 sticky top-0 md:h-screen z-40 shadow-sm">
        <div className="p-6 border-b border-neutral-200 flex justify-center">
          <div className="h-10 w-40 relative flex items-center justify-center overflow-hidden">
            <img src="/logo/RIZE LOGO HORI PNG.png" alt="RizeWorld" className="absolute top-1/2 left-0 -translate-y-1/2 h-[500%] w-auto max-w-none object-contain object-left ml-[-70px]" />
          </div>
        </div>

        <div className="p-4 flex flex-col gap-2 grow overflow-y-auto">
          <div className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-2 px-4">Menu</div>
          
          <button 
            onClick={() => {
              setActiveTab("dashboard");
              if (expandedStat) navigate("/referrer/dashboard");
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${
              activeTab === "dashboard" ? "bg-blue-50 text-blue-700 shadow-sm" : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
            }`}
          >
            <LayoutDashboard size={20} />
            Dashboard Overview
          </button>
        </div>

        <div className="p-4 border-t border-neutral-200 mt-auto">
          <button 
            onClick={() => setIsLogoutModalOpen(true)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-red-600 hover:bg-red-50 transition-all"
          >
            <LogOut size={20} />
            Secure Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden relative">
        <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-neutral-200 px-8 py-4 flex justify-between items-center shadow-sm">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-lg">
                R
             </div>
             <div>
               <h2 className="text-sm font-bold text-neutral-900">Referrer Partner</h2>
               <div className="text-xs text-blue-600 font-semibold flex items-center gap-1">
                 <CheckCircle2 size={12} /> Verified Partner
               </div>
             </div>
          </div>
        </div>

        <div className="p-8">
          {activeTab === "dashboard" && (
             <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
                
                <div className="flex justify-between items-end">
                   <div>
                      <h1 className="text-3xl font-bold text-neutral-900 mb-2">Partner Dashboard</h1>
                      <p className="text-neutral-500 font-medium">Welcome back! Here's an overview of your referrals and earnings.</p>
                   </div>
                </div>

                {/* Stats Grid */}
                {!expandedStat ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                     
                     {/* Total Referrers */}
                     <div 
                        onClick={() => navigate('/referrer/dashboard/totalReferrers')}
                        className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group cursor-pointer"
                     >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />
                      <div className="relative z-10">
                         <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
                            <Users size={24} />
                         </div>
                         <div className="text-sm font-bold text-neutral-500 uppercase tracking-wider mb-1">Total Referrers</div>
                         <div className="text-3xl font-black text-neutral-900">{stats.totalReferrers}</div>
                      </div>
                   </div>

                   {/* Total Referred Students */}
                   <div 
                      onClick={() => navigate('/referrer/dashboard/totalReferredStudents')}
                      className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group cursor-pointer"
                   >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />
                      <div className="relative z-10">
                         <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-4">
                            <Users size={24} />
                         </div>
                         <div className="text-sm font-bold text-neutral-500 uppercase tracking-wider mb-1">Total Referred Students</div>
                         <div className="text-3xl font-black text-neutral-900">{stats.totalReferredStudents}</div>
                      </div>
                   </div>

                   {/* Total Referral Earnings */}
                   <div 
                      onClick={() => navigate('/referrer/dashboard/totalReferralEarnings')}
                      className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group cursor-pointer"
                   >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />
                      <div className="relative z-10">
                         <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
                            <IndianRupee size={24} />
                         </div>
                         <div className="text-sm font-bold text-neutral-500 uppercase tracking-wider mb-1">Total Referral Earnings</div>
                         <div className="text-3xl font-black text-neutral-900">₹{stats.totalReferralEarnings.toLocaleString()}</div>
                      </div>
                   </div>

                   {/* Paid Referral Amount */}
                   <div 
                      onClick={() => navigate('/referrer/dashboard/paidReferralAmount')}
                      className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group cursor-pointer"
                   >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />
                      <div className="relative z-10">
                         <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-4">
                            <CheckCircle2 size={24} />
                         </div>
                         <div className="text-sm font-bold text-neutral-500 uppercase tracking-wider mb-1">Paid Referral Amount</div>
                         <div className="text-3xl font-black text-neutral-900">₹{stats.paidReferralAmount.toLocaleString()}</div>
                      </div>
                   </div>

                   {/* Pending Referral Amount */}
                   <div 
                      onClick={() => navigate('/referrer/dashboard/pendingReferralAmount')}
                      className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group cursor-pointer"
                   >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />
                      <div className="relative z-10">
                         <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
                            <AlertCircle size={24} />
                         </div>
                         <div className="text-sm font-bold text-neutral-500 uppercase tracking-wider mb-1">Pending Referral Amount</div>
                         <div className="text-3xl font-black text-blue-600">₹{stats.pendingReferralAmount.toLocaleString()}</div>
                      </div>
                   </div>



                  </div>
                ) : (
                  <div className="bg-white rounded-3xl shadow-sm border border-neutral-200 overflow-hidden animate-in fade-in duration-300">
                    <div className="p-6 border-b border-neutral-200 flex justify-between items-center bg-neutral-50/50">
                      <div>
                        <h2 className="text-xl font-bold text-neutral-900">
                          {expandedStat === 'totalReferrers' && "Referrers Details"}
                          {expandedStat === 'totalReferredStudents' && "Referred Students Details"}
                          {expandedStat === 'totalReferralEarnings' && "Earnings Details"}
                          {expandedStat === 'paidReferralAmount' && "Paid Amount Details"}
                          {expandedStat === 'pendingReferralAmount' && "Pending Amount Details"}
                        </h2>
                        <p className="text-sm text-neutral-500 font-medium mt-1">Detailed view of your statistics</p>
                      </div>
                      <button 
                        onClick={() => navigate('/referrer/dashboard')}
                        className="px-4 py-2 bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-50 rounded-xl font-semibold transition-colors shadow-sm"
                      >
                        Back to Dashboard
                      </button>
                    </div>
                    <div className="p-0 overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-neutral-50/80 border-b border-neutral-200">
                            {expandedStat === 'totalReferrers' && (
                              <>
                                <th className="py-4 px-6 font-bold text-xs text-neutral-500 uppercase tracking-wider">Name</th>
                                <th className="py-4 px-6 font-bold text-xs text-neutral-500 uppercase tracking-wider">Phone</th>
                                <th className="py-4 px-6 font-bold text-xs text-neutral-500 uppercase tracking-wider">Status</th>
                                <th className="py-4 px-6 font-bold text-xs text-neutral-500 uppercase tracking-wider">Join Date</th>
                              </>
                            )}
                            {expandedStat === 'totalReferredStudents' && (
                              <>
                                <th className="py-4 px-6 font-bold text-xs text-neutral-500 uppercase tracking-wider">ID</th>
                                <th className="py-4 px-6 font-bold text-xs text-neutral-500 uppercase tracking-wider">Student Name</th>
                                <th className="py-4 px-6 font-bold text-xs text-neutral-500 uppercase tracking-wider">Student Number</th>
                                <th className="py-4 px-6 font-bold text-xs text-neutral-500 uppercase tracking-wider">Course</th>
                                <th className="py-4 px-6 font-bold text-xs text-neutral-500 uppercase tracking-wider">Duration</th>
                                <th className="py-4 px-6 font-bold text-xs text-neutral-500 uppercase tracking-wider">Total Fee</th>
                                <th className="py-4 px-6 font-bold text-xs text-neutral-500 uppercase tracking-wider">Pending Fee</th>
                                <th className="py-4 px-6 font-bold text-xs text-neutral-500 uppercase tracking-wider">Status</th>
                              </>
                            )}
                            {expandedStat === 'totalReferralEarnings' && (
                              <>
                                <th className="py-4 px-6 font-bold text-xs text-neutral-500 uppercase tracking-wider">Transaction ID</th>
                                <th className="py-4 px-6 font-bold text-xs text-neutral-500 uppercase tracking-wider">Student Name</th>
                                <th className="py-4 px-6 font-bold text-xs text-neutral-500 uppercase tracking-wider">Amount</th>
                                <th className="py-4 px-6 font-bold text-xs text-neutral-500 uppercase tracking-wider">Date</th>
                              </>
                            )}
                            {expandedStat === 'paidReferralAmount' && (
                              <>
                                <th className="py-4 px-6 font-bold text-xs text-neutral-500 uppercase tracking-wider">Transaction ID</th>
                                <th className="py-4 px-6 font-bold text-xs text-neutral-500 uppercase tracking-wider">Amount Paid</th>
                                <th className="py-4 px-6 font-bold text-xs text-neutral-500 uppercase tracking-wider">Payment Method</th>
                                <th className="py-4 px-6 font-bold text-xs text-neutral-500 uppercase tracking-wider">Date</th>
                              </>
                            )}
                            {expandedStat === 'pendingReferralAmount' && (
                              <>
                                <th className="py-4 px-6 font-bold text-xs text-neutral-500 uppercase tracking-wider">Student Name</th>
                                <th className="py-4 px-6 font-bold text-xs text-neutral-500 uppercase tracking-wider">Expected Amount</th>
                                <th className="py-4 px-6 font-bold text-xs text-neutral-500 uppercase tracking-wider">Status</th>
                                <th className="py-4 px-6 font-bold text-xs text-neutral-500 uppercase tracking-wider">Due Date</th>
                              </>
                            )}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100">
                          <tr>
                            <td colSpan={8} className="py-12 text-center text-neutral-500 font-medium">
                              No data available yet. Data will be dynamically loaded from backend.
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
             </div>
          )}
        </div>
      </main>

      {/* Logout Modal */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm" onClick={() => setIsLogoutModalOpen(false)} />
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full relative z-10 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <LogOut size={32} />
            </div>
            <h3 className="text-2xl font-bold text-center text-neutral-900 mb-2">Secure Logout</h3>
            <p className="text-center text-neutral-500 mb-8 font-medium">Are you sure you want to end your session? You will need to login again.</p>
            <div className="flex gap-3">
              <button 
                onClick={() => setIsLogoutModalOpen(false)}
                className="flex-1 py-3 px-4 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleLogout}
                className="flex-1 py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg shadow-red-600/20 transition-colors"
              >
                Logout Now
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
