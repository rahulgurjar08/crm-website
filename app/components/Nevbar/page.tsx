"use client";

import { useState } from "react";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [search, setSearch] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className={styles.navbar}>
      <div className={styles.navLeft}>
        {/* Logo */}
        <div className={styles.logoBox}>
          <div className={styles.logoIcon}>
            <span className={styles.logoTop}></span>
            <span className={styles.logoBottom}></span>
          </div>

          <div className={styles.logoText}>
            <h2>PRISM</h2>
            <span>INFOTECH SOLUTION</span>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className={styles.searchWrapper}>
        <svg
          className={styles.searchIcon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="7"></circle>
          <path d="m20 20-4-4"></path>
        </svg>

        <input
          type="text"
          placeholder="Search anything..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Right Side */}
      <div className={styles.navRight}>
        {/* Notification */}
        <button
          className={styles.iconButton}
          onClick={() => setShowNotifications(!showNotifications)}
          aria-label="Notifications"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"></path>
            <path d="M10 21h4"></path>
          </svg>

          <span className={styles.notificationBadge}>3</span>
        </button>

        {showNotifications && (
          <div className={styles.notificationDropdown}>
            <h4>Notifications</h4>

            <div className={styles.notificationItem}>
              <strong>New Lead Added</strong>
              <span>10 minutes ago</span>
            </div>

            <div className={styles.notificationItem}>
              <strong>Payment Received</strong>
              <span>1 hour ago</span>
            </div>

            <div className={styles.notificationItem}>
              <strong>Task Completed</strong>
              <span>5 hours ago</span>
            </div>
          </div>
        )}

        {/* Dark Mode Icon */}
        <button className={styles.iconButton} aria-label="Theme">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3 6.7 6.7 0 0 0 21 12.8Z"></path>
          </svg>
        </button>

        <div className={styles.divider}></div>

        {/* Profile */}
        <div className={styles.profile}>
          <div className={styles.avatar}>VT</div>

          <div className={styles.profileInfo}>
            <strong>Vishal Thakur</strong>
            <span>Admin</span>
          </div>

          <svg
            className={styles.chevron}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="m6 9 6 6 6-6"></path>
          </svg>
        </div>
      </div>
    </header>
  );
}