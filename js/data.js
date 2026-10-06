/**
 * FixIt – Saveetha Engineering College Campus Maintenance & AI Resolution System
 * Dataset & Hybrid Cloud Database Manager (Firebase Cloud Sync + LocalStorage)
 */

// SVG placeholder image generator for realistic issue demonstration
function createSvgDataUrl(category, text, bgColor, iconColor, isResolved = false) {
  const badgeText = isResolved ? "Resolved & Verified" : "Campus FixIt Evidence";
  const badgeBg = isResolved ? "#10b981" : iconColor;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
    <rect width="100%" height="100%" fill="${bgColor}"/>
    <circle cx="300" cy="170" r="60" fill="${iconColor}" fill-opacity="0.15"/>
    <text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="28" font-weight="bold" fill="${iconColor}">${category}</text>
    <text x="50%" y="62%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="16" fill="#64748b">${text}</text>
    <rect x="180" y="310" width="240" height="32" rx="16" fill="${badgeBg}" fill-opacity="0.15"/>
    <text x="50%" y="82%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="700" fill="${badgeBg}">${badgeText}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

// Initial Real-world Complaints for Saveetha Engineering College
const INITIAL_COMPLAINTS = [
  {
    id: "FIX-2026-001",
    title: "Continuous water pipe leak under sink in Chemistry Lab 3",
    category: "Plumbing",
    building: "CSC Block (Computer Science)",
    floor: "1st Floor",
    room: "Data Analytics Lab (Room 104)",
    priority: "High",
    slaHours: 12,
    status: "In Progress",
    upvotes: 8,
    description: "The cooling drainage line below server rack #4 is leaking water onto the floor near network cables.",
    photo: createSvgDataUrl("Plumbing Leak", "CSC Lab Floor Sink 4", "#f0f9ff", "#0284c7"),
    afterPhoto: "",
    rating: 0,
    ecoImpact: { waterSaved: 380, energySaved: 0, costSaved: 2200 },
    reporterName: "Dr. K. Ramanathan",
    reporterId: "FAC-CSC-042",
    reporterEmail: "ramanathan.k@saveetha.ac.in",
    reporterPhone: "+91 9845123001",
    assignedTo: "Suresh M. (Plumbing Tech)",
    createdAt: "2026-10-05T09:30:00",
    timeline: [
      { author: "Dr. K. Ramanathan", time: "Oct 5, 09:30 AM", text: "Complaint logged for CSC Block lab pipe leak." },
      { author: "Facility Admin", time: "Oct 5, 10:15 AM", text: "AI triage classified as Plumbing (High). Assigned to Suresh M." },
      { author: "Suresh M.", time: "Oct 5, 02:00 PM", text: "Temporary valve shutoff performed. Replacement PVC elbow joint requested." }
    ]
  },
  {
    id: "FIX-2026-002",
    title: "Ceiling projector HDMI display blinking intermittently in Board Room",
    category: "Classroom & AV",
    building: "Admin Block",
    floor: "Ground Floor",
    room: "Main Board Room & Seminar Hall",
    priority: "Medium",
    slaHours: 24,
    status: "Resolved",
    upvotes: 19,
    description: "The ceiling-mounted Epson 4K projector disconnects every 5 minutes during presentations due to a loose wall port adapter.",
    photo: createSvgDataUrl("AV Defect (Before)", "Admin Board Room Projector", "#f5f3ff", "#7c3aed"),
    afterPhoto: createSvgDataUrl("AV Restored (After)", "Projector Display Tested 1080p", "#f0fdf4", "#15803d", true),
    rating: 5,
    ecoImpact: { waterSaved: 0, energySaved: 12, costSaved: 1500 },
    reporterName: "Yuvaadhika",
    reporterId: "21CS108",
    reporterEmail: "yuvaadhika@student.saveetha.ac.in",
    reporterPhone: "+91 9123456780",
    assignedTo: "Deepak R. (AV & IT Support)",
    createdAt: "2026-10-04T11:20:00",
    resolvedAt: "2026-10-04T15:45:00",
    timeline: [
      { author: "Yuvaadhika", time: "Oct 4, 11:20 AM", text: "Complaint submitted via student portal." },
      { author: "Deepak R.", time: "Oct 4, 01:10 PM", text: "Inspected wiring. Replaced faulty 10m high-speed HDMI line." },
      { author: "Deepak R.", time: "Oct 4, 03:45 PM", text: "Tested with 2 laptops for 30 mins. Display working stably. Marked as Resolved." },
      { author: "Yuvaadhika", time: "Oct 4, 04:00 PM", text: "Rated 5/5 stars: Excellent prompt repair before evening symposium!" }
    ]
  },
  {
    id: "FIX-2026-003",
    title: "Broken armrest and loose wooden desk frame in Hall 302",
    category: "Furniture",
    building: "RB (Ramanujan Block)",
    floor: "3rd Floor",
    room: "Lecture Hall 302 (Row 4)",
    priority: "Low",
    slaHours: 72,
    status: "Pending",
    upvotes: 4,
    description: "Desk bench #14 in Row 4 has detached wooden slats and protruding screws that can cause clothing tears or scratches.",
    photo: createSvgDataUrl("Furniture Defect", "RB Hall 302 Desk 14", "#fffbeb", "#d97706"),
    afterPhoto: "",
    rating: 0,
    ecoImpact: { waterSaved: 0, energySaved: 0, costSaved: 800 },
    reporterName: "Priya Sundaram",
    reporterId: "22EC054",
    reporterEmail: "priya.s@student.saveetha.ac.in",
    reporterPhone: "+91 9887766554",
    assignedTo: "Unassigned",
    createdAt: "2026-10-05T14:10:00",
    timeline: [
      { author: "Priya Sundaram", time: "Oct 5, 02:10 PM", text: "Complaint logged for broken bench desk in RB Hall 302." }
    ]
  },
  {
    id: "FIX-2026-004",
    title: "Electrical switchboard sparking and MCB trip in Embedded Lab",
    category: "Electrical",
    building: "ECE Block (Electronics & Comm)",
    floor: "2nd Floor",
    room: "Embedded Systems Lab (Room 210)",
    priority: "Critical",
    slaHours: 4,
    status: "In Progress",
    upvotes: 27,
    description: "Main power outlet cluster next to Workbench #3 produced visible sparks when plugging in oscilloscope. Strong burning plastic odor.",
    photo: createSvgDataUrl("Electrical Hazard", "ECE Workbench 3 Switchboard", "#fff1f2", "#be123c"),
    afterPhoto: "",
    rating: 0,
    ecoImpact: { waterSaved: 0, energySaved: 18, costSaved: 4500 },
    reporterName: "Prof. Arvind Ghosh",
    reporterId: "FAC-ECE-019",
    reporterEmail: "arvind.g@saveetha.ac.in",
    reporterPhone: "+91 9771122334",
    assignedTo: "Rajesh Kumar (Electrician)",
    createdAt: "2026-10-06T08:15:00",
    timeline: [
      { author: "Prof. Arvind Ghosh", time: "Oct 6, 08:15 AM", text: "Urgent electrical complaint submitted. Auto-triaged to Critical." },
      { author: "Campus Safety", time: "Oct 6, 08:20 AM", text: "MCB isolated for safety. Rajesh Kumar dispatched to site." }
    ]
  },
  {
    id: "FIX-2026-005",
    title: "Central AC cooling issue and duct rattle noise in SAIL Robotics Lab",
    category: "HVAC / AC",
    building: "SAIL Block (AI & Innovation Lab)",
    floor: "4th Floor",
    room: "Innovation Arena Lab 401",
    priority: "Medium",
    slaHours: 24,
    status: "Pending",
    upvotes: 11,
    description: "The 3-Ton cassette AC unit is blowing ambient air and making loud fan rattle during project demos.",
    photo: createSvgDataUrl("HVAC Unit", "SAIL Innovation AC Unit", "#f0fdfa", "#0d9488"),
    afterPhoto: "",
    rating: 0,
    ecoImpact: { waterSaved: 0, energySaved: 24, costSaved: 3000 },
    reporterName: "Dinesh K.",
    reporterId: "21AI032",
    reporterEmail: "dinesh.k@student.saveetha.ac.in",
    reporterPhone: "+91 9443322110",
    assignedTo: "Unassigned",
    createdAt: "2026-10-05T16:40:00",
    timeline: [
      { author: "Dinesh K.", time: "Oct 5, 04:40 PM", text: "Complaint registered for SAIL lab cooling failure." }
    ]
  },
  {
    id: "FIX-2026-006",
    title: "Washroom water tap handle broken & continuous overflow in Noyyal Hostel",
    category: "Plumbing",
    building: "Noyyal Hostel",
    floor: "1st Floor",
    room: "West Wing Common Washroom (Room 108)",
    priority: "High",
    slaHours: 12,
    status: "Resolved",
    upvotes: 14,
    description: "Tap spindle broke while turning off. Water continuously spilling into drainage channel.",
    photo: createSvgDataUrl("Plumbing Leak", "Noyyal Hostel Tap #2", "#f0f9ff", "#0284c7"),
    afterPhoto: createSvgDataUrl("New Brass Tap (After)", "Repaired & Pressure Tested", "#f0fdf4", "#15803d", true),
    rating: 5,
    ecoImpact: { waterSaved: 1440, energySaved: 0, costSaved: 1800 },
    reporterName: "Rohit Nambiar",
    reporterId: "23ME112",
    reporterEmail: "rohit.n@student.saveetha.ac.in",
    reporterPhone: "+91 9556677889",
    assignedTo: "Suresh M. (Plumbing Tech)",
    createdAt: "2026-10-04T07:15:00",
    resolvedAt: "2026-10-04T10:30:00",
    timeline: [
      { author: "Rohit Nambiar", time: "Oct 4, 07:15 AM", text: "Urgent plumbing issue reported from Noyyal Hostel." },
      { author: "Suresh M.", time: "Oct 4, 08:30 AM", text: "Replaced faulty brass cartridge and spindle." },
      { author: "Facility Admin", time: "Oct 4, 10:30 AM", text: "Inspected and marked resolved." }
    ]
  },
  {
    id: "FIX-2026-007",
    title: "Cracked floor tile hazard near Line Canteen entrance walkway",
    category: "Civil & Infrastructure",
    building: "Line Canteen & Trends Food Court",
    floor: "Ground Floor",
    room: "Main Dining Hall Porch",
    priority: "Medium",
    slaHours: 24,
    status: "Pending",
    upvotes: 6,
    description: "Three large granite tiles are cracked and uneven, creating a tripping hazard for students entering the dining hall.",
    photo: createSvgDataUrl("Civil Damage", "Line Canteen Entrance Walkway", "#f5f5f4", "#78716c"),
    afterPhoto: "",
    rating: 0,
    ecoImpact: { waterSaved: 0, energySaved: 0, costSaved: 1200 },
    reporterName: "Ananya Iyer",
    reporterId: "22BT018",
    reporterEmail: "ananya.i@student.saveetha.ac.in",
    reporterPhone: "+91 9988771122",
    assignedTo: "Campus Facilities Rapid Team",
    createdAt: "2026-10-05T18:20:00",
    timeline: [
      { author: "Ananya Iyer", time: "Oct 5, 06:20 PM", text: "Complaint logged with photo of loose tiles." },
      { author: "Facility Admin", time: "Oct 5, 07:00 PM", text: "Safety caution tape placed around the cracked tile area." }
    ]
  },
  {
    id: "FIX-2026-008",
    title: "Faulty High-Mast Floodlight in Cricket Ground East Corner",
    category: "Electrical",
    building: "Cricket & Track Grounds",
    floor: "Outdoor / Campus Ground",
    room: "Pavilion East Pole #2",
    priority: "Medium",
    slaHours: 24,
    status: "Pending",
    upvotes: 9,
    description: "400W LED floodlight unit flickers constantly during evening practice sessions.",
    photo: createSvgDataUrl("Outdoor Lighting", "Cricket Ground East Pole", "#fff1f2", "#be123c"),
    afterPhoto: "",
    rating: 0,
    ecoImpact: { waterSaved: 0, energySaved: 35, costSaved: 1600 },
    reporterName: "Vignesh Raj (Sports Sec)",
    reporterId: "21ME099",
    reporterEmail: "vignesh.r@student.saveetha.ac.in",
    reporterPhone: "+91 9884455667",
    assignedTo: "Rajesh Kumar (Electrician)",
    createdAt: "2026-10-06T07:45:00",
    timeline: [
      { author: "Vignesh Raj", time: "Oct 6, 07:45 AM", text: "Reported floodlight flickering for evening tournament." }
    ]
  }
];

// Saveetha Engineering College Campus Map Zones & Hotspot Coordinates
const SAVEETHA_CAMPUS_MAP_DATA = [
  {
    id: "admin-block",
    name: "Admin Block",
    shortName: "Admin Block",
    coords: "Central Administrative Ring",
    x: 69.5, // % from left
    y: 73.0, // % from top
    icon: "ph-bank",
    category: "Academic & Admin",
    floors: ["Ground Floor", "1st Floor", "2nd Floor", "3rd Floor"],
    rooms: ["Principal Office", "Dean Academics", "Board Room", "Controller of Exams", "Admissions Hall"],
    description: "Central administrative headquarters, executive offices, and official meeting chambers."
  },
  {
    id: "csc-block",
    name: "CSC Block (Computer Science)",
    shortName: "CSC Block",
    coords: "East Academic Ring",
    x: 77.2,
    y: 67.5,
    icon: "ph-code",
    category: "Academic & Admin",
    floors: ["Ground Floor", "1st Floor", "2nd Floor", "3rd Floor", "4th Floor"],
    rooms: ["AI & ML Lab (Room 101)", "Cloud Computing Lab 204", "Data Science Arena 302", "Smart Class 405"],
    description: "Computer Science and Information Technology engineering departments and software research labs."
  },
  {
    id: "ece-block",
    name: "ECE Block (Electronics & Comm)",
    shortName: "ECE Block",
    coords: "South-West Academic Ring",
    x: 62.5,
    y: 68.0,
    icon: "ph-cpu",
    category: "Academic & Admin",
    floors: ["Ground Floor", "1st Floor", "2nd Floor", "3rd Floor"],
    rooms: ["VLSI Design Lab", "Embedded Systems Lab 210", "DSP Hall 301", "Robotics Workshop"],
    description: "Electronics and Communication Engineering department and hardware testbeds."
  },
  {
    id: "eee-block",
    name: "EEE Block (Electrical & Electronics)",
    shortName: "EEE Block",
    coords: "West Academic Ring",
    x: 60.2,
    y: 60.5,
    icon: "ph-lightning",
    category: "Academic & Admin",
    floors: ["Ground Floor", "1st Floor", "2nd Floor", "3rd Floor"],
    rooms: ["Power Systems Lab", "Electrical Machines Hall", "Renewable Energy Research", "Power Electronics Lab"],
    description: "Electrical and Electronics Engineering laboratories, substations, and power systems research."
  },
  {
    id: "sail-block",
    name: "SAIL Block (AI & Innovation Lab)",
    shortName: "SAIL Block",
    coords: "North-East Academic Ring",
    x: 77.0,
    y: 57.0,
    icon: "ph-robot",
    category: "Academic & Admin",
    floors: ["Ground Floor", "1st Floor", "2nd Floor", "3rd Floor", "4th Floor"],
    rooms: ["Innovation Hub 401", "AR/VR Immersive Lab", "Incubation Center", "Makerspace 202"],
    description: "Saveetha AI Learning (SAIL) hub, startup incubation center, and advanced computing clusters."
  },
  {
    id: "noyyal-hostel",
    name: "Noyyal Hostel",
    shortName: "Noyyal Hostel",
    coords: "North-East Residential Complex",
    x: 79.5,
    y: 25.5,
    icon: "ph-bed",
    category: "Hostels",
    floors: ["Ground Floor", "1st Floor", "2nd Floor", "3rd Floor", "4th Floor"],
    rooms: ["Block A (Rooms 101-140)", "Block B (Rooms 201-240)", "Common Lounge", "Study Hall", "Dining Mess"],
    description: "Multi-storey student residential hostel with modern amenities and reading halls."
  },
  {
    id: "kaveri-hostel",
    name: "Kaveri Hostel",
    shortName: "Kaveri Hostel",
    coords: "West Residential Complex",
    x: 9.0,
    y: 58.5,
    icon: "ph-bed",
    category: "Hostels",
    floors: ["Ground Floor", "1st Floor", "2nd Floor", "3rd Floor"],
    rooms: ["Wing 1 (Rooms 101-120)", "Wing 2 (Rooms 201-220)", "Hostel Gym", "Recreation Room"],
    description: "Student residence block situated next to the western athletic gardens."
  },
  {
    id: "siruvani-hostel",
    name: "Siruvani Hostel",
    shortName: "Siruvani Hostel",
    coords: "Central West Residential Block",
    x: 34.0,
    y: 59.0,
    icon: "ph-bed",
    category: "Hostels",
    floors: ["Ground Floor", "1st Floor", "2nd Floor", "3rd Floor"],
    rooms: ["Rooms 101-135", "Rooms 201-235", "Solar Water Heating System", "Mess Hall"],
    description: "Modern campus hostel adjacent to equatorial gardens and pedestrian avenues."
  },
  {
    id: "palar-hostel",
    name: "Palar Hostel",
    shortName: "Palar Hostel",
    coords: "South-West Residential Wing",
    x: 11.5,
    y: 71.0,
    icon: "ph-bed",
    category: "Hostels",
    floors: ["Ground Floor", "1st Floor", "2nd Floor"],
    rooms: ["Rooms 101-115", "Rooms 201-215", "Student Common Room"],
    description: "Hostel block located near the south-west entrance and sports arena."
  },
  {
    id: "scon-complex",
    name: "SCON (Saveetha Nursing & Medical)",
    shortName: "SCON Complex",
    coords: "South-West Medical & Nursing Zone",
    x: 20.0,
    y: 77.0,
    icon: "ph-first-aid",
    category: "Academic & Admin",
    floors: ["Ground Floor", "1st Floor", "2nd Floor", "3rd Floor"],
    rooms: ["Clinical Skills Lab", "Anatomy Hall", "Seminar Hall", "Medical Simulation Room"],
    description: "Saveetha College of Nursing & Allied Medical Sciences training facility."
  },
  {
    id: "rb-block",
    name: "RB (Ramanujan Block)",
    shortName: "RB (Ramanujan Block)",
    coords: "Central Academic Hub",
    x: 47.0,
    y: 59.0,
    icon: "ph-chalkboard-teacher",
    category: "Academic & Admin",
    floors: ["Ground Floor", "1st Floor", "2nd Floor", "3rd Floor", "4th Floor"],
    rooms: ["Lecture Hall 302", "Math Computing Center", "Faculty Chambers", "Smart Audio Hall"],
    description: "Primary classroom building with high-capacity tiered lecture theatres."
  },
  {
    id: "ahs-block",
    name: "AHS Block (Allied Health Sciences)",
    shortName: "AHS Block",
    coords: "South-East Medical Pavilion",
    x: 94.0,
    y: 88.0,
    icon: "ph-heartbeat",
    category: "Academic & Admin",
    floors: ["Ground Floor", "1st Floor", "2nd Floor"],
    rooms: ["Bio-Tech Testing Lab", "Physiotherapy Hall", "Health Research Wing"],
    description: "Allied Health Sciences academic wing situated at the south-eastern boundary."
  },
  {
    id: "cricket-ground",
    name: "Cricket & Track Grounds",
    shortName: "Sports Grounds",
    coords: "North-West Sports Arena",
    x: 21.0,
    y: 22.0,
    icon: "ph-trophy",
    category: "Sports & Grounds",
    floors: ["Outdoor / Campus Ground"],
    rooms: ["Cricket Pavilion", "Synthetic 400m Running Track", "Sports Equipment Center", "Score Tower"],
    description: "Full-scale athletic stadium with synthetic running track and cricket turf."
  },
  {
    id: "campus-lake",
    name: "Campus Lake & Water Reservoir",
    shortName: "Campus Lake",
    coords: "North Water Body Zone",
    x: 73.5,
    y: 14.0,
    icon: "ph-drop",
    category: "Amenities & Campus",
    floors: ["Outdoor Grounds"],
    rooms: ["Eco Rainwater Harvesting Station", "Aeration Pumps", "Walking Promenade"],
    description: "Campus rainwater harvesting lake and groundwater replenishment system."
  },
  {
    id: "bus-parking",
    name: "Bus Parking & SCAD Hub",
    shortName: "Bus Terminal & SCAD",
    coords: "North Transport Hub",
    x: 49.0,
    y: 14.5,
    icon: "ph-bus",
    category: "Amenities & Campus",
    floors: ["Ground Level"],
    rooms: ["Fleet Bay 1-20", "EV Charging Station", "SCAD 2.0 Workshop", "Driver Lounge"],
    description: "Central transit depot for university transport buses and fleet maintenance bays."
  },
  {
    id: "line-canteen",
    name: "Line Canteen & Trends Food Court",
    shortName: "Line Canteen",
    coords: "South Food Court Pavilion",
    x: 36.0,
    y: 91.0,
    icon: "ph-fork-knife",
    category: "Amenities & Campus",
    floors: ["Ground Floor", "1st Floor"],
    rooms: ["Central Food Court", "Trends Cafe", "Creamy Spoon", "Mummy's Frankie", "Snack Avenue"],
    description: "Main campus dining complex with food franchises, bakery, and beverage bars."
  },
  {
    id: "stadium-zone",
    name: "Stadium & Utility Zone",
    shortName: "Stadium & Utility",
    coords: "Central East Utility Arena",
    x: 74.0,
    y: 41.0,
    icon: "ph-gas-pump",
    category: "Sports & Grounds",
    floors: ["Ground Level"],
    rooms: ["Mini Stadium", "Campus Generator Room", "Campus Fuel Station", "Substation 2"],
    description: "Secondary sports stadium, primary diesel generator plant, and safety utilities."
  },
  {
    id: "guest-house",
    name: "Guest House & Stone Bench Area",
    shortName: "Guest House",
    coords: "East Residential Avenue",
    x: 89.0,
    y: 44.0,
    icon: "ph-house-line",
    category: "Amenities & Campus",
    floors: ["Ground Floor", "1st Floor"],
    rooms: ["VIP Suites 101-110", "Executive Dining Lounge", "Stone Bench Garden"],
    description: "Visiting dignitaries guest house and landscaped stone bench relaxation garden."
  },
  {
    id: "central-fountain",
    name: "Central Garden & Fountain Ring",
    shortName: "Central Garden",
    coords: "Central Campus Circle",
    x: 70.0,
    y: 83.0,
    icon: "ph-flower-tulip",
    category: "Amenities & Campus",
    floors: ["Outdoor Plaza"],
    rooms: ["Central Illuminated Fountain", "Equatorial Walkway", "Green Amphitheater"],
    description: "Lush botanical gardens, central fountain roundabout, and student plaza."
  }
];

const STORAGE_KEY = "fixit_saveetha_complaints_v3";
const CLOUD_CONFIG_KEY = "fixit_cloud_db_config_v1";

// Default Cloud Database Configuration (Firebase Realtime REST DB)
const DEFAULT_CLOUD_CONFIG = {
  enabled: true,
  provider: "Firebase Realtime DB",
  // Public real-time endpoint for instant cloud sync
  endpointUrl: "https://campus-maintenance-sec-default-rtdb.firebaseio.com/complaints.json",
  lastSyncTime: null,
  status: "connected" // 'connected', 'syncing', 'error', 'offline'
};

const DataStore = {
  listeners: [],

  subscribe(listener) {
    if (typeof listener === "function") {
      this.listeners.push(listener);
    }
  },

  notifyListeners(eventType, data) {
    this.listeners.forEach(fn => {
      try {
        fn(eventType, data);
      } catch (e) {
        console.error("Listener error:", e);
      }
    });
  },

  getCloudConfig() {
    try {
      const stored = localStorage.getItem(CLOUD_CONFIG_KEY);
      if (stored) {
        return { ...DEFAULT_CLOUD_CONFIG, ...JSON.parse(stored) };
      }
    } catch (e) {
      console.warn("Could not read cloud config:", e);
    }
    return DEFAULT_CLOUD_CONFIG;
  },

  saveCloudConfig(config) {
    try {
      localStorage.setItem(CLOUD_CONFIG_KEY, JSON.stringify(config));
      this.notifyListeners("cloud_config_updated", config);
    } catch (e) {
      console.error("Failed to save cloud config:", e);
    }
  },

  getComplaints() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn("LocalStorage access error:", e);
    }
    this.saveComplaints(INITIAL_COMPLAINTS, false);
    return INITIAL_COMPLAINTS;
  },

  saveComplaints(complaints, triggerCloudPush = true) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(complaints));
      this.notifyListeners("complaints_updated", complaints);
      if (triggerCloudPush) {
        this.pushToCloud(complaints);
      }
    } catch (e) {
      console.error("Failed to save complaints locally:", e);
    }
  },

  addComplaint(newComplaint) {
    const list = this.getComplaints();
    list.unshift(newComplaint);
    this.saveComplaints(list, true);
    return list;
  },

  updateComplaint(id, updatedFields) {
    const list = this.getComplaints();
    const index = list.findIndex(c => c.id === id);
    if (index !== -1) {
      list[index] = { ...list[index], ...updatedFields };
      this.saveComplaints(list, true);
      return list[index];
    }
    return null;
  },

  incrementUpvote(id) {
    const list = this.getComplaints();
    const item = list.find(c => c.id === id);
    if (item) {
      item.upvotes = (item.upvotes || 0) + 1;
      this.saveComplaints(list, true);
      return item.upvotes;
    }
    return 0;
  },

  rateComplaint(id, rating) {
    const list = this.getComplaints();
    const item = list.find(c => c.id === id);
    if (item) {
      item.rating = rating;
      this.saveComplaints(list, true);
      return item;
    }
    return null;
  },

  deleteComplaint(id) {
    let list = this.getComplaints();
    list = list.filter(c => c.id !== id);
    this.saveComplaints(list, true);
    return list;
  },

  resetToDefault() {
    this.saveComplaints(INITIAL_COMPLAINTS, true);
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
    }, 8);
    const nextNum = maxNum + 1;
    return `FIX-2026-${String(nextNum).padStart(3, "0")}`;
  },

  // ==========================================
  // Cloud Database Synchronization Engine
  // ==========================================
  async pushToCloud(complaintsList = null) {
    const config = this.getCloudConfig();
    if (!config.enabled || !config.endpointUrl) return false;

    const dataToPush = complaintsList || this.getComplaints();
    try {
      this.notifyListeners("cloud_status_change", { status: "syncing", message: "Pushing to Cloud DB..." });
      
      const response = await fetch(config.endpointUrl, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToPush)
      });

      if (response.ok) {
        config.lastSyncTime = new Date().toISOString();
        config.status = "connected";
        this.saveCloudConfig(config);
        this.notifyListeners("cloud_status_change", { status: "connected", message: "Cloud Synced", lastSync: config.lastSyncTime });
        return true;
      } else {
        throw new Error(`Cloud HTTP Error ${response.status}`);
      }
    } catch (err) {
      console.warn("Cloud DB Push Notice (Offline/Fallback Mode):", err.message);
      config.status = "offline";
      this.saveCloudConfig(config);
      this.notifyListeners("cloud_status_change", { status: "offline", message: "Local Cache Active" });
      return false;
    }
  },

  async pullFromCloud() {
    const config = this.getCloudConfig();
    if (!config.enabled || !config.endpointUrl) return null;

    try {
      this.notifyListeners("cloud_status_change", { status: "syncing", message: "Checking Cloud DB..." });
      
      const response = await fetch(config.endpointUrl, {
        method: "GET",
        headers: { "Accept": "application/json" }
      });

      if (response.ok) {
        const cloudData = await response.json();
        if (Array.isArray(cloudData) && cloudData.length > 0) {
          // Merge or update local with cloud
          localStorage.setItem(STORAGE_KEY, JSON.stringify(cloudData));
          config.lastSyncTime = new Date().toISOString();
          config.status = "connected";
          this.saveCloudConfig(config);
          this.notifyListeners("complaints_updated", cloudData);
          this.notifyListeners("cloud_status_change", { status: "connected", message: "Cloud Synced", lastSync: config.lastSyncTime });
          return cloudData;
        } else if (cloudData === null) {
          // Cloud is empty, seed it with initial complaints
          await this.pushToCloud(INITIAL_COMPLAINTS);
          return INITIAL_COMPLAINTS;
        }
      }
    } catch (err) {
      console.warn("Cloud DB Pull Notice (Using Local DB):", err.message);
      config.status = "offline";
      this.saveCloudConfig(config);
      this.notifyListeners("cloud_status_change", { status: "offline", message: "Local Cache Active" });
    }
    return this.getComplaints();
  },

  // Initialize auto cloud sync polling
  initCloudSync(intervalMs = 15000) {
    // Initial fetch from cloud
    this.pullFromCloud();

    // Auto-polling interval
    setInterval(() => {
      if (document.visibilityState === "visible") {
        this.pullFromCloud();
      }
    }, intervalMs);

    // Sync on tab focus
    window.addEventListener("focus", () => {
      this.pullFromCloud();
    });
  }
};
