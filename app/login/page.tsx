
"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Login.module.css";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("admin@prisminfotech.com");
  const [password, setPassword] = useState("admin123");

  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      if (
        email.trim().toLowerCase() ===
          "admin@prisminfotech.com" &&
        password === "admin123"
      ) {
        if (remember) {
          localStorage.setItem("adminLoggedIn", "true");
          sessionStorage.removeItem("adminLoggedIn");
        } else {
          sessionStorage.setItem("adminLoggedIn", "true");
          localStorage.removeItem("adminLoggedIn");
        }

        router.push("/dashboard");
      } else {
        setError("Invalid email or password.");
        setLoading(false);
      }
    }, 800);
  };

  return (
    <main className={styles.page}>
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className={styles.topShape}></div>
      <div className={styles.bottomShape}></div>

      <div className={styles.container}>
        {/* =====================================================
            LEFT SIDE
        ====================================================== */}

        <section className={styles.leftSide}>
          {/* LOGO */}

          <div className={styles.logoArea}>
            <div className={styles.logoMark}>
              <span className={styles.logoTop}></span>
              <span className={styles.logoMiddle}></span>
              <span className={styles.logoBottom}></span>
            </div>

            <div className={styles.logoText}>
              <div className={styles.logoName}>
                PRISM
              </div>

              <div className={styles.logoSub}>
                <span></span>
                INFOTECH SOLUTION
                <span></span>
              </div>
            </div>
          </div>

          {/* HERO */}

          <div className={styles.heroContent}>
            <h1>
              Smarter Solutions for
              <br />
              <span>a Digital Tomorrow</span>
            </h1>

            <p>
              We build innovative web, mobile and AI
              solutions to help businesses grow,
              automate and stay ahead.
            </p>
          </div>

          {/* SERVICES */}

          <div className={styles.services}>
            {/* WEB */}

            <div className={styles.service}>
              <div className={styles.serviceIcon}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m8 9-3 3 3 3" />
                  <path d="m16 9 3 3-3 3" />
                  <path d="m14 5-4 14" />
                </svg>
              </div>

              <h3>
                Web
                <br />
                Development
              </h3>
            </div>

            {/* MOBILE */}

            <div className={styles.service}>
              <div className={styles.serviceIcon}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect
                    x="7"
                    y="2"
                    width="10"
                    height="20"
                    rx="2"
                  />
                  <path d="M11 18h2" />
                </svg>
              </div>

              <h3>
                Mobile App
                <br />
                Development
              </h3>
            </div>

            {/* AI */}

            <div className={styles.service}>
              <div className={styles.serviceIcon}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect
                    x="7"
                    y="7"
                    width="10"
                    height="10"
                    rx="2"
                  />

                  <path d="M9 2v3" />
                  <path d="M15 2v3" />

                  <path d="M9 19v3" />
                  <path d="M15 19v3" />

                  <path d="M2 9h3" />
                  <path d="M2 15h3" />

                  <path d="M19 9h3" />
                  <path d="M19 15h3" />

                  <circle cx="10" cy="11" r="1" />
                  <circle cx="14" cy="11" r="1" />

                  <path d="M10 14h4" />
                </svg>
              </div>

              <h3>
                AI & Automation
                <br />
                Solutions
              </h3>
            </div>

            {/* CLOUD */}

            <div className={styles.service}>
              <div className={styles.serviceIcon}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17.5 19H9a7 7 0 1 1 6.7-9" />
                  <path d="M16 16a4 4 0 1 1 0-8 4.2 4.2 0 0 1 4 3 3.5 3.5 0 0 1-1 6.8H16" />
                </svg>
              </div>

              <h3>
                Cloud &
                <br />
                IT Consulting
              </h3>
            </div>
          </div>

          {/* =================================================
              ILLUSTRATION
          ================================================== */}

          <div className={styles.illustrationArea}>
            {/* PLANT */}

            <div className={styles.plant}>
              <div
                className={`${styles.leaf} ${styles.leaf1}`}
              ></div>

              <div
                className={`${styles.leaf} ${styles.leaf2}`}
              ></div>

              <div
                className={`${styles.leaf} ${styles.leaf3}`}
              ></div>

              <div
                className={`${styles.leaf} ${styles.leaf4}`}
              ></div>

              <div className={styles.stem}></div>

              <div className={styles.pot}>
                <div></div>
              </div>
            </div>

            {/* LAPTOP */}

            <div className={styles.laptop}>
              <div className={styles.laptopScreen}>
                <div className={styles.browserBar}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>

                <div className={styles.dashboardMock}>
                  <aside>
                    <div className={styles.mockLogo}>
                      <b>P</b>
                      PRISM
                    </div>

                    <div
                      className={
                        styles.mockNavActive
                      }
                    >
                      <span>▦</span>
                      Dashboard
                    </div>

                    <div className={styles.mockNav}>
                      <span>♙</span>
                      Leads
                    </div>

                    <div className={styles.mockNav}>
                      <span>♙</span>
                      Clients
                    </div>

                    <div className={styles.mockNav}>
                      <span>▣</span>
                      Projects
                    </div>

                    <div className={styles.mockNav}>
                      <span>▥</span>
                      Reports
                    </div>

                    <div className={styles.mockNav}>
                      <span>⚙</span>
                      Settings
                    </div>
                  </aside>

                  <div className={styles.mockMain}>
                    <div className={styles.mockTitle}>
                      Dashboard
                    </div>

                    <div className={styles.mockStats}>
                      <div>
                        <small>Total Leads</small>
                        <b>48</b>
                      </div>

                      <div>
                        <small>Clients</small>
                        <b>24</b>
                      </div>

                      <div>
                        <small>Projects</small>
                        <b>12</b>
                      </div>
                    </div>

                    <div className={styles.mockGraph}>
                      <div
                        className={styles.graphTitle}
                      >
                        Overview
                      </div>

                      <svg
                        viewBox="0 0 300 100"
                        preserveAspectRatio="none"
                      >
                        <polyline
                          points="5,82 35,72 65,78 95,58 125,63 155,43 185,55 215,31 245,38 275,14"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>

                    <div className={styles.mockBottom}>
                      <div className={styles.donut}></div>

                      <div>
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.laptopBase}></div>
            </div>

            {/* PHONE */}

            <div className={styles.phone}>
              <div className={styles.phoneNotch}></div>

              <div className={styles.phoneScreen}>
                <div className={styles.phoneLogo}>
                  <b>P</b>
                  <span>PRISM</span>
                </div>

                <div className={styles.phoneText}>
                  INFOTECH
                  <br />
                  SOLUTION
                </div>
              </div>
            </div>
          </div>

          {/* GROWTH */}

          <div className={styles.growthText}>
            <span>Your Growth</span>
            <strong>Our Technology</strong>
            <div></div>
          </div>
        </section>

        {/* =====================================================
            RIGHT SIDE
        ====================================================== */}

        <section className={styles.rightSide}>
          <div className={styles.loginCard}>
            {/* HEADER */}

            <div className={styles.loginHeading}>
              <div className={styles.loginIcon}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="9" cy="8" r="4" />
                  <path d="M3 21a6 6 0 0 1 12 0" />
                  <path d="M19 8v6" />
                  <path d="M16 11h6" />
                </svg>
              </div>

              <h2>Welcome Back</h2>

              <p>
                Login to your Prism Infotech Solution
                account
              </p>
            </div>

            {/* FORM */}

            <form
              className={styles.form}
              onSubmit={handleLogin}
            >
              {/* EMAIL */}

              <div className={styles.inputGroup}>
                <label htmlFor="email">
                  Email Address
                </label>

                <div className={styles.inputBox}>
                  <span
                    className={styles.inputIcon}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect
                        x="3"
                        y="5"
                        width="18"
                        height="14"
                        rx="2"
                      />

                      <path d="m3 7 9 6 9-6" />
                    </svg>
                  </span>

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    placeholder="Enter email address"
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* PASSWORD */}

              <div className={styles.inputGroup}>
                <label htmlFor="password">
                  Password
                </label>

                <div className={styles.inputBox}>
                  <span
                    className={styles.inputIcon}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect
                        x="4"
                        y="10"
                        width="16"
                        height="11"
                        rx="2"
                      />

                      <path d="M8 10V7a4 4 0 0 1 8 0v3" />

                      <path d="M12 14v3" />
                    </svg>
                  </span>

                  <input
                    id="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    placeholder="Enter password"
                    autoComplete="current-password"
                  />

                  <button
                    type="button"
                    className={styles.eyeButton}
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 3l18 18" />

                        <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />

                        <path d="M9.9 4.2A10.7 10.7 0 0 1 12 4c5 0 8.7 4 10 8a12.7 12.7 0 0 1-2.1 3.8" />

                        <path d="M6.6 6.6C4.6 8 3.3 10.2 2 12c1.3 3 5 7 10 7 1 0 2-.2 2.9-.5" />
                      </svg>
                    ) : (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />

                        <circle
                          cx="12"
                          cy="12"
                          r="3"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* OPTIONS */}

              <div className={styles.options}>
                <label className={styles.remember}>
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) =>
                      setRemember(
                        e.target.checked
                      )
                    }
                  />

                  <span
                    className={styles.check}
                  ></span>

                  <span>Remember me</span>
                </label>

                <button
                  type="button"
                  className={styles.forgot}
                  onClick={() =>
                    alert(
                      "Please contact your administrator to reset your password."
                    )
                  }
                >
                  Forgot Password?
                </button>
              </div>

              {/* ERROR */}

              {error && (
                <div className={styles.error}>
                  <span>!</span>
                  {error}
                </div>
              )}

              {/* LOGIN BUTTON */}

              <button
                type="submit"
                className={styles.loginButton}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span
                      className={styles.spinner}
                    ></span>

                    Signing in...
                  </>
                ) : (
                  <>
                    <span
                      className={
                        styles.loginArrow
                      }
                    >
                      →
                    </span>

                    Login
                  </>
                )}
              </button>

              {/* OR */}

              <div className={styles.orDivider}>
                <span></span>

                <b>OR</b>

                <span></span>
              </div>

              {/* GOOGLE */}

              <button
                type="button"
                className={styles.googleButton}
                onClick={() =>
                  alert(
                    "Google login can be connected with Firebase or NextAuth."
                  )
                }
              >
                <span
                  className={styles.googleIcon}
                >
                  G
                </span>

                <span>
                  Continue with Google
                </span>
              </button>

              {/* REGISTER */}

              <div className={styles.contactText}>
                <span>
                  Don't have an account?
                </span>

                <button
                  type="button"
                  onClick={() =>
                    router.push("/register")
                  }
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}