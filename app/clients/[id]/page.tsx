"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import Navbar from "../../components/Nevbar/page";
import Sidebar from "../../components/Sidebar/Sidebar";

import {
  getStoredClients,
  saveClients,
  type Client,
} from "../data/clients";

import styles from "./ClientProfile.module.css";

type Tab =
  | "Overview"
  | "Communication"
  | "Projects"
  | "Invoices"
  | "Notes"
  | "Activities";

export default function ClientProfilePage() {
  const params = useParams();

  const id = Number(params.id);

  const [clients, setClients] = useState<Client[]>(getStoredClients);
  const [activeTab, setActiveTab] = useState<Tab>("Overview");

  const [showEdit, setShowEdit] = useState(false);
  const [showProject, setShowProject] = useState(false);
  const [showNote, setShowNote] = useState(false);

  const client = useMemo<Client | undefined>(
    () => clients.find((item) => item.id === id),
    [clients, id]
  );

  /*
   * IMPORTANT:
   * Keep this separate constant after the undefined check.
   * This prevents TypeScript/Vercel from reporting:
   * "client is possibly undefined"
   */
  if (!client) {
    return (
      <div className={styles.notFound}>
        <h1>Client not found</h1>

        <Link href="/clients">
          ← Back to Clients
        </Link>
      </div>
    );
  }

  const currentClient: Client = client;

  const [editData, setEditData] = useState({
    name: "",
    role: "",
    company: "",
    phone: "",
    email: "",
  });

  const [projectName, setProjectName] = useState("");
  const [noteText, setNoteText] = useState("");

  function openEdit() {
    setEditData({
      name: currentClient.name,
      role: currentClient.role,
      company: currentClient.company,
      phone: currentClient.phone,
      email: currentClient.email,
    });

    setShowEdit(true);
  }

  function saveEdit() {
    const updated = clients.map((item) =>
      item.id === currentClient.id
        ? {
            ...item,
            name: editData.name,
            role: editData.role,
            company: editData.company,
            phone: editData.phone,
            email: editData.email,
            contactPerson: {
              ...item.contactPerson,
              name: editData.name,
              role: editData.role,
              phone: editData.phone,
              email: editData.email,
            },
          }
        : item
    );

    setClients(updated);
    saveClients(updated);
    setShowEdit(false);
  }

  function addProject() {
    if (!projectName.trim()) {
      alert("Enter project name.");
      return;
    }

    const updated = clients.map((item) =>
      item.id === currentClient.id
        ? {
            ...item,
            projects: [
              ...item.projects,
              {
                id: Date.now(),
                name: projectName.trim(),
                type: "Website Development",
                status: "In Progress",
                startDate: "11 Sep 2025",
                endDate: "—",
              },
            ],
          }
        : item
    );

    setClients(updated);
    saveClients(updated);

    setProjectName("");
    setShowProject(false);
  }

  function addNote() {
    if (!noteText.trim()) {
      alert("Enter note.");
      return;
    }

    const updated = clients.map((item) =>
      item.id === currentClient.id
        ? {
            ...item,
            notes: [
              ...item.notes,
              {
                author: "Vishal Thakur",
                role: "Admin",
                message: noteText.trim(),
                date: "11 Sep 2025",
                time: "10:30 AM",
                avatar: "VT",
              },
            ],
          }
        : item
    );

    setClients(updated);
    saveClients(updated);

    setNoteText("");
    setShowNote(false);
  }

  return (
    <div className={styles.app}>
      <Navbar />

      <div className={styles.layout}>
        <Sidebar />

        <main className={styles.main}>
          {/* ================= BREADCRUMB ================= */}

          <div className={styles.breadcrumb}>
            <Link href="/clients">
              ⌂ Clients
            </Link>

            <span>›</span>

            <span>Client Profile</span>
          </div>

          {/* ================= TOP ACTIONS ================= */}

          <div className={styles.topActions}>
            <div />

            <div>
              <button
                type="button"
                className={styles.editButton}
                onClick={openEdit}
              >
                ✎ Edit
              </button>

              <button
                type="button"
                className={styles.addProjectButton}
                onClick={() => setShowProject(true)}
              >
                ＋ Add Project
              </button>

              <button
                type="button"
                className={styles.moreButton}
              >
                ⋮
              </button>
            </div>
          </div>

          {/* ================= PROFILE CARD ================= */}

          <section className={styles.profileCard}>
            <div className={styles.profileMain}>
              <div className={styles.companyLogo}>
                <span>♧</span>

                <small>
                  Smile Dental
                </small>
              </div>

              <div className={styles.profileInfo}>
                <div className={styles.profileTitle}>
                  <h1>
                    {currentClient.company}
                  </h1>

                  <span className={styles.activeBadge}>
                    🔒 {currentClient.status}
                  </span>
                </div>

                <p className={styles.businessType}>
                  {currentClient.businessType}
                </p>

                <div className={styles.contactLine}>
                  <span>
                    ☎ {currentClient.phone}
                  </span>

                  <span>
                    ✉ {currentClient.email}
                  </span>

                  <span>
                    ⌖ {currentClient.address}
                  </span>
                </div>

                <p className={styles.description}>
                  {currentClient.description}
                </p>

                <div className={styles.tags}>
                  {currentClient.tags.map((tag) => (
                    <span key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.profileMeta}>
              <div>
                <span>Client ID</span>
                <strong>
                  {currentClient.clientId}
                </strong>
              </div>

              <div>
                <span>Source</span>
                <strong>
                  {currentClient.source}
                </strong>
              </div>

              <div>
                <span>Business Type</span>
                <strong>
                  {currentClient.businessType}
                </strong>
              </div>

              <div>
                <span>Company Size</span>
                <strong>
                  {currentClient.companySize}
                </strong>
              </div>

              <div>
                <span>Created On</span>
                <strong>
                  05 Sep 2025, 10:24 AM
                </strong>
              </div>

              <div>
                <span>Last Contact</span>
                <strong>
                  {currentClient.lastContact}
                </strong>
              </div>
            </div>
          </section>

          {/* ================= MAIN GRID ================= */}

          <div className={styles.mainGrid}>
            <section className={styles.leftContent}>
              {/* ================= TABS ================= */}

              <nav className={styles.tabs}>
                {(
                  [
                    "Overview",
                    "Communication",
                    "Projects",
                    "Invoices",
                    "Notes",
                    "Activities",
                  ] as Tab[]
                ).map((tab) => (
                  <button
                    type="button"
                    key={tab}
                    className={
                      activeTab === tab
                        ? styles.activeTab
                        : ""
                    }
                    onClick={() =>
                      setActiveTab(tab)
                    }
                  >
                    {tab === "Overview" && "⊞"}
                    {tab === "Communication" && "▣"}
                    {tab === "Projects" && "♧"}
                    {tab === "Invoices" && "▤"}
                    {tab === "Notes" && "▧"}
                    {tab === "Activities" && "⌘"}

                    {tab}
                  </button>
                ))}
              </nav>

              {/* ================= TAB CONTENT ================= */}

              {activeTab === "Overview" && (
                <Overview
                  client={currentClient}
                  onAddProject={() =>
                    setShowProject(true)
                  }
                  onAddNote={() =>
                    setShowNote(true)
                  }
                />
              )}

              {activeTab === "Communication" && (
                <Communication
                  client={currentClient}
                />
              )}

              {activeTab === "Projects" && (
                <Projects
                  client={currentClient}
                  onAddProject={() =>
                    setShowProject(true)
                  }
                />
              )}

              {activeTab === "Invoices" && (
                <Invoices />
              )}

              {activeTab === "Notes" && (
                <Notes
                  client={currentClient}
                  onAddNote={() =>
                    setShowNote(true)
                  }
                />
              )}

              {activeTab === "Activities" && (
                <Activities
                  client={currentClient}
                />
              )}
            </section>

            {/* ================= RIGHT COLUMN ================= */}

            <aside className={styles.rightColumn}>
              {/* ================= CLIENT STATUS ================= */}

              <div className={styles.sideCard}>
                <div className={styles.sideHeader}>
                  <h3>
                    ⚙ Client Status
                  </h3>

                  <span className={styles.statusPill}>
                    🔒 {currentClient.status} ＋
                  </span>
                </div>

                <div className={styles.statusLine}>
                  {[
                    "New",
                    "Contacted",
                    "Interested",
                    "Proposal",
                    "Won",
                  ].map((status, index) => (
                    <div
                      key={status}
                      className={
                        index <= 2
                          ? styles.statusStepActive
                          : styles.statusStep
                      }
                    >
                      <span>
                        {index === 2
                          ? "✓"
                          : ""}
                      </span>

                      <small>
                        {status}
                      </small>
                    </div>
                  ))}
                </div>
              </div>

              {/* ================= TIMELINE ================= */}

              <div className={styles.sideCard}>
                <div className={styles.sideHeader}>
                  <h3>
                    ◷ Lead Timeline
                  </h3>

                  <button type="button">
                    View All →
                  </button>
                </div>

                <div className={styles.timeline}>
                  {currentClient.timeline.length >
                  0 ? (
                    currentClient.timeline.map(
                      (item, index) => (
                        <div
                          className={
                            styles.timelineItem
                          }
                          key={`${item.title}-${index}`}
                        >
                          <div
                            className={
                              styles.timelineIcon
                            }
                          >
                            {index === 0
                              ? "◉"
                              : index === 1
                              ? "☎"
                              : index === 2
                              ? "✓"
                              : index === 3
                              ? "▣"
                              : "▤"}
                          </div>

                          <div
                            className={
                              styles.timelineContent
                            }
                          >
                            <strong>
                              {item.title}
                            </strong>

                            <small>
                              {item.date},{" "}
                              {item.time}
                            </small>
                          </div>

                          <span>
                            {item.status}
                          </span>
                        </div>
                      )
                    )
                  ) : (
                    <p
                      className={
                        styles.emptySmall
                      }
                    >
                      No timeline activity.
                    </p>
                  )}
                </div>
              </div>

              {/* ================= RECENT ACTIVITIES ================= */}

              <div className={styles.sideCard}>
                <div className={styles.sideHeader}>
                  <h3>
                    ☎ Recent Activities
                  </h3>

                  <button type="button">
                    View All →
                  </button>
                </div>

                <div className={styles.activityList}>
                  {currentClient.activities
                    .length > 0 ? (
                    currentClient.activities.map(
                      (item, index) => (
                        <div
                          className={
                            styles.activity
                          }
                          key={`${item.title}-${index}`}
                        >
                          <span>
                            {index === 0
                              ? "☎"
                              : index === 1
                              ? "▤"
                              : index === 2
                              ? "▣"
                              : "▧"}
                          </span>

                          <div>
                            <strong>
                              {item.title}
                            </strong>

                            <small>
                              {item.date},{" "}
                              {item.time}
                            </small>
                          </div>
                        </div>
                      )
                    )
                  ) : (
                    <p
                      className={
                        styles.emptySmall
                      }
                    >
                      No recent activities.
                    </p>
                  )}
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>

      {/* =====================================================
          EDIT CLIENT MODAL
          ===================================================== */}

      {showEdit && (
        <Modal
          title="Edit Client"
          onClose={() =>
            setShowEdit(false)
          }
        >
          <div className={styles.modalForm}>
            <label>Name</label>

            <input
              value={editData.name}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  name: e.target.value,
                })
              }
            />

            <label>Role</label>

            <input
              value={editData.role}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  role: e.target.value,
                })
              }
            />

            <label>Company</label>

            <input
              value={editData.company}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  company: e.target.value,
                })
              }
            />

            <label>Phone</label>

            <input
              value={editData.phone}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  phone: e.target.value,
                })
              }
            />

            <label>Email</label>

            <input
              type="email"
              value={editData.email}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  email: e.target.value,
                })
              }
            />

            <button
              type="button"
              className={styles.saveButton}
              onClick={saveEdit}
            >
              Save Changes
            </button>
          </div>
        </Modal>
      )}

      {/* =====================================================
          ADD PROJECT MODAL
          ===================================================== */}

      {showProject && (
        <Modal
          title="Add New Project"
          onClose={() =>
            setShowProject(false)
          }
        >
          <div className={styles.modalForm}>
            <label>
              Project Name
            </label>

            <input
              value={projectName}
              onChange={(e) =>
                setProjectName(e.target.value)
              }
              placeholder="Enter project name"
            />

            <button
              type="button"
              className={styles.saveButton}
              onClick={addProject}
            >
              Add Project
            </button>
          </div>
        </Modal>
      )}

      {/* =====================================================
          ADD NOTE MODAL
          ===================================================== */}

      {showNote && (
        <Modal
          title="Add Note"
          onClose={() =>
            setShowNote(false)
          }
        >
          <div className={styles.modalForm}>
            <label>
              Note
            </label>

            <textarea
              value={noteText}
              onChange={(e) =>
                setNoteText(e.target.value)
              }
              placeholder="Write client note..."
            />

            <button
              type="button"
              className={styles.saveButton}
              onClick={addNote}
            >
              Add Note
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

/* =========================================================
   OVERVIEW
   ========================================================= */

function Overview({
  client,
  onAddProject,
  onAddNote,
}: {
  client: Client;
  onAddProject: () => void;
  onAddNote: () => void;
}) {
  return (
    <div className={styles.overview}>
      {/* ================= COMPANY + CONTACT ================= */}

      <div className={styles.twoColumns}>
        <div className={styles.infoCard}>
          <div className={styles.cardTitle}>
            <h3>
              ▣ Company Information
            </h3>

            <button type="button">
              Edit
            </button>
          </div>

          <Info
            label="Company Name"
            value={client.company}
          />

          <Info
            label="Website"
            value={client.website}
          />

          <Info
            label="Business Type"
            value={client.businessType}
          />

          <Info
            label="Company Size"
            value={client.companySize}
          />

          <Info
            label="Address"
            value={client.address}
          />

          <Info
            label="GST Number"
            value={client.gstNumber}
          />

          <Info
            label="PAN Number"
            value={client.panNumber}
          />
        </div>

        {/* ================= CONTACT PERSON ================= */}

        <div className={styles.infoCard}>
          <div className={styles.cardTitle}>
            <h3>
              ♧ Contact Person
            </h3>

            <button type="button">
              Edit
            </button>
          </div>

          <div className={styles.person}>
            <div className={styles.personAvatar}>
              {client.contactPerson.avatar}
            </div>

            <div>
              <h4>
                {client.contactPerson.name}
              </h4>

              <span>
                {client.contactPerson.role}
              </span>

              <p>
                ☎ {client.contactPerson.phone}
              </p>

              <p>
                ✉ {client.contactPerson.email}
              </p>
            </div>
          </div>

          <div className={styles.contactActions}>
            <a
              href={`tel:${client.contactPerson.phone}`}
            >
              ☎
            </a>

            <a
              href={`https://wa.me/${client.contactPerson.phone.replace(
                /\D/g,
                ""
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              ◉
            </a>

            <a
              href={`mailto:${client.contactPerson.email}`}
            >
              ✉
            </a>
          </div>
        </div>
      </div>

      {/* ================= PROJECTS + QUICK ACTIONS ================= */}

      <div className={styles.twoColumns}>
        <div className={styles.infoCard}>
          <div className={styles.cardTitle}>
            <h3>
              ▣ Recent Projects
            </h3>

            <button
              type="button"
              onClick={onAddProject}
              className={styles.textButton}
            >
              View All →
            </button>
          </div>

          {client.projects.length > 0 ? (
            <div className={styles.projectTable}>
              {client.projects.map(
                (project) => (
                  <div
                    className={styles.projectRow}
                    key={project.id}
                  >
                    <div>
                      <strong>
                        {project.name}
                      </strong>

                      <small>
                        {project.type}
                      </small>
                    </div>

                    <span
                      className={`${styles.projectStatus} ${
                        project.status ===
                        "Completed"
                          ? styles.completed
                          : project.status ===
                            "In Progress"
                          ? styles.inProgress
                          : styles.proposal
                      }`}
                    >
                      {project.status}
                    </span>

                    <small>
                      {project.startDate}
                    </small>

                    <button
                      type="button"
                    >
                      View
                    </button>

                    <span>
                      •••
                    </span>
                  </div>
                )
              )}
            </div>
          ) : (
            <div className={styles.noData}>
              No projects yet.
            </div>
          )}
        </div>

        {/* ================= QUICK ACTIONS ================= */}

        <div className={styles.quickCard}>
          <h3>
            ⚡ Quick Actions
          </h3>

          <div className={styles.quickGrid}>
            <a
              href={`tel:${client.phone}`}
            >
              ☎ Call Client
            </a>

            <a
              href={`https://wa.me/${client.phone.replace(
                /\D/g,
                ""
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              ◉ Send WhatsApp
            </a>

            <a
              href={`mailto:${client.email}`}
            >
              ✉ Send Email
            </a>

            <button type="button">
              Create Proposal
            </button>
          </div>
        </div>
      </div>

      {/* ================= NOTES ================= */}

      <div className={styles.infoCard}>
        <div className={styles.cardTitle}>
          <h3>
            ▧ Notes
          </h3>

          <button
            type="button"
            className={styles.addNoteButton}
            onClick={onAddNote}
          >
            ＋ Add Note
          </button>
        </div>

        {client.notes.length > 0 ? (
          client.notes.map(
            (note, index) => (
              <div
                className={styles.note}
                key={index}
              >
                <div
                  className={styles.noteAvatar}
                >
                  {note.avatar}
                </div>

                <div>
                  <strong>
                    {note.author}{" "}
                    <small>
                      ({note.role})
                    </small>
                  </strong>

                  <p>
                    {note.message}
                  </p>

                  <span>
                    {note.date},{" "}
                    {note.time}
                  </span>
                </div>
              </div>
            )
          )
        ) : (
          <div className={styles.noData}>
            No notes available.
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================================================
   COMMUNICATION
   ========================================================= */

function Communication({
  client,
}: {
  client: Client;
}) {
  return (
    <div className={styles.infoCard}>
      <div className={styles.cardTitle}>
        <h3>
          ▣ Communication History
        </h3>
      </div>

      {client.activities.length === 0 ? (
        <div className={styles.noData}>
          No communication records.
        </div>
      ) : (
        <div
          className={
            styles.communicationList
          }
        >
          {client.activities.map(
            (item, index) => (
              <div
                key={index}
                className={
                  styles.communicationItem
                }
              >
                <span>
                  {index % 2 === 0
                    ? "☎"
                    : "✉"}
                </span>

                <div>
                  <strong>
                    {item.title}
                  </strong>

                  <small>
                    {item.date},{" "}
                    {item.time}
                  </small>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}

/* =========================================================
   PROJECTS
   ========================================================= */

function Projects({
  client,
  onAddProject,
}: {
  client: Client;
  onAddProject: () => void;
}) {
  return (
    <div className={styles.infoCard}>
      <div className={styles.cardTitle}>
        <h3>
          ▣ All Projects
        </h3>

        <button
          type="button"
          onClick={onAddProject}
        >
          ＋ Add Project
        </button>
      </div>

      {client.projects.length === 0 ? (
        <div className={styles.noData}>
          No projects found.
        </div>
      ) : (
        <div className={styles.fullProjects}>
          {client.projects.map(
            (project) => (
              <div key={project.id}>
                <strong>
                  {project.name}
                </strong>

                <span>
                  {project.type}
                </span>

                <em>
                  {project.status}
                </em>

                <small>
                  {project.startDate} →{" "}
                  {project.endDate}
                </small>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}

/* =========================================================
   INVOICES
   ========================================================= */

function Invoices() {
  return (
    <div className={styles.infoCard}>
      <div className={styles.cardTitle}>
        <h3>
          ▤ Invoices
        </h3>
      </div>

      <div className={styles.invoiceEmpty}>
        <span>₹</span>

        <strong>
          No invoices yet
        </strong>

        <p>
          Invoices for this client will
          appear here.
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   NOTES
   ========================================================= */

function Notes({
  client,
  onAddNote,
}: {
  client: Client;
  onAddNote: () => void;
}) {
  return (
    <div className={styles.infoCard}>
      <div className={styles.cardTitle}>
        <h3>
          ▧ Client Notes
        </h3>

        <button
          type="button"
          onClick={onAddNote}
        >
          ＋ Add Note
        </button>
      </div>

      {client.notes.length === 0 ? (
        <div className={styles.noData}>
          No notes available.
        </div>
      ) : (
        client.notes.map(
          (note, index) => (
            <div
              className={styles.noteLarge}
              key={index}
            >
              <div
                className={styles.noteAvatar}
              >
                {note.avatar}
              </div>

              <div>
                <strong>
                  {note.author}
                </strong>

                <span>
                  {note.role}
                </span>

                <p>
                  {note.message}
                </p>

                <small>
                  {note.date},{" "}
                  {note.time}
                </small>
              </div>
            </div>
          )
        )
      )}
    </div>
  );
}

/* =========================================================
   ACTIVITIES
   ========================================================= */

function Activities({
  client,
}: {
  client: Client;
}) {
  return (
    <div className={styles.infoCard}>
      <div className={styles.cardTitle}>
        <h3>
          ⌘ Activities
        </h3>
      </div>

      {client.activities.length === 0 ? (
        <div className={styles.noData}>
          No activities available.
        </div>
      ) : (
        <div
          className={
            styles.fullActivities
          }
        >
          {client.activities.map(
            (activity, index) => (
              <div key={index}>
                <span>
                  {index + 1}
                </span>

                <div>
                  <strong>
                    {activity.title}
                  </strong>

                  <small>
                    {activity.date},{" "}
                    {activity.time}
                  </small>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}

/* =========================================================
   INFO
   ========================================================= */

function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className={styles.infoRow}>
      <span>
        {label}
      </span>

      <strong>
        {value}
      </strong>
    </div>
  );
}

/* =========================================================
   MODAL
   ========================================================= */

function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      className={styles.modalOverlay}
      onMouseDown={onClose}
    >
      <div
        className={styles.modal}
        onMouseDown={(e) =>
          e.stopPropagation()
        }
      >
        <div className={styles.modalHeader}>
          <h2>
            {title}
          </h2>

          <button
            type="button"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}