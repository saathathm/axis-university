import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BookOpen,
  Download,
  ExternalLink,
  Eye,
  FileText,
  FolderOpen,
  Plus,
  Search,
  Trash2,
} from "lucide-react";

import {
  deleteDownload,
  getDownloads,
} from "../../features/download/downloadActions";

const Downloads = () => {
  const dispatch = useDispatch();

  const {
    downloads = [],
    loading,
    error,
  } = useSelector((state) => state.downloadState);

  const [search, setSearch] = useState("");

  const [selectedDownload, setSelectedDownload] = useState(null);

  useEffect(() => {
    dispatch(getDownloads());
  }, [dispatch]);

  const filteredDownloads = useMemo(() => {
    return downloads.filter((download) => {
      const searchText = search.trim().toLowerCase();

      if (!searchText) return true;

      return (
        download.title?.toLowerCase().includes(searchText) ||
        download.description?.toLowerCase().includes(searchText) ||
        download.course?.name?.toLowerCase().includes(searchText)
      );
    });
  }, [downloads, search]);

  const stats = useMemo(() => {
    return {
      total: downloads.length,

      courses: [
        ...new Set(downloads.map((download) => download.course?.id)),
      ].filter(Boolean).length,

      active: downloads.filter((download) => download.status === true).length,

      inactive: downloads.filter((download) => download.status === false)
        .length,
    };
  }, [downloads]);

  const handleDelete = (downloadId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this download?",
    );

    if (!confirmed) return;

    dispatch(deleteDownload(downloadId)).then(() => {
      dispatch(getDownloads());
    });
  };

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border bg-card p-6 shadow-soft">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              Downloads
            </p>

            <h1 className="mt-2 text-2xl font-bold text-primary md:text-3xl">
              Download Management
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Manage brochures, prospectus, documents and downloadable course
              materials.
            </p>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-accent px-5 py-3 text-sm font-semibold text-accent-foreground shadow-soft transition-smooth hover:opacity-90"
          >
            <Plus className="h-4 w-4" />
            Add Download
          </button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Files" value={stats.total} icon={FolderOpen} />

        <StatCard title="Courses" value={stats.courses} icon={BookOpen} />

        <StatCard title="Active Files" value={stats.active} icon={FileText} />

        <StatCard title="Inactive Files" value={stats.inactive} icon={Trash2} />
      </section>

      <section className="rounded-3xl border bg-card p-5 shadow-soft">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-lg font-bold text-primary">Search Downloads</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Search brochures and downloadable documents.
            </p>
          </div>

          <div className="relative w-full max-w-md">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search downloads..."
              className="w-full rounded-2xl border bg-background px-11 py-3 text-sm outline-none transition-smooth focus:border-accent"
            />
          </div>
        </div>

        {error && (
          <div className="mt-4 rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        )}
      </section>

      <section className="overflow-hidden rounded-3xl border bg-card shadow-soft">
        <div className="border-b px-6 py-5">
          <h2 className="text-lg font-bold text-primary">Download Files</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Showing {filteredDownloads.length} files.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1200px] text-left text-sm">
            <thead className="bg-secondary/60 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-5 py-4">File</th>

                <th className="px-5 py-4">Course</th>

                <th className="px-5 py-4">Type</th>

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
                    Loading downloads...
                  </td>
                </tr>
              ) : filteredDownloads.length > 0 ? (
                filteredDownloads.map((download) => (
                  <tr key={download.id} className="bg-background">
                    <td className="px-5 py-4">
                      <div className="flex items-start gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-soft text-accent">
                          <FileText className="h-7 w-7" />
                        </div>

                        <div>
                          <h3 className="font-semibold text-primary">
                            {download.title}
                          </h3>

                          <p className="mt-2 line-clamp-2 max-w-[280px] text-xs text-muted-foreground">
                            {download.description}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div>
                        <p className="font-medium text-foreground">
                          {download.course?.name}
                        </p>

                        <p className="mt-1 text-xs text-muted-foreground">
                          {download.course?.code}
                        </p>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-foreground">
                        {getFileType(download.file)}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <StatusBadge status={download.status} />
                    </td>

                    <td className="px-5 py-4 text-muted-foreground">
                      {formatDate(download.created_at)}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <a
                          href={`${import.meta.env.VITE_API_BASE_URL}/storage/${download.file}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full border bg-card text-foreground transition-smooth hover:bg-secondary"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>

                        <button
                          type="button"
                          onClick={() => setSelectedDownload(download)}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full border bg-card text-foreground transition-smooth hover:bg-secondary"
                        >
                          <Eye className="h-4 w-4" />
                        </button>

                        <a
                          href={`${import.meta.env.VITE_API_BASE_URL}/storage/${download.file}`}
                          download
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full border bg-card text-foreground transition-smooth hover:bg-secondary"
                        >
                          <Download className="h-4 w-4" />
                        </a>

                        <button
                          type="button"
                          onClick={() => handleDelete(download.id)}
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
                    No downloads found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {selectedDownload && (
        <DownloadDetailsModal
          download={selectedDownload}
          onClose={() => setSelectedDownload(null)}
        />
      )}
    </div>
  );
};

const StatCard = ({ title, value, icon: Icon }) => {
  return (
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

      <p className="mt-2 text-sm font-semibold text-foreground">
        {value || "-"}
      </p>
    </div>
  );
};

const DownloadDetailsModal = ({ download, onClose }) => {
  const fileUrl = `${import.meta.env.VITE_API_BASE_URL}/storage/${download.file}`;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/45 p-4">
      <div className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-3xl border bg-card p-6 shadow-soft">
        <div className="flex items-start justify-between gap-4 border-b pb-4">
          <div>
            <h2 className="text-xl font-bold text-primary">Download Details</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Complete file and course information.
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
              <FileText className="h-8 w-8" />
            </div>

            <p className="mt-6 text-xs uppercase tracking-[0.3em] text-primary-foreground/70">
              File Type
            </p>

            <h3 className="mt-3 text-2xl font-bold">
              {getFileType(download.file)}
            </h3>

            <div className="mt-6">
              <StatusBadge status={download.status} />
            </div>

            <div className="mt-8 space-y-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-primary-foreground/70">
                  Course
                </p>

                <p className="mt-1 text-lg font-semibold">
                  {download.course?.name}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-primary-foreground/70">
                  Created
                </p>

                <p className="mt-1 text-lg font-semibold">
                  {formatDate(download.created_at)}
                </p>
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <a
                href={fileUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-white/15 px-4 py-3 text-sm font-semibold transition-smooth hover:bg-white/20"
              >
                <ExternalLink className="h-4 w-4" />
                Preview
              </a>

              <a
                href={fileUrl}
                download
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-white text-sm font-semibold text-primary transition-smooth hover:opacity-90"
              >
                <Download className="h-4 w-4" />
                Download
              </a>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border bg-background p-5">
              <h3 className="text-xl font-bold text-primary">
                {download.title}
              </h3>

              <p className="mt-4 whitespace-pre-line text-sm leading-7 text-muted-foreground">
                {download.description}
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <DetailCard label="Course" value={download.course?.name} />

              <DetailCard label="Course Code" value={download.course?.code} />

              <DetailCard
                label="Faculty"
                value={download.course?.faculty?.name}
              />

              <DetailCard
                label="Study Mode"
                value={download.course?.study_mode}
              />
            </div>

            <div className="rounded-2xl border bg-background p-5">
              <div className="flex items-center gap-2">
                <FolderOpen className="h-5 w-5 text-accent" />

                <h4 className="text-lg font-semibold text-primary">
                  File Information
                </h4>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <DetailCard label="File Path" value={download.file} />

                <DetailCard
                  label="File Type"
                  value={getFileType(download.file)}
                />

                <DetailCard
                  label="Status"
                  value={download.status ? "Active" : "Inactive"}
                />

                <DetailCard
                  label="Created At"
                  value={formatDate(download.created_at)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const getFileType = (filePath) => {
  if (!filePath) return "Unknown";

  const extension = filePath.split(".").pop()?.toUpperCase();

  return extension || "File";
};

const formatDate = (date) => {
  if (!date) return "-";

  return new Date(date).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export default Downloads;
