import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Award, Eye, Search, Star, Trash2 } from "lucide-react";

import {
  deleteTestimonial,
  getTestimonials,
} from "../../features/testimonial/testimonialActions";

const Testimonials = () => {
  const dispatch = useDispatch();

  const { testimonials = [], loading, error } = useSelector(
    (state) => state.testimonialState,
  );

  const [search, setSearch] = useState("");
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);

  useEffect(() => {
    dispatch(getTestimonials());
  }, [dispatch]);

  const filteredTestimonials = useMemo(() => {
    return testimonials.filter((testimonial) => {
      const searchText = search.trim().toLowerCase();

      if (!searchText) return true;

      return (
        testimonial.name?.toLowerCase().includes(searchText) ||
        testimonial.role?.toLowerCase().includes(searchText) ||
        testimonial.course?.toLowerCase().includes(searchText) ||
        testimonial.message?.toLowerCase().includes(searchText)
      );
    });
  }, [search, testimonials]);

  const stats = useMemo(() => {
    const ratings = testimonials
      .map((testimonial) => Number(testimonial.rating))
      .filter(Boolean);

    return {
      total: testimonials.length,
      active: testimonials.filter((testimonial) => testimonial.status === true)
        .length,
      inactive: testimonials.filter(
        (testimonial) => testimonial.status === false,
      ).length,
      averageRating: ratings.length
        ? (ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length).toFixed(1)
        : "0.0",
    };
  }, [testimonials]);

  const handleDelete = (testimonialId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this testimonial?",
    );

    if (!confirmed) return;

    dispatch(deleteTestimonial(testimonialId)).then(() => {
      dispatch(getTestimonials());
    });
  };

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border bg-card p-6 shadow-soft">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              Testimonials
            </p>

            <h1 className="mt-2 text-2xl font-bold text-primary md:text-3xl">
              Testimonial Management
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Review student and alumni testimonials showcased on the website.
            </p>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-accent px-5 py-3 text-sm font-semibold text-accent-foreground shadow-soft transition-smooth hover:opacity-90"
          >
            <Star className="h-4 w-4" />
            Add Testimonial
          </button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        <StatCard title="Total" value={stats.total} icon={Award} />
        <StatCard title="Active" value={stats.active} icon={Star} />
        <StatCard title="Inactive" value={stats.inactive} icon={Trash2} />
        <StatCard title="Avg Rating" value={stats.averageRating} icon={Eye} />
      </section>

      <section className="rounded-3xl border bg-card p-5 shadow-soft">
        <div className="relative max-w-xl">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search testimonials..."
            className="w-full rounded-2xl border bg-background px-11 py-3 text-sm outline-none transition-smooth focus:border-accent"
          />
        </div>

        {error && (
          <div className="mt-4 rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        )}
      </section>

      <section className="overflow-hidden rounded-3xl border bg-card shadow-soft">
        <div className="border-b px-6 py-5">
          <h2 className="text-lg font-bold text-primary">Testimonial Records</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Showing {filteredTestimonials.length} of {testimonials.length} testimonials.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1150px] text-left text-sm">
            <thead className="bg-secondary/60 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-5 py-4">Testimonial</th>
                <th className="px-5 py-4">Course</th>
                <th className="px-5 py-4">Rating</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Created</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-5 py-12 text-center text-muted-foreground">
                    Loading testimonials...
                  </td>
                </tr>
              ) : filteredTestimonials.length > 0 ? (
                filteredTestimonials.map((testimonial) => (
                  <tr key={testimonial.id} className="bg-background">
                    <td className="px-5 py-4">
                      <div className="flex items-start gap-4">
                        <div className="h-14 w-14 overflow-hidden rounded-2xl border bg-secondary">
                          {testimonial.photo ? (
                            <img
                              src={getAssetUrl(testimonial.photo)}
                              alt={testimonial.name}
                              className="h-full w-full object-cover"
                            />
                          ) : null}
                        </div>

                        <div>
                          <h3 className="font-semibold text-foreground">
                            {testimonial.name}
                          </h3>

                          <p className="mt-1 text-xs text-muted-foreground">
                            {testimonial.role || "-"}
                          </p>

                          <p className="mt-2 line-clamp-2 max-w-[320px] text-xs text-muted-foreground">
                            {testimonial.message}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-muted-foreground">
                      {testimonial.course || "-"}
                    </td>

                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-foreground">
                        <Star className="h-3.5 w-3.5 text-accent" />
                        {testimonial.rating || "-"}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <StatusBadge status={testimonial.status} />
                    </td>

                    <td className="px-5 py-4 text-muted-foreground">
                      {formatDate(testimonial.created_at)}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedTestimonial(testimonial)}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full border bg-card text-foreground transition-smooth hover:bg-secondary"
                        >
                          <Eye className="h-4 w-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(testimonial.id)}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-destructive/30 bg-destructive/10 text-destructive transition-smooth hover:bg-destructive hover:text-destructive-foreground"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-5 py-12 text-center text-muted-foreground">
                    No testimonials found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {selectedTestimonial && (
        <TestimonialDetailsModal
          testimonial={selectedTestimonial}
          onClose={() => setSelectedTestimonial(null)}
        />
      )}
    </div>
  );
};

const StatCard = ({ title, value, icon: Icon }) => (
  <div className="rounded-3xl border bg-card p-5 shadow-soft">
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <h3 className="mt-3 text-3xl font-bold text-primary">{value}</h3>
      </div>

      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-soft text-accent">
        <Icon className="h-7 w-7" />
      </div>
    </div>
  </div>
);

const StatusBadge = ({ status }) => (
  <span
    className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${
      status
        ? "border-success/20 bg-success/10 text-success"
        : "border-destructive/20 bg-destructive/10 text-destructive"
    }`}
  >
    {status ? "Active" : "Inactive"}
  </span>
);

const TestimonialDetailsModal = ({ testimonial, onClose }) => (
  <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/45 p-4">
    <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border bg-card p-6 shadow-soft">
      <div className="flex items-start justify-between gap-4 border-b pb-4">
        <div>
          <h2 className="text-xl font-bold text-primary">Testimonial Details</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Detailed testimonial information.
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

      <div className="mt-6 grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
        <div className="overflow-hidden rounded-3xl border bg-secondary">
          {testimonial.photo ? (
            <img
              src={getAssetUrl(testimonial.photo)}
              alt={testimonial.name}
              className="h-full w-full object-cover"
            />
          ) : null}
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              {testimonial.course || "Testimonial"}
            </p>

            <h3 className="mt-2 text-3xl font-bold text-primary">
              {testimonial.name}
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              {testimonial.role || "-"}
            </p>
          </div>

          <div className="rounded-2xl border bg-background p-5">
            <p className="text-sm font-semibold text-primary">Message</p>
            <p className="mt-2 whitespace-pre-line text-sm leading-7 text-muted-foreground">
              {testimonial.message}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <DetailItem label="Rating" value={testimonial.rating || "-"} />
            <DetailItem label="Status" value={<StatusBadge status={testimonial.status} />} />
            <DetailItem label="Created" value={formatDate(testimonial.created_at)} />
            <DetailItem label="Updated" value={formatDate(testimonial.updated_at)} />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const DetailItem = ({ label, value }) => (
  <div className="rounded-2xl border bg-background p-4">
    <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
    <div className="mt-2 text-sm font-medium text-foreground">{value}</div>
  </div>
);

const getAssetUrl = (path) => `${import.meta.env.VITE_API_BASE_URL}/storage/${path}`;

const formatDate = (value) => {
  if (!value) return "-";

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
};

export default Testimonials;