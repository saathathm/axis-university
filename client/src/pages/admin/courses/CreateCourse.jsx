import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { ArrowLeft, BookCopy, Save } from "lucide-react";

import { useNavigate } from "react-router-dom";

import {
  createCourse,
  updateCourse,
} from "../../../features/course/courseActions";

import { getFaculties } from "../../../features/faculty/facultyActions";

const CreateCourse = ({ course = null, isEdit = false }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { faculties = [] } = useSelector((state) => state.facultyState);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    facultyId: course?.faculty_id || "",

    name: course?.name || "",

    slug: course?.slug || "",

    code: course?.code || "",

    level: course?.level || "",

    duration: course?.duration || "",

    studyMode: course?.study_mode || "",

    fee: course?.fee || "",

    shortDescription: course?.short_description || "",

    description: course?.description || "",

    status: course?.status ?? true,
  });

  useEffect(() => {
    dispatch(getFaculties());
  }, [dispatch]);

  useEffect(() => {
    if (course) {
      setFormData({
        facultyId: course.faculty_id || "",

        name: course.name || "",

        slug: course.slug || "",

        code: course.code || "",

        level: course.level || "",

        duration: course.duration || "",

        studyMode: course.study_mode || "",

        fee: course.fee || "",

        shortDescription: course.short_description || "",

        description: course.description || "",

        status: course.status ?? true,
      });
    }
  }, [course]);

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
        facultyId: formData.facultyId,

        name: formData.name,

        slug: formData.slug,

        code: formData.code,

        level: formData.level,

        duration: formData.duration,

        studyMode: formData.studyMode,

        fee: formData.fee,

        shortDescription: formData.shortDescription,

        description: formData.description,

        status: formData.status ? 1 : 0,
      };

      if (isEdit) {
        await dispatch(updateCourse(course.id, payload));
      } else {
        await dispatch(createCourse(payload));
      }

      navigate("/admin/courses");
    } catch (err) {
      setError(err || `Failed to ${isEdit ? "update" : "create"} course`);
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
              Courses
            </p>

            <h1 className="mt-2 text-2xl font-bold text-primary md:text-3xl">
              {isEdit ? "Edit Course" : "Create Course"}
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Manage academic course information.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/admin/courses")}
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
            <BookCopy className="h-8 w-8" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-primary">
              Course Information
            </h2>

            <p className="text-sm text-muted-foreground">
              Fill all required course details.
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        )}

        <div className="grid gap-5 md:grid-cols-2">
          <FormSelect
            label="Faculty"
            name="facultyId"
            value={formData.facultyId}
            onChange={handleChange}
            required
            options={faculties.map((faculty) => ({
              label: faculty.name,
              value: faculty.id,
            }))}
          />

          <FormInput
            label="Course Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <FormInput
            label="Slug"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
          />

          <FormInput
            label="Course Code"
            name="code"
            value={formData.code}
            onChange={handleChange}
          />

          <FormInput
            label="Level"
            name="level"
            value={formData.level}
            onChange={handleChange}
          />

          <FormInput
            label="Duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
          />

          <FormSelect
            label="Study Mode"
            name="studyMode"
            value={formData.studyMode}
            onChange={(event) =>
              setFormData((current) => ({
                ...current,
                studyMode: event.target.value,
              }))
            }
            options={[
              {
                label: "Online",
                value: "online",
              },
              {
                label: "Physical",
                value: "physical",
              },
              {
                label: "Hybrid",
                value: "hybrid",
              },
            ]}
          />

          <FormInput
            label="Tuition Fee"
            name="fee"
            value={Number(formData.fee)}
            onChange={handleChange}
          />

          <FormSelect
            label="Status"
            name="status"
            value={formData.status}
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
            label="Short Description"
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            rows={3}
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
                ? "Updating..."
                : "Creating..."
              : isEdit
                ? "Update Course"
                : "Create Course"}
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

export default CreateCourse;
