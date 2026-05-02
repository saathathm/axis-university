import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import PageHero from "@/components/shared/PageHero";
import { CheckCircle2, Eye, EyeOff } from "lucide-react";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Signin = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const update = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const validate = () => {
    if (form.fullName.trim().length < 2) return "Full name is required";
    if (!emailRegex.test(form.email.trim())) return "Valid email required";
    if (form.password.length < 6) return "Password must be at least 6 characters";
    if (form.password !== form.confirmPassword) return "Passwords do not match";
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
      <PageHero title="Create Account" subtitle="Join Axis University and start your academic journey." />
      <section className="py-16">
        <div className="container max-w-2xl">
          {submitted ? (
            <div className="rounded-2xl border bg-card p-10 text-center shadow-elegant">
              <CheckCircle2 className="h-16 w-16 text-success mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-primary mb-2">Account Created!</h2>
              <p className="text-muted-foreground mb-6">Welcome, {form.fullName}! Your account has been created successfully. You can now log in.</p>
              <Link
                to="/auth/login"
                className="inline-flex items-center justify-center rounded-md bg-gradient-accent px-4 py-2 text-sm font-semibold text-accent-foreground"
              >
                Go to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="rounded-2xl border bg-card p-7 md:p-9 shadow-soft space-y-5">
              <div>
                <label htmlFor="fullName" className="text-sm font-medium text-foreground">Full Name *</label>
                <input
                  id="fullName"
                  value={form.fullName}
                  onChange={(e) => update("fullName", e.target.value)}
                  maxLength={100}
                  required
                  className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="John Doe"
                />
              </div>

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
                <label htmlFor="password" className="text-sm font-medium text-foreground">Password *</label>
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

              <div>
                <label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">Confirm Password *</label>
                <div className="relative mt-1">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={form.confirmPassword}
                    onChange={(e) => update("confirmPassword", e.target.value)}
                    maxLength={100}
                    required
                    className="w-full rounded-md border border-input bg-background px-3 py-2 pr-10 text-sm"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-md bg-gradient-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:opacity-90 disabled:opacity-60"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>

              {error && (
                <p className="text-sm text-destructive" aria-live="polite">{error}</p>
              )}

              <div className="border-t border-border pt-5 text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link to="/auth/login" className="font-semibold text-accent hover:underline">
                  Sign in here
                </Link>
              </div>
            </form>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Signin;
