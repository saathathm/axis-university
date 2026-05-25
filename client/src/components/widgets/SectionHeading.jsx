const SectionHeading = ({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}) => (
  <div
    className={`max-w-2xl mb-12 ${align === "center" ? "mx-auto text-center" : ""} ${className || ""}`.trim()}
  >
    {eyebrow && (
      <div
        className={`inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-accent ${align === "center" ? "mx-auto" : ""}`}
      >
        <span className="h-px w-8 bg-accent" />
        {eyebrow}
      </div>
    )}
    <h2 className="mt-4 text-3xl md:text-4xl font-bold text-primary">
      {title}
    </h2>
    {description && (
      <p className="mt-4 text-muted-foreground text-base md:text-lg">
        {description}
      </p>
    )}
  </div>
);

export default SectionHeading;
