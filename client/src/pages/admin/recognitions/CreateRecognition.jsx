import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Award, Save } from "lucide-react";

import {
  createRecognition,
  updateRecognition,
} from "../../../features/recognition/recognitionActions";
import { BASE_URL } from "../../../utils/constants";

const CreateRecognition = ({ recognition = null, isEdit = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [preview, setPreview] = useState("");

  const [formData, setFormData] = useState({
    title: recognition?.title || "",
    organizationName: recognition?.organization_name || "",
    description: recognition?.description || "",
    issueDate: recognition?.issue_date ? String(recognition.issue_date).split("T")[0] : "",
    photo: null,
    status: recognition?.status ?? true,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (recognition) {
      setFormData({
        title: recognition.title || "",
        organizationName: recognition.organization_name || "",
        description: recognition.description || "",
        issueDate: recognition.issue_date ? String(recognition.issue_date).split("T")[0] : "",
        photo: null,
        status: recognition.status ?? true,
      });

      if (recognition.photo) {
        setPreview(`${BASE_URL}/storage/${recognition.photo}`);
      }
    }
  }, [recognition]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    setFormData((current) => ({
      ...current,
      photo: file,
    }));

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");

      const payload = {
        title: formData.title,
        organizationName: formData.organizationName,
        description: formData.description,
        issueDate: formData.issueDate || null,
        status: formData.status ? 1 : 0,
        photo: formData.photo,
      };

      if (isEdit) {
        await dispatch(updateRecognition(recognition.id, payload));
      } else {
        await dispatch(createRecognition(payload));
      }

      navigate("/admin/recognitions");
    } catch (err) {
      setError(err || `Failed to ${isEdit ? "update" : "create"} recognition`);
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
              Recognitions
            </p>

            <h1 className="mt-2 text-2xl font-bold text-primary md:text-3xl">
              {isEdit ? "Edit Recognition" : "Create Recognition"}
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              {isEdit
                ? "Update recognition information."
                : "Add a new recognition to the university portal system."}
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/admin/recognitions")}
            className="inline-flex items-center gap-2 rounded-2xl border bg-background px-5 py-3 text-sm font-semibold transition-smooth hover:bg-secondary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
        </div>
      </section>

      <form onSubmit={handleSubmit} className="rounded-3xl border bg-card p-6 shadow-soft">
        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-accent-soft text-accent">
            <Award className="h-8 w-8" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-primary">Recognition Information</h2>
            <p className="text-sm text-muted-foreground">Fill all required recognition details.</p>
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        )}

        <div className="grid gap-5 md:grid-cols-2">
          <FormInput label="Title" name="title" value={formData.title} onChange={handleChange} required />
          <FormInput label="Organization Name" name="organizationName" value={formData.organizationName} onChange={handleChange} />
          <FormInput label="Issue Date" type="date" name="issueDate" value={formData.issueDate} onChange={handleChange} />
          <FormSelect
            label="Status"
            name="status"
            value={String(formData.status)}
            onChange={(event) =>
              setFormData((current) => ({ ...current, status: event.target.value === "true" }))
            }
            options={[
              { label: "Active", value: "true" },
              { label: "Inactive", value: "false" },
            ]}
          />
        </div>

        <div className="mt-5">
          <FormTextarea label="Description" name="description" value={formData.description} onChange={handleChange} rows={6} />
        </div>

        <div className="mt-5">
          <FormFileInput label="Photo" name="photo" accept="image/*" onChange={handleFileChange} />
        </div>

        {preview && (
          <div className="mt-5">
            <img src={preview} alt="Preview" className="h-52 w-full rounded-3xl border object-contain bg-background" />
          </div>
        )}

        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-soft transition-smooth hover:scale-[1.02] disabled:opacity-60"
          >
            <Save className="h-4 w-4" />
            {loading ? (isEdit ? "Updating..." : "Creating...") : isEdit ? "Update Recognition" : "Create Recognition"}
          </button>
        </div>
      </form>
    </div>
  );
};

const FormInput = ({ label, type = "text", ...props }) => (
  <div>
    <label className="mb-2 block text-sm font-semibold text-primary">{label}</label>
    <input type={type} {...props} className="w-full rounded-2xl border bg-background px-4 py-3 text-sm outline-none transition-smooth focus:border-accent" />
  </div>
);

const FormTextarea = ({ label, rows = 4, ...props }) => (
  <div>
    <label className="mb-2 block text-sm font-semibold text-primary">{label}</label>
    <textarea rows={rows} {...props} className="w-full rounded-2xl border bg-background px-4 py-3 text-sm outline-none transition-smooth focus:border-accent" />
  </div>
);

const FormSelect = ({ label, options, ...props }) => (
  <div>
    <label className="mb-2 block text-sm font-semibold text-primary">{label}</label>
    <select {...props} className="w-full rounded-2xl border bg-background px-4 py-3 text-sm outline-none transition-smooth focus:border-accent">
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

const FormFileInput = ({ label, ...props }) => (
  <div>
    <label className="mb-2 block text-sm font-semibold text-primary">{label}</label>
    <input type="file" {...props} className="w-full rounded-2xl border bg-background px-4 py-3 text-sm file:mr-4 file:rounded-xl file:border-0 file:bg-accent-soft file:px-4 file:py-2 file:text-sm file:font-semibold file:text-accent" />
  </div>
);

export default CreateRecognition;