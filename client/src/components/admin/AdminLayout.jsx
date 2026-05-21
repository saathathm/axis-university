import { Link, NavLink } from "react-router-dom";
import {
  BadgeCheck,
  BookOpen,
  Building2,
  Download,
  GraduationCap,
  LayoutDashboard,
  ListChecks,
  LogOut,
  MessageSquareQuote,
  Newspaper,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { logoutAdmin } from "@/actions/authAction";

const navItems = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/applications", label: "Applications", icon: ListChecks },
  { to: "/admin/faculties", label: "Faculties", icon: Building2 },
  { to: "/admin/programs", label: "Programs", icon: BookOpen },
  { to: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { to: "/admin/students", label: "Students", icon: GraduationCap },
  { to: "/admin/certificates", label: "Certificates", icon: BadgeCheck },
  { to: "/admin/news", label: "News", icon: Newspaper },
  { to: "/admin/downloads", label: "Downloads", icon: Download },
];

const AdminLayout = ({ children }) => {
  const dispatch = useDispatch();

  return (
    <div className="admin-page">
      <aside className="admin-sidebar">
        <Link to="/admin" className="admin-brand">
          <span className="admin-brand-mark">A</span>
          <span>
            <span className="admin-brand-title">Axis</span>
            <span className="admin-brand-subtitle">Admin Portal</span>
          </span>
        </Link>

        <nav className="admin-nav-list" aria-label="Admin navigation">
          <span className="admin-nav-label">Manage</span>
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className="admin-nav-link"
              style={({ isActive }) =>
                isActive
                  ? {
                      background: "hsl(184 74% 46%)",
                      color: "#ffffff",
                      boxShadow: "0 14px 30px -16px hsl(184 74% 32%)",
                    }
                  : undefined
              }
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => dispatch(logoutAdmin())}
          className="admin-logout"
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </button>
      </aside>

      <main className="admin-main">
        <header className="admin-topbar">
          <div>
            <p className="admin-topbar-kicker">Administration</p>
            <h1 className="admin-topbar-title">Content workspace</h1>
          </div>
          <nav className="admin-mobile-nav" aria-label="Admin navigation">
            {navItems.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className="admin-mobile-nav-link"
                style={({ isActive }) =>
                  isActive
                    ? {
                        background: "hsl(184 74% 46%)",
                        color: "#ffffff",
                      }
                    : undefined
                }
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>
        </header>

        <div className="admin-content">{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;
