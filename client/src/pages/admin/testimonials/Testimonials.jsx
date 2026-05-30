import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Eye,
  MessageSquareQuote,
  Pencil,
  Plus,
  Quote,
  Star,
  Trash2,
  User2,
} from "lucide-react";

import {
  deleteTestimonial,
  getTestimonials,
} from "../../../features/testimonial/testimonialActions";
import StatCard from "../../../components/widgets/StatCard";
import { BASE_URL } from "../../../utils/constants";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../../components/widgets/PageHeader";
import SearchSection from "../../../components/widgets/admin/SearchSection";

const Testimonials = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    testimonials = [],
    loading,
    error,
  } = useSelector((state) => state.testimonialState);

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
  }, [testimonials, search]);

  const stats = useMemo(() => {
    return {
      total: testimonials.length,

      active: testimonials.filter((testimonial) => testimonial.status === true)
        .length,

      inactive: testimonials.filter(
        (testimonial) => testimonial.status === false,
      ).length,

      averageRating:
        testimonials.length > 0
          ? Math.round(
              (testimonials.reduce(
                (sum, testimonial) => sum + (Number(testimonial.rating) || 0),
                0,
              ) /
                testimonials.length) *
                10,
            ) / 10
          : 0,
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
      <PageHeader
        eyebrow="Testimonials"
        title="Testimonial Management"
        description="Manage student, alumni and partner testimonials across the university website."
        buttonText="Add Testimonial"
        buttonIcon={Plus}
        onButtonClick={() => navigate("/admin/testimonials/create")}
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Testimonials"
          value={stats.total}
          icon={MessageSquareQuote}
        />

        <StatCard title="Average Rating" value={stats.averageRating} icon={Star} />

        <StatCard title="Active" value={stats.active} icon={Quote} />

        <StatCard title="Inactive" value={stats.inactive} icon={Trash2} />
      </section>

      <SearchSection
        title="Search Testimonials"
        description="Find testimonials by name, role, course or message."
        search={search}
        setSearch={setSearch}
        placeholder="Search testimonials..."
        error={error}
      />

      <section className="overflow-hidden rounded-3xl border bg-card shadow-soft">
        <div className="border-b px-6 py-5">
          <h2 className="text-lg font-bold text-primary">Testimonials</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Showing {filteredTestimonials.length} testimonials.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[968px] text-left text-sm">
            <thead className="bg-secondary/60 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-5 py-4">Student</th>

                <th className="px-5 py-4">Role</th>

                <th className="px-5 py-4">Course</th>

                <th className="px-5 py-4">Message</th>

                <th className="px-5 py-4">Rating</th>

                <th className="px-5 py-4">Status</th>

                <th className="px-5 py-4">Created</th>

                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {loading ? (
                <tr>
                  <td
                    colSpan="7"
                    className="px-5 py-12 text-center text-muted-foreground"
                  >
                    Loading testimonials...
                  </td>
                </tr>
              ) : filteredTestimonials.length > 0 ? (
                filteredTestimonials.map((testimonial) => (
                  <tr key={testimonial.id}>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-4">
                        {testimonial.photo ? (
                          <img
                            src={`${BASE_URL}/storage/${testimonial.photo}`}
                            alt={testimonial.name}
                            className="h-14 w-14 rounded-2xl object-cover"
                          />
                        ) : (
                          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-soft text-accent">
                            <User2 className="h-7 w-7" />
                          </div>
                        )}

                        <div>
                          <h3 className="font-semibold text-primary">
                            {testimonial.name}
                          </h3>

                          <p className="mt-1 text-xs text-muted-foreground">
                            ID: #{testimonial.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div>
                        <p className="font-medium text-foreground">
                          {testimonial.role || "-"}
                        </p>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-muted-foreground">
                      {testimonial.course}
                    </td>

                    <td className="px-5 py-4">
                      <p className="line-clamp-3 max-w-[320px] leading-6 text-muted-foreground">
                        "{testimonial.message}"
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <RatingBadge rating={testimonial.rating} />
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
                          onClick={() => navigate(`/admin/testimonials/${testimonial.id}/edit`)}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full border bg-card text-foreground transition-smooth hover:bg-secondary"
                        >
                          <Pencil className="h-4 w-4" />
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
                  <td
                    colSpan="7"
                    className="px-5 py-12 text-center text-muted-foreground"
                  >
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

const StatusBadge = ({ status }) => {
  return (
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
};

const FeaturedBadge = ({ featured }) => {
  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${
        featured
          ? "border-warning/20 bg-warning/10 text-warning"
          : "border-border bg-secondary text-muted-foreground"
      }`}
    >
      {featured ? "Featured" : "Normal"}
    </span>
  );
};

const RatingBadge = ({ rating }) => {
  return (
    <span className="inline-flex rounded-full border border-border bg-secondary px-2.5 py-1 text-xs font-semibold text-foreground">
      {rating ? `${rating}/5` : "-"}
    </span>
  );
};

const DetailCard = ({ label, value }) => {
  return (
    <div className="rounded-2xl border bg-background p-4">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">
        {label}
      </p>

      <p className="mt-2 text-sm font-semibold leading-6 text-foreground">
        {value || "-"}
      </p>
    </div>
  );
};

const TestimonialDetailsModal = ({ testimonial, onClose }) => {
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/45 p-4">
      <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl border bg-card p-6 shadow-soft">
        <div className="flex items-start justify-between gap-4 border-b pb-4">
          <div>
            <h2 className="text-xl font-bold text-primary">
              Testimonial Details
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Complete testimonial information and review.
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

        <div className="mt-6 grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
          <div className="rounded-3xl bg-gradient-primary p-6 text-primary-foreground shadow-soft">
            <div className="flex flex-col items-center text-center">
              {testimonial.photo ? (
                <img
                  src={`${BASE_URL}/storage/${testimonial.photo}`}
                  alt={testimonial.name}
                  className="h-32 w-32 rounded-3xl object-cover shadow-soft"
                />
              ) : (
                <div className="flex h-32 w-32 items-center justify-center rounded-3xl bg-white/15">
                  <User2 className="h-14 w-14" />
                </div>
              )}

              <h3 className="mt-6 text-2xl font-bold">{testimonial.name}</h3>

              <p className="mt-2 text-primary-foreground/80">
                {testimonial.role || "-"}
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <StatusBadge status={testimonial.status} />

                <RatingBadge rating={testimonial.rating} />
              </div>
            </div>

            <div className="mt-8 rounded-2xl bg-white/10 p-5">
              <div className="flex items-center gap-2">
                <Quote className="h-5 w-5" />

                <h4 className="font-semibold">Testimonial Quote</h4>
              </div>

              <p className="mt-4 text-sm leading-7 text-primary-foreground/90">
                "{testimonial.message}"
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <DetailCard label="Full Name" value={testimonial.name} />

              <DetailCard label="Role" value={testimonial.role} />

              <DetailCard label="Course" value={testimonial.course} />

              <DetailCard label="Rating" value={testimonial.rating ? `${testimonial.rating}/5` : "-"} />

              <DetailCard
                label="Status"
                value={testimonial.status ? "Active" : "Inactive"}
              />
            </div>

            <div className="rounded-2xl border bg-background p-5">
              <div className="flex items-center gap-2">
                <MessageSquareQuote className="h-5 w-5 text-accent" />

                <h4 className="text-lg font-semibold text-primary">
                  Full Testimonial
                </h4>
              </div>

              <p className="mt-5 whitespace-pre-line text-sm leading-8 text-muted-foreground">
                {testimonial.message}
              </p>
            </div>

            <div className="rounded-2xl border bg-background p-5">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-accent" />

                <h4 className="text-lg font-semibold text-primary">
                  Testimonial Summary
                </h4>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <DetailCard
                  label="Created At"
                  value={formatDate(testimonial.created_at)}
                />

                <DetailCard
                  label="Updated At"
                  value={formatDate(testimonial.updated_at)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const formatDate = (date) => {
  if (!date) return "-";

  return new Date(date).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export default Testimonials;
