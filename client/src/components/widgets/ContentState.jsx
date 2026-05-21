import { AlertCircle, Loader2 } from "lucide-react";

export const LoadingState = ({ label = "Loading content..." }) => (
  <div className="rounded-2xl border bg-card p-8 text-center text-sm text-muted-foreground shadow-soft">
    <Loader2 className="mx-auto mb-3 h-5 w-5 animate-spin text-accent" />
    {label}
  </div>
);

export const EmptyState = ({ title = "No content available.", description }) => (
  <div className="rounded-2xl border border-dashed bg-card p-10 text-center shadow-soft">
    <AlertCircle className="mx-auto mb-3 h-6 w-6 text-muted-foreground" />
    <h3 className="font-semibold text-primary">{title}</h3>
    {description && <p className="mt-2 text-sm text-muted-foreground">{description}</p>}
  </div>
);
