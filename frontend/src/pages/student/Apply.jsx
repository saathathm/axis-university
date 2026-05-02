import { useState } from "react";
import Layout from "@/components/layout/Layout";
import PageHero from "@/components/shared/PageHero";
import { CheckCircle2 } from "lucide-react";
import { programs, faculties } from "@/data/content";
import { useSearchParams } from "react-router-dom";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Apply = () => {
  const [searchParams] = useSearchParams();
  const selectedProgramId = searchParams.get("program") || "";
  const selectedProgram = programs.find((p) => p.id === selectedProgramId);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    program: selectedProgram?.id || "",
    faculty: selectedProgram?.faculty || "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const update = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const validate = () => {
    if (form.fullName.trim().length < 2) return "Full name is required";
    if (!emailRegex.test(form.email.trim())) return "Valid email required";
    if (form.phone.trim().length < 6) return "Phone is required";
    if (!form.faculty) return "Please select a faculty";
    if (!form.program) return "Please select a program";
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
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 700);
  };

  return (
    <Layout>
      <PageHero title="Apply Now" subtitle="Take the first step toward your future at Axis University." />
      <section className="py-16">
        <div className="container max-w-2xl">
          {submitted ? (
            <div className="rounded-2xl border bg-card p-10 text-center shadow-elegant">
              <CheckCircle2 className="h-16 w-16 text-success mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-primary mb-2">Application Received!</h2>
              <p className="text-muted-foreground mb-6">Thank you, {form.fullName}. Our admissions team will contact you at {form.email} within 3 business days.</p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setForm({ fullName: "", email: "", phone: "", program: "", faculty: "", message: "" });
                  setError("");
                }}
                className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-semibold text-foreground hover:bg-secondary"
              >
                Submit another application
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="rounded-2xl border bg-card p-7 md:p-9 shadow-soft space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="fullName" className="text-sm font-medium text-foreground">Full Name *</label>
                  <input
                    id="fullName"
                    value={form.fullName}
                    onChange={(e) => update("fullName", e.target.value)}
                    maxLength={100}
                    required
                    className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="text-sm font-medium text-foreground">Email *</label>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    maxLength={255}
                    required
                    className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="phone" className="text-sm font-medium text-foreground">Phone *</label>
                  <input
                    id="phone"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    maxLength={30}
                    required
                    className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Faculty *</label>
                  <select
                    value={form.faculty}
                    onChange={(e) => update("faculty", e.target.value)}
                    className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="">Select faculty</option>
                    {faculties.map((f) => (
                      <option key={f.id} value={f.id}>{f.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Program *</label>
                <select
                  value={form.program}
                  onChange={(e) => update("program", e.target.value)}
                  className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="">Select program</option>
                  {programs.filter((p) => !form.faculty || p.faculty === form.faculty).map((p) => (
                    <option key={p.id} value={p.id}>{p.title} — {p.level}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="message" className="text-sm font-medium text-foreground">Message (optional)</label>
                <textarea
                  id="message"
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  maxLength={1000}
                  rows={4}
                  className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-md bg-gradient-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:opacity-90 disabled:opacity-60"
              >
                {loading ? "Submitting..." : "Submit Application"}
              </button>
              {error && (
                <p className="text-sm text-destructive" aria-live="polite">{error}</p>
              )}
            </form>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Apply;
