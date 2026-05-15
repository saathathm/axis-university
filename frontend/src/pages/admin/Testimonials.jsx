import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import api from "@/services/api";

const initialForm = {
  name: "",
  program: "",
  quote: "",
  approved: true,
};

const AdminTestimonials = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(initialForm);

  const loadTestimonials = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await api.get("/admin/testimonials");
      setItems(response.data.data?.data ?? response.data.data ?? []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load testimonials.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTestimonials();
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
        await api.put(`/admin/testimonials/${editingId}`, form);
      } else {
        await api.post("/admin/testimonials", form);
      }
      resetForm();
      await loadTestimonials();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save testimonial.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setForm({
      name: item.name || "",
      program: item.program || "",
      quote: item.quote || "",
      approved: Boolean(item.approved),
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this testimonial?")) {
      return;
    }

    try {
      await api.delete(`/admin/testimonials/${id}`);
      await loadTestimonials();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete testimonial.");
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="rounded-3xl border bg-card p-8 shadow-soft">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">Content</p>
          <h1 className="mt-2 text-3xl font-bold text-primary">Testimonials</h1>
          <p className="mt-3 text-muted-foreground">Moderate student testimonials shown across the public site.</p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-3xl border bg-card p-6 shadow-soft space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-foreground" htmlFor="testimonial-name">Name</label>
              <input id="testimonial-name" value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} className="mt-1 w-full rounded-md border bg-background px-4 py-3 text-sm" required />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground" htmlFor="testimonial-program">Program</label>
              <input id="testimonial-program" value={form.program} onChange={(event) => setForm((current) => ({ ...current, program: event.target.value }))} className="mt-1 w-full rounded-md border bg-background px-4 py-3 text-sm" />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-foreground" htmlFor="testimonial-quote">Quote</label>
              <textarea id="testimonial-quote" value={form.quote} onChange={(event) => setForm((current) => ({ ...current, quote: event.target.value }))} className="mt-1 w-full rounded-md border bg-background px-4 py-3 text-sm" rows={6} required />
            </div>
            <label className="flex items-center gap-3 text-sm font-medium text-foreground md:col-span-2">
              <input type="checkbox" checked={form.approved} onChange={(event) => setForm((current) => ({ ...current, approved: event.target.checked }))} />
              Approved
            </label>
          </div>

          <div className="flex flex-wrap gap-3">
            <button type="submit" disabled={saving} className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-60">
              {saving ? "Saving..." : editingId ? "Update Testimonial" : "Create Testimonial"}
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
          {loading && <div className="rounded-2xl border bg-card p-6 text-sm text-muted-foreground shadow-soft">Loading testimonials...</div>}
          {!loading && items.length === 0 && <div className="rounded-2xl border bg-card p-6 text-sm text-muted-foreground shadow-soft">No testimonials found.</div>}
          {items.map((item) => (
            <article key={item.id} className="rounded-2xl border bg-card p-6 shadow-soft space-y-4">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="text-xs uppercase tracking-[0.3em] text-accent">{item.program || "General"}</div>
                  <h2 className="mt-2 text-xl font-semibold text-primary">{item.name}</h2>
                </div>
                <div className="flex gap-2">
                  <button type="button" onClick={() => handleEdit(item)} className="rounded-full border px-4 py-2 text-sm font-semibold hover:bg-secondary">Edit</button>
                  <button type="button" onClick={() => handleDelete(item.id)} className="rounded-full border border-destructive/40 px-4 py-2 text-sm font-semibold text-destructive hover:bg-destructive/10">Delete</button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{item.quote}</p>
              <div className="text-xs text-muted-foreground">{item.approved ? "Approved" : "Pending review"}</div>
            </article>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminTestimonials;
