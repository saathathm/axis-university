import { useDispatch, useSelector } from "react-redux";
import { LogOut } from "lucide-react";

import { logout } from "../../features/auth/authActions";

const AdminHeader = () => {
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.authState);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 px-4 py-4 backdrop-blur md:px-6 lg:px-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            Admin Panel
          </p>

          <h1 className="text-lg font-bold text-primary">
            Axis University Portal
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold text-foreground">
              {user?.name || "Admin"}
            </p>

            <p className="text-xs text-muted-foreground">
              {user?.email || "admin"}
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm font-semibold text-foreground transition-smooth hover:bg-secondary disabled:opacity-60"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
