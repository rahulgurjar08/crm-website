export type LeadStatus =
  | "New"
  | "Contacted"
  | "Interested"
  | "Meeting"
  | "Proposal Sent"
  | "Won"
  | "Lost";

export type Lead = {
  id: number;

  // Basic Information
  name: string;
  role: string;
  company: string;
  phone: string;
  email: string;

  // Lead Information
  source: string;
  status: LeadStatus;
  assignedTo: string;
  nextFollowUp: string;
  avatar: string;

  // Project Information
  leadType: string;
  priority: "High" | "Medium" | "Low";

  // Dates
  createdAt: string;
  lastContact: string;

  // Company Information
  website: string;
  businessType: string;
  companySize: string;

  // Requirement Information
  serviceRequired: string;
  featuresNeeded: string;
  budgetRange: string;
  projectTimeline: string;
  additionalNote: string;

  // Communication History
  communications: {
    type: string;
    title: string;
    message: string;
    date: string;
    time: string;
  }[];

  // Activity Timeline
  timeline: {
    title: string;
    date: string;
    time: string;
    status: string;
  }[];

  // Notes
  notes: string[];
};

export const initialLeads: Lead[] = [
  {
    id: 1,

    name: "Sneha Kapoor",
    role: "Owner",
    company: "Smile Dental Clinic",
    phone: "+91 98765 43210",
    email: "sneha@smiledental.com",

    source: "Website",
    status: "New",
    assignedTo: "Rohit Singh",
    nextFollowUp: "12 Sep 2025, 10:00 AM",
    avatar: "SK",

    leadType: "Website Development",
    priority: "High",

    createdAt: "08 Sep 2025, 10:24 AM",
    lastContact: "10 Sep 2025, 11:15 AM",

    website: "www.smile-dental.com",
    businessType: "Dental Clinic",
    companySize: "1 - 10 Employees",

    serviceRequired: "Website Development",
    featuresNeeded:
      "Service Details, Appointment Booking, Gallery, Contact Form",
    budgetRange: "₹ 30,000 - ₹ 50,000",
    projectTimeline: "Within 1 Month",
    additionalNote: "Wants SEO and mobile responsive design.",

    communications: [
      {
        type: "WhatsApp",
        title: "WhatsApp Message",
        message:
          "Hi, can you share your website design samples for dental clinics?",
        date: "10 Sep 2025",
        time: "11:15 AM",
      },
      {
        type: "Phone",
        title: "Phone Call",
        message: "Spoke about requirements and budget.",
        date: "09 Sep 2025",
        time: "04:30 PM",
      },
      {
        type: "Email",
        title: "Email",
        message: "Sent proposal and service details.",
        date: "09 Sep 2025",
        time: "02:10 PM",
      },
      {
        type: "WhatsApp",
        title: "WhatsApp Message",
        message: "Thank you! I will review and get back to you.",
        date: "08 Sep 2025",
        time: "05:45 PM",
      },
    ],

    timeline: [
      {
        title: "Lead Created",
        date: "08 Sep 2025",
        time: "10:24 AM",
        status: "New",
      },
      {
        title: "Contacted",
        date: "08 Sep 2025",
        time: "02:30 PM",
        status: "Contacted",
      },
      {
        title: "Interested",
        date: "09 Sep 2025",
        time: "11:15 AM",
        status: "Interested",
      },
      {
        title: "Follow-up Scheduled",
        date: "10 Sep 2025",
        time: "04:00 PM",
        status: "Follow-up",
      },
    ],

    notes: [
      "Customer wants modern design.",
      "SEO is also required.",
    ],
  },

  {
    id: 2,

    name: "Amit Sharma",
    role: "Manager",
    company: "Bright Smile Care",
    phone: "+91 87654 32109",
    email: "amit@brightsmile.com",

    source: "Referral",
    status: "Contacted",
    assignedTo: "Priya Verma",
    nextFollowUp: "11 Sep 2025, 11:00 AM",
    avatar: "AS",

    leadType: "Website Development",
    priority: "Medium",

    createdAt: "07 Sep 2025, 09:20 AM",
    lastContact: "09 Sep 2025, 04:15 PM",

    website: "www.brightsmile.com",
    businessType: "Dental Clinic",
    companySize: "11 - 50 Employees",

    serviceRequired: "Website Development",
    featuresNeeded: "Online Booking, Services, Contact Form",
    budgetRange: "₹ 40,000 - ₹ 60,000",
    projectTimeline: "Within 2 Months",
    additionalNote: "Needs fast loading website.",

    communications: [],
    timeline: [],
    notes: [],
  },

  {
    id: 3,

    name: "Pooja Khandelwal",
    role: "Owner",
    company: "Dental Plus",
    phone: "+91 99887 66554",
    email: "pooja@dentalplus.in",

    source: "Social Media",
    status: "Interested",
    assignedTo: "Amit Kumar",
    nextFollowUp: "12 Sep 2025, 02:00 PM",
    avatar: "PK",

    leadType: "Website Development",
    priority: "High",

    createdAt: "06 Sep 2025, 10:00 AM",
    lastContact: "09 Sep 2025, 03:00 PM",

    website: "www.dentalplus.in",
    businessType: "Dental Clinic",
    companySize: "1 - 10 Employees",

    serviceRequired: "Website Development",
    featuresNeeded: "Booking, Gallery, Services",
    budgetRange: "₹ 25,000 - ₹ 45,000",
    projectTimeline: "Within 1 Month",
    additionalNote: "Interested in complete redesign.",

    communications: [],
    timeline: [],
    notes: [],
  },

  {
    id: 4,

    name: "Rahul Saini",
    role: "Founder",
    company: "Care Dental",
    phone: "+91 96543 21098",
    email: "rahul@caredental.com",

    source: "Google Ads",
    status: "Meeting",
    assignedTo: "Sneha Patel",
    nextFollowUp: "13 Sep 2025, 03:30 PM",
    avatar: "RS",

    leadType: "Web Application",
    priority: "High",

    createdAt: "05 Sep 2025, 11:00 AM",
    lastContact: "09 Sep 2025, 05:00 PM",

    website: "www.caredental.com",
    businessType: "Dental Clinic",
    companySize: "11 - 50 Employees",

    serviceRequired: "Web Application",
    featuresNeeded:
      "Patient Portal, Booking, Admin Dashboard",
    budgetRange: "₹ 80,000 - ₹ 1,20,000",
    projectTimeline: "Within 2 Months",
    additionalNote: "Needs admin dashboard.",

    communications: [],
    timeline: [],
    notes: [],
  },

  {
    id: 5,

    name: "Anjali Verma",
    role: "Owner",
    company: "Healthy Smiles",
    phone: "+91 91234 56789",
    email: "anjali@healthysmiles.com",

    source: "Website",
    status: "Proposal Sent",
    assignedTo: "Rohit Singh",
    nextFollowUp: "14 Sep 2025, 11:00 AM",
    avatar: "AV",

    leadType: "Website Development",
    priority: "Medium",

    createdAt: "04 Sep 2025, 12:30 PM",
    lastContact: "09 Sep 2025, 02:00 PM",

    website: "www.healthysmiles.com",
    businessType: "Dental Clinic",
    companySize: "1 - 10 Employees",

    serviceRequired: "Website Development",
    featuresNeeded: "Complete Business Website",
    budgetRange: "₹ 35,000 - ₹ 55,000",
    projectTimeline: "Within 1 Month",
    additionalNote: "Proposal already sent.",

    communications: [],
    timeline: [],
    notes: [],
  },

  {
    id: 6,

    name: "Vikash Gupta",
    role: "Manager",
    company: "Dental World",
    phone: "+91 94567 89012",
    email: "vikash@dentalworld.com",

    source: "Referral",
    status: "Won",
    assignedTo: "Priya Verma",
    nextFollowUp: "10 Sep 2025, 04:00 PM",
    avatar: "VG",

    leadType: "Website Development",
    priority: "Low",

    createdAt: "01 Sep 2025, 09:00 AM",
    lastContact: "08 Sep 2025, 01:00 PM",

    website: "www.dentalworld.com",
    businessType: "Dental Clinic",
    companySize: "11 - 50 Employees",

    serviceRequired: "Website Development",
    featuresNeeded: "Business Website",
    budgetRange: "₹ 50,000",
    projectTimeline: "Completed",
    additionalNote: "Project confirmed.",

    communications: [],
    timeline: [],
    notes: [],
  },

  {
    id: 7,

    name: "Neha Tiwari",
    role: "Owner",
    company: "Pearl Dental",
    phone: "+91 92345 67890",
    email: "neha@pearldental.com",

    source: "Social Media",
    status: "Lost",
    assignedTo: "Amit Kumar",
    nextFollowUp: "-",
    avatar: "NT",

    leadType: "Website Development",
    priority: "Low",

    createdAt: "01 Sep 2025, 10:00 AM",
    lastContact: "05 Sep 2025, 02:00 PM",

    website: "www.pearldental.com",
    businessType: "Dental Clinic",
    companySize: "1 - 10 Employees",

    serviceRequired: "Website Development",
    featuresNeeded: "Basic Website",
    budgetRange: "₹ 20,000",
    projectTimeline: "-",
    additionalNote: "Budget issue.",

    communications: [],
    timeline: [],
    notes: [],
  },

  {
    id: 8,

    name: "Aditya Bansal",
    role: "CEO",
    company: "Perfect Smile",
    phone: "+91 88877 66643",
    email: "aditya@perfectsmile.com",

    source: "Website",
    status: "New",
    assignedTo: "Sneha Patel",
    nextFollowUp: "11 Sep 2025, 02:00 PM",
    avatar: "AB",

    leadType: "Website Development",
    priority: "Medium",

    createdAt: "08 Sep 2025, 01:00 PM",
    lastContact: "-",

    website: "www.perfectsmile.com",
    businessType: "Dental Clinic",
    companySize: "11 - 50 Employees",

    serviceRequired: "Website Development",
    featuresNeeded: "Booking and Services",
    budgetRange: "₹ 30,000 - ₹ 50,000",
    projectTimeline: "Within 1 Month",
    additionalNote: "New enquiry.",

    communications: [],
    timeline: [],
    notes: [],
  },

  {
    id: 9,

    name: "Sonal Patel",
    role: "Owner",
    company: "Shree Dental Care",
    phone: "+91 77665 44332",
    email: "sonal@shreedental.com",

    source: "Google Ads",
    status: "Contacted",
    assignedTo: "Rohit Singh",
    nextFollowUp: "12 Sep 2025, 01:00 PM",
    avatar: "SP",

    leadType: "Website Development",
    priority: "Medium",

    createdAt: "07 Sep 2025, 11:00 AM",
    lastContact: "09 Sep 2025, 12:00 PM",

    website: "www.shreedental.com",
    businessType: "Dental Clinic",
    companySize: "1 - 10 Employees",

    serviceRequired: "Website Development",
    featuresNeeded: "Appointment Booking",
    budgetRange: "₹ 30,000",
    projectTimeline: "Within 1 Month",
    additionalNote: "Follow-up required.",

    communications: [],
    timeline: [],
    notes: [],
  },

  {
    id: 10,

    name: "Mohit Garg",
    role: "Manager",
    company: "Family Dental",
    phone: "+91 70123 45678",
    email: "mohit@familydental.com",

    source: "Referral",
    status: "Interested",
    assignedTo: "Priya Verma",
    nextFollowUp: "13 Sep 2025, 10:30 AM",
    avatar: "MG",

    leadType: "Website Development",
    priority: "High",

    createdAt: "06 Sep 2025, 02:00 PM",
    lastContact: "09 Sep 2025, 10:00 AM",

    website: "www.familydental.com",
    businessType: "Dental Clinic",
    companySize: "1 - 10 Employees",

    serviceRequired: "Website Development",
    featuresNeeded: "Website, Booking, Gallery",
    budgetRange: "₹ 35,000 - ₹ 55,000",
    projectTimeline: "Within 1 Month",
    additionalNote: "Good potential lead.",

    communications: [],
    timeline: [],
    notes: [],
  },
];

const STORAGE_KEY = "prism-crm-leads";

/**
 * Get leads from localStorage.
 * If no saved leads exist, initial leads are stored and returned.
 */
export function getStoredLeads(): Lead[] {
  if (typeof window === "undefined") {
    return initialLeads;
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(initialLeads)
      );

      return initialLeads;
    }

    const parsed: unknown = JSON.parse(saved);

    if (!Array.isArray(parsed)) {
      return initialLeads;
    }

    return parsed as Lead[];
  } catch (error) {
    console.error("Failed to load leads:", error);
    return initialLeads;
  }
}

/**
 * Save leads to localStorage.
 */
export function saveLeads(leads: Lead[]): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(leads)
    );
  } catch (error) {
    console.error("Failed to save leads:", error);
  }
}