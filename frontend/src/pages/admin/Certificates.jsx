import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import api from "@/services/api";

const initialForm = {
  cert_id: "",
  student_id: "",
  program_id: "",
  year: "",
  issued_at: "",
  meta: "",
};

const AdminCertificates = () => {
  const [items, setItems] = useState([]);
  const [students, setStudents] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(initialForm);

  const loadCertificates = async () => {
    setLoading(true);
    setError("");

    try {
      const [certificatesResponse, studentsResponse, programsResponse] = await Promise.all([
        api.get("/admin/certificates"),
        api.get("/admin/students"),
        api.get("/admin/programs"),
      ]);

      setItems(certificatesResponse.data.data?.data ?? certificatesResponse.data.data ?? []);
      setStudents(studentsResponse.data.data?.data ?? studentsResponse.data.data ?? []);
      setPrograms(programsResponse.data.data?.data ?? programsResponse.data.data ?? []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load certificates.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCertificates();
  }, []);

  const resetForm = () => {
    setEditingId(null);
    setForm(initialForm);
  };

  const parseMeta = (value) => {
    if (!value.trim()) {
      return null;
    }

    try {
      return JSON.parse(value);
    } catch {
      throw new Error("Meta must be valid JSON.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");

    let meta;

    try {
      meta = parseMeta(form.meta);
    } catch (parseError) {
      setError(parseError.message);
      setSaving(false);
      return;
    }

    const payload = {
      cert_id: form.cert_id,
      student_id: form.student_id,
      program_id: form.program_id || null,
      year: form.year || null,
      issued_at: form.issued_at || null,
      meta,
    };

    try {
      if (editingId) {
        await api.put(`/admin/certificates/${editingId}`, payload);
      } else {
        await api.post("/admin/certificates", payload);
      }
      resetForm();
      await loadCertificates();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save certificate.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setForm({
      cert_id: item.cert_id || "",
      student_id: item.student_id ? String(item.student_id) : "",
      program_id: item.program_id ? String(item.program_id) : "",
      year: item.year || "",
      issued_at: item.issued_at ? String(item.issued_at).slice(0, 10) : "",
      meta: item.meta ? JSON.stringify(item.meta, null, 2) : "",
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this certificate?")) {
      return;
    }

    try {
      await api.delete(`/admin/certificates/${id}`);
      await loadCertificates();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete certificate.");
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="rounded-3xl border bg-card p-8 shadow-soft">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">Records</p>
          <h1 className="mt-2 text-3xl font-bold text-primary">Certificates</h1>
          <p className="mt-3 text-muted-foreground">Issue and manage certificate records for enrolled students.</p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-3xl border bg-card p-6 shadow-soft space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-foreground" htmlFor="certificate-id">Certificate ID</label>
              <input id="certificate-id" value={form.cert_id} onChange={(event) => setForm((current) => ({ ...current, cert_id: event.target.value }))} className="mt-1 w-full rounded-md border bg-background px-4 py-3 text-sm" required />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground" htmlFor="certificate-student">Student</label>
              <select id="certificate-student" value={form.student_id} onChange={(event) => setForm((current) => ({ ...current, student_id: event.target.value }))} className="mt-1 w-full rounded-md border bg-background px-4 py-3 text-sm" required>
                <option value="">Choose a student</option>
                {students.map((student) => (
                  <option key={student.id} value={student.id}>{student.first_name} {student.last_name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground" htmlFor="certificate-program">Program</label>
              <select id="certificate-program" value={form.program_id} onChange={(event) => setForm((current) => ({ ...current, program_id: event.target.value }))} className="mt-1 w-full rounded-md border bg-background px-4 py-3 text-sm">
                <option value="">Choose a program</option>
                {programs.map((program) => (
                  <option key={program.id} value={program.id}>{program.title}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground" htmlFor="certificate-year">Year</label>
              <input id="certificate-year" value={form.year} onChange={(event) => setForm((current) => ({ ...current, year: event.target.value }))} className="mt-1 w-full rounded-md border bg-background px-4 py-3 text-sm" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground" htmlFor="certificate-issued">Issued at</label>
              <input id="certificate-issued" type="date" value={form.issued_at} onChange={(event) => setForm((current) => ({ ...current, issued_at: event.target.value }))} className="mt-1 w-full rounded-md border bg-background px-4 py-3 text-sm" />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-foreground" htmlFor="certificate-meta">Meta JSON</label>
              <textarea id="certificate-meta" value={form.meta} onChange={(event) => setForm((current) => ({ ...current, meta: event.target.value }))} className="mt-1 w-full rounded-md border bg-background px-4 py-3 text-sm" rows={6} placeholder='{"field": "value"}' />
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button type="submit" disabled={saving} className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-60">
              {saving ? "Saving..." : editingId ? "Update Certificate" : "Create Certificate"}
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
          {loading && <div className="rounded-2xl border bg-card p-6 text-sm text-muted-foreground shadow-soft">Loading certificates...</div>}
          {!loading && items.length === 0 && <div className="rounded-2xl border bg-card p-6 text-sm text-muted-foreground shadow-soft">No certificates found.</div>}
          {items.map((item) => (
            <article key={item.id} className="rounded-2xl border bg-card p-6 shadow-soft space-y-4">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="text-xs uppercase tracking-[0.3em] text-accent">{item.cert_id}</div>
                  <h2 className="mt-2 text-xl font-semibold text-primary">{item.student?.first_name} {item.student?.last_name}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{item.year || "Year not set"} · {item.issued_at || "No issue date"}</p>
                </div>
                <div className="flex gap-2">
                  <button type="button" onClick={() => handleEdit(item)} className="rounded-full border px-4 py-2 text-sm font-semibold hover:bg-secondary">Edit</button>
                  <button type="button" onClick={() => handleDelete(item.id)} className="rounded-full border border-destructive/40 px-4 py-2 text-sm font-semibold text-destructive hover:bg-destructive/10">Delete</button>
                </div>
              </div>
              {item.meta && <pre className="overflow-x-auto rounded-xl bg-secondary/50 p-4 text-xs text-muted-foreground">{JSON.stringify(item.meta, null, 2)}</pre>}
            </article>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminCertificates;
