import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "@/components/layout/Layout";
import PageHero from "@/components/shared/PageHero";
import { EmptyState, LoadingState } from "@/components/shared/ContentState";
import { Search, Clock, BookOpen, X } from "lucide-react";
import { Link } from "react-router-dom";
import { fetchFaculties, fetchPrograms } from "@/store/actions/contentActions.js";

const Academics = () => {
  const [q, setQ] = useState("");
  const [selectedFaculties, setSelectedFaculties] = useState([]);
  const dispatch = useDispatch();
  const faculties = useSelector((state) => state.content.faculties);
  const programs = useSelector((state) => state.content.programs);
  const facultiesStatus = useSelector((state) => state.content.status.faculties);
  const programsStatus = useSelector((state) => state.content.status.programs);

  useEffect(() => {
    if (facultiesStatus === "idle") {
      dispatch(fetchFaculties());
    }
    if (programsStatus === "idle") {
      dispatch(fetchPrograms());
    }
  }, [dispatch, facultiesStatus, programsStatus]);

  const toggle = (arr, set, v) =>
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const filtered = useMemo(() => {
    return programs.filter((p) => {
      if (q && !p.title.toLowerCase().includes(q.toLowerCase())) return false;
      if (selectedFaculties.length && !selectedFaculties.includes(p.faculty)) return false;
      return true;
    });
  }, [q, selectedFaculties, programs]);

  const clear = () => { setQ(""); setSelectedFaculties([]); };
  const hasFilters = q || selectedFaculties.length;

  return (
    <Layout>
      <PageHero title="Academic Programs" subtitle="Explore our full catalog of diplomas, bachelor's, master's and doctoral programs." />
      <section className="py-12">
        <div className="container grid gap-8 md:grid-cols-[280px_minmax(0,1fr)] items-start">
          <aside className="space-y-6 md:sticky md:top-24">
            <div className="rounded-2xl border bg-card p-5 shadow-soft">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search programs..."
                  maxLength={100}
                  className="w-full rounded-md border border-input bg-background py-2 pl-9 pr-3 text-sm"
                />
              </div>
            </div>

            <div className="rounded-2xl border bg-card p-5 shadow-soft">
              <h3 className="font-semibold text-primary mb-3">Faculty</h3>
              <div className="space-y-2">
                {faculties.map((f) => (
                  <label key={f.id} className="flex items-center gap-2 cursor-pointer text-sm">
                    <input
                      type="checkbox"
                      checked={selectedFaculties.includes(f.id)}
                      onChange={() => toggle(selectedFaculties, setSelectedFaculties, f.id)}
                      className="h-4 w-4 rounded accent-primary"
                    />
                    <span>{f.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {hasFilters ? (
              <button
                type="button"
                onClick={clear}
                className="w-full inline-flex items-center justify-center gap-2 rounded-md border px-3 py-2 text-sm text-foreground/80 hover:bg-secondary transition-smooth"
              >
                <X className="h-4 w-4" /> Clear filters
              </button>
            ) : null}
          </aside>

          <div className="min-w-0">
            <div className="mb-4 text-sm text-muted-foreground">{filtered.length} program{filtered.length !== 1 && "s"} found</div>
            {programsStatus === "loading" ? <LoadingState label="Loading programs..." /> : null}
            {programsStatus !== "loading" && programs.length === 0 ? (
              <EmptyState title="No programs available." description="Create programs from the admin panel." />
            ) : null}
            {programsStatus !== "loading" && programs.length > 0 && filtered.length === 0 ? (
              <div className="rounded-2xl border border-dashed bg-card p-12 text-center">
                <BookOpen className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">No programs match your filters. Try adjusting your search.</p>
              </div>
            ) : null}
            {filtered.length > 0 ? (
              <div className="grid gap-5 md:grid-cols-2">
                {filtered.map((p) => {
                  const f = faculties.find((x) => x.id === p.faculty) || { name: "" };
                  return (
                    <article key={p.id} className="rounded-2xl border bg-card p-6 shadow-soft hover:shadow-elegant hover:-translate-y-0.5 transition-smooth">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="inline-flex items-center rounded-full bg-accent-soft px-2.5 py-1 text-xs font-semibold text-accent">
                          {p.level}
                        </span>
                        <span className="inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />{p.duration}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-primary mb-1">{p.title}</h3>
                      <p className="text-xs text-muted-foreground mb-2">{f.name}</p>
                      <p className="text-sm text-muted-foreground mb-4">{p.description}</p>
                      <Link
                        to={`/academics/${p.id}`}
                        className="inline-flex items-center justify-center rounded-md bg-gradient-accent px-4 py-2 text-xs font-semibold text-accent-foreground"
                      >
                        View Course
                      </Link>
                    </article>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Academics;
