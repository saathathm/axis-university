const SectionHeading = ({ eyebrow, title, description, align = "center", className }) => (
  <div className={`max-w-2xl mb-10 ${align === "center" ? "mx-auto text-center" : ""} ${className || ""}`.trim()}>
    {eyebrow && (
      <span className="inline-block text-xs font-semibold uppercase tracking-widest text-accent mb-3">{eyebrow}</span>
    )}
    <h2 className="text-3xl md:text-4xl font-bold text-primary">{title}</h2>
    {description && <p className="mt-4 text-muted-foreground text-base md:text-lg">{description}</p>}
  </div>
);

export default SectionHeading;
