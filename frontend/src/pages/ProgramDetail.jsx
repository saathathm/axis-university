import { Link, useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { faculties, programs } from "@/data/content";
import { BookOpen, CalendarDays, Clock, Download, GraduationCap, MapPin, ShieldCheck, Users } from "lucide-react";
import { useMemo, useState } from "react";

const tabs = ["Overview", "Curriculum", "Batch Schedule"];

const getFacultyName = (facultyId) => faculties.find((faculty) => faculty.id === facultyId)?.name || "";

const getCurriculum = (program) => {
  if (program.curriculum?.length) return program.curriculum;
  const facultyName = getFacultyName(program.faculty) || "the discipline";
  return [
    `Introduction to ${facultyName}`,
    "Core Concepts",
    "Practical Studio / Lab Work",
    "Capstone Project",
  ];
};

const batchSchedule = {
  batchNumber: "CAA/05",
  type: "Full Time",
  startingDate: "2025-06-16",
  days: "Monday & Tuesday",
  start: "09:00",
  end: "17:00",
};

const ProgramDetail = () => {
  const { programId } = useParams();
  const [activeTab, setActiveTab] = useState("Overview");

  const program = useMemo(() => programs.find((item) => item.id === programId), [programId]);

  if (!program) {
    return (
      <Layout>
        <section className="relative overflow-hidden py-24">
          <div className="absolute inset-0 bg-gradient-primary" aria-hidden="true" />
          <div className="absolute -left-24 top-8 h-72 w-72 rounded-full bg-accent/30 blur-3xl" aria-hidden="true" />
          <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-primary-glow/40 blur-3xl" aria-hidden="true" />
          <div className="container relative text-center text-primary-foreground">
            <span className="inline-flex items-center gap-2 rounded-full bg-background/20 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em]">
              Course unavailable
            </span>
            <h1 className="mt-5 text-4xl font-extrabold md:text-6xl">Program not found</h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/85">
              The course you selected is no longer available or the link is invalid.
            </p>
            <Link
              to="/academics"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-background px-6 py-3 text-sm font-semibold text-primary shadow-glow"
            >
              Back to Programs
            </Link>
          </div>
        </section>
      </Layout>
    );
  }

  const facultyName = getFacultyName(program.faculty);
  const curriculum = getCurriculum(program);
  const applyUrl = `/student/apply?program=${program.id}&faculty=${program.faculty}`;
  const overviewPoints = program.requirements?.length
    ? program.requirements
    : ["Entry requirements are reviewed by the admissions team", "Applicants may be asked for supporting documents"];

  return (
    <Layout>
      <section className="relative overflow-hidden py-20 md:py-24">
        <div className="absolute inset-0 bg-gradient-primary" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-hero" aria-hidden="true" />
        <div className="absolute -left-24 top-8 h-72 w-72 rounded-full bg-primary-glow/40 blur-3xl" aria-hidden="true" />
        <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-accent/30 blur-3xl" aria-hidden="true" />
        <div className="container relative text-center text-primary-foreground md:text-left">
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-background/20 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em]">
              {facultyName || "Academic Program"}
            </span>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2 md:justify-start">
              <span className="inline-flex items-center gap-1 rounded-full bg-background/15 px-3 py-1 text-xs font-semibold">
                <GraduationCap className="h-3.5 w-3.5" /> {program.level}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-background/15 px-3 py-1 text-xs font-semibold">
                <Clock className="h-3.5 w-3.5" /> {program.duration}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-background/15 px-3 py-1 text-xs font-semibold">
                <Users className="h-3.5 w-3.5" /> Limited intake
              </span>
            </div>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight md:text-6xl">{program.title}</h1>
            <p className="mt-4 max-w-3xl text-lg text-primary-foreground/85">{program.overview || program.description}</p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] items-start">
          <div className="rounded-[1.6rem] border border-border bg-card shadow-soft overflow-hidden">
            <div className="grid grid-cols-3 text-center text-sm font-bold">
              {tabs.map((tab) => {
                const active = activeTab === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-5 transition-smooth ${active ? "bg-accent text-accent-foreground" : "bg-secondary text-foreground hover:bg-secondary/80"} ${tab === "Overview" ? "rounded-tl-[1.6rem]" : ""} ${tab === "Batch Schedule" ? "rounded-tr-[1.6rem]" : ""}`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>

            <div className="border-t border-border bg-background px-6 py-8 md:px-8 md:py-10">
              {activeTab === "Overview" && (
                <>
                  <div>
                    <h2 className="text-2xl font-bold text-primary">Course Summary</h2>
                    <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
                      {program.overview || program.description}
                    </p>
                  </div>

                  <div>
                    <h3 className="mb-3 text-lg font-semibold text-foreground">Suitable for</h3>
                    <ul className="grid gap-0 overflow-hidden rounded-2xl border border-border text-sm text-muted-foreground">
                      {overviewPoints.map((item) => (
                        <li key={item} className="flex items-start gap-3 px-4 py-3 odd:bg-secondary/35 even:bg-background">
                          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}

              {activeTab === "Curriculum" && (
                <div>
                  <h2 className="mb-4 text-2xl font-bold text-primary">Curriculum</h2>
                  <ul className="space-y-2">
                    {curriculum.map((item, index) => (
                      <li
                        key={item}
                        className={`flex items-start gap-4 rounded-sm border border-border px-5 py-3 ${index % 2 === 0 ? "bg-secondary/35" : "bg-background"}`}
                      >
                        <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-muted-foreground/80" aria-hidden="true" />
                        <span className="text-lg leading-7 text-foreground/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === "Batch Schedule" && (
                <div>
                  <div className="overflow-hidden rounded-2xl border border-border bg-background">
                    <div className="overflow-x-auto">
                      <table className="min-w-full border-collapse text-left">
                        <thead>
                          <tr className="border-b border-border text-sm font-bold text-slate-600">
                            <th className="px-5 py-4">Batch #</th>
                            <th className="px-5 py-4">Type</th>
                            <th className="px-5 py-4">Starting Date</th>
                            <th className="px-5 py-4">Day(s)</th>
                            <th className="px-5 py-4 text-center">Start</th>
                            <th className="px-5 py-4 text-center">End</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="text-lg text-slate-700">
                            <td className="px-5 py-6 font-semibold text-foreground">{batchSchedule.batchNumber}</td>
                            <td className="px-5 py-6">{batchSchedule.type}</td>
                            <td className="px-5 py-6">{batchSchedule.startingDate}</td>
                            <td className="px-5 py-6">{batchSchedule.days}</td>
                            <td className="px-5 py-6 text-center">{batchSchedule.start}</td>
                            <td className="px-5 py-6 text-center">{batchSchedule.end}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <aside className="rounded-3xl border bg-card p-6 shadow-soft lg:sticky lg:top-24">
            <h2 className="text-xl font-bold text-primary">Course Features</h2>
            <dl className="mt-5 space-y-4 text-sm">
              <div className="flex items-start justify-between gap-4 border-b pb-3">
                <dt className="inline-flex items-center gap-2 text-muted-foreground"><Clock className="h-4 w-4 text-accent" /> Duration</dt>
                <dd className="font-medium text-foreground">{program.duration}</dd>
              </div>
              <div className="flex items-start justify-between gap-4 border-b pb-3">
                <dt className="inline-flex items-center gap-2 text-muted-foreground"><BookOpen className="h-4 w-4 text-accent" /> Level</dt>
                <dd className="font-medium text-foreground">{program.level}</dd>
              </div>
              <div className="flex items-start justify-between gap-4 border-b pb-3">
                <dt className="inline-flex items-center gap-2 text-muted-foreground"><GraduationCap className="h-4 w-4 text-accent" /> Type</dt>
                <dd className="font-medium text-foreground">Full Time &amp; Part Time</dd>
              </div>
              <div className="flex items-start justify-between gap-4 border-b pb-3">
                <dt className="inline-flex items-center gap-2 text-muted-foreground"><MapPin className="h-4 w-4 text-accent" /> Medium</dt>
                <dd className="font-medium text-foreground">English &amp; Tamil</dd>
              </div>
              <div className="flex items-start justify-between gap-4">
                <dt className="inline-flex items-center gap-2 text-muted-foreground"><Users className="h-4 w-4 text-accent" /> Intake</dt>
                <dd className="font-medium text-foreground">25</dd>
              </div>
            </dl>

            <div className="mt-6 grid gap-3">
              <Link
                to="/download"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/20 bg-background px-5 py-3 text-sm font-semibold text-primary transition-smooth hover:bg-secondary"
              >
                <Download className="h-4 w-4" /> Download Brochure
              </Link>
              <Link
                to={applyUrl}
                className="inline-flex items-center justify-center rounded-full bg-gradient-accent px-5 py-3 text-sm font-semibold text-accent-foreground shadow-glow transition-smooth hover:opacity-95"
              >
                Apply Now
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </Layout>
  );
};

export default ProgramDetail;