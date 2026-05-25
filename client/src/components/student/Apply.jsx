import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { CalendarDays, CheckCircle2 } from "lucide-react";

import PageHero from "../widgets/PageHero";
import { getCourses } from "../../features/course/courseActions";
import { createApplication } from "../../features/application/applicationActions";
import {
  clearApplicationError,
  clearApplicationMessage,
} from "../../features/application/applicationSlice";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

const createInitialForm = (selectedCourseId = "") => ({
  firstName: "",
  lastName: "",
  passportNumber: "",
  dateOfBirth: "",
  contactNumber: "",
  streetAddress: "",
  townCity: "",
  country: "",
  postcode: "",
  emailAddress: "",
  courseId: selectedCourseId,
});

function Apply() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const selectedCourseId = searchParams.get("course") || "";

  const { courses = [], loading: coursesLoading } = useSelector(
    (state) => state.courseState,
  );

  const {
    loading: applicationLoading,
    message,
    error,
  } = useSelector((state) => state.applicationState);

  const [form, setForm] = useState(() => createInitialForm(selectedCourseId));
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

  const selectedCourse = useMemo(() => {
    return courses.find(
      (course) => String(course.id) === String(form.courseId),
    );
  }, [form.courseId, courses]);

  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  useEffect(() => {
    if (selectedCourseId) {
      setForm((prev) => ({
        ...prev,
        courseId: selectedCourseId,
      }));
    }
  }, [selectedCourseId]);

  useEffect(() => {
    if (message) {
      setSubmitted(true);
      dispatch(clearApplicationMessage());
    }
  }, [dispatch, message]);

  const update = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));

    if (formError) {
      setFormError("");
    }

    if (error) {
      dispatch(clearApplicationError());
    }
  };

  const validate = () => {
    if (form.firstName.trim().length < 2) return "First name is required";
    if (form.lastName.trim().length < 2) return "Last name is required";
    if (form.passportNumber.trim().length < 4)
      return "Passport number is required";
    if (!form.dateOfBirth) return "Date of birth is required";
    if (form.contactNumber.trim().length < 6)
      return "Contact number is required";
    if (form.streetAddress.trim().length < 5)
      return "Street address is required";
    if (form.townCity.trim().length < 2) return "Town / City is required";
    if (!form.country) return "Please select a country";
    if (form.postcode.trim().length < 2) return "Postcode / Zip is required";
    if (!emailRegex.test(form.emailAddress.trim()))
      return "Valid email required";
    if (!form.courseId) return "Please select a course";

    return "";
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const validationMessage = validate();

    if (validationMessage) {
      setFormError(validationMessage);
      return;
    }

    dispatch(
      createApplication({
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        passportNumber: form.passportNumber.trim(),
        dateOfBirth: form.dateOfBirth,
        contactNumber: form.contactNumber.trim(),
        streetAddress: form.streetAddress.trim(),
        townCity: form.townCity.trim(),
        country: form.country,
        postcode: form.postcode.trim(),
        emailAddress: form.emailAddress.trim(),
        courseId: form.courseId,
      }),
    );
  };

  const resetForm = () => {
    setSubmitted(false);
    setForm(createInitialForm(selectedCourse?.id || selectedCourseId || ""));
    setFormError("");
    dispatch(clearApplicationError());
    dispatch(clearApplicationMessage());
  };

  return (
    <>
      <PageHero
        title="Apply Now"
        subtitle="Complete the student details form to begin your application."
      />

      <section className="py-16 md:py-20">
        <div className="container max-w-6xl">
          {submitted ? (
            <div className="mx-auto max-w-3xl rounded-2xl border bg-card p-10 text-center shadow-elegant">
              <CheckCircle2 className="mx-auto mb-4 h-16 w-16 text-success" />

              <h2 className="mb-2 text-2xl font-bold text-primary">
                Application Received!
              </h2>

              <p className="mb-6 text-muted-foreground">
                Thank you, {form.firstName} {form.lastName}. Our admissions team
                will contact you at {form.emailAddress} within 3 business days.
              </p>

              <button
                type="button"
                onClick={resetForm}
                className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-semibold text-foreground hover:bg-secondary"
              >
                Submit another application
              </button>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              className="mx-auto max-w-6xl rounded-3xl border bg-card p-6 shadow-soft md:p-10"
            >
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-primary md:text-3xl">
                  Student details
                </h2>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="firstName"
                    className="text-sm font-medium text-foreground"
                  >
                    First Name*
                  </label>

                  <input
                    id="firstName"
                    value={form.firstName}
                    onChange={(e) => update("firstName", e.target.value)}
                    maxLength={100}
                    required
                    className="mt-1 w-full rounded-md border border-input bg-background px-4 py-3 text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="text-sm font-medium text-foreground"
                  >
                    Last Name*
                  </label>

                  <input
                    id="lastName"
                    value={form.lastName}
                    onChange={(e) => update("lastName", e.target.value)}
                    maxLength={100}
                    required
                    className="mt-1 w-full rounded-md border border-input bg-background px-4 py-3 text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="passportNumber"
                    className="text-sm font-medium text-foreground"
                  >
                    Passport Number*
                  </label>

                  <input
                    id="passportNumber"
                    value={form.passportNumber}
                    onChange={(e) => update("passportNumber", e.target.value)}
                    maxLength={40}
                    required
                    className="mt-1 w-full rounded-md border border-input bg-background px-4 py-3 text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="dateOfBirth"
                    className="text-sm font-medium text-foreground"
                  >
                    Date of Birth*
                  </label>

                  <div className="relative mt-1">
                    <CalendarDays className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <input
                      id="dateOfBirth"
                      type="date"
                      value={form.dateOfBirth}
                      onChange={(e) => update("dateOfBirth", e.target.value)}
                      required
                      className="w-full rounded-md border border-input bg-background px-4 py-3 pr-10 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contactNumber"
                    className="text-sm font-medium text-foreground"
                  >
                    Contact Number*
                  </label>

                  <input
                    id="contactNumber"
                    value={form.contactNumber}
                    onChange={(e) => update("contactNumber", e.target.value)}
                    maxLength={30}
                    required
                    className="mt-1 w-full rounded-md border border-input bg-background px-4 py-3 text-sm"
                  />
                </div>

                <div className="md:col-span-2">
                  <label
                    htmlFor="streetAddress"
                    className="text-sm font-medium text-foreground"
                  >
                    Street address*
                  </label>

                  <input
                    id="streetAddress"
                    value={form.streetAddress}
                    onChange={(e) => update("streetAddress", e.target.value)}
                    maxLength={200}
                    required
                    placeholder="House number and street name"
                    className="mt-1 w-full rounded-md border border-input bg-background px-4 py-3 text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="townCity"
                    className="text-sm font-medium text-foreground"
                  >
                    Town / City*
                  </label>

                  <input
                    id="townCity"
                    value={form.townCity}
                    onChange={(e) => update("townCity", e.target.value)}
                    maxLength={120}
                    required
                    className="mt-1 w-full rounded-md border border-input bg-background px-4 py-3 text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="country"
                    className="text-sm font-medium text-foreground"
                  >
                    Country*
                  </label>

                  <select
                    id="country"
                    value={form.country}
                    onChange={(e) => update("country", e.target.value)}
                    required
                    className="mt-1 w-full rounded-md border border-input bg-background px-4 py-3 text-sm"
                  >
                    <option value="">Choose Country...</option>

                    {countryOptions.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="postcode"
                    className="text-sm font-medium text-foreground"
                  >
                    Postcode / Zip*
                  </label>

                  <input
                    id="postcode"
                    value={form.postcode}
                    onChange={(e) => update("postcode", e.target.value)}
                    maxLength={20}
                    required
                    className="mt-1 w-full rounded-md border border-input bg-background px-4 py-3 text-sm"
                  />
                </div>

                <div className="md:col-span-2">
                  <label
                    htmlFor="emailAddress"
                    className="text-sm font-medium text-foreground"
                  >
                    Email Address*
                  </label>

                  <input
                    id="emailAddress"
                    type="email"
                    value={form.emailAddress}
                    onChange={(e) => update("emailAddress", e.target.value)}
                    maxLength={255}
                    required
                    className="mt-1 w-full rounded-md border border-input bg-background px-4 py-3 text-sm"
                  />
                </div>

                <div className="md:col-span-2">
                  <label
                    htmlFor="courseId"
                    className="text-sm font-medium text-foreground"
                  >
                    Choose Course*
                  </label>

                  <select
                    id="courseId"
                    value={form.courseId}
                    onChange={(e) => update("courseId", e.target.value)}
                    required
                    disabled={coursesLoading}
                    className="mt-1 w-full rounded-md border border-input bg-background px-4 py-3 text-sm"
                  >
                    <option value="">
                      {coursesLoading ? "Loading courses..." : "Choose Course"}
                    </option>

                    {courses.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.name} {course.level ? `— ${course.level}` : ""}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-muted-foreground">
                  Fields marked with an asterisk are required.
                </p>

                <button
                  type="submit"
                  disabled={applicationLoading}
                  className="inline-flex w-full items-center justify-center rounded-md bg-gradient-accent px-6 py-3 text-sm font-semibold text-accent-foreground hover:opacity-90 disabled:opacity-60 sm:w-auto"
                >
                  {applicationLoading ? "Submitting..." : "Submit Application"}
                </button>
              </div>

              {(formError || error) && (
                <p className="mt-4 text-sm text-destructive" aria-live="polite">
                  {formError || error}
                </p>
              )}
            </form>
          )}
        </div>
      </section>
    </>
  );
}

export default Apply;
