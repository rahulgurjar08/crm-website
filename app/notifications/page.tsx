"use client";

import { useMemo, useState } from "react";
import styles from "./Notifications.module.css";
import Sidebar from "../components/Sidebar/Sidebar";
import Nevbar from "../components/Nevbar/page";
type NotificationType =
  | "lead"
  | "client"
  | "project"
  | "task"
  | "payment"
  | "team"
  | "followup"
  | "system";

type NotificationItem = {
  id: number;
  type: NotificationType;
  title: string;
  description: string;
  tag: string;
  time: string;
  unread: boolean;
};

const notificationsData: NotificationItem[] = [
  {
    id: 1,
    type: "lead",
    title: "New Lead Received",
    description:
      "Rahul Sharma from Bright Future School submitted a lead form.",
    tag: "Lead",
    time: "2 hours ago",
    unread: true,
  },
  {
    id: 2,
    type: "client",
    title: "Client Message",
    description:
      "Amit Kumar (Nature's Care) sent a message: “Please share the latest proposal...”",
    tag: "Client",
    time: "4 hours ago",
    unread: true,
  },
  {
    id: 3,
    type: "project",
    title: "Project Updated",
    description: "School ERP System status changed to In Progress.",
    tag: "Project",
    time: "5 hours ago",
    unread: true,
  },
  {
    id: 4,
    type: "task",
    title: "Task Completed",
    description: "Design of Landing Page has been completed by Rohan Mehta.",
    tag: "Task",
    time: "7 hours ago",
    unread: false,
  },
  {
    id: 5,
    type: "payment",
    title: "Payment Received",
    description:
      "₹25,000 received from Bright Future School (Invoice #IN-0014).",
    tag: "Payment",
    time: "9 hours ago",
    unread: false,
  },
  {
    id: 6,
    type: "team",
    title: "Team Member Joined",
    description:
      "Sneha Singh has joined the team as Content Writer.",
    tag: "Team",
    time: "12 hours ago",
    unread: false,
  },
  {
    id: 7,
    type: "followup",
    title: "Follow-up Reminder",
    description: "Follow up with Royal Traders (in 1 day).",
    tag: "Follow-up",
    time: "1 day ago",
    unread: false,
  },
  {
    id: 8,
    type: "lead",
    title: "New Lead Received",
    description: "Pooja Verma from Urban Cafe submitted a lead form.",
    tag: "Lead",
    time: "1 day ago",
    unread: false,
  },
  {
    id: 9,
    type: "system",
    title: "System Update",
    description: "New feature 'Reports & Analytics' is now available.",
    tag: "System",
    time: "2 days ago",
    unread: false,
  },
  {
    id: 10,
    type: "project",
    title: "Project Deadline Approaching",
    description: "Website Redesign is due in 2 days (12 Sep 2025).",
    tag: "Project",
    time: "2 days ago",
    unread: false,
  },
  {
    id: 11,
    type: "task",
    title: "Task Assigned",
    description: "New dashboard task has been assigned to you.",
    tag: "Task",
    time: "3 days ago",
    unread: false,
  },
  {
    id: 12,
    type: "client",
    title: "Client Follow-up",
    description: "A client follow-up has been scheduled.",
    tag: "Client",
    time: "3 days ago",
    unread: false,
  },
];



const tabs = [
  { key: "all", label: "All", count: 12 },
  { key: "unread", label: "Unread", count: 3 },
  { key: "lead", label: "Leads", count: 4 },
  { key: "client", label: "Clients", count: 2 },
  { key: "project", label: "Projects", count: 2 },
  { key: "task", label: "Tasks", count: 1 },
  { key: "system", label: "System", count: 0 },
];

function NotificationIcon({ type }: { type: NotificationType }) {
  const iconMap: Record<NotificationType, string> = {
    lead: "♙",
    client: "▱",
    project: "</>",
    task: "✓",
    payment: "▤",
    team: "♙",
    followup: "▣",
    system: "➤",
  };

  return (
    <div className={`${styles.notificationIcon} ${styles[type]}`}>
      {iconMap[type]}
    </div>
  );
}

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [mobileSidebar, setMobileSidebar] = useState(false);
  const [notifications, setNotifications] =
    useState<NotificationItem[]>(notificationsData);
  const [search, setSearch] = useState("");

  const unreadCount = notifications.filter((item) => item.unread).length;

  const filteredNotifications = useMemo(() => {
    let result = [...notifications];

    if (activeTab === "unread") {
      result = result.filter((item) => item.unread);
    } else if (
      ["lead", "client", "project", "task", "system"].includes(activeTab)
    ) {
      result = result.filter((item) => item.type === activeTab);
    }

    if (search.trim()) {
      const query = search.toLowerCase();

      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.tag.toLowerCase().includes(query)
      );
    }

    return result;
  }, [activeTab, notifications, search]);

  const markAllRead = () => {
    setNotifications((prev) =>
      prev.map((item) => ({
        ...item,
        unread: false,
      }))
    );
  };

  const markSingleRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              unread: false,
            }
          : item
      )
    );
  };

  return (
    <div className={styles.app}>
      {/* MOBILE OVERLAY */}
      {mobileSidebar && (
        <div
          className={styles.overlay}
          onClick={() => setMobileSidebar(false)}
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <Nevbar />

      {/* ================= MAIN ================= */}
      <main className={styles.main}>
        {/* TOP NAVBAR */}
      <Sidebar />

        <div className={styles.content}>
          {/* ================= PAGE HEADER ================= */}
          <section className={styles.pageHeader}>
            <div>
              <div className={styles.breadcrumb}>
                <span>⌂</span>
                <span>Dashboard</span>
                <b>›</b>
                <strong>Notifications</strong>
              </div>

              <div className={styles.titleRow}>
                <div className={styles.titleBell}>♧</div>

                <div>
                  <h1>Notifications</h1>
                  <p>
                    Stay updated with the latest activities, updates and
                    important alerts from your business.
                  </p>
                </div>
              </div>
            </div>

            <button
              className={styles.markAllButton}
              onClick={markAllRead}
            >
              <span>✓</span>
              Mark All as Read
            </button>
          </section>

          {/* ================= PAGE GRID ================= */}
          <div className={styles.pageGrid}>
            {/* ================= NOTIFICATIONS PANEL ================= */}
            <section className={styles.notificationsPanel}>
              {/* TABS */}
              <div className={styles.tabs}>
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    className={`${styles.tab} ${
                      activeTab === tab.key ? styles.tabActive : ""
                    }`}
                    onClick={() => setActiveTab(tab.key)}
                  >
                    {tab.label} ({tab.count})
                  </button>
                ))}
              </div>

              {/* LIST */}
              <div className={styles.notificationList}>
                {filteredNotifications.length === 0 ? (
                  <div className={styles.emptyState}>
                    <div>♧</div>
                    <h3>No notifications found</h3>
                    <p>Try another category or search term.</p>
                  </div>
                ) : (
                  filteredNotifications.map((item) => (
                    <article
                      key={item.id}
                      className={`${styles.notificationRow} ${
                        item.unread ? styles.unreadRow : ""
                      }`}
                    >
                      <div className={styles.statusDot}>
                        {item.unread && <span />}
                      </div>

                      <NotificationIcon type={item.type} />

                      <div className={styles.notificationContent}>
                        <h3>{item.title}</h3>

                        <p>{item.description}</p>

                        <span
                          className={`${styles.tag} ${
                            styles[`tag_${item.type}`]
                          }`}
                        >
                          {item.tag}
                        </span>
                      </div>

                      <div className={styles.notificationMeta}>
                        <span className={styles.time}>{item.time}</span>

                        <span
                          className={`${styles.readStatus} ${
                            item.unread
                              ? styles.unreadStatus
                              : styles.readStatusGreen
                          }`}
                        >
                          {item.unread ? "Unread" : "Read"}
                        </span>

                        <button
                          className={styles.moreButton}
                          onClick={() => markSingleRead(item.id)}
                          title="Mark as read"
                        >
                          ⋮
                        </button>
                      </div>
                    </article>
                  ))
                )}
              </div>

              {/* FOOTER */}
              <div className={styles.paginationArea}>
                <span>
                  Showing 1 to {Math.min(filteredNotifications.length, 10)}{" "}
                  of {filteredNotifications.length} notifications
                </span>

                <div className={styles.pagination}>
                  <button>‹</button>
                  <button className={styles.currentPage}>1</button>
                  <button>2</button>
                  <button>›</button>
                </div>
              </div>
            </section>

            {/* ================= RIGHT SIDEBAR ================= */}
            <aside className={styles.rightSidebar}>
              {/* SUMMARY */}
              <section className={styles.summaryCard}>
                <h2>
                  <span>♧</span>
                  Notification Summary
                </h2>

                <div className={styles.summaryGrid}>
                  <div className={`${styles.summaryBox} ${styles.blueBox}`}>
                    <span className={styles.summaryIcon}>▣</span>
                    <strong>12</strong>
                    <small>Total Notifications</small>
                  </div>

                  <div className={`${styles.summaryBox} ${styles.redBox}`}>
                    <span className={styles.summaryIcon}>▣</span>
                    <strong>{unreadCount}</strong>
                    <small>Unread</small>
                  </div>

                  <div className={`${styles.summaryBox} ${styles.greenBox}`}>
                    <span className={styles.summaryIcon}>♧</span>
                    <strong>4</strong>
                    <small>Leads</small>
                  </div>

                  <div className={`${styles.summaryBox} ${styles.purpleBox}`}>
                    <span className={styles.summaryIcon}>⌘</span>
                    <strong>2</strong>
                    <small>Projects</small>
                  </div>
                </div>
              </section>

              {/* RECENT */}
              <section className={styles.recentCard}>
                <div className={styles.recentHeader}>
                  <h2>
                    <span>◷</span>
                    Recent Notifications
                  </h2>

                  <button>View All →</button>
                </div>

                <div className={styles.recentList}>
                  {notifications.slice(0, 5).map((item) => (
                    <div className={styles.recentItem} key={item.id}>
                      <div
                        className={`${styles.recentDot} ${
                          styles[`dot_${item.type}`]
                        }`}
                      />

                      <NotificationIcon type={item.type} />

                      <div>
                        <h4>{item.title}</h4>
                        <p>{item.description}</p>
                        <span>{item.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* BLUE CTA */}
              <section className={styles.ctaCard}>
                <div className={styles.ctaText}>
                  <h2>
                    Never Miss
                    <br />
                    Important Updates!
                  </h2>

                  <p>
                    Keep your business running smoothly with real-time
                    notifications.
                  </p>

                  <button
                    onClick={() =>
                      setActiveTab("all")
                    }
                  >
                    Check All Notifications
                    <span>→</span>
                  </button>
                </div>

                <div className={styles.paperPlane}>➤</div>
              </section>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}