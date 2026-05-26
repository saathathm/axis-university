import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Calendar,
  Eye,
  Mail,
  MailCheck,
  MessageSquare,
  Phone,
  Search,
  Trash2,
  User2,
} from "lucide-react";

import {
  deleteMessage,
  getMessages,
} from "../../features/message/messageActions";
import StatCard from "../../components/widgets/StatCard";

const Messages = () => {
  const dispatch = useDispatch();

  const {
    messages = [],
    loading,
    error,
  } = useSelector((state) => state.messageState);

  const [search, setSearch] = useState("");

  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    dispatch(getMessages());
  }, [dispatch]);

  const filteredMessages = useMemo(() => {
    return messages.filter((message) => {
      const searchText = search.trim().toLowerCase();

      if (!searchText) return true;

      return (
        message.name?.toLowerCase().includes(searchText) ||
        message.email?.toLowerCase().includes(searchText) ||
        message.subject?.toLowerCase().includes(searchText) ||
        message.message?.toLowerCase().includes(searchText)
      );
    });
  }, [messages, search]);

  const stats = useMemo(() => {
    return {
      total: messages.length,

      unread: messages.filter((message) => !message.is_read).length,

      read: messages.filter((message) => message.is_read).length,

      today: messages.filter((message) => {
        const today = new Date().toDateString();

        return new Date(message.created_at).toDateString() === today;
      }).length,
    };
  }, [messages]);

  const handleDelete = (messageId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this message?",
    );

    if (!confirmed) return;

    dispatch(deleteMessage(messageId)).then(() => {
      dispatch(getMessages());
    });
  };

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border bg-card p-6 shadow-soft">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              Contact Messages
            </p>

            <h1 className="mt-2 text-2xl font-bold text-primary md:text-3xl">
              Message Management
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Manage student, parent and visitor contact inquiries from the
              university website.
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Messages" value={stats.total} icon={Mail} />

        <StatCard title="Unread" value={stats.unread} icon={MessageSquare} />

        <StatCard title="Read" value={stats.read} icon={MailCheck} />

        <StatCard title="Today" value={stats.today} icon={Calendar} />
      </section>

      <section className="rounded-3xl border bg-card p-5 shadow-soft">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-lg font-bold text-primary">Search Messages</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Search by sender, email, subject or message content.
            </p>
          </div>

          <div className="relative w-full max-w-md">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search messages..."
              className="w-full rounded-2xl border bg-background px-11 py-3 text-sm outline-none transition-smooth focus:border-accent"
            />
          </div>
        </div>

        {error && (
          <div className="mt-4 rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        )}
      </section>

      <section className="overflow-hidden rounded-3xl border bg-card shadow-soft">
        <div className="border-b px-6 py-5">
          <h2 className="text-lg font-bold text-primary">Incoming Messages</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Showing {filteredMessages.length} messages from visitors and
            students.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1200px] text-left text-sm">
            <thead className="bg-secondary/60 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-5 py-4">Sender</th>

                <th className="px-5 py-4">Subject</th>

                <th className="px-5 py-4">Message</th>

                <th className="px-5 py-4">Status</th>

                <th className="px-5 py-4">Date</th>

                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {loading ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-5 py-12 text-center text-muted-foreground"
                  >
                    Loading messages...
                  </td>
                </tr>
              ) : filteredMessages.length > 0 ? (
                filteredMessages.map((message) => (
                  <tr
                    key={message.id}
                    className={`transition-smooth hover:bg-secondary/30 ${
                      !message.is_read ? "bg-accent-soft/20" : ""
                    }`}
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-soft text-accent">
                          <User2 className="h-7 w-7" />
                        </div>

                        <div>
                          <h3 className="font-semibold text-primary">
                            {message.name}
                          </h3>

                          <a
                            href={`mailto:${message.email}`}
                            className="mt-1 block text-xs text-muted-foreground hover:text-accent"
                          >
                            {message.email}
                          </a>

                          {message.phone && (
                            <a
                              href={`tel:${message.phone}`}
                              className="mt-1 block text-xs text-muted-foreground hover:text-accent"
                            >
                              {message.phone}
                            </a>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <p className="max-w-[220px] font-medium text-primary">
                        {message.subject}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <p className="line-clamp-3 max-w-[420px] leading-6 text-muted-foreground">
                        {message.message}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <StatusBadge isRead={message.is_read} />
                    </td>

                    <td className="px-5 py-4 text-muted-foreground">
                      {formatDate(message.created_at)}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedMessage(message)}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full border bg-card text-foreground transition-smooth hover:bg-secondary"
                        >
                          <Eye className="h-4 w-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(message.id)}
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
                    colSpan="6"
                    className="px-5 py-12 text-center text-muted-foreground"
                  >
                    No messages found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {selectedMessage && (
        <MessageDetailsModal
          message={selectedMessage}
          onClose={() => setSelectedMessage(null)}
        />
      )}
    </div>
  );
};

const StatusBadge = ({ isRead }) => {
  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${
        isRead
          ? "border-success/20 bg-success/10 text-success"
          : "border-warning/20 bg-warning/10 text-warning"
      }`}
    >
      {isRead ? "Read" : "Unread"}
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

const MessageDetailsModal = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/45 p-4">
      <div className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-3xl border bg-card p-6 shadow-soft">
        <div className="flex items-start justify-between gap-4 border-b pb-4">
          <div>
            <h2 className="text-xl font-bold text-primary">Message Details</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Full contact message details and sender information.
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
            <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-white/10">
              <User2 className="h-12 w-12" />
            </div>

            <div className="mt-6">
              <p className="text-xs uppercase tracking-[0.3em] text-primary-foreground/70">
                Sender
              </p>

              <h3 className="mt-3 text-2xl font-bold">{message.name}</h3>

              <div className="mt-5">
                <StatusBadge isRead={message.is_read} />
              </div>
            </div>

            <div className="mt-8 space-y-5">
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary-foreground/80" />

                <div>
                  <p className="text-xs uppercase tracking-wide text-primary-foreground/70">
                    Email
                  </p>

                  <a
                    href={`mailto:${message.email}`}
                    className="mt-1 block font-semibold hover:underline"
                  >
                    {message.email}
                  </a>
                </div>
              </div>

              {message.phone && (
                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-primary-foreground/80" />

                  <div>
                    <p className="text-xs uppercase tracking-wide text-primary-foreground/70">
                      Phone
                    </p>

                    <a
                      href={`tel:${message.phone}`}
                      className="mt-1 block font-semibold hover:underline"
                    >
                      {message.phone}
                    </a>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3">
                <Calendar className="mt-0.5 h-5 w-5 shrink-0 text-primary-foreground/80" />

                <div>
                  <p className="text-xs uppercase tracking-wide text-primary-foreground/70">
                    Received
                  </p>

                  <p className="mt-1 font-semibold">
                    {formatDate(message.created_at)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border bg-background p-5">
              <h4 className="text-lg font-semibold text-primary">Subject</h4>

              <p className="mt-4 text-base font-medium leading-7 text-foreground">
                {message.subject}
              </p>
            </div>

            <div className="rounded-2xl border bg-background p-5">
              <h4 className="text-lg font-semibold text-primary">Message</h4>

              <p className="mt-5 whitespace-pre-line text-sm leading-8 text-muted-foreground">
                {message.message}
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <DetailCard label="Message ID" value={`#${message.id}`} />

              <DetailCard
                label="Status"
                value={message.is_read ? "Read" : "Unread"}
              />

              <DetailCard
                label="Created At"
                value={formatDate(message.created_at)}
              />

              <DetailCard
                label="Updated At"
                value={formatDate(message.updated_at)}
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={`mailto:${message.email}`}
                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-accent px-5 py-3 text-sm font-semibold text-accent-foreground shadow-soft transition-smooth hover:opacity-90"
              >
                <Mail className="h-4 w-4" />
                Reply Email
              </a>

              {message.phone && (
                <a
                  href={`tel:${message.phone}`}
                  className="inline-flex items-center gap-2 rounded-2xl border bg-background px-5 py-3 text-sm font-semibold transition-smooth hover:bg-secondary"
                >
                  <Phone className="h-4 w-4" />
                  Call Sender
                </a>
              )}
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

export default Messages;
