import { GraduationCap, Briefcase, HeartPulse, Cpu, Scale, Palette } from "lucide-react";

export const faculties = [
  { id: "business", name: "Business & Management", icon: Briefcase, description: "Build leadership skills for a global economy.", color: "text-accent" },
  { id: "it", name: "Information Technology", icon: Cpu, description: "Software, data, AI and modern computing.", color: "text-primary" },
  { id: "health", name: "Health Sciences", icon: HeartPulse, description: "Care, research and modern healthcare practice.", color: "text-accent" },
  { id: "law", name: "Law & Public Policy", icon: Scale, description: "Justice, governance and international law.", color: "text-primary" },
  { id: "arts", name: "Arts & Design", icon: Palette, description: "Creativity, media and visual communication.", color: "text-accent" },
  { id: "edu", name: "Education", icon: GraduationCap, description: "Teaching, learning and educational leadership.", color: "text-primary" },
];

export const programs = [
  { id: "p1", title: "BBA in Marketing", faculty: "business", level: "Bachelor", duration: "4 years", description: "Strategic marketing, branding and digital channels." },
  { id: "p2", title: "MBA Executive", faculty: "business", level: "Master", duration: "2 years", description: "Advanced leadership for senior managers." },
  { id: "p3", title: "BSc Computer Science", faculty: "it", level: "Bachelor", duration: "4 years", description: "Algorithms, software engineering and AI foundations." },
  { id: "p4", title: "MSc Data Science", faculty: "it", level: "Master", duration: "2 years", description: "Machine learning, analytics and big data." },
  { id: "p5", title: "Diploma in Web Development", faculty: "it", level: "Diploma", duration: "1 year", description: "Hands-on full-stack web development." },
  { id: "p6", title: "BSc Nursing", faculty: "health", level: "Bachelor", duration: "4 years", description: "Clinical practice and patient care." },
  { id: "p7", title: "Master of Public Health", faculty: "health", level: "Master", duration: "2 years", description: "Population health, policy and epidemiology." },
  { id: "p8", title: "LLB Law", faculty: "law", level: "Bachelor", duration: "4 years", description: "Foundations of national and international law." },
  { id: "p9", title: "LLM International Law", faculty: "law", level: "Master", duration: "1.5 years", description: "Advanced study in international legal frameworks." },
  { id: "p10", title: "BA Graphic Design", faculty: "arts", level: "Bachelor", duration: "3 years", description: "Visual identity, typography and digital design." },
  { id: "p11", title: "Diploma in Photography", faculty: "arts", level: "Diploma", duration: "1 year", description: "Professional photography and storytelling." },
  { id: "p12", title: "B.Ed. Primary Education", faculty: "edu", level: "Bachelor", duration: "4 years", description: "Teach and lead in primary schools." },
  { id: "p13", title: "PhD in Management", faculty: "business", level: "PhD", duration: "3-5 years", description: "Original research in management science." },
  { id: "p14", title: "PhD in Computer Science", faculty: "it", level: "PhD", duration: "3-5 years", description: "Doctoral research in computing." },
];

export const testimonials = [
  { name: "Sara Ahmed", program: "BBA Marketing, 2024", quote: "Axis gave me the tools and the global perspective I needed to start my career with confidence." },
  { name: "Omar Hassan", program: "MSc Data Science, 2023", quote: "Brilliant faculty and modern facilities. The data science program changed my career path entirely." },
  { name: "Layla Mansour", program: "LLB Law, 2025", quote: "The professors care, the community is strong, and the international exposure is unmatched." },
  { name: "Daniel Khoury", program: "MBA Executive, 2024", quote: "A flexible, world-class MBA that fit perfectly with my schedule as a working professional." },
];

export const news = [
  { id: "n1", title: "Axis University signs partnership with European research network", date: "Apr 18, 2026", excerpt: "A new agreement opens up joint research opportunities for students and faculty." },
  { id: "n2", title: "Annual Innovation Week returns with 40+ student startups", date: "Apr 02, 2026", excerpt: "Students from every faculty pitch ideas to industry mentors and investors." },
  { id: "n3", title: "New scholarships announced for the 2026/2027 intake", date: "Mar 22, 2026", excerpt: "Merit and need-based scholarships covering up to 100% of tuition." },
];

export const recognitions = [
  { name: "Ministry of Higher Education", desc: "Officially licensed and recognized university." },
  { name: "International Quality Council", desc: "Accredited for international academic standards." },
  { name: "Global Universities Network", desc: "Member of a worldwide academic alliance." },
  { name: "QS Stars Rating", desc: "Recognized for teaching, employability and inclusiveness." },
  { name: "ISO 9001:2015", desc: "Certified quality management in education." },
  { name: "European Credit Transfer System", desc: "ECTS-aligned program structure." },
];

export const downloads = [
  { category: "Brochures", items: [
    { title: "University Prospectus 2026", size: "4.2 MB" },
    { title: "Academic Programs Catalog", size: "2.8 MB" },
  ]},
  { category: "Forms", items: [
    { title: "Admission Application Form", size: "320 KB" },
    { title: "Scholarship Request Form", size: "210 KB" },
    { title: "Transcript Request Form", size: "180 KB" },
  ]},
  { category: "Handbooks", items: [
    { title: "Student Handbook", size: "1.6 MB" },
    { title: "Code of Conduct", size: "540 KB" },
  ]},
];
