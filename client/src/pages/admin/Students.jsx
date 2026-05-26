import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CalendarDays,
  Eye,
  GraduationCap,
  Mail,
  Phone,
  Plus,
  Search,
  Trash2,
  UserRound,
  Users,
} from "lucide-react";

import { getStudents } from "../../features/student/studentActions";
import { useNavigate } from "react-router-dom";
import StatCard from "../../components/widgets/StatCard";

const Students = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    students = [],
    loading,
    error,
  } = useSelector((state) => state.studentState);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    dispatch(getStudents());
  }, [dispatch]);

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const searchText = search.trim().toLowerCase();

      const fullName = `${student.first_name || ""} ${
        student.last_name || ""
      }`.toLowerCase();

      const matchesSearch =
        !searchText ||
        fullName.includes(searchText) ||
        student.email_address?.toLowerCase().includes(searchText) ||
        student.student_number?.toLowerCase().includes(searchText) ||
        student.passport_number?.toLowerCase().includes(searchText) ||
        student.contact_number?.toLowerCase().includes(searchText);

      const matchesStatus = !statusFilter || student.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [students, search, statusFilter]);

  const counts = useMemo(() => {
    return {
      total: students.length,
      active: students.filter((student) => student.status === "active").length,
      inactive: students.filter((student) => student.status === "inactive")
        .length,
      suspended: students.filter((student) => student.status === "suspended")
        .length,
    };
  }, [students]);

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border bg-card p-6 shadow-soft">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              Students
            </p>

            <h1 className="mt-2 text-2xl font-bold text-primary md:text-3xl">
              Student Records
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              View accepted students, contact details, and their enrollment
              summary.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/admin/students/create")}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-accent px-5 py-3 text-sm font-semibold text-accent-foreground shadow-soft transition-smooth hover:opacity-90"
          >
            <Plus className="h-4 w-4" />
            Add Student
          </button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Students" value={counts.total} icon={Users} />

        <StatCard title="Active" value={counts.active} icon={UserRound} />

        <StatCard
          title="Inactive"
          value={counts.inactive}
          icon={CalendarDays}
        />

        <StatCard title="Suspended" value={counts.suspended} icon={Trash2} />
      </section>

      <section className="rounded-3xl border bg-card p-5 shadow-soft">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by name, email, student no, passport, or contact..."
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
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
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
          <h2 className="text-lg font-bold text-primary">Students</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Showing {filteredStudents.length} of {students.length} students.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1050px] text-left text-sm">
            <thead className="bg-secondary/60 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-5 py-4">Student</th>
                <th className="px-5 py-4">Contact</th>
                <th className="px-5 py-4">Passport</th>
                <th className="px-5 py-4">Location</th>
                <th className="px-5 py-4">Enrollments</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Joined</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {loading ? (
                <tr>
                  <td
                    colSpan="8"
                    className="bg-background px-5 py-10 text-center text-muted-foreground"
                  >
                    Loading students...
                  </td>
                </tr>
              ) : filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr key={student.id} className="bg-background">
                    <td className="px-5 py-4">
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-accent-soft text-accent">
                          <UserRound className="h-5 w-5" />
                        </div>

                        <div>
                          <div className="font-semibold text-foreground">
                            {student.first_name} {student.last_name}
                          </div>

                          <p className="mt-1 text-xs text-muted-foreground">
                            {student.student_number || `STU-${student.id}`}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="h-4 w-4 text-accent" />
                        {student.email_address || "-"}
                      </div>

                      <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                        <Phone className="h-3.5 w-3.5 text-accent" />
                        {student.contact_number || "-"}
                      </div>
                    </td>

                    <td className="px-5 py-4 text-muted-foreground">
                      {student.passport_number || "-"}
                    </td>

                    <td className="px-5 py-4 text-muted-foreground">
                      <div>{student.town_city || "-"}</div>
                      <div className="mt-1 text-xs">
                        {student.country || ""}
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <EnrollmentSummary student={student} />
                    </td>

                    <td className="px-5 py-4">
                      <StatusBadge status={student.status} />
                    </td>

                    <td className="px-5 py-4 text-muted-foreground">
                      {formatDate(student.created_at)}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedStudent(student)}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full border bg-card text-foreground transition-smooth hover:bg-secondary"
                          title="View student"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="bg-background px-5 py-10 text-center text-muted-foreground"
                  >
                    No students found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {selectedStudent && (
        <StudentDetailsModal
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}
    </div>
  );
};

const StudentCount = ({ label, value }) => {
  return (
    <div className="rounded-2xl border bg-background p-4">
      <p className="text-2xl font-extrabold text-primary">{value}</p>

      <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
    </div>
  );
};

const EnrollmentSummary = ({ student }) => {
  const enrollments = Array.isArray(student.enrollments)
    ? student.enrollments
    : [];

  if (enrollments.length === 0) {
    return <span className="text-muted-foreground">No enrollments</span>;
  }

  const activeCount = enrollments.filter(
    (enrollment) => enrollment.status === "active",
  ).length;

  return (
    <div>
      <div className="inline-flex items-center gap-2 font-semibold text-foreground">
        <GraduationCap className="h-4 w-4 text-accent" />
        {enrollments.length} course{enrollments.length > 1 ? "s" : ""}
      </div>

      <p className="mt-1 text-xs text-muted-foreground">
        {activeCount} active enrollment{activeCount === 1 ? "" : "s"}
      </p>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const normalizedStatus = status || "unknown";

  const styles = {
    active: "border-success/20 bg-success/10 text-success",
    inactive: "border-border bg-secondary text-muted-foreground",
    suspended: "border-destructive/20 bg-destructive/10 text-destructive",
    completed: "border-success/20 bg-success/10 text-success",
    withdrawn: "border-destructive/20 bg-destructive/10 text-destructive",
    unknown: "border-border bg-secondary text-muted-foreground",
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

const StudentDetailsModal = ({ student, onClose }) => {
  const enrollments = Array.isArray(student.enrollments)
    ? student.enrollments
    : [];

  const details = [
    {
      label: "Student No",
      value: student.student_number,
    },
    {
      label: "Name",
      value: `${student.first_name || ""} ${student.last_name || ""}`.trim(),
    },
    {
      label: "Email",
      value: student.email_address,
    },
    {
      label: "Contact",
      value: student.contact_number,
    },
    {
      label: "Passport",
      value: student.passport_number,
    },
    {
      label: "Date of Birth",
      value: formatDate(student.date_of_birth),
    },
    {
      label: "Street Address",
      value: student.street_address,
    },
    {
      label: "Town / City",
      value: student.town_city,
    },
    {
      label: "Country",
      value: student.country,
    },
    {
      label: "Postcode",
      value: student.postcode,
    },
    {
      label: "Status",
      value: student.status,
    },
    {
      label: "Created At",
      value: formatDate(student.created_at),
    },
  ];

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/45 p-4">
      <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl border bg-card p-6 shadow-soft">
        <div className="flex items-start justify-between gap-4 border-b pb-4">
          <div>
            <h2 className="text-xl font-bold text-primary">Student Details</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Student profile and enrollment information.
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

        <dl className="mt-5 grid gap-4 sm:grid-cols-2">
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

        <div className="mt-6 rounded-2xl border bg-background p-5">
          <h3 className="text-lg font-bold text-primary">Enrollments</h3>

          <div className="mt-4 space-y-3">
            {enrollments.length > 0 ? (
              enrollments.map((enrollment) => (
                <div
                  key={enrollment.id}
                  className="rounded-2xl border bg-card p-4"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="font-semibold text-foreground">
                        {enrollment.course?.name || "Course"}
                      </p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        Enrollment No: {enrollment.enrollment_number || "-"}
                      </p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        Date: {formatDate(enrollment.enrollment_date)}
                      </p>
                    </div>

                    <StatusBadge status={enrollment.status} />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                This student does not have enrollments yet.
              </p>
            )}
          </div>
        </div>
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

export default Students;
