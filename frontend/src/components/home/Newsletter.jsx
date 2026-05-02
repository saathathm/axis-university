import { useState } from "react";
import { Mail } from "lucide-react";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!emailRegex.test(trimmed)) {
      setStatus({ type: "error", message: "Please enter a valid email address." });
      return;
    }
    setLoading(true);
    setStatus(null);
    setTimeout(() => {
      setLoading(false);
      setEmail("");
      setStatus({ type: "success", message: "Thanks for joining our newsletter." });
    }, 600);
  };

  return (
    <section className="py-20">
      <div className="container">
        <div className="rounded-3xl bg-gradient-primary text-primary-foreground p-10 md:p-14 text-center shadow-elegant relative overflow-hidden">
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-accent/30 blur-3xl" aria-hidden="true" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-primary-glow/40 blur-3xl" aria-hidden="true" />
          <div className="relative max-w-2xl mx-auto">
            <Mail className="mx-auto h-10 w-10 text-accent mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Stay in the Loop</h2>
            <p className="text-primary-foreground/85 mb-8">Subscribe to our newsletter for the latest news, events, and admission updates.</p>
            <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                maxLength={255}
                className="flex-1 rounded-md border border-input bg-background px-4 py-2 text-sm text-foreground"
                aria-label="Email address"
              />
              <button
                type="submit"
                disabled={loading}
                className="rounded-md bg-accent px-5 py-2 text-sm font-semibold text-accent-foreground hover:opacity-90 disabled:opacity-60"
              >
                {loading ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
            {status && (
              <p
                className={`mt-4 text-sm ${status.type === "error" ? "text-destructive" : "text-accent-foreground"}`}
                aria-live="polite"
              >
                {status.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
