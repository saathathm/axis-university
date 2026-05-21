import { Briefcase, Cpu, GraduationCap, HeartPulse, Palette, Scale } from "lucide-react";

const icons = {
  Briefcase,
  Cpu,
  GraduationCap,
  HeartPulse,
  Palette,
  Scale,
};

export const getFacultyIcon = (iconName) => icons[iconName] || GraduationCap;
