import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ArrowLeft, BookOpen, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  createCourseCurriculum,
  updateCourseCurriculum,
} from "../../../features/courseCurriculum/courseCurriculumActions";

const CourseCurriculumForm = ({
  course = null,
  courseId = "",
  curriculums = [],
  curriculum = null,
  isEdit = false,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const resolvedCourseId =
    course?.id || courseId || curriculum?.course?.id || "";

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    sortOrder: "",
    status: true,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (curriculum) {
      setFormData({
        title: curriculum.title || "",
        description: curriculum.description || "",
        duration: curriculum.duration || "",
        sortOrder: String(curriculum.sort_order ?? ""),
        status: curriculum.status ?? true,
      });
    }
  }, [curriculum]);

  const usedSortOrders = curriculums
    .filter((item) => !curriculum || item.id !== curriculum.id)
    .map((item) => Number(item.sort_order))
    .filter((value) => Number.isFinite(value));

  const maxSortOrder = Math.max(
    curriculums.length + 1,
    Number(formData.sortOrder) || 0,
    1,
  );

  const sortOrderOptions = Array.from({ length: maxSortOrder }, (_, index) => index + 1)
    .filter(
      (order) => !usedSortOrders.includes(order) || order === Number(formData.sortOrder),
    );

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");

      const payload = {
        title: formData.title,
        description: formData.description,
        duration: formData.duration,
        sortOrder: Number(formData.sortOrder),
        status: formData.status === true || formData.status === "true",
      };

      if (isEdit && curriculum) {
        await dispatch(updateCourseCurriculum(curriculum.id, payload));
      } else {
        await dispatch(createCourseCurriculum(resolvedCourseId, payload));
      }

      navigate(`/admin/courses/${resolvedCourseId}/curriculums`);
    } catch (err) {
      setError(err || `Failed to ${isEdit ? "update" : "create"} curriculum`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border bg-card p-6 shadow-soft">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              Curriculums
            </p>

            <h1 className="mt-2 text-2xl font-bold text-primary md:text-3xl">
              {isEdit ? "Edit Curriculum" : "Add Curriculum"}
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              {course?.name || curriculum?.course?.name || "Course"} curriculum
              management.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate(`/admin/courses/${resolvedCourseId}/curriculums`)}
            className="inline-flex items-center gap-2 rounded-2xl border bg-background px-5 py-3 text-sm font-semibold transition-smooth hover:bg-secondary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
        </div>
      </section>

      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border bg-card p-6 shadow-soft"
      >
        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-accent-soft text-accent">
            <BookOpen className="h-8 w-8" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-primary">
              Curriculum Information
            </h2>

            <p className="text-sm text-muted-foreground">
              Fill in the curriculum details for this course.
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        )}

        <div className="grid gap-5 md:grid-cols-2">
          <FormInput
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <FormInput
            label="Duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
          />

          <FormSelect
            label="Sort Order"
            name="sortOrder"
            value={formData.sortOrder}
            onChange={handleChange}
            required
            options={sortOrderOptions.map((order) => ({
              label: String(order),
              value: String(order),
            }))}
          />

          <FormSelect
            label="Status"
            name="status"
            value={String(formData.status)}
            onChange={(event) =>
              setFormData((current) => ({
                ...current,
                status: event.target.value === "true",
              }))
            }
            options={[
              {
                label: "Active",
                value: "true",
              },
              {
                label: "Inactive",
                value: "false",
              },
            ]}
          />
        </div>

        <div className="mt-5">
          <FormTextarea
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={6}
          />
        </div>

        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-soft transition-smooth hover:scale-[1.02] disabled:opacity-60"
          >
            <Save className="h-4 w-4" />

            {loading
              ? isEdit
                ? "Saving..."
                : "Creating..."
              : isEdit
                ? "Update Curriculum"
                : "Create Curriculum"}
          </button>
        </div>
      </form>
    </div>
  );
};

const FormInput = ({ label, type = "text", ...props }) => {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-primary">
        {label}
      </label>

      <input
        type={type}
        {...props}
        className="w-full rounded-2xl border bg-background px-4 py-3 text-sm outline-none transition-smooth focus:border-accent"
      />
    </div>
  );
};

const FormTextarea = ({ label, rows = 4, ...props }) => {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-primary">
        {label}
      </label>

      <textarea
        rows={rows}
        {...props}
        className="w-full rounded-2xl border bg-background px-4 py-3 text-sm outline-none transition-smooth focus:border-accent"
      />
    </div>
  );
};

const FormSelect = ({ label, options, ...props }) => {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-primary">
        {label}
      </label>

      <select
        {...props}
        className="w-full rounded-2xl border bg-background px-4 py-3 text-sm outline-none transition-smooth focus:border-accent"
      >
        <option value="">Select</option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CourseCurriculumForm;
