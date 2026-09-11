"use client";

import { useMemo, useState } from "react";
import styles from "./Team.module.css";

import Navbar from "../components/Nevbar/page";
import Sidebar from "../components/Sidebar/Sidebar";

type Member = {
  id: number;
  name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  status: "Online" | "Offline" | "Busy";
  image: string;
};

const members: Member[] = [
  {
    id: 1,
    name: "Vishal Thakur",
    role: "Founder & CEO",
    department: "Management",
    email: "vishal@prisminfotechsolution.com",
    phone: "+91 98765 43210",
    status: "Online",
    image: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: 2,
    name: "Amit Sharma",
    role: "Backend Developer",
    department: "Development",
    email: "amit@prisminfotechsolution.com",
    phone: "+91 87654 32109",
    status: "Online",
    image: "https://i.pravatar.cc/150?img=11",
  },
  {
    id: 3,
    name: "Pooja Khandelwal",
    role: "Frontend Developer",
    department: "Development",
    email: "pooja@prisminfotechsolution.com",
    phone: "+91 76543 21098",
    status: "Busy",
    image: "https://i.pravatar.cc/150?img=47",
  },
  {
    id: 4,
    name: "Rohit Verma",
    role: "UI/UX Designer",
    department: "Design",
    email: "rohit@prisminfotechsolution.com",
    phone: "+91 65432 10987",
    status: "Online",
    image: "https://i.pravatar.cc/150?img=13",
  },
  {
    id: 5,
    name: "Neha Patel",
    role: "Digital Marketer",
    department: "Marketing",
    email: "neha@prisminfotechsolution.com",
    phone: "+91 54321 09876",
    status: "Online",
    image: "https://i.pravatar.cc/150?img=45",
  },
  {
    id: 6,
    name: "Sandeep Yadav",
    role: "Full Stack Developer",
    department: "Development",
    email: "sandeep@prisminfotechsolution.com",
    phone: "+91 43210 98765",
    status: "Offline",
    image: "https://i.pravatar.cc/150?img=68",
  },
  {
    id: 7,
    name: "Sneha Singh",
    role: "Content Writer",
    department: "Marketing",
    email: "sneha@prisminfotechsolution.com",
    phone: "+91 32109 87654",
    status: "Online",
    image: "https://i.pravatar.cc/150?img=48",
  },
  {
    id: 8,
    name: "Karan Mehta",
    role: "DevOps Engineer",
    department: "Development",
    email: "karan@prisminfotechsolution.com",
    phone: "+91 21098 76543",
    status: "Busy",
    image: "https://i.pravatar.cc/150?img=14",
  },
  {
    id: 9,
    name: "Ravi Kumar",
    role: "Business Development",
    department: "Sales",
    email: "ravi@prisminfotechsolution.com",
    phone: "+91 10987 65432",
    status: "Online",
    image: "https://i.pravatar.cc/150?img=15",
  },
  {
    id: 10,
    name: "Anjali Sharma",
    role: "QA Tester",
    department: "Quality Assurance",
    email: "anjali@prisminfotechsolution.com",
    phone: "+91 99887 65432",
    status: "Online",
    image: "https://i.pravatar.cc/150?img=44",
  },
  {
    id: 11,
    name: "Imran Khan",
    role: "Mobile App Developer",
    department: "Development",
    email: "imran@prisminfotechsolution.com",
    phone: "+91 88776 54321",
    status: "Offline",
    image: "https://i.pravatar.cc/150?img=53",
  },
  {
    id: 12,
    name: "Kavita Joshi",
    role: "HR Manager",
    department: "Human Resources",
    email: "kavita@prisminfotechsolution.com",
    phone: "+91 77665 43210",
    status: "Online",
    image: "https://i.pravatar.cc/150?img=49",
  },
];

const tabs = [
  { name: "All Members", count: 12 },
  { name: "Developers", count: 6 },
  { name: "Designers", count: 2 },
  { name: "Marketing", count: 2 },
  { name: "Management", count: 2 },
];

const departments = [
  {
    name: "Development",
    count: 6,
    icon: "◉",
    type: "blue",
  },
  {
    name: "Design",
    count: 2,
    icon: "✣",
    type: "orange",
  },
  {
    name: "Marketing",
    count: 2,
    icon: "◌",
    type: "teal",
  },
  {
    name: "Management",
    count: 2,
    icon: "♙",
    type: "purple",
  },
];

function MemberCard({ member }: { member: Member }) {
  const statusClass =
    member.status === "Online"
      ? styles.online
      : member.status === "Busy"
      ? styles.busy
      : styles.offline;

  const dotClass =
    member.status === "Online"
      ? styles.dotOnline
      : member.status === "Busy"
      ? styles.dotBusy
      : styles.dotOffline;

  return (
    <article className={styles.memberCard}>
      <div className={styles.memberTop}>
        <div className={styles.avatarWrap}>
          <img
            src={member.image}
            alt={member.name}
            className={styles.avatar}
          />

          <span className={`${styles.statusDot} ${dotClass}`} />
        </div>

        <span className={`${styles.statusBadge} ${statusClass}`}>
          ● {member.status}
        </span>

        <button className={styles.moreButton}>⋮</button>
      </div>

      <div className={styles.memberInfo}>
        <h3>{member.name}</h3>

        <p className={styles.role}>{member.role}</p>

        <p className={styles.department}>
          <span>▣</span>
          {member.department}
        </p>

        <a
          href={`mailto:${member.email}`}
          className={styles.contact}
        >
          <span>✉</span>
          {member.email}
        </a>

        <a
          href={`tel:${member.phone}`}
          className={styles.contact}
        >
          <span>⌕</span>
          {member.phone}
        </a>
      </div>

      <div className={styles.memberBottom}>
        <div className={styles.cardMiniActions}>
          <button title="Message">◉</button>
          <button title="Calendar">▣</button>
        </div>

        <button className={styles.viewProfile}>
          View Profile
          <b>→</b>
        </button>
      </div>
    </article>
  );
}

function Activity({
  image,
  name,
  text,
  time,
}: {
  image: string;
  name: string;
  text: string;
  time: string;
}) {
  return (
    <div className={styles.activityItem}>
      <img src={image} alt={name} />

      <div>
        <strong>{name}</strong>
        <p>{text}</p>
        <small>{time}</small>
      </div>
    </div>
  );
}

export default function TeamPage() {
  const [activeTab, setActiveTab] =
    useState("All Members");

  const [search, setSearch] = useState("");

  const [department, setDepartment] =
    useState("All Departments");

  const [role, setRole] =
    useState("All Roles");

  const [view, setView] =
    useState<"grid" | "list">("grid");

  const filteredMembers = useMemo(() => {
    let result = [...members];

    if (activeTab === "Developers") {
      result = result.filter(
        (member) =>
          member.role
            .toLowerCase()
            .includes("developer") ||
          member.role
            .toLowerCase()
            .includes("devops")
      );
    }

    if (activeTab === "Designers") {
      result = result.filter(
        (member) =>
          member.department === "Design"
      );
    }

    if (activeTab === "Marketing") {
      result = result.filter(
        (member) =>
          member.department === "Marketing"
      );
    }

    if (activeTab === "Management") {
      result = result.filter(
        (member) =>
          member.department === "Management"
      );
    }

    if (search.trim()) {
      const q = search.toLowerCase();

      result = result.filter(
        (member) =>
          member.name
            .toLowerCase()
            .includes(q) ||
          member.role
            .toLowerCase()
            .includes(q) ||
          member.department
            .toLowerCase()
            .includes(q)
      );
    }

    if (department !== "All Departments") {
      result = result.filter(
        (member) =>
          member.department === department
      );
    }

    if (role !== "All Roles") {
      result = result.filter(
        (member) => member.role === role
      );
    }

    return result;
  }, [
    activeTab,
    search,
    department,
    role,
  ]);

  return (
    <div className={styles.app}>
      {/* EXISTING SIDEBAR */}
      <Sidebar  />

      {/* EXISTING NAVBAR */}
      <Navbar />

      <main className={styles.mainContent}>
        <div className={styles.breadcrumb}>
          <span>♧</span>
          <span>Dashboard</span>
          <b>›</b>
          <strong>Team</strong>
        </div>

        <section className={styles.pageHeader}>
          <div className={styles.titleArea}>
            <div className={styles.titleIcon}>
              ♧
            </div>

            <div>
              <h1>Team</h1>

              <p>
                Meet our talented team members who
                make Prism Infotech Solution happen.
              </p>
            </div>
          </div>

          <button className={styles.addMemberButton}>
            <span>＋</span>
            Add Team Member
          </button>
        </section>

        <div className={styles.contentLayout}>
          <section className={styles.centerContent}>
            <div className={styles.teamCard}>
              <div className={styles.tabs}>
                {tabs.map((tab) => (
                  <button
                    key={tab.name}
                    onClick={() =>
                      setActiveTab(tab.name)
                    }
                    className={
                      activeTab === tab.name
                        ? styles.activeTab
                        : ""
                    }
                  >
                    {tab.name} ({tab.count})
                  </button>
                ))}
              </div>

              <div className={styles.filters}>
                <div className={styles.memberSearch}>
                  <span>⌕</span>

                  <input
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                    placeholder="Search by name, role, or department..."
                  />
                </div>

                <select
                  value={department}
                  onChange={(e) =>
                    setDepartment(e.target.value)
                  }
                >
                  <option>
                    All Departments
                  </option>
                  <option>Development</option>
                  <option>Design</option>
                  <option>Marketing</option>
                  <option>Management</option>
                  <option>Sales</option>
                  <option>
                    Quality Assurance
                  </option>
                  <option>
                    Human Resources
                  </option>
                </select>

                <select
                  value={role}
                  onChange={(e) =>
                    setRole(e.target.value)
                  }
                >
                  <option>All Roles</option>
                  <option>Founder & CEO</option>
                  <option>Backend Developer</option>
                  <option>Frontend Developer</option>
                  <option>UI/UX Designer</option>
                  <option>Digital Marketer</option>
                  <option>
                    Full Stack Developer
                  </option>
                  <option>Content Writer</option>
                  <option>DevOps Engineer</option>
                  <option>
                    Business Development
                  </option>
                  <option>QA Tester</option>
                  <option>
                    Mobile App Developer
                  </option>
                  <option>HR Manager</option>
                </select>

                <div className={styles.viewButtons}>
                  <button
                    onClick={() =>
                      setView("grid")
                    }
                    className={
                      view === "grid"
                        ? styles.selectedView
                        : ""
                    }
                  >
                    ▦
                  </button>

                  <button
                    onClick={() =>
                      setView("list")
                    }
                    className={
                      view === "list"
                        ? styles.selectedView
                        : ""
                    }
                  >
                    ☷
                  </button>
                </div>
              </div>
            </div>

            <div
              className={`${styles.memberGrid} ${
                view === "list"
                  ? styles.listView
                  : ""
              }`}
            >
              {filteredMembers.map((member) => (
                <MemberCard
                  key={member.id}
                  member={member}
                />
              ))}
            </div>

            {filteredMembers.length === 0 && (
              <div className={styles.emptyState}>
                <div>⌕</div>
                <h3>No team members found</h3>
                <p>
                  Try changing your search or filter
                  options.
                </p>
              </div>
            )}
          </section>

          {/* RIGHT SIDEBAR */}
          <aside className={styles.rightSidebar}>
            {/* TEAM OVERVIEW */}
            <div className={styles.rightCard}>
              <div className={styles.rightCardTitle}>
                <span>♧</span>
                <h2>Team Overview</h2>
              </div>

              <div className={styles.totalMembers}>
                <div className={styles.bigTeamIcon}>
                  ♧
                </div>

                <div>
                  <strong>12</strong>
                  <span>Total Members</span>
                </div>
              </div>

              <div className={styles.overviewGrid}>
                <div>
                  <i className={styles.oBlue}>
                    ♙
                  </i>
                  <strong>6</strong>
                  <span>Developers</span>
                </div>

                <div>
                  <i className={styles.oPurple}>
                    ✣
                  </i>
                  <strong>2</strong>
                  <span>Designers</span>
                </div>

                <div>
                  <i className={styles.oOrange}>
                    ▧
                  </i>
                  <strong>2</strong>
                  <span>Marketing</span>
                </div>

                <div>
                  <i className={styles.oBlue}>
                    ♙
                  </i>
                  <strong>2</strong>
                  <span>Management</span>
                </div>
              </div>
            </div>

            {/* DEPARTMENTS */}
            <div className={styles.rightCard}>
              <div className={styles.rightCardTitle}>
                <span>▦</span>
                <h2>Departments</h2>
              </div>

              <div className={styles.departmentList}>
                {departments.map((item) => (
                  <div key={item.name}>
                    <span
                      className={`${styles.departmentIcon} ${
                        styles[item.type as keyof typeof styles]
                      }`}
                    >
                      {item.icon}
                    </span>

                    <p>{item.name}</p>

                    <b>{item.count}</b>
                  </div>
                ))}
              </div>
            </div>

            {/* RECENT ACTIVITY */}
            <div className={styles.rightCard}>
              <div className={styles.activityHeader}>
                <div
                  className={
                    styles.rightCardTitle
                  }
                >
                  <span>♧</span>
                  <h2>Recent Activity</h2>
                </div>

                <button>
                  View All →
                </button>
              </div>

              <div className={styles.activities}>
                <Activity
                  image="https://i.pravatar.cc/80?img=11"
                  name="Amit Sharma"
                  text="Joined the team"
                  time="2 days ago"
                />

                <Activity
                  image="https://i.pravatar.cc/80?img=47"
                  name="Pooja Khandelwal"
                  text="Updated profile"
                  time="3 days ago"
                />

                <Activity
                  image="https://i.pravatar.cc/80?img=14"
                  name="Karan Mehta"
                  text="Changed role to DevOps Engineer"
                  time="5 days ago"
                />

                <Activity
                  image="https://i.pravatar.cc/80?img=45"
                  name="Neha Patel"
                  text="Completed project task"
                  time="6 days ago"
                />
              </div>
            </div>

            {/* GREAT TEAM BANNER */}
            <div className={styles.greatBanner}>
              <div className={styles.greatIcon}>
                ♧
              </div>

              <h3>
                Great Teams Build
                <br />
                Great Products
              </h3>

              <p>
                Happy team = Successful project
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}