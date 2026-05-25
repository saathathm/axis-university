import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Award, Eye, Medal, Search, Trash2 } from "lucide-react";

import {
  deleteRecognition,
  getRecognitions,
} from "../../features/recognition/recognitionActions";

const RecognitionsAdmin = () => {
  const dispatch = useDispatch();

  const { recognitions = [], loading, error } = useSelector(
    (state) => state.recognitionState,
  );

  const [search, setSearch] = useState("");
  const [selectedRecognition, setSelectedRecognition] = useState(null);

  useEffect(() => {
    dispatch(getRecognitions());
  }, [dispatch]);

  const filteredRecognitions = useMemo(() => {
    return recognitions.filter((recognition) => {
      const searchText = search.trim().toLowerCase();

      if (!searchText) return true;

      return (
        recognition.title?.toLowerCase().includes(searchText) ||
        recognition.organization_name?.toLowerCase().includes(searchText) ||
        recognition.description?.toLowerCase().includes(searchText)
      );
    });
  }, [recognitions, search]);

  const stats = useMemo(() => ({
    total: recognitions.length,
    active: recognitions.filter((recognition) => recognition.status === true)
      .length,
    inactive: recognitions.filter((recognition) => recognition.status === false)
      .length,
    organizations: new Set(
      recognitions.map((recognition) => recognition.organization_name).filter(Boolean),
    ).size,
  }), [recognitions]);

  const handleDelete = (recognitionId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this recognition?",
    );

    if (!confirmed) return;

    dispatch(deleteRecognition(recognitionId)).then(() => {
      dispatch(getRecognitions());
    });
  };

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border bg-card p-6 shadow-soft">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              Recognitions
            </p>

            <h1 className="mt-2 text-2xl font-bold text-primary md:text-3xl">
              Recognition Management
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Manage awards, honors, and recognitions displayed across the site.
            </p>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-accent px-5 py-3 text-sm font-semibold text-accent-foreground shadow-soft transition-smooth hover:opacity-90"
          >
            <Medal className="h-4 w-4" />
            Add Recognition
          </button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        <StatCard title="Total" value={stats.total} icon={Award} />
        <StatCard title="Active" value={stats.active} icon={Medal} />
        <StatCard title="Inactive" value={stats.inactive} icon={Trash2} />
        <StatCard title="Organizations" value={stats.organizations} icon={Eye} />
      </section>

      <section className="rounded-3xl border bg-card p-5 shadow-soft">
        <div className="relative max-w-xl">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search recognitions..."
            className="w-full rounded-2xl border bg-background px-11 py-3 text-sm outline-none transition-smooth focus:border-accent"
          />
        </div>

        {error && (
          <div className="mt-4 rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        )}
      </section>

      <section className="overflow-hidden rounded-3xl border bg-card shadow-soft">
        <div className="border-b px-6 py-5">
          <h2 className="text-lg font-bold text-primary">Recognition Records</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Showing {filteredRecognitions.length} of {recognitions.length} recognitions.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px] text-left text-sm">
            <thead className="bg-secondary/60 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-5 py-4">Recognition</th>
                <th className="px-5 py-4">Organization</th>
                <th className="px-5 py-4">Issue Date</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Created</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-5 py-12 text-center text-muted-foreground">
                    Loading recognitions...
                  </td>
                </tr>
              ) : filteredRecognitions.length > 0 ? (
                filteredRecognitions.map((recognition) => (
                  <tr key={recognition.id} className="bg-background">
                    <td className="px-5 py-4">
                      <div className="flex items-start gap-4">
                        <div className="h-14 w-14 overflow-hidden rounded-2xl border bg-secondary">
                          {recognition.photo ? (
                            <img
                              src={getAssetUrl(recognition.photo)}
                              alt={recognition.title}
                              className="h-full w-full object-cover"
                            />
                          ) : null}
                        </div>

                        <div>
                          <h3 className="font-semibold text-foreground">
                            {recognition.title}
                          </h3>

                          <p className="mt-1 text-xs text-muted-foreground">
                            {recognition.description || "-"}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-muted-foreground">
                      {recognition.organization_name || "-"}
                    </td>

                    <td className="px-5 py-4 text-muted-foreground">
                      {formatDate(recognition.issue_date)}
                    </td>

                    <td className="px-5 py-4">
                      <StatusBadge status={recognition.status} />
                    </td>

                    <td className="px-5 py-4 text-muted-foreground">
                      {formatDate(recognition.created_at)}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedRecognition(recognition)}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full border bg-card text-foreground transition-smooth hover:bg-secondary"
                        >
                          <Eye className="h-4 w-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(recognition.id)}
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
                  <td colSpan="6" className="px-5 py-12 text-center text-muted-foreground">
                    No recognitions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {selectedRecognition && (
        <RecognitionDetailsModal
          recognition={selectedRecognition}
          onClose={() => setSelectedRecognition(null)}
        />
      )}
    </div>
  );
};

const StatCard = ({ title, value, icon: Icon }) => (
  <div className="rounded-3xl border bg-card p-5 shadow-soft">
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <h3 className="mt-3 text-3xl font-bold text-primary">{value}</h3>
      </div>

      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-soft text-accent">
        <Icon className="h-7 w-7" />
      </div>
    </div>
  </div>
);

const StatusBadge = ({ status }) => (
  <span
    className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${
      status
        ? "border-success/20 bg-success/10 text-success"
        : "border-destructive/20 bg-destructive/10 text-destructive"
    }`}
  >
    {status ? "Active" : "Inactive"}
  </span>
);

const RecognitionDetailsModal = ({ recognition, onClose }) => (
  <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/45 p-4">
    <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border bg-card p-6 shadow-soft">
      <div className="flex items-start justify-between gap-4 border-b pb-4">
        <div>
          <h2 className="text-xl font-bold text-primary">Recognition Details</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Detailed recognition information.
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

      <div className="mt-6 grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
        <div className="overflow-hidden rounded-3xl border bg-secondary">
          {recognition.photo ? (
            <img
              src={getAssetUrl(recognition.photo)}
              alt={recognition.title}
              className="h-full w-full object-cover"
            />
          ) : null}
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              {recognition.organization_name || "Recognition"}
            </p>

            <h3 className="mt-2 text-3xl font-bold text-primary">
              {recognition.title}
            </h3>
          </div>

          {recognition.description && (
            <div className="rounded-2xl border bg-background p-5">
              <p className="text-sm font-semibold text-primary">Description</p>
              <p className="mt-2 whitespace-pre-line text-sm leading-7 text-muted-foreground">
                {recognition.description}
              </p>
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <DetailItem label="Issue Date" value={formatDate(recognition.issue_date)} />
            <DetailItem label="Status" value={<StatusBadge status={recognition.status} />} />
            <DetailItem label="Created" value={formatDate(recognition.created_at)} />
            <DetailItem label="Updated" value={formatDate(recognition.updated_at)} />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const DetailItem = ({ label, value }) => (
  <div className="rounded-2xl border bg-background p-4">
    <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
    <div className="mt-2 text-sm font-medium text-foreground">{value}</div>
  </div>
);

const getAssetUrl = (path) => `${import.meta.env.VITE_API_BASE_URL}/storage/${path}`;

const formatDate = (value) => {
  if (!value) return "-";

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
};

export default RecognitionsAdmin;