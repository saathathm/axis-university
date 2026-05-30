import { BookCopy, BookOpen, UserRound } from "lucide-react";
import InfoCard from "./InfoCard";

const CourseDetailsModal = ({ course, onClose, onClick = () => {} }) => {
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/45 p-4">
      <div className="max-h-[90vh] w-full max-w-6xl overflow-y-auto rounded-3xl border bg-card p-6 shadow-soft">
        <div className="flex items-start justify-between gap-4 border-b pb-4">
          <div>
            <h2 className="text-xl font-bold text-primary">Course Details</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Detailed course information and curriculum.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full border bg-background px-4 py-2 text-sm font-semibold transition-smooth hover:bg-secondary"
          >
            Close
          </button>
        </div>

        <div className="mt-6 grid gap-8 lg:grid-cols-[380px_minmax(0,1fr)]">
          <div className="space-y-5">
            <div className="overflow-hidden rounded-3xl border bg-secondary">
              <BookOpen className="flex h-[15vh] w-full object-cover shrink-0 items-center justify-center rounded-2xl bg-accent-soft text-accent" />
            </div>

            <div className="rounded-2xl border bg-background p-5">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Faculty
              </p>

              <p className="mt-2 text-lg font-semibold text-primary">
                {course.faculty?.name}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <InfoCard label="Level" value={course.level} />

              <InfoCard label="Duration" value={course.duration} />

              <InfoCard label="Study Mode" value={course.study_mode} />

              <InfoCard
                label="Tuition Fee"
                value={
                  course.fee ? `${Number(course.fee).toLocaleString()}` : "-"
                }
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                Course
              </p>

              <h3 className="mt-2 text-3xl font-bold text-primary">
                {course.name}
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                {course.code}
              </p>
            </div>

            <div className="rounded-2xl border bg-background p-5">
              <h4 className="text-lg font-semibold text-primary">
                Short Description
              </h4>

              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {course.short_description}
              </p>
            </div>

            <div className="rounded-2xl border bg-background p-5">
              <h4 className="text-lg font-semibold text-primary">
                Full Description
              </h4>

              <p className="mt-3 whitespace-pre-line text-sm leading-7 text-muted-foreground">
                {course.description}
              </p>
            </div>

            <div className="rounded-2xl border bg-background p-5" onClick={onClick}>
              <div className="flex items-center gap-2">
                <BookCopy className="h-5 w-5 text-accent" />

                <h4 className="text-lg font-semibold text-primary">
                  Curriculums
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsModal;
