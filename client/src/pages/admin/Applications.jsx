import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CheckCircle2,
  Eye,
  FileText,
  Search,
  UserCheck,
  XCircle,
} from "lucide-react";

import {
  approveApplication,
  getApplications,
  rejectApplication,
} from "../../features/application/applicationActions";
import {
  clearApplicationError,
  clearApplicationMessage,
} from "../../features/application/applicationSlice";

const Applications = () => {
  const dispatch = useDispatch();

  const {
    applications = [],
    loading,
    message,
    error,
  } = useSelector((state) => state.applicationState);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [rejectingApplication, setRejectingApplication] = useState(null);
  const [adminNote, setAdminNote] = useState("");
  const [pageMessage, setPageMessage] = useState(null);

  useEffect(() => {
    dispatch(getApplications());
  }, [dispatch]);

  useEffect(() => {
    if (message) {
      setPageMessage({
        type: "success",
        message,
      });

      dispatch(clearApplicationMessage());
      dispatch(getApplications());
      setRejectingApplication(null);
      setAdminNote("");
    }
  }, [dispatch, message]);

  useEffect(() => {
    if (error) {
      setPageMessage({
        type: "error",
        message: error,
      });

      dispatch(clearApplicationError());
    }
  }, [dispatch, error]);

  const filteredApplications = useMemo(() => {
    return applications.filter((application) => {
      const searchText = search.trim().toLowerCase();

      const fullName = `${application.first_name || ""} ${
        application.last_name || ""
      }`.toLowerCase();

      const matchesSearch =
        !searchText ||
        fullName.includes(searchText) ||
        application.email_address?.toLowerCase().includes(searchText) ||
        application.application_number?.toLowerCase().includes(searchText) ||
        application.passport_number?.toLowerCase().includes(searchText) ||
        application.course?.name?.toLowerCase().includes(searchText);

      const matchesStatus =
        !statusFilter || application.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [applications, search, statusFilter]);

  const counts = useMemo(() => {
    return {
      total: applications.length,
      pending: applications.filter(
        (application) => application.status === "pending",
      ).length,
      enrolled: applications.filter(
        (application) => application.status === "enrolled",
      ).length,
      rejected: applications.filter(
        (application) => application.status === "rejected",
      ).length,
    };
  }, [applications]);

  const handleApprove = (applicationId) => {
    const confirmApprove = window.confirm(
      "Are you sure you want to approve this application? This will create a student and enrollment.",
    );

    if (!confirmApprove) return;

    setPageMessage(null);
    dispatch(approveApplication(applicationId));
  };

  const openRejectModal = (application) => {
    setRejectingApplication(application);
    setAdminNote("");
    setPageMessage(null);
  };

  const handleReject = () => {
    if (!rejectingApplication) return;

    dispatch(rejectApplication(rejectingApplication.id, adminNote));
  };

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border bg-card p-6 shadow-soft">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              Applications
            </p>

            <h1 className="mt-2 text-2xl font-bold text-primary md:text-3xl">
              Student Applications
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Review submitted applications, approve students, and create
              enrollments.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-4 lg:min-w-[560px]">
            <ApplicationCount label="Total" value={counts.total} />
            <ApplicationCount label="Pending" value={counts.pending} />
            <ApplicationCount label="Enrolled" value={counts.enrolled} />
            <ApplicationCount label="Rejected" value={counts.rejected} />
          </div>
        </div>
      </section>

      <section className="rounded-3xl border bg-card p-5 shadow-soft">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by name, email, application no, passport, or course..."
              className="w-full rounded-2xl border bg-background px-11 py-3 text-sm outline-none transition-smooth focus:border-accent"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="rounded-2xl border bg-background px-4 py-3 text-sm outline-none transition-smooth focus:border-accent"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="enrolled">Enrolled</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {pageMessage && (
          <div
            className={`mt-4 rounded-2xl border px-4 py-3 text-sm ${
              pageMessage.type === "error"
                ? "border-destructive/30 bg-destructive/10 text-destructive"
                : "border-success/30 bg-success/10 text-success"
            }`}
          >
            {pageMessage.message}
          </div>
        )}
      </section>

      <section className="overflow-hidden rounded-3xl border bg-card shadow-soft">
        <div className="border-b px-6 py-5">
          <h2 className="text-lg font-bold text-primary">
            Application Records
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Showing {filteredApplications.length} of {applications.length}{" "}
            applications.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1050px] text-left text-sm">
            <thead className="bg-secondary/60 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-5 py-4">Application</th>
                <th className="px-5 py-4">Applicant</th>
                <th className="px-5 py-4">Course</th>
                <th className="px-5 py-4">Contact</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Submitted</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {loading ? (
                <tr>
                  <td
                    colSpan="7"
                    className="bg-background px-5 py-10 text-center text-muted-foreground"
                  >
                    Loading applications...
                  </td>
                </tr>
              ) : filteredApplications.length > 0 ? (
                filteredApplications.map((application) => (
                  <tr key={application.id} className="bg-background">
                    <td className="px-5 py-4">
                      <div className="inline-flex items-center gap-2 font-semibold text-foreground">
                        <FileText className="h-4 w-4 text-accent" />
                        {application.application_number ||
                          `APP-${application.id}`}
                      </div>

                      <p className="mt-1 text-xs text-muted-foreground">
                        Passport: {application.passport_number || "-"}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <div className="font-semibold text-foreground">
                        {application.first_name} {application.last_name}
                      </div>

                      <p className="mt-1 text-xs text-muted-foreground">
                        DOB: {formatDate(application.date_of_birth)}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <div className="font-medium text-foreground">
                        {application.course?.name || "-"}
                      </div>

                      <p className="mt-1 text-xs text-muted-foreground">
                        {application.course?.faculty?.name || ""}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <div className="text-muted-foreground">
                        {application.email_address}
                      </div>

                      <p className="mt-1 text-xs text-muted-foreground">
                        {application.contact_number || "-"}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <StatusBadge status={application.status} />
                    </td>

                    <td className="px-5 py-4 text-muted-foreground">
                      {formatDate(application.submitted_at)}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedApplication(application)}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full border bg-card text-foreground transition-smooth hover:bg-secondary"
                          title="View application"
                        >
                          <Eye className="h-4 w-4" />
                        </button>

                        {application.status === "pending" && (
                          <>
                            <button
                              type="button"
                              onClick={() => handleApprove(application.id)}
                              disabled={loading}
                              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-success/30 bg-success/10 text-success transition-smooth hover:bg-success/20 disabled:opacity-60"
                              title="Approve application"
                            >
                              <UserCheck className="h-4 w-4" />
                            </button>

                            <button
                              type="button"
                              onClick={() => openRejectModal(application)}
                              disabled={loading}
                              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-destructive/30 bg-destructive/10 text-destructive transition-smooth hover:bg-destructive/20 disabled:opacity-60"
                              title="Reject application"
                            >
                              <XCircle className="h-4 w-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="bg-background px-5 py-10 text-center text-muted-foreground"
                  >
                    No applications found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {selectedApplication && (
        <ApplicationDetailsModal
          application={selectedApplication}
          onClose={() => setSelectedApplication(null)}
        />
      )}

      {rejectingApplication && (
        <RejectModal
          application={rejectingApplication}
          adminNote={adminNote}
          setAdminNote={setAdminNote}
          loading={loading}
          onClose={() => setRejectingApplication(null)}
          onReject={handleReject}
        />
      )}
    </div>
  );
};

const ApplicationCount = ({ label, value }) => {
  return (
    <div className="rounded-2xl border bg-background p-4">
      <p className="text-2xl font-extrabold text-primary">{value}</p>
      <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const normalizedStatus = status || "unknown";

  const styles = {
    pending: "border-warning/20 bg-warning/10 text-warning",
    enrolled: "border-success/20 bg-success/10 text-success",
    rejected: "border-destructive/20 bg-destructive/10 text-destructive",
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

const ApplicationDetailsModal = ({ application, onClose }) => {
  const details = [
    {
      label: "Application No",
      value: application.application_number,
    },
    {
      label: "Name",
      value: `${application.first_name || ""} ${
        application.last_name || ""
      }`.trim(),
    },
    {
      label: "Email",
      value: application.email_address,
    },
    {
      label: "Contact",
      value: application.contact_number,
    },
    {
      label: "Passport",
      value: application.passport_number,
    },
    {
      label: "Date of Birth",
      value: formatDate(application.date_of_birth),
    },
    {
      label: "Course",
      value: application.course?.name,
    },
    {
      label: "Status",
      value: application.status,
    },
    {
      label: "Street Address",
      value: application.street_address,
    },
    {
      label: "Town / City",
      value: application.town_city,
    },
    {
      label: "Country",
      value: application.country,
    },
    {
      label: "Postcode",
      value: application.postcode,
    },
    {
      label: "Submitted At",
      value: formatDate(application.submitted_at),
    },
    {
      label: "Reviewed At",
      value: formatDate(application.reviewed_at),
    },
    {
      label: "Admin Note",
      value: application.admin_note,
    },
  ];

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/45 p-4">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border bg-card p-6 shadow-soft">
        <div className="flex items-start justify-between gap-4 border-b pb-4">
          <div>
            <h2 className="text-xl font-bold text-primary">
              Application Details
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Full submitted application information.
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
      </div>
    </div>
  );
};

const RejectModal = ({
  application,
  adminNote,
  setAdminNote,
  loading,
  onClose,
  onReject,
}) => {
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/45 p-4">
      <div className="w-full max-w-lg rounded-3xl border bg-card p-6 shadow-soft">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
            <XCircle className="h-5 w-5" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-primary">
              Reject Application
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Add an optional note before rejecting{" "}
              <span className="font-semibold text-foreground">
                {application.first_name} {application.last_name}
              </span>
              .
            </p>
          </div>
        </div>

        <textarea
          value={adminNote}
          onChange={(event) => setAdminNote(event.target.value)}
          rows={4}
          placeholder="Reason for rejection..."
          className="mt-5 w-full rounded-2xl border bg-background px-4 py-3 text-sm outline-none transition-smooth focus:border-accent"
        />

        <div className="mt-5 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border bg-background px-5 py-2.5 text-sm font-semibold transition-smooth hover:bg-secondary"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onReject}
            disabled={loading}
            className="rounded-full bg-destructive px-5 py-2.5 text-sm font-semibold text-destructive-foreground transition-smooth hover:opacity-90 disabled:opacity-60"
          >
            {loading ? "Rejecting..." : "Reject"}
          </button>
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

export default Applications;
