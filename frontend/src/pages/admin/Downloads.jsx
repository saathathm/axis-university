import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import api from "@/services/api";

const initialForm = {
  category: "",
  title: "",
  file: null,
  published: true,
};

const AdminDownloads = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(initialForm);

  const loadDownloads = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await api.get("/admin/downloads");
      setItems(response.data.data?.data ?? response.data.data ?? []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load downloads.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDownloads();
  }, []);

  const resetForm = () => {
    setEditingId(null);
    setForm(initialForm);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      const payload = new FormData();
      payload.append("category", form.category);
      payload.append("title", form.title);
      payload.append("published", form.published ? "1" : "0");

      if (form.file) {
        payload.append("file", form.file);
      }

      if (editingId) {
        payload.append("_method", "PUT");
        await api.post(`/admin/downloads/${editingId}`, payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await api.post("/admin/downloads", payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      resetForm();
      await loadDownloads();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save download.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setForm({
      category: item.category || "",
      title: item.title || "",
      file: null,
      published: Boolean(item.published),
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this download item?")) {
      return;
    }

    try {
      await api.delete(`/admin/downloads/${id}`);
      await loadDownloads();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete download.");
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="rounded-3xl border bg-card p-8 shadow-soft">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">Content</p>
          <h1 className="mt-2 text-3xl font-bold text-primary">Downloads</h1>
          <p className="mt-3 text-muted-foreground">Upload files and publish resources for students and applicants.</p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-3xl border bg-card p-6 shadow-soft space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-foreground" htmlFor="download-category">Category</label>
              <input
                id="download-category"
                value={form.category}
                onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))}
                className="mt-1 w-full rounded-md border bg-background px-4 py-3 text-sm"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground" htmlFor="download-title">Title</label>
              <input
                id="download-title"
                value={form.title}
                onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
                className="mt-1 w-full rounded-md border bg-background px-4 py-3 text-sm"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-foreground" htmlFor="download-file">File</label>
              <input
                id="download-file"
                type="file"
                onChange={(event) => setForm((current) => ({ ...current, file: event.target.files?.[0] || null }))}
                className="mt-1 w-full rounded-md border bg-background px-4 py-3 text-sm"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              />
            </div>
            <label className="flex items-center gap-3 text-sm font-medium text-foreground md:col-span-2">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(event) => setForm((current) => ({ ...current, published: event.target.checked }))}
              />
              Published
            </label>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={saving}
              className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-60"
            >
              {saving ? "Saving..." : editingId ? "Update Download" : "Create Download"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-full border px-5 py-2 text-sm font-semibold text-foreground hover:bg-secondary"
              >
                Cancel edit
              </button>
            )}
          </div>
        </form>

        {error && <div className="rounded-2xl border bg-card p-4 text-sm text-destructive shadow-soft">{error}</div>}

        <div className="space-y-4">
          {loading && <div className="rounded-2xl border bg-card p-6 text-sm text-muted-foreground shadow-soft">Loading downloads...</div>}
          {!loading && items.length === 0 && <div className="rounded-2xl border bg-card p-6 text-sm text-muted-foreground shadow-soft">No downloads found.</div>}
          {items.map((item) => (
            <article key={item.id} className="rounded-2xl border bg-card p-6 shadow-soft space-y-4">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="text-xs uppercase tracking-[0.3em] text-accent">{item.category}</div>
                  <h2 className="mt-2 text-xl font-semibold text-primary">{item.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{item.size || "File uploaded"}</p>
                </div>
                <div className="flex gap-2">
                  <button type="button" onClick={() => handleEdit(item)} className="rounded-full border px-4 py-2 text-sm font-semibold hover:bg-secondary">Edit</button>
                  <button type="button" onClick={() => handleDelete(item.id)} className="rounded-full border border-destructive/40 px-4 py-2 text-sm font-semibold text-destructive hover:bg-destructive/10">Delete</button>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                Status: {item.published ? "Published" : "Draft"}
              </div>
              {item.path && <div className="break-all text-xs text-muted-foreground">Stored path: {item.path}</div>}
            </article>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDownloads;
