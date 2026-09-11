"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import Navbar from "../../components/Nevbar/page";
import Sidebar from "../../components/Sidebar/Sidebar";

import {
  getProjects,
  saveProjects,
  type Project,
  type ProjectTask,
} from "../data/projects";

import styles from "./ProjectDetails.module.css";

type Tab =
  | "Overview"
  | "Tasks"
  | "Files"
  | "Invoices"
  | "Team"
  | "Activity"
  | "Notes";

export default function ProjectDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const id = Number(params.id);

  const [projects, setProjects] = useState<Project[]>([]);
  const [activeTab, setActiveTab] = useState<Tab>("Overview");

  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [taskName, setTaskName] = useState("");

  const [editData, setEditData] = useState({
    name: "",
    client: "",
    progress: 0,
    deadline: "",
    budget: "",
  });

  useEffect(() => {
    setProjects(getProjects());
  }, []);

  const project = useMemo(
    () => projects.find((item) => item.id === id),
    [projects, id]
  );

  function openEdit() {
    if (!project) return;

    setEditData({
      name: project.name,
      client: project.client,
      progress: project.progress,
      deadline: project.deadline,
      budget: project.budget,
    });

    setShowEditModal(true);
  }

  function saveEdit() {
    if (!project) return;

    const updated = projects.map((item) =>
      item.id === project.id
        ? {
            ...item,
            name: editData.name || item.name,
            client: editData.client || item.client,
            progress: Math.max(
              0,
              Math.min(100, Number(editData.progress))
            ),
            deadline: editData.deadline || item.deadline,
            budget: editData.budget || item.budget,
          }
        : item
    );

    setProjects(updated);
    saveProjects(updated);
    setShowEditModal(false);
  }

  function addTask() {
    if (!project) return;

    if (!taskName.trim()) {
      alert("Please enter task name.");
      return;
    }

    const newTask: ProjectTask = {
      id: Date.now(),
      name: taskName.trim(),
      assignee: "Vishal Thakur",
      priority: "Medium",
      status: "Pending",
      dueDate: project.deadline,
    };

    const updated = projects.map((item) =>
      item.id === project.id
        ? {
            ...item,
            tasks: [...item.tasks, newTask],
          }
        : item
    );

    setProjects(updated);
    saveProjects(updated);

    setTaskName("");
    setShowTaskModal(false);
  }

  function updateTaskStatus(taskId: number) {
    if (!project) return;

    const updated = projects.map((item) => {
      if (item.id !== project.id) return item;

      return {
        ...item,
        tasks: item.tasks.map((task) => {
          if (task.id !== taskId) return task;

          const nextStatus =
            task.status === "Pending"
              ? "In Progress"
              : task.status === "In Progress"
              ? "Completed"
              : "Pending";

          return {
            ...task,
            status: nextStatus,
          };
        }),
      };
    });

    setProjects(updated);
    saveProjects(updated);
  }

  if (!project) {
    return (
      <div className={styles.notFound}>
        <div>
          <div className={styles.notFoundIcon}>📁</div>
          <h1>Project not found</h1>
          <p>
            The project ID <strong>{id || "unknown"}</strong> does not
            exist.
          </p>

          <Link href="/projects" className={styles.backButton}>
            ← Back to Projects
          </Link>
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
          {/* Breadcrumb */}
          <div className={styles.breadcrumb}>
            <Link href="/dashboard">⌂ Dashboard</Link>
            <span>›</span>
            <Link href="/projects">Projects</Link>
            <span>›</span>
            <strong>Project Details</strong>
          </div>

          {/* Top action */}
          <div className={styles.topActions}>
            <div />

            <div className={styles.actionButtons}>
              <button
                className={styles.editButton}
                onClick={openEdit}
              >
                ✎ Edit Project
              </button>

              <button
                className={styles.addTaskButton}
                onClick={() => setShowTaskModal(true)}
              >
                ＋ Add Task
              </button>

              <button className={styles.moreButton}>••• More</button>
            </div>
          </div>

          {/* Project header */}
          <section className={styles.projectHeader}>
            <div className={styles.projectIdentity}>
              <div className={styles.projectIcon}>🎓</div>

              <div className={styles.projectTitle}>
                <div className={styles.titleRow}>
                  <h1>{project.name}</h1>

                  <span
                    className={`${styles.statusBadge} ${
                      styles[project.status
                        .toLowerCase()
                        .replace(/\s/g, "")] || ""
                    }`}
                  >
                    ● {project.status}
                  </span>
                </div>

                <div className={styles.clientLine}>
                  <strong>{project.client}</strong>
                  <span>•</span>
                  <span>{project.category}</span>
                </div>

                <p>{project.description}</p>
              </div>
            </div>

            <div className={styles.summaryCards}>
              <div className={styles.summaryCard}>
                <span>Progress</span>
                <strong>{project.progress}%</strong>

                <div className={styles.progressTrack}>
                  <div
                    className={styles.progressFill}
                    style={{
                      width: `${project.progress}%`,
                    }}
                  />
                </div>
              </div>

              <div className={styles.summaryCard}>
                <span>Start Date</span>
                <strong>▣ {project.startDate}</strong>
              </div>

              <div className={styles.summaryCard}>
                <span>Deadline</span>
                <strong>▣ {project.deadline}</strong>
              </div>

              <div className={`${styles.summaryCard} ${styles.remaining}`}>
                <span>Remaining</span>
                <strong>◷ {project.remaining}</strong>
              </div>
            </div>
          </section>

          {/* Tabs */}
          <nav className={styles.tabs}>
            {(
              [
                "Overview",
                "Tasks",
                "Files",
                "Invoices",
                "Team",
                "Activity",
                "Notes",
              ] as Tab[]
            ).map((tab) => (
              <button
                key={tab}
                className={
                  activeTab === tab ? styles.activeTab : ""
                }
                onClick={() => setActiveTab(tab)}
              >
                {tab === "Overview" && "▣"}
                {tab === "Tasks" && "☑"}
                {tab === "Files" && "▤"}
                {tab === "Invoices" && "▥"}
                {tab === "Team" && "♧"}
                {tab === "Activity" && "◷"}
                {tab === "Notes" && "▧"}
                <span>{tab}</span>
              </button>
            ))}
          </nav>

          {activeTab === "Overview" && (
            <Overview
              project={project}
              onEdit={openEdit}
              onAddTask={() => setShowTaskModal(true)}
              onUpdateTask={updateTaskStatus}
            />
          )}

          {activeTab === "Tasks" && (
            <TasksTab
              project={project}
              onAddTask={() => setShowTaskModal(true)}
              onUpdateTask={updateTaskStatus}
            />
          )}

          {activeTab === "Files" && (
            <FilesTab project={project} />
          )}

          {activeTab === "Invoices" && <InvoicesTab />}

          {activeTab === "Team" && (
            <TeamTab project={project} />
          )}

          {activeTab === "Activity" && (
            <ActivityTab project={project} />
          )}

          {activeTab === "Notes" && <NotesTab />}
        </main>
      </div>

      {/* Add Task Modal */}
      {showTaskModal && (
        <Modal
          title="Add New Task"
          onClose={() => setShowTaskModal(false)}
        >
          <div className={styles.modalForm}>
            <label>Task Name</label>

            <input
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="Enter task name"
              autoFocus
            />

            <button
              className={styles.modalSave}
              onClick={addTask}
            >
              Add Task
            </button>
          </div>
        </Modal>
      )}

      {/* Edit Project Modal */}
      {showEditModal && (
        <Modal
          title="Edit Project"
          onClose={() => setShowEditModal(false)}
        >
          <div className={styles.modalForm}>
            <label>Project Name</label>

            <input
              value={editData.name}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  name: e.target.value,
                })
              }
            />

            <label>Client</label>

            <input
              value={editData.client}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  client: e.target.value,
                })
              }
            />

            <label>Progress (%)</label>

            <input
              type="number"
              min="0"
              max="100"
              value={editData.progress}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  progress: Number(e.target.value),
                })
              }
            />

            <label>Deadline</label>

            <input
              value={editData.deadline}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  deadline: e.target.value,
                })
              }
            />

            <label>Budget</label>

            <input
              value={editData.budget}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  budget: e.target.value,
                })
              }
            />

            <button
              className={styles.modalSave}
              onClick={saveEdit}
            >
              Save Changes
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
  project,
  onEdit,
  onAddTask,
  onUpdateTask,
}: {
  project: Project;
  onEdit: () => void;
  onAddTask: () => void;
  onUpdateTask: (taskId: number) => void;
}) {
  return (
    <div className={styles.contentGrid}>
      <div className={styles.leftContent}>
        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <h2>▣ Project Details</h2>

            <button onClick={onEdit}>✎ Edit</button>
          </div>

          <div className={styles.detailsGrid}>
            <Detail label="Project Name" value={project.name} />
            <Detail label="Client" value={project.client} />
            <Detail label="Type" value={project.type} />
            <Detail label="Priority">
              <span className={styles.priorityHigh}>
                {project.priority}
              </span>
            </Detail>

            <Detail
              label="Start Date"
              value={`▣ ${project.startDate}`}
            />

            <Detail
              label="Deadline"
              value={`▣ ${project.deadline}`}
            />

            <Detail label="Status">
              <span className={styles.statusSmall}>
                {project.status}
              </span>
            </Detail>

            <Detail label="Budget" value={project.budget} />
          </div>

          <div className={styles.descriptionBlock}>
            <span>Project Description</span>
            <p>{project.description}</p>
          </div>
        </section>

        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <h2>☑ Tasks</h2>

            <button onClick={onAddTask}>View All →</button>
          </div>

          <TaskTable
            project={project}
            onUpdateTask={onUpdateTask}
          />
        </section>

        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <h2>▤ Recent Files</h2>

            <button>View All →</button>
          </div>

          <FileRow project={project} />
        </section>
      </div>

      <aside className={styles.rightContent}>
        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <h2>▣ Project Progress</h2>
          </div>

          <div className={styles.progressArea}>
            <div className={styles.circleProgress}>
              <div
                className={styles.circleProgressInner}
                style={
                  {
                    "--progress": `${project.progress * 3.6}deg`,
                  } as React.CSSProperties
                }
              >
                <strong>{project.progress}%</strong>
              </div>
            </div>

            <div className={styles.progressLegend}>
              <Legend
                label="Completed"
                value="12"
                type="completed"
              />

              <Legend
                label="In Progress"
                value="8"
                type="progress"
              />

              <Legend
                label="Pending"
                value="4"
                type="pending"
              />

              <Legend
                label="Not Started"
                value="2"
                type="notStarted"
              />
            </div>
          </div>

          <div className={styles.milestones}>
            <Milestone
              title="Requirement Analysis"
              status="Completed"
              percent="100%"
              done
            />

            <Milestone
              title="UI/UX Design"
              status="Completed"
              percent="100%"
              done
            />

            <Milestone
              title="Development"
              status="In Progress"
              percent={`${project.progress}%`}
              active
            />

            <Milestone
              title="Testing"
              status="Pending"
              percent="0%"
            />

            <Milestone
              title="Deployment"
              status="Not Started"
              percent="0%"
            />
          </div>
        </section>

        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <h2>♧ Project Team</h2>
            <button>Manage Team →</button>
          </div>

          <div className={styles.teamList}>
            {project.members.map((member) => (
              <div className={styles.teamMember} key={member.id}>
                <div className={styles.avatar}>
                  {member.avatar}
                </div>

                <div className={styles.memberInfo}>
                  <strong>{member.name}</strong>
                  <span>{member.role}</span>
                </div>

                <em>{member.tag}</em>

                <button>⋮</button>
              </div>
            ))}
          </div>

          <button className={styles.addMember}>
            ＋ Add Team Members
          </button>
        </section>

        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <h2>◷ Recent Activity</h2>
            <button>View All →</button>
          </div>

          <div className={styles.activityList}>
            {project.activities.map((activity) => (
              <div
                className={styles.activityItem}
                key={activity.id}
              >
                <div className={styles.activityIcon}>▣</div>

                <div>
                  <strong>{activity.title}</strong>

                  <p>{activity.description}</p>

                  <small>
                    {activity.user} • {activity.time}
                  </small>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.helpCard}>
          <div className={styles.helpIcon}>➤</div>

          <div>
            <strong>Keep the project on track!</strong>
            <p>
              Stay updated with tasks, deadlines and team
              progress.
            </p>

            <button>View Timeline →</button>
          </div>
        </section>
      </aside>
    </div>
  );
}

/* =========================================================
   TASKS
========================================================= */

function TasksTab({
  project,
  onAddTask,
  onUpdateTask,
}: {
  project: Project;
  onAddTask: () => void;
  onUpdateTask: (id: number) => void;
}) {
  return (
    <section className={styles.card}>
      <div className={styles.cardHeader}>
        <h2>☑ All Project Tasks</h2>

        <button onClick={onAddTask}>＋ Add Task</button>
      </div>

      <TaskTable
        project={project}
        onUpdateTask={onUpdateTask}
      />
    </section>
  );
}

function TaskTable({
  project,
  onUpdateTask,
}: {
  project: Project;
  onUpdateTask: (id: number) => void;
}) {
  return (
    <div className={styles.taskTable}>
      <div className={styles.taskHeader}>
        <span>Task Name</span>
        <span>Assignee</span>
        <span>Priority</span>
        <span>Status</span>
        <span>Due Date</span>
      </div>

      {project.tasks.length === 0 ? (
        <div className={styles.empty}>
          No tasks available.
        </div>
      ) : (
        project.tasks.map((task) => (
          <div className={styles.taskRow} key={task.id}>
            <div className={styles.taskName}>
              <button
                className={
                  task.status === "Completed"
                    ? styles.checked
                    : styles.unchecked
                }
                onClick={() => onUpdateTask(task.id)}
              >
                {task.status === "Completed" ? "✓" : ""}
              </button>

              <span>{task.name}</span>
            </div>

            <span className={styles.assignee}>
              {task.assignee}
            </span>

            <span
              className={
                task.priority === "High"
                  ? styles.priorityHigh
                  : task.priority === "Medium"
                  ? styles.priorityMedium
                  : styles.priorityLow
              }
            >
              {task.priority}
            </span>

            <span
              className={
                task.status === "Completed"
                  ? styles.taskCompleted
                  : task.status === "In Progress"
                  ? styles.taskProgress
                  : styles.taskPending
              }
            >
              {task.status}
            </span>

            <span>{task.dueDate}</span>
          </div>
        ))
      )}
    </div>
  );
}

/* =========================================================
   FILES
========================================================= */

function FilesTab({ project }: { project: Project }) {
  return (
    <section className={styles.card}>
      <div className={styles.cardHeader}>
        <h2>▤ Project Files</h2>

        <button>＋ Upload File</button>
      </div>

      <FileRow project={project} />
    </section>
  );
}

function FileRow({ project }: { project: Project }) {
  if (project.files.length === 0) {
    return (
      <div className={styles.empty}>
        No files uploaded yet.
      </div>
    );
  }

  return (
    <div className={styles.filesGrid}>
      {project.files.map((file) => (
        <div className={styles.fileCard} key={file.id}>
          <div
            className={`${styles.fileIcon} ${
              styles[`file${file.type}`]
            }`}
          >
            {file.type}
          </div>

          <div>
            <strong>{file.name}</strong>
            <span>{file.size}</span>
          </div>

          <button>•••</button>
        </div>
      ))}
    </div>
  );
}

/* =========================================================
   INVOICES
========================================================= */

function InvoicesTab() {
  return (
    <section className={styles.card}>
      <div className={styles.cardHeader}>
        <h2>▥ Project Invoices</h2>
      </div>

      <div className={styles.emptyLarge}>
        <div>₹</div>
        <strong>No invoices yet</strong>
        <p>
          Invoices related to this project will appear here.
        </p>
      </div>
    </section>
  );
}

/* =========================================================
   TEAM
========================================================= */

function TeamTab({ project }: { project: Project }) {
  return (
    <section className={styles.card}>
      <div className={styles.cardHeader}>
        <h2>♧ Project Team</h2>
        <button>＋ Add Member</button>
      </div>

      <div className={styles.teamGrid}>
        {project.members.map((member) => (
          <div className={styles.teamBox} key={member.id}>
            <div className={styles.bigAvatar}>
              {member.avatar}
            </div>

            <strong>{member.name}</strong>
            <span>{member.role}</span>

            <em>{member.tag}</em>
          </div>
        ))}
      </div>
    </section>
  );
}

/* =========================================================
   ACTIVITY
========================================================= */

function ActivityTab({ project }: { project: Project }) {
  return (
    <section className={styles.card}>
      <div className={styles.cardHeader}>
        <h2>◷ Project Activity</h2>
      </div>

      <div className={styles.fullActivity}>
        {project.activities.map((activity) => (
          <div
            className={styles.fullActivityItem}
            key={activity.id}
          >
            <div className={styles.activityIcon}>●</div>

            <div>
              <strong>{activity.title}</strong>
              <p>{activity.description}</p>
              <small>
                {activity.user} • {activity.time}
              </small>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* =========================================================
   NOTES
========================================================= */

function NotesTab() {
  return (
    <section className={styles.card}>
      <div className={styles.cardHeader}>
        <h2>▧ Project Notes</h2>

        <button>＋ Add Note</button>
      </div>

      <div className={styles.emptyLarge}>
        <div>▧</div>
        <strong>No notes yet</strong>
        <p>Add project notes and important information here.</p>
      </div>
    </section>
  );
}

/* =========================================================
   HELPERS
========================================================= */

function Detail({
  label,
  value,
  children,
}: {
  label: string;
  value?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={styles.detailItem}>
      <span>{label}</span>

      {children || <strong>{value}</strong>}
    </div>
  );
}

function Legend({
  label,
  value,
  type,
}: {
  label: string;
  value: string;
  type: string;
}) {
  return (
    <div className={styles.legend}>
      <span className={`${styles.legendDot} ${styles[type]}`} />
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function Milestone({
  title,
  status,
  percent,
  done,
  active,
}: {
  title: string;
  status: string;
  percent: string;
  done?: boolean;
  active?: boolean;
}) {
  return (
    <div className={styles.milestone}>
      <div
        className={`${styles.milestoneIcon} ${
          done
            ? styles.milestoneDone
            : active
            ? styles.milestoneActive
            : ""
        }`}
      >
        {done ? "✓" : active ? "●" : ""}
      </div>

      <strong>{title}</strong>

      <span
        className={
          done
            ? styles.milestoneCompleted
            : active
            ? styles.milestoneProgress
            : styles.milestonePending
        }
      >
        {status}
      </span>

      <small>{percent}</small>
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
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className={styles.modalHeader}>
          <h2>{title}</h2>

          <button onClick={onClose}>×</button>
        </div>

        {children}
      </div>
    </div>
  );
}