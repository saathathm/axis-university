import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Bell, Eye, Search, Trash2 } from "lucide-react";

import {
  deleteNewsletterSubscription,
  getNewsletterSubscriptions,
  updateNewsletterSubscription,
} from "../../features/newsletter/newsletterActions";

const NewsletterSubscriptions = () => {
  const dispatch = useDispatch();

  const { subscriptions = [], loading, error } = useSelector(
    (state) => state.newsletterState,
  );

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
  }, [search, subscriptions]);

  const stats = useMemo(() => ({
    total: subscriptions.length,
    active: subscriptions.filter((subscription) => subscription.status === true)
      .length,
    inactive: subscriptions.filter((subscription) => subscription.status === false)
      .length,
    recent: subscriptions.filter((subscription) => {
      if (!subscription.subscribed_at) return false;

      const subscribedAt = new Date(subscription.subscribed_at);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      return subscribedAt >= thirtyDaysAgo;
    }).length,
  }), [subscriptions]);

  const handleDelete = (subscriptionId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this subscription?",
    );

    if (!confirmed) return;

    dispatch(deleteNewsletterSubscription(subscriptionId)).then(() => {
      dispatch(getNewsletterSubscriptions());
    });
  };

  const handleToggleStatus = (subscription) => {
    dispatch(
      updateNewsletterSubscription(subscription.id, {
        status: !subscription.status,
      }),
    ).then(() => {
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
              Manage email subscribers and control newsletter opt-in status.
            </p>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-accent px-5 py-3 text-sm font-semibold text-accent-foreground shadow-soft transition-smooth hover:opacity-90"
          >
            <Bell className="h-4 w-4" />
            Add Subscription
          </button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        <StatCard title="Total" value={stats.total} />
        <StatCard title="Active" value={stats.active} />
        <StatCard title="Inactive" value={stats.inactive} />
        <StatCard title="Recent 30d" value={stats.recent} />
      </section>

      <section className="rounded-3xl border bg-card p-5 shadow-soft">
        <div className="relative max-w-xl">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search subscribers..."
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
          <h2 className="text-lg font-bold text-primary">Subscriber Records</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Showing {filteredSubscriptions.length} of {subscriptions.length} subscriptions.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-secondary/60 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-5 py-4">Email</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Subscribed</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {loading ? (
                <tr>
                  <td colSpan="4" className="px-5 py-12 text-center text-muted-foreground">
                    Loading subscriptions...
                  </td>
                </tr>
              ) : filteredSubscriptions.length > 0 ? (
                filteredSubscriptions.map((subscription) => (
                  <tr key={subscription.id} className="bg-background">
                    <td className="px-5 py-4 font-medium text-foreground">
                      {subscription.email}
                    </td>

                    <td className="px-5 py-4">
                      <StatusBadge status={subscription.status} />
                    </td>

                    <td className="px-5 py-4 text-muted-foreground">
                      {formatDate(subscription.subscribed_at)}
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
                          onClick={() => handleToggleStatus(subscription)}
                          className="rounded-full border border-accent/30 bg-accent/10 px-3 py-2 text-xs font-semibold text-accent transition-smooth hover:bg-accent/20"
                        >
                          {subscription.status ? "Deactivate" : "Activate"}
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
                  <td colSpan="4" className="px-5 py-12 text-center text-muted-foreground">
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

const StatCard = ({ title, value }) => (
  <div className="rounded-3xl border bg-card p-5 shadow-soft">
    <p className="text-sm text-muted-foreground">{title}</p>
    <h3 className="mt-3 text-3xl font-bold text-primary">{value}</h3>
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

const SubscriptionDetailsModal = ({ subscription, onClose }) => (
  <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/45 p-4">
    <div className="w-full max-w-xl rounded-3xl border bg-card p-6 shadow-soft">
      <div className="flex items-start justify-between gap-4 border-b pb-4">
        <div>
          <h2 className="text-xl font-bold text-primary">Subscription Details</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Review subscriber details and status.
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

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <DetailItem label="Email" value={subscription.email} />
        <DetailItem label="Status" value={<StatusBadge status={subscription.status} />} />
        <DetailItem label="Subscribed" value={formatDate(subscription.subscribed_at)} />
        <DetailItem label="Created" value={formatDate(subscription.created_at)} />
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

const formatDate = (value) => {
  if (!value) return "-";

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
};

export default NewsletterSubscriptions;