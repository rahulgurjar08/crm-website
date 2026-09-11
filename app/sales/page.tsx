"use client";

import { useMemo, useState } from "react";
import Navbar from "../components/Nevbar/page";
import Sidebar from "../components/Sidebar/Sidebar";
import styles from "./SalesDeals.module.css";

type Deal = {
  id: number;
  title: string;
  company: string;
  amount: number;
  date: string;
  tag: string;
  icon: string;
  person: string;
};

type Stage = {
  id: string;
  title: string;
  color: string;
  total: string;
};

const stages: Stage[] = [
  {
    id: "lead",
    title: "Lead",
    color: "blue",
    total: "₹ 1,20,000",
  },
  {
    id: "contacted",
    title: "Contacted",
    color: "cyan",
    total: "₹ 2,10,000",
  },
  {
    id: "proposal",
    title: "Proposal",
    color: "purple",
    total: "₹ 1,80,000",
  },
  {
    id: "negotiation",
    title: "Negotiation",
    color: "orange",
    total: "₹ 1,50,000",
  },
  {
    id: "won",
    title: "Won",
    color: "green",
    total: "₹ 4,20,000",
  },
  {
    id: "lost",
    title: "Lost",
    color: "red",
    total: "₹ 40,000",
  },
];

const initialDeals: Record<string, Deal[]> = {
  lead: [
    {
      id: 1,
      title: "Dental Clinic Website",
      company: "Smile Dental Clinic",
      amount: 25000,
      date: "16 Sep 2025",
      tag: "Website",
      icon: "🦷",
      person: "VT",
    },
    {
      id: 2,
      title: "School ERP System",
      company: "Bright Future School",
      amount: 45000,
      date: "18 Sep 2025",
      tag: "ERP",
      icon: "🎓",
      person: "RS",
    },
    {
      id: 3,
      title: "Mobile App Development",
      company: "FitLife Fitness",
      amount: 80000,
      date: "20 Sep 2025",
      tag: "Mobile App",
      icon: "📱",
      person: "SP",
    },
    {
      id: 4,
      title: "Website Redesign",
      company: "Nature's Care",
      amount: 18000,
      date: "22 Sep 2025",
      tag: "Website",
      icon: "🌐",
      person: "VT",
    },
  ],

  contacted: [
    {
      id: 5,
      title: "CRM Implementation",
      company: "HealthPlus Pharma",
      amount: 70000,
      date: "17 Sep 2025",
      tag: "CRM",
      icon: "▣",
      person: "VT",
    },
    {
      id: 6,
      title: "Odoo ERP Solution",
      company: "Royal Traders",
      amount: 90000,
      date: "19 Sep 2025",
      tag: "ERP",
      icon: "◉",
      person: "RS",
    },
    {
      id: 7,
      title: "Digital Marketing",
      company: "Galaxy Electronics",
      amount: 35000,
      date: "21 Sep 2025",
      tag: "Marketing",
      icon: "➤",
      person: "SP",
    },
    {
      id: 8,
      title: "AI Chatbot",
      company: "TechWave Solutions",
      amount: 30000,
      date: "24 Sep 2025",
      tag: "AI",
      icon: "▣",
      person: "VT",
    },
  ],

  proposal: [
    {
      id: 9,
      title: "Custom Website",
      company: "Sunrise Builders",
      amount: 60000,
      date: "23 Sep 2025",
      tag: "Website",
      icon: "🌐",
      person: "VT",
    },
    {
      id: 10,
      title: "AI Calling Solution",
      company: "Growth Media",
      amount: 40000,
      date: "25 Sep 2025",
      tag: "AI Calling",
      icon: "☎",
      person: "SP",
    },
    {
      id: 11,
      title: "Blockchain Solution",
      company: "CryptoHub",
      amount: 50000,
      date: "27 Sep 2025",
      tag: "Blockchain",
      icon: "⬡",
      person: "RS",
    },
    {
      id: 12,
      title: "Website + SEO",
      company: "Fashion Store",
      amount: 30000,
      date: "28 Sep 2025",
      tag: "Website",
      icon: "↗",
      person: "SP",
    },
  ],

  negotiation: [
    {
      id: 13,
      title: "ERP Customization",
      company: "ABC Manufacturing",
      amount: 55000,
      date: "22 Sep 2025",
      tag: "ERP",
      icon: "⚙",
      person: "VT",
    },
    {
      id: 14,
      title: "Mobile App (E-commerce)",
      company: "ShopCart",
      amount: 45000,
      date: "26 Sep 2025",
      tag: "Mobile App",
      icon: "▯",
      person: "SP",
    },
    {
      id: 15,
      title: "Branding & Logo",
      company: "Pixel Studio",
      amount: 25000,
      date: "29 Sep 2025",
      tag: "Branding",
      icon: "◉",
      person: "RS",
    },
    {
      id: 16,
      title: "Social Media Marketing",
      company: "Urban Cafe",
      amount: 25000,
      date: "02 Oct 2025",
      tag: "Marketing",
      icon: "➤",
      person: "SP",
    },
  ],

  won: [
    {
      id: 17,
      title: "Website Development",
      company: "Smile Dental Clinic",
      amount: 120000,
      date: "15 Sep 2025",
      tag: "Website",
      icon: "🌐",
      person: "VT",
    },
    {
      id: 18,
      title: "CRM Solution",
      company: "Royal Traders",
      amount: 95000,
      date: "12 Sep 2025",
      tag: "CRM",
      icon: "▣",
      person: "RS",
    },
    {
      id: 19,
      title: "Odoo Implementation",
      company: "Dynamic Solutions",
      amount: 85000,
      date: "15 Sep 2025",
      tag: "ERP",
      icon: "◉",
      person: "VT",
    },
    {
      id: 20,
      title: "Digital Marketing",
      company: "Bright Minds",
      amount: 70000,
      date: "18 Sep 2025",
      tag: "Marketing",
      icon: "➤",
      person: "SP",
    },
  ],

  lost: [
    {
      id: 21,
      title: "Website Development",
      company: "Old Town Restaurant",
      amount: 25000,
      date: "05 Sep 2025",
      tag: "Website",
      icon: "🌐",
      person: "VT",
    },
    {
      id: 22,
      title: "Mobile App",
      company: "NextGen Education",
      amount: 15000,
      date: "08 Sep 2025",
      tag: "Mobile App",
      icon: "📱",
      person: "RS",
    },
  ],
};

export default function SalesDealsPage() {
  const [deals, setDeals] =
    useState<Record<string, Deal[]>>(initialDeals);

  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] =
    useState("All Stages");

  const [sourceFilter, setSourceFilter] =
    useState("All Sources");

  const [showModal, setShowModal] =
    useState(false);

  const [newDeal, setNewDeal] = useState({
    title: "",
    company: "",
    amount: "",
    date: "",
    tag: "Website",
    stage: "lead",
  });

  const allDeals = useMemo(() => {
    return Object.entries(deals).flatMap(
      ([stage, items]) =>
        items.map((deal) => ({
          ...deal,
          stage,
        }))
    );
  }, [deals]);

  const totalDeals = allDeals.length;

  const filteredDeals = useMemo(() => {
    return allDeals.filter((deal) => {
      const searchText =
        search.toLowerCase().trim();

      const matchesSearch =
        !searchText ||
        deal.title
          .toLowerCase()
          .includes(searchText) ||
        deal.company
          .toLowerCase()
          .includes(searchText) ||
        deal.tag
          .toLowerCase()
          .includes(searchText);

      const selectedStage =
        stages.find(
          (stage) =>
            stage.title === stageFilter
        )?.id;

      const matchesStage =
        stageFilter === "All Stages" ||
        deal.stage === selectedStage;

      const matchesSource =
        sourceFilter === "All Sources" ||
        deal.tag === sourceFilter;

      return (
        matchesSearch &&
        matchesStage &&
        matchesSource
      );
    });
  }, [
    allDeals,
    search,
    stageFilter,
    sourceFilter,
  ]);

  const getStageDeals = (
    stageId: string
  ) => {
    return filteredDeals.filter(
      (deal) => deal.stage === stageId
    );
  };

  const formatMoney = (
    amount: number
  ) => {
    return `₹ ${amount.toLocaleString(
      "en-IN"
    )}`;
  };

  const handleAddDeal = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (
      !newDeal.title.trim() ||
      !newDeal.company.trim() ||
      !newDeal.amount
    ) {
      alert(
        "Please fill Deal Name, Company and Amount."
      );
      return;
    }

    const deal: Deal = {
      id: Date.now(),
      title: newDeal.title,
      company: newDeal.company,
      amount: Number(newDeal.amount),
      date:
        newDeal.date || "20 Sep 2025",
      tag: newDeal.tag,
      icon:
        newDeal.tag === "Website"
          ? "🌐"
          : newDeal.tag === "Mobile App"
          ? "📱"
          : newDeal.tag === "Marketing"
          ? "➤"
          : "▣",
      person: "VT",
    };

    setDeals((prev) => ({
      ...prev,

      [newDeal.stage]: [
        ...(prev[newDeal.stage] || []),
        deal,
      ],
    }));

    setNewDeal({
      title: "",
      company: "",
      amount: "",
      date: "",
      tag: "Website",
      stage: "lead",
    });

    setShowModal(false);
  };

  const deleteDeal = (
    stageId: string,
    dealId: number
  ) => {
    setDeals((prev) => ({
      ...prev,

      [stageId]: prev[stageId].filter(
        (deal) => deal.id !== dealId
      ),
    }));
  };

  const resetFilters = () => {
    setSearch("");
    setStageFilter("All Stages");
    setSourceFilter("All Sources");
  };

  return (
    <div className={styles.page}>

      {/* COMMON SIDEBAR */}
      <Sidebar />

      {/* COMMON NAVBAR */}
      <Navbar />

      {/* ================= MAIN ================= */}

      <main className={styles.main}>

        {/* PAGE HEADER */}

        <section className={styles.pageHeader}>

          <div className={styles.headerLeft}>

            <div className={styles.breadcrumb}>
              <span>⌂</span>
              <span>Dashboard</span>
              <span>›</span>
              <strong>
                Sales Pipeline
              </strong>
            </div>

            <div className={styles.titleRow}>

              <div
                className={
                  styles.titleIcon
                }
              >
                ▽
              </div>

              <div>
                <h1>
                  Sales Pipeline
                </h1>

                <p>
                  Track your deals from lead
                  to closing, Move deals through
                  the pipeline and grow your
                  business.
                </p>
              </div>

            </div>

          </div>

          <div
            className={
              styles.headerButtons
            }
          >

            <button
              className={
                styles.addButton
              }
              onClick={() =>
                setShowModal(true)
              }
            >
              <span>＋</span>
              Add Deal
            </button>

            <button
              className={
                styles.settingsButton
              }
              onClick={() =>
                alert(
                  "Pipeline settings will open here."
                )
              }
            >
              ⚙
              Pipeline Settings
            </button>

          </div>

        </section>


        {/* ================= STATS ================= */}

        <section
          className={styles.statsGrid}
        >

          <div className={styles.statCard}>

            <div
              className={`${styles.statIcon} ${styles.blue}`}
            >
              ◉
            </div>

            <div
              className={
                styles.statInfo
              }
            >
              <span>
                Total Deals
              </span>

              <div
                className={
                  styles.statValue
                }
              >
                <strong>
                  {totalDeals}
                </strong>

                <small>
                  ↑ 12%
                </small>
              </div>

              <p>
                vs. last month
              </p>
            </div>

          </div>


          <div className={styles.statCard}>

            <div
              className={`${styles.statIcon} ${styles.blue}`}
            >
              ₹
            </div>

            <div
              className={
                styles.statInfo
              }
            >
              <span>
                Total Value
              </span>

              <div
                className={
                  styles.statValue
                }
              >
                <strong>
                  ₹ 8,45,000
                </strong>

                <small>
                  ↑ 18%
                </small>
              </div>

              <p>
                vs. last month
              </p>
            </div>

          </div>


          <div className={styles.statCard}>

            <div
              className={`${styles.statIcon} ${styles.green}`}
            >
              ✓
            </div>

            <div
              className={
                styles.statInfo
              }
            >
              <span>
                Won Deals
              </span>

              <div
                className={
                  styles.statValue
                }
              >
                <strong>
                  12
                </strong>

                <small>
                  ↑ 33%
                </small>
              </div>

              <p>
                vs. last month
              </p>
            </div>

          </div>


          <div className={styles.statCard}>

            <div
              className={`${styles.statIcon} ${styles.blue}`}
            >
              ◷
            </div>

            <div
              className={
                styles.statInfo
              }
            >
              <span>
                Pending Deals
              </span>

              <div
                className={
                  styles.statValue
                }
              >
                <strong>
                  10
                </strong>

                <small>
                  ↑ 11%
                </small>
              </div>

              <p>
                vs. last month
              </p>
            </div>

          </div>


          <div className={styles.statCard}>

            <div
              className={`${styles.statIcon} ${styles.red}`}
            >
              ×
            </div>

            <div
              className={
                styles.statInfo
              }
            >
              <span>
                Lost Deals
              </span>

              <div
                className={
                  styles.statValue
                }
              >
                <strong>
                  6
                </strong>

                <small
                  className={
                    styles.redText
                  }
                >
                  ↓ 14%
                </small>
              </div>

              <p>
                vs. last month
              </p>
            </div>

          </div>

        </section>


        {/* ================= PIPELINE ================= */}

        <section
          className={
            styles.pipelineCard
          }
        >

          {/* FILTERS */}

          <div
            className={
              styles.filterBar
            }
          >

            <div
              className={
                styles.pipelineSearch
              }
            >
              <span>⌕</span>

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                placeholder="Search deals by name, company, or client..."
              />
            </div>


            <select
              value={stageFilter}
              onChange={(e) =>
                setStageFilter(
                  e.target.value
                )
              }
            >
              <option>
                All Stages
              </option>

              {stages.map(
                (stage) => (
                  <option
                    key={stage.id}
                    value={stage.title}
                  >
                    {stage.title}
                  </option>
                )
              )}
            </select>


            <select
              value={sourceFilter}
              onChange={(e) =>
                setSourceFilter(
                  e.target.value
                )
              }
            >
              <option>
                All Sources
              </option>
              <option>
                Website
              </option>
              <option>
                ERP
              </option>
              <option>
                CRM
              </option>
              <option>
                Marketing
              </option>
              <option>
                Mobile App
              </option>
              <option>
                AI
              </option>
              <option>
                Branding
              </option>
            </select>


            <select defaultValue="This Month">
              <option>
                This Month
              </option>
              <option>
                Last Month
              </option>
              <option>
                This Year
              </option>
            </select>


            <button
              className={
                styles.resetButton
              }
              onClick={
                resetFilters
              }
              title="Reset Filters"
            >
              ↻
            </button>


            <button
              className={
                styles.viewButton
              }
              title="Board View"
            >
              ▦
            </button>


            <button
              className={
                styles.listButton
              }
              title="List View"
            >
              ☷
            </button>

          </div>


          {/* ================= COLUMNS ================= */}

          <div
            className={
              styles.pipeline
            }
          >

            {stages.map(
              (stage) => {

                const stageDeals =
                  getStageDeals(
                    stage.id
                  );

                return (
                  <div
                    key={stage.id}
                    className={`${styles.column} ${styles[stage.color]}`}
                  >

                    {/* COLUMN HEADER */}

                    <div
                      className={
                        styles.columnHeader
                      }
                    >

                      <div>

                        <strong>
                          {stage.title}
                        </strong>

                        <span>
                          {stage.total}
                        </span>

                      </div>

                      <b>
                        {stageDeals.length}
                      </b>

                    </div>


                    {/* DEAL LIST */}

                    <div
                      className={
                        styles.dealList
                      }
                    >

                      {stageDeals.length ===
                      0 ? (

                        <div
                          className={
                            styles.emptyColumn
                          }
                        >
                          No deals found
                        </div>

                      ) : (

                        stageDeals.map(
                          (deal) => (

                            <div
                              className={
                                styles.dealCard
                              }
                              key={
                                deal.id
                              }
                            >

                              <div
                                className={
                                  styles.dealTop
                                }
                              >

                                <div
                                  className={
                                    styles.dealIcon
                                  }
                                >
                                  {
                                    deal.icon
                                  }
                                </div>

                                <div
                                  className={
                                    styles.dealTitle
                                  }
                                >

                                  <strong>
                                    {
                                      deal.title
                                    }
                                  </strong>

                                  <span>
                                    {
                                      deal.company
                                    }
                                  </span>

                                </div>

                                <button
                                  className={
                                    styles.moreButton
                                  }
                                  onClick={() =>
                                    deleteDeal(
                                      stage.id,
                                      deal.id
                                    )
                                  }
                                  title="Delete Deal"
                                >
                                  ⋮
                                </button>

                              </div>


                              <div
                                className={
                                  styles.dealAmount
                                }
                              >
                                {formatMoney(
                                  deal.amount
                                )}
                              </div>


                              <div
                                className={
                                  styles.dealBottom
                                }
                              >

                                <div
                                  className={
                                    styles.personAvatar
                                  }
                                >
                                  {
                                    deal.person
                                  }
                                </div>

                                <span
                                  className={
                                    styles.dealDate
                                  }
                                >
                                  {
                                    deal.date
                                  }
                                </span>

                                <span
                                  className={
                                    styles.dealTag
                                  }
                                >
                                  {
                                    deal.tag
                                  }
                                </span>

                              </div>

                            </div>

                          )
                        )

                      )}

                    </div>


                    {/* VIEW ALL */}

                    <button
                      className={
                        styles.viewAll
                      }
                      onClick={() =>
                        alert(
                          `${stage.title}: ${stageDeals.length} deals`
                        )
                      }
                    >
                      ＋ View all (
                      {stageDeals.length}
                      )
                    </button>

                  </div>
                );
              }
            )}

          </div>

        </section>

      </main>


      {/* ================= ADD DEAL MODAL ================= */}

      {showModal && (

        <div
          className={
            styles.modalOverlay
          }
          onClick={() =>
            setShowModal(false)
          }
        >

          <div
            className={
              styles.modal
            }
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div
              className={
                styles.modalHeader
              }
            >

              <div>

                <h2>
                  Add New Deal
                </h2>

                <p>
                  Add a new opportunity
                  to your sales pipeline.
                </p>

              </div>

              <button
                onClick={() =>
                  setShowModal(false)
                }
              >
                ×
              </button>

            </div>


            <form
              onSubmit={
                handleAddDeal
              }
            >

              <div
                className={
                  styles.modalBody
                }
              >

                <label>
                  Deal Name
                </label>

                <input
                  type="text"
                  value={
                    newDeal.title
                  }
                  onChange={(e) =>
                    setNewDeal({
                      ...newDeal,
                      title:
                        e.target.value,
                    })
                  }
                  placeholder="Enter deal name"
                />


                <label>
                  Company
                </label>

                <input
                  type="text"
                  value={
                    newDeal.company
                  }
                  onChange={(e) =>
                    setNewDeal({
                      ...newDeal,
                      company:
                        e.target.value,
                    })
                  }
                  placeholder="Enter company name"
                />


                <div
                  className={
                    styles.formRow
                  }
                >

                  <div>

                    <label>
                      Amount
                    </label>

                    <input
                      type="number"
                      value={
                        newDeal.amount
                      }
                      onChange={(e) =>
                        setNewDeal({
                          ...newDeal,
                          amount:
                            e.target.value,
                        })
                      }
                      placeholder="25000"
                    />

                  </div>


                  <div>

                    <label>
                      Date
                    </label>

                    <input
                      type="date"
                      value={
                        newDeal.date
                      }
                      onChange={(e) =>
                        setNewDeal({
                          ...newDeal,
                          date:
                            e.target.value,
                        })
                      }
                    />

                  </div>

                </div>


                <div
                  className={
                    styles.formRow
                  }
                >

                  <div>

                    <label>
                      Stage
                    </label>

                    <select
                      value={
                        newDeal.stage
                      }
                      onChange={(e) =>
                        setNewDeal({
                          ...newDeal,
                          stage:
                            e.target.value,
                        })
                      }
                    >

                      {stages.map(
                        (stage) => (
                          <option
                            key={
                              stage.id
                            }
                            value={
                              stage.id
                            }
                          >
                            {
                              stage.title
                            }
                          </option>
                        )
                      )}

                    </select>

                  </div>


                  <div>

                    <label>
                      Category
                    </label>

                    <select
                      value={
                        newDeal.tag
                      }
                      onChange={(e) =>
                        setNewDeal({
                          ...newDeal,
                          tag:
                            e.target.value,
                        })
                      }
                    >

                      <option>
                        Website
                      </option>

                      <option>
                        ERP
                      </option>

                      <option>
                        CRM
                      </option>

                      <option>
                        Marketing
                      </option>

                      <option>
                        Mobile App
                      </option>

                      <option>
                        AI
                      </option>

                      <option>
                        Branding
                      </option>

                    </select>

                  </div>

                </div>

              </div>


              <div
                className={
                  styles.modalFooter
                }
              >

                <button
                  type="button"
                  className={
                    styles.cancelButton
                  }
                  onClick={() =>
                    setShowModal(
                      false
                    )
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className={
                    styles.saveButton
                  }
                >
                  Add Deal
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}