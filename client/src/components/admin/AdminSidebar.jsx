import { NavLink } from "react-router-dom";
import {
  Award,
  BookOpen,
  Download,
  FileCheck,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Mail,
  MessageSquare,
  School,
  Star,
  Users,
} from "lucide-react";

const navItems = [
  {
    label: "Dashboard",
    path: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Applications",
    path: "/admin/applications",
    icon: FileText,
  },
  {
    label: "Students",
    path: "/admin/students",
    icon: Users,
  },
  {
    label: "Enrollments",
    path: "/admin/enrollments",
    icon: GraduationCap,
  },
  {
    label: "Faculties",
    path: "/admin/faculties",
    icon: School,
  },
  {
    label: "Courses",
    path: "/admin/courses",
    icon: BookOpen,
  },
  {
    label: "Certificates",
    path: "/admin/certificates",
    icon: FileCheck,
  },
  {
    label: "Downloads",
    path: "/admin/downloads",
    icon: Download,
  },
  {
    label: "Testimonials",
    path: "/admin/testimonials",
    icon: Star,
  },
  {
    label: "Recognitions",
    path: "/admin/recognitions",
    icon: Award,
  },
  {
    label: "Messages",
    path: "/admin/messages",
    icon: MessageSquare,
  },
  {
    label: "Newsletter",
    path: "/admin/newsletter-subscriptions",
    icon: Mail,
  },
];

const AdminSidebar = () => {
  return (
    <aside className="fixed inset-y-0 left-0 z-50 hidden w-72 border-r bg-card p-5 lg:block">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
          Axis
        </p>

        <h2 className="mt-2 text-2xl font-bold text-primary">Admin Panel</h2>
      </div>

      <nav className="space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/admin"}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-smooth ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`
              }
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
