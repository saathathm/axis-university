import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BookOpen,
  CalendarDays,
  Eye,
  GraduationCap,
  Pencil,
  Plus,
  Search,
  Trash2,
  UserRound,
} from "lucide-react";

import {
  getEnrollments,
  deleteEnrollment,
} from "../../../features/enrollment/enrollmentActions";
import StatCard from "../../../components/widgets/StatCard";
import { useNavigate } from "react-router-dom";

const Enrollments = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    enrollments = [],
    loading,
    error,
  } = useSelector((state) => state.enrollmentState);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedEnrollment, setSelectedEnrollment] = useState(null);

  useEffect(() => {
    dispatch(getEnrollments());
  }, [dispatch]);

  const filteredEnrollments = useMemo(() => {
    return enrollments.filter((enrollment) => {
      const searchText = search.trim().toLowerCase();

      const studentName = `${enrollment.student?.first_name || ""} ${
        enrollment.student?.last_name || ""
      }`.toLowerCase();

      const courseName = enrollment.course?.name?.toLowerCase() || "";

      const enrollmentNumber =
        enrollment.enrollment_number?.toLowerCase() || "";

      const matchesSearch =
        !searchText ||
        studentName.includes(searchText) ||
        courseName.includes(searchText) ||
        enrollmentNumber.includes(searchText);

      const matchesStatus = !statusFilter || enrollment.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [enrollments, search, statusFilter]);

  const stats = useMemo(() => {
    return {
      total: enrollments.length,

      active: enrollments.filter((enrollment) => enrollment.status === "active")
        .length,

      completed: enrollments.filter(
        (enrollment) => enrollment.status === "completed",
      ).length,

      withdrawn: enrollments.filter(
        (enrollment) => enrollment.status === "withdrawn",
      ).length,
    };
  }, [enrollments]);

  const handleDelete = (enrollmentId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this enrollment?",
    );

    if (!confirmed) return;

    dispatch(deleteEnrollment(enrollmentId)).then(() => {
      dispatch(getEnrollments());
    });
  };

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border bg-card p-6 shadow-soft">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              Enrollments
            </p>

            <h1 className="mt-2 text-2xl font-bold text-primary md:text-3xl">
              Enrollment Management
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Manage student enrollments, course registrations, statuses, and
              academic records.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/admin/enrollments/create")}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-accent px-5 py-3 text-sm font-semibold text-accent-foreground shadow-soft transition-smooth hover:opacity-90"
          >
            <Plus className="h-4 w-4" />
            Add Enrollment
          </button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Enrollments"
          value={stats.total}
          icon={GraduationCap}
        />

        <StatCard title="Active" value={stats.active} icon={BookOpen} />

        <StatCard
          title="Completed"
          value={stats.completed}
          icon={CalendarDays}
        />

        <StatCard title="Withdrawn" value={stats.withdrawn} icon={Trash2} />
      </section>

      <section className="rounded-3xl border bg-card p-5 shadow-soft">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search student, course, or enrollment number..."
              className="w-full rounded-2xl border bg-background px-11 py-3 text-sm outline-none transition-smooth focus:border-accent"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="rounded-2xl border bg-background px-4 py-3 text-sm outline-none transition-smooth focus:border-accent"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="withdrawn">Withdrawn</option>
          </select>
        </div>

        {error && (
          <div className="mt-4 rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        )}
      </section>

      <section className="overflow-hidden rounded-3xl border bg-card shadow-soft">
        <div className="border-b px-6 py-5">
          <h2 className="text-lg font-bold text-primary">Enrollment Records</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Showing {filteredEnrollments.length} of {enrollments.length}{" "}
            enrollments.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px] text-left text-sm">
            <thead className="bg-secondary/60 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-5 py-4">Enrollment</th>
                <th className="px-5 py-4">Student</th>
                <th className="px-5 py-4">Course</th>
                <th className="px-5 py-4">Faculty</th>
                <th className="px-5 py-4">Enrollment Date</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {loading ? (
                <tr>
                  <td
                    colSpan="7"
                    className="px-5 py-12 text-center text-muted-foreground"
                  >
                    Loading enrollments...
                  </td>
                </tr>
              ) : filteredEnrollments.length > 0 ? (
                filteredEnrollments.map((enrollment) => (
                  <tr key={enrollment.id} className="bg-background">
                    <td className="px-5 py-4">
                      <div>
                        <div className="font-semibold text-foreground">
                          {enrollment.enrollment_number ||
                            `ENR-${enrollment.id}`}
                        </div>

                        <p className="mt-1 text-xs text-muted-foreground">
                          #{enrollment.id}
                        </p>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent-soft text-accent">
                          <UserRound className="h-5 w-5" />
                        </div>

                        <div>
                          <div className="font-semibold text-foreground">
                            {enrollment.student?.first_name}{" "}
                            {enrollment.student?.last_name}
                          </div>

                          <p className="mt-1 text-xs text-muted-foreground">
                            {enrollment.student?.email_address}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="font-medium text-foreground">
                        {enrollment.course?.name || "-"}
                      </div>

                      <p className="mt-1 text-xs text-muted-foreground">
                        {enrollment.course?.code || "-"}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-muted-foreground">
                      {enrollment.course?.faculty?.name || "-"}
                    </td>

                    <td className="px-5 py-4 text-muted-foreground">
                      {formatDate(enrollment.enrollment_date)}
                    </td>

                    <td className="px-5 py-4">
                      <StatusBadge status={enrollment.status} />
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedEnrollment(enrollment)}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full border bg-card text-foreground transition-smooth hover:bg-secondary"
                        >
                          <Eye className="h-4 w-4" />
                        </button>

                        <button
                          type="button"
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full border bg-card text-foreground transition-smooth hover:bg-secondary"
                          onClick={() => navigate(`/admin/enrollments/${enrollment.id}/edit`)}
                          title="Edit enrollment"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(enrollment.id)}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-destructive/30 bg-destructive/10 text-destructive transition-smooth hover:bg-destructive hover:text-destructive-foreground"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="px-5 py-12 text-center text-muted-foreground"
                  >
                    No enrollments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {selectedEnrollment && (
        <EnrollmentDetailsModal
          enrollment={selectedEnrollment}
          onClose={() => setSelectedEnrollment(null)}
        />
      )}
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const styles = {
    active: "border-success/20 bg-success/10 text-success",
    completed: "border-primary/20 bg-primary/10 text-primary",
    withdrawn: "border-destructive/20 bg-destructive/10 text-destructive",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold capitalize ${
        styles[status] || "border-border bg-secondary text-muted-foreground"
      }`}
    >
      {status || "unknown"}
    </span>
  );
};

const EnrollmentDetailsModal = ({ enrollment, onClose }) => {
  const details = [
    {
      label: "Enrollment Number",
      value: enrollment.enrollment_number,
    },

    {
      label: "Student",
      value: `${enrollment.student?.first_name || ""} ${
        enrollment.student?.last_name || ""
      }`,
    },

    {
      label: "Student Email",
      value: enrollment.student?.email_address,
    },

    {
      label: "Course",
      value: enrollment.course?.name,
    },

    {
      label: "Course Code",
      value: enrollment.course?.code,
    },

    {
      label: "Faculty",
      value: enrollment.course?.faculty?.name,
    },

    {
      label: "Enrollment Date",
      value: formatDate(enrollment.enrollment_date),
    },

    {
      label: "Status",
      value: enrollment.status,
    },
  ];

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/45 p-4">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border bg-card p-6 shadow-soft">
        <div className="flex items-start justify-between gap-4 border-b pb-4">
          <div>
            <h2 className="text-xl font-bold text-primary">
              Enrollment Details
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Detailed enrollment information.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full border bg-background px-4 py-2 text-sm font-semibold transition-smooth hover:bg-secondary"
          >
            Close
          </button>
        </div>

        <dl className="mt-6 grid gap-4 sm:grid-cols-2">
          {details.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border bg-background p-4"
            >
              <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {item.label}
              </dt>

              <dd className="mt-1 break-words text-sm font-medium text-foreground capitalize">
                {item.value || "-"}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
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

export default Enrollments;
