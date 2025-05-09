
export type Employee = {
  id: string;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive' | 'on-leave';
  imageUrl: string;
  startDate: string;
  manager?: string;
};

export type LeaveRequest = {
  id: string;
  employeeId: string;
  employeeName: string;
  type: 'annual' | 'sick' | 'personal' | 'maternity' | 'paternity' | 'unpaid';
  status: 'pending' | 'approved' | 'rejected';
  startDate: string;
  endDate: string;
  reason?: string;
  approver?: string;
  approvedDate?: string;
};

export type Announcement = {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
  priority: 'low' | 'medium' | 'high';
  category: 'general' | 'event' | 'policy' | 'it' | 'other';
};

export type JobListing = {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  status: 'open' | 'closed' | 'on-hold';
  postedDate: string;
  applicants: number;
  description: string;
  requirements: string[];
};

// Mock Data

export const employees: Employee[] = [
  {
    id: "e001",
    name: "John Doe",
    position: "Software Developer",
    department: "Engineering",
    email: "john.doe@company.com",
    phone: "(555) 123-4567",
    status: "active",
    imageUrl: "https://i.pravatar.cc/150?u=e001",
    startDate: "2021-03-15"
  },
  {
    id: "e002",
    name: "Jane Smith",
    position: "HR Manager",
    department: "Human Resources",
    email: "jane.smith@company.com",
    phone: "(555) 987-6543",
    status: "active",
    imageUrl: "https://i.pravatar.cc/150?u=e002",
    startDate: "2019-11-01"
  },
  {
    id: "e003",
    name: "Michael Johnson",
    position: "Marketing Specialist",
    department: "Marketing",
    email: "michael.johnson@company.com",
    phone: "(555) 456-7890",
    status: "on-leave",
    imageUrl: "https://i.pravatar.cc/150?u=e003",
    startDate: "2020-06-22"
  },
  {
    id: "e004",
    name: "Emily Davis",
    position: "Product Manager",
    department: "Product",
    email: "emily.davis@company.com",
    phone: "(555) 234-5678",
    status: "active",
    imageUrl: "https://i.pravatar.cc/150?u=e004",
    startDate: "2018-09-10"
  },
  {
    id: "e005",
    name: "Robert Brown",
    position: "Finance Analyst",
    department: "Finance",
    email: "robert.brown@company.com",
    phone: "(555) 876-5432",
    status: "active",
    imageUrl: "https://i.pravatar.cc/150?u=e005",
    startDate: "2022-01-15"
  }
];

export const leaveRequests: LeaveRequest[] = [
  {
    id: "l001",
    employeeId: "e001",
    employeeName: "John Doe",
    type: "annual",
    status: "approved",
    startDate: "2023-06-15",
    endDate: "2023-06-20",
    reason: "Family vacation",
    approver: "Jane Smith",
    approvedDate: "2023-05-25"
  },
  {
    id: "l002",
    employeeId: "e003",
    employeeName: "Michael Johnson",
    type: "sick",
    status: "approved",
    startDate: "2023-05-10",
    endDate: "2023-05-15",
    reason: "Flu recovery",
    approver: "Jane Smith",
    approvedDate: "2023-05-10"
  },
  {
    id: "l003",
    employeeId: "e002",
    employeeName: "Jane Smith",
    type: "personal",
    status: "pending",
    startDate: "2023-07-05",
    endDate: "2023-07-06",
    reason: "Personal appointment"
  },
  {
    id: "l004",
    employeeId: "e004",
    employeeName: "Emily Davis",
    type: "annual",
    status: "pending",
    startDate: "2023-08-01",
    endDate: "2023-08-15",
    reason: "Summer holiday"
  },
  {
    id: "l005",
    employeeId: "e005",
    employeeName: "Robert Brown",
    type: "sick",
    status: "rejected",
    startDate: "2023-04-18",
    endDate: "2023-04-19",
    reason: "Doctor's appointment",
    approver: "Jane Smith",
    approvedDate: "2023-04-17"
  }
];

export const announcements: Announcement[] = [
  {
    id: "a001",
    title: "Company Summer Party",
    content: "Please join us for the annual summer party on July 15th at Central Park. Food and drinks will be provided. Family members are welcome!",
    date: "2023-06-01",
    author: "HR Team",
    priority: "medium",
    category: "event"
  },
  {
    id: "a002",
    title: "New Health Insurance Policy",
    content: "We're pleased to announce our new improved health insurance policy that will take effect from August 1st. Details have been sent to your email.",
    date: "2023-06-15",
    author: "Benefits Team",
    priority: "high",
    category: "policy"
  },
  {
    id: "a003",
    title: "IT System Maintenance",
    content: "Our IT systems will be undergoing maintenance this weekend (June 24-25). Please save your work and log out before leaving on Friday.",
    date: "2023-06-20",
    author: "IT Department",
    priority: "high",
    category: "it"
  },
  {
    id: "a004",
    title: "New Product Launch Success",
    content: "Congratulations to everyone involved in the successful launch of our new product line! We've exceeded our sales targets by 25%!",
    date: "2023-06-10",
    author: "Executive Team",
    priority: "medium",
    category: "general"
  },
  {
    id: "a005",
    title: "Office Recycling Program",
    content: "We're launching a new recycling initiative in the office. New bins will be placed throughout the building. Please review the attached guidelines.",
    date: "2023-05-28",
    author: "Facilities Management",
    priority: "low",
    category: "general"
  }
];

export const jobListings: JobListing[] = [
  {
    id: "j001",
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "New York, NY (Hybrid)",
    type: "full-time",
    status: "open",
    postedDate: "2023-06-01",
    applicants: 12,
    description: "We are seeking a skilled Senior Frontend Developer to join our growing engineering team to build innovative web applications.",
    requirements: [
      "5+ years of experience with React, Vue, or Angular",
      "Strong understanding of JavaScript, HTML, and CSS",
      "Experience with responsive design and cross-browser compatibility",
      "Familiarity with REST APIs and modern frontend build tools"
    ]
  },
  {
    id: "j002",
    title: "HR Coordinator",
    department: "Human Resources",
    location: "Chicago, IL (On-site)",
    type: "full-time",
    status: "open",
    postedDate: "2023-06-10",
    applicants: 8,
    description: "Join our Human Resources team as an HR Coordinator to support various HR functions and employee engagement initiatives.",
    requirements: [
      "Bachelor's degree in Human Resources or related field",
      "2+ years of HR administrative experience",
      "Familiarity with HRIS systems",
      "Excellent communication and interpersonal skills"
    ]
  },
  {
    id: "j003",
    title: "Marketing Intern",
    department: "Marketing",
    location: "Remote",
    type: "internship",
    status: "open",
    postedDate: "2023-06-15",
    applicants: 24,
    description: "Excellent opportunity for marketing students to gain hands-on experience in digital marketing campaigns and social media management.",
    requirements: [
      "Currently enrolled in a Bachelor's program in Marketing or related field",
      "Strong writing skills and creativity",
      "Familiarity with social media platforms",
      "Ability to commit 20 hours per week"
    ]
  },
  {
    id: "j004",
    title: "Data Analyst",
    department: "Analytics",
    location: "Boston, MA (Hybrid)",
    type: "full-time",
    status: "on-hold",
    postedDate: "2023-05-20",
    applicants: 19,
    description: "We're looking for a detail-oriented Data Analyst to help us transform data into insights that drive business decisions.",
    requirements: [
      "Bachelor's degree in Statistics, Computer Science, or related field",
      "2+ years experience with data analysis tools (SQL, Excel, Tableau)",
      "Experience with statistical analysis and data visualization",
      "Strong problem-solving skills and attention to detail"
    ]
  },
  {
    id: "j005",
    title: "Customer Support Representative",
    department: "Customer Service",
    location: "Dallas, TX (On-site)",
    type: "part-time",
    status: "closed",
    postedDate: "2023-05-15",
    applicants: 31,
    description: "Join our customer support team to help provide excellent service to our customers via phone, email, and chat.",
    requirements: [
      "High school diploma or equivalent",
      "1+ years of customer service experience",
      "Excellent communication and problem-solving skills",
      "Ability to work evenings and weekends"
    ]
  }
];

// Dashboard Statistics
export const dashboardStats = {
  totalEmployees: 156,
  activeEmployees: 149,
  onLeaveEmployees: 7,
  pendingLeaveRequests: 12,
  openPositions: 8,
  newHiresThisMonth: 4,
  departmentDistribution: [
    { department: "Engineering", count: 45 },
    { department: "Marketing", count: 22 },
    { department: "Sales", count: 38 },
    { department: "Finance", count: 18 },
    { department: "HR", count: 12 },
    { department: "Operations", count: 21 }
  ],
  leavesByMonth: [
    { month: "Jan", count: 14 },
    { month: "Feb", count: 16 },
    { month: "Mar", count: 19 },
    { month: "Apr", count: 21 },
    { month: "May", count: 25 },
    { month: "Jun", count: 30 },
    { month: "Jul", count: 0 },
    { month: "Aug", count: 0 },
    { month: "Sep", count: 0 },
    { month: "Oct", count: 0 },
    { month: "Nov", count: 0 },
    { month: "Dec", count: 0 }
  ]
};
