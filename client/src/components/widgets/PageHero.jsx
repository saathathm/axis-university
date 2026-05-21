const PageHero = ({ title, subtitle, image }) => (
  <section className="relative overflow-hidden bg-gradient-primary py-24 text-primary-foreground md:py-32">
    {image && (
      <img src={image} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-20" />
    )}
    <div className="absolute inset-0 bg-gradient-hero" aria-hidden="true" />
    <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-primary-glow/40 blur-3xl" aria-hidden="true" />
    <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-accent/30 blur-3xl" aria-hidden="true" />
    <div className="container relative">
      <div className="max-w-3xl text-center md:text-left animate-fade-in-up">
        <span className="inline-flex items-center gap-2 rounded-full bg-background/20 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-primary-foreground">
          Axis University
        </span>
        <h1 className="mt-4 text-4xl md:text-6xl font-extrabold leading-tight">{title}</h1>
        {subtitle && <p className="mt-4 text-lg text-primary-foreground/85 max-w-2xl">{subtitle}</p>}
      </div>
    </div>
  </section>
);

export default PageHero;
