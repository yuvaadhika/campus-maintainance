# 🛠️ FixIt – Campus Maintenance Reporting & Resolution System

> **Problem Statement 5 (PS 5):**
> Problems such as damaged furniture, faulty electrical equipment, water leakage, and classroom maintenance issues are often reported informally, making it difficult to track their resolution.
> **FixIt** is a centralized campus maintenance platform enabling students, faculty, and administrative staff to report issues, monitor real-time repair progress, assign priority levels, and analyze resolution statistics.

---

## 🌟 Key Features

1. **Complaint Submission Portal**:
   - Categorized reporting: *Electrical, Plumbing & Water, Furniture, Classroom & AV, HVAC / AC, Civil & Infrastructure, Cleanliness & Sanitation*.
   - Location mapping: Building/Block selection, Floor level, and exact Room/Hall number.
   - Priority classification: *Low (Routine), Medium (Standard), High (Active Class Blocker), Critical (Urgent Safety/Hazard)*.
   - Evidence photo upload simulation with instant visual preview.
   - Submitter contact & student/staff ID logging.

2. **Real-time Resolution Dashboard**:
   - Real-time KPI summaries: Total Reported, Pending Review, In Progress, Successfully Resolved.
   - Dynamic issue resolution rate & average response time metrics.
   - Category load distribution bars and visual percentage breakdowns.
   - Priority meter breakdown with active high-priority escalation highlights.

3. **Multi-Faceted Search & Filter Engine**:
   - Instant search across Ticket IDs, titles, descriptions, locations, and submitters.
   - Filter by Status (*Pending, In Progress, Resolved*), Category, Priority, and Campus Building.
   - Sort by newest, oldest, highest priority, and lowest priority.
   - Dual view modes: **Grid Card View** and **Tabular Data View**.

4. **Kanban Resolution Workflow Board**:
   - Visual operational lifecycle: *Pending Verification → In Progress & Assigned → Resolved & Closed*.
   - One-click status advancement and instant status transitions.

5. **Live Complaint Tracker by Ticket ID**:
   - Dedicated quick tracker (e.g. `FIX-2026-001`).
   - 3-stage visual progress stepper (*Submitted → Assigned & In Progress → Resolved & Verified*).
   - Real-time audit trail and technician activity timeline.

6. **Issue Dossier & Management Modal**:
   - Complete ticket details with photo evidence inspection.
   - Facility Admin / Technician controls: Update status, reassign priority level, assign specialized technician, and attach maintenance resolution logs.
   - Audit trail tracking all updates, timestamps, and staff actions.

7. **Role Simulation Switcher**:
   - Seamlessly switch between **Student / Staff (Reporter)**, **Facility Admin (Full Access)**, and **Technician** modes to experience different permission workflows.

8. **Export & Reporting**:
   - One-click CSV export of maintenance registries.
   - Print-friendly summary layout.

9. **Mild, Soothing Pastel UI & Responsive Design**:
   - Soft, eye-friendly pastel tones (soft slate, pale sage green, mild sky blue, gentle amber).
   - 100% responsive across desktop, tablet, and mobile with auto-aligning grid/flexbox layouts and mobile drawer navigation.

---

## 🚀 Technology Stack

- **HTML5**: Semantic and accessible markup.
- **CSS3 (Vanilla)**: Modern CSS custom properties (variables), responsive `@media` queries, flexbox, CSS grid, and micro-animations.
- **JavaScript (ES6+)**: Zero-dependency vanilla JavaScript with modular state management and LocalStorage persistence.
- **Phosphor Icons & Google Fonts**: Clean Plus Jakarta Sans typography and modern iconography.

---

## 📁 Project Structure

```
campus-maintainance/
├── index.html        # Main single-page web application
├── css/
│   └── style.css     # Design tokens, mild pastel styling & responsive media queries
├── js/
│   ├── data.js       # Initial campus complaints dataset & LocalStorage data store
│   └── app.js        # Core application logic, filtering, search, modals & analytics
└── README.md         # Documentation and project overview
```

---

## 💻 Quick Start

1. Clone or download the repository:
   ```bash
   git clone https://github.com/yuvaadhika/campus-maintainance.git
   ```
2. Open `index.html` in any modern web browser.
3. No build step or package installation required!

---

Developed for **Campus Facility Care & Maintenance Optimization**.
