import { useState } from "react";
import Layout from "@/components/layout/Layout";
import PageHero from "@/components/shared/PageHero";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const update = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const validate = () => {
    if (form.name.trim().length < 2) return "Name required";
    if (!emailRegex.test(form.email.trim())) return "Valid email required";
    if (form.subject.trim().length < 2) return "Subject required";
    if (form.message.trim().length < 5) return "Message too short";
    return "";
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const error = validate();
    if (error) {
      setStatus({ type: "error", message: error });
      return;
    }
    setLoading(true);
    setStatus(null);
    setTimeout(() => {
      setLoading(false);
      setForm({ name: "", email: "", subject: "", message: "" });
      setStatus({ type: "success", message: "We'll get back to you within 2 business days." });
    }, 700);
  };

  const info = [
    { icon: MapPin, title: "Address", desc: "University Avenue, Education City" },
    { icon: Phone, title: "Phone", desc: "+1 (555) 123-4567" },
    { icon: Mail, title: "Email", desc: "info@axisuniversity.edu" },
    { icon: Clock, title: "Office Hours", desc: "Mon - Fri, 8:30 AM - 4:30 PM" },
  ];

  return (
    <Layout>
      <PageHero title="Contact Us" subtitle="We're here to help. Reach out anytime." />
      <section className="py-16">
        <div className="container grid gap-10 lg:grid-cols-2">
          <div className="space-y-5">
            <h2 className="text-2xl font-bold text-primary">Get in touch</h2>
            <p className="text-muted-foreground">Whether you have a question about programs, admissions, or anything else, our team is ready to answer.</p>
            <div className="space-y-4 mt-6">
              {info.map((it) => (
                <div key={it.title} className="flex items-start gap-4 rounded-2xl border bg-card p-5 shadow-soft">
                  <div className="h-11 w-11 rounded-xl bg-accent-soft flex items-center justify-center shrink-0">
                    <it.icon className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <div className="font-semibold text-primary">{it.title}</div>
                    <div className="text-sm text-muted-foreground">{it.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="aspect-video rounded-2xl bg-secondary flex items-center justify-center text-muted-foreground border">
              <MapPin className="h-8 w-8 mr-2" /> Map placeholder
            </div>
          </div>

          <form onSubmit={onSubmit} className="rounded-2xl border bg-card p-7 md:p-9 shadow-soft space-y-5 self-start">
            <div>
              <label htmlFor="name" className="text-sm font-medium text-foreground">Your Name *</label>
              <input
                id="name"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                maxLength={100}
                required
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-medium text-foreground">Email *</label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                maxLength={255}
                required
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label htmlFor="subject" className="text-sm font-medium text-foreground">Subject *</label>
              <input
                id="subject"
                value={form.subject}
                onChange={(e) => update("subject", e.target.value)}
                maxLength={150}
                required
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label htmlFor="message" className="text-sm font-medium text-foreground">Message *</label>
              <textarea
                id="message"
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                maxLength={1000}
                rows={5}
                required
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-gradient-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:opacity-90 disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
            {status && (
              <p
                className={`text-sm ${status.type === "error" ? "text-destructive" : "text-success"}`}
                aria-live="polite"
              >
                {status.message}
              </p>
            )}
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
