import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import api from "@/utils/axiosInstance";

const today = () => new Date().toISOString().slice(0, 10);

const initialForm = {
  title: "",
  excerpt: "",
  body: "",
  date: today(),
};

const AdminNews = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(initialForm);

  const loadNews = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await api.get("/admin/news");
      setItems(response.data.data?.data ?? response.data.data ?? []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load news items.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNews();
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
      if (editingId) {
        await api.put(`/admin/news/${editingId}`, form);
      } else {
        await api.post("/admin/news", form);
      }
      resetForm();
      await loadNews();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save news item.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setForm({
      title: item.title || "",
      excerpt: item.excerpt || "",
      body: item.body || "",
      date: item.date ? String(item.date).slice(0, 10) : today(),
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this news item?")) {
      return;
    }

    try {
      await api.delete(`/admin/news/${id}`);
      await loadNews();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete news item.");
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="rounded-3xl border bg-card p-8 shadow-soft">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">Content</p>
          <h1 className="mt-2 text-3xl font-bold text-primary">News</h1>
          <p className="mt-3 text-muted-foreground">Publish and maintain news posts for the public site.</p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-3xl border bg-card p-6 shadow-soft space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-foreground" htmlFor="news-title">Title</label>
              <input
                id="news-title"
                value={form.title}
                onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
                className="mt-1 w-full rounded-md border bg-background px-4 py-3 text-sm"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground" htmlFor="news-date">Date</label>
              <input
                id="news-date"
                type="date"
                value={form.date}
                onChange={(event) => setForm((current) => ({ ...current, date: event.target.value }))}
                className="mt-1 w-full rounded-md border bg-background px-4 py-3 text-sm"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-foreground" htmlFor="news-excerpt">Excerpt</label>
              <textarea
                id="news-excerpt"
                value={form.excerpt}
                onChange={(event) => setForm((current) => ({ ...current, excerpt: event.target.value }))}
                className="mt-1 w-full rounded-md border bg-background px-4 py-3 text-sm"
                rows={3}
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-foreground" htmlFor="news-body">Body</label>
              <textarea
                id="news-body"
                value={form.body}
                onChange={(event) => setForm((current) => ({ ...current, body: event.target.value }))}
                className="mt-1 w-full rounded-md border bg-background px-4 py-3 text-sm"
                rows={8}
                required
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={saving}
              className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-60"
            >
              {saving ? "Saving..." : editingId ? "Update News" : "Create News"}
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
          {loading && <div className="rounded-2xl border bg-card p-6 text-sm text-muted-foreground shadow-soft">Loading news...</div>}
          {!loading && items.length === 0 && <div className="rounded-2xl border bg-card p-6 text-sm text-muted-foreground shadow-soft">No news items found.</div>}
          {items.map((item) => (
            <article key={item.id} className="rounded-2xl border bg-card p-6 shadow-soft space-y-4">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="text-xs uppercase tracking-[0.3em] text-accent">{item.date}</div>
                  <h2 className="mt-2 text-xl font-semibold text-primary">{item.title}</h2>
                </div>
                <div className="flex gap-2">
                  <button type="button" onClick={() => handleEdit(item)} className="rounded-full border px-4 py-2 text-sm font-semibold hover:bg-secondary">Edit</button>
                  <button type="button" onClick={() => handleDelete(item.id)} className="rounded-full border border-destructive/40 px-4 py-2 text-sm font-semibold text-destructive hover:bg-destructive/10">Delete</button>
                </div>
              </div>
              {item.excerpt && <p className="text-sm text-muted-foreground">{item.excerpt}</p>}
              <p className="whitespace-pre-line text-sm text-foreground/90">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminNews;
