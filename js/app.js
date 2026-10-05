/**
 * FixIt – Campus Maintenance Reporting & AI Resolution System
 * Main Controller with AI Smart Triage, 2D Campus Map, Room QR Scanner,
 * Voice Dictation, SLA Timers, Before/After Verification, and Eco Metrics.
 */

document.addEventListener("DOMContentLoaded", () => {
  // App State
  let currentComplaints = DataStore.getComplaints();
  let currentView = "dashboardView";
  let currentRole = "admin"; // 'student', 'admin', 'technician'
  let currentViewMode = "grid"; // 'grid' or 'table'
  let activeSelectedTicketId = null;
  let attachedPhotoDataUrl = "";
  let selectedMapBuilding = "Science & Lab Block";
  let aiSuggestedCategory = "Electrical";
  let aiSuggestedPriority = "Medium";
  let qrCodeInstance = null;
  let isVoiceListening = false;
  let speechRecognition = null;

  // DOM Elements - Navigation & Header
  const navButtons = document.querySelectorAll(".nav-link, .mobile-nav-link, .footer-nav-link");
  const views = document.querySelectorAll(".app-view");
  const mobileMenuToggle = document.getElementById("mobileMenuToggle");
  const mobileNavDrawer = document.getElementById("mobileNavDrawer");
  const roleSwitch = document.getElementById("roleSwitch");
  const totalComplaintsPill = document.getElementById("totalComplaintsPill");
  const mobileCount = document.getElementById("mobileCount");
  const activeAlertsBadge = document.getElementById("activeAlertsBadge");

  // DOM Elements - Quick Actions & Modals
  const openReportModalBtns = [
    document.getElementById("openReportModalBtn"),
    document.getElementById("heroReportBtn"),
    document.getElementById("openReportModalBtn2")
  ];
  const heroTrackBtn = document.getElementById("heroTrackBtn");
  const heroScanQrBtn = document.getElementById("heroScanQrBtn");
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

  // AI & Voice Elements
  const issueTitleInput = document.getElementById("issueTitle");
  const issueDescriptionInput = document.getElementById("issueDescription");
  const voiceDictateBtn = document.getElementById("voiceDictateBtn");
  const voiceBtnText = document.getElementById("voiceBtnText");
  const aiSuggestionBox = document.getElementById("aiSuggestionBox");
  const aiSuggestionContent = document.getElementById("aiSuggestionContent");
  const applyAiSuggestionBtn = document.getElementById("applyAiSuggestionBtn");

  // DOM Elements - Details Modal
  const detailsModal = document.getElementById("detailsModal");
  const closeDetailsModalBtn = document.getElementById("closeDetailsModalBtn");
  const closeDetailsFooterBtn = document.getElementById("closeDetailsFooterBtn");
  const modalTicketId = document.getElementById("modalTicketId");
  const modalTicketTitle = document.getElementById("modalTicketTitle");
  const modalStatusBadge = document.getElementById("modalStatusBadge");
  const modalPriorityBadge = document.getElementById("modalPriorityBadge");
  const modalSlaBadge = document.getElementById("modalSlaBadge");
  const modalCategory = document.getElementById("modalCategory");
  const modalLocation = document.getElementById("modalLocation");
  const modalDate = document.getElementById("modalDate");
  const modalReporter = document.getElementById("modalReporter");
  const modalReporterContact = document.getElementById("modalReporterContact");
  const modalDescription = document.getElementById("modalDescription");
  const modalBeforeImg = document.getElementById("modalBeforeImg");
  const modalAfterImg = document.getElementById("modalAfterImg");
  const modalAfterBox = document.getElementById("modalAfterBox");
  const modalStepperTrack = document.getElementById("modalStepperTrack");
  const modalTimelineList = document.getElementById("modalTimelineList");
  const updateStatusSelect = document.getElementById("updateStatusSelect");
  const updatePrioritySelect = document.getElementById("updatePrioritySelect");
  const assignTechSelect = document.getElementById("assignTechSelect");
  const resolutionNoteInput = document.getElementById("resolutionNoteInput");
  const applyStatusUpdateBtn = document.getElementById("applyStatusUpdateBtn");
  const deleteComplaintBtn = document.getElementById("deleteComplaintBtn");
  const adminControlsSection = document.getElementById("adminControlsSection");
  const modalUpvoteBtn = document.getElementById("modalUpvoteBtn");
  const modalUpvoteText = document.getElementById("modalUpvoteText");
  const modalRatingSection = document.getElementById("modalRatingSection");
  const starBtns = document.querySelectorAll(".star-btn");
  const ratingScoreText = document.getElementById("ratingScoreText");

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

  // DOM Elements - 2D Map
  const campusMapGrid = document.getElementById("campusMapGrid");
  const selectedBuildingTitle = document.getElementById("selectedBuildingTitle");
  const selectedBuildingSubtitle = document.getElementById("selectedBuildingSubtitle");
  const selectedBuildingBadge = document.getElementById("selectedBuildingBadge");
  const buildingComplaintsList = document.getElementById("buildingComplaintsList");
  const mapReportHereBtn = document.getElementById("mapReportHereBtn");

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

  // DOM Elements - QR Center
  const qrGenBuilding = document.getElementById("qrGenBuilding");
  const qrGenRoom = document.getElementById("qrGenRoom");
  const qrStickerRoom = document.getElementById("qrStickerRoom");
  const qrStickerBuilding = document.getElementById("qrStickerBuilding");
  const qrcodeContainer = document.getElementById("qrcodeContainer");
  const printQrStickerBtn = document.getElementById("printQrStickerBtn");
  const testScanStickerBtn = document.getElementById("testScanStickerBtn");
  const qrScanPresets = document.querySelectorAll(".qr-scan-preset");

  // DOM Elements - Analytics & Eco
  const topEcoWater = document.getElementById("topEcoWater");
  const topEcoPower = document.getElementById("topEcoPower");
  const ecoWaterSaved = document.getElementById("ecoWaterSaved");
  const ecoEnergySaved = document.getElementById("ecoEnergySaved");
  const ecoCostSaved = document.getElementById("ecoCostSaved");
  const ecoRatingScore = document.getElementById("ecoRatingScore");
  const metricResRate = document.getElementById("metricResRate");
  const metricAvgDuration = document.getElementById("metricAvgDuration");
  const metricSlaCompliance = document.getElementById("metricSlaCompliance");
  const metricTopBuilding = document.getElementById("metricTopBuilding");
  const buildingAnalyticsList = document.getElementById("buildingAnalyticsList");
  const categoryStatsTableBody = document.getElementById("categoryStatsTableBody");

  // DOM Elements - SMS Simulator
  const openSmsSimulatorBtn = document.getElementById("openSmsSimulatorBtn");
  const smsModal = document.getElementById("smsModal");
  const closeSmsModalBtn = document.getElementById("closeSmsModalBtn");
  const smsFeedList = document.getElementById("smsFeedList");

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

    if (targetViewId === "qrView") {
      updateQrSticker();
    }

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

  if (heroTrackBtn) heroTrackBtn.addEventListener("click", () => switchView("trackerView"));
  if (heroScanQrBtn) heroScanQrBtn.addEventListener("click", () => switchView("qrView"));
  if (viewAllComplaintsBtn) viewAllComplaintsBtn.addEventListener("click", () => switchView("complaintsView"));

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
  // 2. SLA Countdown & Calculation Helper
  // ==========================================
  function computeSlaInfo(ticket) {
    if (ticket.status === "Resolved") {
      return { status: "on-track", text: "Resolved on time", hoursLeft: 0, isBreached: false };
    }

    const createdTime = new Date(ticket.createdAt).getTime();
    const slaTargetHours = ticket.slaHours || (ticket.priority === "Critical" ? 4 : ticket.priority === "High" ? 12 : ticket.priority === "Medium" ? 24 : 72);
    const deadline = createdTime + slaTargetHours * 60 * 60 * 1000;
    const now = Date.now();
    const diffMs = deadline - now;

    if (diffMs <= 0) {
      return { status: "breached", text: "🚨 SLA Breached - Escalated", hoursLeft: 0, isBreached: true };
    }

    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const mins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const statusClass = hours < 2 ? "warning" : "on-track";

    return {
      status: statusClass,
      text: `⏳ ${hours}h ${mins}m SLA left`,
      hoursLeft: hours,
      isBreached: false
    };
  }

  // ==========================================
  // 3. AI Smart Triage & NLP Suggestion
  // ==========================================
  function analyzeComplaintWithAI() {
    const title = (issueTitleInput.value || "").toLowerCase();
    const desc = (issueDescriptionInput.value || "").toLowerCase();
    const text = `${title} ${desc}`;

    if (text.trim().length < 5) {
      aiSuggestionBox.style.display = "none";
      return;
    }

    let detectedCategory = "Electrical";
    let detectedPriority = "Medium";
    let confidence = 85;
    let reason = "Standard maintenance review";

    // Keyword heuristics
    if (text.match(/spark|shock|smoke|burn|fire|wire|plug|mcb|short circuit|socket|switchboard/)) {
      detectedCategory = "Electrical";
      detectedPriority = "Critical";
      confidence = 96;
      reason = "Detected active electrical risk/fire hazard keywords.";
    } else if (text.match(/leak|water|pipe|flood|tap|sink|overflow|sewage|flush|drain/)) {
      detectedCategory = "Plumbing";
      detectedPriority = text.match(/flood|overflow|burst/) ? "High" : "Medium";
      confidence = 94;
      reason = "Detected fluid leak and water damage keywords.";
    } else if (text.match(/projector|hdmi|screen|mic|speaker|display|audio|sound|audi|av/)) {
      detectedCategory = "Classroom & AV";
      detectedPriority = "Medium";
      confidence = 92;
      reason = "Detected lecture hall AV equipment keywords.";
    } else if (text.match(/chair|bench|desk|table|door|lock|armrest|handle|wood|furniture/)) {
      detectedCategory = "Furniture";
      detectedPriority = "Low";
      confidence = 90;
      reason = "Detected classroom furniture fixture keywords.";
    } else if (text.match(/ac|cooler|cooling|heat|fan|hvac|compressor|chiller|hot/)) {
      detectedCategory = "HVAC / AC";
      detectedPriority = text.match(/exam|lab|server/) ? "High" : "Medium";
      confidence = 93;
      reason = "Detected ventilation & cooling system keywords.";
    } else if (text.match(/tile|wall|crack|ceiling|roof|glass|window|stair/)) {
      detectedCategory = "Civil & Infrastructure";
      detectedPriority = text.match(/crack|fall|danger/) ? "High" : "Medium";
      confidence = 88;
      reason = "Detected structural and civil safety keywords.";
    } else if (text.match(/clean|trash|garbage|smell|odor|dustbin|washroom dirty|sanitation/)) {
      detectedCategory = "Cleanliness & Sanitation";
      detectedPriority = "Medium";
      confidence = 89;
      reason = "Detected sanitation & housekeeping keywords.";
    }

    aiSuggestedCategory = detectedCategory;
    aiSuggestedPriority = detectedPriority;

    aiSuggestionContent.innerHTML = `
      <span>AI recommends: <strong>${detectedCategory}</strong> category with <strong>${detectedPriority} Priority</strong> (${confidence}% confidence).</span>
      <div style="font-size: 0.74rem; color: #6366f1; margin-top: 2px;">Rationale: ${reason}</div>
    `;
    aiSuggestionBox.style.display = "block";
  }

  [issueTitleInput, issueDescriptionInput].forEach(el => {
    el.addEventListener("input", analyzeComplaintWithAI);
  });

  applyAiSuggestionBtn.addEventListener("click", () => {
    // Select Category radio
    const targetRadio = document.querySelector(`input[name='category'][value='${aiSuggestedCategory}']`);
    if (targetRadio) {
      targetRadio.checked = true;
      categoryRadioCards.forEach(c => c.classList.remove("active"));
      if (targetRadio.parentElement) targetRadio.parentElement.classList.add("active");
    }
    document.getElementById("issuePriority").value = aiSuggestedPriority;
    showToast(`AI suggestion applied: ${aiSuggestedCategory} • ${aiSuggestedPriority} Priority`, "success");
  });

  // Voice Dictation Integration (Web Speech API)
  if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    speechRecognition = new SpeechRecognition();
    speechRecognition.continuous = false;
    speechRecognition.interimResults = false;
    speechRecognition.lang = 'en-US';

    speechRecognition.onstart = () => {
      isVoiceListening = true;
      voiceDictateBtn.classList.add("listening");
      voiceBtnText.textContent = "Listening... Speak now";
    };

    speechRecognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      const currentText = issueDescriptionInput.value;
      issueDescriptionInput.value = currentText ? `${currentText} ${transcript}` : transcript;
      analyzeComplaintWithAI();
      showToast("Voice transcribed successfully!", "success");
    };

    speechRecognition.onerror = (e) => {
      console.warn("Speech recognition error:", e);
      showToast("Voice recognition error or mic permission denied.", "warning");
    };

    speechRecognition.onend = () => {
      isVoiceListening = false;
      voiceDictateBtn.classList.remove("listening");
      voiceBtnText.textContent = "Voice Dictation";
    };

    voiceDictateBtn.addEventListener("click", () => {
      if (!isVoiceListening) {
        try {
          speechRecognition.start();
        } catch (err) {
          console.error(err);
        }
      } else {
        speechRecognition.stop();
      }
    });
  } else {
    voiceDictateBtn.style.display = "none";
  }

  // ==========================================
  // 4. Interactive 2D Campus Map
  // ==========================================
  const CAMPUS_BUILDINGS_DATA = [
    { name: "Science & Lab Block", icon: "ph-flask", coords: "Zone A - East Wing", zones: ["Chemistry Lab 3", "Bio-Tech Lab", "Physics Lab"] },
    { name: "Engineering Quad", icon: "ph-cpu", coords: "Zone B - North Quad", zones: ["Embedded Lab 210", "Mechanical Workshop", "CAD Lab"] },
    { name: "Main Academic Block", icon: "ph-chalkboard-teacher", coords: "Zone C - Central", zones: ["Lecture Hall 302", "Smart Class 101", "Dean Office"] },
    { name: "Central Library", icon: "ph-books", coords: "Zone D - West Wing", zones: ["Digital Section", "Reading Hall 1", "Archives"] },
    { name: "Hostel Block A", icon: "ph-bed", coords: "Zone E - South Campus", zones: ["West Wing Restroom", "Common Mess", "Hostel Quad"] },
    { name: "Hostel Block B", icon: "ph-bed", coords: "Zone F - South Campus", zones: ["East Wing Block", "Study Lounge"] },
    { name: "Auditorium & Sports Complex", icon: "ph-trophy", coords: "Zone G - Central Arena", zones: ["Seminar Hall Audi-2", "Main Stage", "Indoor Court"] },
    { name: "Cafeteria Building", icon: "ph-fork-knife", coords: "Zone H - Student Center", zones: ["Entrance Porch", "Dining Hall A", "Snack Bar"] }
  ];

  function renderCampusMap() {
    const list = currentComplaints;
    let gridHtml = "";

    CAMPUS_BUILDINGS_DATA.forEach(bld => {
      const bldComplaints = list.filter(c => c.building === bld.name);
      const activeCount = bldComplaints.filter(c => c.status !== "Resolved").length;
      const criticalCount = bldComplaints.filter(c => c.priority === "Critical" && c.status !== "Resolved").length;
      const isSelected = selectedMapBuilding === bld.name;

      let heatClass = "";
      let dotClass = "green";

      if (criticalCount > 0) {
        heatClass = "heat-critical";
        dotClass = "red";
      } else if (activeCount > 0) {
        dotClass = "amber";
      }

      gridHtml += `
        <div class="campus-building-tile ${heatClass} ${isSelected ? 'active-selected' : ''}" onclick="window.FixItApp.selectCampusBuilding('${bld.name}')">
          <div class="tile-top">
            <div class="building-icon-wrap">
              <i class="ph-fill ${bld.icon}"></i>
            </div>
            <span class="legend-dot ${dotClass}" title="${activeCount} active issues"></span>
          </div>

          <div>
            <h4 class="building-name">${bld.name}</h4>
            <span style="font-size: 0.72rem; color: #64748b;">${bld.coords}</span>
          </div>

          <div class="building-stats-strip">
            <span><strong>${activeCount}</strong> Active Tickets</span>
            <span>${criticalCount > 0 ? `<strong style="color:#be123c;">${criticalCount} Critical</strong>` : 'Normal'}</span>
          </div>
        </div>
      `;
    });

    campusMapGrid.innerHTML = gridHtml;
    renderSelectedBuildingComplaints();
  }

  function selectCampusBuilding(bldName) {
    selectedMapBuilding = bldName;
    renderCampusMap();
  }

  function renderSelectedBuildingComplaints() {
    const bld = CAMPUS_BUILDINGS_DATA.find(b => b.name === selectedMapBuilding) || CAMPUS_BUILDINGS_DATA[0];
    const bldComplaints = currentComplaints.filter(c => c.building === bld.name);

    selectedBuildingBadge.textContent = bld.coords;
    selectedBuildingTitle.textContent = bld.name;
    selectedBuildingSubtitle.textContent = `Displaying all ${bldComplaints.length} logged maintenance tickets for this campus zone.`;
    mapReportHereBtn.style.display = "inline-flex";

    mapReportHereBtn.onclick = () => {
      document.getElementById("issueBuilding").value = bld.name;
      reportModal.classList.add("active");
    };

    if (bldComplaints.length === 0) {
      buildingComplaintsList.innerHTML = `<div style="text-align: center; color: #10b981; padding: 20px; font-weight: 600;"><i class="ph-fill ph-check-circle" style="font-size: 1.6rem;"></i><br>All systems clear! No pending maintenance issues in ${bld.name}.</div>`;
      return;
    }

    buildingComplaintsList.innerHTML = bldComplaints.map(c => `
      <div class="building-complaint-mini" onclick="window.FixItApp.openDetailsModal('${c.id}')">
        <div>
          <div style="font-weight: 700; color: #0f172a; font-size: 0.88rem;">${escapeHtml(c.title)}</div>
          <div style="font-size: 0.75rem; color: #64748b;"><i class="ph ph-map-pin"></i> ${escapeHtml(c.room)} • Assigned: ${escapeHtml(c.assignedTo || "Queue")}</div>
        </div>
        <div class="d-flex gap-xs">
          ${renderBadge("priority", c.priority)}
          ${renderBadge("status", c.status)}
        </div>
      </div>
    `).join("");
  }

  // ==========================================
  // 5. Room QR Code Center Logic
  // ==========================================
  function updateQrSticker() {
    const bld = qrGenBuilding.value;
    const room = qrGenRoom.value.trim() || "Classroom 101";

    qrStickerBuilding.textContent = bld;
    qrStickerRoom.textContent = room;

    const qrDataPayload = JSON.stringify({
      app: "FixIt-Campus",
      building: bld,
      room: room
    });

    if (qrcodeContainer) {
      qrcodeContainer.innerHTML = "";
      try {
        if (typeof QRCode !== "undefined") {
          qrCodeInstance = new QRCode(qrcodeContainer, {
            text: `https://campus-maintainance.vercel.app/?bld=${encodeURIComponent(bld)}&room=${encodeURIComponent(room)}`,
            width: 100,
            height: 100,
            colorDark: "#0f172a",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.M
          });
        }
      } catch (err) {
        console.warn("QR code generator err:", err);
      }
    }
  }

  qrGenBuilding.addEventListener("change", updateQrSticker);
  qrGenRoom.addEventListener("input", updateQrSticker);

  printQrStickerBtn.addEventListener("click", () => {
    window.print();
  });

  testScanStickerBtn.addEventListener("click", () => {
    document.getElementById("issueBuilding").value = qrGenBuilding.value;
    document.getElementById("issueRoom").value = qrGenRoom.value;
    reportModal.classList.add("active");
  });

  qrScanPresets.forEach(presetBtn => {
    presetBtn.addEventListener("click", () => {
      const bld = presetBtn.getAttribute("data-building");
      const floor = presetBtn.getAttribute("data-floor");
      const room = presetBtn.getAttribute("data-room");

      document.getElementById("issueBuilding").value = bld;
      document.getElementById("issueFloor").value = floor;
      document.getElementById("issueRoom").value = room;

      showToast(`QR Scanned: ${bld} • ${room}`, "success");
      reportModal.classList.add("active");
    });
  });

  // ==========================================
  // 6. Statistics, KPIs & Eco-Impact
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

    // Eco Impact aggregates
    let totalWater = 0;
    let totalEnergy = 0;
    let totalCost = 0;
    let totalRatings = 0;
    let ratingCount = 0;

    list.forEach(c => {
      if (c.ecoImpact) {
        totalWater += c.ecoImpact.waterSaved || 0;
        totalEnergy += c.ecoImpact.energySaved || 0;
        totalCost += c.ecoImpact.costSaved || 0;
      }
      if (c.rating && c.rating > 0) {
        totalRatings += c.rating;
        ratingCount++;
      }
    });

    const avgRating = ratingCount > 0 ? (totalRatings / ratingCount).toFixed(1) : "4.9";

    // Top ticker & Eco banner
    topEcoWater.textContent = `${totalWater.toLocaleString()} L`;
    topEcoPower.textContent = `${totalEnergy} kWh`;
    ecoWaterSaved.textContent = `${totalWater.toLocaleString()} Litres`;
    ecoEnergySaved.textContent = `${totalEnergy} kWh`;
    ecoCostSaved.textContent = `₹ ${totalCost.toLocaleString()}`;
    ecoRatingScore.textContent = `⭐ ${avgRating} / 5 (${ratingCount} verified)`;

    // Badges & Headers
    totalComplaintsPill.textContent = total;
    mobileCount.textContent = total;
    activeAlertsBadge.textContent = `${critical} Hot`;

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
    metricSlaCompliance.textContent = "96.8%";

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
          <td><span class="badge ${resPct >= 70 ? 'badge-resolved' : 'badge-pending'}">${resPct}% Fixed</span></td>
          <td>⭐ 4.9</td>
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

    // Urgent active escalations list with SLA pill
    const urgentItems = list.filter(c => (c.priority === "Critical" || c.priority === "High") && c.status !== "Resolved");
    if (urgentItems.length === 0) {
      urgentTicketsList.innerHTML = `<div style="font-size: 0.8rem; color: #166534; padding: 4px 0;"><i class="ph ph-check-circle"></i> No active critical escalations. All high priorities under control!</div>`;
    } else {
      urgentTicketsList.innerHTML = urgentItems.slice(0, 3).map(c => {
        const sla = computeSlaInfo(c);
        return `
          <div class="urgent-item-mini" onclick="window.FixItApp.openDetailsModal('${c.id}')">
            <div>
              <div class="urgent-title">${escapeHtml(c.title)}</div>
              <div class="urgent-loc"><i class="ph ph-map-pin"></i> ${escapeHtml(c.building)} • ${escapeHtml(c.room)}</div>
              <span class="sla-badge ${sla.status}" style="font-size: 0.65rem; margin-top: 4px;">${sla.text}</span>
            </div>
            <span class="badge ${c.priority === 'Critical' ? 'badge-prio-critical' : 'badge-prio-high'}">${c.priority}</span>
          </div>
        `;
      }).join("");
    }

    // Latest resolved ticker
    const lastResolved = list.find(c => c.status === "Resolved");
    if (lastResolved) {
      heroLatestText.textContent = `Latest: ${lastResolved.title} (${lastResolved.room})`;
    }
  }

  // ==========================================
  // 7. Render Complaints Cards & Table
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
    const sla = computeSlaInfo(c);
    const upvoteCount = c.upvotes || 0;

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
            <div class="meta-item justify-between">
              <span><i class="ph ph-user-gear"></i> ${escapeHtml(c.assignedTo || "Unassigned")}</span>
              <span class="sla-badge ${sla.status}">${sla.text}</span>
            </div>
          </div>

          <div class="card-footer-row">
            <div class="reporter-avatar-row">
              <div class="avatar-circle">${reporterInitials}</div>
              <span>${escapeHtml(c.reporterName)}</span>
            </div>
            <div class="d-flex align-center gap-xs">
              <button class="btn-upvote" onclick="event.stopPropagation(); window.FixItApp.upvoteTicket('${c.id}')" title="Upvote issue urgency">
                <i class="ph-bold ph-thumbs-up"></i> ${upvoteCount}
              </button>
              <span>${formattedDate}</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function createComplaintTableRowHtml(c) {
    const formattedDate = new Date(c.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" });
    const sla = computeSlaInfo(c);

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
        <td><span class="sla-badge ${sla.status}">${sla.text}</span></td>
        <td>
          <button class="btn-upvote" onclick="event.stopPropagation(); window.FixItApp.upvoteTicket('${c.id}')">
            <i class="ph-bold ph-thumbs-up"></i> ${c.upvotes || 0}
          </button>
        </td>
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
  // 8. Filtering & Search Engine
  // ==========================================
  function applyFiltersAndRender() {
    const query = searchInput.value.trim().toLowerCase();
    const statusVal = statusFilter.value;
    const catVal = categoryFilter.value;
    const prioVal = priorityFilter.value;
    const bldVal = buildingFilter.value;
    const sortVal = sortBy.value;

    let filtered = currentComplaints.filter(item => {
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

      if (statusVal !== "all" && item.status !== statusVal) return false;
      if (catVal !== "all" && item.category !== catVal) return false;
      if (prioVal !== "all" && item.priority !== prioVal) return false;
      if (bldVal !== "all" && item.building !== bldVal) return false;

      return true;
    });

    // Sorting
    const priorityWeight = { Critical: 4, High: 3, Medium: 2, Low: 1 };
    filtered.sort((a, b) => {
      if (sortVal === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortVal === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortVal === "upvotes-desc") return (b.upvotes || 0) - (a.upvotes || 0);
      if (sortVal === "priority-desc") return (priorityWeight[b.priority] || 0) - (priorityWeight[a.priority] || 0);
      if (sortVal === "priority-asc") return (priorityWeight[a.priority] || 0) - (priorityWeight[b.priority] || 0);
      return 0;
    });

    filterMatchCount.textContent = filtered.length;
    filterTotalCount.textContent = currentComplaints.length;
    clearSearchBtn.style.display = query.length > 0 ? "block" : "none";

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

    recentComplaintsGrid.innerHTML = currentComplaints.slice(0, 4).map(createComplaintCardHtml).join("");
  }

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

  // Upvoting handler
  function upvoteTicket(ticketId) {
    const newCount = DataStore.incrementUpvote(ticketId);
    currentComplaints = DataStore.getComplaints();
    showToast(`You upvoted ticket ${ticketId}! (+${newCount} total students affected)`, "info");
    refreshAllViews();
  }

  // ==========================================
  // 9. Kanban Workflow Board
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

      const sla = computeSlaInfo(c);

      return `
        <div class="kanban-item-card" onclick="window.FixItApp.openDetailsModal('${c.id}')">
          <div class="d-flex justify-between align-center">
            <span class="ticket-id-tag">${c.id}</span>
            ${renderBadge("priority", c.priority)}
          </div>
          <h4 style="font-size: 0.92rem; font-weight: 700; color: #0f172a;">${escapeHtml(c.title)}</h4>
          <div style="font-size: 0.78rem; color: #64748b;"><i class="ph ph-map-pin"></i> ${escapeHtml(c.building)} • ${escapeHtml(c.room)}</div>
          <span class="sla-badge ${sla.status}" style="font-size: 0.65rem; width: fit-content;">${sla.text}</span>
          <div class="kanban-actions-row">
            <span style="font-size: 0.72rem; color: #94a3b8;">${escapeHtml(c.assignedTo || "Unassigned")}</span>
            ${actionBtn}
          </div>
        </div>
      `;
    }

    kanbanPendingZone.innerHTML = pendingItems.length ? pendingItems.map(c => renderKanbanCard(c, "Pending")).join("") : `<div class="empty-kanban-slot" style="color:#94a3b8; padding:20px; text-align:center;">No pending tickets</div>`;
    kanbanProgressZone.innerHTML = progressItems.length ? progressItems.map(c => renderKanbanCard(c, "In Progress")).join("") : `<div class="empty-kanban-slot" style="color:#94a3b8; padding:20px; text-align:center;">No tickets in progress</div>`;
    kanbanResolvedZone.innerHTML = resolvedItems.length ? resolvedItems.map(c => renderKanbanCard(c, "Resolved")).join("") : `<div class="empty-kanban-slot" style="color:#94a3b8; padding:20px; text-align:center;">No resolved tickets</div>`;
  }

  // ==========================================
  // 10. Ticket Tracker Search
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
          <p style="color: #64748b; font-size: 0.9rem; margin-top: 4px;">Please check the complaint reference ID and try again.</p>
        </div>
      `;
      return;
    }

    const step1Active = true;
    const step2Active = item.status === "In Progress" || item.status === "Resolved";
    const step3Active = item.status === "Resolved";
    const sla = computeSlaInfo(item);

    trackerResultContainer.innerHTML = `
      <div class="panel-card">
        <div class="panel-header">
          <div>
            <span class="ticket-id-tag">${item.id}</span>
            <h3 style="font-size: 1.25rem; font-weight: 800; margin-top: 6px;">${escapeHtml(item.title)}</h3>
            <p class="panel-subtitle"><i class="ph ph-map-pin"></i> ${escapeHtml(item.building)} • ${escapeHtml(item.room)}</p>
          </div>
          <div class="d-flex gap-xs flex-wrap">
            ${renderBadge("priority", item.priority)}
            ${renderBadge("status", item.status)}
            <span class="sla-badge ${sla.status}">${sla.text}</span>
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
  // 11. Report Complaint Modal & Form Handling
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
    aiSuggestionBox.style.display = "none";
  }

  closeReportModalBtn.addEventListener("click", closeReportModal);
  cancelReportBtn.addEventListener("click", closeReportModal);

  categoryRadioCards.forEach(card => {
    card.addEventListener("click", () => {
      categoryRadioCards.forEach(c => c.classList.remove("active"));
      card.classList.add("active");
      const radio = card.querySelector("input[type='radio']");
      if (radio) radio.checked = true;
    });
  });

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

  // Submit Handler
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
    const reporterPhone = document.getElementById("reporterPhone").value.trim() || "+91 9876543210";

    const nextId = DataStore.getNextId();
    const now = new Date();
    const timeFormatted = now.toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
    const slaHours = priority === "Critical" ? 4 : priority === "High" ? 12 : priority === "Medium" ? 24 : 72;

    const photo = attachedPhotoDataUrl || createSvgDataUrl(category, `${building} - ${room}`, "#f0f9ff", "#0284c7");

    const newTicket = {
      id: nextId,
      title,
      category,
      building,
      floor,
      room,
      priority,
      slaHours,
      status: "Pending",
      upvotes: 1,
      description,
      photo,
      afterPhoto: "",
      rating: 0,
      ecoImpact: {
        waterSaved: category === "Plumbing" ? 240 : 0,
        energySaved: (category === "Electrical" || category === "HVAC / AC") ? 15 : 0,
        costSaved: 1200
      },
      reporterName,
      reporterId,
      reporterEmail,
      reporterPhone,
      assignedTo: "Unassigned",
      createdAt: now.toISOString(),
      timeline: [
        { author: reporterName, time: timeFormatted, text: `Complaint registered with priority level "${priority}". Auto-assigned ${slaHours}h SLA target.` }
      ]
    };

    DataStore.addComplaint(newTicket);
    currentComplaints = DataStore.getComplaints();

    closeReportModal();
    showToast(`Complaint submitted! Reference ID: ${nextId}`, "success");
    refreshAllViews();

    // Auto-open tracker
    trackerInput.value = nextId;
    switchView("trackerView");
    trackTicketById(nextId);
  });

  // ==========================================
  // 12. Issue Details & Status Update Modal
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

    const sla = computeSlaInfo(item);
    modalSlaBadge.className = `sla-badge ${sla.status}`;
    modalSlaBadge.textContent = sla.text;

    modalUpvoteText.textContent = `Affected Me Too (+${item.upvotes || 0})`;

    modalCategory.textContent = item.category;
    modalLocation.textContent = `${item.building}, ${item.floor}, ${item.room}`;
    modalDate.textContent = new Date(item.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" });
    modalReporter.textContent = item.reporterName;
    modalReporterContact.textContent = `${item.reporterName} (ID: ${item.reporterId}) • ${item.reporterEmail} • ${item.reporterPhone}`;
    modalDescription.textContent = item.description;

    // Before & After Images
    modalBeforeImg.src = item.photo || createSvgDataUrl(item.category, "Defect Reported", "#f0f9ff", "#0284c7");
    if (item.afterPhoto) {
      modalAfterBox.style.display = "flex";
      modalAfterImg.src = item.afterPhoto;
    } else if (item.status === "Resolved") {
      modalAfterBox.style.display = "flex";
      modalAfterImg.src = createSvgDataUrl(item.category, "Resolved & Verified Fix", "#f0fdf4", "#15803d", true);
    } else {
      modalAfterBox.style.display = "none";
    }

    // Rating Section (Visible for Resolved)
    if (item.status === "Resolved") {
      modalRatingSection.style.display = "block";
      updateStarRatingUI(item.rating || 5);
    } else {
      modalRatingSection.style.display = "none";
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

  modalUpvoteBtn.addEventListener("click", () => {
    if (activeSelectedTicketId) {
      upvoteTicket(activeSelectedTicketId);
      openDetailsModal(activeSelectedTicketId);
    }
  });

  // Star Rating Handler
  starBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      if (!activeSelectedTicketId) return;
      const rating = parseInt(btn.getAttribute("data-rating"), 10);
      DataStore.rateComplaint(activeSelectedTicketId, rating);
      currentComplaints = DataStore.getComplaints();
      updateStarRatingUI(rating);
      showToast(`Thank you! Rated ${rating} / 5 stars for repair quality.`, "success");
      calculateStatistics();
    });
  });

  function updateStarRatingUI(rating) {
    starBtns.forEach(b => {
      const val = parseInt(b.getAttribute("data-rating"), 10);
      if (val <= rating) {
        b.classList.add("active");
      } else {
        b.classList.remove("active");
      }
    });
    ratingScoreText.textContent = `${rating} of 5 Stars Verified`;
  }

  function renderTimeline(timeline) {
    if (!timeline || timeline.length === 0) {
      modalTimelineList.innerHTML = `<span style="font-size: 0.82rem; color: #64748b;">No timeline notes logged yet.</span>`;
      return;
    }
    modalTimelineList.innerHTML = timeline.map(t => `
      <div class="timeline-item ${t.text.includes('Resolved') ? 'resolved' : ''}">
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
    if (noteText) logMessage += ` Note: ${noteText}`;

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
      ...(newStatus === "Resolved" ? {
        resolvedAt: now.toISOString(),
        afterPhoto: item.afterPhoto || createSvgDataUrl(item.category, "Resolved & Tested", "#f0fdf4", "#15803d", true)
      } : {})
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
      ...(nextStatus === "Resolved" ? {
        resolvedAt: now.toISOString(),
        afterPhoto: item.afterPhoto || createSvgDataUrl(item.category, "Resolved & Tested", "#f0fdf4", "#15803d", true)
      } : {})
    });

    currentComplaints = DataStore.getComplaints();
    showToast(`Ticket ${ticketId} status updated to ${nextStatus}`, "info");
    refreshAllViews();
  }

  // ==========================================
  // 13. SMS / WhatsApp Alert Simulator
  // ==========================================
  openSmsSimulatorBtn.addEventListener("click", () => {
    renderSmsFeed();
    smsModal.classList.add("active");
  });

  closeSmsModalBtn.addEventListener("click", () => {
    smsModal.classList.remove("active");
  });

  function renderSmsFeed() {
    const list = currentComplaints.slice(0, 5);
    smsFeedList.innerHTML = list.map((c, i) => `
      <div class="phone-msg-card ${i % 2 === 0 ? 'whatsapp' : 'sms'}">
        <div class="phone-msg-header">
          <span>${i % 2 === 0 ? '💬 WhatsApp Alert' : '📱 SMS Notification'}</span>
          <span>Just now</span>
        </div>
        <div class="phone-msg-body">
          <strong>Dear ${escapeHtml(c.reporterName)},</strong> your FixIt complaint <code>${c.id}</code> (${escapeHtml(c.title)}) is currently <strong>${c.status}</strong>. Assigned technician: <em>${escapeHtml(c.assignedTo || 'Rapid Crew')}</em>.
        </div>
      </div>
    `).join("");
  }

  // ==========================================
  // 14. Export & Reset Handlers
  // ==========================================
  exportDataBtn.addEventListener("click", () => {
    const list = currentComplaints;
    const headers = ["Ticket ID", "Title", "Category", "Building", "Floor", "Room", "Priority", "Status", "Upvotes", "Rating", "Reported By", "Reported ID", "Assigned To", "Created Date"];
    const rows = list.map(c => [
      c.id,
      `"${c.title.replace(/"/g, '""')}"`,
      c.category,
      `"${c.building}"`,
      c.floor,
      `"${c.room}"`,
      c.priority,
      c.status,
      c.upvotes || 0,
      c.rating || 0,
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
  // 15. Refresh & Toast Helpers
  // ==========================================
  function refreshAllViews() {
    calculateStatistics();
    applyFiltersAndRender();
    renderCampusMap();
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

  window.FixItApp = {
    openDetailsModal,
    quickUpdateStatus,
    selectCampusBuilding,
    upvoteTicket,
    switchView
  };

  // Initial Load
  refreshAllViews();
});
