"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Register.module.css";

export default function RegisterPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    company: "",
    role: "",
    country: "India",
    website: "",
    terms: false,
  });

  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target;

    const value =
      target instanceof HTMLInputElement && target.type === "checkbox"
        ? target.checked
        : target.value;

    setForm({
      ...form,
      [target.name]: value,
    });

    setError("");
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !form.fullName ||
      !form.email ||
      !form.phone ||
      !form.password ||
      !form.role ||
      !form.country
    ) {
      setError("Please fill all required fields.");
      return;
    }

    if (!form.terms) {
      setError("Please agree to the Terms & Conditions.");
      return;
    }

    // Demo account data
    localStorage.setItem(
      "registeredUser",
      JSON.stringify({
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        password: form.password,
        company: form.company,
        role: form.role,
        country: form.country,
        website: form.website,
      })
    );

    alert("Account created successfully!");

    router.push("/login");
  };

  return (
    <main className={styles.page}>
      {/* Background Shapes */}
      <div className={styles.shapeOne}></div>
      <div className={styles.shapeTwo}></div>
      <div className={styles.shapeThree}></div>

      <div className={styles.container}>
        {/* ================= LEFT SIDE ================= */}
        <section className={styles.leftSide}>
          <div className={styles.brand}>
            <div className={styles.brandLogo}>
              P
            </div>

            <div>
              <h2>PRISM</h2>
              <span>INFOTECH SOLUTION</span>
            </div>
          </div>

          <div className={styles.leftContent}>
            <h1>
              Create <span>Your Account</span>
            </h1>

            <p className={styles.intro}>
              Join Prism Infotech Solution and take the first step
              towards your digital success.
            </p>

            <div className={styles.features}>
              <div className={styles.feature}>
                <div className={`${styles.featureIcon} ${styles.blue}`}>
                  ⚡
                </div>

                <div>
                  <h3>Build Amazing Projects</h3>
                  <p>
                    Turn your ideas into powerful digital solutions.
                  </p>
                </div>
              </div>

              <div className={styles.feature}>
                <div className={`${styles.featureIcon} ${styles.purple}`}>
                  👥
                </div>

                <div>
                  <h3>Work With Expert Team</h3>
                  <p>
                    Get support from experienced professionals.
                  </p>
                </div>
              </div>

              <div className={styles.feature}>
                <div className={`${styles.featureIcon} ${styles.green}`}>
                  🛡
                </div>

                <div>
                  <h3>Secure & Reliable</h3>
                  <p>
                    Your data and privacy are always protected.
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.dashboardVisual}>
              <div className={styles.laptop}>
                <div className={styles.laptopScreen}>
                  <div className={styles.screenSidebar}>
                    <strong>PRISM</strong>

                    <span>⌂ Dashboard</span>
                    <span>▣ Projects</span>
                    <span>♙ Team</span>
                    <span>✓ Tasks</span>
                    <span>▤ Reports</span>
                  </div>

                  <div className={styles.screenContent}>
                    <div className={styles.screenTop}>
                      <strong>Dashboard</strong>
                      <span>Admin</span>
                    </div>

                    <div className={styles.stats}>
                      <div>
                        <small>Projects</small>
                        <b>12</b>
                      </div>

                      <div>
                        <small>Clients</small>
                        <b>8</b>
                      </div>

                      <div>
                        <small>Tasks</small>
                        <b>24</b>
                      </div>
                    </div>

                    <div className={styles.chart}>
                      <div className={styles.chartLine}></div>
                      <div className={styles.chartBars}>
                        <i></i>
                        <i></i>
                        <i></i>
                        <i></i>
                        <i></i>
                        <i></i>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.laptopBase}></div>
              </div>

              <div className={styles.codeBubble}>
                &lt;/&gt;
              </div>

              <div className={styles.cloudBubble}>
                ☁
              </div>

              <div className={styles.solutionBubble}>
                <strong>
                  Better
                  <br />
                  Solutions
                </strong>

                <span>Together →</span>
              </div>

              <div className={styles.plant}>
                <div className={styles.leafOne}></div>
                <div className={styles.leafTwo}></div>
                <div className={styles.leafThree}></div>
                <div className={styles.pot}></div>
              </div>
            </div>
          </div>

          <p className={styles.copyright}>
            © 2026 Prism Infotech Solution. All rights reserved.
          </p>
        </section>

        {/* ================= RIGHT SIDE ================= */}
        <section className={styles.rightSide}>
          <div className={styles.accountLink}>
            Already have an account?
            <Link href="/login">
              Sign In →
            </Link>
          </div>

          <div className={styles.formHeader}>
            <div className={styles.userIcon}>
              ♙
              <span>+</span>
            </div>

            <div>
              <h2>Create Your Account</h2>
              <p>Fill in your details to get started.</p>
            </div>
          </div>

          <form
            className={styles.form}
            onSubmit={handleSubmit}
          >
            <div className={styles.twoColumns}>
              {/* Full Name */}
              <div className={styles.inputGroup}>
                <label>
                  Full Name <span>*</span>
                </label>

                <div className={styles.inputBox}>
                  <span>♙</span>

                  <input
                    type="text"
                    name="fullName"
                    placeholder="Enter your full name"
                    value={form.fullName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Email */}
              <div className={styles.inputGroup}>
                <label>
                  Email Address <span>*</span>
                </label>

                <div className={styles.inputBox}>
                  <span>✉</span>

                  <input
                    type="email"
                    name="email"
                    placeholder="example@domain.com"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Phone */}
              <div className={styles.inputGroup}>
                <label>
                  Phone Number <span>*</span>
                </label>

                <div className={styles.inputBox}>
                  <span>⌕</span>

                  <input
                    type="tel"
                    name="phone"
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Password */}
              <div className={styles.inputGroup}>
                <label>
                  Password <span>*</span>
                </label>

                <div className={styles.inputBox}>
                  <span>🔒</span>

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={handleChange}
                  />

                  <button
                    type="button"
                    className={styles.eyeButton}
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                  >
                    {showPassword ? "◉" : "◌"}
                  </button>
                </div>
              </div>
            </div>

            {/* Company */}
            <div className={styles.inputGroup}>
              <label>
                Company Name <small>(Optional)</small>
              </label>

              <div className={styles.inputBox}>
                <span>▣</span>

                <input
                  type="text"
                  name="company"
                  placeholder="Your company name"
                  value={form.company}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Role */}
            <div className={styles.inputGroup}>
              <label>
                Role / I am a <span>*</span>
              </label>

              <div className={styles.inputBox}>
                <span>♙</span>

                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                >
                  <option value="">
                    Select your role
                  </option>
                  <option value="Admin">Admin</option>
                  <option value="Manager">Manager</option>
                  <option value="Developer">Developer</option>
                  <option value="Designer">Designer</option>
                  <option value="Business Owner">
                    Business Owner
                  </option>
                  <option value="Client">Client</option>
                  <option value="Other">Other</option>
                </select>

                <span className={styles.selectArrow}>
                 ⌄
                </span>
              </div>
            </div>

            {/* Country + Website */}
            <div className={styles.twoColumns}>
              <div className={styles.inputGroup}>
                <label>
                  Country <span>*</span>
                </label>

                <div className={styles.inputBox}>
                  <span>◎</span>

                  <select
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                  >
                    <option value="India">India</option>
                    <option value="USA">
                      United States
                    </option>
                    <option value="UK">
                      United Kingdom
                    </option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">
                      Australia
                    </option>
                  </select>

                  <span className={styles.selectArrow}>
                    ⌄
                  </span>
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label>
                  Your Website <small>(Optional)</small>
                </label>

                <div className={styles.inputBox}>
                  <span>🔗</span>

                  <input
                    type="url"
                    name="website"
                    placeholder="https://yourwebsite.com"
                    value={form.website}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Terms */}
            <label className={styles.terms}>
              <input
                type="checkbox"
                name="terms"
                checked={form.terms}
                onChange={handleChange}
              />

              <span>
                I agree to the{" "}
                <b>Terms & Conditions</b> and{" "}
                <b>Privacy Policy</b>
              </span>
            </label>

            {error && (
              <div className={styles.error}>
                {error}
              </div>
            )}

            {/* Create Account */}
            <button
              type="submit"
              className={styles.createButton}
            >
              <span>♙+</span>
              Create Account
            </button>

            {/* Divider */}
            <div className={styles.divider}>
              <span></span>
              <p>Or continue with</p>
              <span></span>
            </div>

            {/* Social */}
            <div className={styles.socialButtons}>
              <button
                type="button"
                className={styles.socialButton}
              >
                <strong className={styles.google}>
                  G
                </strong>
                Continue with Google
              </button>

              <button
                type="button"
                className={styles.socialButton}
              >
                <strong className={styles.github}>
                  ●
                </strong>
                Continue with GitHub
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}