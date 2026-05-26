import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Award,
  BadgeCheck,
  CalendarDays,
  Eye,
  GraduationCap,
  Plus,
  Search,
  ShieldCheck,
  Trash2,
  User2,
  XCircle,
} from "lucide-react";

import {
  deleteCertificate,
  getCertificates,
  verifyCertificate,
} from "../../features/certificate/certificateActions";
import StatCard from "../../components/widgets/StatCard";

const Certificates = () => {
  const dispatch = useDispatch();

  const {
    certificates = [],
    verifiedCertificate,
    loading,
    error,
  } = useSelector((state) => state.certificateState);

  const [search, setSearch] = useState("");
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  const [verifyNumber, setVerifyNumber] = useState("");

  useEffect(() => {
    dispatch(getCertificates());
  }, [dispatch]);

  const filteredCertificates = useMemo(() => {
    return certificates.filter((certificate) => {
      const searchText = search.trim().toLowerCase();

      if (!searchText) return true;

      return (
        certificate.certificate_number?.toLowerCase().includes(searchText) ||
        certificate.grade?.toLowerCase().includes(searchText) ||
        certificate.status?.toLowerCase().includes(searchText) ||
        certificate.enrollment?.student?.first_name
          ?.toLowerCase()
          .includes(searchText) ||
        certificate.enrollment?.student?.last_name
          ?.toLowerCase()
          .includes(searchText) ||
        certificate.enrollment?.course?.name?.toLowerCase().includes(searchText)
      );
    });
  }, [certificates, search]);

  const stats = useMemo(() => {
    return {
      total: certificates.length,

      valid: certificates.filter(
        (certificate) => certificate.status === "valid",
      ).length,

      revoked: certificates.filter(
        (certificate) => certificate.status === "revoked",
      ).length,

      expired: certificates.filter(
        (certificate) => certificate.status === "expired",
      ).length,
    };
  }, [certificates]);

  const handleDelete = (certificateId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this certificate?",
    );

    if (!confirmed) return;

    dispatch(deleteCertificate(certificateId)).then(() => {
      dispatch(getCertificates());
    });
  };

  const handleVerify = (event) => {
    event.preventDefault();

    if (!verifyNumber.trim()) return;

    dispatch(verifyCertificate(verifyNumber.trim()));
  };

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border bg-card p-6 shadow-soft">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              Certificates
            </p>

            <h1 className="mt-2 text-2xl font-bold text-primary md:text-3xl">
              Certificate Management
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Manage, verify, track and maintain issued student certificates.
            </p>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-accent px-5 py-3 text-sm font-semibold text-accent-foreground shadow-soft transition-smooth hover:opacity-90"
          >
            <Plus className="h-4 w-4" />
            Issue Certificate
          </button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Certificates" value={stats.total} icon={Award} />

        <StatCard title="Valid" value={stats.valid} icon={ShieldCheck} />

        <StatCard title="Revoked" value={stats.revoked} icon={XCircle} />

        <StatCard title="Expired" value={stats.expired} icon={CalendarDays} />
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_400px]">
        <div className="rounded-3xl border bg-card p-5 shadow-soft">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-soft text-accent">
              <Search className="h-6 w-6" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-primary">
                Search Certificates
              </h2>

              <p className="text-sm text-muted-foreground">
                Search using certificate number, student or course.
              </p>
            </div>
          </div>

          <div className="relative mt-5">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search certificates..."
              className="w-full rounded-2xl border bg-background px-11 py-3 text-sm outline-none transition-smooth focus:border-accent"
            />
          </div>

          {error && (
            <div className="mt-4 rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {error}
            </div>
          )}
        </div>

        <section className="rounded-3xl border bg-card p-5 shadow-soft">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-soft text-accent">
              <BadgeCheck className="h-6 w-6" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-primary">
                Verify Certificate
              </h2>

              <p className="text-sm text-muted-foreground">
                Verify authenticity using certificate number.
              </p>
            </div>
          </div>

          <form onSubmit={handleVerify} className="mt-5 space-y-4">
            <input
              type="text"
              value={verifyNumber}
              onChange={(event) => setVerifyNumber(event.target.value)}
              placeholder="Enter certificate number"
              className="w-full rounded-2xl border bg-background px-4 py-3 text-sm outline-none transition-smooth focus:border-accent"
            />

            <button
              type="submit"
              className="w-full rounded-2xl bg-gradient-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition-smooth hover:opacity-90"
            >
              Verify Certificate
            </button>
          </form>

          {verifiedCertificate && (
            <div className="mt-5 rounded-2xl border border-success/20 bg-success/10 p-5">
              <div className="flex items-start gap-3">
                <BadgeCheck className="mt-0.5 h-6 w-6 text-success" />

                <div className="flex-1">
                  <h3 className="font-semibold text-success">
                    Certificate Verified
                  </h3>

                  <div className="mt-4 space-y-3 text-sm">
                    <div>
                      <p className="text-muted-foreground">
                        Certificate Number
                      </p>

                      <p className="font-semibold text-foreground">
                        {verifiedCertificate.certificate_number}
                      </p>
                    </div>

                    <div>
                      <p className="text-muted-foreground">Student</p>

                      <p className="font-semibold text-foreground">
                        {verifiedCertificate.enrollment?.student?.first_name}{" "}
                        {verifiedCertificate.enrollment?.student?.last_name}
                      </p>
                    </div>

                    <div>
                      <p className="text-muted-foreground">Course</p>

                      <p className="font-semibold text-foreground">
                        {verifiedCertificate.enrollment?.course?.name}
                      </p>
                    </div>

                    <div>
                      <p className="text-muted-foreground">Status</p>

                      <StatusBadge status={verifiedCertificate.status} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </section>

      <section className="overflow-hidden rounded-3xl border bg-card shadow-soft">
        <div className="border-b px-6 py-5">
          <h2 className="text-lg font-bold text-primary">
            Issued Certificates
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Showing {filteredCertificates.length} certificates.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1300px] text-left text-sm">
            <thead className="bg-secondary/60 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-5 py-4">Certificate</th>

                <th className="px-5 py-4">Student</th>

                <th className="px-5 py-4">Course</th>

                <th className="px-5 py-4">Issue Date</th>

                <th className="px-5 py-4">Expiry Date</th>

                <th className="px-5 py-4">Grade</th>

                <th className="px-5 py-4">Status</th>

                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {loading ? (
                <tr>
                  <td
                    colSpan="8"
                    className="px-5 py-12 text-center text-muted-foreground"
                  >
                    Loading certificates...
                  </td>
                </tr>
              ) : filteredCertificates.length > 0 ? (
                filteredCertificates.map((certificate) => (
                  <tr key={certificate.id} className="bg-background">
                    <td className="px-5 py-4">
                      <div>
                        <h3 className="font-semibold text-primary">
                          {certificate.certificate_number}
                        </h3>

                        <p className="mt-1 text-xs text-muted-foreground">
                          ID: {certificate.id}
                        </p>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary">
                          <User2 className="h-5 w-5 text-muted-foreground" />
                        </div>

                        <div>
                          <h4 className="font-medium text-foreground">
                            {certificate.enrollment?.student?.first_name}{" "}
                            {certificate.enrollment?.student?.last_name}
                          </h4>

                          <p className="text-xs text-muted-foreground">
                            {certificate.enrollment?.student?.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div>
                        <p className="font-medium text-foreground">
                          {certificate.enrollment?.course?.name}
                        </p>

                        <p className="mt-1 text-xs text-muted-foreground">
                          {certificate.enrollment?.course?.code}
                        </p>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-muted-foreground">
                      {certificate.issue_date}
                    </td>

                    <td className="px-5 py-4 text-muted-foreground">
                      {certificate.expiry_date || "-"}
                    </td>

                    <td className="px-5 py-4">
                      <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-foreground">
                        {certificate.grade || "-"}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <StatusBadge status={certificate.status} />
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedCertificate(certificate)}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full border bg-card text-foreground transition-smooth hover:bg-secondary"
                        >
                          <Eye className="h-4 w-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(certificate.id)}
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
                    colSpan="8"
                    className="px-5 py-12 text-center text-muted-foreground"
                  >
                    No certificates found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {selectedCertificate && (
        <CertificateDetailsModal
          certificate={selectedCertificate}
          onClose={() => setSelectedCertificate(null)}
        />
      )}
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const styles = {
    valid: "border-success/20 bg-success/10 text-success",

    revoked: "border-destructive/20 bg-destructive/10 text-destructive",

    expired: "border-yellow-500/20 bg-yellow-500/10 text-yellow-600",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${
        styles[status] || styles.valid
      }`}
    >
      {status}
    </span>
  );
};

const DetailCard = ({ label, value }) => {
  return (
    <div className="rounded-2xl border bg-background p-4">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">
        {label}
      </p>

      <p className="mt-2 text-sm font-semibold text-foreground">
        {value || "-"}
      </p>
    </div>
  );
};

const CertificateDetailsModal = ({ certificate, onClose }) => {
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/45 p-4">
      <div className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-3xl border bg-card p-6 shadow-soft">
        <div className="flex items-start justify-between gap-4 border-b pb-4">
          <div>
            <h2 className="text-xl font-bold text-primary">
              Certificate Details
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Complete certificate and student information.
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

        <div className="mt-6 grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
          <div className="rounded-3xl border bg-gradient-primary p-6 text-primary-foreground shadow-soft">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15">
              <Award className="h-8 w-8" />
            </div>

            <p className="mt-6 text-xs uppercase tracking-[0.3em] text-primary-foreground/70">
              Certificate Number
            </p>

            <h3 className="mt-3 break-words text-2xl font-bold">
              {certificate.certificate_number}
            </h3>

            <div className="mt-8">
              <StatusBadge status={certificate.status} />
            </div>

            <div className="mt-8 space-y-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-primary-foreground/70">
                  Student
                </p>

                <p className="mt-1 text-lg font-semibold">
                  {certificate.enrollment?.student?.first_name}{" "}
                  {certificate.enrollment?.student?.last_name}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-primary-foreground/70">
                  Course
                </p>

                <p className="mt-1 text-lg font-semibold">
                  {certificate.enrollment?.course?.name}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <DetailCard label="Issue Date" value={certificate.issue_date} />

              <DetailCard label="Expiry Date" value={certificate.expiry_date} />

              <DetailCard label="Grade" value={certificate.grade} />

              <DetailCard
                label="Course Code"
                value={certificate.enrollment?.course?.code}
              />
            </div>

            <div className="rounded-2xl border bg-background p-5">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-accent" />

                <h4 className="text-lg font-semibold text-primary">
                  Academic Information
                </h4>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <DetailCard
                  label="Faculty"
                  value={certificate.enrollment?.course?.faculty?.name}
                />

                <DetailCard
                  label="Study Mode"
                  value={certificate.enrollment?.course?.study_mode}
                />

                <DetailCard
                  label="Duration"
                  value={certificate.enrollment?.course?.duration}
                />

                <DetailCard
                  label="Level"
                  value={certificate.enrollment?.course?.level}
                />
              </div>
            </div>

            <div className="rounded-2xl border bg-background p-5">
              <div className="flex items-center gap-2">
                <User2 className="h-5 w-5 text-accent" />

                <h4 className="text-lg font-semibold text-primary">
                  Student Information
                </h4>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <DetailCard
                  label="Email"
                  value={certificate.enrollment?.student?.email}
                />

                <DetailCard
                  label="Phone"
                  value={certificate.enrollment?.student?.contact_number}
                />

                <DetailCard
                  label="Country"
                  value={certificate.enrollment?.student?.country}
                />

                <DetailCard
                  label="Passport Number"
                  value={certificate.enrollment?.student?.passport_number}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificates;
