"use client";

import Navbar from "../components/Nevbar/page";
import Sidebar from "../components/Sidebar/Sidebar";
import styles from "./Dashboard.module.css";

export default function DashboardPage() {
  return (
    <div className={styles.dashboard}>
      <Navbar />
      <Sidebar />

      <main className={styles.mainContent}>
        {/* ================= HEADER ================= */}
        <section className={styles.pageHeader}>
          <div>
            <h1>
              Welcome Back, <span>👋</span>
            </h1>
            <p>Here&apos;s what&apos;s happening with your business today.</p>
          </div>

          <div className={styles.headerActions}>
            <button className={styles.dateButton}>
              <span className={styles.calendarIcon}>▣</span>
              <span>10 Sep 2025 &nbsp;–&nbsp; 10 Sep 2025</span>
              <span className={styles.downArrow}>⌄</span>
            </button>

            <button className={styles.addLeadButton}>
              <span>＋</span>
              Add New Lead
            </button>
          </div>
        </section>

        {/* ================= STATS ================= */}
        <section className={styles.statsGrid}>
          <StatCard icon="👥" title="Total Leads" value="24" growth="12%" />
          <StatCard icon="▣" title="Total Clients" value="8" growth="25%" />
          <StatCard icon="▦" title="Follow-ups Today" value="6" growth="50%" />
          <StatCard icon="◎" title="Active Projects" value="5" growth="66%" />
          <StatCard icon="◉" title="Total Revenue" value="₹ 1,20,000" growth="40%" />
        </section>

        {/* ================= MIDDLE ROW ================= */}
        <section className={styles.middleGrid}>
          {/* SALES OVERVIEW */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardTitle}>
                <span className={styles.titleIcon}>▣</span>
                <h2>Sales Overview</h2>
              </div>

              <button className={styles.periodButton}>
                Last 7 Days <span>⌄</span>
              </button>
            </div>

            <div className={styles.salesArea}>
              <div className={styles.chartPlaceholder}>
                <div className={styles.chartYLabels}>
                  <span>1L</span>
                  <span>75k</span>
                  <span>50k</span>
                  <span>25k</span>
                  <span>0</span>
                </div>

                <div className={styles.chart}>
                  <div className={styles.gridLine}></div>
                  <div className={styles.gridLine}></div>
                  <div className={styles.gridLine}></div>
                  <div className={styles.gridLine}></div>

                  <svg
                    className={styles.lineChart}
                    viewBox="0 0 700 250"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient id="salesFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#1689ed" stopOpacity="0.18" />
                        <stop offset="100%" stopColor="#1689ed" stopOpacity="0" />
                      </linearGradient>
                    </defs>

                    <path
                      d="M0 190 C50 180 65 172 105 165 C145 158 160 140 205 145 C250 150 270 152 305 146 C345 140 360 90 405 100 C450 110 465 125 500 118 C545 110 565 45 610 55 C650 65 670 38 700 20 L700 250 L0 250 Z"
                      fill="url(#salesFill)"
                    />
                    <path
                      d="M0 190 C50 180 65 172 105 165 C145 158 160 140 205 145 C250 150 270 152 305 146 C345 140 360 90 405 100 C450 110 465 125 500 118 C545 110 565 45 610 55 C650 65 670 38 700 20"
                      fill="none"
                      stroke="#1689ed"
                      strokeWidth="3"
                    />

                    <circle cx="0" cy="190" r="4" fill="#1689ed" />
                    <circle cx="105" cy="165" r="4" fill="#1689ed" />
                    <circle cx="205" cy="145" r="4" fill="#1689ed" />
                    <circle cx="305" cy="146" r="4" fill="#1689ed" />
                    <circle cx="405" cy="100" r="4" fill="#1689ed" />
                    <circle cx="500" cy="118" r="4" fill="#1689ed" />
                    <circle cx="610" cy="55" r="4" fill="#1689ed" />
                    <circle cx="700" cy="20" r="4" fill="#1689ed" />
                  </svg>

                  <div className={styles.chartDates}>
                    <span>04 Sep</span>
                    <span>05 Sep</span>
                    <span>06 Sep</span>
                    <span>07 Sep</span>
                    <span>08 Sep</span>
                    <span>09 Sep</span>
                    <span>10 Sep</span>
                  </div>
                </div>
              </div>

              <div className={styles.salesStats}>
                <SalesStat
                  icon="▣"
                  title="Total Deals"
                  value="12"
                  growth="33%"
                  type="blue"
                />
                <SalesStat
                  icon="✓"
                  title="Won Deals"
                  value="6"
                  growth="50%"
                  type="green"
                />
                <SalesStat
                  icon="♡"
                  title="Lost Deals"
                  value="2"
                  growth="20%"
                  type="red"
                  down
                />
              </div>
            </div>
          </div>

          {/* LEAD STATUS */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardTitle}>
                <span className={styles.titleIcon}>▣</span>
                <h2>Lead Status</h2>
              </div>
              <button className={styles.viewAllButton}>View All →</button>
            </div>

            <div className={styles.leadStatusContent}>
              <div className={styles.donutWrapper}>
                <div className={styles.donut}>
                  <div className={styles.donutCenter}>
                    <strong>24</strong>
                    <span>Total Leads</span>
                  </div>
                </div>
              </div>

              <div className={styles.legend}>
                <LegendItem color="blue" name="New" count="8" percent="33%" />
                <LegendItem color="cyan" name="Contacted" count="6" percent="25%" />
                <LegendItem color="yellow" name="Interested" count="5" percent="21%" />
                <LegendItem color="purple" name="Proposal Sent" count="3" percent="12%" />
                <LegendItem color="green" name="Won" count="2" percent="9%" />
              </div>
            </div>
          </div>
        </section>

        {/* ================= BOTTOM ROW ================= */}
        <section className={styles.bottomGrid}>
          {/* RECENT LEADS */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardTitle}>
                <span className={styles.titleIcon}>♙</span>
                <h2>Recent Leads</h2>
              </div>
              <button className={styles.viewAllButton}>View All →</button>
            </div>

            <div className={styles.tableWrapper}>
              <table className={styles.leadsTable}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Company</th>
                    <th>Status</th>
                    <th>Next Follow-up</th>
                  </tr>
                </thead>
                <tbody>
                  <LeadRow
                    initials="AS"
                    name="Amit Sharma"
                    company="Smile Dental Clinic"
                    status="Interested"
                    statusType="interested"
                    follow="Today"
                    time="10:00 AM"
                  />
                  <LeadRow
                    initials="PK"
                    name="Priya Verma"
                    company="Bright Smile"
                    status="New"
                    statusType="new"
                    follow="Today"
                    time="02:30 PM"
                  />
                  <LeadRow
                    initials="RK"
                    name="Rohit Singh"
                    company="Care Dental"
                    status="Contacted"
                    statusType="contacted"
                    follow="11 Sep 2025"
                    time="11:00 AM"
                  />
                  <LeadRow
                    initials="SN"
                    name="Sneha Patel"
                    company="Dental Plus"
                    status="Proposal Sent"
                    statusType="proposal"
                    follow="12 Sep 2025"
                    time="04:00 PM"
                  />
                  <LeadRow
                    initials="VG"
                    name="Vikash Gupta"
                    company="Healthy Smiles"
                    status="Won"
                    statusType="won"
                    follow="—"
                    time=""
                  />
                </tbody>
              </table>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className={styles.rightColumn}>
            {/* UPCOMING FOLLOW-UPS */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.cardTitle}>
                  <span className={styles.titleIcon}>▣</span>
                  <h2>Upcoming Follow-ups</h2>
                </div>
                <button className={styles.viewAllButton}>View All →</button>
              </div>

              <div className={styles.followupList}>
                <Followup
                  date="10"
                  month="Sep"
                  name="Amit Sharma"
                  company="Smile Dental Clinic"
                  time="10:00 AM"
                  action="Call"
                  actionType="call"
                />
                <Followup
                  date="11"
                  month="Sep"
                  name="Priya Verma"
                  company="Bright Smile"
                  time="02:30 PM"
                  action="Email"
                  actionType="email"
                />
                <Followup
                  date="12"
                  month="Sep"
                  name="Rohit Singh"
                  company="Care Dental"
                  time="11:00 AM"
                  action="Meeting"
                  actionType="meeting"
                />
                <Followup
                  date="13"
                  month="Sep"
                  name="Sneha Patel"
                  company="Dental Plus"
                  time="04:00 PM"
                  action="Call"
                  actionType="call"
                />
              </div>
            </div>

            {/* QUICK ACTIONS */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.cardTitle}>
                  <span className={styles.titleIcon}>▣</span>
                  <h2>Quick Actions</h2>
                </div>
              </div>

              <div className={styles.quickActions}>
                <QuickAction icon="♙" text="Add Lead" />
                <QuickAction icon="♧" text="Add Client" />
                <QuickAction icon="▣" text="Create Project" />
                <QuickAction icon="▤" text="Create Invoice" />
              </div>
            </div>

            {/* RECENT ACTIVITY */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.cardTitle}>
                  <span className={styles.titleIcon}>▣</span>
                  <h2>Recent Activity</h2>
                </div>
                <button className={styles.viewAllButton}>View All →</button>
              </div>

              <div className={styles.activityList}>
                <Activity
                  icon="♙"
                  title="New lead added"
                  description="Amit Sharma from Smile Dental Clinic"
                  time="10 minutes ago"
                  type="blue"
                />
                <Activity
                  icon="▣"
                  title="Deal updated"
                  description="Bright Smile – Proposal Sent"
                  time="1 hour ago"
                  type="purple"
                />
                <Activity
                  icon="₹"
                  title="Payment received"
                  description="₹ 25,000 from Care Dental"
                  time="2 hours ago"
                  type="green"
                />
                <Activity
                  icon="▣"
                  title="Project created"
                  description="Website for Dental Plus"
                  time="3 hours ago"
                  type="blue"
                />
                <Activity
                  icon="✓"
                  title="Task completed"
                  description="Design Homepage"
                  time="5 hours ago"
                  type="green"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

/* ============================= */
/* SUB-COMPONENTS */
/* ============================= */

function StatCard({
  icon,
  title,
  value,
  growth,
}: {
  icon: string;
  title: string;
  value: string;
  growth: string;
}) {
  return (
    <div className={styles.statCard}>
      <div className={styles.statIcon}>{icon}</div>
      <div className={styles.statInfo}>
        <span>{title}</span>
        <div className={styles.statValueRow}>
          <strong>{value}</strong>
          <small>↑ {growth}</small>
        </div>
        <p>vs. last week</p>
      </div>
    </div>
  );
}

function SalesStat({
  icon,
  title,
  value,
  growth,
  type,
  down = false,
}: {
  icon: string;
  title: string;
  value: string;
  growth: string;
  type: "blue" | "green" | "red";
  down?: boolean;
}) {
  return (
    <div className={styles.salesStat}>
      <div className={`${styles.salesStatIcon} ${styles[type]}`}>{icon}</div>
      <div>
        <span>{title}</span>
        <strong>{value}</strong>
      </div>
      <small className={down ? styles.down : ""}>
        {down ? "↓" : "↑"} {growth}
      </small>
    </div>
  );
}

function LegendItem({
  color,
  name,
  count,
  percent,
}: {
  color: string;
  name: string;
  count: string;
  percent: string;
}) {
  return (
    <div className={styles.legendItem}>
      <span className={`${styles.legendDot} ${styles[color]}`}></span>
      <span className={styles.legendName}>{name}</span>
      <strong>
        {count} <small>({percent})</small>
      </strong>
    </div>
  );
}

function LeadRow({
  initials,
  name,
  company,
  status,
  statusType,
  follow,
  time,
}: {
  initials: string;
  name: string;
  company: string;
  status: string;
  statusType: string;
  follow: string;
  time: string;
}) {
  return (
    <tr>
      <td>
        <div className={styles.person}>
          <span className={styles.personAvatar}>{initials}</span>
          <div>
            <strong>{name}</strong>
          </div>
        </div>
      </td>
      <td>{company}</td>
      <td>
        <span className={`${styles.statusBadge} ${styles[statusType]}`}>
          {status}
        </span>
      </td>
      <td>
        <div className={styles.followDate}>
          <strong>{follow}</strong>
          {time && <span>{time}</span>}
        </div>
      </td>
    </tr>
  );
}

function Followup({
  date,
  month,
  name,
  company,
  time,
  action,
  actionType,
}: {
  date: string;
  month: string;
  name: string;
  company: string;
  time: string;
  action: string;
  actionType: string;
}) {
  return (
    <div className={styles.followupItem}>
      <div className={styles.followupDate}>
        <strong>{date}</strong>
        <span>{month}</span>
      </div>
      <div className={styles.followupPerson}>
        <strong>{name}</strong>
        <span>{company}</span>
      </div>
      <span className={styles.followupTime}>{time}</span>
      <button className={`${styles.followupAction} ${styles[actionType]}`}>
        {action}
      </button>
    </div>
  );
}

function QuickAction({ icon, text }: { icon: string; text: string }) {
  return (
    <button className={styles.quickAction}>
      <span>{icon}</span>
      <small>{text}</small>
    </button>
  );
}

function Activity({
  icon,
  title,
  description,
  time,
  type,
}: {
  icon: string;
  title: string;
  description: string;
  time: string;
  type: string;
}) {
  return (
    <div className={styles.activityItem}>
      <div className={`${styles.activityIcon} ${styles[type]}`}>{icon}</div>
      <div className={styles.activityText}>
        <strong>{title}</strong>
        <span>{description}</span>
      </div>
      <small>{time}</small>
    </div>
  );
}