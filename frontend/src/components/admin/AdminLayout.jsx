import { Link, NavLink } from "react-router-dom";
import { LayoutDashboard, ListChecks, LogOut, Newspaper, Download, Building2, BookOpen, MessageSquareQuote, GraduationCap, BadgeCheck } from "lucide-react";
import { useDispatch } from "react-redux";
import { logoutAdmin } from "@/store/slices/authSlice.js";

const AdminLayout = ({ children }) => {
  const dispatch = useDispatch();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b bg-card/95 backdrop-blur sticky top-0 z-20">
        <div className="container flex h-16 items-center justify-between gap-4">
          <Link to="/admin" className="font-bold text-primary">
            Axis Admin
          </Link>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => dispatch(logoutAdmin())}
              className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold hover:bg-secondary"
            >
              <LogOut className="h-4 w-4" /> Logout
            </button>
          </div>
        </div>
      </header>
      <div className="container grid gap-6 py-8 lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="rounded-2xl border bg-card p-4 shadow-soft h-fit">
          <nav className="space-y-1">
            <NavLink
              to="/admin"
              end
              className={({ isActive }) => `flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium ${isActive ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`}
            >
              <LayoutDashboard className="h-4 w-4" /> Dashboard
            </NavLink>
            <NavLink
              to="/admin/applications"
              className={({ isActive }) => `flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium ${isActive ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`}
            >
              <ListChecks className="h-4 w-4" /> Applications
            </NavLink>
            <NavLink
              to="/admin/faculties"
              className={({ isActive }) => `flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium ${isActive ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`}
            >
              <Building2 className="h-4 w-4" /> Faculties
            </NavLink>
            <NavLink
              to="/admin/programs"
              className={({ isActive }) => `flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium ${isActive ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`}
            >
              <BookOpen className="h-4 w-4" /> Programs
            </NavLink>
            <NavLink
              to="/admin/testimonials"
              className={({ isActive }) => `flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium ${isActive ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`}
            >
              <MessageSquareQuote className="h-4 w-4" /> Testimonials
            </NavLink>
            <NavLink
              to="/admin/students"
              className={({ isActive }) => `flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium ${isActive ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`}
            >
              <GraduationCap className="h-4 w-4" /> Students
            </NavLink>
            <NavLink
              to="/admin/certificates"
              className={({ isActive }) => `flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium ${isActive ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`}
            >
              <BadgeCheck className="h-4 w-4" /> Certificates
            </NavLink>
            <NavLink
              to="/admin/news"
              className={({ isActive }) => `flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium ${isActive ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`}
            >
              <Newspaper className="h-4 w-4" /> News
            </NavLink>
            <NavLink
              to="/admin/downloads"
              className={({ isActive }) => `flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium ${isActive ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`}
            >
              <Download className="h-4 w-4" /> Downloads
            </NavLink>
          </nav>
        </aside>
        <main>{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;