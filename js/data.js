/**
 * FixIt – Campus Maintenance Reporting & Resolution System
 * Initial Mock Dataset and Storage Manager
 */

// SVG placeholder image generator for realistic issue demonstration
function createSvgDataUrl(category, text, bgColor, iconColor) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
    <rect width="100%" height="100%" fill="${bgColor}"/>
    <circle cx="300" cy="170" r="60" fill="${iconColor}" fill-opacity="0.15"/>
    <text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="28" font-weight="bold" fill="${iconColor}">${category}</text>
    <text x="50%" y="62%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="16" fill="#64748b">${text}</text>
    <rect x="200" y="310" width="200" height="30" rx="15" fill="${iconColor}" fill-opacity="0.1"/>
    <text x="50%" y="82%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="600" fill="${iconColor}">Campus FixIt Evidence</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

const INITIAL_COMPLAINTS = [
  {
    id: "FIX-2026-001",
    title: "Continuous water pipe leak under sink in Chemistry Lab 3",
    category: "Plumbing",
    building: "Science & Lab Block",
    floor: "1st Floor",
    room: "Chemistry Lab 3 (Room 104)",
    priority: "High",
    status: "In Progress",
    description: "The drainage pipe below sink #4 is cracked and continuously leaking water onto the floor, causing slippery conditions near reagent storage.",
    photo: createSvgDataUrl("Plumbing Leak", "Chemistry Lab Sink 4", "#f0f9ff", "#0284c7"),
    reporterName: "Dr. K. Ramanathan",
    reporterId: "FAC-CHE-042",
    reporterEmail: "ramanathan.k@campus.edu",
    reporterPhone: "+91 9845123001",
    assignedTo: "Suresh M. (Plumbing Tech)",
    createdAt: "2026-10-05T09:30:00",
    timeline: [
      { author: "Dr. K. Ramanathan", time: "Oct 5, 09:30 AM", text: "Complaint logged for Chemistry Lab 3 sink leak." },
      { author: "Facility Admin", time: "Oct 5, 10:15 AM", text: "Priority elevated to High. Assigned to Suresh M. (Plumbing Tech)." },
      { author: "Suresh M.", time: "Oct 5, 02:00 PM", text: "Temporary valve shutoff performed. Replacement PVC elbow joint requested." }
    ]
  },
  {
    id: "FIX-2026-002",
    title: "Ceiling projector HDMI display blinking intermittently in Audi-2",
    category: "Classroom & AV",
    building: "Auditorium & Sports Complex",
    floor: "Ground Floor",
    room: "Seminar Hall Audi-2",
    priority: "Medium",
    status: "Resolved",
    description: "The ceiling-mounted Epson projector disconnects every 5 minutes during guest lectures due to a loose wall port adapter.",
    photo: createSvgDataUrl("AV Equipment", "Ceiling Projector Audi-2", "#f5f3ff", "#7c3aed"),
    reporterName: "Yuvaadhika",
    reporterId: "21CS108",
    reporterEmail: "yuvaadhika@student.campus.edu",
    reporterPhone: "+91 9123456780",
    assignedTo: "Deepak R. (AV & IT Support)",
    createdAt: "2026-10-04T11:20:00",
    resolvedAt: "2026-10-04T15:45:00",
    timeline: [
      { author: "Yuvaadhika", time: "Oct 4, 11:20 AM", text: "Complaint submitted via student portal." },
      { author: "Deepak R.", time: "Oct 4, 01:10 PM", text: "Inspected wiring. Replaced faulty 10m high-speed HDMI line." },
      { author: "Deepak R.", time: "Oct 4, 03:45 PM", text: "Tested with 2 laptops for 30 mins. Display working stably. Marked as Resolved." }
    ]
  },
  {
    id: "FIX-2026-003",
    title: "Broken armrest and loose wooden desk frame in Hall 302",
    category: "Furniture",
    building: "Main Academic Block",
    floor: "3rd Floor",
    room: "Lecture Hall 302 (Row 4)",
    priority: "Low",
    status: "Pending",
    description: "Desk bench #14 in Row 4 has detached wooden slats and protruding screws that can cause clothing tears or scratches.",
    photo: createSvgDataUrl("Furniture Defect", "Desk Bench 14 Row 4", "#fffbeb", "#d97706"),
    reporterName: "Priya Sundaram",
    reporterId: "22EC054",
    reporterEmail: "priya.s@student.campus.edu",
    reporterPhone: "+91 9887766554",
    assignedTo: "Unassigned",
    createdAt: "2026-10-05T14:10:00",
    timeline: [
      { author: "Priya Sundaram", time: "Oct 5, 02:10 PM", text: "Complaint logged for broken bench desk in Lecture Hall 302." }
    ]
  },
  {
    id: "FIX-2026-004",
    title: "Electrical switchboard sparking and trip switch burning smell",
    category: "Electrical",
    building: "Engineering Quad",
    floor: "2nd Floor",
    room: "Embedded Systems Lab (Room 210)",
    priority: "Critical",
    status: "In Progress",
    description: "Main power outlet cluster next to Workbench #3 produced visible sparks when plugging in oscilloscope. Strong burning plastic odor.",
    photo: createSvgDataUrl("Electrical Hazard", "Switchboard Workbench 3", "#fff1f2", "#be123c"),
    reporterName: "Prof. Arvind Ghosh",
    reporterId: "FAC-EEE-019",
    reporterEmail: "arvind.g@campus.edu",
    reporterPhone: "+91 9771122334",
    assignedTo: "Rajesh Kumar (Electrician)",
    createdAt: "2026-10-06T08:15:00",
    timeline: [
      { author: "Prof. Arvind Ghosh", time: "Oct 6, 08:15 AM", text: "Urgent electrical complaint submitted." },
      { author: "Campus Safety", time: "Oct 6, 08:20 AM", text: "MCB isolated for safety. Rajesh Kumar dispatched to site." }
    ]
  },
  {
    id: "FIX-2026-005",
    title: "Split AC blowing warm air and noisy compressor in Central Library",
    category: "HVAC / AC",
    building: "Central Library",
    floor: "2nd Floor",
    room: "Digital Periodicals Section",
    priority: "Medium",
    status: "Pending",
    description: "The 2-Ton Carrier unit in the digital section is making grinding vibrations and no cooling is produced during afternoon peak hours.",
    photo: createSvgDataUrl("HVAC Unit", "Digital Library Split AC", "#f0fdfa", "#0d9488"),
    reporterName: "S. Murugan (Librarian)",
    reporterId: "LIB-STAFF-08",
    reporterEmail: "library.help@campus.edu",
    reporterPhone: "+91 9443322110",
    assignedTo: "Unassigned",
    createdAt: "2026-10-05T16:40:00",
    timeline: [
      { author: "S. Murugan", time: "Oct 5, 04:40 PM", text: "Complaint registered for library air conditioning failure." }
    ]
  },
  {
    id: "FIX-2026-006",
    title: "Washroom tap handle broken & continuous water overflow",
    category: "Plumbing",
    building: "Hostel Block A",
    floor: "1st Floor",
    room: "West Wing Common Washroom",
    priority: "High",
    status: "Resolved",
    description: "Tap spindle broke while turning off. Water continuously spilling into drainage channel.",
    photo: createSvgDataUrl("Plumbing Fixed", "Hostel A Washroom", "#f0f9ff", "#0284c7"),
    reporterName: "Rohit Nambiar",
    reporterId: "23ME112",
    reporterEmail: "rohit.n@student.campus.edu",
    reporterPhone: "+91 9556677889",
    assignedTo: "Suresh M. (Plumbing Tech)",
    createdAt: "2026-10-04T07:15:00",
    resolvedAt: "2026-10-04T10:30:00",
    timeline: [
      { author: "Rohit Nambiar", time: "Oct 4, 07:15 AM", text: "Urgent plumbing issue reported from Hostel Block A." },
      { author: "Suresh M.", time: "Oct 4, 08:30 AM", text: "Replaced faulty brass cartridge and spindle." },
      { author: "Facility Admin", time: "Oct 4, 10:30 AM", text: "Inspected and marked resolved." }
    ]
  },
  {
    id: "FIX-2026-007",
    title: "Cracked floor tile hazard near Cafeteria entrance walkway",
    category: "Civil & Infrastructure",
    building: "Cafeteria Building",
    floor: "Ground Floor",
    room: "Main Entrance Porch",
    priority: "Medium",
    status: "Pending",
    description: "Three large granite tiles are cracked and uneven, creating a tripping hazard for students entering the dining hall.",
    photo: createSvgDataUrl("Civil Damage", "Cafeteria Entrance Porch", "#f5f5f4", "#78716c"),
    reporterName: "Ananya Iyer",
    reporterId: "22BT018",
    reporterEmail: "ananya.i@student.campus.edu",
    reporterPhone: "+91 9988771122",
    assignedTo: "Campus Facilities Rapid Team",
    createdAt: "2026-10-05T18:20:00",
    timeline: [
      { author: "Ananya Iyer", time: "Oct 5, 06:20 PM", text: "Complaint logged with photo of loose tiles." },
      { author: "Facility Admin", time: "Oct 5, 07:00 PM", text: "Safety caution tape placed around the cracked tile area." }
    ]
  }
];

const STORAGE_KEY = "fixit_campus_complaints_v1";

const DataStore = {
  getComplaints() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn("LocalStorage access error:", e);
    }
    // Initialize default if not exists
    this.saveComplaints(INITIAL_COMPLAINTS);
    return INITIAL_COMPLAINTS;
  },

  saveComplaints(complaints) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(complaints));
    } catch (e) {
      console.error("Failed to save complaints:", e);
    }
  },

  addComplaint(newComplaint) {
    const list = this.getComplaints();
    list.unshift(newComplaint);
    this.saveComplaints(list);
    return list;
  },

  updateComplaint(id, updatedFields) {
    const list = this.getComplaints();
    const index = list.findIndex(c => c.id === id);
    if (index !== -1) {
      list[index] = { ...list[index], ...updatedFields };
      this.saveComplaints(list);
      return list[index];
    }
    return null;
  },

  deleteComplaint(id) {
    let list = this.getComplaints();
    list = list.filter(c => c.id !== id);
    this.saveComplaints(list);
    return list;
  },

  resetToDefault() {
    this.saveComplaints(INITIAL_COMPLAINTS);
    return INITIAL_COMPLAINTS;
  },

  getNextId() {
    const list = this.getComplaints();
    const maxNum = list.reduce((max, item) => {
      const parts = item.id.split("-");
      if (parts.length === 3) {
        const num = parseInt(parts[2], 10);
        return !isNaN(num) && num > max ? num : max;
      }
      return max;
    }, 7);
    const nextNum = maxNum + 1;
    return `FIX-2026-${String(nextNum).padStart(3, "0")}`;
  }
};
