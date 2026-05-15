import { useEffect, useMemo, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import api from "@/services/api";

const initialForm = {
  faculty_id: "",
  code: "",
  title: "",
  level: "",
  duration: "",
  overview: "",
  description: "",
  curriculum: "",
  requirements: "",
  intake: "",
};

const toLines = (value) =>
  value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

const fromLines = (value) => (Array.isArray(value) ? value.join("\n") : "");

const AdminPrograms = () => {
  const [items, setItems] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(initialForm);

  const facultyMap = useMemo(() => new Map(faculties.map((faculty) => [String(faculty.id), faculty.name])), [faculties]);

  const loadPrograms = async () => {
    setLoading(true);
    setError("");

    try {
      const [programsResponse, facultiesResponse] = await Promise.all([
        api.get("/admin/programs"),
        api.get("/admin/faculties"),
      ]);

      setItems(programsResponse.data.data?.data ?? programsResponse.data.data ?? []);
      setFaculties(facultiesResponse.data.data?.data ?? facultiesResponse.data.data ?? []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load programs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPrograms();
  }, []);

  const resetForm = () => {
    setEditingId(null);
    setForm(initialForm);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      faculty_id: form.faculty_id,
      code: form.code,
      title: form.title,
      level: form.level,
      duration: form.duration,
      overview: form.overview,
      description: form.description,
      curriculum: toLines(form.curriculum),
      requirements: toLines(form.requirements),
      intake: form.intake ? Number(form.intake) : null,
    };

    try {
      if (editingId) {
        await api.put(`/admin/programs/${editingId}`, payload);
      } else {
        await api.post("/admin/programs", payload);
      }
      resetForm();
      await loadPrograms();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save program.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setForm({
      faculty_id: String(item.faculty_id || ""),
      code: item.code || "",
      title: item.title || "",
      level: item.level || "",
      duration: item.duration || "",
      overview: item.overview || "",
      description: item.description || "",
      curriculum: fromLines(item.curriculum),
      requirements: fromLines(item.requirements),
      intake: item.intake ?? "",
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this program?")) {
      return;
    }

    try {
      await api.delete(`/admin/programs/${id}`);
      await loadPrograms();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete program.");
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="rounded-3xl border bg-card p-8 shadow-soft">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">Content</p>
          <h1 className="mt-2 text-3xl font-bold text-primary">Programs</h1>
          <p className="mt-3 text-muted-foreground">Create and manage academic programs linked to faculties.</p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-3xl border bg-card p-6 shadow-soft space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-foreground" htmlFor="program-faculty">Faculty</label>
              <select id="program-faculty" value={form.faculty_id} onChange={(event) => setForm((current) => ({ ...current, faculty_id: event.target.value }))} className="mt-1 w-full rounded-md border bg-background px-4 py-3 text-sm" required>
                <option value="">Choose a faculty</option>
                {faculties.map((faculty) => (
                  <option key={faculty.id} value={faculty.id}>{faculty.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground" htmlFor="program-code">Code</label>
              <input id="program-code" value={form.code} onChange={(event) => setForm((current) => ({ ...current, code: event.target.value }))} className="mt-1 w-full rounded-md border bg-background px-4 py-3 text-sm" />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-foreground" htmlFor="program-title">Title</label>
              <input id="program-title" value={form.title} onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))} className="mt-1 w-full rounded-md border bg-background px-4 py-3 text-sm" required />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground" htmlFor="program-level">Level</label>
              <input id="program-level" value={form.level} onChange={(event) => setForm((current) => ({ ...current, level: event.target.value }))} className="mt-1 w-full rounded-md border bg-background px-4 py-3 text-sm" required />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground" htmlFor="program-duration">Duration</label>
              <input id="program-duration" value={form.duration} onChange={(event) => setForm((current) => ({ ...current, duration: event.target.value }))} className="mt-1 w-full rounded-md border bg-background px-4 py-3 text-sm" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground" htmlFor="program-intake">Intake</label>
              <input id="program-intake" type="number" min="0" value={form.intake} onChange={(event) => setForm((current) => ({ ...current, intake: event.target.value }))} className="mt-1 w-full rounded-md border bg-background px-4 py-3 text-sm" />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-foreground" htmlFor="program-overview">Overview</label>
              <textarea id="program-overview" value={form.overview} onChange={(event) => setForm((current) => ({ ...current, overview: event.target.value }))} className="mt-1 w-full rounded-md border bg-background px-4 py-3 text-sm" rows={3} />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-foreground" htmlFor="program-description">Description</label>
              <textarea id="program-description" value={form.description} onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))} className="mt-1 w-full rounded-md border bg-background px-4 py-3 text-sm" rows={5} />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-foreground" htmlFor="program-curriculum">Curriculum lines</label>
              <textarea id="program-curriculum" value={form.curriculum} onChange={(event) => setForm((current) => ({ ...current, curriculum: event.target.value }))} className="mt-1 w-full rounded-md border bg-background px-4 py-3 text-sm" rows={4} placeholder="One item per line" />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-foreground" htmlFor="program-requirements">Requirements lines</label>
              <textarea id="program-requirements" value={form.requirements} onChange={(event) => setForm((current) => ({ ...current, requirements: event.target.value }))} className="mt-1 w-full rounded-md border bg-background px-4 py-3 text-sm" rows={4} placeholder="One item per line" />
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button type="submit" disabled={saving} className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-60">
              {saving ? "Saving..." : editingId ? "Update Program" : "Create Program"}
            </button>
            {editingId && (
              <button type="button" onClick={resetForm} className="rounded-full border px-5 py-2 text-sm font-semibold text-foreground hover:bg-secondary">
                Cancel edit
              </button>
            )}
          </div>
        </form>

        {error && <div className="rounded-2xl border bg-card p-4 text-sm text-destructive shadow-soft">{error}</div>}

        <div className="space-y-4">
          {loading && <div className="rounded-2xl border bg-card p-6 text-sm text-muted-foreground shadow-soft">Loading programs...</div>}
          {!loading && items.length === 0 && <div className="rounded-2xl border bg-card p-6 text-sm text-muted-foreground shadow-soft">No programs found.</div>}
          {items.map((item) => (
            <article key={item.id} className="rounded-2xl border bg-card p-6 shadow-soft space-y-4">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="text-xs uppercase tracking-[0.3em] text-accent">{facultyMap.get(String(item.faculty_id)) || item.faculty?.name || "Unknown faculty"}</div>
                  <h2 className="mt-2 text-xl font-semibold text-primary">{item.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{item.code || "No code"} · {item.level} · {item.duration || "Duration not set"}</p>
                </div>
                <div className="flex gap-2">
                  <button type="button" onClick={() => handleEdit(item)} className="rounded-full border px-4 py-2 text-sm font-semibold hover:bg-secondary">Edit</button>
                  <button type="button" onClick={() => handleDelete(item.id)} className="rounded-full border border-destructive/40 px-4 py-2 text-sm font-semibold text-destructive hover:bg-destructive/10">Delete</button>
                </div>
              </div>
              {item.overview && <p className="text-sm text-muted-foreground">{item.overview}</p>}
            </article>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminPrograms;
