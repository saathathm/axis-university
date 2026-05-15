import { useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "@/components/layout/Layout";
import PageHero from "@/components/shared/PageHero";
import VerificationResultModal from "@/components/shared/VerificationResultModal";
import { ShieldCheck } from "lucide-react";
import { verifyCertificate } from "@/store/slices/applicationSlice.js";

// Mock verified records (frontend only)
const records = [
  { certId: "AXIS-2024-001", fullName: "Sara Ahmed", program: "BBA Marketing", year: "2024" },
  { certId: "AXIS-2023-188", fullName: "Omar Hassan", program: "MSc Data Science", year: "2023" },
];

const Verify = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ certId: "", fullName: "" });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
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
      setResult({ status: "validation_error", message });
      return;
    }
    setLoading(true);
    setResult(null);
    dispatch(verifyCertificate({ cert_id: form.certId, full_name: form.fullName }))
      .unwrap()
      .then((payload) => {
        setResult(payload.status === "verified" ? { status: "verified", data: payload.data } : { status: "not_found" });
      })
      .catch(() => {
        const found = records.find(
          (rec) => rec.certId.toLowerCase() === form.certId.toLowerCase() &&
                   rec.fullName.toLowerCase() === form.fullName.toLowerCase()
        );
        setResult(found ? { status: "verified", program: found.program, year: found.year, name: found.fullName } : { status: "not_found" });
      })
      .finally(() => setLoading(false));
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
            <p className="text-xs text-muted-foreground">Try AXIS-2024-001 / Sara Ahmed for a sample successful verification.</p>
          </form>
        </div>
      </section>

      <VerificationResultModal
        result={result}
        isOpen={Boolean(result)}
        onClose={() => setResult(null)}
      />
    </Layout>
  );
};

export default Verify;
