import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeft, Award, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  createCertificate,
  updateCertificate,
} from "../../../features/certificate/certificateActions";

import { getEnrollments } from "../../../features/enrollment/enrollmentActions";

const CreateCertificate = ({ certificate = null, isEdit = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { enrollments = [] } = useSelector((state) => state.enrollmentState);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    enrollmentId: certificate?.enrollment_id || "",

    issueDate: certificate?.issue_date || "",

    expiryDate: certificate?.expiry_date || "",

    grade: certificate?.grade || "",

    status: certificate?.status || "valid",
  });

  useEffect(() => {
    dispatch(getEnrollments());
  }, [dispatch]);

  useEffect(() => {
    if (certificate) {
      setFormData({
        enrollmentId: certificate.enrollment_id || "",

        issueDate: certificate.issue_date || "",

        expiryDate: certificate.expiry_date || "",

        grade: certificate.grade || "",

        status: certificate.status || "valid",
      });
    }
  }, [certificate]);

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

      if (isEdit) {
        await dispatch(updateCertificate(certificate.id, formData));
      } else {
        await dispatch(createCertificate(formData));
      }

      navigate("/admin/certificates");
    } catch (err) {
      setError(err || `Failed to ${isEdit ? "update" : "create"} certificate`);
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
              Certificates
            </p>

            <h1 className="mt-2 text-2xl font-bold text-primary md:text-3xl">
              {isEdit ? "Edit Certificate" : "Issue Certificate"}
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Manage and issue academic certificates.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/admin/certificates")}
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
            <Award className="h-8 w-8" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-primary">
              Certificate Information
            </h2>

            <p className="text-sm text-muted-foreground">
              Fill all required certificate details.
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
            label="Enrollment"
            name="enrollmentId"
            value={formData.enrollmentId}
            onChange={handleChange}
            required
            options={enrollments.map((enrollment) => ({
              label: `${enrollment.student?.first_name} ${enrollment.student?.last_name} - ${enrollment.course?.name}`,
              value: enrollment.id,
            }))}
          />

          <FormSelect
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            options={[
              {
                label: "Valid",
                value: "valid",
              },
              {
                label: "Revoked",
                value: "revoked",
              },
              {
                label: "Expired",
                value: "expired",
              },
            ]}
          />
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <FormInput
            label="Issue Date"
            type="date"
            name="issueDate"
            value={formData.issueDate}
            onChange={handleChange}
            required
          />

          <FormInput
            label="Expiry Date"
            type="date"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
          />
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <FormInput
            label="Grade"
            name="grade"
            value={formData.grade}
            onChange={handleChange}
            placeholder="A+"
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
                : "Issuing..."
              : isEdit
                ? "Update Certificate"
                : "Issue Certificate"}
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

export default CreateCertificate;
