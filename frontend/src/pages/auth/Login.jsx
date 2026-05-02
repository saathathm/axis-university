import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import PageHero from "@/components/shared/PageHero";
import { CheckCircle2, Eye, EyeOff } from "lucide-react";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const update = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const validate = () => {
    if (!emailRegex.test(form.email.trim())) return "Valid email required";
    if (form.password.length < 6) return "Password must be at least 6 characters";
    return "";
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const message = validate();
    if (message) {
      setError(message);
      return;
    }
    setLoading(true);
    setError("");
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 700);
  };

  return (
    <Layout>
      <PageHero title="Welcome Back" subtitle="Log in to your Axis University student account." />
      <section className="py-16">
        <div className="container max-w-2xl">
          {submitted ? (
            <div className="rounded-2xl border bg-card p-10 text-center shadow-elegant">
              <CheckCircle2 className="h-16 w-16 text-success mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-primary mb-2">Login Successful!</h2>
              <p className="text-muted-foreground mb-6">Welcome back! You are now logged in to your account.</p>
              <Link
                to="/"
                className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-semibold text-foreground hover:bg-secondary"
              >
                Go to Home
              </Link>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="rounded-2xl border bg-card p-7 md:p-9 shadow-soft space-y-5">
              <div>
                <label htmlFor="email" className="text-sm font-medium text-foreground">Email Address *</label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  maxLength={255}
                  required
                  className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-medium text-foreground">Password *</label>
                  <Link to="/contact" className="text-xs text-accent hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative mt-1">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={(e) => update("password", e.target.value)}
                    maxLength={100}
                    required
                    className="w-full rounded-md border border-input bg-background px-3 py-2 pr-10 text-sm"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  id="rememberMe"
                  type="checkbox"
                  checked={form.rememberMe}
                  onChange={(e) => update("rememberMe", e.target.checked)}
                  className="h-4 w-4 rounded accent-primary"
                />
                <label htmlFor="rememberMe" className="text-sm text-muted-foreground cursor-pointer">
                  Remember me for 30 days
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-md bg-gradient-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:opacity-90 disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>

              {error && (
                <p className="text-sm text-destructive" aria-live="polite">{error}</p>
              )}

              <div className="border-t border-border pt-5 text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/auth/signin" className="font-semibold text-accent hover:underline">
                  Create one here
                </Link>
              </div>
            </form>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Login;
