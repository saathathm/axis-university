import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminLayout from "@/components/admin/AdminLayout";
import { approveAdminApplication, fetchAdminApplications, rejectAdminApplication } from "@/actions/applicationAction";

const Applications = () => {
  const dispatch = useDispatch();
  const applications = useSelector((state) => state.application.adminApplications);
  const status = useSelector((state) => state.application.adminApplicationsStatus);
  const [notes, setNotes] = useState({});

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAdminApplications());
    }
  }, [dispatch, status]);

  const approve = (id) => dispatch(approveAdminApplication(id));
  const reject = (id) => dispatch(rejectAdminApplication({ applicationId: id, admin_note: notes[id] || "Rejected by admin." }));

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="rounded-3xl border bg-card p-8 shadow-soft">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">Admissions</p>
          <h1 className="mt-2 text-3xl font-bold text-primary">Applications</h1>
          <p className="mt-3 text-muted-foreground">Review incoming applications and approve or reject them.</p>
        </div>

        <div className="space-y-4">
          {applications.map((application) => (
            <article key={application.id} className="rounded-2xl border bg-card p-5 shadow-soft space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-primary">{application.first_name} {application.last_name}</h2>
                  <p className="text-sm text-muted-foreground">{application.email_address} · {application.status}</p>
                </div>
                <div className="text-sm text-muted-foreground">Program #{application.program_id}</div>
              </div>

              <div className="grid gap-3 md:grid-cols-2 text-sm">
                <div><span className="font-semibold">Passport:</span> {application.passport_number}</div>
                <div><span className="font-semibold">Country:</span> {application.country}</div>
                <div><span className="font-semibold">Town:</span> {application.town_city}</div>
                <div><span className="font-semibold">Submitted:</span> {application.submitted_at || "-"}</div>
              </div>

              <label className="block text-sm font-medium">
                Admin note
                <textarea
                  value={notes[application.id] || application.admin_note || ""}
                  onChange={(event) => setNotes((current) => ({ ...current, [application.id]: event.target.value }))}
                  className="mt-1 w-full rounded-md border bg-background px-4 py-3 text-sm"
                  rows={3}
                />
              </label>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => approve(application.id)}
                  className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground"
                >
                  Approve
                </button>
                <button
                  type="button"
                  onClick={() => reject(application.id)}
                  className="rounded-full border px-5 py-2 text-sm font-semibold text-foreground hover:bg-secondary"
                >
                  Reject
                </button>
              </div>
            </article>
          ))}

          {status === "loading" && (
            <div className="rounded-2xl border bg-card p-6 text-sm text-muted-foreground shadow-soft">Loading applications...</div>
          )}
          {status === "succeeded" && applications.length === 0 && (
            <div className="rounded-2xl border bg-card p-6 text-sm text-muted-foreground shadow-soft">No applications found.</div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Applications;