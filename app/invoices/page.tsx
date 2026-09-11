"use client";

import { useMemo, useState } from "react";
import styles from "./Invoices.module.css";

import Navbar from "../components/Nevbar/page";
import Sidebar from "../components/Sidebar/Sidebar";

type InvoiceStatus = "Paid" | "Pending" | "Overdue";

type Invoice = {
  id: string;
  client: string;
  category: string;
  initials: string;
  amount: number;
  issueDate: string;
  dueDate: string;
  status: InvoiceStatus;
  phone: string;
  email: string;
};

const invoices: Invoice[] = [
  {
    id: "IN-0014",
    client: "Bright Future School",
    category: "Education",
    initials: "BF",
    amount: 25000,
    issueDate: "05 Sep 2025",
    dueDate: "15 Sep 2025",
    status: "Paid",
    phone: "+91 98765 43210",
    email: "info@brightfuture.edu",
  },
  {
    id: "IN-0013",
    client: "Nature's Care",
    category: "Healthcare",
    initials: "NC",
    amount: 18500,
    issueDate: "04 Sep 2025",
    dueDate: "14 Sep 2025",
    status: "Paid",
    phone: "+91 98765 43120",
    email: "hello@naturescare.com",
  },
  {
    id: "IN-0012",
    client: "Urban Cafe",
    category: "Food & Beverages",
    initials: "UC",
    amount: 12000,
    issueDate: "03 Sep 2025",
    dueDate: "13 Sep 2025",
    status: "Pending",
    phone: "+91 98765 43220",
    email: "info@urbancafe.com",
  },
  {
    id: "IN-0011",
    client: "TechWave Solutions",
    category: "IT Services",
    initials: "TS",
    amount: 45000,
    issueDate: "02 Sep 2025",
    dueDate: "12 Sep 2025",
    status: "Paid",
    phone: "+91 98765 43320",
    email: "hello@techwave.com",
  },
  {
    id: "IN-0010",
    client: "Royal Traders",
    category: "Retail",
    initials: "RT",
    amount: 32000,
    issueDate: "01 Sep 2025",
    dueDate: "11 Sep 2025",
    status: "Overdue",
    phone: "+91 98765 43420",
    email: "sales@royaltraders.com",
  },
  {
    id: "IN-0009",
    client: "HealthPlus",
    category: "Healthcare",
    initials: "HP",
    amount: 22500,
    issueDate: "31 Aug 2025",
    dueDate: "10 Sep 2025",
    status: "Paid",
    phone: "+91 98765 43520",
    email: "info@healthplus.com",
  },
  {
    id: "IN-0008",
    client: "Green Leaf Organics",
    category: "E-commerce",
    initials: "GL",
    amount: 16800,
    issueDate: "28 Aug 2025",
    dueDate: "07 Sep 2025",
    status: "Pending",
    phone: "+91 98765 43620",
    email: "hello@greenleaf.com",
  },
  {
    id: "IN-0007",
    client: "ABC Mart",
    category: "Retail",
    initials: "AB",
    amount: 28000,
    issueDate: "26 Aug 2025",
    dueDate: "05 Sep 2025",
    status: "Paid",
    phone: "+91 98765 43720",
    email: "contact@abcmart.com",
  },
  {
    id: "IN-0006",
    client: "Smile Dental Clinic",
    category: "Healthcare",
    initials: "SD",
    amount: 35500,
    issueDate: "24 Aug 2025",
    dueDate: "03 Sep 2025",
    status: "Overdue",
    phone: "+91 98765 43820",
    email: "smile@dental.com",
  },
  {
    id: "IN-0005",
    client: "Bright Future School",
    category: "Education",
    initials: "BF",
    amount: 19000,
    issueDate: "21 Aug 2025",
    dueDate: "31 Aug 2025",
    status: "Paid",
    phone: "+91 98765 43210",
    email: "info@brightfuture.edu",
  },
  {
    id: "IN-0004",
    client: "Care Dental",
    category: "Healthcare",
    initials: "CD",
    amount: 27500,
    issueDate: "20 Aug 2025",
    dueDate: "30 Aug 2025",
    status: "Pending",
    phone: "+91 98765 43920",
    email: "care@dental.com",
  },
  {
    id: "IN-0003",
    client: "Pixel Studio",
    category: "Design",
    initials: "PS",
    amount: 42000,
    issueDate: "18 Aug 2025",
    dueDate: "28 Aug 2025",
    status: "Paid",
    phone: "+91 98765 44020",
    email: "hello@pixelstudio.com",
  },
];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

export default function InvoicesPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [clientFilter, setClientFilter] = useState("All Clients");
  const [selectedInvoice, setSelectedInvoice] = useState(invoices[0]);
  const [page, setPage] = useState(1);

  const pageSize = 10;

  const filteredInvoices = useMemo(() => {
    return invoices.filter((invoice) => {
      const text = search.toLowerCase().trim();

      const matchesSearch =
        invoice.id.toLowerCase().includes(text) ||
        invoice.client.toLowerCase().includes(text) ||
        invoice.category.toLowerCase().includes(text) ||
        invoice.amount.toString().includes(text);

      const matchesStatus =
        statusFilter === "All Status" ||
        invoice.status === statusFilter;

      const matchesClient =
        clientFilter === "All Clients" ||
        invoice.client === clientFilter;

      return matchesSearch && matchesStatus && matchesClient;
    });
  }, [search, statusFilter, clientFilter]);

  const totalInvoices = invoices.length;

  const totalAmount = invoices.reduce(
    (sum, invoice) => sum + invoice.amount,
    0
  );

  const paidInvoices = invoices.filter(
    (invoice) => invoice.status === "Paid"
  ).length;

  const pendingInvoices = invoices.filter(
    (invoice) => invoice.status === "Pending"
  ).length;

  const overdueInvoices = invoices.filter(
    (invoice) => invoice.status === "Overdue"
  ).length;

  const totalPages = Math.max(
    1,
    Math.ceil(filteredInvoices.length / pageSize)
  );

  const visibleInvoices = filteredInvoices.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const clients = Array.from(
    new Set(invoices.map((invoice) => invoice.client))
  );

  function resetPage() {
    setPage(1);
  }

  function handleCreateInvoice() {
    alert("Create Invoice button clicked.");
  }

  function handleExport() {
    alert("Invoice data exported successfully.");
  }

  function handleDownload() {
    alert(`Downloading ${selectedInvoice.id}`);
  }

  function handleReceipt() {
    alert(`Receipt sent to ${selectedInvoice.email}`);
  }

  function handleSearch(value: string) {
    setSearch(value);
    resetPage();
  }

  function handleStatus(value: string) {
    setStatusFilter(value);
    resetPage();
  }

  function handleClient(value: string) {
    setClientFilter(value);
    resetPage();
  }

  return (
    <div className={styles.app}>
      {/* SIDEBAR */}
      <Sidebar />

      {/* RIGHT SIDE */}
      <div className={styles.mainArea}>
        {/* NAVBAR */}
        <Navbar />

        <main className={styles.content}>
          {/* PAGE HEADER */}
          <section className={styles.pageHeader}>
            <div>
              <div className={styles.breadcrumb}>
                <span>⌂</span>
                <span>Dashboard</span>
                <b>›</b>
                <span>Invoices</span>
              </div>

              <div className={styles.titleRow}>
                <div className={styles.titleIcon}>▤</div>

                <div>
                  <h1>Invoices</h1>

                  <p>
                    Manage and track all your invoices. View status,
                    make payments and keep your business running smoothly.
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.headerButtons}>
              <button
                className={styles.primaryButton}
                onClick={handleCreateInvoice}
              >
                ＋ Create Invoice
              </button>

              <button
                className={styles.secondaryButton}
                onClick={handleExport}
              >
                ↓ Export
              </button>

              <button className={styles.moreButton}>⋮</button>
            </div>
          </section>

          {/* STAT CARDS */}
          <section className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={`${styles.statIcon} ${styles.blueIcon}`}>
                ▤
              </div>

              <div>
                <span>Total Invoices</span>
                <strong>{totalInvoices}</strong>
                <div className={styles.statGrowth}>↑ 12%</div>
                <small>vs. last month</small>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={`${styles.statIcon} ${styles.greenIcon}`}>
                ◉
              </div>

              <div>
                <span>Total Amount</span>
                <strong>{formatCurrency(totalAmount)}</strong>
                <div className={styles.statGrowth}>↑ 18%</div>
                <small>vs. last month</small>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={`${styles.statIcon} ${styles.purpleIcon}`}>
                ◈
              </div>

              <div>
                <span>Paid</span>
                <strong>{paidInvoices}</strong>
                <div className={styles.statGrowth}>↑ 25%</div>
                <small>vs. last month</small>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={`${styles.statIcon} ${styles.orangeIcon}`}>
                ◷
              </div>

              <div>
                <span>Pending</span>
                <strong>{pendingInvoices}</strong>
                <div className={styles.statDown}>↓ 14%</div>
                <small>vs. last month</small>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={`${styles.statIcon} ${styles.redIcon}`}>
                !
              </div>

              <div>
                <span>Overdue</span>
                <strong>{overdueInvoices}</strong>
                <div className={styles.statDown}>↓ 50%</div>
                <small>vs. last month</small>
              </div>
            </div>
          </section>

          {/* MAIN AREA */}
          <section className={styles.dashboardGrid}>
            {/* TABLE */}
            <div className={styles.tableCard}>
              {/* FILTER BAR */}
              <div className={styles.filterBar}>
                <div className={styles.tableSearch}>
                  <span>⌕</span>

                  <input
                    value={search}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Search by invoice no., client name, or amount..."
                  />
                </div>

                <select
                  value={clientFilter}
                  onChange={(e) => handleClient(e.target.value)}
                >
                  <option>All Clients</option>

                  {clients.map((client) => (
                    <option key={client}>{client}</option>
                  ))}
                </select>

                <select
                  value={statusFilter}
                  onChange={(e) => handleStatus(e.target.value)}
                >
                  <option>All Status</option>
                  <option>Paid</option>
                  <option>Pending</option>
                  <option>Overdue</option>
                </select>

                <button className={styles.dateButton}>
                  ▣ 10 Sep 2025 - 10 Oct 2025
                </button>

                <button className={styles.filterButton}>
                  ⏷ Filter
                </button>
              </div>

              {/* TABLE */}
              <div className={styles.tableWrap}>
                <table className={styles.invoiceTable}>
                  <thead>
                    <tr>
                      <th>
                        <input type="checkbox" />
                      </th>
                      <th>Invoice No.</th>
                      <th>Client Name</th>
                      <th>Amount</th>
                      <th>Issue Date</th>
                      <th>Due Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {visibleInvoices.map((invoice) => (
                      <tr
                        key={invoice.id}
                        onClick={() =>
                          setSelectedInvoice(invoice)
                        }
                        className={
                          selectedInvoice.id === invoice.id
                            ? styles.selectedRow
                            : ""
                        }
                      >
                        <td>
                          <input
                            type="checkbox"
                            onClick={(e) => e.stopPropagation()}
                          />
                        </td>

                        <td>
                          <strong className={styles.invoiceNumber}>
                            {invoice.id}
                          </strong>
                        </td>

                        <td>
                          <div className={styles.clientCell}>
                            <div className={styles.clientAvatar}>
                              {invoice.initials}
                            </div>

                            <div>
                              <strong>{invoice.client}</strong>
                              <small>{invoice.category}</small>
                            </div>
                          </div>
                        </td>

                        <td>
                          <strong className={styles.amount}>
                            {formatCurrency(invoice.amount)}
                          </strong>
                        </td>

                        <td>{invoice.issueDate}</td>

                        <td>{invoice.dueDate}</td>

                        <td>
                          <span
                            className={`${styles.status} ${
                              invoice.status === "Paid"
                                ? styles.paid
                                : invoice.status === "Pending"
                                ? styles.pending
                                : styles.overdue
                            }`}
                          >
                            {invoice.status}
                          </span>
                        </td>

                        <td>
                          <button
                            className={styles.actionButton}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedInvoice(invoice);
                            }}
                          >
                            ⋯
                          </button>
                        </td>
                      </tr>
                    ))}

                    {visibleInvoices.length === 0 && (
                      <tr>
                        <td
                          colSpan={8}
                          className={styles.emptyState}
                        >
                          No invoices found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* FOOTER */}
              <div className={styles.tableFooter}>
                <span>
                  Showing{" "}
                  {filteredInvoices.length === 0
                    ? 0
                    : (page - 1) * pageSize + 1}{" "}
                  to{" "}
                  {Math.min(
                    page * pageSize,
                    filteredInvoices.length
                  )}{" "}
                  of {filteredInvoices.length} invoices
                </span>

                <div className={styles.pagination}>
                  <button
                    disabled={page === 1}
                    onClick={() =>
                      setPage((p) => Math.max(1, p - 1))
                    }
                  >
                    ‹
                  </button>

                  {Array.from({ length: totalPages }).map(
                    (_, index) => (
                      <button
                        key={index}
                        className={
                          page === index + 1
                            ? styles.currentPage
                            : ""
                        }
                        onClick={() =>
                          setPage(index + 1)
                        }
                      >
                        {index + 1}
                      </button>
                    )
                  )}

                  <button
                    disabled={page === totalPages}
                    onClick={() =>
                      setPage((p) =>
                        Math.min(totalPages, p + 1)
                      )
                    }
                  >
                    ›
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT DETAILS */}
            <aside className={styles.detailsColumn}>
              <div className={styles.detailsCard}>
                <div className={styles.detailsHeader}>
                  <div>
                    <span className={styles.detailsIcon}>
                      ▤
                    </span>

                    <strong>Invoice Details</strong>
                  </div>

                  <span
                    className={`${styles.status} ${
                      selectedInvoice.status === "Paid"
                        ? styles.paid
                        : selectedInvoice.status === "Pending"
                        ? styles.pending
                        : styles.overdue
                    }`}
                  >
                    ✓ {selectedInvoice.status}
                  </span>
                </div>

                {/* COMPANY */}
                <div className={styles.companyInfo}>
                  <div className={styles.companyAvatar}>
                    {selectedInvoice.initials}
                  </div>

                  <div>
                    <h3>{selectedInvoice.client}</h3>
                    <small>{selectedInvoice.category}</small>

                    <p>☎ {selectedInvoice.phone}</p>
                    <p>✉ {selectedInvoice.email}</p>
                  </div>
                </div>

                {/* META */}
                <div className={styles.invoiceMeta}>
                  <div>
                    <span>Invoice No.</span>
                    <strong>{selectedInvoice.id}</strong>
                  </div>

                  <div>
                    <span>Issue Date</span>
                    <strong>{selectedInvoice.issueDate}</strong>
                  </div>

                  <div>
                    <span>Due Date</span>
                    <strong>{selectedInvoice.dueDate}</strong>
                  </div>

                  <div>
                    <span>Payment Terms</span>
                    <strong>Net 10</strong>
                  </div>

                  <div>
                    <span>Status</span>

                    <strong
                      className={
                        selectedInvoice.status === "Paid"
                          ? styles.greenText
                          : selectedInvoice.status === "Overdue"
                          ? styles.redText
                          : styles.orangeText
                      }
                    >
                      {selectedInvoice.status}
                    </strong>
                  </div>
                </div>

                {/* ITEMS */}
                <div className={styles.itemsSection}>
                  <h4>• Items</h4>

                  <div className={styles.itemHeader}>
                    <span>#</span>
                    <span>Description</span>
                    <span>Qty</span>
                    <span>Rate</span>
                    <span>Amount</span>
                  </div>

                  <div className={styles.itemRow}>
                    <span>1</span>
                    <span>Website Development</span>
                    <span>1</span>
                    <span>₹20,000</span>
                    <span>₹20,000</span>
                  </div>

                  <div className={styles.itemRow}>
                    <span>2</span>
                    <span>Domain & Hosting</span>
                    <span>1</span>
                    <span>₹5,000</span>
                    <span>₹5,000</span>
                  </div>
                </div>

                {/* TOTAL */}
                <div className={styles.totals}>
                  <div>
                    <span>Subtotal</span>
                    <strong>₹25,000</strong>
                  </div>

                  <div>
                    <span>Tax (18%)</span>
                    <strong>₹4,500</strong>
                  </div>

                  <div className={styles.totalAmount}>
                    <span>Total Amount</span>
                    <strong>₹25,000</strong>
                  </div>
                </div>

                {/* PAYMENT */}
                <div className={styles.paymentSection}>
                  <h4>▣ Payment Details</h4>

                  <div>
                    <span>Payment Method</span>
                    <strong>Bank Transfer</strong>
                  </div>

                  <div>
                    <span>Transaction ID</span>
                    <strong>TXN987654321</strong>
                  </div>

                  <div>
                    <span>Payment Date</span>
                    <strong>07 Sep 2025</strong>
                  </div>
                </div>

                {/* BUTTONS */}
                <div className={styles.detailButtons}>
                  <button
                    className={styles.downloadButton}
                    onClick={handleDownload}
                  >
                    ↓ Download Invoice
                  </button>

                  <button
                    className={styles.receiptButton}
                    onClick={handleReceipt}
                  >
                    ✉ Send Receipt
                  </button>
                </div>
              </div>
            </aside>
          </section>
        </main>
      </div>
    </div>
  );
}