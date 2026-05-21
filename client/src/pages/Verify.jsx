import { useState } from "react";
import { useDispatch } from "react-redux";
import { ShieldCheck } from "lucide-react";

import Layout from "@/components/layout/Layout";
import PageHero from "@/components/widgets/PageHero";
import VerificationResultModal from "@/components/widgets/VerificationResultModal";
import { verifyCertificate } from "@/actions/applicationAction";

const initialFormState = {
  certId: "",
  fullName: "",
};

const Verify = () => {
  const dispatch = useDispatch();

  const [form, setForm] = useState(initialFormState);
  const [isVerifying, setIsVerifying] = useState(false);
  const [result, setResult] = useState(null);

  const updateField = (fieldName, value) => {
    setForm((prevForm) => ({
      ...prevForm,
      [fieldName]: value,
    }));
  };

  const validateForm = () => {
    if (form.certId.trim().length < 4) {
      return "Certificate ID is required";
    }

    if (form.fullName.trim().length < 2) {
      return "Name is required";
    }

    return "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationMessage = validateForm();

    if (validationMessage) {
      setResult({
        status: "validation_error",
        message: validationMessage,
      });
      return;
    }

    try {
      setIsVerifying(true);
      setResult(null);

      const payload = await dispatch(
        verifyCertificate({
          cert_id: form.certId,
          full_name: form.fullName,
        })
      );

      if (payload.status === "verified") {
        setResult({
          status: "verified",
          ...payload.data,
        });
        return;
      }

      setResult({
        status: "not_found",
      });
    } catch (error) {
      setResult({
        status: "validation_error",
        message: error || "Unable to verify certificate.",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const closeResultModal = () => {
    setResult(null);
  };

  return (
    <Layout>
      <PageHero
        title="Certificate Verification"
        subtitle="Confirm the authenticity of any Axis University certificate."
      />

      <section className="py-16">
        <div className="container max-w-xl">
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border bg-card p-7 shadow-soft space-y-5 md:p-9"
          >
            <div className="mb-2 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-accent">
                <ShieldCheck className="h-6 w-6 text-accent-foreground" />
              </div>

              <div>
                <h2 className="text-lg font-bold text-primary">
                  Verify a Certificate
                </h2>

                <p className="text-sm text-muted-foreground">
                  Enter the certificate ID and student's full name.
                </p>
              </div>
            </div>

            <div>
              <label
                htmlFor="certId"
                className="text-sm font-medium text-foreground"
              >
                Certificate ID *
              </label>

              <input
                id="certId"
                value={form.certId}
                onChange={(event) =>
                  updateField("certId", event.target.value)
                }
                maxLength={40}
                placeholder="e.g. AXIS-2024-001"
                required
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="fullName"
                className="text-sm font-medium text-foreground"
              >
                Full Name *
              </label>

              <input
                id="fullName"
                value={form.fullName}
                onChange={(event) =>
                  updateField("fullName", event.target.value)
                }
                maxLength={100}
                placeholder="Full name as on certificate"
                required
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={isVerifying}
              className="w-full rounded-md bg-gradient-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:opacity-90 disabled:opacity-60"
            >
              {isVerifying ? "Verifying..." : "Verify Now"}
            </button>

            <p className="text-xs text-muted-foreground">
              Try AXIS-2024-002 / Caral Davis for a sample successful
              verification.
            </p>
          </form>
        </div>
      </section>

      <VerificationResultModal
        result={result}
        isOpen={Boolean(result)}
        onClose={closeResultModal}
      />
    </Layout>
  );
};

export default Verify;