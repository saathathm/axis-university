import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

import { login } from "../../features/auth/authActions";
import { clearAuthError } from "../../features/auth/authSlice";

const initialFormState = {
  email: "admin@example.com",
  password: "password123",
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, isAuthenticated, error } = useSelector(
    (state) => state.authState,
  );

  const [form, setForm] = useState(initialFormState);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const updateField = (fieldName, value) => {
    setForm((current) => ({
      ...current,
      [fieldName]: value,
    }));

    if (formError) {
      setFormError("");
    }

    if (error) {
      dispatch(clearAuthError());
    }
  };

  const validateForm = () => {
    if (!form.email.trim()) {
      return "Email is required";
    }

    if (!form.password.trim()) {
      return "Password is required";
    }

    return "";
  };

  const submit = (event) => {
    event.preventDefault();

    const validationMessage = validateForm();

    if (validationMessage) {
      setFormError(validationMessage);
      return;
    }

    dispatch(login(form.email.trim(), form.password));
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-primary p-6">
      <form
        onSubmit={submit}
        className="w-full max-w-md space-y-5 rounded-3xl border bg-card p-8 shadow-elegant"
      >
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
            Admin Access
          </p>

          <h1 className="mt-2 text-3xl font-bold text-primary">Sign in</h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Use your admin account to access the panel.
          </p>
        </div>

        <label className="block text-sm font-medium text-foreground">
          Email
          <input
            type="email"
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
            disabled={loading}
            className="mt-1 w-full rounded-md border bg-background px-4 py-3 text-sm disabled:opacity-60"
          />
        </label>

        <label className="block text-sm font-medium text-foreground">
          Password
          <input
            type="password"
            value={form.password}
            onChange={(event) => updateField("password", event.target.value)}
            disabled={loading}
            className="mt-1 w-full rounded-md border bg-background px-4 py-3 text-sm disabled:opacity-60"
          />
        </label>

        {(formError || error) && (
          <p className="text-sm text-destructive">{formError || error}</p>
        )}

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