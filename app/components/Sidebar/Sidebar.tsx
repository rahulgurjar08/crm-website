"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./Sidebar.module.css";

type MenuItem = {
  name: string;
  href: string;
  icon: string;
  badge?: number;
};

const menuItems: MenuItem[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: "dashboard",
  },
  {
    name: "Leads",
    href: "/leads",
    icon: "leads",
  },
  {
    name: "Clients",
    href: "/clients",
    icon: "clients",
  },
  {
    name: "Follow-ups",
    href: "/follow-ups",
    icon: "followups",
  },
  {
    name: "Sales / Deals",
    href: "/sales",
    icon: "sales",
  },
  {
    name: "Projects",
    href: "/projects",
    icon: "projects",
  },
  {
    name: "Tasks",
    href: "/tasks",
    icon: "tasks",
  },
  {
    name: "Invoices & Payments",
    href: "/invoices",
    icon: "invoices",
  },
  {
    name: "Reports & Analytics",
    href: "/reports",
    icon: "reports",
  },
  {
    name: "Team",
    href: "/team",
    icon: "team",
  },
  {
    name: "Notifications",
    href: "/notifications",
    icon: "notifications",
    badge: 3,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: "settings",
  },
];

function MenuIcon({ type }: { type: string }) {
  const commonProps = {
    width: 21,
    height: 21,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (type) {
    case "dashboard":
      return (
        <svg {...commonProps}>
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      );

    case "leads":
      return (
        <svg {...commonProps}>
          <circle cx="9" cy="8" r="3" />
          <path d="M3 20c0-3.3 2.7-5 6-5s6 1.7 6 5" />
          <path d="M16 5.5c.6-.3 1.2-.5 2-.5 2.2 0 4 1.8 4 4" />
          <path d="M17 15c2.5.4 4 2 4 5" />
        </svg>
      );

    case "clients":
      return (
        <svg {...commonProps}>
          <rect x="4" y="4" width="16" height="16" rx="3" />
          <circle cx="12" cy="9" r="2.5" />
          <path d="M8 17c.8-2 2.1-3 4-3s3.2 1 4 3" />
        </svg>
      );

    case "followups":
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 7v5l3 2" />
          <path d="M17.5 4.5 20 3l-.5 3" />
        </svg>
      );

    case "sales":
      return (
        <svg {...commonProps}>
          <path d="M4 5h12a2 2 0 0 1 2 2v4H6a2 2 0 0 0 0 4h12" />
          <path d="M6 15h13a1 1 0 0 0 1-1V7" />
          <circle cx="8" cy="12" r="1" />
        </svg>
      );

    case "projects":
      return (
        <svg {...commonProps}>
          <path d="M4 7h5l2 2h9v10H4z" />
          <path d="M4 7V5h6l2 2" />
        </svg>
      );

    case "tasks":
      return (
        <svg {...commonProps}>
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <path d="m8 12 2.5 2.5L16 9" />
        </svg>
      );

    case "invoices":
      return (
        <svg {...commonProps}>
          <path d="M6 3h12v18l-3-2-3 2-3-2-3 2z" />
          <path d="M9 8h6M9 12h6M9 16h3" />
        </svg>
      );

    case "reports":
      return (
        <svg {...commonProps}>
          <path d="M4 20V10" />
          <path d="M10 20V4" />
          <path d="M16 20v-7" />
          <path d="M22 20H2" />
        </svg>
      );

    case "team":
      return (
        <svg {...commonProps}>
          <circle cx="9" cy="8" r="3" />
          <circle cx="17" cy="9" r="2.5" />
          <path d="M3 20c0-3.5 2.5-5 6-5s6 1.5 6 5" />
          <path d="M15 15c3.2.2 5 1.7 5 5" />
        </svg>
      );

    case "notifications":
      return (
        <svg {...commonProps}>
          <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
          <path d="M10 21h4" />
        </svg>
      );

    case "settings":
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.8 1.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5v.1h-2.6v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1-1.8-1.8.1-.1A1.7 1.7 0 0 0 8 15a1.7 1.7 0 0 0-1.5-1H6.4v-2.6h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1 1.8-1.8.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.5v-.1h2.6v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.8 1.8-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.1V14h-.1a1.7 1.7 0 0 0-1.5 1z" />
        </svg>
      );

    default:
      return null;
  }
}

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.menuArea}>
        <nav className={styles.navigation}>
          {menuItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" &&
                pathname.startsWith(item.href));

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`${styles.menuItem} ${
                  isActive ? styles.active : ""
                }`}
              >
                <span className={styles.menuIcon}>
                  <MenuIcon type={item.icon} />
                </span>

                <span className={styles.menuText}>
                  {item.name}
                </span>

                {item.badge && (
                  <span className={styles.menuBadge}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Area */}
      <div className={styles.bottomArea}>

        {/* ADMIN BUTTON */}
        <Link
          href="/admin/login"
          className={`${styles.adminButton} ${
            pathname === "/admin" ? styles.adminButtonActive : ""
          }`}
        >
          <span className={styles.adminIcon}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2l2.2 4.6L19 8l-3.5 3.4.8 4.8L12 14l-4.3 2.2.8-4.8L5 8l4.8-1.4L12 2z" />
              <path d="M6 19h12" />
              <path d="M9 22h6" />
            </svg>
          </span>

          <span className={styles.adminText}>
            Admin
          </span>

          <span className={styles.adminArrow}>
            →
          </span>
        </Link>

        {/* Promotional Card */}
        <div className={styles.promoCard}>
          <div className={styles.promoLogo}>
            <span></span>
            <span></span>
          </div>

          <h3>
            Grow Your Business
            <br />
            With Technology
          </h3>

          <p>
            We build innovative web, mobile
            <br />
            and AI solutions.
          </p>

          <button
            type="button"
            className={styles.promoButton}
            aria-label="Learn more"
          >
            →
          </button>
        </div>

        {/* Copyright */}
        <div className={styles.copyright}>
          <span>© 2026 Prism Infotech Solution</span>
          <span>All rights reserved.</span>
        </div>
      </div>
    </aside>
  );
}