"use client";

import { useState } from "react";
import styles from "./Settings.module.css";
import Sidebar from "../components/Sidebar/Sidebar";
import Nevbar from "../components/Nevbar/page";
type SettingTab =
  | "General"
  | "Profile"
  | "Notifications"
  | "Security"
  | "Appearance"
  | "Integrations"
  | "Data & Backup"
  | "Billing & Plan";

const tabs: {
  name: SettingTab;
  icon: string;
  description: string;
}[] = [
  {
    name: "General",
    icon: "⚙",
    description: "Basic information & preferences",
  },
  {
    name: "Profile",
    icon: "♙",
    description: "Update your personal details",
  },
  {
    name: "Notifications",
    icon: "♧",
    description: "Manage alerts & reminders",
  },
  {
    name: "Security",
    icon: "♢",
    description: "Password & two-factor auth",
  },
  {
    name: "Appearance",
    icon: "◉",
    description: "Theme & display settings",
  },
  {
    name: "Integrations",
    icon: "↗",
    description: "Connect with third-party apps",
  },
  {
    name: "Data & Backup",
    icon: "▤",
    description: "Export and backup your data",
  },
  {
    name: "Billing & Plan",
    icon: "▣",
    description: "Manage subscription & payments",
  },
];

const navItems = [
  { name: "Dashboard", icon: "⌂" },
  { name: "Leads", icon: "♙" },
  { name: "Clients", icon: "▣" },
  { name: "Follow-ups", icon: "◴" },
  { name: "Sales / Deals", icon: "≋" },
  { name: "Projects", icon: "▦" },
  { name: "Tasks", icon: "✓" },
  { name: "Invoices & Payments", icon: "▤" },
  { name: "Reports & Analytics", icon: "▥" },
  { name: "Team", icon: "♙" },
  { name: "Notifications", icon: "♧", badge: 3 },
  { name: "Settings", icon: "⚙" },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingTab>("General");
  const [mobileMenu, setMobileMenu] = useState(false);

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [desktopNotifications, setDesktopNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const [companyName, setCompanyName] = useState("Prism Infotech Solution");
  const [timezone, setTimezone] = useState("(GMT+05:30) Asia/Kolkata");
  const [language, setLanguage] = useState("English");
  const [dateFormat, setDateFormat] = useState("DD MMM YYYY");
  const [address, setAddress] = useState(
    "123 Business Park, Green City,\nIndore, Madhya Pradesh - 452001"
  );
  const [phone, setPhone] = useState("+91 9079149299");
  const [email, setEmail] = useState("contact.prisminfotech@gmail.com");
  const [website, setWebsite] = useState("https://prisminfotechsolution.com");
  const [currency, setCurrency] = useState("INR (₹)");

  const handleSave = () => {
    alert("Settings saved successfully!");
  };

  const handleReset = () => {
    setCompanyName("Prism Infotech Solution");
    setTimezone("(GMT+05:30) Asia/Kolkata");
    setLanguage("English");
    setDateFormat("DD MMM YYYY");
    setAddress(
      "123 Business Park, Green City,\nIndore, Madhya Pradesh - 452001"
    );
    setPhone("+91 9079149299");
    setEmail("contact.prisminfotech@gmail.com");
    setWebsite("https://prisminfotechsolution.com");
    setCurrency("INR (₹)");
    setEmailNotifications(true);
    setDesktopNotifications(true);
    setAutoSave(true);
    setDarkMode(false);
  };

  return (
    <div className={styles.app}>
      {/* Mobile overlay */}
      {mobileMenu && (
        <div
          className={styles.overlay}
          onClick={() => setMobileMenu(false)}
        />
      )}

      {/* ================= SIDEBAR ================= */}
    <Nevbar />

      {/* ================= MAIN ================= */}
      <main className={styles.main}>
        {/* ================= TOPBAR ================= */}
      <Sidebar />
        {/* ================= CONTENT ================= */}
        <section className={styles.content}>
          {/* Breadcrumb */}
          <div className={styles.breadcrumb}>
            <span>⌂</span>
            <span>Settings</span>
            <span>›</span>
          </div>

          {/* Page header */}
          <div className={styles.pageHeader}>
            <div className={styles.titleArea}>
              <div className={styles.titleIcon}>⚙</div>

              <div>
                <h1>Settings</h1>
                <p>
                  Manage your account preferences, system settings and more.
                </p>
              </div>
            </div>

            <div className={styles.headerButtons}>
              <button
                className={styles.saveButton}
                onClick={handleSave}
              >
                ▣ <span>Save Changes</span>
              </button>

              <button
                className={styles.resetButton}
                onClick={handleReset}
              >
                ↻ <span>Reset</span>
              </button>
            </div>
          </div>

          {/* ================= SETTINGS GRID ================= */}
          <div className={styles.settingsLayout}>
            {/* LEFT SETTINGS MENU */}
            <div className={styles.settingsMenu}>
              {tabs.map((tab) => (
                <button
                  key={tab.name}
                  className={`${styles.settingTab} ${
                    activeTab === tab.name ? styles.settingTabActive : ""
                  }`}
                  onClick={() => setActiveTab(tab.name)}
                >
                  <span className={styles.settingIcon}>{tab.icon}</span>

                  <span className={styles.settingTabText}>
                    <strong>{tab.name}</strong>
                    <small>{tab.description}</small>
                  </span>
                </button>
              ))}
            </div>

            {/* CENTER */}
            <div className={styles.centerColumn}>
              {activeTab === "General" ? (
                <GeneralSettings
                  companyName={companyName}
                  setCompanyName={setCompanyName}
                  timezone={timezone}
                  setTimezone={setTimezone}
                  language={language}
                  setLanguage={setLanguage}
                  dateFormat={dateFormat}
                  setDateFormat={setDateFormat}
                  address={address}
                  setAddress={setAddress}
                  phone={phone}
                  setPhone={setPhone}
                  email={email}
                  setEmail={setEmail}
                  website={website}
                  setWebsite={setWebsite}
                  currency={currency}
                  setCurrency={setCurrency}
                />
              ) : (
                <PlaceholderSettings title={activeTab} />
              )}
            </div>

            {/* RIGHT */}
            <div className={styles.rightColumn}>
              <div className={styles.panel}>
                <div className={styles.panelHeader}>
                  <div className={styles.panelHeaderIcon}>☷</div>

                  <div>
                    <h2>System Preferences</h2>
                    <p>Customize how your system works.</p>
                  </div>
                </div>

                <ToggleRow
                  icon="◉"
                  title="Email Notifications"
                  description="Receive email updates for important activities"
                  checked={emailNotifications}
                  onChange={() =>
                    setEmailNotifications(!emailNotifications)
                  }
                />

                <ToggleRow
                  icon="◉"
                  title="Desktop Notifications"
                  description="Get real-time notifications on your device"
                  checked={desktopNotifications}
                  onChange={() =>
                    setDesktopNotifications(!desktopNotifications)
                  }
                />

                <ToggleRow
                  icon="◉"
                  title="Auto Save"
                  description="Automatically save your changes"
                  checked={autoSave}
                  onChange={() => setAutoSave(!autoSave)}
                />

                <ToggleRow
                  icon="◷"
                  title="Dark Mode"
                  description="Enable dark theme for better experience"
                  checked={darkMode}
                  onChange={() => setDarkMode(!darkMode)}
                />
              </div>

              <div className={styles.panel}>
                <div className={styles.panelHeader}>
                  <div className={styles.panelHeaderIcon}>ϟ</div>

                  <div>
                    <h2>Quick Actions</h2>
                    <p>Manage your account quickly.</p>
                  </div>
                </div>

                <QuickAction
                  icon="♧"
                  title="Change Password"
                  description="Update your login password"
                />

                <QuickAction
                  icon="♙"
                  title="Two-Factor Authentication"
                  description="Add extra layer of security"
                />

                <QuickAction
                  icon="♧"
                  title="Delete Account"
                  description="Permanently delete your account"
                />
              </div>

              <div className={styles.secureCard}>
                <div className={styles.secureIcon}>✓</div>

                <div>
                  <strong>Your account is secure</strong>
                  <span>Last login: 10 Sep 2025, 10:42 AM</span>
                </div>

                <span className={styles.secureDot} />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

/* ================= GENERAL SETTINGS ================= */

type GeneralProps = {
  companyName: string;
  setCompanyName: (value: string) => void;
  timezone: string;
  setTimezone: (value: string) => void;
  language: string;
  setLanguage: (value: string) => void;
  dateFormat: string;
  setDateFormat: (value: string) => void;
  address: string;
  setAddress: (value: string) => void;
  phone: string;
  setPhone: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  website: string;
  setWebsite: (value: string) => void;
  currency: string;
  setCurrency: (value: string) => void;
};

function GeneralSettings({
  companyName,
  setCompanyName,
  timezone,
  setTimezone,
  language,
  setLanguage,
  dateFormat,
  setDateFormat,
  address,
  setAddress,
  phone,
  setPhone,
  email,
  setEmail,
  website,
  setWebsite,
  currency,
  setCurrency,
}: GeneralProps) {
  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <div className={styles.panelHeaderIcon}>⚙</div>

        <div>
          <h2>General Settings</h2>
          <p>
            Update your company details, time zone and system preferences.
          </p>
        </div>
      </div>

      <div className={styles.formGrid}>
        <Field
          label="Company Name"
          value={companyName}
          onChange={setCompanyName}
        />

        <SelectField
          label="Time Zone"
          value={timezone}
          onChange={setTimezone}
          options={[
            "(GMT+05:30) Asia/Kolkata",
            "(GMT+00:00) Europe/London",
            "(GMT-05:00) America/New_York",
            "(GMT+01:00) Europe/Paris",
          ]}
        />

        <SelectField
          label="Language"
          value={language}
          onChange={setLanguage}
          options={["English", "Hindi", "Spanish", "French"]}
          icon="◎"
        />

        <SelectField
          label="Date Format"
          value={dateFormat}
          onChange={setDateFormat}
          options={[
            "DD MMM YYYY",
            "MM/DD/YYYY",
            "DD/MM/YYYY",
            "YYYY-MM-DD",
          ]}
          icon="▣"
        />
      </div>

      <div className={styles.formSection}>
        <label>Company Logo</label>

        <div className={styles.logoUpload}>
          <div className={styles.logoPreview}>
            <img
              src="/Prism.jpeg"
              alt="Company Logo"
            />
          </div>

          <button className={styles.changeLogo}>
            Change Logo
          </button>

          <div className={styles.logoHint}>
            <span>Recommended size:</span>
            <strong>200 x 60 px (PNG, JPG)</strong>
          </div>
        </div>
      </div>

      <div className={styles.formSection}>
        <label>Company Address</label>

        <div className={styles.textareaWrap}>
          <span>⌂</span>

          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.formGrid}>
        <Field
          label="Phone Number"
          value={phone}
          onChange={setPhone}
          icon="⌕"
        />

        <Field
          label="Email Address"
          value={email}
          onChange={setEmail}
          icon="✉"
        />

        <Field
          label="Website"
          value={website}
          onChange={setWebsite}
          icon="↗"
        />

        <SelectField
          label="Default Currency"
          value={currency}
          onChange={setCurrency}
          options={["INR (₹)", "USD ($)", "EUR (€)", "GBP (£)"]}
          icon="₹"
        />
      </div>

      <div className={styles.infoBox}>
        <div className={styles.infoIcon}>i</div>

        <p>
          These settings will be used across your account and will be
          visible to your team and clients.
        </p>
      </div>
    </div>
  );
}

/* ================= FIELD ================= */

function Field({
  label,
  value,
  onChange,
  icon,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  icon?: string;
}) {
  return (
    <div className={styles.field}>
      <label>{label}</label>

      <div className={styles.inputWrap}>
        {icon && <span>{icon}</span>}

        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}

/* ================= SELECT ================= */

function SelectField({
  label,
  value,
  onChange,
  options,
  icon,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  icon?: string;
}) {
  return (
    <div className={styles.field}>
      <label>{label}</label>

      <div className={styles.selectWrap}>
        {icon && <span>{icon}</span>}

        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>

        <span className={styles.selectArrow}>⌄</span>
      </div>
    </div>
  );
}

/* ================= TOGGLE ================= */

function ToggleRow({
  icon,
  title,
  description,
  checked,
  onChange,
}: {
  icon: string;
  title: string;
  description: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <div className={styles.toggleRow}>
      <div className={styles.toggleIcon}>{icon}</div>

      <div className={styles.toggleText}>
        <strong>{title}</strong>
        <span>{description}</span>
      </div>

      <button
        className={`${styles.toggle} ${
          checked ? styles.toggleOn : ""
        }`}
        onClick={onChange}
        aria-label={`Toggle ${title}`}
      >
        <span />
      </button>
    </div>
  );
}

/* ================= QUICK ACTION ================= */

function QuickAction({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <button className={styles.quickAction}>
      <span className={styles.quickIcon}>{icon}</span>

      <span className={styles.quickText}>
        <strong>{title}</strong>
        <small>{description}</small>
      </span>

      <span className={styles.quickArrow}>›</span>
    </button>
  );
}

/* ================= OTHER SETTINGS ================= */

function PlaceholderSettings({ title }: { title: string }) {
  return (
    <div className={styles.panel}>
      <div className={styles.placeholder}>
        <div className={styles.placeholderIcon}>⚙</div>

        <h2>{title} Settings</h2>

        <p>
          Manage your {title.toLowerCase()} settings and preferences
          from this section.
        </p>

        <button className={styles.saveButton}>
          Save Changes
        </button>
      </div>
    </div>
  );
}