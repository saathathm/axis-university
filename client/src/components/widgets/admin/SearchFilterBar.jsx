import { Search } from "lucide-react";

const SearchFilterBar = ({
  search,
  setSearch,
  searchPlaceholder = "Search...",
  statusFilter,
  setStatusFilter,
  statusOptions = [],
  error,
  message,
  filterAllName = "All Status",
}) => {
  const displayMessage =
    message ||
    (error
      ? {
          type: "error",
          message: error,
        }
      : null);

  return (
    <section className="rounded-3xl border bg-card p-5 shadow-soft">
      <div
        className={`grid gap-4 ${
          statusOptions.length > 0 ? "lg:grid-cols-[minmax(0,1fr)_220px]" : ""
        }`}
      >
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={searchPlaceholder}
            className="w-full rounded-2xl border bg-background px-11 py-3 text-sm outline-none transition-smooth focus:border-accent"
          />
        </div>

        {statusOptions.length > 0 && (
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="rounded-2xl border bg-background px-4 py-3 text-sm outline-none transition-smooth focus:border-accent"
          >
            <option value="">{filterAllName}</option>

            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}
      </div>

      {displayMessage && (
        <div
          className={`mt-4 rounded-2xl border px-4 py-3 text-sm ${
            displayMessage.type === "error"
              ? "border-destructive/30 bg-destructive/10 text-destructive"
              : "border-success/30 bg-success/10 text-success"
          }`}
        >
          {displayMessage.message}
        </div>
      )}
    </section>
  );
};

export default SearchFilterBar;
