import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ShieldCheck } from "lucide-react";

import PageHero from "../../components/widgets/PageHero";
import VerificationResultModal from "../../components/widgets/VerificationResultModal";
import { verifyCertificate } from "../../features/certificate/certificateActions";
import {
  clearCertificateError,
  clearVerifiedCertificate,
} from "../../features/certificate/certificateSlice";

const initialFormState = {
  certificateNumber: "",
};

const Verify = () => {
  const dispatch = useDispatch();

  const { loading, verifiedCertificate, error } = useSelector(
    (state) => state.certificateState,
  );

  const [form, setForm] = useState(initialFormState);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (verifiedCertificate) {
      setResult({
        status: "verified",
        data: verifiedCertificate,
      });

      dispatch(clearVerifiedCertificate());
    }
  }, [dispatch, verifiedCertificate]);

  useEffect(() => {
    if (error) {
      setResult({
        status: "validation_error",
        message: error,
      });

      dispatch(clearCertificateError());
    }
  }, [dispatch, error]);

  const updateField = (fieldName, value) => {
    setForm((prevForm) => ({
      ...prevForm,
      [fieldName]: value,
    }));

    if (result) {
      setResult(null);
    }
  };

  const validateForm = () => {
    if (form.certificateNumber.trim().length < 4) {
      return "Certificate number is required";
    }

    return "";
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationMessage = validateForm();

    if (validationMessage) {
      setResult({
        status: "validation_error",
        message: validationMessage,
      });
      return;
    }

    setResult(null);

    dispatch(verifyCertificate(form.certificateNumber.trim()));
  };

  const closeResultModal = () => {
    setResult(null);
  };

  return (
    <>
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
                  Enter your certificate number to verify authenticity.
                </p>
              </div>
            </div>

            <div>
              <label
                htmlFor="certificateNumber"
                className="text-sm font-medium text-foreground"
              >
                Certificate Number *
              </label>

              <input
                id="certificateNumber"
                value={form.certificateNumber}
                onChange={(event) =>
                  updateField("certificateNumber", event.target.value)
                }
                maxLength={60}
                placeholder="e.g. CERT-2026-00001"
                required
                disabled={loading}
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm disabled:opacity-60"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-gradient-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:opacity-90 disabled:opacity-60"
            >
              {loading ? "Verifying..." : "Verify Now"}
            </button>

            <p className="text-xs text-muted-foreground">
              Enter the certificate number exactly as shown on the certificate.
            </p>
          </form>
        </div>
      </section>

      <VerificationResultModal
        result={result}
        isOpen={Boolean(result)}
        onClose={closeResultModal}
      />
    </>
  );
};

export default Verify;
