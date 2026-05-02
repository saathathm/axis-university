import { useState } from "react";
import Layout from "@/components/layout/Layout";
import PageHero from "@/components/shared/PageHero";
import { CheckCircle2, ShieldCheck, XCircle } from "lucide-react";

// Mock verified records (frontend only)
const records = [
  { certId: "AXIS-2024-001", fullName: "Sara Ahmed", program: "BBA Marketing", year: "2024" },
  { certId: "AXIS-2023-188", fullName: "Omar Hassan", program: "MSc Data Science", year: "2023" },
];

const Verify = () => {
  const [form, setForm] = useState({ certId: "", fullName: "" });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const update = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const validate = () => {
    if (form.certId.trim().length < 4) return "Certificate ID is required";
    if (form.fullName.trim().length < 2) return "Name is required";
    return "";
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const message = validate();
    if (message) {
      setError(message);
      setResult(null);
      return;
    }
    setLoading(true);
    setError("");
    setResult(null);
    setTimeout(() => {
      const found = records.find(
        (rec) => rec.certId.toLowerCase() === form.certId.toLowerCase() &&
                 rec.fullName.toLowerCase() === form.fullName.toLowerCase()
      );
      setResult(found ? { status: "verified", program: found.program, year: found.year, name: found.fullName } : { status: "not_found" });
      setLoading(false);
    }, 800);
  };

  return (
    <Layout>
      <PageHero title="Certificate Verification" subtitle="Confirm the authenticity of any Axis University certificate." />
      <section className="py-16">
        <div className="container max-w-xl">
          <form onSubmit={onSubmit} className="rounded-2xl border bg-card p-7 md:p-9 shadow-soft space-y-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-12 w-12 rounded-xl bg-gradient-accent flex items-center justify-center">
                <ShieldCheck className="h-6 w-6 text-accent-foreground" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-primary">Verify a Certificate</h2>
                <p className="text-sm text-muted-foreground">Enter the certificate ID and student's full name.</p>
              </div>
            </div>
            <div>
              <label htmlFor="certId" className="text-sm font-medium text-foreground">Certificate ID *</label>
              <input
                id="certId"
                value={form.certId}
                onChange={(e) => update("certId", e.target.value)}
                maxLength={40}
                placeholder="e.g. AXIS-2024-001"
                required
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label htmlFor="fullName" className="text-sm font-medium text-foreground">Full Name *</label>
              <input
                id="fullName"
                value={form.fullName}
                onChange={(e) => update("fullName", e.target.value)}
                maxLength={100}
                placeholder="Full name as on certificate"
                required
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-gradient-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:opacity-90 disabled:opacity-60"
            >
              {loading ? "Verifying..." : "Verify Now"}
            </button>
            {error && (
              <p className="text-sm text-destructive" aria-live="polite">{error}</p>
            )}
            <p className="text-xs text-muted-foreground">Try AXIS-2024-001 / Sara Ahmed for a sample successful verification.</p>
          </form>

          {result && (
            <div className={`mt-6 rounded-2xl border p-6 shadow-soft animate-fade-in ${result.status === "verified" ? "bg-success/10 border-success/30" : "bg-destructive/10 border-destructive/30"}`}>
              {result.status === "verified" ? (
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="h-8 w-8 text-success shrink-0" />
                  <div>
                    <h3 className="font-bold text-primary text-lg">Certificate Verified</h3>
                    <p className="text-sm text-muted-foreground mt-1">This certificate is authentic and issued by Axis University.</p>
                    <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                      <div><dt className="text-muted-foreground">Name</dt><dd className="font-medium">{result.name}</dd></div>
                      <div><dt className="text-muted-foreground">Program</dt><dd className="font-medium">{result.program}</dd></div>
                      <div><dt className="text-muted-foreground">Year</dt><dd className="font-medium">{result.year}</dd></div>
                    </dl>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-4">
                  <XCircle className="h-8 w-8 text-destructive shrink-0" />
                  <div>
                    <h3 className="font-bold text-primary text-lg">Not Found</h3>
                    <p className="text-sm text-muted-foreground mt-1">No certificate matches the details provided. Please check and try again, or contact our office.</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Verify;
