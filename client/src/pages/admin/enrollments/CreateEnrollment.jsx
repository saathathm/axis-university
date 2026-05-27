import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeft, GraduationCap, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

import { getCourses } from "../../../features/course/courseActions";
import {
  createEnrollment,
  updateEnrollment,
} from "../../../features/enrollment/enrollmentActions";
import { getStudents } from "../../../features/student/studentActions";
import SearchableSelect from "../../../components/widgets/SearchableSelect";

const CreateEnrollment = ({ enrollment = null, isEdit = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { students = [] } = useSelector((state) => state.studentState);

  const { courses = [] } = useSelector((state) => state.courseState);

  const [formData, setFormData] = useState({
    studentId: "",
    courseId: "",
    enrollmentDate: "",
    startDate: "",
    endDate: "",
    completionDate: "",
    status: "active",
    grade: "",
    adminNote: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    dispatch(getCourses());

    dispatch(getStudents());
  }, [dispatch]);

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

      if (isEdit && enrollment) {
        await dispatch(updateEnrollment(enrollment.id, formData));
      } else {
        await dispatch(createEnrollment(formData));
      }

      navigate("/admin/enrollments");
    } catch (err) {
      setError(err || "Failed to create enrollment");
    } finally {
      setLoading(false);
    }
  };

  const formatDateForInput = (value) => {
    if (!value) return "";

    return String(value).split("T")[0];
  };

  useEffect(() => {
    if (enrollment) {
      setFormData({
        studentId: enrollment.student?.id || enrollment.student_id || "",
        courseId: enrollment.course?.id || enrollment.course_id || "",
        enrollmentDate: formatDateForInput(enrollment.enrollment_date),
        startDate: formatDateForInput(enrollment.start_date),
        endDate: formatDateForInput(enrollment.end_date),
        completionDate: formatDateForInput(
          enrollment.completion_date || enrollment.completionDate,
        ),
        status: enrollment.status || "active",
        grade: enrollment.grade || "",
        adminNote: enrollment.admin_note || enrollment.adminNote || "",
      });
    }
  }, [enrollment]);

  const studentOptions = students.map((student) => ({
    label: `${student.first_name} ${student.last_name}`,
    value: student.id,
  }));

  const courseOptions = courses.map((course) => ({
    label: course.name,
    value: course.id,
  }));

  const selectedStudent =
    studentOptions.find(
      (opt) => String(opt.value) === String(formData.studentId),
    ) || null;

  const selectedCourse =
    courseOptions.find(
      (opt) => String(opt.value) === String(formData.courseId),
    ) || null;

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border bg-card p-6 shadow-soft">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              Enrollments
            </p>

            <h1 className="mt-2 text-2xl font-bold text-primary md:text-3xl">
              {isEdit ? "Edit Enrollment" : "Create Enrollment"}
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Add a new enrollment to the university portal system.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/admin/enrollments")}
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
            <GraduationCap className="h-8 w-8" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-primary">
              Enrollment Information
            </h2>

            <p className="text-sm text-muted-foreground">
              Fill all required enrollment details.
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        )}

        <div className="grid gap-5 md:grid-cols-2">
          <SearchableSelect
            label="Student"
            options={studentOptions}
            value={selectedStudent}
            placeholder="Search student..."
            onChange={(selected) =>
              setFormData((current) => ({
                ...current,
                studentId: selected?.value || "",
              }))
            }
          />

          <SearchableSelect
            label="Course"
            options={courseOptions}
            value={selectedCourse}
            placeholder="Search course..."
            onChange={(selected) =>
              setFormData((current) => ({
                ...current,
                courseId: selected?.value || "",
              }))
            }
          />

          <FormInput
            label="Enrollment Date"
            type="date"
            name="enrollmentDate"
            value={formData.enrollmentDate}
            onChange={handleChange}
            required
          />

          <FormInput
            label="Start Date"
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />

          <FormInput
            label="End Date"
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
          />

          <FormInput
            label="Completion Date"
            type="date"
            name="completionDate"
            value={formData.completionDate}
            onChange={handleChange}
          />

          <FormSelect
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            options={[
              {
                label: "Active",
                value: "active",
              },
              {
                label: "Completed",
                value: "completed",
              },
              {
                label: "Suspended",
                value: "suspended",
              },
              {
                label: "Withdrawn",
                value: "withdrawn",
              },
            ]}
          />

          <FormInput
            label="Grade"
            name="grade"
            value={formData.grade}
            onChange={handleChange}
          />

          <FormInput
            label="Admin Note"
            name="adminNote"
            value={formData.adminNote}
            onChange={handleChange}
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
                ? "Save Changes"
                : "Create Enrollment"}
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

export default CreateEnrollment;
