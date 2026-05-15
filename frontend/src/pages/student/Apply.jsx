import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "@/components/layout/Layout";
import PageHero from "@/components/shared/PageHero";
import { CalendarDays, CheckCircle2, Upload } from "lucide-react";
import { programs } from "@/data/content";
import { useSearchParams } from "react-router-dom";
import { submitApplication } from "@/store/slices/applicationSlice.js";

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

const createInitialForm = (selectedProgramId = "") => ({
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
  program: selectedProgramId,
  attachments: [],
});

const Apply = () => {
  const dispatch = useDispatch();
  const apiPrograms = useSelector((state) => state.content.programs);
  const programItems = apiPrograms.length ? apiPrograms : programs;
  const [searchParams] = useSearchParams();
  const selectedProgramId = searchParams.get("program") || "";
  const selectedProgram = useMemo(
    () => programItems.find((program) => String(program.id) === String(selectedProgramId)),
    [programItems, selectedProgramId],
  );

  const [form, setForm] = useState(() =>
    createInitialForm(selectedProgram?.id || ""),
  );
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const update = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const validate = () => {
    if (form.firstName.trim().length < 2) return "First name is required";
    if (form.lastName.trim().length < 2) return "Last name is required";
    if (form.passportNumber.trim().length < 4) return "Passport number is required";
    if (!form.dateOfBirth) return "Date of birth is required";
    if (form.contactNumber.trim().length < 6) return "Contact number is required";
    if (form.streetAddress.trim().length < 5) return "Street address is required";
    if (form.townCity.trim().length < 2) return "Town / City is required";
    if (!form.country) return "Please select a country";
    if (form.postcode.trim().length < 2) return "Postcode / Zip is required";
    if (!emailRegex.test(form.emailAddress.trim())) return "Valid email required";
    if (!form.program) return "Please select a program";
    if (form.attachments.length === 0) return "Please attach at least one supporting document";
    return "";
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const message = validate();
    if (message) {
      setError(message);
      return;
    }
    setLoading(true);
    setError("");
    dispatch(
      submitApplication({
        first_name: form.firstName,
        last_name: form.lastName,
        passport_number: form.passportNumber,
        date_of_birth: form.dateOfBirth,
        contact_number: form.contactNumber,
        street_address: form.streetAddress,
        town_city: form.townCity,
        country: form.country,
        postcode: form.postcode,
        email_address: form.emailAddress,
        program_id: selectedProgram?.backendId || selectedProgram?.id,
        attachments: form.attachments,
      }),
    )
      .unwrap()
      .then(() => setSubmitted(true))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  };

  return (
    <Layout>
      <PageHero
        title="Apply Now"
        subtitle="Complete the student details form to begin your application."
      />
      <section className="py-16 md:py-20">
        <div className="container max-w-6xl">
          {submitted ? (
            <div className="mx-auto max-w-3xl rounded-2xl border bg-card p-10 text-center shadow-elegant">
              <CheckCircle2 className="h-16 w-16 text-success mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-primary mb-2">Application Received!</h2>
              <p className="text-muted-foreground mb-6">
                Thank you, {form.firstName} {form.lastName}. Our admissions
                team will contact you at {form.emailAddress} within 3 business
                days.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setForm(createInitialForm(selectedProgram?.id || ""));
                  setError("");
                }}
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
                  <label htmlFor="firstName" className="text-sm font-medium text-foreground">
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
                  <label htmlFor="lastName" className="text-sm font-medium text-foreground">
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
                  <label htmlFor="passportNumber" className="text-sm font-medium text-foreground">
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
                  <label htmlFor="dateOfBirth" className="text-sm font-medium text-foreground">
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
                  <label htmlFor="contactNumber" className="text-sm font-medium text-foreground">
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
                  <label htmlFor="streetAddress" className="text-sm font-medium text-foreground">
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
                  <label htmlFor="townCity" className="text-sm font-medium text-foreground">
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
                  <label htmlFor="country" className="text-sm font-medium text-foreground">
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
                  <label htmlFor="postcode" className="text-sm font-medium text-foreground">
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
                  <label htmlFor="emailAddress" className="text-sm font-medium text-foreground">
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
                  <label htmlFor="program" className="text-sm font-medium text-foreground">
                    Choose Program*
                  </label>
                  <select
                    id="program"
                    value={form.program}
                    onChange={(e) => update("program", e.target.value)}
                    required
                    className="mt-1 w-full rounded-md border border-input bg-background px-4 py-3 text-sm"
                  >
                    <option value="">Choose Program</option>
                    {programs.map((program) => (
                      <option key={program.id} value={program.id}>
                        {program.title} — {program.level}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="attachments" className="text-sm font-medium text-foreground">
                    Supporting documents*
                  </label>
                  <label
                    htmlFor="attachments"
                    className="mt-1 flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-input bg-background px-6 py-8 text-center transition-smooth hover:border-primary/50 hover:bg-secondary/50"
                  >
                    <Upload className="mb-3 h-6 w-6 text-accent" />
                    <span className="text-sm font-semibold text-foreground">Choose files</span>
                    <span className="mt-1 text-xs text-muted-foreground">
                      Upload one or more PDFs or images for passport, transcripts, or certificates.
                    </span>
                    <input
                      id="attachments"
                      type="file"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      onChange={(e) => update("attachments", Array.from(e.target.files || []))}
                      className="sr-only"
                    />
                  </label>
                  {form.attachments.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {form.attachments.map((file) => (
                        <span key={`${file.name}-${file.size}`} className="rounded-full border bg-secondary px-3 py-1 text-xs text-muted-foreground">
                          {file.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-muted-foreground">
                  Fields marked with an asterisk are required.
                </p>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center rounded-md bg-gradient-accent px-6 py-3 text-sm font-semibold text-accent-foreground hover:opacity-90 disabled:opacity-60 sm:w-auto"
                >
                  {loading ? "Submitting..." : "Submit Application"}
                </button>
              </div>

              {error && (
                <p className="mt-4 text-sm text-destructive" aria-live="polite">
                  {error}
                </p>
              )}
            </form>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Apply;
