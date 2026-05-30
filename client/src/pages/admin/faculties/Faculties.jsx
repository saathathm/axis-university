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
} from "../../../features/faculty/facultyActions";
import StatCard from "../../../components/widgets/StatCard";
import { useNavigate } from "react-router-dom";
import FacultyDetailsModal from "../../../components/widgets/admin/faculty/FacultyDetailsModal";
import StatusBadge from "../../../components/widgets/admin/StatusBadge";
import formatDate from "../../../components/widgets/formatDate";
import { BASE_URL } from "../../../utils/constants";
import EditFaculty from "./EditFaculty";
import PageHeader from "../../../components/widgets/PageHeader";
import SearchFilterBar from "../../../components/widgets/admin/SearchFilterBar";

const Faculties = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      <PageHeader
        eyebrow="Faculties"
        title="Faculty Records"
        description="Manage university faculties, departments, programs, and academic divisions."
        buttonText="Add Faculty"
        buttonIcon={Plus}
        onButtonClick={() => navigate("/admin/faculties/create")}
      />
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

      <SearchFilterBar
        search={search}
        setSearch={setSearch}
        searchPlaceholder="Search faculties..."
        error={error}
      />

      <section className="overflow-hidden rounded-3xl border bg-card shadow-soft">
        <div className="border-b px-6 py-5">
          <h2 className="text-lg font-bold text-primary">Faculty Records</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Showing {filteredFaculties.length} of {faculties.length} faculties.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[968px] text-left text-sm">
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
                            src={`${BASE_URL}/storage/${faculty.image}`}
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
                          onClick={() =>
                            navigate(`/admin/faculties/${faculty.id}/edit`)
                          }
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

export default Faculties;
