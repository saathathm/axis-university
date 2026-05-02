const PageHero = ({ title, subtitle, image }) => (
  <section className="relative bg-gradient-primary text-primary-foreground py-20 md:py-28 overflow-hidden">
    {image && (
      <img src={image} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-20" />
    )}
    <div className="absolute inset-0 bg-gradient-hero" aria-hidden="true" />
    <div className="container relative text-center animate-fade-in-up">
      <h1 className="text-4xl md:text-5xl font-extrabold">{title}</h1>
      {subtitle && <p className="mt-4 text-lg text-primary-foreground/85 max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  </section>
);

export default PageHero;
