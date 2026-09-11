"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import styles from "./Tasks.module.css";
import Sidebar from "../components/Sidebar/Sidebar";
import Nevbar from "../components/Nevbar/page";

type TaskStatus = "To Do" | "In Progress" | "In Review" | "Completed";
type Priority = "High" | "Medium" | "Low";

type Task = {
  id: number;
  title: string;
  category: string;
  member: string;
  priority: Priority;
  date: string;
  status: TaskStatus;
};

const tasks: Task[] = [
  {
    id: 1,
    title: "Design homepage UI for client",
    category: "Website Development",
    member: "AK",
    priority: "High",
    date: "10 Sep 2025",
    status: "To Do",
  },
  {
    id: 2,
    title: "Prepare project proposal",
    category: "CRM & ERP Solutions",
    member: "MS",
    priority: "Medium",
    date: "12 Sep 2025",
    status: "To Do",
  },
  {
    id: 3,
    title: "Create social media posters",
    category: "Digital Marketing",
    member: "RK",
    priority: "Low",
    date: "14 Sep 2025",
    status: "To Do",
  },
  {
    id: 4,
    title: "Update database records",
    category: "Odoo ERP Solutions",
    member: "MS",
    priority: "Medium",
    date: "15 Sep 2025",
    status: "To Do",
  },
  {
    id: 5,
    title: "Fix mobile app bugs",
    category: "Mobile App Development",
    member: "AK",
    priority: "High",
    date: "16 Sep 2025",
    status: "To Do",
  },

  {
    id: 6,
    title: "Develop API integration",
    category: "Website Development",
    member: "AK",
    priority: "High",
    date: "09 Sep 2025",
    status: "In Progress",
  },
  {
    id: 7,
    title: "UI/UX design for dashboard",
    category: "UI/UX Design",
    member: "MS",
    priority: "Medium",
    date: "11 Sep 2025",
    status: "In Progress",
  },
  {
    id: 8,
    title: "Configure CRM settings",
    category: "CRM & ERP Solutions",
    member: "RK",
    priority: "Medium",
    date: "13 Sep 2025",
    status: "In Progress",
  },
  {
    id: 9,
    title: "Write content for website",
    category: "Digital Marketing",
    member: "MS",
    priority: "Low",
    date: "15 Sep 2025",
    status: "In Progress",
  },
  {
    id: 10,
    title: "Blockchain smart contract",
    category: "Blockchain Technology",
    member: "AK",
    priority: "High",
    date: "17 Sep 2025",
    status: "In Progress",
  },

  {
    id: 11,
    title: "Logo design & branding",
    category: "Logo & Branding",
    member: "AS",
    priority: "Medium",
    date: "08 Sep 2025",
    status: "In Review",
  },
  {
    id: 12,
    title: "AI Chatbot integration",
    category: "AI Chatbots",
    member: "AK",
    priority: "High",
    date: "10 Sep 2025",
    status: "In Review",
  },
  {
    id: 13,
    title: "ERP module testing",
    category: "Odoo ERP Solutions",
    member: "AS",
    priority: "Medium",
    date: "12 Sep 2025",
    status: "In Review",
  },
  {
    id: 14,
    title: "SEO optimization",
    category: "Digital Marketing",
    member: "AK",
    priority: "Low",
    date: "14 Sep 2025",
    status: "In Review",
  },
  {
    id: 15,
    title: "Cloud server configuration",
    category: "Devops / Cloud Computing",
    member: "AK",
    priority: "Medium",
    date: "16 Sep 2025",
    status: "In Review",
  },

  {
    id: 16,
    title: "Website UI/UX Design",
    category: "Website Development",
    member: "AS",
    priority: "Medium",
    date: "05 Sep 2025",
    status: "Completed",
  },
  {
    id: 17,
    title: "Mobile app wireframes",
    category: "Mobile App Development",
    member: "AK",
    priority: "Low",
    date: "06 Sep 2025",
    status: "Completed",
  },
  {
    id: 18,
    title: "Client meeting & discussion",
    category: "CRM & ERP Solutions",
    member: "AS",
    priority: "Medium",
    date: "04 Sep 2025",
    status: "Completed",
  },
  {
    id: 19,
    title: "Database optimization",
    category: "Odoo ERP Solutions",
    member: "AK",
    priority: "Low",
    date: "03 Sep 2025",
    status: "Completed",
  },
  {
    id: 20,
    title: "Branding materials",
    category: "Logo & Branding",
    member: "MS",
    priority: "Medium",
    date: "02 Sep 2025",
    status: "Completed",
  },
];



const priorityClass = (priority: Priority) => {
  if (priority === "High") return styles.high;
  if (priority === "Medium") return styles.medium;
  return styles.low;
};

export default function TasksPage() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [member, setMember] = useState("All Members");
  const [priority, setPriority] = useState("All Priorities");
  const [status, setStatus] = useState("All Status");
  const [search, setSearch] = useState("");
  const [taskList, setTaskList] = useState(tasks);

  const filteredTasks = useMemo(() => {
    return taskList.filter((task) => {
      const searchMatch =
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.category.toLowerCase().includes(search.toLowerCase());

      const priorityMatch =
        priority === "All Priorities" || task.priority === priority;

      const statusMatch =
        status === "All Status" || task.status === status;

      return searchMatch && priorityMatch && statusMatch;
    });
  }, [taskList, search, priority, status]);

  const groupedTasks = (taskStatus: TaskStatus) =>
    filteredTasks.filter((task) => task.status === taskStatus);

  const addTask = (status: TaskStatus) => {
    const newTask: Task = {
      id: Date.now(),
      title: "New project task",
      category: "Website Development",
      member: "AK",
      priority: "Medium",
      date: "18 Sep 2025",
      status,
    };

    setTaskList((prev) => [...prev, newTask]);
  };

  return (
    <main className={styles.app}>
      {/* SIDEBAR */}
    <Nevbar />

      {/* MAIN AREA */}
      <section className={styles.main}>
        {/* TOP NAVBAR */}
        <Sidebar />

        {/* CONTENT */}
        <div className={styles.content}>
          {/* BREADCRUMB */}
          <div className={styles.breadcrumb}>
            <span>⌂</span>
            <span>Dashboard</span>
            <b>›</b>
            <strong>Tasks</strong>
          </div>

          {/* PAGE HEADING */}
          <div className={styles.pageHeading}>
            <div className={styles.titleArea}>
              <div className={styles.titleIcon}>✓</div>

              <div>
                <h1>Tasks</h1>
                <p>
                  Manage your tasks, track progress and never miss a deadline.
                </p>
              </div>
            </div>

            <div className={styles.filters}>
              <select
                value={member}
                onChange={(e) => setMember(e.target.value)}
              >
                <option>All Members</option>
                <option>Vishal Thakur</option>
                <option>Rahul</option>
                <option>Admin</option>
              </select>

              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option>All Priorities</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option>All Status</option>
                <option>To Do</option>
                <option>In Progress</option>
                <option>In Review</option>
                <option>Completed</option>
              </select>

              <button
                type="button"
                className={styles.addTaskBtn}
                onClick={() => addTask("To Do")}
              >
                <span>＋</span>
                Add Task
              </button>
            </div>
          </div>

          {/* STAT CARDS */}
          <div className={styles.statsGrid}>
            <div className={`${styles.statCard} ${styles.statBlue}`}>
              <div className={styles.statIcon}>✓</div>
              <div>
                <span>Total Tasks</span>
                <strong>24</strong>
                <small className={styles.greenText}>↑ 12%</small>
                <em>vs. last month</em>
              </div>
            </div>

            <div className={`${styles.statCard} ${styles.statGreen}`}>
              <div className={styles.statIcon}>✓</div>
              <div>
                <span>Completed</span>
                <strong>14</strong>
                <small className={styles.greenText}>↑ 18%</small>
                <em>vs. last month</em>
              </div>
            </div>

            <div className={`${styles.statCard} ${styles.statYellow}`}>
              <div className={styles.statIcon}>◫</div>
              <div>
                <span>In Progress</span>
                <strong>6</strong>
                <small className={styles.greenText}>↑ 25%</small>
                <em>vs. last month</em>
              </div>
            </div>

            <div className={`${styles.statCard} ${styles.statRed}`}>
              <div className={styles.statIcon}>◷</div>
              <div>
                <span>Overdue</span>
                <strong>4</strong>
                <small className={styles.redText}>↓ 50%</small>
                <em>vs. last month</em>
              </div>
            </div>
          </div>

          {/* DASHBOARD BODY */}
          <div className={styles.dashboardGrid}>
            {/* TASK BOARD */}
            <div className={styles.board}>
              <TaskColumn
                title="To Do"
                count={8}
                icon="▣"
                tasks={groupedTasks("To Do")}
                columnClass={styles.todo}
                onAdd={() => addTask("To Do")}
              />

              <TaskColumn
                title="In Progress"
                count={6}
                icon="⚑"
                tasks={groupedTasks("In Progress")}
                columnClass={styles.progress}
                onAdd={() => addTask("In Progress")}
              />

              <TaskColumn
                title="In Review"
                count={5}
                icon="♧"
                tasks={groupedTasks("In Review")}
                columnClass={styles.review}
                onAdd={() => addTask("In Review")}
              />

              <TaskColumn
                title="Completed"
                count={14}
                icon="✓"
                tasks={groupedTasks("Completed")}
                columnClass={styles.completed}
                onAdd={() => addTask("Completed")}
              />
            </div>

            {/* RIGHT SIDEBAR */}
            <aside className={styles.rightPanel}>
              {/* UPCOMING TASKS */}
              <div className={styles.sideCard}>
                <div className={styles.sideTitle}>
                  <h3>
                    <span>▣</span> Upcoming Tasks
                  </h3>
                  <button type="button">View All →</button>
                </div>

                <div className={styles.calendar}>
                  <div className={styles.calendarHeader}>
                    <strong>September 2025</strong>
                    <span>›</span>
                  </div>

                  <div className={styles.weekDays}>
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                      (day) => (
                        <span key={day}>{day}</span>
                      )
                    )}
                  </div>

                  <div className={styles.calendarDays}>
                    {Array.from({ length: 30 }, (_, i) => i + 1).map(
                      (day) => (
                        <span
                          key={day}
                          className={
                            day === 10
                              ? styles.selectedDay
                              : day === 3 || day === 9 || day === 16
                              ? styles.dotDay
                              : ""
                          }
                        >
                          {day}
                        </span>
                      )
                    )}
                  </div>
                </div>

                <div className={styles.todayTitle}>
                  Today's Tasks (4)
                </div>

                <div className={styles.todayTasks}>
                  <TodayTask
                    color="red"
                    title="Develop API integration"
                    priority="High"
                    time="09:00 AM"
                  />

                  <TodayTask
                    color="red"
                    title="Prepare project proposal"
                    priority="Medium"
                    time="11:30 AM"
                  />

                  <TodayTask
                    color="yellow"
                    title="UI/UX design for dashboard"
                    priority="Medium"
                    time="02:00 PM"
                  />

                  <TodayTask
                    color="green"
                    title="Write content for website"
                    priority="Low"
                    time="04:30 PM"
                  />
                </div>
              </div>

              {/* PRIORITY */}
              <div className={styles.sideCard}>
                <div className={styles.sideTitle}>
                  <h3>Task Priority</h3>
                  <button type="button">View All →</button>
                </div>

                <div className={styles.priorityContent}>
                  <div className={styles.donut}>
                    <div>
                      <strong>24</strong>
                      <span>Total Tasks</span>
                    </div>
                  </div>

                  <div className={styles.priorityLegend}>
                    <div>
                      <span className={`${styles.legendDot} ${styles.dotRed}`} />
                      <b>High</b>
                      <strong>8 (33%)</strong>
                    </div>

                    <div>
                      <span
                        className={`${styles.legendDot} ${styles.dotYellow}`}
                      />
                      <b>Medium</b>
                      <strong>10 (42%)</strong>
                    </div>

                    <div>
                      <span
                        className={`${styles.legendDot} ${styles.dotGreen}`}
                      />
                      <b>Low</b>
                      <strong>6 (25%)</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* BOTTOM PROMO */}
              <div className={styles.promoCard}>
                <div className={styles.promoIcon}>◉</div>
                <h3>Small Steps</h3>
                <h4>Big Results</h4>
                <p>Great goals are closer than you think.</p>
                <button type="button" onClick={() => addTask("To Do")}>
                  Add New Task →
                </button>

                <div className={styles.promoShape}>↗</div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}

/* TASK COLUMN */

function TaskColumn({
  title,
  count,
  icon,
  tasks,
  columnClass,
  onAdd,
}: {
  title: string;
  count: number;
  icon: string;
  tasks: Task[];
  columnClass: string;
  onAdd: () => void;
}) {
  return (
    <div className={`${styles.taskColumn} ${columnClass}`}>
      <div className={styles.columnHeader}>
        <div>
          <span className={styles.columnIcon}>{icon}</span>
          <strong>{title}</strong>
        </div>
        <span className={styles.columnCount}>{count}</span>
      </div>

      <div className={styles.taskList}>
        {tasks.map((task) => (
          <div className={styles.taskCard} key={task.id}>
            <button className={styles.moreBtn} type="button">
              ⋮
            </button>

            <h4>{task.title}</h4>
            <p>{task.category}</p>

            <div className={styles.taskBottom}>
              <div className={styles.avatar}>{task.member}</div>

              <span className={`${styles.priority} ${priorityClass(task.priority)}`}>
                {task.priority}
              </span>

              <span className={styles.taskDate}>
                ▣ {task.date}
              </span>
            </div>
          </div>
        ))}
      </div>

      <button type="button" className={styles.newTaskBtn} onClick={onAdd}>
        ＋ Add New Task
      </button>
    </div>
  );
}

/* TODAY TASK */

function TodayTask({
  color,
  title,
  priority,
  time,
}: {
  color: "red" | "yellow" | "green";
  title: string;
  priority: Priority;
  time: string;
}) {
  return (
    <div className={styles.todayTask}>
      <span
        className={`${styles.todayDot} ${
          color === "red"
            ? styles.todayRed
            : color === "yellow"
            ? styles.todayYellow
            : styles.todayGreen
        }`}
      />

      <div className={styles.todayTaskInfo}>
        <strong>{title}</strong>
        <div>
          <span className={`${styles.priority} ${priorityClass(priority)}`}>
            {priority}
          </span>
          <span className={styles.smallChain}>↗</span>
        </div>
      </div>

      <time>{time}</time>
    </div>
  );
}