"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Navbar from "../components/Nevbar/page";
import Sidebar from "../components/Sidebar/Sidebar";
import styles from "./LeadProfile.module.css";
import {
  getStoredLeads,
  initialLeads,
  saveLeads,
  LeadStatus,
} from "./leadData";

const statusOptions = [
  "All Status",
  "New",
  "Contacted",
  "Interested",
  "Meeting",
  "Proposal Sent",
  "Won",
  "Lost",
];

const sourceOptions = [
  "All Sources",
  "Website",
  "Referral",
  "Social Media",
  "Google Ads",
];

const assignedOptions = [
  "All BDE",
  "Rohit Singh",
  "Priya Verma",
  "Amit Kumar",
  "Sneha Patel",
];

export default function LeadsPage() {
  const [leads, setLeads] = useState(initialLeads);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Status");
  const [source, setSource] = useState("All Sources");
  const [assigned, setAssigned] = useState("All BDE");
  const [page, setPage] = useState(1);
  const [showAdd, setShowAdd] = useState(false);
  const [menuId, setMenuId] = useState<number | null>(null);

  const perPage = 10;

  useEffect(() => {
    const stored = getStoredLeads();
    if (stored && stored.length > 0) {
      setLeads(stored);
    }
  }, []);

  // Close action menu when clicking outside
  useEffect(() => {
    function handleClickOutside() {
      setMenuId(null);
    }
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  const filteredLeads = useMemo(() => {
    const query = search.toLowerCase().trim();

    return leads.filter((lead) => {
      const matchesSearch =
        !query ||
        lead.name.toLowerCase().includes(query) ||
        lead.company.toLowerCase().includes(query) ||
        lead.phone.toLowerCase().includes(query) ||
        lead.email.toLowerCase().includes(query);

      const matchesStatus =
        status === "All Status" || lead.status === status;

      const matchesSource =
        source === "All Sources" || lead.source === source;

      const matchesAssigned =
        assigned === "All BDE" || lead.assignedTo === assigned;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesSource &&
        matchesAssigned
      );
    });
  }, [leads, search, status, source, assigned]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredLeads.length / perPage)
  );

  const currentLeads = filteredLeads.slice(
    (page - 1) * perPage,
    page * perPage
  );

  const counts = {
    total: leads.length,
    contacted: leads.filter((x) => x.status === "Contacted").length,
    interested: leads.filter((x) => x.status === "Interested").length,
    meeting: leads.filter((x) => x.status === "Meeting").length,
    won: leads.filter((x) => x.status === "Won").length,
    lost: leads.filter((x) => x.status === "Lost").length,
  };

  function clearFilters() {
    setSearch("");
    setStatus("All Status");
    setSource("All Sources");
    setAssigned("All BDE");
    setPage(1);
  }

  function deleteLead(id: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this lead?"
    );

    if (!confirmed) return;

    const updated = leads.filter((lead) => lead.id !== id);

    setLeads(updated);
    saveLeads(updated);
    setMenuId(null);
  }

  function exportLeads() {
    const headers = [
      "Name",
      "Company",
      "Phone",
      "Email",
      "Source",
      "Status",
      "Assigned To",
    ];

    const rows = leads.map((lead) => [
      lead.name,
      lead.company,
      lead.phone,
      lead.email,
      lead.source,
      lead.status,
      lead.assignedTo,
    ]);

    const csv = [
      headers.join(","),
      ...rows.map((row) =>
        row.map((item) => `"${item}"`).join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "prism-leads.csv";
    link.click();

    URL.revokeObjectURL(url);
  }

  return (
    <div className={styles.app}>
      <Navbar />

      <div className={styles.layout}>
        <Sidebar />

        <main className={styles.main}>
          <div className={styles.pageHeader}>
            <div>
              <div className={styles.breadcrumb}>
                <span>⌂</span>
                <span>›</span>
                <span>Leads</span>
              </div>

              <h1>👥 Leads</h1>

              <p>
                Manage and track your potential clients. Convert more
                leads into clients.
              </p>
            </div>

            <button
              className={styles.addButton}
              onClick={() => setShowAdd(true)}
            >
              <span>＋</span>
              Add New Lead
            </button>
          </div>

          <section className={styles.statsGrid}>
            <Stat
              icon="👥"
              title="Total Leads"
              value={counts.total}
              growth="+12%"
              blue
            />

            <Stat
              icon="📞"
              title="Contacted"
              value={counts.contacted}
              growth="+8%"
              blue
            />

            <Stat
              icon="💬"
              title="Interested"
              value={counts.interested}
              growth="+20%"
              green
            />

            <Stat
              icon="▣"
              title="Meeting"
              value={counts.meeting}
              growth="+50%"
              purple
            />

            <Stat
              icon="✓"
              title="Won"
              value={counts.won}
              growth="+67%"
              green
            />

            <Stat
              icon="⊗"
              title="Lost"
              value={counts.lost}
              growth="-33%"
              red
            />
          </section>

          <div className={styles.contentGrid}>
            <section className={styles.tableCard}>
              <div className={styles.toolbar}>
                <div className={styles.searchBox}>
                  <span>⌕</span>

                  <input
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setPage(1);
                    }}
                    placeholder="Search by name, company, phone or email..."
                  />
                </div>

                <select
                  value={status}
                  onChange={(e) => {
                    setStatus(e.target.value);
                    setPage(1);
                  }}
                >
                  {statusOptions.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>

                <select
                  value={source}
                  onChange={(e) => {
                    setSource(e.target.value);
                    setPage(1);
                  }}
                >
                  {sourceOptions.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>

                <select
                  value={assigned}
                  onChange={(e) => {
                    setAssigned(e.target.value);
                    setPage(1);
                  }}
                >
                  {assignedOptions.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>

                <div className={styles.dateFilter}>
                  📅 10 Sep 2025 - 10 Sep 2025
                </div>
              </div>

              <div className={styles.tableWrapper}>
                <table>
                  <thead>
                    <tr>
                      <th>☐</th>
                      <th>Name ↕</th>
                      <th>Company</th>
                      <th>Phone</th>
                      <th>Email</th>
                      <th>Source</th>
                      <th>Status</th>
                      <th>Assigned To</th>
                      <th>Next Follow-up</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {currentLeads.map((lead) => (
                      <tr key={lead.id}>
                        <td>
                          <input type="checkbox" />
                        </td>

                        <td>
                          <Link
                            href={`/leads/${lead.id}`}
                            className={styles.nameCell}
                          >
                            <span className={styles.avatar}>
                              {lead.avatar}
                            </span>

                            <span>
                              <strong>{lead.name}</strong>
                              <small>{lead.role}</small>
                            </span>
                          </Link>
                        </td>

                        <td>{lead.company}</td>

                        <td>
                          <span className={styles.contactText}>
                            ☎ {lead.phone}
                          </span>
                        </td>

                        <td>
                          <span className={styles.contactText}>
                            ✉ {lead.email}
                          </span>
                        </td>

                        <td>
                          <span
                            className={`${styles.badge} ${
                              styles[
                                lead.source
                                  .toLowerCase()
                                  .replace(" ", "")
                              ] || ""
                            }`}
                          >
                            {lead.source}
                          </span>
                        </td>

                        <td>
                          <span
                            className={`${styles.statusBadge} ${
                              styles[
                                lead.status
                                  .toLowerCase()
                                  .replace(" ", "")
                              ]
                            }`}
                          >
                            {lead.status}
                          </span>
                        </td>

                        <td>
                          <div className={styles.assigned}>
                            <span className={styles.smallAvatar}>
                              {lead.assignedTo
                                .split(" ")
                                .map((x) => x[0])
                                .join("")}
                            </span>

                            {lead.assignedTo}
                          </div>
                        </td>

                        <td>
                          <span className={styles.followup}>
                            {lead.nextFollowUp}
                          </span>
                        </td>

                        <td className={styles.actionCell}>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setMenuId(
                                menuId === lead.id ? null : lead.id
                              );
                            }}
                            className={styles.moreButton}
                          >
                            ⋯
                          </button>

                          {menuId === lead.id && (
                            <div className={styles.actionMenu}>
                              <Link href={`/leads/${lead.id}`}>
                                View Profile
                              </Link>

                              <Link
                                href={`/leads/${lead.id}?edit=true`}
                              >
                                Edit Lead
                              </Link>

                              <button
                                onClick={() => deleteLead(lead.id)}
                              >
                                Delete Lead
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}

                    {currentLeads.length === 0 && (
                      <tr>
                        <td
                          colSpan={10}
                          className={styles.empty}
                        >
                          No leads found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className={styles.tableFooter}>
                <span>
                  Showing{" "}
                  {filteredLeads.length === 0
                    ? 0
                    : (page - 1) * perPage + 1}{" "}
                  to{" "}
                  {Math.min(
                    page * perPage,
                    filteredLeads.length
                  )}{" "}
                  of {filteredLeads.length} leads
                </span>

                <div className={styles.pagination}>
                  <button
                    disabled={page === 1}
                    onClick={() => setPage((p) => p - 1)}
                  >
                    ‹
                  </button>

                  {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1
                  ).map((number) => (
                    <button
                      key={number}
                      className={
                        page === number
                          ? styles.activePage
                          : ""
                      }
                      onClick={() => setPage(number)}
                    >
                      {number}
                    </button>
                  ))}

                  <button
                    disabled={page === totalPages}
                    onClick={() => setPage((p) => p + 1)}
                  >
                    ›
                  </button>
                </div>
              </div>
            </section>

            <aside className={styles.rightColumn}>
              <div className={styles.sideCard}>
                <div className={styles.cardTitle}>
                  <h3>⚱ Lead Filters</h3>

                  <button onClick={clearFilters}>
                    Clear All ›
                  </button>
                </div>

                <label>Search</label>

                <div className={styles.sideInput}>
                  🔍

                  <input
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setPage(1);
                    }}
                    placeholder="Name, company, phone, email..."
                  />
                </div>

                <label>Status</label>

                <select
                  value={status}
                  onChange={(e) => {
                    setStatus(e.target.value);
                    setPage(1);
                  }}
                >
                  {statusOptions.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>

                <label>Source</label>

                <select
                  value={source}
                  onChange={(e) => {
                    setSource(e.target.value);
                    setPage(1);
                  }}
                >
                  {sourceOptions.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>

                <label>Assigned To</label>

                <select
                  value={assigned}
                  onChange={(e) => {
                    setAssigned(e.target.value);
                    setPage(1);
                  }}
                >
                  {assignedOptions.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>

                <button className={styles.applyButton}>
                  ⚱ Apply Filters
                </button>
              </div>

              <div className={styles.sideCard}>
                <div className={styles.cardTitle}>
                  <h3>⚡ Quick Actions</h3>
                </div>

                <button
                  className={styles.quickButton}
                  onClick={() => setShowAdd(true)}
                >
                  ＋ Add New Lead
                </button>

                <button className={styles.quickButton}>
                  ⇩ Import Leads
                </button>

                <button
                  className={styles.quickButton}
                  onClick={exportLeads}
                >
                  ⇩ Export Leads
                </button>
              </div>

              <div className={styles.sideCard}>
                <div className={styles.cardTitle}>
                  <h3>▥ Lead Sources</h3>
                </div>

                <div className={styles.sourceChart}>
                  <div className={styles.donut}>
                    <strong>{counts.total}</strong>
                    <small>Total Leads</small>
                  </div>

                  <div className={styles.sourceList}>
                    {sourceOptions
                      .slice(1)
                      .map((item) => {
                        const count = leads.filter(
                          (lead) => lead.source === item
                        ).length;

                        return (
                          <div key={item}>
                            <span>● {item}</span>
                            <b>{count}</b>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>

      {showAdd && (
        <AddLeadModal
          onClose={() => setShowAdd(false)}
          onAdd={(newLead) => {
            const updated = [
              {
                ...newLead,
                id:
                  leads.length > 0
                    ? Math.max(...leads.map((x) => x.id)) + 1
                    : 1,
              },
              ...leads,
            ];

            setLeads(updated);
            saveLeads(updated);
            setShowAdd(false);
          }}
        />
      )}
    </div>
  );
}

function Stat({
  icon,
  title,
  value,
  growth,
  blue,
  green,
  purple,
  red,
}: {
  icon: string;
  title: string;
  value: number;
  growth: string;
  blue?: boolean;
  green?: boolean;
  purple?: boolean;
  red?: boolean;
}) {
  return (
    <div className={styles.statCard}>
      <div
        className={`${styles.statIcon} ${
          blue
            ? styles.blue
            : green
            ? styles.green
            : purple
            ? styles.purple
            : red
            ? styles.red
            : ""
        }`}
      >
        {icon}
      </div>

      <div>
        <span>{title}</span>

        <div className={styles.statValue}>
          <strong>{value}</strong>
          <em>{growth}</em>
        </div>

        <small>vs. last week</small>
      </div>
    </div>
  );
}

function AddLeadModal({
  onClose,
  onAdd,
}: {
  onClose: () => void;
  onAdd: (lead: any) => void;
}) {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [source, setSource] = useState("Website");
  const [assignedTo, setAssignedTo] = useState("Rohit Singh");

  function submit(e: React.FormEvent) {
    e.preventDefault();

    if (!name || !company || !phone || !email) {
      alert("Please fill all required fields.");
      return;
    }

    onAdd({
      name,
      role: "Owner",
      company,
      phone,
      email,
      source,
      status: "New" as LeadStatus,
      assignedTo,
      nextFollowUp: "-",

      avatar: name
        .split(" ")
        .map((x) => x[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(),

      leadType: "Website Development",
      priority: "Medium",
      createdAt: new Date().toLocaleString(),
      lastContact: "-",

      website: "",
      businessType: "",
      companySize: "",

      serviceRequired: "Website Development",
      featuresNeeded: "",
      budgetRange: "",

      projectTimeline: "",

      additionalNote: "",

      communications: [],
      timeline: [],
      notes: [],
    });
  }

  return (
    <div className={styles.modalOverlay}>
      <form
        className={styles.modal}
        onSubmit={submit}
      >
        <div className={styles.modalHeader}>
          <div>
            <h2>Add New Lead</h2>

            <p>
              Create a new lead in your CRM.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div className={styles.formGrid}>
          <label>
            Lead Name *

            <input
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              placeholder="Enter name"
            />
          </label>

          <label>
            Company *

            <input
              value={company}
              onChange={(e) =>
                setCompany(e.target.value)
              }
              placeholder="Enter company"
            />
          </label>

          <label>
            Phone *

            <input
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
              placeholder="+91..."
            />
          </label>

          <label>
            Email *

            <input
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="email@example.com"
            />
          </label>

          <label>
            Source

            <select
              value={source}
              onChange={(e) =>
                setSource(e.target.value)
              }
            >
              {sourceOptions
                .slice(1)
                .map((item) => (
                  <option key={item}>
                    {item}
                  </option>
                ))}
            </select>
          </label>

          <label>
            Assigned To

            <select
              value={assignedTo}
              onChange={(e) =>
                setAssignedTo(e.target.value)
              }
            >
              {assignedOptions
                .slice(1)
                .map((item) => (
                  <option key={item}>
                    {item}
                  </option>
                ))}
            </select>
          </label>
        </div>

        <div className={styles.modalActions}>
          <button
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>

          <button type="submit">
            Create Lead
          </button>
        </div>
      </form>
    </div>
  );
}