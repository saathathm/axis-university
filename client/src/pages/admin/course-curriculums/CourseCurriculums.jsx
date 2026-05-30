import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ArrowLeft,
  BookOpen,
  Clock3,
  Pencil,
  Plus,
  Trash2,
  Layers3,
  ListOrdered,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import StatCard from "../../../components/widgets/StatCard";
import StatusBadge from "../../../components/widgets/admin/StatusBadge";
import LoadingSpinner from "../../../components/widgets/LoadingSpinner";
import { getCourseDetails } from "../../../features/course/courseActions";
import {
  deleteCourseCurriculum,
  getCourseCurriculums,
} from "../../../features/courseCurriculum/courseCurriculumActions";

const CourseCurriculums = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseId } = useParams();

  const { course = null, loading: courseLoading } = useSelector(
    (state) => state.courseState,
  );
  const { curriculums = [], loading: curriculumLoading, error } = useSelector(
    (state) => state.courseCurriculumState,
  );

  const [ready, setReady] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      setReady(false);

      await Promise.all([
        dispatch(getCourseDetails(courseId)),
        dispatch(getCourseCurriculums(courseId)),
      ]);

      if (isMounted) {
        setReady(true);
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [dispatch, courseId]);

  const stats = useMemo(() => {
    return {
      total: curriculums.length,
      active: curriculums.filter((curriculum) => curriculum.status === true).length,
      inactive: curriculums.filter((curriculum) => curriculum.status === false).length,
      highestSortOrder: curriculums.length
        ? Math.max(...curriculums.map((curriculum) => Number(curriculum.sort_order) || 0))
        : 0,
    };
  }, [curriculums]);

  const handleDelete = (curriculumId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this curriculum?",
    );

    if (!confirmed) return;

    dispatch(deleteCourseCurriculum(curriculumId)).then(() => {
      dispatch(getCourseCurriculums(courseId));
    });
  };

  if (courseLoading || curriculumLoading || !ready) {
    return <LoadingSpinner title="Loading curriculums" description="Fetching the selected course curriculum records." />;
  }

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border bg-card p-6 shadow-soft">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              Courses
            </p>

            <h1 className="mt-2 text-2xl font-bold text-primary md:text-3xl">
              {course?.name || "Course"} Curriculums
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Manage the curriculum sequence and content for this course.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => navigate("/admin/courses")}
              className="inline-flex items-center gap-2 rounded-2xl border bg-background px-5 py-3 text-sm font-semibold transition-smooth hover:bg-secondary"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Courses
            </button>

            <button
              type="button"
              onClick={() => navigate(`/admin/courses/${courseId}/curriculums/create`)}
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-accent px-5 py-3 text-sm font-semibold text-accent-foreground shadow-soft transition-smooth hover:opacity-90"
            >
              <Plus className="h-4 w-4" />
              Add Curriculum
            </button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Curriculums" value={stats.total} icon={BookOpen} />
        <StatCard title="Active" value={stats.active} icon={Layers3} />
        <StatCard title="Inactive" value={stats.inactive} icon={Trash2} />
        <StatCard title="Highest Order" value={stats.highestSortOrder} icon={ListOrdered} />
      </section>

      {error && (
        <section className="rounded-3xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive shadow-soft">
          {error}
        </section>
      )}

      <section className="overflow-hidden rounded-3xl border bg-card shadow-soft">
        <div className="border-b px-6 py-5">
          <h2 className="text-lg font-bold text-primary">Curriculum Records</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Showing {curriculums.length} curriculums for {course?.name || "this course"}.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px] text-left text-sm">
            <thead className="bg-secondary/60 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-5 py-4">Order</th>
                <th className="px-5 py-4">Title</th>
                <th className="px-5 py-4">Description</th>
                <th className="px-5 py-4">Duration</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {curriculums.length > 0 ? (
                curriculums.map((curriculum) => (
                  <tr key={curriculum.id} className="bg-background">
                    <td className="px-5 py-4">
                      <span className="inline-flex h-9 min-w-9 items-center justify-center rounded-full bg-secondary px-3 text-xs font-semibold text-foreground">
                        {curriculum.sort_order}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="font-semibold text-foreground">
                        {curriculum.title}
                      </div>
                    </td>

                    <td className="px-5 py-4 text-muted-foreground">
                      <p className="max-w-[360px] line-clamp-2">
                        {curriculum.description || "-"}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-muted-foreground">
                      <div className="inline-flex items-center gap-2">
                        <Clock3 className="h-4 w-4 text-accent" />
                        {curriculum.duration || "-"}
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <StatusBadge status={curriculum.status} />
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => navigate(`/admin/course-curriculums/${curriculum.id}/edit`)}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full border bg-card text-foreground transition-smooth hover:bg-secondary"
                          title="Edit curriculum"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(curriculum.id)}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-destructive/30 bg-destructive/10 text-destructive transition-smooth hover:bg-destructive hover:text-destructive-foreground"
                          title="Delete curriculum"
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
                    No curriculums found for this course.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default CourseCurriculums;
