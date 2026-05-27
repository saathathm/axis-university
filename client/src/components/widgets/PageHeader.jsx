const PageHeader = ({
  eyebrow,
  title,
  description,
  buttonText,
  buttonIcon: ButtonIcon,
  onButtonClick,
}) => {
  return (
    <section className="rounded-3xl border bg-card p-6 shadow-soft">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          {eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              {eyebrow}
            </p>
          )}

          <h1 className="mt-2 text-2xl font-bold text-primary md:text-3xl">
            {title}
          </h1>

          {description && (
            <p className="mt-2 text-sm text-muted-foreground">{description}</p>
          )}
        </div>

        {buttonText && (
          <button
            type="button"
            onClick={onButtonClick}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-accent px-5 py-3 text-sm font-semibold text-accent-foreground shadow-soft transition-smooth hover:opacity-90"
          >
            {ButtonIcon && <ButtonIcon className="h-4 w-4" />}

            {buttonText}
          </button>
        )}
      </div>
    </section>
  );
};

export default PageHeader;
