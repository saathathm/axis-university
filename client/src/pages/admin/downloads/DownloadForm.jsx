import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { ArrowLeft, Download, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  createDownload,
  updateDownload,
} from "../../../features/download/downloadActions";

const DownloadForm = ({
  course = null,
  courses = [],
  download = null,
  isEdit = false,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    courseId: "",
    title: "",
    description: "",
    status: true,
  });

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (download) {
      setFormData({
        courseId: String(download.course_id || download.course?.id || ""),
        title: download.title || "",
        description: download.description || "",
        status: download.status ?? true,
      });
    } else if (course) {
      setFormData((current) => ({
        ...current,
        courseId: String(course.id || ""),
      }));
    }
  }, [course, download]);

  const currentCourseId = String(formData.courseId || course?.id || download?.course_id || download?.course?.id || "");

  const availableCourses = useMemo(() => {
    const resolvedCourses = Array.isArray(courses) ? courses : [];

    return resolvedCourses.filter((item) => {
      const itemCourseId = String(item.id);

      if (itemCourseId === currentCourseId) {
        return true;
      }

      const hasDownload = Array.isArray(item.downloads)
        ? item.downloads.length > 0
        : Boolean(item.download);

      return !hasDownload;
    });
  }, [courses, currentCourseId]);

  const courseOptions = useMemo(() => {
    const options = availableCourses.map((item) => ({
      label: `${item.name}${item.code ? ` (${item.code})` : ""}`,
      value: String(item.id),
    }));

    const selectedCourse = course || download?.course;

    if (
      selectedCourse &&
      !options.some((option) => option.value === String(selectedCourse.id))
    ) {
      options.unshift({
        label: `${selectedCourse.name}${selectedCourse.code ? ` (${selectedCourse.code})` : ""}`,
        value: String(selectedCourse.id),
      });
    }

    return options;
  }, [availableCourses, course, download]);

  const selectedCourse =
    courseOptions.find((option) => option.value === String(formData.courseId)) ||
    null;

  const handleChange = (event) => {
    const { name, value, type, files } = event.target;

    if (type === "file") {
      setFile(files?.[0] || null);
      return;
    }

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

      const payload = new FormData();

      payload.append("courseId", formData.courseId);
      payload.append("title", formData.title);
      payload.append("description", formData.description || "");
      payload.append("status", formData.status ? "1" : "0");

      if (file) {
        payload.append("file", file);
      }

      if (isEdit && download) {
        await dispatch(updateDownload(download.id, payload));
      } else {
        await dispatch(createDownload(payload));
      }

      navigate("/admin/downloads");
    } catch (err) {
      setError(err || `Failed to ${isEdit ? "update" : "create"} download`);
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
              Downloads
            </p>

            <h1 className="mt-2 text-2xl font-bold text-primary md:text-3xl">
              {isEdit ? "Edit Download" : "Create Download"}
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Attach a downloadable file to a single course.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/admin/downloads")}
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
            <Download className="h-8 w-8" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-primary">
              Download Information
            </h2>

            <p className="text-sm text-muted-foreground">
              Each course can have only one download.
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
            label="Course"
            name="courseId"
            value={formData.courseId}
            onChange={handleChange}
            required
            options={courseOptions}
          />

          <FormInput
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
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
              { label: "Active", value: "true" },
              { label: "Inactive", value: "false" },
            ]}
          />

          <FileInput
            label="File"
            name="file"
            onChange={handleChange}
            required={!isEdit}
            currentFile={download?.file}
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
                ? "Update Download"
                : "Create Download"}
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

const FileInput = ({ label, currentFile, ...props }) => {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-primary">
        {label}
      </label>

      <input
        type="file"
        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp"
        {...props}
        className="w-full rounded-2xl border bg-background px-4 py-3 text-sm outline-none transition-smooth file:mr-4 file:rounded-xl file:border-0 file:bg-secondary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-foreground focus:border-accent"
      />

      {currentFile && (
        <p className="mt-2 text-xs text-muted-foreground">
          Current file: {currentFile}
        </p>
      )}
    </div>
  );
};

export default DownloadForm;
