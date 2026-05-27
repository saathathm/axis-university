import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Calendar,
  Eye,
  Mail,
  MailCheck,
  Search,
  Trash2,
  Users,
} from "lucide-react";

import {
  deleteNewsletterSubscription,
  getNewsletterSubscriptions,
} from "../../features/newsletter/newsletterActions";
import StatCard from "../../components/widgets/StatCard";
import SearchSection from "../../components/widgets/admin/SearchSection";

const NewsletterSubscriptions = () => {
  const dispatch = useDispatch();

  const {
    subscriptions = [],
    loading,
    error,
  } = useSelector((state) => state.newsletterState);

  const [search, setSearch] = useState("");
  const [selectedSubscription, setSelectedSubscription] = useState(null);

  useEffect(() => {
    dispatch(getNewsletterSubscriptions());
  }, [dispatch]);

  const filteredSubscriptions = useMemo(() => {
    return subscriptions.filter((subscription) => {
      const searchText = search.trim().toLowerCase();

      if (!searchText) return true;

      return subscription.email?.toLowerCase().includes(searchText);
    });
  }, [subscriptions, search]);

  const stats = useMemo(() => {
    return {
      total: subscriptions.length,

      active: subscriptions.filter(
        (subscription) => subscription.status === true,
      ).length,

      inactive: subscriptions.filter(
        (subscription) => subscription.status === false,
      ).length,

      today: subscriptions.filter((subscription) => {
        const today = new Date().toDateString();

        return new Date(subscription.created_at).toDateString() === today;
      }).length,
    };
  }, [subscriptions]);

  const handleDelete = (subscriptionId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this subscription?",
    );

    if (!confirmed) return;

    dispatch(deleteNewsletterSubscription(subscriptionId)).then(() => {
      dispatch(getNewsletterSubscriptions());
    });
  };

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border bg-card p-6 shadow-soft">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              Newsletter
            </p>

            <h1 className="mt-2 text-2xl font-bold text-primary md:text-3xl">
              Newsletter Subscriptions
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Manage newsletter subscribers and monitor university email
              engagement.
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Subscribers" value={stats.total} icon={Users} />

        <StatCard title="Active" value={stats.active} icon={MailCheck} />

        <StatCard title="Inactive" value={stats.inactive} icon={Trash2} />

        <StatCard title="Today" value={stats.today} icon={Calendar} />
      </section>
      <SearchSection
        title="Search Subscribers"
        description="Find newsletter subscribers by email address."
        search={search}
        setSearch={setSearch}
        placeholder="Search email..."
        error={error}
      />

      <section className="overflow-hidden rounded-3xl border bg-card shadow-soft">
        <div className="border-b px-6 py-5">
          <h2 className="text-lg font-bold text-primary">Subscriber List</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Showing {filteredSubscriptions.length} newsletter subscriptions.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] text-left text-sm">
            <thead className="bg-secondary/60 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-5 py-4">Subscriber</th>

                <th className="px-5 py-4">Status</th>

                <th className="px-5 py-4">Created</th>

                <th className="px-5 py-4">Updated</th>

                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {loading ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-5 py-12 text-center text-muted-foreground"
                  >
                    Loading subscriptions...
                  </td>
                </tr>
              ) : filteredSubscriptions.length > 0 ? (
                filteredSubscriptions.map((subscription) => (
                  <tr key={subscription.id}>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-soft text-accent">
                          <Mail className="h-7 w-7" />
                        </div>

                        <div>
                          <a
                            href={`mailto:${subscription.email}`}
                            className="font-semibold text-primary hover:text-accent"
                          >
                            {subscription.email}
                          </a>

                          <p className="mt-1 text-xs text-muted-foreground">
                            Subscriber ID: #{subscription.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <StatusBadge status={subscription.status} />
                    </td>

                    <td className="px-5 py-4 text-muted-foreground">
                      {formatDate(subscription.created_at)}
                    </td>

                    <td className="px-5 py-4 text-muted-foreground">
                      {formatDate(subscription.updated_at)}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedSubscription(subscription)}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full border bg-card text-foreground transition-smooth hover:bg-secondary"
                        >
                          <Eye className="h-4 w-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(subscription.id)}
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
                    colSpan="5"
                    className="px-5 py-12 text-center text-muted-foreground"
                  >
                    No subscriptions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {selectedSubscription && (
        <SubscriptionDetailsModal
          subscription={selectedSubscription}
          onClose={() => setSelectedSubscription(null)}
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

const DetailCard = ({ label, value }) => {
  return (
    <div className="rounded-2xl border bg-background p-4">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">
        {label}
      </p>

      <p className="mt-2 break-words text-sm font-semibold leading-6 text-foreground">
        {value || "-"}
      </p>
    </div>
  );
};

const SubscriptionDetailsModal = ({ subscription, onClose }) => {
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/45 p-4">
      <div className="w-full max-w-3xl rounded-3xl border bg-card p-6 shadow-soft">
        <div className="flex items-start justify-between gap-4 border-b pb-4">
          <div>
            <h2 className="text-xl font-bold text-primary">
              Subscription Details
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Newsletter subscriber information and activity details.
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

        <div className="mt-6 grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <div className="rounded-3xl bg-gradient-primary p-6 text-primary-foreground shadow-soft">
            <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-white/10">
              <Mail className="h-12 w-12" />
            </div>

            <div className="mt-6">
              <p className="text-xs uppercase tracking-[0.3em] text-primary-foreground/70">
                Subscriber
              </p>

              <h3 className="mt-3 break-words text-2xl font-bold">
                {subscription.email}
              </h3>

              <div className="mt-5">
                <StatusBadge status={subscription.status} />
              </div>
            </div>

            <div className="mt-8">
              <a
                href={`mailto:${subscription.email}`}
                className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-5 py-3 text-sm font-semibold transition-smooth hover:bg-white/20"
              >
                <Mail className="h-4 w-4" />
                Send Email
              </a>
            </div>
          </div>

          <div className="space-y-5">
            <div className="grid gap-4 md:grid-cols-2">
              <DetailCard label="Subscriber ID" value={`#${subscription.id}`} />

              <DetailCard
                label="Status"
                value={subscription.status ? "Active" : "Inactive"}
              />

              <DetailCard
                label="Created At"
                value={formatDate(subscription.created_at)}
              />

              <DetailCard
                label="Updated At"
                value={formatDate(subscription.updated_at)}
              />
            </div>

            <div className="rounded-2xl border bg-background p-5">
              <h4 className="text-lg font-semibold text-primary">
                Subscription Summary
              </h4>

              <p className="mt-4 text-sm leading-8 text-muted-foreground">
                This subscriber is registered to receive university newsletters,
                admission updates, announcements, events and other institutional
                communications.
              </p>
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

export default NewsletterSubscriptions;
