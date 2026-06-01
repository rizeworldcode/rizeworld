const fs = require("fs");
const file = "src/pages/admin/AdminDashboard.tsx";
let lines = fs.readFileSync(file, "utf-8").split(/\r?\n/);
const start = lines.findIndex(l => l.includes("{/* REFERRED BY PAGE */}"));
const end = lines.findIndex((l, i) => i > start && l.trim() === ")}");
const endDiv = lines.findIndex((l, i) => i > end && l.includes("          )}"));

lines.splice(start, endDiv - start + 1, 
`          {/* REFERRED BY PAGE */}
          {activeTab === "referred-by" && (
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
fs.writeFileSync(file, lines.join("\n"));
