import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BookCopy,
  Clock3,
  Eye,
  GraduationCap,
  Layers3,
  Pencil,
  Plus,
  Search,
  Trash2,
  Users,
} from "lucide-react";

import { deleteCourse, getCourses } from "../../features/course/courseActions";
import StatCard from "../../components/widgets/StatCard";
import { BASE_URL } from "../../utils/constants";

const Courses = () => {
  const dispatch = useDispatch();

  const {
    courses = [],
    loading,
    error,
  } = useSelector((state) => state.courseState);

  const [search, setSearch] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  const faculties = useMemo(() => {
    const uniqueFaculties = [];

    courses.forEach((course) => {
      if (
        course.faculty &&
        !uniqueFaculties.find((faculty) => faculty.id === course.faculty.id)
      ) {
        uniqueFaculties.push(course.faculty);
      }
    });

    return uniqueFaculties;
  }, [courses]);

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const searchText = search.trim().toLowerCase();

      const matchesSearch =
        !searchText ||
        course.name?.toLowerCase().includes(searchText) ||
        course.code?.toLowerCase().includes(searchText) ||
        course.level?.toLowerCase().includes(searchText) ||
        course.study_mode?.toLowerCase().includes(searchText) ||
        course.faculty?.name?.toLowerCase().includes(searchText);

      const matchesFaculty =
        !selectedFaculty || String(course.faculty?.id) === selectedFaculty;

      return matchesSearch && matchesFaculty;
    });
  }, [courses, search, selectedFaculty]);

  const stats = useMemo(() => {
    return {
      total: courses.length,

      faculties: faculties.length,

      active: courses.filter((course) => course.status === true).length,

      inactive: courses.filter((course) => course.status === false).length,
    };
  }, [courses, faculties]);

  const handleDelete = (courseId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this course?",
    );

    if (!confirmed) return;

    dispatch(deleteCourse(courseId)).then(() => {
      dispatch(getCourses());
    });
  };

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border bg-card p-6 shadow-soft">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              Courses
            </p>

            <h1 className="mt-2 text-2xl font-bold text-primary md:text-3xl">
              Course Management
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Manage academic programs, diplomas, undergraduate and postgraduate
              courses.
            </p>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-accent px-5 py-3 text-sm font-semibold text-accent-foreground shadow-soft transition-smooth hover:opacity-90"
          >
            <Plus className="h-4 w-4" />
            Add Course
          </button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Courses" value={stats.total} icon={BookCopy} />

        <StatCard
          title="Faculties"
          value={stats.faculties}
          icon={GraduationCap}
        />

        <StatCard title="Active Courses" value={stats.active} icon={Layers3} />

        <StatCard
          title="Inactive Courses"
          value={stats.inactive}
          icon={Users}
        />
      </section>

      <section className="rounded-3xl border bg-card p-5 shadow-soft">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_260px]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search courses..."
              className="w-full rounded-2xl border bg-background px-11 py-3 text-sm outline-none transition-smooth focus:border-accent"
            />
          </div>

          <select
            value={selectedFaculty}
            onChange={(event) => setSelectedFaculty(event.target.value)}
            className="rounded-2xl border bg-background px-4 py-3 text-sm outline-none transition-smooth focus:border-accent"
          >
            <option value="">All Faculties</option>

            {faculties.map((faculty) => (
              <option key={faculty.id} value={faculty.id}>
                {faculty.name}
              </option>
            ))}
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
          <h2 className="text-lg font-bold text-primary">Course Records</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Showing {filteredCourses.length} of {courses.length} courses.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1300px] text-left text-sm">
            <thead className="bg-secondary/60 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-5 py-4">Course</th>
                <th className="px-5 py-4">Faculty</th>
                <th className="px-5 py-4">Level</th>
                <th className="px-5 py-4">Duration</th>
                <th className="px-5 py-4">Study Mode</th>
                <th className="px-5 py-4">Tuition Fee</th>
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
                    Loading courses...
                  </td>
                </tr>
              ) : filteredCourses.length > 0 ? (
                filteredCourses.map((course) => (
                  <tr key={course.id} className="bg-background">
                    <td className="px-5 py-4">
                      <div className="flex items-start gap-4">
                        <div className="h-16 w-16 overflow-hidden rounded-2xl border bg-secondary">
                          <img
                            src={`${BASE_URL}/storage/${course.image}`}
                            alt={course.name}
                            className="h-full w-full object-cover"
                          />
                        </div>

                        <div>
                          <h3 className="font-semibold text-foreground">
                            {course.name}
                          </h3>

                          <p className="mt-1 text-xs text-muted-foreground">
                            {course.code}
                          </p>

                          <p className="mt-2 line-clamp-2 max-w-[280px] text-xs text-muted-foreground">
                            {course.short_description}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="font-medium text-foreground">
                        {course.faculty?.name}
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-foreground">
                        {course.level}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock3 className="h-4 w-4" />

                        {course.duration || "-"}
                      </div>
                    </td>

                    <td className="px-5 py-4 text-muted-foreground">
                      {course.study_mode || "-"}
                    </td>

                    <td className="px-5 py-4">
                      <span className="font-semibold text-primary">
                        {course.tuition_fee ? `£${course.tuition_fee}` : "-"}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <StatusBadge status={course.status} />
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedCourse(course)}
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
                          onClick={() => handleDelete(course.id)}
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
                    No courses found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {selectedCourse && (
        <CourseDetailsModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
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

const CourseDetailsModal = ({ course, onClose }) => {
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/45 p-4">
      <div className="max-h-[90vh] w-full max-w-6xl overflow-y-auto rounded-3xl border bg-card p-6 shadow-soft">
        <div className="flex items-start justify-between gap-4 border-b pb-4">
          <div>
            <h2 className="text-xl font-bold text-primary">Course Details</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Detailed course information and curriculum.
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

        <div className="mt-6 grid gap-8 lg:grid-cols-[380px_minmax(0,1fr)]">
          <div className="space-y-5">
            <div className="overflow-hidden rounded-3xl border bg-secondary">
              <img
                src={`${BASE_URL}/storage/${course.image}`}
                alt={course.name}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="rounded-2xl border bg-background p-5">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Faculty
              </p>

              <p className="mt-2 text-lg font-semibold text-primary">
                {course.faculty?.name}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <InfoCard label="Level" value={course.level} />

              <InfoCard label="Duration" value={course.duration} />

              <InfoCard label="Study Mode" value={course.study_mode} />

              <InfoCard
                label="Tuition Fee"
                value={course.tuition_fee ? `£${course.tuition_fee}` : "-"}
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                Course
              </p>

              <h3 className="mt-2 text-3xl font-bold text-primary">
                {course.name}
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                {course.code}
              </p>
            </div>

            <div className="rounded-2xl border bg-background p-5">
              <h4 className="text-lg font-semibold text-primary">
                Short Description
              </h4>

              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {course.short_description}
              </p>
            </div>

            <div className="rounded-2xl border bg-background p-5">
              <h4 className="text-lg font-semibold text-primary">
                Full Description
              </h4>

              <p className="mt-3 whitespace-pre-line text-sm leading-7 text-muted-foreground">
                {course.description}
              </p>
            </div>

            <div className="rounded-2xl border bg-background p-5">
              <div className="flex items-center gap-2">
                <BookCopy className="h-5 w-5 text-accent" />

                <h4 className="text-lg font-semibold text-primary">
                  Curriculum
                </h4>
              </div>

              {course.curriculums && course.curriculums.length > 0 ? (
                <div className="mt-5 space-y-4">
                  {course.curriculums.map((curriculum, index) => (
                    <div
                      key={curriculum.id || index}
                      className="rounded-2xl border bg-secondary/30 p-4"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                          {index + 1}
                        </div>

                        <div>
                          <h5 className="font-semibold text-primary">
                            {curriculum.title}
                          </h5>

                          <p className="mt-2 text-sm leading-6 text-muted-foreground">
                            {curriculum.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-sm text-muted-foreground">
                  No curriculum added for this course.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoCard = ({ label, value }) => {
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

export default Courses;
