export type ClientStatus =
  | "Active"
  | "Pending"
  | "Follow Up"
  | "Inactive";

export type Client = {
  id: number;
  name: string;
  role: string;
  company: string;
  phone: string;
  email: string;
  industry: string;
  status: ClientStatus;
  lastContact: string;

  clientId: string;
  source: string;
  businessType: string;
  companySize: string;
  address: string;
  gstNumber: string;
  panNumber: string;

  website: string;
  description: string;

  contactPerson: {
    name: string;
    role: string;
    phone: string;
    email: string;
    avatar: string;
  };

  projects: {
    id: number;
    name: string;
    type: string;
    status: string;
    startDate: string;
    endDate: string;
  }[];

  timeline: {
    title: string;
    date: string;
    time: string;
    status: string;
  }[];

  activities: {
    title: string;
    date: string;
    time: string;
  }[];

  notes: {
    author: string;
    role: string;
    message: string;
    date: string;
    time: string;
    avatar: string;
  }[];

  tags: string[];
};

export const initialClients: Client[] = [
  {
    id: 1,
    name: "Sneha Sharma",
    role: "Owner",
    company: "Smile Dental Clinic",
    phone: "+91 98765 43210",
    email: "sneha@smile-dental.com",
    industry: "Healthcare",
    status: "Active",
    lastContact: "10 Sep 2025, 10:24 AM",

    clientId: "#CLI001",
    source: "Website",
    businessType: "Clinic",
    companySize: "1 - 10 Employees",
    address: "Indore, Madhya Pradesh",
    gstNumber: "—",
    panNumber: "—",

    website: "www.smile-dental.com",
    description:
      "Modern dental clinic providing quality dental care, cosmetic dentistry, root canal, and oral hygiene services.",

    contactPerson: {
      name: "Anjali Verma",
      role: "Owner",
      phone: "+91 91234 56789",
      email: "anjali@smiledental.com",
      avatar: "AV",
    },

    projects: [
      {
        id: 1,
        name: "Dental Clinic Website",
        type: "Website Development",
        status: "Completed",
        startDate: "05 Sep 2025",
        endDate: "20 Sep 2025",
      },
      {
        id: 2,
        name: "SEO & Digital Marketing",
        type: "Digital Marketing",
        status: "In Progress",
        startDate: "25 Sep 2025",
        endDate: "—",
      },
      {
        id: 3,
        name: "CRM Integration",
        type: "CRM Solution",
        status: "Proposal Sent",
        startDate: "10 Oct 2025",
        endDate: "—",
      },
    ],

    timeline: [
      {
        title: "Lead Created",
        date: "05 Sep 2025",
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
        title: "Proposal Sent",
        date: "10 Sep 2025",
        time: "09:45 AM",
        status: "Proposal Sent",
      },
      {
        title: "Follow-up Scheduled",
        date: "12 Sep 2025",
        time: "04:00 PM",
        status: "Follow-up",
      },
    ],

    activities: [
      {
        title: "Call made to Anjali Verma",
        date: "10 Sep 2025",
        time: "11:15 AM",
      },
      {
        title: "Proposal sent to client",
        date: "10 Sep 2025",
        time: "09:45 AM",
      },
      {
        title: "Follow-up scheduled",
        date: "12 Sep 2025",
        time: "04:00 PM",
      },
      {
        title: "New note added",
        date: "09 Sep 2025",
        time: "02:10 PM",
      },
    ],

    notes: [
      {
        author: "Vishal Thakur",
        role: "Admin",
        message:
          "Client is interested in website + digital marketing. Waiting for their confirmation on proposal.",
        date: "09 Sep 2025",
        time: "02:10 PM",
        avatar: "VT",
      },
    ],

    tags: ["Healthcare", "Dental Care", "Website Project"],
  },

  {
    id: 2,
    name: "Amit Kumar",
    role: "Manager",
    company: "Bright Smile Care",
    phone: "+91 87654 32109",
    email: "amit@brightsmile.com",
    industry: "Healthcare",
    status: "Active",
    lastContact: "09 Sep 2025, 04:30 PM",

    clientId: "#CLI002",
    source: "Referral",
    businessType: "Clinic",
    companySize: "11 - 50 Employees",
    address: "Jaipur, Rajasthan",
    gstNumber: "—",
    panNumber: "—",

    website: "www.brightsmile.com",
    description:
      "Growing dental clinic looking for a modern online presence and appointment management.",

    contactPerson: {
      name: "Amit Kumar",
      role: "Manager",
      phone: "+91 87654 32109",
      email: "amit@brightsmile.com",
      avatar: "AK",
    },

    projects: [
      {
        id: 1,
        name: "Clinic Website",
        type: "Website Development",
        status: "In Progress",
        startDate: "01 Sep 2025",
        endDate: "30 Sep 2025",
      },
    ],

    timeline: [
      {
        title: "Lead Created",
        date: "02 Sep 2025",
        time: "09:20 AM",
        status: "New",
      },
      {
        title: "Contacted",
        date: "05 Sep 2025",
        time: "01:30 PM",
        status: "Contacted",
      },
    ],

    activities: [
      {
        title: "Phone call completed",
        date: "09 Sep 2025",
        time: "04:30 PM",
      },
    ],

    notes: [],

    tags: ["Healthcare", "Dental Care"],
  },

  {
    id: 3,
    name: "Pooja Khandelwal",
    role: "Owner",
    company: "Dental Plus",
    phone: "+91 99887 66554",
    email: "pooja@dentalplus.in",
    industry: "Healthcare",
    status: "Pending",
    lastContact: "08 Sep 2025, 02:10 PM",

    clientId: "#CLI003",
    source: "Social Media",
    businessType: "Clinic",
    companySize: "1 - 10 Employees",
    address: "Delhi, India",
    gstNumber: "—",
    panNumber: "—",

    website: "www.dentalplus.in",
    description:
      "Dental Plus is looking for a complete redesign with online appointment booking.",

    contactPerson: {
      name: "Pooja Khandelwal",
      role: "Owner",
      phone: "+91 99887 66554",
      email: "pooja@dentalplus.in",
      avatar: "PK",
    },

    projects: [
      {
        id: 1,
        name: "Dental Website Redesign",
        type: "Website Development",
        status: "Proposal Sent",
        startDate: "08 Sep 2025",
        endDate: "—",
      },
    ],

    timeline: [
      {
        title: "Lead Created",
        date: "06 Sep 2025",
        time: "10:00 AM",
        status: "New",
      },
      {
        title: "Interested",
        date: "08 Sep 2025",
        time: "02:10 PM",
        status: "Interested",
      },
    ],

    activities: [
      {
        title: "Requirements discussed",
        date: "08 Sep 2025",
        time: "02:10 PM",
      },
    ],

    notes: [],

    tags: ["Healthcare", "Dental Care"],
  },

  {
    id: 4,
    name: "Rahul Saini",
    role: "Founder",
    company: "Care Dental",
    phone: "+91 96543 21098",
    email: "rahul@caredental.com",
    industry: "Healthcare",
    status: "Active",
    lastContact: "07 Sep 2025, 11:20 AM",

    clientId: "#CLI004",
    source: "Google Ads",
    businessType: "Clinic",
    companySize: "11 - 50 Employees",
    address: "Indore, Madhya Pradesh",
    gstNumber: "—",
    panNumber: "—",

    website: "www.caredental.com",
    description:
      "Care Dental requires a complete patient management and booking platform.",

    contactPerson: {
      name: "Rahul Saini",
      role: "Founder",
      phone: "+91 96543 21098",
      email: "rahul@caredental.com",
      avatar: "RS",
    },

    projects: [
      {
        id: 1,
        name: "Patient Portal",
        type: "Web Application",
        status: "In Progress",
        startDate: "07 Sep 2025",
        endDate: "—",
      },
    ],

    timeline: [
      {
        title: "Client Created",
        date: "07 Sep 2025",
        time: "11:20 AM",
        status: "Active",
      },
    ],

    activities: [
      {
        title: "Project discussion",
        date: "07 Sep 2025",
        time: "11:20 AM",
      },
    ],

    notes: [],

    tags: ["Healthcare", "Web Application"],
  },

  {
    id: 5,
    name: "Anjali Verma",
    role: "Owner",
    company: "Healthy Smiles",
    phone: "+91 91234 56789",
    email: "anjali@healthysmiles.com",
    industry: "Healthcare",
    status: "Pending",
    lastContact: "06 Sep 2025, 03:40 PM",

    clientId: "#CLI005",
    source: "Website",
    businessType: "Clinic",
    companySize: "1 - 10 Employees",
    address: "Udaipur, Rajasthan",
    gstNumber: "—",
    panNumber: "—",

    website: "www.healthysmiles.com",
    description:
      "Healthy Smiles is planning a complete business website with online booking.",

    contactPerson: {
      name: "Anjali Verma",
      role: "Owner",
      phone: "+91 91234 56789",
      email: "anjali@healthysmiles.com",
      avatar: "AV",
    },

    projects: [
      {
        id: 1,
        name: "Business Website",
        type: "Website Development",
        status: "Proposal Sent",
        startDate: "06 Sep 2025",
        endDate: "—",
      },
    ],

    timeline: [],
    activities: [],
    notes: [],
    tags: ["Healthcare"],
  },

  {
    id: 6,
    name: "Vikash Gupta",
    role: "Manager",
    company: "Dental World",
    phone: "+91 94567 89012",
    email: "vikash@dentalworld.com",
    industry: "Healthcare",
    status: "Active",
    lastContact: "05 Sep 2025, 01:15 PM",

    clientId: "#CLI006",
    source: "Referral",
    businessType: "Clinic",
    companySize: "11 - 50 Employees",
    address: "Kota, Rajasthan",
    gstNumber: "—",
    panNumber: "—",

    website: "www.dentalworld.com",
    description: "Dental World is an existing website development client.",

    contactPerson: {
      name: "Vikash Gupta",
      role: "Manager",
      phone: "+91 94567 89012",
      email: "vikash@dentalworld.com",
      avatar: "VG",
    },

    projects: [
      {
        id: 1,
        name: "Dental World Website",
        type: "Website Development",
        status: "Completed",
        startDate: "01 Sep 2025",
        endDate: "20 Sep 2025",
      },
    ],

    timeline: [],
    activities: [],
    notes: [],
    tags: ["Healthcare", "Completed"],
  },

  {
    id: 7,
    name: "Neha Tiwari",
    role: "Owner",
    company: "Pearl Dental",
    phone: "+91 92345 67890",
    email: "neha@pearldental.com",
    industry: "Healthcare",
    status: "Follow Up",
    lastContact: "04 Sep 2025, 11:10 AM",

    clientId: "#CLI007",
    source: "Social Media",
    businessType: "Clinic",
    companySize: "1 - 10 Employees",
    address: "Bhopal, Madhya Pradesh",
    gstNumber: "—",
    panNumber: "—",

    website: "www.pearldental.com",
    description: "Pearl Dental is considering a basic business website.",

    contactPerson: {
      name: "Neha Tiwari",
      role: "Owner",
      phone: "+91 92345 67890",
      email: "neha@pearldental.com",
      avatar: "NT",
    },

    projects: [],
    timeline: [],
    activities: [],
    notes: [],
    tags: ["Healthcare"],
  },

  {
    id: 8,
    name: "Aditya Bansal",
    role: "CEO",
    company: "Perfect Smile",
    phone: "+91 88877 66643",
    email: "aditya@perfectsmile.com",
    industry: "Healthcare",
    status: "Active",
    lastContact: "03 Sep 2025, 04:20 PM",

    clientId: "#CLI008",
    source: "Website",
    businessType: "Clinic",
    companySize: "11 - 50 Employees",
    address: "Jaipur, Rajasthan",
    gstNumber: "—",
    panNumber: "—",

    website: "www.perfectsmile.com",
    description: "Perfect Smile needs website and appointment booking.",

    contactPerson: {
      name: "Aditya Bansal",
      role: "CEO",
      phone: "+91 88877 66643",
      email: "aditya@perfectsmile.com",
      avatar: "AB",
    },

    projects: [],
    timeline: [],
    activities: [],
    notes: [],
    tags: ["Healthcare"],
  },

  {
    id: 9,
    name: "Sonal Patel",
    role: "Owner",
    company: "Shree Dental Care",
    phone: "+91 77665 44332",
    email: "sonal@shreedental.com",
    industry: "Healthcare",
    status: "Active",
    lastContact: "02 Sep 2025, 01:00 PM",

    clientId: "#CLI009",
    source: "Google Ads",
    businessType: "Clinic",
    companySize: "1 - 10 Employees",
    address: "Ahmedabad, Gujarat",
    gstNumber: "—",
    panNumber: "—",

    website: "www.shreedental.com",
    description: "Shree Dental Care is using website and booking services.",

    contactPerson: {
      name: "Sonal Patel",
      role: "Owner",
      phone: "+91 77665 44332",
      email: "sonal@shreedental.com",
      avatar: "SP",
    },

    projects: [],
    timeline: [],
    activities: [],
    notes: [],
    tags: ["Healthcare"],
  },

  {
    id: 10,
    name: "Mohit Garg",
    role: "Manager",
    company: "Family Dental",
    phone: "+91 70123 45678",
    email: "mohit@familydental.com",
    industry: "Healthcare",
    status: "Pending",
    lastContact: "01 Sep 2025, 10:30 AM",

    clientId: "#CLI010",
    source: "Referral",
    businessType: "Clinic",
    companySize: "1 - 10 Employees",
    address: "Kota, Rajasthan",
    gstNumber: "—",
    panNumber: "—",

    website: "www.familydental.com",
    description: "Family Dental is interested in website and booking services.",

    contactPerson: {
      name: "Mohit Garg",
      role: "Manager",
      phone: "+91 70123 45678",
      email: "mohit@familydental.com",
      avatar: "MG",
    },

    projects: [],
    timeline: [],
    activities: [],
    notes: [],
    tags: ["Healthcare"],
  },

  {
    id: 11,
    name: "Riya Mehta",
    role: "Director",
    company: "City Care Hospital",
    phone: "+91 90909 12121",
    email: "riya@citycare.com",
    industry: "Healthcare",
    status: "Active",
    lastContact: "30 Aug 2025, 03:20 PM",

    clientId: "#CLI011",
    source: "Referral",
    businessType: "Hospital",
    companySize: "51 - 100 Employees",
    address: "Delhi, India",
    gstNumber: "—",
    panNumber: "—",

    website: "www.citycare.com",
    description: "Healthcare organization requiring digital solutions.",

    contactPerson: {
      name: "Riya Mehta",
      role: "Director",
      phone: "+91 90909 12121",
      email: "riya@citycare.com",
      avatar: "RM",
    },

    projects: [],
    timeline: [],
    activities: [],
    notes: [],
    tags: ["Healthcare"],
  },

  {
    id: 12,
    name: "Karan Joshi",
    role: "Owner",
    company: "Smile Care",
    phone: "+91 90000 11122",
    email: "karan@smilecare.com",
    industry: "Healthcare",
    status: "Follow Up",
    lastContact: "29 Aug 2025, 12:10 PM",

    clientId: "#CLI012",
    source: "Website",
    businessType: "Clinic",
    companySize: "1 - 10 Employees",
    address: "Ajmer, Rajasthan",
    gstNumber: "—",
    panNumber: "—",

    website: "www.smilecare.com",
    description: "Dental clinic looking for online growth solutions.",

    contactPerson: {
      name: "Karan Joshi",
      role: "Owner",
      phone: "+91 90000 11122",
      email: "karan@smilecare.com",
      avatar: "KJ",
    },

    projects: [],
    timeline: [],
    activities: [],
    notes: [],
    tags: ["Healthcare"],
  },
];

const STORAGE_KEY = "prism-crm-clients";

export function getStoredClients(): Client[] {
  if (typeof window === "undefined") {
    return initialClients;
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(initialClients)
      );

      return initialClients;
    }

    const parsed = JSON.parse(saved);

    if (!Array.isArray(parsed)) {
      return initialClients;
    }

    return parsed;
  } catch {
    return initialClients;
  }
}

export function saveClients(clients: Client[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(clients)
    );
  }
}