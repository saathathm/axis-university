import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";

import logo from "../../assets/logo.png";

const currentYear = new Date().getFullYear();

const quickLinks = [
  { to: "/about", label: "About Us" },
  { to: "/academics", label: "Academics" },
  { to: "/student/apply", label: "Apply Now" },
  { to: "/recognitions", label: "Recognitions" },
  { to: "/verify", label: "Verify Certificate" },
];

const contactItems = [
  {
    icon: MapPin,
    label: "University Avenue, Education City",
  },
  {
    icon: Phone,
    label: "+1 (555) 123-4567",
  },
  {
    icon: Mail,
    label: "info@axisuniversity.edu",
  },
];

const socialLinks = [
  {
    href: "#",
    label: "Facebook",
    icon: Facebook,
  },
  {
    href: "#",
    label: "Twitter",
    icon: Twitter,
  },
  {
    href: "#",
    label: "Instagram",
    icon: Instagram,
  },
  {
    href: "#",
    label: "LinkedIn",
    icon: Linkedin,
  },
];

const Footer = () => {
  return (
    <footer className="relative mt-20 overflow-hidden bg-black text-primary-foreground">
      <FooterBackground />

      <div className="container relative grid gap-10 py-16 md:grid-cols-4">
        <FooterBrand />

        <FooterSection title="Quick Links">
          <FooterLinks />
        </FooterSection>

        <FooterSection title="Contact">
          <ContactList />
        </FooterSection>

        <FooterSection title="Follow Us">
          <SocialLinks />
        </FooterSection>
      </div>

      <FooterBottom />
    </footer>
  );
};

const FooterBackground = () => {
  return (
    <>
      <div
        className="absolute -left-24 top-10 h-64 w-64 rounded-full bg-accent/20 blur-3xl"
        aria-hidden="true"
      />

      <div
        className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-primary-glow/40 blur-3xl"
        aria-hidden="true"
      />
    </>
  );
};

const FooterBrand = () => {
  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <img
          src={logo}
          alt="Axis University"
          width={40}
          height={40}
          className="h-10 w-10 rounded bg-white p-1"
        />

        <span className="text-lg font-bold">Axis University</span>
      </div>

      <p className="text-sm text-primary-foreground/80">
        A forward-thinking private university committed to high-quality
        education on a global scale.
      </p>
    </div>
  );
};

const FooterSection = ({ title, children }) => {
  return (
    <div>
      <h3 className="mb-4 text-base font-semibold">{title}</h3>
      {children}
    </div>
  );
};

const FooterLinks = () => {
  return (
    <ul className="space-y-2 text-sm text-primary-foreground/80">
      {quickLinks.map((link) => (
        <li key={link.to}>
          <Link
            to={link.to}
            className="transition-smooth hover:text-accent"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const ContactList = () => {
  return (
    <ul className="space-y-3 text-sm text-primary-foreground/80">
      {contactItems.map((item) => {
        const Icon = item.icon;

        return (
          <li key={item.label} className="flex items-start gap-2">
            <Icon className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{item.label}</span>
          </li>
        );
      })}
    </ul>
  );
};

const SocialLinks = () => {
  return (
    <div className="flex gap-3">
      {socialLinks.map((link) => {
        const Icon = link.icon;

        return (
          <a
            key={link.label}
            href={link.href}
            aria-label={link.label}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-foreground/10 transition-smooth hover:bg-accent"
          >
            <Icon className="h-4 w-4" />
          </a>
        );
      })}
    </div>
  );
};

const FooterBottom = () => {
  return (
    <div className="border-t border-primary-foreground/10">
      <div className="container py-5 text-center text-xs text-primary-foreground/70">
        © {currentYear} Axis University. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;