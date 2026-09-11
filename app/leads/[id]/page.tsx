"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import Navbar from "../../components/Nevbar/page";
import Sidebar from "../../components/Sidebar/Sidebar";

import styles from "./LeadProfile.module.css";

import {
  getStoredLeads,
  initialLeads,
  saveLeads,
  Lead,
  LeadStatus,
} from "../leadData";

type Tab =
  | "Overview"
  | "Communication"
  | "Notes"
  | "Documents"
  | "Activities";

const statusSteps: LeadStatus[] = [
  "New",
  "Contacted",
  "Interested",
  "Proposal Sent",
  "Won",
];

export default function LeadProfilePage() {
  const params = useParams();

  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [lead, setLead] = useState<Lead | null>(null);

  const [activeTab, setActiveTab] =
    useState<Tab>("Overview");

  const [showEdit, setShowEdit] = useState(false);
  const [showFollowup, setShowFollowup] =
    useState(false);
  const [showNote, setShowNote] = useState(false);
  const [converted, setConverted] = useState(false);

  /* =====================================================
     LOAD LEAD
     ===================================================== */

  useEffect(() => {
    const stored = getStoredLeads();

    setLeads(stored);

    const id = Number(params.id);

    const found = stored.find(
      (item) => item.id === id
    );

    setLead(found || null);
  }, [params.id]);

  /* =====================================================
     CURRENT STATUS
     ===================================================== */

  const currentStatusIndex = useMemo(() => {
    if (!lead) {
      return 0;
    }

    const index = statusSteps.indexOf(
      lead.status
    );

    return index < 0 ? 0 : index;
  }, [lead]);

  /* =====================================================
     UPDATE LEAD
     ===================================================== */

  function updateLead(updatedLead: Lead) {
    const updated = leads.map((item) =>
      item.id === updatedLead.id
        ? updatedLead
        : item
    );

    setLeads(updated);
    setLead(updatedLead);
    saveLeads(updated);
  }

  /* =====================================================
     CHANGE STATUS
     ===================================================== */

  function changeStatus(
    newStatus: LeadStatus
  ) {
    if (!lead) {
      return;
    }

    const now = new Date();

    const updatedLead: Lead = {
      ...lead,

      status: newStatus,

      lastContact:
        now.toLocaleString(),

      timeline: [
        ...lead.timeline,

        {
          title: newStatus,

          date: now.toLocaleDateString(
            "en-GB"
          ),

          time: now.toLocaleTimeString(
            [],
            {
              hour: "2-digit",
              minute: "2-digit",
            }
          ),

          status: newStatus,
        },
      ],
    };

    updateLead(updatedLead);
  }

  /* =====================================================
     ADD FOLLOW UP
     ===================================================== */

  function addFollowup(
    date: string,
    time: string
  ) {
    if (!lead) {
      return;
    }

    const updatedLead: Lead = {
      ...lead,

      nextFollowUp: `${date}, ${time}`,

      timeline: [
        ...lead.timeline,

        {
          title: "Follow-up Scheduled",
          date,
          time,
          status: "Follow-up",
        },
      ],
    };

    updateLead(updatedLead);

    setShowFollowup(false);
  }

  /* =====================================================
     ADD NOTE
     ===================================================== */

  function addNote(note: string) {
    if (!lead || !note.trim()) {
      return;
    }

    const updatedLead: Lead = {
      ...lead,

      notes: [
        ...lead.notes,
        note.trim(),
      ],
    };

    updateLead(updatedLead);

    setShowNote(false);
  }

  /* =====================================================
     CONVERT TO CLIENT
     ===================================================== */

  function convertToClient() {
    if (!lead) {
      return;
    }

    const confirmed = window.confirm(
      `Convert ${lead.name} into a client?`
    );

    if (!confirmed) {
      return;
    }

    const updatedLead: Lead = {
      ...lead,
      status: "Won",
    };

    updateLead(updatedLead);

    setConverted(true);
  }

  /* =====================================================
     LEAD NOT FOUND
     ===================================================== */

  if (!lead) {
    return (
      <div className={styles.app}>
        <Navbar />

        <div className={styles.layout}>
          <Sidebar />

          <main className={styles.main}>
            <div className={styles.notFound}>
              <h1>
                Lead Not Found
              </h1>

              <p>
                This lead does not exist or
                has been removed.
              </p>

              <Link href="/leads">
                ← Back to Leads
              </Link>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.app}>
      <Navbar />

      <div className={styles.layout}>
        <Sidebar />

        <main className={styles.main}>
          {/* =================================================
              TOP BAR
              ================================================= */}

          <div className={styles.topBar}>
            <div>
              <div
                className={
                  styles.breadcrumb
                }
              >
                <Link href="/leads">
                  ⌂ Leads
                </Link>

                <span>›</span>

                <span>
                  Lead Profile
                </span>
              </div>

              <h1>
                Lead Profile
              </h1>

              <p>
                View and manage all details
                about your lead.
              </p>
            </div>

            <div
              className={
                styles.topActions
              }
            >
              <Link
                href="/leads"
                className={
                  styles.backButton
                }
              >
                ← Back to Leads
              </Link>

              <button
                type="button"
                onClick={() =>
                  setShowEdit(true)
                }
                className={
                  styles.whiteButton
                }
              >
                ✎ Edit
              </button>

              <button
                type="button"
                onClick={() =>
                  setShowFollowup(true)
                }
                className={
                  styles.whiteButton
                }
              >
                ▣ Add Follow-up
              </button>

              <button
                type="button"
                onClick={convertToClient}
                className={
                  styles.convertButton
                }
              >
                ♧ Convert to Client
              </button>

              <button
                type="button"
                className={
                  styles.iconButton
                }
              >
                ⋮
              </button>
            </div>
          </div>

          {/* =================================================
              SUCCESS MESSAGE
              ================================================= */}

          {converted && (
            <div
              className={
                styles.successMessage
              }
            >
              ✓ Lead successfully
              converted to client.
            </div>
          )}

          {/* =================================================
              PROFILE GRID
              ================================================= */}

          <div
            className={
              styles.profileGrid
            }
          >
            {/* ================= PROFILE ================= */}

            <section
              className={
                styles.profileCard
              }
            >
              <div
                className={
                  styles.profileLeft
                }
              >
                <div
                  className={
                    styles.bigAvatar
                  }
                >
                  {lead.avatar}

                  <span />
                </div>

                <div
                  className={
                    styles.profileIdentity
                  }
                >
                  <div
                    className={
                      styles.nameLine
                    }
                  >
                    <h2>
                      {lead.name}
                    </h2>

                    <span
                      className={`${styles.statusPill} ${
                        styles[
                          lead.status
                            .toLowerCase()
                            .replace(
                              /\s/g,
                              ""
                            )
                        ]
                      }`}
                    >
                      {lead.status}
                    </span>
                  </div>

                  <div
                    className={
                      styles.metaRow
                    }
                  >
                    <span>
                      ◉ Owner
                    </span>

                    <span>
                      ♙ {lead.assignedTo}{" "}
                      (BDE)
                    </span>
                  </div>

                  <div
                    className={
                      styles.contactRow
                    }
                  >
                    <span>
                      ☎ {lead.phone}
                    </span>

                    <span>
                      ✉ {lead.email}
                    </span>

                    <span>
                      ⌖ Indore, Madhya
                      Pradesh
                    </span>
                  </div>

                  <p
                    className={
                      styles.description
                    }
                  >
                    Looking for a
                    professional website
                    for her dental clinic.
                    She wants modern
                    design, appointment
                    booking and service
                    details.
                  </p>
                </div>
              </div>

              {/* ================= DETAILS ================= */}

              <div
                className={
                  styles.profileDetails
                }
              >
                <InfoItem
                  icon="◉"
                  title="Source"
                  value={lead.source}
                />

                <InfoItem
                  icon="◷"
                  title="Lead Type"
                  value={lead.leadType}
                />

                <InfoItem
                  icon="◈"
                  title="Priority"
                  value={lead.priority}
                  danger={
                    lead.priority ===
                    "High"
                  }
                />

                <InfoItem
                  icon="▣"
                  title="Created On"
                  value={lead.createdAt}
                />

                <InfoItem
                  icon="◷"
                  title="Last Contact"
                  value={
                    lead.lastContact
                  }
                />
              </div>
            </section>

            {/* ================= STATUS ================= */}

            <aside
              className={
                styles.statusCard
              }
            >
              <div
                className={
                  styles.cardHeading
                }
              >
                <h3>
                  ♧ Lead Status
                </h3>

                <span
                  className={`${styles.statusPill} ${
                    styles[
                      lead.status
                        .toLowerCase()
                        .replace(
                          /\s/g,
                          ""
                        )
                    ]
                  }`}
                >
                  {lead.status}
                </span>
              </div>

              <div
                className={
                  styles.progress
                }
              >
                {statusSteps.map(
                  (step, index) => {
                    const active =
                      index <=
                      currentStatusIndex;

                    return (
                      <div
                        className={`${styles.progressItem} ${
                          active
                            ? styles.progressActive
                            : ""
                        }`}
                        key={step}
                      >
                        <button
                          type="button"
                          onClick={() =>
                            changeStatus(
                              step
                            )
                          }
                          className={
                            styles.progressDot
                          }
                        >
                          {index ===
                          currentStatusIndex
                            ? "✓"
                            : ""}
                        </button>

                        <span>
                          {step}
                        </span>
                      </div>
                    );
                  }
                )}
              </div>
            </aside>
          </div>

          {/* =================================================
              LOWER GRID
              ================================================= */}

          <div
            className={
              styles.lowerGrid
            }
          >
            <section
              className={
                styles.mainPanel
              }
            >
              {/* ================= TABS ================= */}

              <div
                className={
                  styles.tabs
                }
              >
                {(
                  [
                    "Overview",
                    "Communication",
                    "Notes",
                    "Documents",
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
                    {tab ===
                      "Overview" &&
                      "▥ "}

                    {tab ===
                      "Communication" &&
                      "▣ "}

                    {tab ===
                      "Notes" &&
                      "▤ "}

                    {tab ===
                      "Documents" &&
                      "▥ "}

                    {tab ===
                      "Activities" &&
                      "◌ "}

                    {tab}
                  </button>
                ))}
              </div>

              {/* =================================================
                  OVERVIEW
                  ================================================= */}

              {activeTab ===
                "Overview" && (
                <div
                  className={
                    styles.overviewGrid
                  }
                >
                  <InfoSection
                    title="▥ Company Information"
                    items={[
                      [
                        "Company Name",
                        lead.company,
                      ],
                      [
                        "Website",
                        lead.website || "-",
                      ],
                      [
                        "Business Type",
                        lead.businessType ||
                          "-",
                      ],
                      [
                        "Company Size",
                        lead.companySize ||
                          "-",
                      ],
                    ]}
                  />

                  {/* ================= COMMUNICATION ================= */}

                  <section
                    className={
                      styles.innerCard
                    }
                  >
                    <div
                      className={
                        styles.innerHeading
                      }
                    >
                      <h3>
                        ▣ Recent
                        Communication
                      </h3>

                      <button
                        type="button"
                        onClick={() =>
                          setActiveTab(
                            "Communication"
                          )
                        }
                      >
                        View All →
                      </button>
                    </div>

                    {lead.communications
                      .length > 0 ? (
                      lead.communications.map(
                        (
                          item,
                          index
                        ) => (
                          <Communication
                            key={index}
                            type={
                              item.type
                            }
                            title={
                              item.title
                            }
                            message={
                              item.message
                            }
                            date={
                              item.date
                            }
                            time={
                              item.time
                            }
                          />
                        )
                      )
                    ) : (
                      <div
                        className={
                          styles.noData
                        }
                      >
                        No communication
                        yet.
                      </div>
                    )}
                  </section>

                  {/* ================= REQUIREMENTS ================= */}

                  <InfoSection
                    title="♙ Requirement Details"
                    items={[
                      [
                        "Service Required",
                        lead.serviceRequired,
                      ],
                      [
                        "Features Needed",
                        lead.featuresNeeded ||
                          "-",
                      ],
                      [
                        "Budget Range",
                        lead.budgetRange ||
                          "-",
                      ],

                      /*
                       * FIX:
                       * lead.timeline is an ARRAY,
                       * InfoSection expects STRING.
                       */
                      [
                        "Timeline",
                        Array.isArray(
                          lead.timeline
                        )
                          ? lead.timeline
                              .map(
                                (
                                  item
                                ) =>
                                  item.title
                              )
                              .join(
                                " → "
                              ) || "-"
                          : String(
                              lead.timeline ||
                                "-"
                            ),
                      ],

                      [
                        "Additional Note",
                        lead.additionalNote ||
                          "-",
                      ],
                    ]}
                  />

                  {/* ================= FOLLOW UP ================= */}

                  <section
                    className={
                      styles.innerCard
                    }
                  >
                    <div
                      className={
                        styles.innerHeading
                      }
                    >
                      <h3>
                        ▣ Follow-up
                        Reminder
                      </h3>

                      <button
                        type="button"
                        onClick={() =>
                          setShowFollowup(
                            true
                          )
                        }
                      >
                        Set Reminder
                      </button>
                    </div>

                    <div
                      className={
                        styles.followupBox
                      }
                    >
                      <span>
                        ▣
                      </span>

                      <div>
                        <small>
                          Next Follow-up
                        </small>

                        <strong>
                          {lead.nextFollowUp ||
                            "Not scheduled"}
                        </strong>
                      </div>
                    </div>

                    <div
                      className={
                        styles.reminderText
                      }
                    >
                      ● Send design sample
                      and discuss final
                      requirements.
                    </div>
                  </section>
                </div>
              )}

              {/* =================================================
                  COMMUNICATION TAB
                  ================================================= */}

              {activeTab ===
                "Communication" && (
                <div
                  className={
                    styles.tabContent
                  }
                >
                  <div
                    className={
                      styles.contentHeader
                    }
                  >
                    <h2>
                      Communication
                      History
                    </h2>
                  </div>

                  {lead.communications.map(
                    (
                      item,
                      index
                    ) => (
                      <Communication
                        key={index}
                        type={item.type}
                        title={item.title}
                        message={
                          item.message
                        }
                        date={
                          item.date
                        }
                        time={
                          item.time
                        }
                      />
                    )
                  )}

                  {lead.communications
                    .length === 0 && (
                    <div
                      className={
                        styles.emptyLarge
                      }
                    >
                      No communication
                      records.
                    </div>
                  )}
                </div>
              )}

              {/* =================================================
                  NOTES TAB
                  ================================================= */}

              {activeTab ===
                "Notes" && (
                <div
                  className={
                    styles.tabContent
                  }
                >
                  <div
                    className={
                      styles.contentHeader
                    }
                  >
                    <h2>
                      Lead Notes
                    </h2>

                    <button
                      type="button"
                      className={
                        styles.primarySmall
                      }
                      onClick={() =>
                        setShowNote(
                          true
                        )
                      }
                    >
                      + Add Note
                    </button>
                  </div>

                  {lead.notes.map(
                    (
                      note,
                      index
                    ) => (
                      <div
                        className={
                          styles.noteItem
                        }
                        key={index}
                      >
                        <span>
                          📝
                        </span>

                        <p>
                          {note}
                        </p>
                      </div>
                    )
                  )}

                  {lead.notes.length ===
                    0 && (
                    <div
                      className={
                        styles.emptyLarge
                      }
                    >
                      No notes available.
                    </div>
                  )}
                </div>
              )}

              {/* =================================================
                  DOCUMENTS TAB
                  ================================================= */}

              {activeTab ===
                "Documents" && (
                <div
                  className={
                    styles.tabContent
                  }
                >
                  <div
                    className={
                      styles.emptyLarge
                    }
                  >
                    📁 No documents
                    uploaded yet.
                  </div>
                </div>
              )}

              {/* =================================================
                  ACTIVITIES TAB
                  ================================================= */}

              {activeTab ===
                "Activities" && (
                <div
                  className={
                    styles.tabContent
                  }
                >
                  <div
                    className={
                      styles.contentHeader
                    }
                  >
                    <h2>
                      Activity History
                    </h2>
                  </div>

                  {lead.timeline.map(
                    (
                      item,
                      index
                    ) => (
                      <div
                        className={
                          styles.activityItem
                        }
                        key={index}
                      >
                        <div
                          className={
                            styles.activityDot
                          }
                        >
                          ✓
                        </div>

                        <div>
                          <strong>
                            {
                              item.title
                            }
                          </strong>

                          <small>
                            {item.date} •{" "}
                            {item.time}
                          </small>
                        </div>

                        <span>
                          {item.status}
                        </span>
                      </div>
                    )
                  )}
                </div>
              )}
            </section>

            {/* =================================================
                RIGHT PANEL
                ================================================= */}

            <aside
              className={
                styles.rightPanel
              }
            >
              {/* ================= TIMELINE ================= */}

              <section
                className={
                  styles.sideCard
                }
              >
                <h3>
                  ◷ Lead Timeline
                </h3>

                <div
                  className={
                    styles.timeline
                  }
                >
                  {lead.timeline.map(
                    (
                      item,
                      index
                    ) => (
                      <div
                        className={
                          styles.timelineItem
                        }
                        key={index}
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
                            : "▣"}
                        </div>

                        <div
                          className={
                            styles.timelineText
                          }
                        >
                          <strong>
                            {
                              item.title
                            }
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
                  )}
                </div>
              </section>

              {/* ================= QUICK ACTIONS ================= */}

              <section
                className={
                  styles.sideCard
                }
              >
                <h3>
                  ⚡ Quick Actions
                </h3>

                <div
                  className={
                    styles.quickGrid
                  }
                >
                  <button
                    type="button"
                    onClick={() => {
                      window.location.href =
                        `tel:${lead.phone}`;
                    }}
                  >
                    ☎ Call Lead
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      const phone =
                        lead.phone.replace(
                          /\D/g,
                          ""
                        );

                      window.open(
                        `https://wa.me/${phone}`,
                        "_blank",
                        "noopener,noreferrer"
                      );
                    }}
                  >
                    ◉ Send WhatsApp
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      window.location.href =
                        `mailto:${lead.email}`;
                    }}
                  >
                    ✉ Send Email
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      alert(
                        "Proposal creation screen opened."
                      )
                    }
                  >
                    ▤ Create Proposal
                  </button>
                </div>
              </section>

              {/* ================= ASSIGNED TO ================= */}

              <section
                className={
                  styles.sideCard
                }
              >
                <h3>
                  ♙ Assigned To
                </h3>

                <div
                  className={
                    styles.assignedBox
                  }
                >
                  <div
                    className={
                      styles.personAvatar
                    }
                  >
                    {lead.assignedTo
                      .split(" ")
                      .map(
                        (x) =>
                          x[0]
                      )
                      .join("")
                      .slice(
                        0,
                        2
                      )
                      .toUpperCase()}
                  </div>

                  <div>
                    <strong>
                      {
                        lead.assignedTo
                      }
                    </strong>

                    <small>
                      BDE
                    </small>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      alert(
                        "Assignment change screen opened."
                      )
                    }
                  >
                    Change
                  </button>
                </div>
              </section>
            </aside>
          </div>
        </main>
      </div>

      {/* =====================================================
          EDIT MODAL
          ===================================================== */}

      {showEdit && (
        <EditLeadModal
          lead={lead}
          onClose={() =>
            setShowEdit(false)
          }
          onSave={(updated) => {
            updateLead(updated);
            setShowEdit(false);
          }}
        />
      )}

      {/* =====================================================
          FOLLOW UP MODAL
          ===================================================== */}

      {showFollowup && (
        <FollowupModal
          onClose={() =>
            setShowFollowup(false)
          }
          onSave={addFollowup}
        />
      )}

      {/* =====================================================
          NOTE MODAL
          ===================================================== */}

      {showNote && (
        <NoteModal
          onClose={() =>
            setShowNote(false)
          }
          onSave={addNote}
        />
      )}
    </div>
  );
}

/* =========================================================
   INFO ITEM
   ========================================================= */

function InfoItem({
  icon,
  title,
  value,
  danger,
}: {
  icon: string;
  title: string;
  value: string;
  danger?: boolean;
}) {
  return (
    <div
      className={
        styles.infoItem
      }
    >
      <span
        className={
          styles.infoIcon
        }
      >
        {icon}
      </span>

      <div>
        <small>
          {title}
        </small>

        <strong
          className={
            danger
              ? styles.danger
              : ""
          }
        >
          {value}
        </strong>
      </div>
    </div>
  );
}

/* =========================================================
   INFO SECTION
   ========================================================= */

function InfoSection({
  title,
  items,
}: {
  title: string;
  items: [string, string][];
}) {
  return (
    <section
      className={
        styles.innerCard
      }
    >
      <h3>
        {title}
      </h3>

      <div
        className={
          styles.infoRows
        }
      >
        {items.map(
          ([label, value]) => (
            <div
              className={
                styles.infoRow
              }
              key={label}
            >
              <span>
                {label}
              </span>

              <strong>
                {value}
              </strong>
            </div>
          )
        )}
      </div>
    </section>
  );
}

/* =========================================================
   COMMUNICATION
   ========================================================= */

function Communication({
  type,
  title,
  message,
  date,
  time,
}: {
  type: string;
  title: string;
  message: string;
  date: string;
  time: string;
}) {
  return (
    <div
      className={
        styles.communication
      }
    >
      <div
        className={
          styles.communicationIcon
        }
      >
        {type === "WhatsApp"
          ? "◉"
          : type === "Phone"
          ? "☎"
          : "✉"}
      </div>

      <div
        className={
          styles.communicationBody
        }
      >
        <strong>
          {title}
        </strong>

        <p>
          {message}
        </p>
      </div>

      <small>
        {date}
        <br />
        {time}
      </small>
    </div>
  );
}

/* =========================================================
   EDIT LEAD MODAL
   ========================================================= */

function EditLeadModal({
  lead,
  onClose,
  onSave,
}: {
  lead: Lead;
  onClose: () => void;
  onSave: (lead: Lead) => void;
}) {
  const [name, setName] =
    useState(lead.name);

  const [company, setCompany] =
    useState(lead.company);

  const [phone, setPhone] =
    useState(lead.phone);

  const [email, setEmail] =
    useState(lead.email);

  function submit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    const cleanName =
      name.trim();

    onSave({
      ...lead,

      name: cleanName,

      company:
        company.trim(),

      phone:
        phone.trim(),

      email:
        email.trim(),

      avatar:
        cleanName
          .split(" ")
          .filter(Boolean)
          .map(
            (x) => x[0]
          )
          .join("")
          .slice(0, 2)
          .toUpperCase(),
    });
  }

  return (
    <div
      className={
        styles.modalOverlay
      }
    >
      <form
        className={
          styles.modal
        }
        onSubmit={submit}
      >
        <div
          className={
            styles.modalHeader
          }
        >
          <h2>
            Edit Lead
          </h2>

          <button
            type="button"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div
          className={
            styles.modalBody
          }
        >
          <label>
            Lead Name

            <input
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
            />
          </label>

          <label>
            Company

            <input
              value={company}
              onChange={(e) =>
                setCompany(
                  e.target.value
                )
              }
            />
          </label>

          <label>
            Phone

            <input
              value={phone}
              onChange={(e) =>
                setPhone(
                  e.target.value
                )
              }
            />
          </label>

          <label>
            Email

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
            />
          </label>
        </div>

        <div
          className={
            styles.modalActions
          }
        >
          <button
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            type="submit"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

/* =========================================================
   FOLLOW UP MODAL
   ========================================================= */

function FollowupModal({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (
    date: string,
    time: string
  ) => void;
}) {
  const [date, setDate] =
    useState("12 Sep 2025");

  const [time, setTime] =
    useState("11:00 AM");

  return (
    <div
      className={
        styles.modalOverlay
      }
    >
      <div
        className={
          styles.modal
        }
      >
        <div
          className={
            styles.modalHeader
          }
        >
          <h2>
            Add Follow-up
          </h2>

          <button
            type="button"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div
          className={
            styles.modalBody
          }
        >
          <label>
            Follow-up Date

            <input
              value={date}
              onChange={(e) =>
                setDate(
                  e.target.value
                )
              }
            />
          </label>

          <label>
            Follow-up Time

            <input
              value={time}
              onChange={(e) =>
                setTime(
                  e.target.value
                )
              }
            />
          </label>
        </div>

        <div
          className={
            styles.modalActions
          }
        >
          <button
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() =>
              onSave(
                date,
                time
              )
            }
          >
            Save Reminder
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   NOTE MODAL
   ========================================================= */

function NoteModal({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (
    note: string
  ) => void;
}) {
  const [note, setNote] =
    useState("");

  return (
    <div
      className={
        styles.modalOverlay
      }
    >
      <div
        className={
          styles.modal
        }
      >
        <div
          className={
            styles.modalHeader
          }
        >
          <h2>
            Add Note
          </h2>

          <button
            type="button"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div
          className={
            styles.modalBody
          }
        >
          <label>
            Note

            <textarea
              value={note}
              onChange={(e) =>
                setNote(
                  e.target.value
                )
              }
              placeholder="Write lead note..."
            />
          </label>
        </div>

        <div
          className={
            styles.modalActions
          }
        >
          <button
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() =>
              onSave(note)
            }
          >
            Save Note
          </button>
        </div>
      </div>
    </div>
  );
}