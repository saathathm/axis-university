import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Award,
  BookOpen,
  CheckCircle2,
  Download,
  FileCheck,
  FileText,
  GraduationCap,
  Mail,
  MessageSquare,
  School,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";

import { getDashboardData } from "../../features/dashboard/dashboardActions";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { data: dashboardData = null, loading } = useSelector(
    (state) => state.dashboardState,
  );

  useEffect(() => {
    dispatch(getDashboardData());
  }, [dispatch]);

  const stats = useMemo(() => {
    const summary = dashboardData || {};

    const applications = summary.applications || {};
    const certificates = summary.certificates || {};
    const messages = summary.messages || {};

    return [
      {
        label: "Total Courses",
        value: summary.courses || 0,
        icon: BookOpen,
        path: "/admin/courses",
        helper: "Published and managed courses",
      },
      {
        label: "Applications",
        value: applications.total || 0,
        icon: FileText,
        path: "/admin/applications",
        helper: `${applications.pending || 0} pending review`,
      },
      {
        label: "Enrolled",
        value: applications.enrolled || 0,
        icon: GraduationCap,
        path: "/admin/enrollments",
        helper: "Approved student applications",
      },
      {
        label: "Certificates",
        value: certificates.valid || 0,
        icon: FileCheck,
        path: "/admin/certificates",
        helper: "Valid certificates issued",
      },
      {
        label: "Downloads",
        value: summary.downloads || 0,
        icon: Download,
        path: "/admin/downloads",
        helper: "Course resources and files",
      },
      {
        label: "Messages",
        value: messages.total || 0,
        icon: MessageSquare,
        path: "/admin/messages",
        helper: `${messages.unread || 0} unread messages`,
      },
      {
        label: "Newsletter",
        value: summary.newsletterSubscriptions || 0,
        icon: Mail,
        path: "/admin/newsletter-subscriptions",
        helper: "Subscribed users",
      },
    ];
  }, [dashboardData]);

  const recentApplications = dashboardData?.recentApplications || [];
  const recentMessages = dashboardData?.recentMessages || [];

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-3xl border bg-gradient-primary p-6 text-primary-foreground shadow-soft md:p-8">
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-accent/30 blur-3xl"
          />

          <div
            aria-hidden="true"
            className="absolute -bottom-28 -left-28 h-72 w-72 rounded-full bg-primary-glow/40 blur-3xl"
          />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-foreground/75">
                Admin Dashboard
              </p>

              <h1 className="mt-3 text-3xl font-extrabold md:text-4xl">
                Welcome back, Admin
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-primary-foreground/80">
                Manage applications, courses, certificates, downloads, messages,
                and newsletter subscriptions from one place.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:flex">
              <Link
                to="/admin/applications"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-background px-5 py-3 text-sm font-semibold text-primary shadow-glow transition-smooth hover:opacity-90"
              >
                <FileText className="h-4 w-4" />
                Applications
              </Link>

              <Link
                to="/admin/courses"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-primary-foreground/30 bg-primary-foreground/10 px-5 py-3 text-sm font-semibold text-primary-foreground transition-smooth hover:bg-primary-foreground/20"
              >
                <BookOpen className="h-4 w-4" />
                Courses
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.slice(0, 4).map((item) => (
          <StatCard key={item.label} item={item} />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            {stats.slice(4).map((item) => (
              <SmallStatCard key={item.label} item={item} />
            ))}
          </div>

          <div className="rounded-3xl border bg-card p-6 shadow-soft">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-bold text-primary">
                  Recent Applications
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  Latest course applications submitted from the website.
                </p>
              </div>

              <Link
                to="/admin/applications"
                className="text-sm font-semibold text-accent hover:underline"
              >
                View all
              </Link>
            </div>

            <div className="mt-5 overflow-hidden rounded-2xl border">
              <table className="w-full text-left text-sm">
                <thead className="bg-secondary/60 text-xs uppercase tracking-wide text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3">Applicant</th>
                    <th className="px-4 py-3">Course</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Submitted</th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {loading ? (
                    <tr>
                      <td
                        colSpan="4"
                        className="bg-background px-4 py-8 text-center text-muted-foreground"
                      >
                        Loading dashboard...
                      </td>
                    </tr>
                  ) : recentApplications.length > 0 ? (
                    recentApplications.map((application) => (
                      <tr key={application.id} className="bg-background">
                        <td className="px-4 py-4">
                          <div className="font-semibold text-foreground">
                            {application.first_name} {application.last_name}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {application.email_address}
                          </div>
                        </td>

                        <td className="px-4 py-4 text-muted-foreground">
                          {application.course?.name || "-"}
                        </td>

                        <td className="px-4 py-4">
                          <StatusBadge status={application.status} />
                        </td>

                        <td className="px-4 py-4 text-muted-foreground">
                          {formatDate(application.submitted_at)}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="bg-background px-4 py-8 text-center text-muted-foreground"
                      >
                        No applications found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-3xl border bg-card p-6 shadow-soft">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-primary">
                  Quick Actions
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  Common admin tasks.
                </p>
              </div>

              <TrendingUp className="h-6 w-6 text-accent" />
            </div>

            <div className="mt-5 grid gap-3">
              <QuickAction
                icon={School}
                label="Manage Faculties"
                path="/admin/faculties"
              />
              <QuickAction
                icon={BookOpen}
                label="Manage Courses"
                path="/admin/courses"
              />
              <QuickAction
                icon={FileCheck}
                label="Issue Certificates"
                path="/admin/certificates"
              />
              <QuickAction
                icon={Download}
                label="Upload Downloads"
                path="/admin/downloads"
              />
              <QuickAction
                icon={Star}
                label="Manage Testimonials"
                path="/admin/testimonials"
              />
              <QuickAction
                icon={Award}
                label="Manage Recognitions"
                path="/admin/recognitions"
              />
            </div>
          </div>

          <div className="rounded-3xl border bg-card p-6 shadow-soft">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-primary">
                  Recent Messages
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  Latest contact form messages.
                </p>
              </div>

              <Link
                to="/admin/messages"
                className="text-sm font-semibold text-accent hover:underline"
              >
                View
              </Link>
            </div>

            <div className="mt-5 space-y-3">
              {loading ? (
                <p className="rounded-2xl border bg-background p-5 text-center text-sm text-muted-foreground">
                  Loading dashboard...
                </p>
              ) : recentMessages.length > 0 ? (
                recentMessages.map((message) => (
                  <div
                    key={message.id}
                    className="rounded-2xl border bg-background p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-foreground">
                          {message.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {message.email}
                        </p>
                      </div>

                      <StatusBadge status={message.status} />
                    </div>

                    <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">
                      {message.subject}
                    </p>
                  </div>
                ))
              ) : (
                <p className="rounded-2xl border bg-background p-5 text-center text-sm text-muted-foreground">
                  No messages found.
                </p>
              )}
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
};

const StatCard = ({ item }) => {
  const Icon = item.icon;

  return (
    <Link
      to={item.path}
      className="group rounded-3xl border bg-card p-6 shadow-soft transition-smooth hover:-translate-y-1 hover:shadow-elegant"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-soft text-accent">
          <Icon className="h-6 w-6" />
        </div>

        <CheckCircle2 className="h-5 w-5 text-success opacity-70" />
      </div>

      <div className="mt-5">
        <p className="text-3xl font-extrabold text-primary">{item.value}</p>

        <h3 className="mt-1 font-semibold text-foreground">{item.label}</h3>

        <p className="mt-2 text-sm text-muted-foreground">{item.helper}</p>
      </div>
    </Link>
  );
};

const SmallStatCard = ({ item }) => {
  const Icon = item.icon;

  return (
    <Link
      to={item.path}
      className="rounded-3xl border bg-card p-5 shadow-soft transition-smooth hover:-translate-y-1 hover:shadow-elegant"
    >
      <div className="flex items-center gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-secondary text-accent">
          <Icon className="h-5 w-5" />
        </div>

        <div>
          <p className="text-2xl font-extrabold text-primary">{item.value}</p>
          <p className="text-sm font-semibold text-foreground">{item.label}</p>
        </div>
      </div>

      <p className="mt-3 text-xs text-muted-foreground">{item.helper}</p>
    </Link>
  );
};

const QuickAction = ({ icon: Icon, label, path }) => {
  return (
    <Link
      to={path}
      className="flex items-center justify-between rounded-2xl border bg-background px-4 py-3 text-sm font-semibold text-foreground transition-smooth hover:bg-secondary"
    >
      <span className="inline-flex items-center gap-3">
        <Icon className="h-4 w-4 text-accent" />
        {label}
      </span>

      <span className="text-muted-foreground">→</span>
    </Link>
  );
};

const StatusBadge = ({ status }) => {
  const normalizedStatus = status || "unknown";

  const styles = {
    pending: "bg-warning/10 text-warning border-warning/20",
    enrolled: "bg-success/10 text-success border-success/20",
    rejected: "bg-destructive/10 text-destructive border-destructive/20",
    unread: "bg-warning/10 text-warning border-warning/20",
    read: "bg-secondary text-muted-foreground border-border",
    replied: "bg-success/10 text-success border-success/20",
    valid: "bg-success/10 text-success border-success/20",
    revoked: "bg-destructive/10 text-destructive border-destructive/20",
    expired: "bg-muted text-muted-foreground border-border",
    unknown: "bg-secondary text-muted-foreground border-border",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold capitalize ${
        styles[normalizedStatus] || styles.unknown
      }`}
    >
      {normalizedStatus}
    </span>
  );
};

const formatDate = (date) => {
  if (!date) return "-";

  return new Date(date).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
};

export default Dashboard;
