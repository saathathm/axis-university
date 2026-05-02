import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, ShieldCheck, X } from "lucide-react";
import { useEffect, useState } from "react";
import logo from "@/assets/logo.png";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/recognitions", label: "Recognitions" },
  { to: "/academics", label: "Academics" },
  { to: "/student", label: "Student" },
  { to: "/download", label: "Download" },
  { to: "/contact", label: "Contact" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  const headerClass = `sticky top-0 z-50 w-full border-b border-border transition-smooth ${scrolled ? "bg-background/95 backdrop-blur shadow-soft" : "bg-background"}`;

  return (
    <header className={headerClass}>
      <div className="container flex h-16 items-center justify-between gap-4 md:h-20">
        <Link to="/" className="flex items-center gap-2" aria-label="Axis University home">
          <img src={logo} alt="Axis University logo" width={40} height={40} className="h-10 w-10" />
          <span className="hidden text-lg font-bold text-primary sm:inline">Axis University</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-2" aria-label="Primary">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `px-4 py-2 text-sm font-semibold rounded-full transition-smooth ${isActive ? "bg-accent text-accent-foreground shadow-glow" : "text-foreground/80 hover:text-primary hover:bg-secondary/40"}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/verify"
            className="hidden md:inline-flex items-center gap-2 rounded-full bg-gradient-accent px-5 py-2 text-sm font-semibold text-accent-foreground shadow-glow hover:opacity-90 transition-smooth"
          >
            <ShieldCheck className="h-4 w-4" />
            Verify Certificate
          </Link>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border bg-background hover:bg-secondary transition-smooth"
            aria-label="Open menu"
            aria-expanded={open}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-72 bg-background shadow-elegant p-6">
            <div className="flex items-center justify-between">
              <span className="text-base font-semibold text-primary">Menu</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border hover:bg-secondary transition-smooth"
                aria-label="Close menu"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-6 flex flex-col gap-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    `px-4 py-3 text-base font-semibold rounded-2xl transition-smooth ${isActive ? "bg-accent text-accent-foreground" : "hover:bg-secondary/40"}`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <Link
                to="/verify"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-accent px-4 py-2 text-sm font-semibold text-accent-foreground"
              >
                <ShieldCheck className="h-4 w-4" />
                Verify Certificate
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
