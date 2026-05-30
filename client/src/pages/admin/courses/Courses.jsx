import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BookCopy,
  BookOpen,
  Clock3,
  Eye,
  GraduationCap,
  Layers3,
  Pencil,
  Plus,
  Search,
  Trash2,
  UserRound,
  Users,
} from "lucide-react";

import {
  deleteCourse,
  getCourses,
} from "../../../features/course/courseActions";
import StatCard from "../../../components/widgets/StatCard";
import { BASE_URL } from "../../../utils/constants";
import CourseDetailsModal from "../../../components/widgets/admin/course/CourseDetailsModal";
import StatusBadge from "../../../components/widgets/admin/StatusBadge";
import PageHeader from "../../../components/widgets/PageHeader";
import { useNavigate } from "react-router-dom";
import SearchFilterBar from "../../../components/widgets/admin/SearchFilterBar";

const Courses = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const handleCurriculums = (courseId) => {
    navigate(`/admin/courses/${courseId}/curriculums`);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Courses"
        title="Course Management"
        description="Manage academic programs, diplomas, undergraduate and postgraduate courses."
        buttonText="Add Course"
        buttonIcon={Plus}
        onButtonClick={() => navigate("/admin/courses/create")}
      />

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

      <SearchFilterBar
        search={search}
        setSearch={setSearch}
        statusFilter={selectedFaculty}
        setStatusFilter={setSelectedFaculty}
        searchPlaceholder="Search courses..."
        filterAllName="All Faculties"
        statusOptions={faculties.map((faculty) => ({
          label: faculty.name,
          value: faculty.id,
        }))}
        error={error}
      />

      <section className="overflow-hidden rounded-3xl border bg-card shadow-soft">
        <div className="border-b px-6 py-5">
          <h2 className="text-lg font-bold text-primary">Course Records</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Showing {filteredCourses.length} of {courses.length} courses.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[968px] text-left text-sm">
            <thead className="bg-secondary/60 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-5 py-4">Course</th>
                <th className="px-5 py-4">Faculty</th>
                <th className="px-5 py-4">Duration</th>
                <th className="px-5 py-4">Study Mode</th>
                <th className="px-5 py-4 text-center">Actions</th>
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
                      <div className="flex items-center gap-4">

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
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock3 className="h-4 w-4" />

                        {course.duration || "-"}
                      </div>
                    </td>

                    <td className="px-5 py-4 text-muted-foreground">
                      {course.study_mode || "-"}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => handleCurriculums(course.id)}
                          className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-2 text-xs font-semibold text-foreground transition-smooth hover:bg-secondary"
                          title="Manage curriculums"
                        >
                          <BookOpen className="h-4 w-4" />
                          Curriculums
                        </button>

                        <button
                          type="button"
                          onClick={() => setSelectedCourse(course)}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full border bg-card text-foreground transition-smooth hover:bg-secondary"
                        >
                          <Eye className="h-4 w-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            navigate(`/admin/courses/${course.id}/edit`)
                          }
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
          onClick={() => handleCurriculums(selectedCourse.id)}
        />
      )}
    </div>
  );
};

export default Courses;
