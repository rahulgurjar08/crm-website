"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Navbar from "../components/Nevbar/page";
import Sidebar from "../components/Sidebar/Sidebar";
import {
  getStoredClients,
  saveClients,
  type ClientStatus,
} from "./data/clients";
import styles from "./Clients.module.css";

const statusOptions: Array<"All Status" | ClientStatus> = [
  "All Status",
  "Active",
  "Pending",
  "Follow Up",
  "Inactive",
];

const industryOptions = [
  "All Industry",
  "Healthcare",
  "Education",
  "IT & Software",
  "Other",
];

export default function ClientsPage() {
  const [clients, setClients] = useState(getStoredClients);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Status");
  const [industry, setIndustry] = useState("All Industry");
  const [page, setPage] = useState(1);

  const [showAdd, setShowAdd] = useState(false);

  const [newClient, setNewClient] = useState({
    name: "",
    role: "Owner",
    company: "",
    phone: "",
    email: "",
    industry: "Healthcare",
  });

  const perPage = 10;

  const filteredClients = useMemo(() => {
    const value = search.toLowerCase().trim();

    return clients.filter((client) => {
      const matchesSearch =
        !value ||
        client.name.toLowerCase().includes(value) ||
        client.company.toLowerCase().includes(value) ||
        client.phone.toLowerCase().includes(value) ||
        client.email.toLowerCase().includes(value);

      const matchesStatus =
        status === "All Status" || client.status === status;

      const matchesIndustry =
        industry === "All Industry" ||
        client.industry === industry;

      return matchesSearch && matchesStatus && matchesIndustry;
    });
  }, [clients, search, status, industry]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredClients.length / perPage)
  );

  const safePage = Math.min(page, totalPages);

  const visibleClients = filteredClients.slice(
    (safePage - 1) * perPage,
    safePage * perPage
  );

  const activeClients = clients.filter(
    (client) => client.status === "Active"
  ).length;

  const pendingClients = clients.filter(
    (client) => client.status === "Pending"
  ).length;

  function clearFilters() {
    setSearch("");
    setStatus("All Status");
    setIndustry("All Industry");
    setPage(1);
  }

  function addClient() {
    if (
      !newClient.name.trim() ||
      !newClient.company.trim() ||
      !newClient.phone.trim() ||
      !newClient.email.trim()
    ) {
      alert("Please fill all required fields.");
      return;
    }

    const nextId =
      clients.length > 0
        ? Math.max(...clients.map((client) => client.id)) + 1
        : 1;

    const client = {
      id: nextId,
      name: newClient.name,
      role: newClient.role,
      company: newClient.company,
      phone: newClient.phone,
      email: newClient.email,
      industry: newClient.industry,
      status: "Active" as ClientStatus,
      lastContact: "Just now",

      clientId: `#CLI${String(nextId).padStart(3, "0")}`,
      source: "Manual",
      businessType: "Business",
      companySize: "1 - 10 Employees",
      address: "—",
      gstNumber: "—",
      panNumber: "—",

      website: "—",
      description: "New client added from CRM.",

      contactPerson: {
        name: newClient.name,
        role: newClient.role,
        phone: newClient.phone,
        email: newClient.email,
        avatar: newClient.name
          .split(" ")
          .map((word) => word[0])
          .join("")
          .slice(0, 2)
          .toUpperCase(),
      },

      projects: [],
      timeline: [],
      activities: [],
      notes: [],
      tags: [newClient.industry],
    };

    const updated = [client, ...clients];

    setClients(updated);
    saveClients(updated);

    setNewClient({
      name: "",
      role: "Owner",
      company: "",
      phone: "",
      email: "",
      industry: "Healthcare",
    });

    setShowAdd(false);
    setPage(1);
  }

  return (
    <div className={styles.app}>
      <Navbar />

      <div className={styles.layout}>
        <Sidebar />

        <main className={styles.main}>
          <div className={styles.pageHeader}>
            <div>
              <div className={styles.titleRow}>
                <span className={styles.titleIcon}>♧</span>
                <h1>Clients</h1>
              </div>

              <p>
                Manage your clients and build long-term relationships.
              </p>
            </div>

            <button
              className={styles.primaryButton}
              onClick={() => setShowAdd(true)}
            >
              <span>＋</span>
              Add New Client
            </button>
          </div>

          <section className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={`${styles.statIcon} ${styles.blue}`}>
                ♧
              </div>
              <div>
                <span>Total Clients</span>
                <strong>{clients.length}</strong>
                <small>↑ 20%</small>
                <em>vs. last month</em>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={`${styles.statIcon} ${styles.cyan}`}>
                ▣
              </div>
              <div>
                <span>Active Clients</span>
                <strong>{activeClients}</strong>
                <small>↑ 25%</small>
                <em>vs. last month</em>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={`${styles.statIcon} ${styles.purple}`}>
                ◷
              </div>
              <div>
                <span>Pending Projects</span>
                <strong>{pendingClients}</strong>
                <small>↑ 40%</small>
                <em>vs. last month</em>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={`${styles.statIcon} ${styles.green}`}>
                ₹
              </div>
              <div>
                <span>Total Revenue</span>
                <strong>₹ 1,20,000</strong>
                <small>↑ 60%</small>
                <em>vs. last month</em>
              </div>
            </div>
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
                    placeholder="Search by name, company, phone, email..."
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
                  value={industry}
                  onChange={(e) => {
                    setIndustry(e.target.value);
                    setPage(1);
                  }}
                >
                  {industryOptions.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>

                <button className={styles.dateButton}>
                  ▣ 10 Sep 2025 - 10 Sep 2025
                </button>
              </div>

              <div className={styles.tableScroll}>
                <table>
                  <thead>
                    <tr>
                      <th>
                        <input type="checkbox" />
                      </th>
                      <th>Client Name</th>
                      <th>Company</th>
                      <th>Phone</th>
                      <th>Email</th>
                      <th>Industry</th>
                      <th>Status</th>
                      <th>Last Contact</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {visibleClients.map((client) => (
                      <tr key={client.id}>
                        <td>
                          <input type="checkbox" />
                        </td>

                        <td>
                          <Link
                            href={`/clients/${client.id}`}
                            className={styles.clientLink}
                          >
                            <span className={styles.avatar}>
                              {client.name
                                .split(" ")
                                .map((x) => x[0])
                                .join("")
                                .slice(0, 2)}
                            </span>

                            <span className={styles.clientName}>
                              <strong>{client.name}</strong>
                              <small>{client.role}</small>
                            </span>
                          </Link>
                        </td>

                        <td>{client.company}</td>

                        <td>
                          <a href={`tel:${client.phone}`}>
                            ☎ {client.phone}
                          </a>
                        </td>

                        <td>
                          <a href={`mailto:${client.email}`}>
                            ✉ {client.email}
                          </a>
                        </td>

                        <td>
                          <span className={styles.industry}>
                            ♧ {client.industry}
                          </span>
                        </td>

                        <td>
                          <span
                            className={`${styles.status} ${
                              styles[
                                client.status
                                  .toLowerCase()
                                  .replace(" ", "") as keyof typeof styles
                              ]
                            }`}
                          >
                            {client.status}
                          </span>
                        </td>

                        <td>
                          <span className={styles.lastContact}>
                            {client.lastContact}
                          </span>
                        </td>

                        <td>
                          <Link
                            href={`/clients/${client.id}`}
                            className={styles.action}
                          >
                            •••
                          </Link>
                        </td>
                      </tr>
                    ))}

                    {visibleClients.length === 0 && (
                      <tr>
                        <td colSpan={9}>
                          <div className={styles.empty}>
                            No clients found.
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className={styles.tableFooter}>
                <span>
                  Showing{" "}
                  {filteredClients.length === 0
                    ? 0
                    : (safePage - 1) * perPage + 1}{" "}
                  to{" "}
                  {Math.min(
                    safePage * perPage,
                    filteredClients.length
                  )}{" "}
                  of {filteredClients.length} clients
                </span>

                <div className={styles.pagination}>
                  <button
                    disabled={safePage === 1}
                    onClick={() =>
                      setPage((p) => Math.max(1, p - 1))
                    }
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
                        number === safePage
                          ? styles.activePage
                          : ""
                      }
                      onClick={() => setPage(number)}
                    >
                      {number}
                    </button>
                  ))}

                  <button
                    disabled={safePage === totalPages}
                    onClick={() =>
                      setPage((p) =>
                        Math.min(totalPages, p + 1)
                      )
                    }
                  >
                    ›
                  </button>
                </div>
              </div>
            </section>

            <aside className={styles.rightColumn}>
              <div className={styles.sideCard}>
                <div className={styles.sideTitle}>
                  <h3>⚱ Client Filters</h3>
                  <button onClick={clearFilters}>Clear All ›</button>
                </div>

                <label>Search</label>
                <input
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  placeholder="Name, company, phone, email..."
                />

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

                <label>Industry</label>
                <select
                  value={industry}
                  onChange={(e) => {
                    setIndustry(e.target.value);
                    setPage(1);
                  }}
                >
                  {industryOptions.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>

                <button
                  className={styles.applyButton}
                  onClick={() => setPage(1)}
                >
                  ⌕ Apply Filters
                </button>
              </div>

              <div className={styles.sideCard}>
                <h3>▣ Status Overview</h3>

                <div className={styles.donut}>
                  <div>
                    <strong>{clients.length}</strong>
                    <span>Total Clients</span>
                  </div>
                </div>

                <div className={styles.legend}>
                  <p>
                    <i className={styles.dotGreen} />
                    Active
                    <b>{activeClients} (83%)</b>
                  </p>

                  <p>
                    <i className={styles.dotBlue} />
                    Pending
                    <b>{pendingClients} (17%)</b>
                  </p>

                  <p>
                    <i className={styles.dotYellow} />
                    Follow Up
                    <b>
                      {
                        clients.filter(
                          (x) => x.status === "Follow Up"
                        ).length
                      }{" "}
                      (8%)
                    </b>
                  </p>

                  <p>
                    <i className={styles.dotDark} />
                    Inactive
                    <b>
                      {
                        clients.filter(
                          (x) => x.status === "Inactive"
                        ).length
                      }{" "}
                      (0%)
                    </b>
                  </p>
                </div>
              </div>

              <div className={styles.sideCard}>
                <h3>♧ Industry Distribution</h3>

                <div className={styles.industryList}>
                  <p>
                    <span>♧ Healthcare</span>
                    <b>10 (83%)</b>
                  </p>
                  <p>
                    <span>♧ Education</span>
                    <b>1 (8%)</b>
                  </p>
                  <p>
                    <span>⌘ IT & Software</span>
                    <b>1 (8%)</b>
                  </p>
                  <p>
                    <span>••• Other</span>
                    <b>0 (0%)</b>
                  </p>
                </div>
              </div>

              <div className={styles.happyCard}>
                <div>➤</div>
                <h3>Happy Clients</h3>
                <strong>Build a Stronger Tomorrow</strong>
                <p>Let's grow together!</p>
              </div>
            </aside>
          </div>
        </main>
      </div>

      {showAdd && (
        <div
          className={styles.modalOverlay}
          onMouseDown={() => setShowAdd(false)}
        >
          <div
            className={styles.modal}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <div>
                <h2>Add New Client</h2>
                <p>Create a new client record.</p>
              </div>

              <button onClick={() => setShowAdd(false)}>×</button>
            </div>

            <div className={styles.formGrid}>
              <div>
                <label>Client Name *</label>
                <input
                  value={newClient.name}
                  onChange={(e) =>
                    setNewClient({
                      ...newClient,
                      name: e.target.value,
                    })
                  }
                  placeholder="Enter client name"
                />
              </div>

              <div>
                <label>Role</label>
                <select
                  value={newClient.role}
                  onChange={(e) =>
                    setNewClient({
                      ...newClient,
                      role: e.target.value,
                    })
                  }
                >
                  <option>Owner</option>
                  <option>Manager</option>
                  <option>Founder</option>
                  <option>CEO</option>
                  <option>Director</option>
                </select>
              </div>

              <div>
                <label>Company *</label>
                <input
                  value={newClient.company}
                  onChange={(e) =>
                    setNewClient({
                      ...newClient,
                      company: e.target.value,
                    })
                  }
                  placeholder="Enter company"
                />
              </div>

              <div>
                <label>Phone *</label>
                <input
                  value={newClient.phone}
                  onChange={(e) =>
                    setNewClient({
                      ...newClient,
                      phone: e.target.value,
                    })
                  }
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>

              <div>
                <label>Email *</label>
                <input
                  type="email"
                  value={newClient.email}
                  onChange={(e) =>
                    setNewClient({
                      ...newClient,
                      email: e.target.value,
                    })
                  }
                  placeholder="client@example.com"
                />
              </div>

              <div>
                <label>Industry</label>
                <select
                  value={newClient.industry}
                  onChange={(e) =>
                    setNewClient({
                      ...newClient,
                      industry: e.target.value,
                    })
                  }
                >
                  <option>Healthcare</option>
                  <option>Education</option>
                  <option>IT & Software</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div className={styles.modalActions}>
              <button
                className={styles.cancelButton}
                onClick={() => setShowAdd(false)}
              >
                Cancel
              </button>

              <button
                className={styles.primaryButton}
                onClick={addClient}
              >
                Add Client
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}