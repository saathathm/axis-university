import { useSelector } from "react-redux";
import AdminLayout from "@/components/admin/AdminLayout";

const Dashboard = () => {
  const applications = useSelector((state) => state.application.adminApplications);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="rounded-3xl border bg-card p-8 shadow-soft">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">Overview</p>
          <h1 className="mt-2 text-3xl font-bold text-primary">Admin Dashboard</h1>
          <p className="mt-3 text-muted-foreground">Manage applications, students, and academic content from one place.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border bg-card p-6 shadow-soft">
            <div className="text-sm text-muted-foreground">Applications loaded</div>
            <div className="mt-2 text-3xl font-bold text-primary">{applications.length}</div>
          </div>
          <div className="rounded-2xl border bg-card p-6 shadow-soft">
            <div className="text-sm text-muted-foreground">Admin user</div>
            <div className="mt-2 text-3xl font-bold text-primary">1</div>
          </div>
          <div className="rounded-2xl border bg-card p-6 shadow-soft">
            <div className="text-sm text-muted-foreground">Workflow</div>
            <div className="mt-2 text-3xl font-bold text-primary">Live</div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;