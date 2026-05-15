import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import api from "@/services/api";

const initialForm = {
  first_name: "",
  last_name: "",
  contact_number: "",
  street_address: "",
  town_city: "",
  country: "",
  postcode: "",
  email: "",
  program_id: "",
  status: "active",
};

const AdminStudents = () => {
  const [items, setItems] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(initialForm);

  const loadStudents = async () => {
    setLoading(true);
    setError("");

    try {
      const [studentsResponse, programsResponse] = await Promise.all([
        api.get("/admin/students"),
        api.get("/admin/programs"),
      ]);

      setItems(studentsResponse.data.data?.data ?? studentsResponse.data.data ?? []);
      setPrograms(programsResponse.data.data?.data ?? programsResponse.data.data ?? []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load students.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
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
        await api.put(`/admin/students/${editingId}`, form);
      } else {
        await api.post("/admin/students", form);
      }
      resetForm();
      await loadStudents();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save student.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setForm({
      first_name: item.first_name || "",
      last_name: item.last_name || "",
      contact_number: item.contact_number || "",
      street_address: item.street_address || "",
      town_city: item.town_city || "",
      country: item.country || "",
      postcode: item.postcode || "",
      email: item.email || "",
      program_id: item.program_id ? String(item.program_id) : "",
      status: item.status || "active",
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this student?")) {
      return;
    }

    try {
      await api.delete(`/admin/students/${id}`);
      await loadStudents();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete student.");
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="rounded-3xl border bg-card p-8 shadow-soft">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">Records</p>
          <h1 className="mt-2 text-3xl font-bold text-primary">Students</h1>
          <p className="mt-3 text-muted-foreground">Review and maintain enrolled student records.</p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-3xl border bg-card p-6 shadow-soft space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-foreground" htmlFor="student-first">First name</label>
              <input id="student-first" value={form.first_name} onChange={(event) => setForm((current) => ({ ...current, first_name: event.target.value }))} className="mt-1 w-full rounded-md border bg-background px-4 py-3 text-sm" required />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground" htmlFor="student-last">Last name</label>
              <input id="student-last" value={form.last_name} onChange={(event) => setForm((current) => ({ ...current, last_name: event.target.value }))} className="mt-1 w-full rounded-md border bg-background px-4 py-3 text-sm" required />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground" htmlFor="student-contact">Contact number</label>
              <input id="student-contact" value={form.contact_number} onChange={(event) => setForm((current) => ({ ...current, contact_number: event.target.value }))} className="mt-1 w-full rounded-md border bg-background px-4 py-3 text-sm" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground" htmlFor="student-email">Email</label>
              <input id="student-email" type="email" value={form.email} onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))} className="mt-1 w-full rounded-md border bg-background px-4 py-3 text-sm" />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-foreground" htmlFor="student-address">Street address</label>
              <input id="student-address" value={form.street_address} onChange={(event) => setForm((current) => ({ ...current, street_address: event.target.value }))} className="mt-1 w-full rounded-md border bg-background px-4 py-3 text-sm" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground" htmlFor="student-city">Town / city</label>
              <input id="student-city" value={form.town_city} onChange={(event) => setForm((current) => ({ ...current, town_city: event.target.value }))} className="mt-1 w-full rounded-md border bg-background px-4 py-3 text-sm" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground" htmlFor="student-country">Country</label>
              <input id="student-country" value={form.country} onChange={(event) => setForm((current) => ({ ...current, country: event.target.value }))} className="mt-1 w-full rounded-md border bg-background px-4 py-3 text-sm" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground" htmlFor="student-postcode">Postcode</label>
              <input id="student-postcode" value={form.postcode} onChange={(event) => setForm((current) => ({ ...current, postcode: event.target.value }))} className="mt-1 w-full rounded-md border bg-background px-4 py-3 text-sm" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground" htmlFor="student-program">Program</label>
              <select id="student-program" value={form.program_id} onChange={(event) => setForm((current) => ({ ...current, program_id: event.target.value }))} className="mt-1 w-full rounded-md border bg-background px-4 py-3 text-sm">
                <option value="">Choose a program</option>
                {programs.map((program) => (
                  <option key={program.id} value={program.id}>{program.title}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground" htmlFor="student-status">Status</label>
              <select id="student-status" value={form.status} onChange={(event) => setForm((current) => ({ ...current, status: event.target.value }))} className="mt-1 w-full rounded-md border bg-background px-4 py-3 text-sm" required>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button type="submit" disabled={saving} className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-60">
              {saving ? "Saving..." : editingId ? "Update Student" : "Create Student"}
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
          {loading && <div className="rounded-2xl border bg-card p-6 text-sm text-muted-foreground shadow-soft">Loading students...</div>}
          {!loading && items.length === 0 && <div className="rounded-2xl border bg-card p-6 text-sm text-muted-foreground shadow-soft">No students found.</div>}
          {items.map((item) => (
            <article key={item.id} className="rounded-2xl border bg-card p-6 shadow-soft space-y-4">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="text-xs uppercase tracking-[0.3em] text-accent">{item.student_number || "No student number"}</div>
                  <h2 className="mt-2 text-xl font-semibold text-primary">{item.first_name} {item.last_name}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{item.email || "No email"} · {item.status}</p>
                </div>
                <div className="flex gap-2">
                  <button type="button" onClick={() => handleEdit(item)} className="rounded-full border px-4 py-2 text-sm font-semibold hover:bg-secondary">Edit</button>
                  <button type="button" onClick={() => handleDelete(item.id)} className="rounded-full border border-destructive/40 px-4 py-2 text-sm font-semibold text-destructive hover:bg-destructive/10">Delete</button>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">Program: {item.program?.title || item.program_id || "Not assigned"}</div>
            </article>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminStudents;
