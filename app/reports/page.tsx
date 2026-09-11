"use client";

import Navbar from "../components/Nevbar/page";
import Sidebar from "../components/Sidebar/Sidebar";
import styles from "./Reports.module.css";

const stats = [
  {
    title: "Total Revenue",
    value: "₹ 1,48,250",
    change: "18%",
    icon: "↗",
    type: "green",
  },
  {
    title: "Total Deals",
    value: "18",
    change: "25%",
    icon: "▣",
    type: "purple",
  },
  {
    title: "New Clients",
    value: "12",
    change: "33%",
    icon: "♙",
    type: "blue",
  },
  {
    title: "Total Leads",
    value: "32",
    change: "12%",
    icon: "▤",
    type: "orange",
  },
  {
    title: "Follow-ups",
    value: "24",
    change: "20%",
    icon: "◷",
    type: "red",
  },
];

export default function ReportsPage() {
  return (
    <div className={styles.app}>
      <Navbar />

      <div className={styles.dashboardLayout}>
        <Sidebar />

        <main className={styles.mainContent}>
          {/* ================= BREADCRUMB ================= */}
          <div className={styles.breadcrumb}>
            <span>⌂</span>
            <span>Dashboard</span>
            <b>›</b>
            <strong>Reports</strong>
          </div>

          {/* ================= PAGE HEADER ================= */}
          <div className={styles.pageHeader}>
            <div className={styles.headingArea}>
              <div className={styles.headingIcon}>▥</div>

              <div>
                <h1>Reports &amp; Analytics</h1>
                <p>
                  Get detailed insights into your business performance,
                  sales, clients, and activities.
                </p>
              </div>
            </div>

            <div className={styles.headerActions}>
              <button className={styles.filterButton}>
                <span>▣</span>
                10 Sep 2025 - 10 Oct 2025
                <b>⌄</b>
              </button>

              <button className={styles.filterButton}>
                All Team Members
                <b>⌄</b>
              </button>

              <button className={styles.filterButton}>
                All Sources
                <b>⌄</b>
              </button>

              <button className={styles.exportButton}>
                ↓
                <span>Export Report</span>
              </button>
            </div>
          </div>

          {/* ================= STAT CARDS ================= */}
          <div className={styles.statsGrid}>
            {stats.map((item) => (
              <div className={styles.statCard} key={item.title}>
                <div
                  className={`${styles.statIcon} ${styles[item.type]}`}
                >
                  {item.icon}
                </div>

                <div className={styles.statInfo}>
                  <span className={styles.statTitle}>
                    {item.title}
                  </span>

                  <div className={styles.statValueRow}>
                    <strong>{item.value}</strong>
                    <em>↑ {item.change}</em>
                  </div>

                  <small>vs. last month</small>
                </div>
              </div>
            ))}
          </div>

          {/* ================= FIRST ROW ================= */}
          <div className={styles.firstAnalyticsGrid}>
            {/* Revenue */}
            <section className={`${styles.card} ${styles.revenueCard}`}>
              <div className={styles.cardHeader}>
                <h2>
                  <span>▥</span>
                  Revenue Overview
                </h2>

                <button>This Month⌄</button>
              </div>

              <div className={styles.revenueBody}>
                <div className={styles.yLabels}>
                  <span>₹ 2,00,000</span>
                  <span>₹ 1,50,000</span>
                  <span>₹ 1,00,000</span>
                  <span>₹ 50,000</span>
                  <span>₹ 0</span>
                </div>

                <div className={styles.revenueGraph}>
                  <div className={styles.horizontalLine}></div>
                  <div className={styles.horizontalLine}></div>
                  <div className={styles.horizontalLine}></div>
                  <div className={styles.horizontalLine}></div>
                  <div className={styles.horizontalLine}></div>

                  <svg
                    viewBox="0 0 900 270"
                    preserveAspectRatio="none"
                    className={styles.revenueSvg}
                  >
                    <defs>
                      <linearGradient
                        id="revenueFill"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="#1688ed"
                          stopOpacity="0.20"
                        />
                        <stop
                          offset="100%"
                          stopColor="#1688ed"
                          stopOpacity="0"
                        />
                      </linearGradient>

                      <linearGradient
                        id="lastFill"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="#20bd88"
                          stopOpacity="0.12"
                        />
                        <stop
                          offset="100%"
                          stopColor="#20bd88"
                          stopOpacity="0"
                        />
                      </linearGradient>
                    </defs>

                    <path
                      d="
                        M0 224
                        C25 216 45 191 70 203
                        C95 215 105 192 130 180
                        C155 168 172 183 195 170
                        C220 156 230 131 255 139
                        C280 146 300 126 325 139
                        C350 153 355 188 385 181
                        C410 175 418 153 445 155
                        C470 157 488 119 515 103
                        C540 88 562 115 586 108
                        C610 101 630 128 655 109
                        C680 90 683 62 710 70
                        C735 77 755 61 780 72
                        C805 83 813 113 838 101
                        C860 91 879 65 900 50
                        L900 270
                        L0 270 Z
                      "
                      fill="url(#revenueFill)"
                    />

                    <path
                      d="
                        M0 224
                        C25 216 45 191 70 203
                        C95 215 105 192 130 180
                        C155 168 172 183 195 170
                        C220 156 230 131 255 139
                        C280 146 300 126 325 139
                        C350 153 355 188 385 181
                        C410 175 418 153 445 155
                        C470 157 488 119 515 103
                        C540 88 562 115 586 108
                        C610 101 630 128 655 109
                        C680 90 683 62 710 70
                        C735 77 755 61 780 72
                        C805 83 813 113 838 101
                        C860 91 879 65 900 50
                      "
                      fill="none"
                      stroke="#1688ed"
                      strokeWidth="4"
                      vectorEffect="non-scaling-stroke"
                    />

                    <path
                      d="
                        M0 221
                        C28 206 49 188 73 196
                        C99 204 110 183 135 177
                        C160 171 176 188 199 173
                        C222 158 245 157 267 163
                        C290 169 306 151 330 160
                        C355 169 367 181 392 169
                        C418 157 435 141 461 147
                        C485 152 506 134 531 137
                        C556 140 574 124 600 128
                        C625 132 642 108 667 115
                        C692 122 710 103 733 107
                        C758 111 778 126 802 117
                        C830 106 860 88 900 79
                      "
                      fill="url(#lastFill)"
                    />

                    <path
                      d="
                        M0 221
                        C28 206 49 188 73 196
                        C99 204 110 183 135 177
                        C160 171 176 188 199 173
                        C222 158 245 157 267 163
                        C290 169 306 151 330 160
                        C355 169 367 181 392 169
                        C418 157 435 141 461 147
                        C485 152 506 134 531 137
                        C556 140 574 124 600 128
                        C625 132 642 108 667 115
                        C692 122 710 103 733 107
                        C758 111 778 126 802 117
                        C830 106 860 88 900 79
                      "
                      fill="none"
                      stroke="#20bd88"
                      strokeWidth="4"
                      vectorEffect="non-scaling-stroke"
                    />

                    <circle
                      cx="710"
                      cy="70"
                      r="7"
                      fill="#fff"
                      stroke="#1688ed"
                      strokeWidth="4"
                    />
                  </svg>

                  <div className={styles.chartTooltip}>
                    <strong>₹ 1,48,250</strong>
                    <span>04 Oct 2025</span>
                  </div>

                  <div className={styles.xLabels}>
                    <span>10 Sep</span>
                    <span>12 Sep</span>
                    <span>14 Sep</span>
                    <span>16 Sep</span>
                    <span>18 Sep</span>
                    <span>20 Sep</span>
                    <span>22 Sep</span>
                    <span>24 Sep</span>
                    <span>26 Sep</span>
                    <span>28 Sep</span>
                    <span>30 Sep</span>
                    <span>02 Oct</span>
                    <span>04 Oct</span>
                    <span>06 Oct</span>
                    <span>08 Oct</span>
                    <span>10 Oct</span>
                  </div>
                </div>
              </div>

              <div className={styles.chartLegend}>
                <span>
                  <i className={styles.blueDot}></i>
                  Revenue
                </span>

                <span>
                  <i className={styles.greenDot}></i>
                  Last Month
                </span>
              </div>
            </section>

            {/* Lead Sources */}
            <section className={`${styles.card} ${styles.leadCard}`}>
              <div className={styles.cardHeader}>
                <h2>
                  <span>◉</span>
                  Lead Sources
                </h2>

                <button>This Month⌄</button>
              </div>

              <div className={styles.leadContent}>
                <div className={styles.donut}>
                  <div className={styles.donutCenter}>
                    <strong>32</strong>
                    <span>Total Leads</span>
                  </div>
                </div>

                <div className={styles.leadLegend}>
                  <div>
                    <i className={styles.website}></i>
                    <span>Website</span>
                    <b>40% (13)</b>
                  </div>

                  <div>
                    <i className={styles.social}></i>
                    <span>Social Media</span>
                    <b>22% (7)</b>
                  </div>

                  <div>
                    <i className={styles.referral}></i>
                    <span>Referral</span>
                    <b>16% (5)</b>
                  </div>

                  <div>
                    <i className={styles.cold}></i>
                    <span>Cold Call</span>
                    <b>13% (4)</b>
                  </div>

                  <div>
                    <i className={styles.other}></i>
                    <span>Other</span>
                    <b>9% (3)</b>
                  </div>
                </div>
              </div>
            </section>

            {/* Quick Filters */}
            <aside className={`${styles.card} ${styles.quickCard}`}>
              <div className={styles.cardHeader}>
                <h2>
                  <span>⌯</span>
                  Quick Filters
                </h2>
              </div>

              <div className={styles.filterFields}>
                <label>
                  Report Type
                  <select defaultValue="all">
                    <option value="all">All Reports</option>
                    <option>Sales Reports</option>
                    <option>Lead Reports</option>
                    <option>Client Reports</option>
                  </select>
                </label>

                <label>
                  Date Range
                  <select defaultValue="30">
                    <option value="30">Last 30 Days</option>
                    <option>Last 7 Days</option>
                    <option>Last 90 Days</option>
                    <option>This Year</option>
                  </select>
                </label>

                <label>
                  Team Member
                  <select defaultValue="all">
                    <option value="all">All Members</option>
                    <option>Admin</option>
                    <option>Sales Team</option>
                    <option>Project Team</option>
                  </select>
                </label>

                <label>
                  Client
                  <select defaultValue="all">
                    <option value="all">All Clients</option>
                    <option>Bright Future School</option>
                    <option>ABC Mart</option>
                    <option>Nature's Care</option>
                  </select>
                </label>

                <button className={styles.generateButton}>
                  ▥ Generate Report
                </button>
              </div>
            </aside>
          </div>

          {/* ================= SECOND ROW ================= */}
          <div className={styles.secondAnalyticsGrid}>
            {/* Pipeline */}
            <section className={`${styles.card} ${styles.pipelineCard}`}>
              <div className={styles.cardHeader}>
                <h2>
                  <span>⌯</span>
                  Sales Pipeline
                </h2>

                <button>This Month⌄</button>
              </div>

              <div className={styles.pipelineContent}>
                <div className={styles.pipelineList}>
                  <div className={styles.pipelineRow}>
                    <span className={`${styles.pipe} ${styles.pipe1}`}>
                      Leads
                    </span>
                    <span>Leads</span>
                    <b>22 (100%)</b>
                  </div>

                  <div className={styles.pipelineRow}>
                    <span className={`${styles.pipe} ${styles.pipe2}`}>
                      Contacted
                    </span>
                    <span>Contacted</span>
                    <b>24 (75%)</b>
                  </div>

                  <div className={styles.pipelineRow}>
                    <span className={`${styles.pipe} ${styles.pipe3}`}>
                      Qualified
                    </span>
                    <span>Qualified</span>
                    <b>16 (50%)</b>
                  </div>

                  <div className={styles.pipelineRow}>
                    <span className={`${styles.pipe} ${styles.pipe4}`}>
                      Proposal
                    </span>
                    <span>Proposal</span>
                    <b>10 (31%)</b>
                  </div>

                  <div className={styles.pipelineRow}>
                    <span className={`${styles.pipe} ${styles.pipe5}`}>
                      Won
                    </span>
                    <span>Won</span>
                    <b>6 (19%)</b>
                  </div>
                </div>

                <div className={styles.conversion}>
                  <span>Conversion Rate</span>

                  <div className={styles.conversionCircle}>
                    <div>19%</div>
                  </div>

                  <small>Lead to Won</small>
                </div>
              </div>
            </section>

            {/* Deals */}
            <section className={`${styles.card} ${styles.dealsCard}`}>
              <div className={styles.cardHeader}>
                <h2>
                  <span>◷</span>
                  Deals by Status
                </h2>

                <button>This Month⌄</button>
              </div>

              <div className={styles.dealsChart}>
                <div className={styles.dealGrid}></div>
                <div className={styles.dealGrid}></div>
                <div className={styles.dealGrid}></div>
                <div className={styles.dealGrid}></div>

                <div className={styles.yDealLabels}>
                  <span>15</span>
                  <span>10</span>
                  <span>5</span>
                  <span>0</span>
                </div>

                <div className={styles.bars}>
                  <div className={styles.barItem}>
                    <div
                      className={`${styles.bar} ${styles.greenBar}`}
                      style={{ height: "43px" }}
                    >
                      <span>6</span>
                    </div>
                    <small>Won</small>
                  </div>

                  <div className={styles.barItem}>
                    <div
                      className={`${styles.bar} ${styles.blueBar}`}
                      style={{ height: "69px" }}
                    >
                      <span>10</span>
                    </div>
                    <small>In Progress</small>
                  </div>

                  <div className={styles.barItem}>
                    <div
                      className={`${styles.bar} ${styles.orangeBar}`}
                      style={{ height: "28px" }}
                    >
                      <span>4</span>
                    </div>
                    <small>Negotiation</small>
                  </div>

                  <div className={styles.barItem}>
                    <div
                      className={`${styles.bar} ${styles.redBar}`}
                      style={{ height: "17px" }}
                    >
                      <span>2</span>
                    </div>
                    <small>Lost</small>
                  </div>
                </div>
              </div>
            </section>

            {/* Growth */}
            <section className={`${styles.card} ${styles.clientGrowthCard}`}>
              <div className={styles.cardHeader}>
                <h2>
                  <span>♧</span>
                  Client Growth
                </h2>

                <button>Last 6 Months⌄</button>
              </div>

              <div className={styles.growthChart}>
                <div className={styles.growthNumbers}>
                  <span>40</span>
                  <span>30</span>
                  <span>20</span>
                  <span>10</span>
                  <span>0</span>
                </div>

                <div className={styles.growthGraph}>
                  <div className={styles.growthGrid}></div>
                  <div className={styles.growthGrid}></div>
                  <div className={styles.growthGrid}></div>
                  <div className={styles.growthGrid}></div>

                  <svg
                    viewBox="0 0 600 200"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="
                        M0 172
                        C60 160 95 145 145 138
                        C195 131 218 118 270 120
                        C320 122 346 105 390 96
                        C440 86 465 67 510 63
                        C548 59 565 41 600 24
                        L600 200
                        L0 200 Z
                      "
                      fill="rgba(22,136,237,.12)"
                    />

                    <path
                      d="
                        M0 172
                        C60 160 95 145 145 138
                        C195 131 218 118 270 120
                        C320 122 346 105 390 96
                        C440 86 465 67 510 63
                        C548 59 565 41 600 24
                      "
                      fill="none"
                      stroke="#1688ed"
                      strokeWidth="4"
                      vectorEffect="non-scaling-stroke"
                    />

                    <circle cx="0" cy="172" r="5" fill="#1688ed" />
                    <circle cx="120" cy="141" r="5" fill="#1688ed" />
                    <circle cx="240" cy="119" r="5" fill="#1688ed" />
                    <circle cx="360" cy="102" r="5" fill="#1688ed" />
                    <circle cx="480" cy="68" r="5" fill="#1688ed" />
                    <circle cx="600" cy="24" r="5" fill="#1688ed" />
                  </svg>

                  <div className={styles.monthLabels}>
                    <span>Apr</span>
                    <span>May</span>
                    <span>Jun</span>
                    <span>Jul</span>
                    <span>Aug</span>
                    <span>Sep</span>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* ================= BOTTOM ================= */}
          <div className={styles.bottomGrid}>
            {/* Projects */}
            <section className={`${styles.card} ${styles.projectsCard}`}>
              <div className={styles.cardHeader}>
                <h2>
                  <span>▣</span>
                  Top Performing Projects
                </h2>

                <button>View All →</button>
              </div>

              <div className={styles.tableWrapper}>
                <table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Project Name</th>
                      <th>Client</th>
                      <th>Revenue</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>School ERP System</td>
                      <td>Bright Future School</td>
                      <td>₹ 25,000</td>
                      <td>
                        <span className={styles.completed}>
                          Completed
                        </span>
                      </td>
                    </tr>

                    <tr>
                      <td>2</td>
                      <td>E-commerce App</td>
                      <td>ABC Mart</td>
                      <td>₹ 18,500</td>
                      <td>
                        <span className={styles.inProgress}>
                          In Progress
                        </span>
                      </td>
                    </tr>

                    <tr>
                      <td>3</td>
                      <td>Website Redesign</td>
                      <td>Nature's Care</td>
                      <td>₹ 16,000</td>
                      <td>
                        <span className={styles.completed}>
                          Completed
                        </span>
                      </td>
                    </tr>

                    <tr>
                      <td>4</td>
                      <td>CRM Solution</td>
                      <td>Royal Traders</td>
                      <td>₹ 12,000</td>
                      <td>
                        <span className={styles.inProgress}>
                          In Progress
                        </span>
                      </td>
                    </tr>

                    <tr>
                      <td>5</td>
                      <td>Mobile App Development</td>
                      <td>FitLife Fitness</td>
                      <td>₹ 10,500</td>
                      <td>
                        <span className={styles.pending}>
                          Pending
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Activities */}
            <section className={`${styles.card} ${styles.activitiesCard}`}>
              <div className={styles.cardHeader}>
                <h2>
                  <span>♧</span>
                  Recent Activities
                </h2>

                <button>View All →</button>
              </div>

              <div className={styles.activityList}>
                <div className={styles.activity}>
                  <div className={`${styles.activityIcon} ${styles.aBlue}`}>
                    ▣
                  </div>

                  <div>
                    <p>
                      New lead added - <b>Amit Sharma</b> (Dental Clinic)
                    </p>
                    <small>2 hours ago</small>
                  </div>
                </div>

                <div className={styles.activity}>
                  <div
                    className={`${styles.activityIcon} ${styles.aGreen}`}
                  >
                    ✓
                  </div>

                  <div>
                    <p>
                      Deal won - <b>Bright Future School</b>
                    </p>
                    <small>4 hours ago</small>
                  </div>
                </div>

                <div className={styles.activity}>
                  <div className={`${styles.activityIcon} ${styles.aBlue}`}>
                    ▣
                  </div>

                  <div>
                    <p>
                      Invoice generated - <b>INV-0014</b>
                    </p>
                    <small>5 hours ago</small>
                  </div>
                </div>

                <div className={styles.activity}>
                  <div className={`${styles.activityIcon} ${styles.aRed}`}>
                    ◷
                  </div>

                  <div>
                    <p>
                      Follow-up done - <b>Pooja Khandelwal</b>
                    </p>
                    <small>6 hours ago</small>
                  </div>
                </div>

                <div className={styles.activity}>
                  <div
                    className={`${styles.activityIcon} ${styles.aPurple}`}
                  >
                    ▣
                  </div>

                  <div>
                    <p>
                      New client added - <b>Nature's Care</b>
                    </p>
                    <small>1 day ago</small>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* ================= GROWTH BANNER ================= */}
          <section className={styles.growthBanner}>
            <div className={styles.bannerImage}>
              <div className={styles.bannerBars}>
                <span></span>
                <span></span>
                <span></span>
              </div>

              <div className={styles.bannerArrow}>↗</div>
              <div className={styles.bannerTarget}>◎</div>
            </div>

            <div className={styles.bannerContent}>
              <small>BUSINESS INSIGHTS</small>

              <h2>Turn Your Data Into Business Growth</h2>

              <p>
                Track performance, find opportunities, and make smarter
                decisions.
              </p>

              <button>View Detailed Reports →</button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}