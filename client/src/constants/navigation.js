import {
    LayoutDashboard,
    Briefcase,
    Bookmark,
    FileText,
    User,
    PlusCircle,
    Users,
    BarChart3,
} from "lucide-react";

export const candidateNav = [
    {
        label: "Dashboard",
        path: "/candidate",
        icon: LayoutDashboard,
    },
    {
        label: "Browse Jobs",
        path: "/candidate/jobs",
        icon: Briefcase,
    },
    {
        label: "Saved Jobs",
        path: "/candidate/saved",
        icon: Bookmark,
    },
    {
        label: "Applications",
        path: "/candidate/applications",
        icon: FileText,
    },
    {
        label: "Profile",
        path: "/candidate/profile",
        icon: User,
    },
];

export const recruiterNav = [
    {
        label: "My Jobs",
        path: "/recruiter/dashboard",
        icon: Briefcase,
    },
    {
        label: "Create Job",
        path: "/recruiter/jobs/create",
        icon: PlusCircle,
    },
    {
        label: "Profile",
        path: "/recruiter/profile",
        icon: User,
    },
    {
    label: "Analytics",
    path: "/recruiter/analytics",
    icon: BarChart3,
},
];