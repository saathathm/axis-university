import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="relative mt-20 overflow-hidden bg-black text-primary-foreground">
      <div className="absolute -left-24 top-10 h-64 w-64 rounded-full bg-accent/20 blur-3xl" aria-hidden="true" />
      <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-primary-glow/40 blur-3xl" aria-hidden="true" />
      <div className="container relative py-16 grid gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img src={logo} alt="Axis University" width={40} height={40} className="h-10 w-10 bg-white rounded p-1" />
            <span className="font-bold text-lg">Axis University</span>
          </div>
          <p className="text-sm text-primary-foreground/80">
            A forward-thinking private university committed to high-quality education on a global scale.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-4 text-base">Quick Links</h3>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li><Link to="/about" className="hover:text-accent transition-smooth">About Us</Link></li>
            <li><Link to="/academics" className="hover:text-accent transition-smooth">Academics</Link></li>
            <li><Link to="/student/apply" className="hover:text-accent transition-smooth">Apply Now</Link></li>
            <li><Link to="/recognitions" className="hover:text-accent transition-smooth">Recognitions</Link></li>
            <li><Link to="/verify" className="hover:text-accent transition-smooth">Verify Certificate</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4 text-base">Contact</h3>
          <ul className="space-y-3 text-sm text-primary-foreground/80">
            <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 shrink-0" /> University Avenue, Education City</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 shrink-0" /> +1 (555) 123-4567</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 shrink-0" /> info@axisuniversity.edu</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4 text-base">Follow Us</h3>
          <div className="flex gap-3">
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
              <a key={i} href="#" aria-label="Social link" className="h-9 w-9 rounded-full bg-primary-foreground/10 hover:bg-accent flex items-center justify-center transition-smooth">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10">
        <div className="container py-5 text-xs text-primary-foreground/70 text-center">
          © {new Date().getFullYear()} Axis University. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
