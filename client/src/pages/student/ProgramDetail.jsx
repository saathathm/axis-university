import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Clock,
  Download,
  GraduationCap,
  MapPin,
  ShieldCheck,
  Users,
} from "lucide-react";

import { LoadingState } from "../../components/widgets/ContentState";
import { getCourseDetails } from "../../features/course/courseActions";
import { clearCourseDetails } from "../../features/course/courseSlice";
import { BASE_URL } from "../../utils/constants";

const ProgramDetail = () => {
  const { programId } = useParams();
  const dispatch = useDispatch();

  const { course: program, loading } = useSelector(
    (state) => state.courseState,
  );

  useEffect(() => {
    if (!programId) return;

    dispatch(getCourseDetails(programId));

    return () => {
      dispatch(clearCourseDetails());
    };
  }, [dispatch, programId]);

  if (loading) {
    return (
      <>
        <section className="py-20">
          <div className="container">
            <LoadingState label="Loading course details..." />
          </div>
        </section>
      </>
    );
  }

  if (!program) {
    return <ProgramNotFound />;
  }

  const courseName = program.name || program.title || "Course";

  const courseDescription =
    program.description ||
    program.short_description ||
    "Course details will be updated soon.";

  const requirements = getListData(program.entry_requirements);

  const curriculum = getCurriculumData(program.curriculums);

  const applyUrl = `/student/apply?course=${program.id}&faculty=${program.faculty_id}`;

  const brochure = Array.isArray(program.downloads)
    ? program.downloads.find(
        (download) =>
          download.status && download.title?.toLowerCase().includes("brochure"),
      ) || program.downloads.find((download) => download.status)
    : null;

  const brochureUrl = brochure?.file
    ? `${BASE_URL}/storage/${brochure.file}`
    : "";

  return (
    <>
      <section className="relative overflow-hidden py-20 md:py-24">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-primary"
        />

        <div aria-hidden="true" className="absolute inset-0 bg-gradient-hero" />

        <div
          aria-hidden="true"
          className="absolute -left-24 top-8 h-72 w-72 rounded-full bg-primary-glow/40 blur-3xl"
        />

        <div
          aria-hidden="true"
          className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-accent/30 blur-3xl"
        />

        <div className="container relative text-center text-primary-foreground md:text-left">
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-background/20 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em]">
              {program.level || "Academic Program"}
            </span>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-2 md:justify-start">
              {program.duration && (
                <span className="inline-flex items-center gap-1 rounded-full bg-background/15 px-3 py-1 text-xs font-semibold">
                  <Clock className="h-3.5 w-3.5" />
                  {program.duration}
                </span>
              )}

              {program.study_mode && (
                <span className="inline-flex items-center gap-1 rounded-full bg-background/15 px-3 py-1 text-xs font-semibold capitalize">
                  <Users className="h-3.5 w-3.5" />
                  {program.study_mode}
                </span>
              )}
            </div>

            <h1 className="mt-5 text-4xl font-extrabold leading-tight md:text-6xl">
              {courseName}
            </h1>

            <p className="mt-4 max-w-3xl text-lg text-primary-foreground/85">
              {program.short_description || courseDescription}
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="overflow-hidden rounded-[1.6rem] border border-border bg-card shadow-soft">
            <div className="border-t border-border bg-background px-6 py-8 md:px-8 md:py-10">
              <div>
                <h2 className="text-2xl font-bold text-primary">
                  Course Summary
                </h2>

                <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
                  {courseDescription}
                </p>
              </div>

              {requirements.length > 0 && (
                <CourseList title="Entry Requirements" items={requirements} />
              )}

              {curriculum.length > 0 && (
                <CourseList title="Curriculum" items={curriculum} />
              )}
            </div>
          </div>

          <aside className="rounded-3xl border bg-card p-6 shadow-soft lg:sticky lg:top-24">
            <h2 className="text-xl font-bold text-primary">Course Features</h2>

            <dl className="mt-5 space-y-4 text-sm">
              {program.duration && (
                <FeatureItem
                  icon={Clock}
                  label="Duration"
                  value={program.duration}
                />
              )}

              {program.level && (
                <FeatureItem
                  icon={GraduationCap}
                  label="Level"
                  value={program.level}
                />
              )}

              {program.study_mode && (
                <FeatureItem
                  icon={MapPin}
                  label="Study Mode"
                  value={program.study_mode}
                  capitalize
                />
              )}

              {program.students_intake && (
                <FeatureItem
                  icon={Users}
                  label="Students Intake"
                  value={program.students_intake}
                />
              )}
            </dl>

            <div className="mt-6 grid gap-3">
              {brochureUrl ? (
                <a
                  href={brochureUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/20 bg-background px-5 py-3 text-sm font-semibold text-primary transition-smooth hover:bg-secondary"
                >
                  <Download className="h-4 w-4" />
                  Download Brochure
                </a>
              ) : (
                <Link
                  to="/download"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/20 bg-background px-5 py-3 text-sm font-semibold text-primary transition-smooth hover:bg-secondary"
                >
                  <Download className="h-4 w-4" />
                  Download Brochure
                </Link>
              )}

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
    </>
  );
};

const CourseList = ({ title, items }) => {
  return (
    <div className="mt-10">
      <h3 className="mb-3 text-lg font-semibold text-foreground">{title}</h3>

      <ul className="grid gap-0 overflow-hidden rounded-2xl border border-border text-sm text-muted-foreground">
        {items.map((item, index) => (
          <li
            key={`${item}-${index}`}
            className="flex items-start gap-3 px-4 py-3 odd:bg-secondary/35 even:bg-background"
          >
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const FeatureItem = ({ icon: Icon, label, value, capitalize = false }) => {
  return (
    <div className="flex items-start justify-between gap-4 border-b pb-3 last:border-b-0">
      <dt className="inline-flex items-center gap-2 text-muted-foreground">
        <Icon className="h-4 w-4 text-accent" />
        {label}
      </dt>

      <dd
        className={`text-right font-medium text-foreground ${
          capitalize ? "capitalize" : ""
        }`}
      >
        {value}
      </dd>
    </div>
  );
};

const ProgramNotFound = () => {
  return (
    <>
      <section className="relative overflow-hidden py-24">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-primary"
        />

        <div
          aria-hidden="true"
          className="absolute -left-24 top-8 h-72 w-72 rounded-full bg-accent/30 blur-3xl"
        />

        <div
          aria-hidden="true"
          className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-primary-glow/40 blur-3xl"
        />

        <div className="container relative text-center text-primary-foreground">
          <span className="inline-flex items-center gap-2 rounded-full bg-background/20 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em]">
            Course unavailable
          </span>

          <h1 className="mt-5 text-4xl font-extrabold md:text-6xl">
            Course not found
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/85">
            The course you selected is no longer available or the link is
            invalid.
          </p>

          <Link
            to="/academics"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-background px-6 py-3 text-sm font-semibold text-primary shadow-glow"
          >
            Back to Courses
          </Link>
        </div>
      </section>
    </>
  );
};

const getListData = (value) => {
  if (!value) return [];

  if (Array.isArray(value)) {
    return value.filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(/\r?\n|,/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
};

const getCurriculumData = (value) => {
  if (!value) return [];

  if (Array.isArray(value)) {
    return value
      .filter((item) => item?.status !== false)
      .map((item) => {
        if (typeof item === "string") return item;

        const title = item.title || "";
        const duration = item.duration ? ` - ${item.duration}` : "";
        const description = item.description ? `: ${item.description}` : "";

        return `${title}${duration}${description}`.trim();
      })
      .filter(Boolean);
  }

  if (typeof value === "string") {
    return getListData(value);
  }

  return [];
};

export default ProgramDetail;
