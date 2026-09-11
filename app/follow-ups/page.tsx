"use client";

import { useMemo, useState } from "react";
import styles from "./FollowUps.module.css";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Nevbar/page";

type FollowUp = {
  id: number;
  initials: string;
  name: string;
  company: string;
  type: "Call" | "Email" | "Meeting" | "Follow-up";
  purpose: string;
  date: string;
  time: string;
  status: "Pending" | "Follow-up" | "Scheduled" | "Overdue";
  assigned: string;
};

const initialFollowUps: FollowUp[] = [
  {
    id: 1,
    initials: "AS",
    name: "Amit Sharma",
    company: "Smile Dental Clinic",
    type: "Call",
    purpose: "Discuss website proposal",
    date: "10 Sep 2025",
    time: "10:00 AM",
    status: "Pending",
    assigned: "Vishal Thakur",
  },
  {
    id: 2,
    initials: "PK",
    name: "Pooja Khandelwal",
    company: "Dental Plus",
    type: "Email",
    purpose: "Send quotation",
    date: "10 Sep 2025",
    time: "11:30 AM",
    status: "Follow-up",
    assigned: "Rohit Singh",
  },
  {
    id: 3,
    initials: "RS",
    name: "Rahul Saini",
    company: "Care Dental",
    type: "Call",
    purpose: "Product demo",
    date: "10 Sep 2025",
    time: "02:00 PM",
    status: "Pending",
    assigned: "Sneha Patel",
  },
  {
    id: 4,
    initials: "AV",
    name: "Anjali Verma",
    company: "Healthy Smiles",
    type: "Meeting",
    purpose: "Discuss project scope",
    date: "10 Sep 2025",
    time: "04:00 PM",
    status: "Scheduled",
    assigned: "Amit Kumar",
  },
  {
    id: 5,
    initials: "VG",
    name: "Vikash Gupta",
    company: "Dental World",
    type: "Call",
    purpose: "Follow up on proposal",
    date: "11 Sep 2025",
    time: "10:30 AM",
    status: "Pending",
    assigned: "Rohit Singh",
  },
  {
    id: 6,
    initials: "NT",
    name: "Neha Tiwari",
    company: "Pearl Dental",
    type: "Email",
    purpose: "Send brochure",
    date: "11 Sep 2025",
    time: "12:00 PM",
    status: "Overdue",
    assigned: "Sneha Patel",
  },
  {
    id: 7,
    initials: "AB",
    name: "Aditya Bansal",
    company: "Perfect Smile",
    type: "Meeting",
    purpose: "Client presentation",
    date: "12 Sep 2025",
    time: "11:00 AM",
    status: "Scheduled",
    assigned: "Amit Kumar",
  },
  {
    id: 8,
    initials: "SP",
    name: "Sonal Patel",
    company: "Shree Dental Care",
    type: "Follow-up",
    purpose: "Check requirements",
    date: "12 Sep 2025",
    time: "03:30 PM",
    status: "Pending",
    assigned: "Vishal Thakur",
  },
  {
    id: 9,
    initials: "MG",
    name: "Mohit Garg",
    company: "Family Dental",
    type: "Call",
    purpose: "Confirm demo",
    date: "13 Sep 2025",
    time: "10:00 AM",
    status: "Pending",
    assigned: "Rohit Singh",
  },
  {
    id: 10,
    initials: "PV",
    name: "Priya Verma",
    company: "Bright Dental",
    type: "Email",
    purpose: "Send invoice",
    date: "13 Sep 2025",
    time: "04:00 PM",
    status: "Follow-up",
    assigned: "Sneha Patel",
  },
  {
    id: 11,
    initials: "RK",
    name: "Ravi Kumar",
    company: "City Dental",
    type: "Call",
    purpose: "Discuss pricing",
    date: "14 Sep 2025",
    time: "11:00 AM",
    status: "Pending",
    assigned: "Vishal Thakur",
  },
  {
    id: 12,
    initials: "SK",
    name: "Simran Kapoor",
    company: "Smile Care",
    type: "Meeting",
    purpose: "Project discussion",
    date: "14 Sep 2025",
    time: "02:30 PM",
    status: "Scheduled",
    assigned: "Amit Kumar",
  },
  {
    id: 13,
    initials: "DK",
    name: "Deepak Kumar",
    company: "Dental Point",
    type: "Email",
    purpose: "Send proposal",
    date: "15 Sep 2025",
    time: "12:30 PM",
    status: "Pending",
    assigned: "Rohit Singh",
  },
  {
    id: 14,
    initials: "RS",
    name: "Riya Sharma",
    company: "Healthy Dental",
    type: "Call",
    purpose: "Confirm requirements",
    date: "15 Sep 2025",
    time: "03:00 PM",
    status: "Follow-up",
    assigned: "Sneha Patel",
  },
  {
    id: 15,
    initials: "AM",
    name: "Arun Mehta",
    company: "Dental Hub",
    type: "Meeting",
    purpose: "Final presentation",
    date: "16 Sep 2025",
    time: "11:30 AM",
    status: "Scheduled",
    assigned: "Vishal Thakur",
  },
];

const navItems = [
  { icon: "⌂", label: "Dashboard" },
  { icon: "♙", label: "Leads" },
  { icon: "♙", label: "Clients" },
  { icon: "◉", label: "Follow-ups" },
  { icon: "♜", label: "Sales / Deals" },
  { icon: "▣", label: "Projects" },
  { icon: "✓", label: "Tasks" },
  { icon: "▤", label: "Invoices & Payments" },
  { icon: "◫", label: "Reports & Analytics" },
  { icon: "♧", label: "Team" },
  { icon: "♧", label: "Notifications" },
  { icon: "⚙", label: "Settings" },
];

export default function FollowUpsPage() {
  const [followUps, setFollowUps] = useState(initialFollowUps);

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const [page, setPage] = useState(1);

  const [showModal, setShowModal] = useState(false);

  const [newName, setNewName] = useState("");
  const [newCompany, setNewCompany] = useState("");
  const [newType, setNewType] = useState<FollowUp["type"]>("Call");
  const [newPurpose, setNewPurpose] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");

  const rowsPerPage = 10;

  const filteredData = useMemo(() => {
    return followUps.filter((item) => {
      const searchMatch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.company.toLowerCase().includes(search.toLowerCase()) ||
        item.purpose.toLowerCase().includes(search.toLowerCase());

      const typeMatch =
        typeFilter === "All Types" || item.type === typeFilter;

      const statusMatch =
        statusFilter === "All Status" || item.status === statusFilter;

      return searchMatch && typeMatch && statusMatch;
    });
  }, [followUps, search, typeFilter, statusFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredData.length / rowsPerPage)
  );

  const visibleData = filteredData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  function changeSearch(value: string) {
    setSearch(value);
    setPage(1);
  }

  function changeType(value: string) {
    setTypeFilter(value);
    setPage(1);
  }

  function changeStatus(value: string) {
    setStatusFilter(value);
    setPage(1);
  }

  function addFollowUp() {
    if (!newName.trim() || !newCompany.trim()) {
      alert("Please enter name and company.");
      return;
    }

    const initials = newName
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

    const item: FollowUp = {
      id: Date.now(),
      initials,
      name: newName,
      company: newCompany,
      type: newType,
      purpose: newPurpose || "General follow-up",
      date: newDate
        ? new Date(newDate).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
        : "10 Sep 2025",
      time: newTime || "10:00 AM",
      status: "Pending",
      assigned: "Vishal Thakur",
    };

    setFollowUps((prev) => [item, ...prev]);

    setNewName("");
    setNewCompany("");
    setNewPurpose("");
    setNewDate("");
    setNewTime("");
    setNewType("Call");

    setShowModal(false);
    setPage(1);
  }

  function clearFilters() {
    setSearch("");
    setTypeFilter("All Types");
    setStatusFilter("All Status");
    setPage(1);
  }

  return (
    <div className={styles.page}>
      {/* ================= SIDEBAR ================= */}
      <Sidebar />


      {/* ================= TOPBAR ================= */}
      <Navbar />

     

      {/* ================= MAIN ================= */}

      <main className={styles.main}>
        {/* PAGE HEADER */}

        <section className={styles.pageHeader}>
          <div>
            <div className={styles.breadcrumb}>
              <span>⌂</span>
              <span>›</span>
              <span>Dashboard</span>
              <span>›</span>
              <strong>Follow-ups</strong>
            </div>

            <div className={styles.titleRow}>
              <div className={styles.titleIcon}>☑</div>

              <div>
                <h1>Follow-ups</h1>

                <p>
                  Stay on track with your leads, clients and projects.
                  Never miss an important follow-up.
                </p>
              </div>
            </div>
          </div>

          <button
            className={styles.addButton}
            onClick={() => setShowModal(true)}
          >
            <span>＋</span>
            Add Follow-up
          </button>
        </section>

        {/* ================= STATS ================= */}

        <section className={styles.statsGrid}>
          <StatCard
            icon="▣"
            title="Total Follow-ups"
            value="24"
            percent="↑ 12%"
            color="blue"
          />

          <StatCard
            icon="▤"
            title="Today's Follow-ups"
            value="6"
            percent="↑ 50%"
            color="blue"
          />

          <StatCard
            icon="☒"
            title="Overdue"
            value="3"
            percent="↑ 100%"
            color="red"
          />

          <StatCard
            icon="☑"
            title="Completed"
            value="15"
            percent="↑ 25%"
            color="green"
          />

          <StatCard
            icon="▣"
            title="This Week"
            value="18"
            percent="↑ 30%"
            color="purple"
          />
        </section>

        {/* ================= CONTENT ================= */}

        <section className={styles.contentGrid}>
          {/* TABLE */}

          <div className={styles.tableCard}>
            <div className={styles.tableToolbar}>
              <div className={styles.tableSearch}>
                <span>⌕</span>

                <input
                  value={search}
                  onChange={(e) => changeSearch(e.target.value)}
                  placeholder="Search by name, company, purpose..."
                />
              </div>

              <select
                value={typeFilter}
                onChange={(e) => changeType(e.target.value)}
              >
                <option>All Types</option>
                <option>Call</option>
                <option>Email</option>
                <option>Meeting</option>
                <option>Follow-up</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => changeStatus(e.target.value)}
              >
                <option>All Status</option>
                <option>Pending</option>
                <option>Follow-up</option>
                <option>Scheduled</option>
                <option>Overdue</option>
              </select>

              <button
                className={styles.todayButton}
                onClick={() => setPage(1)}
              >
                ▣ Today ⌄
              </button>

              <div className={styles.dateRange}>
                ▣ &nbsp; 10 Sep 2025 - 10 Sep 2025
              </div>
            </div>

            <div className={styles.tableScroll}>
              <table>
                <thead>
                  <tr>
                    <th className={styles.checkColumn}>
                      <input type="checkbox" />
                    </th>

                    <th>Name / Company</th>
                    <th>Type</th>
                    <th>Purpose</th>
                    <th>Date & Time</th>
                    <th>Status</th>
                    <th>Assigned To</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {visibleData.length === 0 ? (
                    <tr>
                      <td
                        colSpan={8}
                        className={styles.noResults}
                      >
                        No follow-ups found.
                      </td>
                    </tr>
                  ) : (
                    visibleData.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <input type="checkbox" />
                        </td>

                        <td>
                          <div className={styles.clientCell}>
                            <div className={styles.avatar}>
                              {item.initials}
                            </div>

                            <div>
                              <strong>{item.name}</strong>
                              <span>{item.company}</span>
                            </div>
                          </div>
                        </td>

                        <td>
                          <span
                            className={`${styles.typeBadge} ${
                              styles[item.type.toLowerCase()]
                            }`}
                          >
                            {item.type === "Call" && "☎ "}
                            {item.type === "Email" && "✉ "}
                            {item.type === "Meeting" && "▣ "}
                            {item.type === "Follow-up" && "↻ "}
                            {item.type}
                          </span>
                        </td>

                        <td>
                          <span className={styles.purpose}>
                            {item.purpose}
                          </span>
                        </td>

                        <td>
                          <div className={styles.dateTime}>
                            <strong>{item.date}</strong>
                            <span>{item.time}</span>
                          </div>
                        </td>

                        <td>
                          <span
                            className={`${styles.statusBadge} ${
                              styles[item.status
                                .toLowerCase()
                                .replace("-", "")]
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>

                        <td>
                          <div className={styles.assigned}>
                            <div className={styles.smallAvatar}>
                              {item.assigned
                                .split(" ")
                                .map((x) => x[0])
                                .join("")
                                .slice(0, 2)}
                            </div>

                            <span>{item.assigned}</span>
                          </div>
                        </td>

                        <td>
                          <button className={styles.actionButton}>
                            ⋯
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* TABLE FOOTER */}

            <div className={styles.tableFooter}>
              <span>
                Showing{" "}
                {filteredData.length === 0
                  ? 0
                  : (page - 1) * rowsPerPage + 1}{" "}
                to{" "}
                {Math.min(
                  page * rowsPerPage,
                  filteredData.length
                )}{" "}
                of {filteredData.length} follow-ups
              </span>

              <div className={styles.pagination}>
                <button
                  disabled={page === 1}
                  onClick={() =>
                    setPage((prev) => Math.max(1, prev - 1))
                  }
                >
                  ‹
                </button>

                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                )
                  .slice(0, 4)
                  .map((number) => (
                    <button
                      key={number}
                      className={
                        number === page
                          ? styles.currentPage
                          : ""
                      }
                      onClick={() => setPage(number)}
                    >
                      {number}
                    </button>
                  ))}

                <button
                  disabled={page === totalPages}
                  onClick={() =>
                    setPage((prev) =>
                      Math.min(totalPages, prev + 1)
                    )
                  }
                >
                  ›
                </button>
              </div>
            </div>
          </div>

          {/* ================= RIGHT SIDEBAR ================= */}

          <aside className={styles.rightPanel}>
            {/* CALENDAR */}

            <div className={styles.panelCard}>
              <div className={styles.panelHeader}>
                <div>
                  <span className={styles.panelIcon}>▣</span>
                  <h3>Calendar</h3>
                </div>

                <button>View Calendar →</button>
              </div>

              <div className={styles.calendarTop}>
                <button>‹</button>
                <strong>September 2025</strong>
                <button>›</button>
              </div>

              <div className={styles.weekDays}>
                <span>Sun</span>
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
              </div>

              <div className={styles.calendarGrid}>
                {[
                  "",
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7",
                  "8",
                  "9",
                  "10",
                  "11",
                  "12",
                  "13",
                  "14",
                  "15",
                  "16",
                  "17",
                  "18",
                  "19",
                  "20",
                  "21",
                  "22",
                  "23",
                  "24",
                  "25",
                  "26",
                  "27",
                  "28",
                  "29",
                  "30",
                ].map((day, index) => (
                  <span
                    key={index}
                    className={
                      day === "10"
                        ? styles.selectedDay
                        : ""
                    }
                  >
                    {day}
                  </span>
                ))}
              </div>

              <div className={styles.upcomingTitle}>
                <strong>Upcoming Follow-ups</strong>
                <button>View All →</button>
              </div>

              <div className={styles.upcomingList}>
                <div>
                  <i className={styles.blueDot} />
                  <span>10 Sep 10:00 AM - Amit Sharma (Call)</span>
                </div>

                <div>
                  <i className={styles.purpleDot} />
                  <span>10 Sep 11:30 AM - Pooja Khandelwal (Email)</span>
                </div>

                <div>
                  <i className={styles.blueDot} />
                  <span>10 Sep 02:00 PM - Rahul Saini (Call)</span>
                </div>

                <div>
                  <i className={styles.greenDot} />
                  <span>10 Sep 04:00 PM - Anjali Verma (Meeting)</span>
                </div>

                <div>
                  <i className={styles.blueDot} />
                  <span>11 Sep 10:30 AM - Vikash Gupta (Call)</span>
                </div>
              </div>
            </div>

            {/* QUICK ACTIONS */}

            <div className={styles.panelCard}>
              <div className={styles.panelTitle}>
                <span className={styles.panelIcon}>ϟ</span>
                <h3>Quick Actions</h3>
              </div>

              <div className={styles.quickActions}>
                <button onClick={() => setShowModal(true)}>
                  <span>▣</span>
                  Add Follow-up
                </button>

                <button>
                  <span>☎</span>
                  Call Log
                </button>

                <button>
                  <span>✉</span>
                  Send Email
                </button>

                <button>
                  <span>▣</span>
                  View Calendar
                </button>
              </div>
            </div>

            {/* BOTTOM CARD */}

            <div className={styles.consistentCard}>
              <div className={styles.consistentIcon}>◎</div>

              <div>
                <strong>
                  Consistent follow-ups
                  <br />
                  bring more deals!
                </strong>

                <span>
                  Stay connected. Stay ahead.
                </span>
              </div>

              <button>→</button>
            </div>
          </aside>
        </section>
      </main>

      {/* ================= ADD MODAL ================= */}

      {showModal && (
        <div
          className={styles.modalOverlay}
          onClick={() => setShowModal(false)}
        >
          <div
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <div>
                <h2>Add Follow-up</h2>
                <p>Create a new follow-up activity.</p>
              </div>

              <button onClick={() => setShowModal(false)}>
                ×
              </button>
            </div>

            <div className={styles.modalBody}>
              <label>Name</label>
              <input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Enter client name"
              />

              <label>Company</label>
              <input
                value={newCompany}
                onChange={(e) =>
                  setNewCompany(e.target.value)
                }
                placeholder="Enter company"
              />

              <div className={styles.formRow}>
                <div>
                  <label>Type</label>

                  <select
                    value={newType}
                    onChange={(e) =>
                      setNewType(
                        e.target.value as FollowUp["type"]
                      )
                    }
                  >
                    <option>Call</option>
                    <option>Email</option>
                    <option>Meeting</option>
                    <option>Follow-up</option>
                  </select>
                </div>

                <div>
                  <label>Date</label>

                  <input
                    type="date"
                    value={newDate}
                    onChange={(e) =>
                      setNewDate(e.target.value)
                    }
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div>
                  <label>Time</label>

                  <input
                    type="time"
                    value={newTime}
                    onChange={(e) =>
                      setNewTime(e.target.value)
                    }
                  />
                </div>

                <div>
                  <label>Purpose</label>

                  <input
                    value={newPurpose}
                    onChange={(e) =>
                      setNewPurpose(e.target.value)
                    }
                    placeholder="Follow-up purpose"
                  />
                </div>
              </div>
            </div>

            <div className={styles.modalFooter}>
              <button
                className={styles.cancelButton}
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              <button
                className={styles.saveButton}
                onClick={addFollowUp}
              >
                Add Follow-up
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


/* ================= STAT CARD ================= */

function StatCard({
  icon,
  title,
  value,
  percent,
  color,
}: {
  icon: string;
  title: string;
  value: string;
  percent: string;
  color: "blue" | "red" | "green" | "purple";
}) {
  return (
    <div className={styles.statCard}>
      <div
        className={`${styles.statIcon} ${styles[color]}`}
      >
        {icon}
      </div>

      <div className={styles.statInfo}>
        <span>{title}</span>

        <div className={styles.statValue}>
          <strong>{value}</strong>
          <small>{percent}</small>
        </div>

        <p>vs. last week</p>
      </div>
    </div>
  );
}