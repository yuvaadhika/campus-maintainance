/**
 * FixIt – Campus Maintenance Reporting & Resolution System
 * Main Application Logic & User Interface Controller
 */

document.addEventListener("DOMContentLoaded", () => {
  // App State
  let currentComplaints = DataStore.getComplaints();
  let currentView = "dashboardView";
  let currentRole = "admin"; // 'student', 'admin', 'technician'
  let currentViewMode = "grid"; // 'grid' or 'table'
  let activeSelectedTicketId = null;
  let attachedPhotoDataUrl = "";

  // DOM Elements - Navigation & Header
  const navButtons = document.querySelectorAll(".nav-link, .mobile-nav-link, .footer-nav-link");
  const views = document.querySelectorAll(".app-view");
  const mobileMenuToggle = document.getElementById("mobileMenuToggle");
  const mobileNavDrawer = document.getElementById("mobileNavDrawer");
  const roleSwitch = document.getElementById("roleSwitch");
  const totalComplaintsPill = document.getElementById("totalComplaintsPill");
  const mobileCount = document.getElementById("mobileCount");

  // DOM Elements - Quick Actions & Modals
  const openReportModalBtns = [
    document.getElementById("openReportModalBtn"),
    document.getElementById("heroReportBtn"),
    document.getElementById("openReportModalBtn2")
  ];
  const heroTrackBtn = document.getElementById("heroTrackBtn");
  const viewAllComplaintsBtn = document.getElementById("viewAllComplaintsBtn");
  const reportModal = document.getElementById("reportModal");
  const closeReportModalBtn = document.getElementById("closeReportModalBtn");
  const cancelReportBtn = document.getElementById("cancelReportBtn");
  const reportIssueForm = document.getElementById("reportIssueForm");
  const categoryRadioCards = document.querySelectorAll(".category-radio-card");
  const issuePhotoInput = document.getElementById("issuePhotoInput");
  const uploadDropzone = document.getElementById("uploadDropzone");
  const uploadPrompt = document.getElementById("uploadPrompt");
  const photoPreviewBox = document.getElementById("photoPreviewBox");
  const photoPreviewImg = document.getElementById("photoPreviewImg");
  const removePhotoBtn = document.getElementById("removePhotoBtn");

  // DOM Elements - Details Modal
  const detailsModal = document.getElementById("detailsModal");
  const closeDetailsModalBtn = document.getElementById("closeDetailsModalBtn");
  const closeDetailsFooterBtn = document.getElementById("closeDetailsFooterBtn");
  const modalTicketId = document.getElementById("modalTicketId");
  const modalTicketTitle = document.getElementById("modalTicketTitle");
  const modalStatusBadge = document.getElementById("modalStatusBadge");
  const modalPriorityBadge = document.getElementById("modalPriorityBadge");
  const modalCategory = document.getElementById("modalCategory");
  const modalLocation = document.getElementById("modalLocation");
  const modalDate = document.getElementById("modalDate");
  const modalReporter = document.getElementById("modalReporter");
  const modalReporterContact = document.getElementById("modalReporterContact");
  const modalDescription = document.getElementById("modalDescription");
  const modalPhotoImg = document.getElementById("modalPhotoImg");
  const modalPhotoContainer = document.getElementById("modalPhotoContainer");
  const modalStepperTrack = document.getElementById("modalStepperTrack");
  const modalTimelineList = document.getElementById("modalTimelineList");
  const updateStatusSelect = document.getElementById("updateStatusSelect");
  const updatePrioritySelect = document.getElementById("updatePrioritySelect");
  const assignTechSelect = document.getElementById("assignTechSelect");
  const resolutionNoteInput = document.getElementById("resolutionNoteInput");
  const applyStatusUpdateBtn = document.getElementById("applyStatusUpdateBtn");
  const deleteComplaintBtn = document.getElementById("deleteComplaintBtn");
  const adminControlsSection = document.getElementById("adminControlsSection");

  // DOM Elements - Filter & Search Panel
  const searchInput = document.getElementById("searchInput");
  const clearSearchBtn = document.getElementById("clearSearchBtn");
  const statusFilter = document.getElementById("statusFilter");
  const categoryFilter = document.getElementById("categoryFilter");
  const priorityFilter = document.getElementById("priorityFilter");
  const buildingFilter = document.getElementById("buildingFilter");
  const sortBy = document.getElementById("sortBy");
  const resetFiltersBtn = document.getElementById("resetFiltersBtn");
  const emptyResetBtn = document.getElementById("emptyResetBtn");
  const filterMatchCount = document.getElementById("filterMatchCount");
  const filterTotalCount = document.getElementById("filterTotalCount");
  const viewModeGridBtn = document.getElementById("viewModeGrid");
  const viewModeTableBtn = document.getElementById("viewModeTable");
  const mainComplaintsGrid = document.getElementById("mainComplaintsGrid");
  const mainComplaintsTableWrapper = document.getElementById("mainComplaintsTableWrapper");
  const complaintsTableBody = document.getElementById("complaintsTableBody");
  const emptyStateContainer = document.getElementById("emptyStateContainer");

  // DOM Elements - Dashboard Containers
  const recentComplaintsGrid = document.getElementById("recentComplaintsGrid");
  const categoryBarsList = document.getElementById("categoryBarsList");
  const urgentTicketsList = document.getElementById("urgentTicketsList");
  const statTotal = document.getElementById("statTotal");
  const statPending = document.getElementById("statPending");
  const statInProgress = document.getElementById("statInProgress");
  const statResolved = document.getElementById("statResolved");
  const countCritical = document.getElementById("countCritical");
  const countHigh = document.getElementById("countHigh");
  const countMedium = document.getElementById("countMedium");
  const countLow = document.getElementById("countLow");
  const fillCritical = document.getElementById("fillCritical");
  const fillHigh = document.getElementById("fillHigh");
  const fillMedium = document.getElementById("fillMedium");
  const fillLow = document.getElementById("fillLow");
  const criticalCountBadge = document.getElementById("criticalCountBadge");
  const heroResolvedRate = document.getElementById("heroResolvedRate");
  const heroLatestTicker = document.getElementById("heroLatestTicker");
  const heroLatestText = document.getElementById("heroLatestText");

  // DOM Elements - Kanban
  const kanbanPendingZone = document.getElementById("kanbanPendingZone");
  const kanbanProgressZone = document.getElementById("kanbanProgressZone");
  const kanbanResolvedZone = document.getElementById("kanbanResolvedZone");
  const kanbanPendingCount = document.getElementById("kanbanPendingCount");
  const kanbanProgressCount = document.getElementById("kanbanProgressCount");
  const kanbanResolvedCount = document.getElementById("kanbanResolvedCount");

  // DOM Elements - Tracker
  const trackerSearchForm = document.getElementById("trackerSearchForm");
  const trackerInput = document.getElementById("trackerInput");
  const trackerResultContainer = document.getElementById("trackerResultContainer");
  const sampleIdBtns = document.querySelectorAll(".sample-id-btn");

  // DOM Elements - Analytics
  const metricResRate = document.getElementById("metricResRate");
  const metricAvgDuration = document.getElementById("metricAvgDuration");
  const metricPendingBacklog = document.getElementById("metricPendingBacklog");
  const metricTopBuilding = document.getElementById("metricTopBuilding");
  const buildingAnalyticsList = document.getElementById("buildingAnalyticsList");
  const categoryStatsTableBody = document.getElementById("categoryStatsTableBody");

  // DOM Elements - Export & Reset
  const exportDataBtn = document.getElementById("exportDataBtn");
  const printReportBtn = document.getElementById("printReportBtn");
  const resetDemoDataBtn = document.getElementById("resetDemoDataBtn");
  const toastContainer = document.getElementById("toastContainer");

  // ==========================================
  // 1. Navigation & View Controller
  // ==========================================
  function switchView(targetViewId) {
    views.forEach(v => {
      v.classList.remove("active");
      if (v.id === targetViewId) {
        v.classList.add("active");
      }
    });

    navButtons.forEach(btn => {
      if (btn.getAttribute("data-target") === targetViewId) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    currentView = targetViewId;
    mobileNavDrawer.classList.remove("active");
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Refresh view data
    refreshAllViews();
  }

  navButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const target = btn.getAttribute("data-target");
      if (target) switchView(target);
    });
  });

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener("click", () => {
      mobileNavDrawer.classList.toggle("active");
    });
  }

  if (heroTrackBtn) {
    heroTrackBtn.addEventListener("click", () => switchView("trackerView"));
  }

  if (viewAllComplaintsBtn) {
    viewAllComplaintsBtn.addEventListener("click", () => switchView("complaintsView"));
  }

  // Quick stat card click filter
  document.querySelectorAll(".stat-card").forEach(card => {
    card.addEventListener("click", () => {
      const filter = card.getAttribute("data-filter-status");
      if (filter) {
        statusFilter.value = filter;
        switchView("complaintsView");
        applyFiltersAndRender();
      }
    });
  });

  // Role simulation switch
  roleSwitch.addEventListener("change", (e) => {
    currentRole = e.target.value;
    updateRoleUI();
    showToast(`Switched view to ${e.target.options[e.target.selectedIndex].text}`, "info");
  });

  function updateRoleUI() {
    if (adminControlsSection) {
      if (currentRole === "student") {
        adminControlsSection.style.display = "none";
        deleteComplaintBtn.style.display = "none";
      } else {
        adminControlsSection.style.display = "block";
        deleteComplaintBtn.style.display = currentRole === "admin" ? "inline-flex" : "none";
      }
    }
  }

  // ==========================================
  // 2. Statistics & KPI Calculation
  // ==========================================
  function calculateStatistics() {
    const list = currentComplaints;
    const total = list.length;
    const pending = list.filter(c => c.status === "Pending").length;
    const inProgress = list.filter(c => c.status === "In Progress").length;
    const resolved = list.filter(c => c.status === "Resolved").length;

    const critical = list.filter(c => c.priority === "Critical" && c.status !== "Resolved").length;
    const high = list.filter(c => c.priority === "High" && c.status !== "Resolved").length;
    const medium = list.filter(c => c.priority === "Medium" && c.status !== "Resolved").length;
    const low = list.filter(c => c.priority === "Low" && c.status !== "Resolved").length;

    const resolutionRate = total > 0 ? Math.round((resolved / total) * 100) : 0;

    // Header & Badge updates
    totalComplaintsPill.textContent = total;
    mobileCount.textContent = total;

    // Dashboard KPI cards
    statTotal.textContent = total;
    statPending.textContent = pending;
    statInProgress.textContent = inProgress;
    statResolved.textContent = resolved;

    // Priority meters
    countCritical.textContent = critical;
    countHigh.textContent = high;
    countMedium.textContent = medium;
    countLow.textContent = low;

    criticalCountBadge.textContent = `${critical} Critical Attention`;
    heroResolvedRate.textContent = `${resolutionRate}%`;

    const maxPriority = Math.max(critical, high, medium, low, 1);
    fillCritical.style.width = `${(critical / maxPriority) * 100}%`;
    fillHigh.style.width = `${(high / maxPriority) * 100}%`;
    fillMedium.style.width = `${(medium / maxPriority) * 100}%`;
    fillLow.style.width = `${(low / maxPriority) * 100}%`;

    // Analytics metrics
    metricResRate.textContent = `${resolutionRate}%`;
    metricPendingBacklog.textContent = pending + inProgress;

    // Category breakdown calculation
    const categories = [
      { name: "Electrical", icon: "ph-lightning", color: "var(--cat-electrical)", fill: "#6366f1" },
      { name: "Plumbing", icon: "ph-drop", color: "var(--cat-plumbing)", fill: "#0284c7" },
      { name: "Furniture", icon: "ph-armchair", color: "var(--cat-furniture)", fill: "#d97706" },
      { name: "Classroom & AV", icon: "ph-projector-screen", color: "var(--cat-av)", fill: "#7c3aed" },
      { name: "HVAC / AC", icon: "ph-fan", color: "var(--cat-hvac)", fill: "#0d9488" },
      { name: "Civil & Infrastructure", icon: "ph-wall", color: "var(--cat-civil)", fill: "#78716c" },
      { name: "Cleanliness & Sanitation", icon: "ph-broom", color: "var(--cat-clean)", fill: "#059669" }
    ];

    let categoryBarsHtml = "";
    let categoryStatsTableHtml = "";

    categories.forEach(cat => {
      const catTotal = list.filter(c => c.category === cat.name).length;
      const catResolved = list.filter(c => c.category === cat.name && c.status === "Resolved").length;
      const catPct = total > 0 ? Math.round((catTotal / total) * 100) : 0;
      const resPct = catTotal > 0 ? Math.round((catResolved / catTotal) * 100) : 0;

      categoryBarsHtml += `
        <div class="category-bar-row">
          <div class="category-bar-info">
            <span class="category-name-badge" style="color: ${cat.color}">
              <i class="ph-fill ${cat.icon}"></i> ${cat.name}
            </span>
            <span>${catTotal} issues (${catPct}%)</span>
          </div>
          <div class="category-track">
            <div class="category-track-fill" style="width: ${catPct}%; background-color: ${cat.fill}"></div>
          </div>
        </div>
      `;

      categoryStatsTableHtml += `
        <tr>
          <td><strong style="color: ${cat.color}"><i class="ph-fill ${cat.icon}"></i> ${cat.name}</strong></td>
          <td>${catTotal}</td>
          <td>${catResolved}</td>
          <td>
            <span class="badge ${resPct >= 70 ? 'badge-resolved' : 'badge-pending'}">${resPct}% Fixed</span>
          </td>
        </tr>
      `;
    });

    categoryBarsList.innerHTML = categoryBarsHtml;
    categoryStatsTableBody.innerHTML = categoryStatsTableHtml;

    // Building load analytics
    const buildings = [
      "Main Academic Block",
      "Science & Lab Block",
      "Central Library",
      "Engineering Quad",
      "Hostel Block A",
      "Hostel Block B",
      "Auditorium & Sports Complex",
      "Cafeteria Building"
    ];

    let buildingCounts = buildings.map(b => ({
      name: b,
      count: list.filter(c => c.building === b).length
    })).sort((a, b) => b.count - a.count);

    if (buildingCounts.length > 0 && buildingCounts[0].count > 0) {
      metricTopBuilding.textContent = buildingCounts[0].name.split(" ")[0] + " Block";
    }

    const maxBld = Math.max(...buildingCounts.map(b => b.count), 1);
    let buildingHtml = "";
    buildingCounts.forEach(b => {
      const pct = Math.round((b.count / maxBld) * 100);
      buildingHtml += `
        <div class="building-stat-item">
          <div class="building-stat-header">
            <span>${b.name}</span>
            <span><strong>${b.count}</strong> tickets</span>
          </div>
          <div class="building-stat-bar">
            <div class="building-stat-fill" style="width: ${pct}%"></div>
          </div>
        </div>
      `;
    });
    buildingAnalyticsList.innerHTML = buildingHtml;

    // Urgent active escalations list
    const urgentItems = list.filter(c => (c.priority === "Critical" || c.priority === "High") && c.status !== "Resolved");
    if (urgentItems.length === 0) {
      urgentTicketsList.innerHTML = `<div style="font-size: 0.8rem; color: #166534; padding: 4px 0;"><i class="ph ph-check-circle"></i> No active critical escalations. All high priorities under control!</div>`;
    } else {
      urgentTicketsList.innerHTML = urgentItems.slice(0, 3).map(c => `
        <div class="urgent-item-mini" onclick="window.FixItApp.openDetailsModal('${c.id}')">
          <div>
            <div class="urgent-title">${escapeHtml(c.title)}</div>
            <div class="urgent-loc"><i class="ph ph-map-pin"></i> ${escapeHtml(c.building)} • ${escapeHtml(c.room)}</div>
          </div>
          <span class="badge ${c.priority === 'Critical' ? 'badge-prio-critical' : 'badge-prio-high'}">${c.priority}</span>
        </div>
      `).join("");
    }

    // Latest resolved ticker
    const lastResolved = list.find(c => c.status === "Resolved");
    if (lastResolved) {
      heroLatestText.textContent = `Latest: ${lastResolved.title} (${lastResolved.room})`;
    }
  }

  // ==========================================
  // 3. Render Complaints Cards & Table
  // ==========================================
  function renderBadge(type, value) {
    if (type === "status") {
      const cls = value === "Resolved" ? "badge-resolved" : value === "In Progress" ? "badge-in-progress" : "badge-pending";
      const icon = value === "Resolved" ? "ph-check" : value === "In Progress" ? "ph-wrench" : "ph-clock";
      return `<span class="badge ${cls}"><i class="ph ${icon}"></i> ${value}</span>`;
    } else if (type === "priority") {
      const cls = `badge-prio-${value.toLowerCase()}`;
      return `<span class="badge ${cls}"><i class="ph ph-flag"></i> ${value}</span>`;
    }
    return "";
  }

  function createComplaintCardHtml(c) {
    const formattedDate = new Date(c.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
    const reporterInitials = c.reporterName ? c.reporterName.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase() : "US";

    return `
      <div class="complaint-card" onclick="window.FixItApp.openDetailsModal('${c.id}')">
        <div>
          <div class="card-top-row">
            <span class="ticket-id-tag">${c.id}</span>
            <div class="card-badges-right">
              ${renderBadge("priority", c.priority)}
              ${renderBadge("status", c.status)}
            </div>
          </div>

          <div class="card-title-block mt-sm">
            <h3 class="complaint-card-title">${escapeHtml(c.title)}</h3>
            <p class="complaint-card-desc">${escapeHtml(c.description)}</p>
          </div>
        </div>

        <div>
          <div class="card-meta-box">
            <div class="meta-item">
              <i class="ph ph-tag"></i>
              <span><strong>Category:</strong> ${escapeHtml(c.category)}</span>
            </div>
            <div class="meta-item">
              <i class="ph ph-buildings"></i>
              <span><strong>Location:</strong> ${escapeHtml(c.building)}, ${escapeHtml(c.room)}</span>
            </div>
            <div class="meta-item">
              <i class="ph ph-user-gear"></i>
              <span><strong>Assigned:</strong> ${escapeHtml(c.assignedTo || "Unassigned")}</span>
            </div>
          </div>

          <div class="card-footer-row">
            <div class="reporter-avatar-row">
              <div class="avatar-circle">${reporterInitials}</div>
              <span>${escapeHtml(c.reporterName)}</span>
            </div>
            <span>${formattedDate}</span>
          </div>
        </div>
      </div>
    `;
  }

  function createComplaintTableRowHtml(c) {
    const formattedDate = new Date(c.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" });

    return `
      <tr>
        <td><span class="ticket-id-tag">${c.id}</span></td>
        <td>
          <div class="table-title-wrap">
            <span class="table-title-text">${escapeHtml(c.title)}</span>
            <span class="table-loc-text"><i class="ph ph-map-pin"></i> ${escapeHtml(c.building)}, ${escapeHtml(c.room)}</span>
          </div>
        </td>
        <td><span class="badge" style="background:#f1f5f9; color:#475569;">${escapeHtml(c.category)}</span></td>
        <td>${renderBadge("priority", c.priority)}</td>
        <td>${renderBadge("status", c.status)}</td>
        <td>${escapeHtml(c.reporterName)} (${escapeHtml(c.reporterId)})</td>
        <td>${formattedDate}</td>
        <td>
          <button class="btn btn-secondary btn-sm" onclick="event.stopPropagation(); window.FixItApp.openDetailsModal('${c.id}')">
            <i class="ph ph-eye"></i> View
          </button>
        </td>
      </tr>
    `;
  }

  // ==========================================
  // 4. Filtering & Search Engine
  // ==========================================
  function applyFiltersAndRender() {
    const query = searchInput.value.trim().toLowerCase();
    const statusVal = statusFilter.value;
    const catVal = categoryFilter.value;
    const prioVal = priorityFilter.value;
    const bldVal = buildingFilter.value;
    const sortVal = sortBy.value;

    let filtered = currentComplaints.filter(item => {
      // Search term match
      if (query) {
        const matchesId = item.id.toLowerCase().includes(query);
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesLoc = item.building.toLowerCase().includes(query) || item.room.toLowerCase().includes(query);
        const matchesReporter = item.reporterName.toLowerCase().includes(query) || item.reporterId.toLowerCase().includes(query);
        if (!matchesId && !matchesTitle && !matchesDesc && !matchesLoc && !matchesReporter) {
          return false;
        }
      }

      // Status
      if (statusVal !== "all" && item.status !== statusVal) return false;

      // Category
      if (catVal !== "all" && item.category !== catVal) return false;

      // Priority
      if (prioVal !== "all" && item.priority !== prioVal) return false;

      // Building
      if (bldVal !== "all" && item.building !== bldVal) return false;

      return true;
    });

    // Sorting
    const priorityWeight = { Critical: 4, High: 3, Medium: 2, Low: 1 };
    filtered.sort((a, b) => {
      if (sortVal === "newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortVal === "oldest") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      } else if (sortVal === "priority-desc") {
        return (priorityWeight[b.priority] || 0) - (priorityWeight[a.priority] || 0);
      } else if (sortVal === "priority-asc") {
        return (priorityWeight[a.priority] || 0) - (priorityWeight[b.priority] || 0);
      }
      return 0;
    });

    // Update match count
    filterMatchCount.textContent = filtered.length;
    filterTotalCount.textContent = currentComplaints.length;

    // Show / Hide clear search button
    clearSearchBtn.style.display = query.length > 0 ? "block" : "none";

    // Empty state handling
    if (filtered.length === 0) {
      emptyStateContainer.style.display = "block";
      mainComplaintsGrid.style.display = "none";
      mainComplaintsTableWrapper.style.display = "none";
    } else {
      emptyStateContainer.style.display = "none";
      if (currentViewMode === "grid") {
        mainComplaintsGrid.style.display = "grid";
        mainComplaintsTableWrapper.style.display = "none";
        mainComplaintsGrid.innerHTML = filtered.map(createComplaintCardHtml).join("");
      } else {
        mainComplaintsGrid.style.display = "none";
        mainComplaintsTableWrapper.style.display = "block";
        complaintsTableBody.innerHTML = filtered.map(createComplaintTableRowHtml).join("");
      }
    }

    // Also update recent complaints on Dashboard (first 4 items)
    recentComplaintsGrid.innerHTML = currentComplaints.slice(0, 4).map(createComplaintCardHtml).join("");
  }

  // Filter Listeners
  [searchInput, statusFilter, categoryFilter, priorityFilter, buildingFilter, sortBy].forEach(el => {
    el.addEventListener("input", applyFiltersAndRender);
    el.addEventListener("change", applyFiltersAndRender);
  });

  clearSearchBtn.addEventListener("click", () => {
    searchInput.value = "";
    applyFiltersAndRender();
  });

  resetFiltersBtn.addEventListener("click", resetAllFilters);
  emptyResetBtn.addEventListener("click", resetAllFilters);

  function resetAllFilters() {
    searchInput.value = "";
    statusFilter.value = "all";
    categoryFilter.value = "all";
    priorityFilter.value = "all";
    buildingFilter.value = "all";
    sortBy.value = "newest";
    applyFiltersAndRender();
  }

  // View Mode toggle
  viewModeGridBtn.addEventListener("click", () => {
    currentViewMode = "grid";
    viewModeGridBtn.classList.add("active");
    viewModeTableBtn.classList.remove("active");
    applyFiltersAndRender();
  });

  viewModeTableBtn.addEventListener("click", () => {
    currentViewMode = "table";
    viewModeTableBtn.classList.add("active");
    viewModeGridBtn.classList.remove("active");
    applyFiltersAndRender();
  });

  // ==========================================
  // 5. Kanban Workflow Board
  // ==========================================
  function renderKanbanBoard() {
    const list = currentComplaints;
    const pendingItems = list.filter(c => c.status === "Pending");
    const progressItems = list.filter(c => c.status === "In Progress");
    const resolvedItems = list.filter(c => c.status === "Resolved");

    kanbanPendingCount.textContent = pendingItems.length;
    kanbanProgressCount.textContent = progressItems.length;
    kanbanResolvedCount.textContent = resolvedItems.length;

    function renderKanbanCard(c, currentStatus) {
      let actionBtn = "";
      if (currentStatus === "Pending") {
        actionBtn = `<button class="quick-advance-btn" onclick="event.stopPropagation(); window.FixItApp.quickUpdateStatus('${c.id}', 'In Progress')">Start Progress &rarr;</button>`;
      } else if (currentStatus === "In Progress") {
        actionBtn = `<button class="quick-advance-btn" onclick="event.stopPropagation(); window.FixItApp.quickUpdateStatus('${c.id}', 'Resolved')">Mark Resolved &check;</button>`;
      } else {
        actionBtn = `<button class="quick-advance-btn" onclick="event.stopPropagation(); window.FixItApp.quickUpdateStatus('${c.id}', 'In Progress')">&larr; Reopen</button>`;
      }

      return `
        <div class="kanban-item-card" onclick="window.FixItApp.openDetailsModal('${c.id}')">
          <div class="d-flex justify-between align-center">
            <span class="ticket-id-tag">${c.id}</span>
            ${renderBadge("priority", c.priority)}
          </div>
          <h4 style="font-size: 0.92rem; font-weight: 700; color: #0f172a;">${escapeHtml(c.title)}</h4>
          <div style="font-size: 0.78rem; color: #64748b;"><i class="ph ph-map-pin"></i> ${escapeHtml(c.building)} • ${escapeHtml(c.room)}</div>
          <div class="kanban-actions-row">
            <span style="font-size: 0.72rem; color: #94a3b8;">${escapeHtml(c.assignedTo || "Unassigned")}</span>
            ${actionBtn}
          </div>
        </div>
      `;
    }

    kanbanPendingZone.innerHTML = pendingItems.length ? pendingItems.map(c => renderKanbanCard(c, "Pending")).join("") : `<div class="empty-kanban-slot">No pending tickets</div>`;
    kanbanProgressZone.innerHTML = progressItems.length ? progressItems.map(c => renderKanbanCard(c, "In Progress")).join("") : `<div class="empty-kanban-slot">No tickets in progress</div>`;
    kanbanResolvedZone.innerHTML = resolvedItems.length ? resolvedItems.map(c => renderKanbanCard(c, "Resolved")).join("") : `<div class="empty-kanban-slot">No resolved tickets</div>`;
  }

  // ==========================================
  // 6. Ticket Tracker Search
  // ==========================================
  trackerSearchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const queryId = trackerInput.value.trim().toUpperCase();
    trackTicketById(queryId);
  });

  sampleIdBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      trackerInput.value = id;
      trackTicketById(id);
    });
  });

  function trackTicketById(ticketId) {
    const item = currentComplaints.find(c => c.id.toUpperCase() === ticketId);
    trackerResultContainer.style.display = "block";

    if (!item) {
      trackerResultContainer.innerHTML = `
        <div class="panel-card" style="text-align: center; padding: 32px;">
          <i class="ph ph-warning-circle" style="font-size: 2.2rem; color: #f59e0b; margin-bottom: 8px;"></i>
          <h3>Ticket ID "${escapeHtml(ticketId)}" Not Found</h3>
          <p style="color: #64748b; font-size: 0.9rem; margin-top: 4px;">Please check the complaint reference ID and try again, or check the registry view.</p>
        </div>
      `;
      return;
    }

    const step1Active = true;
    const step2Active = item.status === "In Progress" || item.status === "Resolved";
    const step3Active = item.status === "Resolved";

    trackerResultContainer.innerHTML = `
      <div class="panel-card">
        <div class="panel-header">
          <div>
            <span class="ticket-id-tag">${item.id}</span>
            <h3 style="font-size: 1.25rem; font-weight: 800; margin-top: 6px;">${escapeHtml(item.title)}</h3>
            <p class="panel-subtitle"><i class="ph ph-map-pin"></i> ${escapeHtml(item.building)} • ${escapeHtml(item.room)}</p>
          </div>
          <div class="d-flex gap-xs">
            ${renderBadge("priority", item.priority)}
            ${renderBadge("status", item.status)}
          </div>
        </div>

        <div class="stepper-card mt-md">
          <h4 class="subheading"><i class="ph ph-git-commit"></i> Current Progress State</h4>
          <div class="stepper-track">
            <div class="step-item ${step1Active ? 'completed' : ''}">
              <div class="step-node"><i class="ph-bold ph-check"></i></div>
              <span class="step-label">1. Submitted & Logged</span>
            </div>
            <div class="step-item ${step2Active ? (step3Active ? 'completed' : 'active') : ''}">
              <div class="step-node">${step3Active ? '<i class="ph-bold ph-check"></i>' : '2'}</div>
              <span class="step-label">2. Assigned & In Progress</span>
            </div>
            <div class="step-item ${step3Active ? 'completed active' : ''}">
              <div class="step-node">${step3Active ? '<i class="ph-bold ph-check"></i>' : '3'}</div>
              <span class="step-label">3. Resolved & Verified</span>
            </div>
          </div>
        </div>

        <div class="details-section-grid mt-md">
          <div class="details-desc-box">
            <h4 class="subheading"><i class="ph ph-info"></i> Ticket Information</h4>
            <p class="desc-text">${escapeHtml(item.description)}</p>
            <div class="reporter-box mt-sm">
              <span class="reporter-label">Assigned Technician:</span>
              <span><strong>${escapeHtml(item.assignedTo || "Under queue allocation")}</strong></span>
            </div>
          </div>

          <div class="timeline-section">
            <h4 class="subheading"><i class="ph ph-clock-counter-clockwise"></i> Live Update Trail</h4>
            <div class="timeline-list">
              ${item.timeline ? item.timeline.map(t => `
                <div class="timeline-item">
                  <div class="timeline-dot"></div>
                  <div class="timeline-header">
                    <span class="timeline-author">${escapeHtml(t.author)}</span>
                    <span class="timeline-time">${escapeHtml(t.time)}</span>
                  </div>
                  <span class="timeline-desc">${escapeHtml(t.text)}</span>
                </div>
              `).join("") : `<span style="font-size: 0.8rem; color:#64748b;">No updates logged yet.</span>`}
            </div>
          </div>
        </div>

        <div style="margin-top: 16px; text-align: right;">
          <button class="btn btn-primary btn-sm" onclick="window.FixItApp.openDetailsModal('${item.id}')">
            <i class="ph ph-arrow-square-out"></i> Open Detailed Dossier
          </button>
        </div>
      </div>
    `;
  }

  // ==========================================
  // 7. Report Complaint Modal & Form Handling
  // ==========================================
  openReportModalBtns.forEach(btn => {
    if (btn) {
      btn.addEventListener("click", () => {
        reportModal.classList.add("active");
        document.body.style.overflow = "hidden";
      });
    }
  });

  function closeReportModal() {
    reportModal.classList.remove("active");
    document.body.style.overflow = "";
    reportIssueForm.reset();
    resetPhotoUpload();
  }

  closeReportModalBtn.addEventListener("click", closeReportModal);
  cancelReportBtn.addEventListener("click", closeReportModal);

  // Category pill selection logic
  categoryRadioCards.forEach(card => {
    card.addEventListener("click", () => {
      categoryRadioCards.forEach(c => c.classList.remove("active"));
      card.classList.add("active");
      const radio = card.querySelector("input[type='radio']");
      if (radio) radio.checked = true;
    });
  });

  // Simulated photo upload
  issuePhotoInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        attachedPhotoDataUrl = event.target.result;
        photoPreviewImg.src = attachedPhotoDataUrl;
        uploadPrompt.style.display = "none";
        photoPreviewBox.style.display = "inline-block";
      };
      reader.readAsDataURL(file);
    }
  });

  removePhotoBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    resetPhotoUpload();
  });

  function resetPhotoUpload() {
    attachedPhotoDataUrl = "";
    issuePhotoInput.value = "";
    photoPreviewImg.src = "";
    uploadPrompt.style.display = "flex";
    photoPreviewBox.style.display = "none";
  }

  // Form Submit Handler
  reportIssueForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("issueTitle").value.trim();
    const categoryEl = document.querySelector("input[name='category']:checked");
    const category = categoryEl ? categoryEl.value : "Electrical";
    const building = document.getElementById("issueBuilding").value;
    const floor = document.getElementById("issueFloor").value;
    const room = document.getElementById("issueRoom").value.trim();
    const priority = document.getElementById("issuePriority").value;
    const description = document.getElementById("issueDescription").value.trim();
    const reporterName = document.getElementById("reporterName").value.trim();
    const reporterId = document.getElementById("reporterId").value.trim();
    const reporterEmail = document.getElementById("reporterEmail").value.trim() || `${reporterId.toLowerCase()}@campus.edu`;
    const reporterPhone = document.getElementById("reporterPhone").value.trim() || "+91 9000000000";

    const nextId = DataStore.getNextId();
    const now = new Date();
    const timeFormatted = now.toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });

    // Fallback simulated photo if none attached
    const photo = attachedPhotoDataUrl || createSvgDataUrl(category, `${building} - ${room}`, "#f0f9ff", "#0284c7");

    const newTicket = {
      id: nextId,
      title,
      category,
      building,
      floor,
      room,
      priority,
      status: "Pending",
      description,
      photo,
      reporterName,
      reporterId,
      reporterEmail,
      reporterPhone,
      assignedTo: "Unassigned",
      createdAt: now.toISOString(),
      timeline: [
        { author: reporterName, time: timeFormatted, text: `Complaint registered with priority level "${priority}".` }
      ]
    };

    DataStore.addComplaint(newTicket);
    currentComplaints = DataStore.getComplaints();

    closeReportModal();
    showToast(`Complaint submitted successfully! Ticket Reference ID: ${nextId}`, "success");
    refreshAllViews();

    // Auto-open tracker to show user their new submission
    trackerInput.value = nextId;
    switchView("trackerView");
    trackTicketById(nextId);
  });

  // ==========================================
  // 8. Issue Details & Status Update Modal
  // ==========================================
  function openDetailsModal(ticketId) {
    const item = currentComplaints.find(c => c.id === ticketId);
    if (!item) return;

    activeSelectedTicketId = ticketId;

    modalTicketId.textContent = item.id;
    modalTicketTitle.textContent = item.title;
    modalStatusBadge.className = `badge ${item.status === 'Resolved' ? 'badge-resolved' : item.status === 'In Progress' ? 'badge-in-progress' : 'badge-pending'}`;
    modalStatusBadge.textContent = item.status;

    modalPriorityBadge.className = `badge badge-prio-${item.priority.toLowerCase()}`;
    modalPriorityBadge.textContent = `${item.priority} Priority`;

    modalCategory.textContent = item.category;
    modalLocation.textContent = `${item.building}, ${item.floor}, ${item.room}`;
    modalDate.textContent = new Date(item.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" });
    modalReporter.textContent = item.reporterName;
    modalReporterContact.textContent = `${item.reporterName} (ID: ${item.reporterId}) • ${item.reporterEmail} • ${item.reporterPhone}`;
    modalDescription.textContent = item.description;

    if (item.photo) {
      modalPhotoContainer.style.display = "block";
      modalPhotoImg.src = item.photo;
    } else {
      modalPhotoContainer.style.display = "none";
    }

    // Stepper Track
    const step1Done = true;
    const step2Done = item.status === "In Progress" || item.status === "Resolved";
    const step3Done = item.status === "Resolved";

    modalStepperTrack.innerHTML = `
      <div class="step-item ${step1Done ? 'completed' : ''}">
        <div class="step-node"><i class="ph-bold ph-check"></i></div>
        <span class="step-label">Submitted</span>
      </div>
      <div class="step-item ${step2Done ? (step3Done ? 'completed' : 'active') : ''}">
        <div class="step-node">${step3Done ? '<i class="ph-bold ph-check"></i>' : '2'}</div>
        <span class="step-label">In Progress</span>
      </div>
      <div class="step-item ${step3Done ? 'completed active' : ''}">
        <div class="step-node">${step3Done ? '<i class="ph-bold ph-check"></i>' : '3'}</div>
        <span class="step-label">Resolved</span>
      </div>
    `;

    // Admin control defaults
    updateStatusSelect.value = item.status;
    updatePrioritySelect.value = item.priority;
    assignTechSelect.value = item.assignedTo || "Unassigned";
    resolutionNoteInput.value = "";

    // Timeline List
    renderTimeline(item.timeline || []);

    updateRoleUI();

    detailsModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeDetailsModal() {
    detailsModal.classList.remove("active");
    document.body.style.overflow = "";
    activeSelectedTicketId = null;
  }

  closeDetailsModalBtn.addEventListener("click", closeDetailsModal);
  closeDetailsFooterBtn.addEventListener("click", closeDetailsModal);

  function renderTimeline(timeline) {
    if (!timeline || timeline.length === 0) {
      modalTimelineList.innerHTML = `<span style="font-size: 0.82rem; color: #64748b;">No timeline notes logged yet.</span>`;
      return;
    }
    modalTimelineList.innerHTML = timeline.map(t => `
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-header">
          <span class="timeline-author">${escapeHtml(t.author)}</span>
          <span class="timeline-time">${escapeHtml(t.time)}</span>
        </div>
        <span class="timeline-desc">${escapeHtml(t.text)}</span>
      </div>
    `).join("");
  }

  // Apply Status & Technician Update
  applyStatusUpdateBtn.addEventListener("click", () => {
    if (!activeSelectedTicketId) return;

    const newStatus = updateStatusSelect.value;
    const newPriority = updatePrioritySelect.value;
    const newAssigned = assignTechSelect.value;
    const noteText = resolutionNoteInput.value.trim();

    const item = currentComplaints.find(c => c.id === activeSelectedTicketId);
    if (!item) return;

    const now = new Date();
    const timeFormatted = now.toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });

    const updatedTimeline = [...(item.timeline || [])];

    let logMessage = `Updated status to "${newStatus}", priority to "${newPriority}" and assigned to "${newAssigned}".`;
    if (noteText) {
      logMessage += ` Note: ${noteText}`;
    }

    updatedTimeline.push({
      author: currentRole === "technician" ? "Technician" : "Facility Admin",
      time: timeFormatted,
      text: logMessage
    });

    const updatedData = {
      status: newStatus,
      priority: newPriority,
      assignedTo: newAssigned,
      timeline: updatedTimeline,
      ...(newStatus === "Resolved" ? { resolvedAt: now.toISOString() } : {})
    };

    DataStore.updateComplaint(activeSelectedTicketId, updatedData);
    currentComplaints = DataStore.getComplaints();

    showToast(`Ticket ${activeSelectedTicketId} updated successfully!`, "success");
    openDetailsModal(activeSelectedTicketId);
    refreshAllViews();
  });

  // Delete Ticket
  deleteComplaintBtn.addEventListener("click", () => {
    if (!activeSelectedTicketId) return;
    if (confirm(`Are you sure you want to delete ticket ${activeSelectedTicketId}?`)) {
      DataStore.deleteComplaint(activeSelectedTicketId);
      currentComplaints = DataStore.getComplaints();
      closeDetailsModal();
      showToast(`Ticket ${activeSelectedTicketId} removed.`, "danger");
      refreshAllViews();
    }
  });

  // Quick Status Update from Kanban / Grid
  function quickUpdateStatus(ticketId, nextStatus) {
    const item = currentComplaints.find(c => c.id === ticketId);
    if (!item) return;

    const now = new Date();
    const timeFormatted = now.toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });

    const updatedTimeline = [...(item.timeline || [])];
    updatedTimeline.push({
      author: "Facility Admin (Quick Action)",
      time: timeFormatted,
      text: `Status changed to ${nextStatus}.`
    });

    DataStore.updateComplaint(ticketId, {
      status: nextStatus,
      timeline: updatedTimeline,
      ...(nextStatus === "Resolved" ? { resolvedAt: now.toISOString() } : {})
    });

    currentComplaints = DataStore.getComplaints();
    showToast(`Ticket ${ticketId} status updated to ${nextStatus}`, "info");
    refreshAllViews();
  }

  // ==========================================
  // 9. Export & Reset Handlers
  // ==========================================
  exportDataBtn.addEventListener("click", () => {
    const list = currentComplaints;
    const headers = ["Ticket ID", "Title", "Category", "Building", "Floor", "Room", "Priority", "Status", "Reported By", "Reported ID", "Assigned To", "Created Date"];
    const rows = list.map(c => [
      c.id,
      `"${c.title.replace(/"/g, '""')}"`,
      c.category,
      `"${c.building}"`,
      c.floor,
      `"${c.room}"`,
      c.priority,
      c.status,
      `"${c.reporterName}"`,
      c.reporterId,
      `"${c.assignedTo || 'Unassigned'}"`,
      c.createdAt
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `FixIt_Campus_Maintenance_Report_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("CSV Maintenance Report generated and downloaded!", "success");
  });

  printReportBtn.addEventListener("click", () => {
    window.print();
  });

  resetDemoDataBtn.addEventListener("click", () => {
    if (confirm("Reset maintenance tickets to default sample campus dataset?")) {
      DataStore.resetToDefault();
      currentComplaints = DataStore.getComplaints();
      refreshAllViews();
      showToast("Sample data restored successfully!", "success");
    }
  });

  // ==========================================
  // 10. Refresh & Toast Helpers
  // ==========================================
  function refreshAllViews() {
    calculateStatistics();
    applyFiltersAndRender();
    renderKanbanBoard();
  }

  function showToast(message, type = "info") {
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    let icon = "ph-info";
    if (type === "success") icon = "ph-check-circle";
    if (type === "danger") icon = "ph-x-circle";
    if (type === "warning") icon = "ph-warning";

    toast.innerHTML = `<i class="ph-fill ${icon}"></i> <span>${escapeHtml(message)}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(100%)";
      toast.style.transition = "0.3s ease";
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  function escapeHtml(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Expose global methods for inline HTML onclick handlers
  window.FixItApp = {
    openDetailsModal,
    quickUpdateStatus,
    switchView
  };

  // Initial Load
  refreshAllViews();
});
