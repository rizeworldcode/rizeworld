const fs = require('fs');
const file = 'src/pages/admin/AdminDashboard.tsx';
let lines = fs.readFileSync(file, 'utf-8').split(/\r?\n/);

// 1. Remove referredStudentsData at line 46 (which is index 45)
const refStudDataIndex = lines.findIndex(l => l.includes('referredStudentsData'));
if (refStudDataIndex !== -1) {
  lines.splice(refStudDataIndex, 1);
}

// 2. Remove the old inquiries state (lines 53 to 57 roughly)
const inqStateStart = lines.findIndex(l => l.includes('const [inquiries] = useState<Inquiry[]>'));
if (inqStateStart !== -1) {
  // It spans about 4 lines: const [inquiries... {id... {id... ]);
  lines.splice(inqStateStart, 4);
}

// 3. Add the selectedReferrer state variables back to where `inquiries` used to be
const stateInjectionPoint = lines.findIndex(l => l.includes('const [isSetAmountModalOpen, setIsSetAmountModalOpen]'));
if (stateInjectionPoint !== -1) {
  lines.splice(stateInjectionPoint + 2, 0, `  const [selectedReferrer, setSelectedReferrer] = useState<any>(null);
  const [referrerStudents, setReferrerStudents] = useState<any[]>([]);
  const [referrerStatusFilter, setReferrerStatusFilter] = useState("All");

  const handleReferrerClick = async (referrer: any) => {
    setSelectedReferrer(referrer);
    try {
      const res1 = await fetch("http://localhost:3001/referredStudentsData", { method: "POST" });
      const data1 = await res1.json();

      const res2 = await fetch("http://localhost:3001/allStudents", { method: "POST" });
      const data2 = await res2.json();

      if (data1.success && data2.success) {
        const matchingReferredStudents = data1.data.filter((s: any) => s.referrer_phone === referrer.phone);
        
        const enrichedStudents = matchingReferredStudents.map((refStudent: any) => {
           const fullData = data2.data.find((s: any) => s.student_ID === refStudent.student_ID);
           return {
              ...refStudent,
              student_phone: fullData ? fullData.phone : "N/A",
              total_fee: fullData ? fullData.total_fee : "0",
              total_paid_fee: fullData ? fullData.total_paid_fee : "0",
              pending_fee: fullData ? fullData.pending_fee : "0"
           };
        });

        setReferrerStudents(enrichedStudents);
      }
    } catch (error) {
      console.error(error);
    }
  };`);
}

// 4. Replace the old Referred By Page inline JSX with <ReferredByTab />
const refStart = lines.findIndex(l => l.includes('{/* REFERRED BY PAGE */}'));
if (refStart !== -1) {
  const refEnd = lines.findIndex((l, i) => i > refStart && l.includes('</main>')) - 2;
  lines.splice(refStart + 1, refEnd - refStart, `          {activeTab === "referred-by" && (
             <ReferredByTab
                selectedReferrer={selectedReferrer}
                setSelectedReferrer={setSelectedReferrer}
                referrerStatusFilter={referrerStatusFilter}
                setReferrerStatusFilter={setReferrerStatusFilter}
                referrerStudents={referrerStudents}
                referrers={referrers}
                handleReferrerClick={handleReferrerClick}
                setEditingReferrer={setEditingReferrer}
                setIsReferrerModalOpen={setIsReferrerModalOpen}
                handleClearReferrerAmount={handleClearReferrerAmount}
             />
          )}`);
}

fs.writeFileSync(file, lines.join('\n'));
console.log('Done fixing AdminDashboard');
