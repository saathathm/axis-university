import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeft, Save, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  createStudent,
  updateStudent,
} from "../../../features/student/studentActions";

import { getCourses } from "../../../features/course/courseActions";
import SearchableSelect from "../../../components/widgets/SearchableSelect";

const CreateStudent = ({ student = null, isEdit = false }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { courses = [] } = useSelector((state) => state.courseState);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    contactNumber: "",
    passportNumber: "",
    dateOfBirth: "",
    streetAddress: "",
    townCity: "",
    country: "",
    postcode: "",
    status: "active",
    courseId: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  const formatDateForInput = (value) => {
    if (!value) {
      return "";
    }

    return String(value).split("T")[0];
  };

  useEffect(() => {
    if (student) {
      setFormData({
        firstName: student.first_name || "",
        lastName: student.last_name || "",
        emailAddress: student.email_address || "",
        contactNumber: student.contact_number || "",
        passportNumber: student.passport_number || "",
        dateOfBirth: formatDateForInput(student.date_of_birth),
        streetAddress: student.street_address || "",
        townCity: student.town_city || "",
        country: student.country || "",
        postcode: student.postcode || "",
        status: student.status || "active",
        courseId:
          (student.enrollments && student.enrollments[0]
            ? student.enrollments[0].course?.id ||
              student.enrollments[0].course_id
            : "") || "",
      });
    }
  }, [student]);

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

      if (isEdit && student) {
        await dispatch(updateStudent(student.id, formData));
      } else {
        await dispatch(createStudent(formData));
      }

      navigate("/admin/students");
    } catch (err) {
      setError(err || "Failed to create student");
    } finally {
      setLoading(false);
    }
  };

  const countryOptions = [
    "Afghanistan",
    "Algeria",
    "Argentina",
    "Australia",
    "Bangladesh",
    "Brazil",
    "Canada",
    "China",
    "Egypt",
    "France",
    "Germany",
    "India",
    "Indonesia",
    "Iraq",
    "Italy",
    "Jordan",
    "Kenya",
    "Lebanon",
    "Malaysia",
    "Morocco",
    "Nepal",
    "Netherlands",
    "Nigeria",
    "Pakistan",
    "Philippines",
    "Qatar",
    "Saudi Arabia",
    "South Africa",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Turkey",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
  ];

  const courseOptions = courses.map((course) => ({
    label: course.name,
    value: course.id,
  }));

  const countrySelectOptions = countryOptions.map((country) => ({
    label: country,
    value: country,
  }));

  const selectedCountry =
    countrySelectOptions.find((option) => option.value === formData.country) ||
    null;

  const selectedCourse =
    courseOptions.find(
      (option) => String(option.value) === String(formData.courseId),
    ) || null;

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border bg-card p-6 shadow-soft">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              Students
            </p>

            <h1 className="mt-2 text-2xl font-bold text-primary md:text-3xl">
              Create Student
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Add a new student to the university portal system.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/admin/students")}
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
            <UserPlus className="h-8 w-8" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-primary">
              Student Information
            </h2>

            <p className="text-sm text-muted-foreground">
              Fill all required student details.
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
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />

          <FormInput
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />

          <FormInput
            label="Email Address"
            type="email"
            name="emailAddress"
            value={formData.emailAddress}
            onChange={handleChange}
            required
          />

          <FormInput
            label="Contact Number"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            required
          />

          <FormInput
            label="Passport Number"
            name="passportNumber"
            value={formData.passportNumber}
            onChange={handleChange}
          />

          <FormInput
            label="Date of Birth"
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />

          <FormInput
            label="Town / City"
            name="townCity"
            value={formData.townCity}
            onChange={handleChange}
          />

          <SearchableSelect
            label="Country"
            options={countrySelectOptions}
            value={selectedCountry}
            placeholder="Search country..."
            onChange={(selected) =>
              setFormData((current) => ({
                ...current,
                country: selected?.value || "",
              }))
            }
          />

          <FormInput
            label="Postcode"
            name="postcode"
            value={formData.postcode}
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
                label: "Inactive",
                value: "inactive",
              },
              {
                label: "Suspended",
                value: "suspended",
              },
            ]}
          />

          {!isEdit ? (
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
          ) : null}
        </div>

        <div className="mt-5">
          <label className="mb-2 block text-sm font-semibold text-primary">
            Street Address
          </label>

          <textarea
            name="streetAddress"
            value={formData.streetAddress}
            onChange={handleChange}
            rows="4"
            className="w-full rounded-2xl border bg-background px-4 py-3 text-sm outline-none transition-smooth focus:border-accent"
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
                ? "Update Student"
                : "Create Student"}
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

export default CreateStudent;
