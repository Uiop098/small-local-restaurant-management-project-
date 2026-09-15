const STORAGE_KEY = "mess_system_records_v1";

// Default standard rates
const PRICING = {
  Breakfast: { member: 30, guest: 45 },
  Lunch: { member: 60, guest: 80 },
  Snacks: { member: 20, guest: 30 },
  Dinner: { member: 60, guest: 80 }
};

// Initial Seed Data
const SEED_DATA = [
  { id: 101, date: "2026-09-04", name: "Aarav Patel", room: "A-102", meal: "Breakfast", status: "Eating", guests: 0, charge: 30 },
  { id: 102, date: "2026-09-04", name: "Priya Sharma", room: "B-214", meal: "Lunch", status: "Guest", guests: 1, charge: 140 },
  { id: 103, date: "2026-09-04", name: "Karan Verma", room: "C-305", meal: "Lunch", status: "Skipped", guests: 0, charge: 0 },
  { id: 104, date: "2026-09-04", name: "Neha Joshi", room: "A-108", meal: "Dinner", status: "Eating", guests: 0, charge: 60 }
];

let records = [];

// DOM Element Selectors
const tableBody = document.getElementById("tableBody");
const emptyNotice = document.getElementById("emptyNotice");
const mealForm = document.getElementById("mealForm");
const mealDateInput = document.getElementById("mealDate");
const searchInput = document.getElementById("searchInput");
const filterMeal = document.getElementById("filterMeal");
const filterStatus = document.getElementById("filterStatus");
const exportBtn = document.getElementById("exportBtn");
const clearBtn = document.getElementById("clearBtn");
const csvFileInput = document.getElementById("csvFileInput");
const syncIndicator = document.getElementById("syncIndicator");
const rowCountEl = document.getElementById("rowCount");

// KPI Selectors
const kpiTotalEntries = document.getElementById("kpiTotalEntries");
const kpiEating = document.getElementById("kpiEating");
const kpiSkipped = document.getElementById("kpiSkipped");
const kpiGuests = document.getElementById("kpiGuests");
const kpiTotalRevenue = document.getElementById("kpiTotalRevenue");

// --- Initialization & Storage ---

function init() {
  // Set default form date to today
  mealDateInput.value = new Date().toISOString().split("T")[0];

  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      records = JSON.parse(saved);
    } catch (e) {
      records = [...SEED_DATA];
    }
  } else {
    records = [...SEED_DATA];
  }

  render();
}

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  syncIndicator.textContent = "💾 Changes Saved Locally!";
  setTimeout(() => {
    syncIndicator.textContent = "💾 Auto-saved to LocalStorage";
  }, 1200);
}

// Calculate Charge based on pricing rules
function computeCharge(meal, status, guests) {
  if (status === "Skipped") return 0;
  const rates = PRICING[meal] || { member: 60, guest: 80 };
  const memberPart = rates.member;
  const guestPart = (Number(guests) || 0) * rates.guest;
  return status === "Guest" ? memberPart + guestPart : memberPart;
}

// --- Render Table & Metrics ---

function render() {
  const searchTerm = searchInput.value.toLowerCase().trim();
  const mealFilterVal = filterMeal.value;
  const statusFilterVal = filterStatus.value;

  const filtered = records.filter((r) => {
    const matchesSearch = r.name.toLowerCase().includes(searchTerm) || r.room.toLowerCase().includes(searchTerm);
    const matchesMeal = mealFilterVal === "All" || r.meal === mealFilterVal;
    const matchesStatus = statusFilterVal === "All" || r.status === statusFilterVal;
    return matchesSearch && matchesMeal && matchesStatus;
  });

  tableBody.innerHTML = "";

  if (filtered.length === 0) {
    emptyNotice.classList.remove("hidden");
  } else {
    emptyNotice.classList.add("hidden");
  }

  filtered.forEach((item) => {
    const tr = document.createElement("tr");

    let badgeClass = "badge-eating";
    if (item.status === "Skipped") badgeClass = "badge-skipped";
    if (item.status === "Guest") badgeClass = "badge-guest";

    tr.innerHTML = `
      <td>${item.id}</td>
      <td contenteditable="true" data-id="${item.id}" data-field="date">${escapeHtml(item.date)}</td>
      <td contenteditable="true" data-id="${item.id}" data-field="name">${escapeHtml(item.name)}</td>
      <td contenteditable="true" data-id="${item.id}" data-field="room">${escapeHtml(item.room)}</td>
      <td>${item.meal}</td>
      <td><span class="badge ${badgeClass}">${item.status}</span></td>
      <td contenteditable="true" data-id="${item.id}" data-field="guests">${item.guests}</td>
      <td><strong>₹${Number(item.charge).toFixed(2)}</strong></td>
      <td class="text-center">
        <button class="btn-del" data-id="${item.id}" title="Remove Entry">✕</button>
      </td>
    `;
    tableBody.appendChild(tr);
  });

  updateKPIs(records);
  rowCountEl.textContent = `${filtered.length} of ${records.length} records shown`;
}

function updateKPIs(data) {
  kpiTotalEntries.textContent = data.length;
  kpiEating.textContent = data.filter((d) => d.status === "Eating" || d.status === "Guest").length;
  kpiSkipped.textContent = data.filter((d) => d.status === "Skipped").length;
  
  const totalGuests = data.reduce((acc, curr) => acc + (Number(curr.guests) || 0), 0);
  kpiGuests.textContent = totalGuests;

  const totalBilled = data.reduce((acc, curr) => acc + (Number(curr.charge) || 0), 0);
  kpiTotalRevenue.textContent = `₹${totalBilled.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`;
}

// Basic HTML sanitization
function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (m) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[m]));
}

// --- Direct Table Cell Editing ---

tableBody.addEventListener("blur", (e) => {
  if (e.target.hasAttribute("contenteditable")) {
    const id = Number(e.target.getAttribute("data-id"));
    const field = e.target.getAttribute("data-field");
    let val = e.target.textContent.trim();

    const record = records.find((r) => r.id === id);
    if (!record) return;

    if (field === "guests") {
      val = Math.max(0, parseInt(val, 10) || 0);
      record.guests = val;
      record.charge = computeCharge(record.meal, record.status, record.guests);
    } else {
      record[field] = val;
    }

    persist();
    render();
  }
}, true);

// Row Deletion
tableBody.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-del")) {
    const id = Number(e.target.getAttribute("data-id"));
    records = records.filter((r) => r.id !== id);
    persist();
    render();
  }
});

// --- Meal Entry Creation ---

mealForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const meal = document.getElementById("mealType").value;
  const status = document.getElementById("mealStatus").value;
  const guests = status === "Guest" ? parseInt(document.getElementById("guestCount").value, 10) || 1 : 0;
  const charge = computeCharge(meal, status, guests);

  const nextId = records.length > 0 ? Math.max(...records.map((r) => r.id)) + 1 : 101;

  const newEntry = {
    id: nextId,
    name: document.getElementById("memberName").value.trim(),
    room: document.getElementById("roomNumber").value.trim(),
    date: document.getElementById("mealDate").value,
    meal: meal,
    status: status,
    guests: guests,
    charge: charge
  };

  records.unshift(newEntry);
  persist();
  render();

  // Reset form inputs except date
  document.getElementById("memberName").value = "";
  document.getElementById("roomNumber").value = "";
  document.getElementById("guestCount").value = "0";
});

// --- Search and Filters ---

searchInput.addEventListener("input", render);
filterMeal.addEventListener("change", render);
filterStatus.addEventListener("change", render);

// Reset Data
clearBtn.addEventListener("click", () => {
  if (confirm("Reset ledger? All saved meals will be removed from local storage.")) {
    records = [];
    persist();
    render();
  }
});

// --- CSV Export for Microsoft Excel ---

exportBtn.addEventListener("click", () => {
  if (records.length === 0) {
    alert("No meal records available to export.");
    return;
  }

  const headers = ["Entry ID", "Date", "Member Name", "Room Number", "Meal Type", "Status", "Guest Count", "Total Charge (INR)"];
  const rows = records.map((r) => [
    formatCsvCell(r.id),
    formatCsvCell(r.date),
    formatCsvCell(r.name),
    formatCsvCell(r.room),
    formatCsvCell(r.meal),
    formatCsvCell(r.status),
    formatCsvCell(r.guests),
    formatCsvCell(r.charge)
  ]);

  const csvBody = [headers.join(","), ...rows.map((row) => row.join(","))].join("\r\n");

  // Include UTF-8 BOM (\uFEFF) so Excel parses Unicode and opens tabular layout cleanly
  const blob = new Blob(["\uFEFF" + csvBody], { type: "text/csv;charset=utf-8;" });
  const downloadUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = downloadUrl;
  link.download = `Mess_Ledger_${new Date().toISOString().split("T")[0]}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(downloadUrl);
});

function formatCsvCell(val) {
  const str = val === null || val === undefined ? "" : String(val);
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

// --- CSV Import ---

csvFileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (event) {
    parseAndLoadCsv(event.target.result);
    csvFileInput.value = "";
  };
  reader.readAsText(file);
});

function parseAndLoadCsv(text) {
  const lines = parseCsv(text);
  if (lines.length <= 1) {
    alert("The uploaded CSV is empty.");
    return;
  }

  const parsed = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i];
    if (cols.length < 6) continue;

    const meal = cols[4]?.trim() || "Lunch";
    const status = cols[5]?.trim() || "Eating";
    const guests = parseInt(cols[6], 10) || 0;
    const charge = cols[7] ? parseFloat(cols[7]) : computeCharge(meal, status, guests);

    parsed.push({
      id: parseInt(cols[0], 10) || parsed.length + 101,
      date: cols[1]?.trim() || new Date().toISOString().split("T")[0],
      name: cols[2]?.trim() || "Unknown",
      room: cols[3]?.trim() || "-",
      meal: meal,
      status: status,
      guests: guests,
      charge: charge
    });
  }

  if (parsed.length > 0) {
    records = parsed;
    persist();
    render();
  } else {
    alert("Could not process records from the uploaded file.");
  }
}

// RFC 4180 CSV parser
function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    const next = text[i + 1];

    if (c === '"') {
      if (inQuotes && next === '"') {
        cell += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (c === "," && !inQuotes) {
      row.push(cell);
      cell = "";
    } else if ((c === "\r" || c === "\n") && !inQuotes) {
      if (c === "\r" && next === "\n") i++;
      row.push(cell);
      if (row.some((cellText) => cellText.trim() !== "")) rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += c;
    }
  }

  if (cell || row.length > 0) {
    row.push(cell);
    if (row.some((cellText) => cellText.trim() !== "")) rows.push(row);
  }

  return rows;
}

document.addEventListener("DOMContentLoaded", init);
