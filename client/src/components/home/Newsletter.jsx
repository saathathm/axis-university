import { useState } from "react";
import { Mail } from "lucide-react";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SUBSCRIBE_DELAY = 600;

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState(null);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const showStatus = (type, message) => {
    setFormStatus({ type, message });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedEmail = email.trim();

    if (!emailRegex.test(trimmedEmail)) {
      showStatus("error", "Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    setFormStatus(null);

    setTimeout(() => {
      setIsSubmitting(false);
      setEmail("");
      showStatus("success", "Thanks for joining our newsletter.");
    }, SUBSCRIBE_DELAY);
  };

  return (
    <section className="py-20">
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-primary p-10 text-center text-primary-foreground shadow-elegant md:p-14">
          <div
            aria-hidden="true"
            className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/30 blur-3xl"
          />

          <div
            aria-hidden="true"
            className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-primary-glow/40 blur-3xl"
          />

          <div className="relative mx-auto max-w-2xl">
            <Mail className="mx-auto mb-4 h-10 w-10 text-accent" />

            <h2 className="mb-3 text-3xl font-bold md:text-4xl">
              Stay in the Loop
            </h2>

            <p className="mb-8 text-primary-foreground/85">
              Subscribe to our newsletter for the latest news, events, and
              admission updates.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="your@email.com"
                maxLength={255}
                aria-label="Email address"
                className="flex-1 rounded-md border border-input bg-background px-4 py-2 text-sm text-foreground"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-md bg-accent px-5 py-2 text-sm font-semibold text-accent-foreground hover:opacity-90 disabled:opacity-60"
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </button>
            </form>

            {formStatus && (
              <p
                aria-live="polite"
                className={`mt-4 text-sm ${
                  formStatus.type === "error"
                    ? "text-destructive"
                    : "text-accent-foreground"
                }`}
              >
                {formStatus.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;