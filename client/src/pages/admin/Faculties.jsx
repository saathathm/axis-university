import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BookOpen,
  Building2,
  Eye,
  GraduationCap,
  Pencil,
  Plus,
  Search,
  Trash2,
} from "lucide-react";

import {
  deleteFaculty,
  getFaculties,
} from "../../features/faculty/facultyActions";

const Faculties = () => {
  const dispatch = useDispatch();

  const {
    faculties = [],
    loading,
    error,
  } = useSelector((state) => state.facultyState);

  const [search, setSearch] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState(null);

  useEffect(() => {
    dispatch(getFaculties());
  }, [dispatch]);

  const filteredFaculties = useMemo(() => {
    return faculties.filter((faculty) => {
      const searchText = search.trim().toLowerCase();

      return (
        faculty.name?.toLowerCase().includes(searchText) ||
        faculty.short_description?.toLowerCase().includes(searchText) ||
        faculty.description?.toLowerCase().includes(searchText)
      );
    });
  }, [faculties, search]);

  const stats = useMemo(() => {
    return {
      total: faculties.length,

      active: faculties.filter((faculty) => faculty.status === true).length,

      inactive: faculties.filter((faculty) => faculty.status === false).length,
    };
  }, [faculties]);

  const handleDelete = (facultyId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this faculty?",
    );

    if (!confirmed) return;

    dispatch(deleteFaculty(facultyId)).then(() => {
      dispatch(getFaculties());
    });
  };

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border bg-card p-6 shadow-soft">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              Faculties
            </p>

            <h1 className="mt-2 text-2xl font-bold text-primary md:text-3xl">
              Faculty Management
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Manage university faculties, departments, programs, and academic
              divisions.
            </p>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-accent px-5 py-3 text-sm font-semibold text-accent-foreground shadow-soft transition-smooth hover:opacity-90"
          >
            <Plus className="h-4 w-4" />
            Add Faculty
          </button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <StatCard
          title="Total Faculties"
          value={stats.total}
          icon={Building2}
        />

        <StatCard
          title="Active Faculties"
          value={stats.active}
          icon={GraduationCap}
        />

        <StatCard
          title="Inactive Faculties"
          value={stats.inactive}
          icon={BookOpen}
        />
      </section>

      <section className="rounded-3xl border bg-card p-5 shadow-soft">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search faculties..."
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
          <h2 className="text-lg font-bold text-primary">Faculty Records</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Showing {filteredFaculties.length} of {faculties.length} faculties.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] text-left text-sm">
            <thead className="bg-secondary/60 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-5 py-4">Faculty</th>
                <th className="px-5 py-4">Short Description</th>
                <th className="px-5 py-4">Slug</th>
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
                    Loading faculties...
                  </td>
                </tr>
              ) : filteredFaculties.length > 0 ? (
                filteredFaculties.map((faculty) => (
                  <tr key={faculty.id} className="bg-background">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-4">
                        <div className="h-14 w-14 overflow-hidden rounded-2xl border bg-secondary">
                          <img
                            src={`${import.meta.env.VITE_API_BASE_URL}/storage/${faculty.image}`}
                            alt={faculty.name}
                            className="h-full w-full object-cover"
                          />
                        </div>

                        <div>
                          <h3 className="font-semibold text-foreground">
                            {faculty.name}
                          </h3>

                          <p className="mt-1 line-clamp-1 max-w-[250px] text-xs text-muted-foreground">
                            {faculty.description}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-muted-foreground">
                      {faculty.short_description}
                    </td>

                    <td className="px-5 py-4">
                      <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-foreground">
                        {faculty.slug}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <StatusBadge status={faculty.status} />
                    </td>

                    <td className="px-5 py-4 text-muted-foreground">
                      {formatDate(faculty.created_at)}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedFaculty(faculty)}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full border bg-card text-foreground transition-smooth hover:bg-secondary"
                        >
                          <Eye className="h-4 w-4" />
                        </button>

                        <button
                          type="button"
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full border bg-card text-foreground transition-smooth hover:bg-secondary"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(faculty.id)}
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
                    No faculties found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {selectedFaculty && (
        <FacultyDetailsModal
          faculty={selectedFaculty}
          onClose={() => setSelectedFaculty(null)}
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

const FacultyDetailsModal = ({ faculty, onClose }) => {
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/45 p-4">
      <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl border bg-card p-6 shadow-soft">
        <div className="flex items-start justify-between gap-4 border-b pb-4">
          <div>
            <h2 className="text-xl font-bold text-primary">Faculty Details</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Detailed faculty information.
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

        <div className="mt-6 grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
          <div className="overflow-hidden rounded-3xl border bg-secondary">
            <img
              src={`${import.meta.env.VITE_API_BASE_URL}/storage/${faculty.image}`}
              alt={faculty.name}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="space-y-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                Faculty
              </p>

              <h3 className="mt-2 text-3xl font-bold text-primary">
                {faculty.name}
              </h3>
            </div>

            <div className="rounded-2xl border bg-background p-5">
              <p className="text-sm font-semibold text-primary">
                Short Description
              </p>

              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                {faculty.short_description}
              </p>
            </div>

            <div className="rounded-2xl border bg-background p-5">
              <p className="text-sm font-semibold text-primary">Description</p>

              <p className="mt-2 whitespace-pre-line text-sm leading-7 text-muted-foreground">
                {faculty.description}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border bg-background p-4">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Slug
                </p>

                <p className="mt-2 text-sm font-medium text-foreground">
                  {faculty.slug}
                </p>
              </div>

              <div className="rounded-2xl border bg-background p-4">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Status
                </p>

                <div className="mt-2">
                  <StatusBadge status={faculty.status} />
                </div>
              </div>

              <div className="rounded-2xl border bg-background p-4">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Created At
                </p>

                <p className="mt-2 text-sm font-medium text-foreground">
                  {formatDate(faculty.created_at)}
                </p>
              </div>

              <div className="rounded-2xl border bg-background p-4">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Updated At
                </p>

                <p className="mt-2 text-sm font-medium text-foreground">
                  {formatDate(faculty.updated_at)}
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
    day: "2-digit",
  });
};

export default Faculties;
