import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import Layout from "@/components/layout/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-background py-20">
        <div
          aria-hidden="true"
          className="absolute -left-20 top-16 h-72 w-72 rounded-full bg-accent/20 blur-3xl"
        />

        <div
          aria-hidden="true"
          className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-primary-glow/40 blur-3xl"
        />

        <div className="relative max-w-lg px-6 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-secondary/40 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Lost in the stacks
          </span>

          <h1 className="mt-6 text-5xl font-extrabold text-primary md:text-6xl">
            404
          </h1>

          <p className="mt-4 text-lg text-muted-foreground">
            Oops! We cannot find that page. Try heading back to campus.
          </p>

          <Link
            to="/"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-gradient-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-glow"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
