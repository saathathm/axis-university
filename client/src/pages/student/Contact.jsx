import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

import PageHero from "../../components/widgets/PageHero";
import { createMessage } from "../../features/message/messageActions";
import {
  clearMessageError,
  clearMessageSuccess,
} from "../../features/message/messageSlice";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const initialFormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const contactInfo = [
  {
    icon: MapPin,
    title: "Address",
    description: "University Avenue, Education City",
  },
  {
    icon: Phone,
    title: "Phone",
    description: "+1 (555) 123-4567",
    href: "tel:+15551234567",
  },
  {
    icon: Mail,
    title: "Email",
    description: "info@axisuniversity.edu",
    href: "mailto:info@axisuniversity.edu",
  },
  {
    icon: Clock,
    title: "Office Hours",
    description: "Mon - Fri, 8:30 AM - 4:30 PM",
  },
];

const Contact = () => {
  const dispatch = useDispatch();

  const {
    loading,
    message: successMessage,
    error,
  } = useSelector((state) => state.messageState);

  const [form, setForm] = useState(initialFormState);
  const [formStatus, setFormStatus] = useState(null);

  useEffect(() => {
    if (successMessage) {
      setForm(initialFormState);
      setFormStatus({
        type: "success",
        message: "We'll get back to you within 2 business days.",
      });

      dispatch(clearMessageSuccess());
    }
  }, [dispatch, successMessage]);

  useEffect(() => {
    if (error) {
      setFormStatus({
        type: "error",
        message: error,
      });

      dispatch(clearMessageError());
    }
  }, [dispatch, error]);

  const updateField = (fieldName, value) => {
    setForm((prevForm) => ({
      ...prevForm,
      [fieldName]: value,
    }));

    if (formStatus) {
      setFormStatus(null);
    }
  };

  const validateForm = () => {
    if (form.name.trim().length < 2) {
      return "Name required";
    }

    if (!emailRegex.test(form.email.trim())) {
      return "Valid email required";
    }

    if (form.subject.trim().length < 2) {
      return "Subject required";
    }

    if (form.message.trim().length < 5) {
      return "Message too short";
    }

    return "";
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const errorMessage = validateForm();

    if (errorMessage) {
      setFormStatus({
        type: "error",
        message: errorMessage,
      });
      return;
    }

    setFormStatus(null);

    dispatch(
      createMessage({
        name: form.name.trim(),
        email: form.email.trim(),
        subject: form.subject.trim(),
        message: form.message.trim(),
      }),
    );
  };

  return (
    <>
      <PageHero
        title="Contact Us"
        subtitle="We're here to help. Reach out anytime."
      />

      <section className="py-16">
        <div className="container grid gap-10 lg:grid-cols-2">
          <div className="space-y-5">
            <h2 className="text-2xl font-bold text-primary">Get in touch</h2>

            <p className="text-muted-foreground">
              Whether you have a question about programs, admissions, or
              anything else, our team is ready to answer.
            </p>

            <div className="mt-6 space-y-4">
              {contactInfo.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="flex items-start gap-4 rounded-2xl border bg-card p-5 shadow-soft"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft">
                      <Icon className="h-5 w-5 text-accent" />
                    </div>

                    <div>
                      <div className="font-semibold text-primary">
                        {item.title}
                      </div>

                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-sm text-muted-foreground transition-smooth hover:text-accent"
                        >
                          {item.description}
                        </a>
                      ) : (
                        <div className="text-sm text-muted-foreground">
                          {item.description}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex aspect-video items-center justify-center rounded-2xl border bg-secondary text-muted-foreground">
              <MapPin className="mr-2 h-8 w-8" />
              Map placeholder
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="self-start rounded-2xl border bg-card p-7 shadow-soft space-y-5 md:p-9"
          >
            <div>
              <label
                htmlFor="name"
                className="text-sm font-medium text-foreground"
              >
                Your Name *
              </label>

              <input
                id="name"
                value={form.name}
                onChange={(event) => updateField("name", event.target.value)}
                maxLength={100}
                required
                disabled={loading}
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm disabled:opacity-60"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-foreground"
              >
                Email *
              </label>

              <input
                id="email"
                type="email"
                value={form.email}
                onChange={(event) => updateField("email", event.target.value)}
                maxLength={255}
                required
                disabled={loading}
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm disabled:opacity-60"
              />
            </div>

            <div>
              <label
                htmlFor="subject"
                className="text-sm font-medium text-foreground"
              >
                Subject *
              </label>

              <input
                id="subject"
                value={form.subject}
                onChange={(event) => updateField("subject", event.target.value)}
                maxLength={150}
                required
                disabled={loading}
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm disabled:opacity-60"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="text-sm font-medium text-foreground"
              >
                Message *
              </label>

              <textarea
                id="message"
                value={form.message}
                onChange={(event) => updateField("message", event.target.value)}
                maxLength={1000}
                rows={5}
                required
                disabled={loading}
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm disabled:opacity-60"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-gradient-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:opacity-90 disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

            {formStatus && (
              <p
                aria-live="polite"
                className={`text-sm ${
                  formStatus.type === "error"
                    ? "text-destructive"
                    : "text-success"
                }`}
              >
                {formStatus.message}
              </p>
            )}
          </form>
        </div>
      </section>
    </>
  );
};

export default Contact;
