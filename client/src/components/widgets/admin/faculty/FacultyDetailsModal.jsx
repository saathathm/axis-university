import { BASE_URL } from "../../../../utils/constants";
import formatDate from "../../formatDate";
import StatusBadge from "../StatusBadge";

const FacultyDetailsModal = ({ faculty, onClose }) => {
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/45 p-4">
      <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl border bg-card p-6 shadow-soft">
        <div className="flex items-start justify-between gap-4 border-b pb-4">
          <div>
            <h2 className="text-xl font-bold text-primary">Faculty Details</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Detailed faculty information.
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

        <div className="mt-6 grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
          <div className="overflow-hidden rounded-3xl border bg-secondary">
            <img
              src={`${BASE_URL}/storage/${faculty.image}`}
              alt={faculty.name}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="space-y-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                Faculty
              </p>

              <h3 className="mt-2 text-3xl font-bold text-primary">
                {faculty.name}
              </h3>
            </div>

            <div className="rounded-2xl border bg-background p-5">
              <p className="text-sm font-semibold text-primary">
                Short Description
              </p>

              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                {faculty.short_description}
              </p>
            </div>

            <div className="rounded-2xl border bg-background p-5">
              <p className="text-sm font-semibold text-primary">Description</p>

              <p className="mt-2 whitespace-pre-line text-sm leading-7 text-muted-foreground">
                {faculty.description}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border bg-background p-4">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Slug
                </p>

                <p className="mt-2 text-sm font-medium text-foreground">
                  {faculty.slug}
                </p>
              </div>

              <div className="rounded-2xl border bg-background p-4">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Status
                </p>

                <div className="mt-2">
                  <StatusBadge status={faculty.status} />
                </div>
              </div>

              <div className="rounded-2xl border bg-background p-4">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Created At
                </p>

                <p className="mt-2 text-sm font-medium text-foreground">
                  {formatDate(faculty.created_at)}
                </p>
              </div>

              <div className="rounded-2xl border bg-background p-4">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Updated At
                </p>

                <p className="mt-2 text-sm font-medium text-foreground">
                  {formatDate(faculty.updated_at)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyDetailsModal;
