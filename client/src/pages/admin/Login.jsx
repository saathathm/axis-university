import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { loginAdmin } from "@/actions/authAction";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.accessToken);
  const [form, setForm] = useState({ email: "admin@axisuniversity.edu", password: "Password123!" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (token) {
    return <Navigate to="/admin" replace />;
  }

  const submit = (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    dispatch(loginAdmin(form))
      .then(() => navigate("/admin", { replace: true }))
      .catch((message) => setError(message))
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center p-6">
      <form onSubmit={submit} className="w-full max-w-md rounded-3xl border bg-card p-8 shadow-elegant space-y-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">Admin Access</p>
          <h1 className="mt-2 text-3xl font-bold text-primary">Sign in</h1>
          <p className="mt-2 text-sm text-muted-foreground">Use the seeded admin account to access the panel.</p>
        </div>
        <label className="block text-sm font-medium">
          Email
          <input
            type="email"
            value={form.email}
            onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
            className="mt-1 w-full rounded-md border bg-background px-4 py-3 text-sm"
          />
        </label>
        <label className="block text-sm font-medium">
          Password
          <input
            type="password"
            value={form.password}
            onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
            className="mt-1 w-full rounded-md border bg-background px-4 py-3 text-sm"
          />
        </label>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-gradient-accent px-5 py-3 text-sm font-semibold text-accent-foreground disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;