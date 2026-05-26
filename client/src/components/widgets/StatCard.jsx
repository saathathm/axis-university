const StatCard = ({ title, value, icon: Icon }) => {
  return (
    <div className="rounded-3xl border bg-card p-5 shadow-soft">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>

          <h3 className="mt-3 text-3xl font-bold text-primary">{value}</h3>
        </div>

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-soft text-accent">
          <Icon className="h-7 w-7" />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
