"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import Navbar from "../components/Nevbar/page";
import Sidebar from "../components/Sidebar/Sidebar";

import styles from "./Projects.module.css";

type ProjectStatus =
  | "In Progress"
  | "Completed"
  | "On Hold"
  | "Overdue";

type Project = {
  id: number;
  name: string;
  client: string;
  progress: number;
  status: ProjectStatus;
  deadline: string;
  deadlineDate: string;
  team: string[];
};

const initialProjects: Project[] = [
  {
    id: 1,
    name: "Dental Clinic Website",
    client: "Smile Dental Clinic",
    progress: 75,
    status: "In Progress",
    deadline: "15 Sep 2025",
    deadlineDate: "2025-09-15",
    team: ["VT", "AN"],
  },
  {
    id: 2,
    name: "School ERP System",
    client: "Bright Future School",
    progress: 60,
    status: "In Progress",
    deadline: "20 Sep 2025",
    deadlineDate: "2025-09-20",
    team: ["VT", "PK"],
  },
  {
    id: 3,
    name: "E-commerce App",
    client: "ABC Mart",
    progress: 30,
    status: "On Hold",
    deadline: "25 Sep 2025",
    deadlineDate: "2025-09-25",
    team: ["AN", "AK"],
  },
  {
    id: 4,
    name: "Website Redesign",
    client: "Nature's Care",
    progress: 90,
    status: "Completed",
    deadline: "12 Sep 2025",
    deadlineDate: "2025-09-12",
    team: ["SP", "VT"],
  },
  {
    id: 5,
    name: "CRM Solution",
    client: "Royal Traders",
    progress: 70,
    status: "In Progress",
    deadline: "18 Sep 2025",
    deadlineDate: "2025-09-18",
    team: ["PK", "AN"],
  },
  {
    id: 6,
    name: "Mobile App Development",
    client: "FitLife Fitness",
    progress: 40,
    status: "On Hold",
    deadline: "30 Sep 2025",
    deadlineDate: "2025-09-30",
    team: ["AK", "SP"],
  },
  {
    id: 7,
    name: "Branding & Logo",
    client: "Urban Cafe",
    progress: 100,
    status: "Completed",
    deadline: "08 Sep 2025",
    deadlineDate: "2025-09-08",
    team: ["AN", "VT"],
  },
  {
    id: 8,
    name: "Odoo ERP Implementation",
    client: "TechWave Solutions",
    progress: 55,
    status: "In Progress",
    deadline: "22 Sep 2025",
    deadlineDate: "2025-09-22",
    team: ["PK", "AK"],
  },
  {
    id: 9,
    name: "AI Chatbot",
    client: "HealthPlus",
    progress: 20,
    status: "Overdue",
    deadline: "10 Sep 2025",
    deadlineDate: "2025-09-10",
    team: ["SP", "VT"],
  },
  {
    id: 10,
    name: "Digital Marketing",
    client: "Green Leaf Organics",
    progress: 80,
    status: "In Progress",
    deadline: "17 Sep 2025",
    deadlineDate: "2025-09-17",
    team: ["AN", "PK"],
  },
  {
    id: 11,
    name: "Automation Solution",
    client: "NextGen Corp",
    progress: 45,
    status: "On Hold",
    deadline: "28 Sep 2025",
    deadlineDate: "2025-09-28",
    team: ["AK", "VT"],
  },
  {
    id: 12,
    name: "Blockchain Project",
    client: "CryptoHub",
    progress: 95,
    status: "Completed",
    deadline: "05 Sep 2025",
    deadlineDate: "2025-09-05",
    team: ["SP", "AN"],
  },
];

const statusOptions = [
  "All Status",
  "In Progress",
  "Completed",
  "On Hold",
  "Overdue",
];

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);

  const [search, setSearch] = useState("");
  const [clientFilter, setClientFilter] = useState("All Clients");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [deadlineFilter, setDeadlineFilter] = useState("This Month");

  const [showNewProject, setShowNewProject] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [newClient, setNewClient] = useState("");

  const [page, setPage] = useState(1);

  const clients = useMemo(() => {
    return [
      "All Clients",
      ...Array.from(new Set(projects.map((project) => project.client))),
    ];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        !searchText ||
        project.name.toLowerCase().includes(searchText) ||
        project.client.toLowerCase().includes(searchText) ||
        String(project.id).includes(searchText);

      const matchesClient =
        clientFilter === "All Clients" ||
        project.client === clientFilter;

      const matchesStatus =
        statusFilter === "All Status" ||
        project.status === statusFilter;

      let matchesDeadline = true;

      if (deadlineFilter === "Upcoming") {
        matchesDeadline = project.status !== "Completed";
      }

      if (deadlineFilter === "Completed") {
        matchesDeadline = project.status === "Completed";
      }

      if (deadlineFilter === "Overdue") {
        matchesDeadline = project.status === "Overdue";
      }

      return (
        matchesSearch &&
        matchesClient &&
        matchesStatus &&
        matchesDeadline
      );
    });
  }, [
    projects,
    search,
    clientFilter,
    statusFilter,
    deadlineFilter,
  ]);

  const totalProjects = projects.length;

  const inProgress = projects.filter(
    (project) => project.status === "In Progress"
  ).length;

  const completed = projects.filter(
    (project) => project.status === "Completed"
  ).length;

  const onHold = projects.filter(
    (project) => project.status === "On Hold"
  ).length;

  const overdue = projects.filter(
    (project) => project.status === "Overdue"
  ).length;

  function clearFilters() {
    setSearch("");
    setClientFilter("All Clients");
    setStatusFilter("All Status");
    setDeadlineFilter("This Month");
    setPage(1);
  }

  function addProject() {
    if (!newProjectName.trim()) {
      alert("Please enter project name.");
      return;
    }

    if (!newClient.trim()) {
      alert("Please enter client name.");
      return;
    }

    const newProject: Project = {
      id: projects.length
        ? Math.max(...projects.map((item) => item.id)) + 1
        : 1,
      name: newProjectName.trim(),
      client: newClient.trim(),
      progress: 0,
      status: "In Progress",
      deadline: "30 Sep 2025",
      deadlineDate: "2025-09-30",
      team: ["VT"],
    };

    setProjects((current) => [...current, newProject]);

    setNewProjectName("");
    setNewClient("");
    setShowNewProject(false);
  }

  function deleteProject(id: number) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmDelete) return;

    setProjects((current) =>
      current.filter((project) => project.id !== id)
    );
  }

  return (
    <div className={styles.app}>
      <Navbar />

      <div className={styles.layout}>
        <Sidebar />

        <main className={styles.main}>
          {/* Breadcrumb */}
          <div className={styles.breadcrumb}>
            <Link href="/dashboard">⌂ Dashboard</Link>
            <span>›</span>
            <strong>Projects</strong>
          </div>

          {/* Page Header */}
          <section className={styles.pageHeader}>
            <div className={styles.titleArea}>
              <div className={styles.titleIcon}>▣</div>

              <div>
                <h1>Projects</h1>
                <p>
                  Manage your ongoing and completed projects. Track
                  progress, deadlines and team activities.
                </p>
              </div>
            </div>

            <button
              className={styles.newProjectButton}
              onClick={() => setShowNewProject(true)}
            >
              <span>＋</span>
              New Project
            </button>
          </section>

          {/* Stats */}
          <section className={styles.statsGrid}>
            <StatCard
              icon="▣"
              title="Total Projects"
              value={String(totalProjects)}
              change="20%"
              type="blue"
            />

            <StatCard
              icon="◷"
              title="In Progress"
              value={String(inProgress)}
              change="25%"
              type="blue"
            />

            <StatCard
              icon="✓"
              title="Completed"
              value={String(completed)}
              change="33%"
              type="green"
            />

            <StatCard
              icon="Ⅱ"
              title="On Hold"
              value={String(onHold)}
              change="0%"
              type="red"
            />

            <StatCard
              icon="!"
              title="Overdue"
              value={String(overdue)}
              change="50%"
              type="red"
            />
          </section>

          {/* Content Grid */}
          <section className={styles.contentGrid}>
            {/* Main Project Area */}
            <div className={styles.projectPanel}>
              {/* Toolbar */}
              <div className={styles.toolbar}>
                <div className={styles.searchBox}>
                  <span>⌕</span>

                  <input
                    type="text"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setPage(1);
                    }}
                    placeholder="Search projects by name, client, or ID..."
                  />

                  {search && (
                    <button
                      className={styles.clearSearch}
                      onClick={() => setSearch("")}
                    >
                      ×
                    </button>
                  )}
                </div>

                <select
                  value={clientFilter}
                  onChange={(e) => {
                    setClientFilter(e.target.value);
                    setPage(1);
                  }}
                >
                  {clients.map((client) => (
                    <option key={client}>{client}</option>
                  ))}
                </select>

                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setPage(1);
                  }}
                >
                  {statusOptions.map((status) => (
                    <option key={status}>{status}</option>
                  ))}
                </select>

                <select
                  value={deadlineFilter}
                  onChange={(e) => {
                    setDeadlineFilter(e.target.value);
                    setPage(1);
                  }}
                >
                  <option>This Month</option>
                  <option>Upcoming</option>
                  <option>Completed</option>
                  <option>Overdue</option>
                </select>

                <div className={styles.viewButtons}>
                  <button className={styles.activeView}>▦</button>
                  <button>☷</button>
                </div>
              </div>

              {/* Table */}
              <div className={styles.tableWrapper}>
                <table className={styles.projectTable}>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Project Name</th>
                      <th>Client</th>
                      <th>Progress</th>
                      <th>Status</th>
                      <th>Deadline</th>
                      <th>Team</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredProjects.length > 0 ? (
                      filteredProjects.map((project, index) => (
                        <tr key={project.id}>
                          <td className={styles.numberCell}>
                            {index + 1}
                          </td>

                          <td>
                            <Link
                              href={`/projects/${project.id}`}
                              className={styles.projectName}
                            >
                              {project.name}
                            </Link>
                          </td>

                          <td>
                            <span className={styles.clientName}>
                              {project.client}
                            </span>
                          </td>

                          <td>
                            <div className={styles.progressCell}>
                              <div className={styles.progressBar}>
                                <span
                                  className={
                                    project.progress >= 75
                                      ? styles.progressHigh
                                      : project.progress >= 50
                                      ? styles.progressMedium
                                      : styles.progressLow
                                  }
                                  style={{
                                    width: `${project.progress}%`,
                                  }}
                                />
                              </div>

                              <strong>
                                {project.progress}%
                              </strong>
                            </div>
                          </td>

                          <td>
                            <StatusBadge
                              status={project.status}
                            />
                          </td>

                          <td>
                            <span className={styles.deadline}>
                              {project.deadline}
                            </span>
                          </td>

                          <td>
                            <div className={styles.teamAvatars}>
                              {project.team.map((member, i) => (
                                <span
                                  key={`${member}-${i}`}
                                  className={
                                    styles[`avatar${i % 4}`]
                                  }
                                  title={member}
                                >
                                  {member}
                                </span>
                              ))}
                            </div>
                          </td>

                          <td>
                            <div className={styles.actionArea}>
                              <Link
                                href={`/projects/${project.id}`}
                                className={styles.viewButton}
                              >
                                View
                              </Link>

                              <button
                                className={styles.actionButton}
                                onClick={() =>
                                  deleteProject(project.id)
                                }
                                title="Delete project"
                              >
                                ⋯
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={8}
                          className={styles.emptyTable}
                        >
                          <div className={styles.emptyState}>
                            <div>⌕</div>
                            <strong>No projects found</strong>
                            <p>
                              Try changing your search or filters.
                            </p>

                            <button onClick={clearFilters}>
                              Clear Filters
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Footer */}
              <div className={styles.tableFooter}>
                <span>
                  Showing{" "}
                  <strong>{filteredProjects.length}</strong>{" "}
                  of <strong>{projects.length}</strong> projects
                </span>

                <div className={styles.pagination}>
                  <button
                    disabled={page === 1}
                    onClick={() =>
                      setPage((current) =>
                        Math.max(1, current - 1)
                      )
                    }
                  >
                    ‹
                  </button>

                  <button className={styles.currentPage}>
                    {page}
                  </button>

                  <button
                    disabled
                    onClick={() =>
                      setPage((current) => current + 1)
                    }
                  >
                    ›
                  </button>
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <aside className={styles.rightSidebar}>
              {/* Filters */}
              <div className={styles.sideCard}>
                <div className={styles.sideCardHeader}>
                  <h3>⚱ Project Filters</h3>

                  <button onClick={clearFilters}>
                    Clear All
                  </button>
                </div>

                <label>Client</label>

                <select
                  value={clientFilter}
                  onChange={(e) => {
                    setClientFilter(e.target.value);
                    setPage(1);
                  }}
                >
                  {clients.map((client) => (
                    <option key={client}>{client}</option>
                  ))}
                </select>

                <label>Status</label>

                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setPage(1);
                  }}
                >
                  {statusOptions.map((status) => (
                    <option key={status}>{status}</option>
                  ))}
                </select>

                <label>Deadline</label>

                <select
                  value={deadlineFilter}
                  onChange={(e) => {
                    setDeadlineFilter(e.target.value);
                    setPage(1);
                  }}
                >
                  <option>This Month</option>
                  <option>Upcoming</option>
                  <option>Completed</option>
                  <option>Overdue</option>
                </select>

                <button
                  className={styles.applyButton}
                  onClick={() => setPage(1)}
                >
                  ⌕ Apply Filters
                </button>
              </div>

              {/* Project Status */}
              <div className={styles.sideCard}>
                <div className={styles.sideCardHeader}>
                  <h3>⚱ Project Status</h3>
                </div>

                <div className={styles.donutArea}>
                  <div className={styles.donut}>
                    <div className={styles.donutInner}>
                      <strong>{totalProjects}</strong>
                      <span>Total Projects</span>
                    </div>
                  </div>

                  <div className={styles.statusLegend}>
                    <Legend
                      label="In Progress"
                      count={inProgress}
                      total={totalProjects}
                      type="blue"
                    />

                    <Legend
                      label="Completed"
                      count={completed}
                      total={totalProjects}
                      type="green"
                    />

                    <Legend
                      label="On Hold"
                      count={onHold}
                      total={totalProjects}
                      type="yellow"
                    />

                    <Legend
                      label="Overdue"
                      count={overdue}
                      total={totalProjects}
                      type="red"
                    />
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className={styles.sideCard}>
                <div className={styles.sideCardHeader}>
                  <h3>▣ Recent Activity</h3>
                  <button>View All →</button>
                </div>

                <div className={styles.activityList}>
                  <Activity
                    icon="◈"
                    title="Project status updated"
                    text="Dental Clinic Website → In Progress"
                    time="2 hours ago"
                  />

                  <Activity
                    icon="▣"
                    title="New project created"
                    text="School ERP System"
                    time="5 hours ago"
                  />

                  <Activity
                    icon="✓"
                    title="Project completed"
                    text="Branding & Logo"
                    time="1 day ago"
                  />

                  <Activity
                    icon="!"
                    title="Deadline approaching"
                    text="CRM Solution"
                    time="1 day ago"
                  />

                  <Activity
                    icon="♙"
                    title="Client updated"
                    text="Royal Traders"
                    time="2 days ago"
                  />
                </div>
              </div>
            </aside>
          </section>
        </main>
      </div>

      {/* New Project Modal */}
      {showNewProject && (
        <div
          className={styles.modalOverlay}
          onMouseDown={() => setShowNewProject(false)}
        >
          <div
            className={styles.modal}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <div>
                <h2>Create New Project</h2>
                <p>Add a new project to your workspace.</p>
              </div>

              <button
                onClick={() => setShowNewProject(false)}
              >
                ×
              </button>
            </div>

            <div className={styles.modalBody}>
              <label>Project Name</label>

              <input
                value={newProjectName}
                onChange={(e) =>
                  setNewProjectName(e.target.value)
                }
                placeholder="Enter project name"
              />

              <label>Client Name</label>

              <input
                value={newClient}
                onChange={(e) =>
                  setNewClient(e.target.value)
                }
                placeholder="Enter client name"
              />

              <div className={styles.modalActions}>
                <button
                  className={styles.cancelButton}
                  onClick={() => setShowNewProject(false)}
                >
                  Cancel
                </button>

                <button
                  className={styles.saveProjectButton}
                  onClick={addProject}
                >
                  Create Project
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({
  icon,
  title,
  value,
  change,
  type,
}: {
  icon: string;
  title: string;
  value: string;
  change: string;
  type: "blue" | "green" | "red";
}) {
  return (
    <div className={styles.statCard}>
      <div className={`${styles.statIcon} ${styles[type]}`}>
        {icon}
      </div>

      <div className={styles.statContent}>
        <span>{title}</span>

        <div className={styles.statValueRow}>
          <strong>{value}</strong>
          <small
            className={
              type === "red"
                ? styles.redChange
                : styles.greenChange
            }
          >
            ↑ {change}
          </small>
        </div>

        <p>vs. last month</p>
      </div>
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: ProjectStatus;
}) {
  const className =
    status === "Completed"
      ? styles.completedBadge
      : status === "On Hold"
      ? styles.holdBadge
      : status === "Overdue"
      ? styles.overdueBadge
      : styles.progressBadge;

  return (
    <span className={`${styles.statusBadge} ${className}`}>
      {status}
    </span>
  );
}

function Legend({
  label,
  count,
  total,
  type,
}: {
  label: string;
  count: number;
  total: number;
  type: "blue" | "green" | "yellow" | "red";
}) {
  const percentage =
    total === 0 ? 0 : Math.round((count / total) * 100);

  return (
    <div className={styles.legendRow}>
      <div className={styles.legendLabel}>
        <span
          className={`${styles.legendDot} ${styles[`dot${type}`]}`}
        />
        <span>{label}</span>
      </div>

      <strong>
        {count} ({percentage}%)
      </strong>
    </div>
  );
}

function Activity({
  icon,
  title,
  text,
  time,
}: {
  icon: string;
  title: string;
  text: string;
  time: string;
}) {
  return (
    <div className={styles.activityItem}>
      <div className={styles.activityIcon}>{icon}</div>

      <div className={styles.activityContent}>
        <strong>{title}</strong>
        <p>{text}</p>
        <small>{time}</small>
      </div>
    </div>
  );
}