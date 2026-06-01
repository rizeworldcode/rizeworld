const fs = require('fs');
const file = 'src/pages/admin/AdminDashboard.tsx';
let lines = fs.readFileSync(file, 'utf-8').split(/\r?\n/);

const inqStart = lines.findIndex(l => l.includes('{/* INQUIRY PAGE */}'));
const ctStart = lines.findIndex(l => l.includes('{/* COURSE & TEACHERS PAGE */}'));
const refStart = lines.findIndex(l => l.includes('{/* REFERRED BY PAGE */}'));

if (inqStart !== -1 && ctStart !== -1) {
  lines.splice(inqStart + 1, ctStart - inqStart - 1, '          {activeTab === "inquiry" && <InquiryTab />}');
}

// Since lines shifted, we need to find ctStart and refStart again
const newCtStart = lines.findIndex(l => l.includes('{/* COURSE & TEACHERS PAGE */}'));
const newRefStart = lines.findIndex(l => l.includes('{/* REFERRED BY PAGE */}'));
if (newCtStart !== -1 && newRefStart !== -1) {
  lines.splice(newCtStart + 1, newRefStart - newCtStart - 1, '          {activeTab === "course-teachers" && (\n             <CourseTeachersTab\n                teachers={teachers}\n                setEditingTeacher={setEditingTeacher}\n                setIsTeacherModalOpen={setIsTeacherModalOpen}\n                handleDeleteTeacher={handleDeleteTeacher}\n             />\n          )}');
}

const finalRefStart = lines.findIndex(l => l.includes('{/* REFERRED BY PAGE */}'));
// find the end of the Referred By Page JSX which is right before `</main>`
const finalRefEnd = lines.findIndex((l, i) => i > finalRefStart && l.includes('</main>'));
// The Referred By Page ends exactly before `</main>`. Wait, `</main>` is after `</div>` of the tab content wrapper.
// Let's trace it safely: 
//           {/* REFERRED BY PAGE */}
//           {activeTab === "referred-by" && (
//               <div className="max-w-[1400px] ..."> ... </div>
//           )}
//         </div>
//       </main>
// So the end is `          )}` before `        </div>`.
const expectedEnd = lines.findIndex((l, i) => i > finalRefStart && l.trim() === ')}' && lines[i+1].includes('</div>') && lines[i+2].includes('</main>'));

if (finalRefStart !== -1 && expectedEnd !== -1) {
  lines.splice(finalRefStart + 1, expectedEnd - finalRefStart, '          {activeTab === "referred-by" && (\n             <ReferredByTab\n                selectedReferrer={selectedReferrer}\n                setSelectedReferrer={setSelectedReferrer}\n                referrerStatusFilter={referrerStatusFilter}\n                setReferrerStatusFilter={setReferrerStatusFilter}\n                referrerStudents={referrerStudents}\n                referrers={referrers}\n                handleReferrerClick={handleReferrerClick}\n                setEditingReferrer={setEditingReferrer}\n                setIsReferrerModalOpen={setIsReferrerModalOpen}\n                handleClearReferrerAmount={handleClearReferrerAmount}\n             />\n          )}');
}

// Remove the unused Trash2, Inquiry, ReferredByTab imports if they exist. Wait, the user complained about unused variables.
// Actually, I'll just add the correct imports and let them overwrite.
lines.splice(12, 0, 'import { InquiryTab } from "./tabs/InquiryTab";\nimport { CourseTeachersTab } from "./tabs/CourseTeachersTab";\nimport { ReferredByTab } from "./tabs/ReferredByTab";');

fs.writeFileSync(file, lines.join('\n'));
console.log('Done refactoring UI');
