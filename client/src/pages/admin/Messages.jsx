import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Eye, Mail, Search, Trash2 } from "lucide-react";

import {
  clearMessageDetails,
  clearMessageError,
} from "../../features/message/messageSlice";
import {
  deleteMessage,
  getMessageDetails,
  getMessages,
  updateMessage,
} from "../../features/message/messageActions";

const Messages = () => {
  const dispatch = useDispatch();

  const { messages = [], messageDetails, loading, error } = useSelector(
    (state) => state.messageState,
  );

  const [search, setSearch] = useState("");
  const [selectedMessageId, setSelectedMessageId] = useState(null);

  useEffect(() => {
    dispatch(getMessages());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      dispatch(clearMessageError());
    }
  }, [dispatch, error]);

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
      unread: messages.filter((message) => message.status === "unread").length,
      read: messages.filter((message) => message.status === "read").length,
      replied: messages.filter((message) => message.status === "replied").length,
    };
  }, [messages]);

  const openMessage = (messageId) => {
    setSelectedMessageId(messageId);
    dispatch(getMessageDetails(messageId));
  };

  const closeMessage = () => {
    setSelectedMessageId(null);
    dispatch(clearMessageDetails());
  };

  const handleDelete = (messageId) => {
    const confirmed = window.confirm("Are you sure you want to delete this message?");

    if (!confirmed) return;

    dispatch(deleteMessage(messageId)).then(() => {
      dispatch(getMessages());
    });
  };

  const handleStatusUpdate = (messageId, status) => {
    dispatch(updateMessage(messageId, { status })).then(() => {
      dispatch(getMessages());

      if (selectedMessageId === messageId) {
        dispatch(getMessageDetails(messageId));
      }
    });
  };

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border bg-card p-6 shadow-soft">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              Messages
            </p>

            <h1 className="mt-2 text-2xl font-bold text-primary md:text-3xl">
              Message Inbox
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Review enquiries, track replies, and manage contact form messages.
            </p>
          </div>

          <div className="rounded-2xl border bg-background px-4 py-3 text-sm text-muted-foreground">
            Contact form submissions
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        <StatCard title="Total" value={stats.total} />
        <StatCard title="Unread" value={stats.unread} />
        <StatCard title="Read" value={stats.read} />
        <StatCard title="Replied" value={stats.replied} />
      </section>

      <section className="rounded-3xl border bg-card p-5 shadow-soft">
        <div className="relative max-w-xl">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search messages..."
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
          <h2 className="text-lg font-bold text-primary">Message Records</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Showing {filteredMessages.length} of {messages.length} messages.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1200px] text-left text-sm">
            <thead className="bg-secondary/60 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-5 py-4">Sender</th>
                <th className="px-5 py-4">Subject</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Received</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-5 py-12 text-center text-muted-foreground">
                    Loading messages...
                  </td>
                </tr>
              ) : filteredMessages.length > 0 ? (
                filteredMessages.map((message) => (
                  <tr key={message.id} className="bg-background">
                    <td className="px-5 py-4">
                      <div>
                        <h3 className="font-semibold text-foreground">{message.name}</h3>
                        <p className="mt-1 text-xs text-muted-foreground">{message.email}</p>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="font-medium text-foreground">{message.subject}</div>
                      <p className="mt-2 line-clamp-2 max-w-[420px] text-xs text-muted-foreground">
                        {message.message}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <StatusBadge status={message.status} />
                    </td>

                    <td className="px-5 py-4 text-muted-foreground">
                      {formatDate(message.created_at)}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => openMessage(message.id)}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full border bg-card text-foreground transition-smooth hover:bg-secondary"
                        >
                          <Eye className="h-4 w-4" />
                        </button>

                        {message.status === "unread" && (
                          <button
                            type="button"
                            onClick={() => handleStatusUpdate(message.id, "read")}
                            className="rounded-full border border-success/30 bg-success/10 px-3 py-2 text-xs font-semibold text-success transition-smooth hover:bg-success/20"
                          >
                            Mark Read
                          </button>
                        )}

                        {message.status === "read" && (
                          <button
                            type="button"
                            onClick={() => handleStatusUpdate(message.id, "replied")}
                            className="rounded-full border border-accent/30 bg-accent/10 px-3 py-2 text-xs font-semibold text-accent transition-smooth hover:bg-accent/20"
                          >
                            Mark Replied
                          </button>
                        )}

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
                  <td colSpan="5" className="px-5 py-12 text-center text-muted-foreground">
                    No messages found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {selectedMessageId && messageDetails && (
        <MessageDetailsModal message={messageDetails} onClose={closeMessage} />
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

const StatusBadge = ({ status }) => {
  const styles = {
    unread: "border-warning/20 bg-warning/10 text-warning",
    read: "border-success/20 bg-success/10 text-success",
    replied: "border-accent/20 bg-accent/10 text-accent",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${
        styles[status] || "border-border bg-secondary text-muted-foreground"
      }`}
    >
      {status || "unknown"}
    </span>
  );
};

const MessageDetailsModal = ({ message, onClose }) => (
  <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/45 p-4">
    <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border bg-card p-6 shadow-soft">
      <div className="flex items-start justify-between gap-4 border-b pb-4">
        <div>
          <h2 className="text-xl font-bold text-primary">Message Details</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Review the full enquiry and update the response status.
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

      <div className="mt-6 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <DetailItem label="Name" value={message.name} />
          <DetailItem label="Email" value={message.email} />
          <DetailItem label="Subject" value={message.subject} />
          <DetailItem label="Status" value={<StatusBadge status={message.status} />} />
        </div>

        <div className="rounded-2xl border bg-background p-5">
          <p className="text-sm font-semibold text-primary">Message</p>
          <p className="mt-2 whitespace-pre-line text-sm leading-7 text-muted-foreground">
            {message.message}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <DetailItem label="Received" value={formatDate(message.created_at)} />
          <DetailItem label="Read At" value={formatDate(message.read_at)} />
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

export default Messages;