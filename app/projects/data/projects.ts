export type ProjectStatus =
  | "In Progress"
  | "Completed"
  | "On Hold"
  | "Overdue"
  | "Pending";

export type ProjectTask = {
  id: number;
  name: string;
  assignee: string;
  priority: "High" | "Medium" | "Low";
  status: "Completed" | "In Progress" | "Pending";
  dueDate: string;
};

export type ProjectMember = {
  id: number;
  name: string;
  role: string;
  tag: string;
  avatar: string;
};

export type ProjectActivity = {
  id: number;
  title: string;
  description: string;
  user: string;
  time: string;
};

export type ProjectFile = {
  id: number;
  name: string;
  size: string;
  type: "PDF" | "FIG" | "SQL" | "ZIP" | "DOC";
};

export type Project = {
  id: number;
  name: string;
  client: string;
  clientEmail: string;
  clientPhone: string;
  category: string;
  type: string;
  description: string;
  status: ProjectStatus;
  progress: number;
  priority: "High" | "Medium" | "Low";
  startDate: string;
  deadline: string;
  remaining: string;
  budget: string;

  tasks: ProjectTask[];
  members: ProjectMember[];
  activities: ProjectActivity[];
  files: ProjectFile[];
};

const defaultProjects: Project[] = [
  {
    id: 1,
    name: "Dental Clinic Website",
    client: "Smile Dental Clinic",
    clientEmail: "smile@smiledental.com",
    clientPhone: "+91 98765 43210",
    category: "Healthcare",
    type: "Website Development",
    description:
      "Modern responsive dental clinic website with appointment booking, service pages, doctor profile and contact management.",
    status: "In Progress",
    progress: 75,
    priority: "High",
    startDate: "05 Sep 2025",
    deadline: "15 Sep 2025",
    remaining: "4 Days",
    budget: "₹85,000",

    tasks: [
      {
        id: 1,
        name: "Design Login & Dashboard",
        assignee: "Pooja Khandelwal",
        priority: "High",
        status: "Completed",
        dueDate: "10 Sep 2025",
      },
      {
        id: 2,
        name: "Website Homepage",
        assignee: "Amit Kumar",
        priority: "High",
        status: "Completed",
        dueDate: "11 Sep 2025",
      },
      {
        id: 3,
        name: "Appointment Module",
        assignee: "Sneha Patel",
        priority: "Medium",
        status: "In Progress",
        dueDate: "13 Sep 2025",
      },
      {
        id: 4,
        name: "Testing & Bug Fixes",
        assignee: "Amit Kumar",
        priority: "Low",
        status: "Pending",
        dueDate: "15 Sep 2025",
      },
    ],

    members: [
      {
        id: 1,
        name: "Vishal Thakur",
        role: "Project Manager",
        tag: "PM",
        avatar: "VT",
      },
      {
        id: 2,
        name: "Pooja Khandelwal",
        role: "Frontend Developer",
        tag: "Dev",
        avatar: "PK",
      },
      {
        id: 3,
        name: "Amit Kumar",
        role: "Backend Developer",
        tag: "Dev",
        avatar: "AK",
      },
      {
        id: 4,
        name: "Sneha Patel",
        role: "UI/UX Designer",
        tag: "Design",
        avatar: "SP",
      },
    ],

    activities: [
      {
        id: 1,
        title: "Task updated",
        description: "Appointment module moved to In Progress",
        user: "Pooja Khandelwal",
        time: "2 hours ago",
      },
      {
        id: 2,
        title: "Comment added",
        description: "Client requested changes to homepage",
        user: "Amit Kumar",
        time: "5 hours ago",
      },
      {
        id: 3,
        title: "File uploaded",
        description: "design_mockup.fig",
        user: "Sneha Patel",
        time: "8 hours ago",
      },
      {
        id: 4,
        title: "Status changed",
        description: "Project status changed to In Progress",
        user: "Vishal Thakur",
        time: "1 day ago",
      },
      {
        id: 5,
        title: "New note added",
        description: "Client approved UI design",
        user: "Vishal Thakur",
        time: "1 day ago",
      },
    ],

    files: [
      {
        id: 1,
        name: "project_requirements.pdf",
        size: "2.4 MB",
        type: "PDF",
      },
      {
        id: 2,
        name: "design_mockup.fig",
        size: "5.8 MB",
        type: "FIG",
      },
      {
        id: 3,
        name: "database_schema.sql",
        size: "1.2 MB",
        type: "SQL",
      },
      {
        id: 4,
        name: "wireframes.zip",
        size: "8.6 MB",
        type: "ZIP",
      },
    ],
  },

  {
    id: 2,
    name: "School ERP System",
    client: "Bright Future School",
    clientEmail: "info@brightfuture.edu",
    clientPhone: "+91 98765 43210",
    category: "Educational",
    type: "ERP Development",
    description:
      "Complete school ERP system with student management, fee management, attendance, examination and parent-teacher portal.",
    status: "In Progress",
    progress: 75,
    priority: "High",
    startDate: "10 Sep 2025",
    deadline: "20 Sep 2025",
    remaining: "5 Days",
    budget: "₹1,20,000",

    tasks: [
      {
        id: 1,
        name: "Design Login & Dashboard",
        assignee: "Pooja Khandelwal",
        priority: "High",
        status: "Completed",
        dueDate: "12 Sep 2025",
      },
      {
        id: 2,
        name: "Student Management Module",
        assignee: "Amit Kumar",
        priority: "High",
        status: "In Progress",
        dueDate: "15 Sep 2025",
      },
      {
        id: 3,
        name: "Fee Management Module",
        assignee: "Sneha Patel",
        priority: "Medium",
        status: "In Progress",
        dueDate: "17 Sep 2025",
      },
      {
        id: 4,
        name: "Parent Portal Development",
        assignee: "Pooja Khandelwal",
        priority: "Medium",
        status: "Pending",
        dueDate: "18 Sep 2025",
      },
      {
        id: 5,
        name: "Testing & Bug Fixes",
        assignee: "Amit Kumar",
        priority: "Low",
        status: "Pending",
        dueDate: "19 Sep 2025",
      },
    ],

    members: [
      {
        id: 1,
        name: "Vishal Thakur",
        role: "Project Manager",
        tag: "PM",
        avatar: "VT",
      },
      {
        id: 2,
        name: "Pooja Khandelwal",
        role: "Frontend Developer",
        tag: "Dev",
        avatar: "PK",
      },
      {
        id: 3,
        name: "Amit Kumar",
        role: "Backend Developer",
        tag: "Dev",
        avatar: "AK",
      },
      {
        id: 4,
        name: "Sneha Patel",
        role: "UI/UX Designer",
        tag: "Design",
        avatar: "SP",
      },
    ],

    activities: [
      {
        id: 1,
        title: "Task updated",
        description: "Student Management Module",
        user: "Pooja Khandelwal",
        time: "2 hours ago",
      },
      {
        id: 2,
        title: "Comment added",
        description: "Need to update the API endpoint.",
        user: "Amit Kumar",
        time: "5 hours ago",
      },
      {
        id: 3,
        title: "File uploaded",
        description: "design_mockup.fig",
        user: "Sneha Patel",
        time: "8 hours ago",
      },
      {
        id: 4,
        title: "Status changed",
        description: "In Progress",
        user: "Vishal Thakur",
        time: "1 day ago",
      },
      {
        id: 5,
        title: "New note added",
        description: "Client approved the UI design.",
        user: "Vishal Thakur",
        time: "1 day ago",
      },
    ],

    files: [
      {
        id: 1,
        name: "project_requirements.pdf",
        size: "2.4 MB",
        type: "PDF",
      },
      {
        id: 2,
        name: "design_mockup.fig",
        size: "5.8 MB",
        type: "FIG",
      },
      {
        id: 3,
        name: "database_schema.sql",
        size: "1.2 MB",
        type: "SQL",
      },
      {
        id: 4,
        name: "wireframes.zip",
        size: "8.6 MB",
        type: "ZIP",
      },
    ],
  },

  {
    id: 3,
    name: "E-commerce App",
    client: "ABC Mart",
    clientEmail: "info@abcmart.com",
    clientPhone: "+91 98765 43211",
    category: "Retail",
    type: "Mobile App Development",
    description:
      "E-commerce application with product catalog, cart, payments, order management and customer dashboard.",
    status: "On Hold",
    progress: 30,
    priority: "Medium",
    startDate: "01 Sep 2025",
    deadline: "25 Sep 2025",
    remaining: "14 Days",
    budget: "₹95,000",

    tasks: [
      {
        id: 1,
        name: "UI Design",
        assignee: "Sneha Patel",
        priority: "High",
        status: "Completed",
        dueDate: "08 Sep 2025",
      },
      {
        id: 2,
        name: "Product Module",
        assignee: "Amit Kumar",
        priority: "High",
        status: "In Progress",
        dueDate: "18 Sep 2025",
      },
    ],

    members: [
      {
        id: 1,
        name: "Vishal Thakur",
        role: "Project Manager",
        tag: "PM",
        avatar: "VT",
      },
      {
        id: 2,
        name: "Amit Kumar",
        role: "Developer",
        tag: "Dev",
        avatar: "AK",
      },
    ],

    activities: [
      {
        id: 1,
        title: "Project placed on hold",
        description: "Waiting for client approval",
        user: "Vishal Thakur",
        time: "1 day ago",
      },
    ],

    files: [],
  },
];

export function getProjects(): Project[] {
  if (typeof window === "undefined") {
    return defaultProjects;
  }

  try {
    const stored = localStorage.getItem("projects");

    if (!stored) {
      return defaultProjects;
    }

    const parsed = JSON.parse(stored);

    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }

    return defaultProjects;
  } catch {
    return defaultProjects;
  }
}

export function saveProjects(projects: Project[]) {
  if (typeof window === "undefined") return;

  localStorage.setItem("projects", JSON.stringify(projects));
}