import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, ShieldCheck, X } from "lucide-react";

import logo from "../../assets/logo.png";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/recognitions", label: "Recognitions" },
  { to: "/academics", label: "Academics" },
  { to: "/student", label: "Student" },
  { to: "/contact", label: "Contact" },
];

const Header = () => {
  const location = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
    document.body.style.touchAction = isMenuOpen ? "none" : "";

    return () => {
      document.body.style.overflow = "unset";
      document.body.style.touchAction = "";
    };
  }, [isMenuOpen]);

  const headerClassName = [
    "sticky top-0 z-50 w-full border-b border-border transition-smooth",
    isScrolled ? "bg-background/95 backdrop-blur shadow-soft" : "bg-background",
  ].join(" ");

  return (
    <header className={headerClassName}>
      <div className="container flex h-16 items-center justify-between gap-4 md:h-20">
        <Logo />

        <DesktopNav />

        <div className="flex items-center gap-2">
          <VerifyButton className="hidden md:inline-flex" />

          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border bg-background transition-smooth hover:bg-secondary lg:hidden"
            aria-label="Open menu"
            aria-expanded={isMenuOpen}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  );
};

const Logo = () => {
  return (
    <Link
      to="/"
      className="flex items-center gap-2"
      aria-label="Axis University home"
    >
      <img
        src={logo}
        alt="Axis University logo"
        width={40}
        height={40}
        className="h-10 w-10"
      />

      <span className="hidden text-lg font-bold text-primary sm:inline">
        Axis University
      </span>
    </Link>
  );
};

const DesktopNav = () => {
  return (
    <nav className="hidden items-center gap-2 lg:flex" aria-label="Primary">
      {navItems.map((item) => (
        <NavItem key={item.to} item={item} variant="desktop" />
      ))}
    </nav>
  );
};

const MobileMenu = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] lg:hidden">
      <button
        type="button"
        aria-label="Close menu"
        className="fixed inset-0 bg-black/40"
        onClick={onClose}
      />

      <aside className="absolute right-0 top-0 z-[10000] h-full w-72 bg-background p-6 shadow-elegant">
        <div className="flex items-center justify-between">
          <span className="text-base font-semibold text-primary">Menu</span>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border transition-smooth hover:bg-secondary"
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="mt-6 flex flex-col gap-2" aria-label="Mobile primary">
          {navItems.map((item) => (
            <NavItem key={item.to} item={item} variant="mobile" />
          ))}
        </nav>

        <div className="mt-4 flex flex-col gap-2">
          <VerifyButton />
        </div>
      </aside>
    </div>,
    document.body,
  );
};

const NavItem = ({ item, variant = "desktop" }) => {
  const baseClassName = "font-semibold transition-smooth";

  const variantClassName =
    variant === "mobile"
      ? "rounded-2xl px-4 py-3 text-base"
      : "rounded-full px-4 py-2 text-sm";

  return (
    <NavLink
      to={item.to}
      end={item.to === "/"}
      className={({ isActive }) =>
        [
          baseClassName,
          variantClassName,
          isActive
            ? "bg-accent text-accent-foreground shadow-glow"
            : "text-foreground/80 hover:bg-secondary/40 hover:text-primary",
        ].join(" ")
      }
    >
      {item.label}
    </NavLink>
  );
};

const VerifyButton = ({ className = "" }) => {
  return (
    <Link
      to="/verify"
      className={[
        "items-center gap-2 rounded-full bg-gradient-accent px-5 py-2 text-sm font-semibold text-accent-foreground shadow-glow transition-smooth hover:opacity-90",
        className || "inline-flex",
      ].join(" ")}
    >
      <ShieldCheck className="h-4 w-4" />
      Verify Certificate
    </Link>
  );
};

export default Header;
