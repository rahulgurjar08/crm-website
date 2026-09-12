"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [search, setSearch] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setShowProfileMenu(false);
      }
    }
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); // Empty array is best here to avoid re-binding

  const handleProfileClick = () => {
    setShowProfileMenu((prev) => !prev);
    setShowNotifications(false);
  };

  const handleNotificationClick = () => {
    setShowNotifications((prev) => !prev);
    setShowProfileMenu(false);
  };

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
    document.body.classList.toggle("dark-mode");
  };

  return (
    <header className={styles.navbar}>
      {/* Left Logo */}
      <div className={styles.navLeft}>
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

      {/* Search Bar */}
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

      {/* Right Side Actions */}
      <div className={styles.navRight}>
        {/* Notification Container */}
        <div className={styles.dropdownContainer} ref={notificationRef}>
          <button
            className={styles.iconButton}
            onClick={handleNotificationClick}
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
        </div>

        {/* Dark Mode Toggle */}
        <button
          className={styles.iconButton}
          onClick={toggleTheme}
          aria-label="Theme"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            {isDarkMode ? (
              <>
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </>
            ) : (
              <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3 6.7 6.7 0 0 0 21 12.8Z"></path>
            )}
          </svg>
        </button>

        <div className={styles.divider}></div>

        {/* Admin Profile & Dropdown */}
        <div className={styles.dropdownContainer} ref={profileRef}>
          <div className={styles.profile} onClick={handleProfileClick}>
            <div className={styles.avatar}>VT</div>

            <div className={styles.profileInfo}>
              <strong>Vishal Thakur</strong>
              <span>Admin</span>
            </div>

            <svg
              className={`${styles.chevron} ${
                showProfileMenu ? styles.rotateChevron : ""
              }`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="m6 9 6 6 6-6"></path>
            </svg>
          </div>

          {/* Profile Dropdown Menu */}
          {showProfileMenu && (
            <div className={styles.profileDropdown}>
              <div className={styles.profileHeader}>
                <p className={styles.userName}>Vishal Thakur</p>
                <p className={styles.userRole}>Administrator</p>
              </div>

              <div className={styles.dropdownDivider}></div>

              <a href="#profile" className={styles.menuItem}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                My Profile
              </a>

              <a href="#settings" className={styles.menuItem}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                </svg>
                Settings
              </a>

              <div className={styles.dropdownDivider}></div>

              <button className={`${styles.menuItem} ${styles.logoutBtn}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}