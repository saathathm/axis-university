import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Award,
  Calendar,
  Eye,
  Globe,
  Image as ImageIcon,
  Medal,
  Plus,
  Search,
  ShieldCheck,
  Trash2,
} from "lucide-react";

import {
  deleteRecognition,
  getRecognitions,
} from "../../../features/recognition/recognitionActions";
import StatCard from "../../../components/widgets/StatCard";
import { BASE_URL } from "../../../utils/constants";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../../components/widgets/PageHeader";
import SearchSection from "../../../components/widgets/admin/SearchSection";

const Recognitions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    recognitions = [],
    loading,
    error,
  } = useSelector((state) => state.recognitionState);

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
        recognition.description?.toLowerCase().includes(searchText)
      );
    });
  }, [recognitions, search]);

  const stats = useMemo(() => {
    return {
      total: recognitions.length,

      active: recognitions.filter((recognition) => recognition.status === true)
        .length,

      inactive: recognitions.filter(
        (recognition) => recognition.status === false,
      ).length,

      withImages: recognitions.filter((recognition) => recognition.image)
        .length,
    };
  }, [recognitions]);

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
      <PageHeader
        eyebrow="Recognitions"
        title="Recognition Management"
        description="Manage university recognitions, accreditations, achievements and institutional awards."
        buttonText="Add Recognition"
        buttonIcon={Plus}
        onButtonClick={() => navigate("/admin/recognitions/create")}
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Recognitions" value={stats.total} icon={Award} />

        <StatCard title="Active" value={stats.active} icon={ShieldCheck} />

        <StatCard
          title="With Images"
          value={stats.withImages}
          icon={ImageIcon}
        />

        <StatCard title="Inactive" value={stats.inactive} icon={Trash2} />
      </section>

      <SearchSection
        title="Search Recognitions"
        description="Find recognitions, achievements and accreditation records quickly."
        search={search}
        setSearch={setSearch}
        placeholder="Search recognitions..."
        error={error}
      />

      <section className="overflow-hidden rounded-3xl border bg-card shadow-soft">
        <div className="border-b px-6 py-5">
          <h2 className="text-lg font-bold text-primary">
            Recognition Records
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Showing {filteredRecognitions.length} recognition records.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[968px] text-left text-sm">
            <thead className="bg-secondary/60 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-5 py-4">Recognition</th>

                <th className="px-5 py-4">Description</th>

                <th className="px-5 py-4">Image</th>

                <th className="px-5 py-4">Status</th>

                <th className="px-5 py-4">Created</th>

                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {loading ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-5 py-12 text-center text-muted-foreground"
                  >
                    Loading recognitions...
                  </td>
                </tr>
              ) : filteredRecognitions.length > 0 ? (
                filteredRecognitions.map((recognition) => (
                  <tr key={recognition.id}>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-soft text-accent">
                          <Medal className="h-7 w-7" />
                        </div>

                        <div>
                          <h3 className="font-semibold text-primary">
                            {recognition.title}
                          </h3>

                          <p className="mt-1 text-xs text-muted-foreground">
                            Recognition ID: #{recognition.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <p className="line-clamp-3 max-w-[420px] leading-6 text-muted-foreground">
                        {recognition.description}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      {recognition.photo ? (
                        <img
                          src={`${BASE_URL}/storage/${recognition.photo}`}
                          alt={recognition.title}
                          className="h-16 w-24 rounded-2xl object-contain"
                        />
                      ) : (
                        <div className="flex h-16 w-24 items-center justify-center rounded-2xl border bg-secondary text-muted-foreground">
                          <ImageIcon className="h-5 w-5" />
                        </div>
                      )}
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
                  <td
                    colSpan="6"
                    className="px-5 py-12 text-center text-muted-foreground"
                  >
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

const StatusBadge = ({ status }) => {
  return (
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
};

const DetailCard = ({ label, value }) => {
  return (
    <div className="rounded-2xl border bg-background p-4">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">
        {label}
      </p>

      <p className="mt-2 text-sm font-semibold leading-6 text-foreground">
        {value || "-"}
      </p>
    </div>
  );
};

const RecognitionDetailsModal = ({ recognition, onClose }) => {
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/45 p-4">
      <div className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-3xl border bg-card p-6 shadow-soft">
        <div className="flex items-start justify-between gap-4 border-b pb-4">
          <div>
            <h2 className="text-xl font-bold text-primary">
              Recognition Details
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Complete recognition and accreditation information.
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

        <div className="mt-6 grid gap-8 lg:grid-cols-[360px_minmax(0,1fr)]">
          <div className="rounded-3xl bg-gradient-primary p-6 text-primary-foreground shadow-soft">
            {recognition.photo ? (
              <img
                src={`${BASE_URL}/storage/${recognition.photo}`}
                alt={recognition.title}
                className="h-64 w-full rounded-3xl object-contain shadow-soft"
              />
            ) : (
              <div className="flex h-64 w-full items-center justify-center rounded-3xl bg-white/10">
                <Award className="h-20 w-20" />
              </div>
            )}

            <div className="mt-6">
              <p className="text-xs uppercase tracking-[0.3em] text-primary-foreground/70">
                Recognition
              </p>

              <h3 className="mt-3 text-2xl font-bold leading-tight">
                {recognition.title}
              </h3>

              <div className="mt-6">
                <StatusBadge status={recognition.status} />
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="mt-0.5 h-5 w-5 shrink-0 text-primary-foreground/80" />

                <div>
                  <p className="text-xs uppercase tracking-wide text-primary-foreground/70">
                    Created
                  </p>

                  <p className="mt-1 font-semibold">
                    {formatDate(recognition.created_at)}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Globe className="mt-0.5 h-5 w-5 shrink-0 text-primary-foreground/80" />

                <div>
                  <p className="text-xs uppercase tracking-wide text-primary-foreground/70">
                    Institution
                  </p>

                  <p className="mt-1 font-semibold">Axis University</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border bg-background p-5">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-accent" />

                <h4 className="text-lg font-semibold text-primary">
                  Recognition Description
                </h4>
              </div>

              <p className="mt-5 whitespace-pre-line text-sm leading-8 text-muted-foreground">
                {recognition.description}
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <DetailCard label="Recognition ID" value={`#${recognition.id}`} />

              <DetailCard
                label="Status"
                value={recognition.status ? "Active" : "Inactive"}
              />

              <DetailCard
                label="Created At"
                value={formatDate(recognition.created_at)}
              />

              <DetailCard
                label="Updated At"
                value={formatDate(recognition.updated_at)}
              />
            </div>

            <div className="rounded-2xl border bg-background p-5">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-accent" />

                <h4 className="text-lg font-semibold text-primary">
                  Recognition Summary
                </h4>
              </div>

              <div className="mt-5 rounded-2xl border bg-secondary/30 p-5">
                <p className="text-sm leading-7 text-muted-foreground">
                  This recognition has been added to the official university
                  recognition records and can be publicly displayed on the
                  university website.
                </p>
              </div>
            </div>
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
    day: "numeric",
  });
};

export default Recognitions;
