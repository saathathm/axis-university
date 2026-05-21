import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BookOpen, Clock, Search, X } from "lucide-react";

import Layout from "@/components/layout/Layout";
import PageHero from "@/components/widgets/PageHero";
import { EmptyState, LoadingState } from "@/components/widgets/ContentState";
import { fetchFaculties } from "@/actions/facultyAction";
import { fetchPrograms } from "@/actions/programAction";

function Academics() {
  const dispatch = useDispatch();
  const { faculties, loading: facultyLoading, isLoaded: facultyLoaded } =
    useSelector((state) => state.faculty);
  const { programs, loading: programLoading, isLoaded: programLoaded } =
    useSelector((state) => state.program);

  const [search, setSearch] = useState("");
  const [selectedFaculties, setSelectedFaculties] = useState([]);

  useEffect(() => {
    if (!facultyLoading && !facultyLoaded) {
      dispatch(fetchFaculties());
    }

    if (!programLoading && !programLoaded) {
      dispatch(fetchPrograms());
    }
  }, [dispatch, facultyLoading, facultyLoaded, programLoading, programLoaded]);

  const handleFaculty = (facultyId) => {
    setSelectedFaculties((prev) =>
      prev.includes(facultyId)
        ? prev.filter((id) => id !== facultyId)
        : [...prev, facultyId]
    );
  };

  const handleClear = () => {
    setSearch("");
    setSelectedFaculties([]);
  };

  const filteredPrograms = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return programs.filter((program) => {
      const isSearchMatched =
        !keyword || program.title.toLowerCase().includes(keyword);
      const isFacultyMatched =
        selectedFaculties.length === 0 ||
        selectedFaculties.includes(program.faculty);

      return isSearchMatched && isFacultyMatched;
    });
  }, [programs, search, selectedFaculties]);

  const hasFilters = search || selectedFaculties.length > 0;

  return (
    <Layout>
      <PageHero
        title="Academic Programs"
        subtitle="Explore our full catalog of diplomas, bachelor's, master's and doctoral programs."
      />

      <section className="py-12">
        <div className="container grid items-start gap-8 md:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="space-y-6 md:sticky md:top-24">
            <div className="rounded-2xl border bg-card p-5 shadow-soft">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search programs..."
                  maxLength={100}
                  className="w-full rounded-md border border-input bg-background py-2 pl-9 pr-3 text-sm"
                />
              </div>
            </div>

            <div className="rounded-2xl border bg-card p-5 shadow-soft">
              <h3 className="mb-3 font-semibold text-primary">Faculty</h3>

              <div className="space-y-2">
                {faculties.map((faculty) => (
                  <label
                    key={faculty.id}
                    className="flex cursor-pointer items-center gap-2 text-sm"
                  >
                    <input
                      type="checkbox"
                      checked={selectedFaculties.includes(faculty.id)}
                      onChange={() => handleFaculty(faculty.id)}
                      className="h-4 w-4 rounded accent-primary"
                    />
                    <span>{faculty.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {hasFilters && (
              <button
                type="button"
                onClick={handleClear}
                className="inline-flex w-full items-center justify-center gap-2 rounded-md border px-3 py-2 text-sm text-foreground/80 transition-smooth hover:bg-secondary"
              >
                <X className="h-4 w-4" />
                Clear filters
              </button>
            )}
          </aside>

          <div className="min-w-0">
            <div className="mb-4 text-sm text-muted-foreground">
              {filteredPrograms.length} program
              {filteredPrograms.length !== 1 && "s"} found
            </div>

            {programLoading && <LoadingState label="Loading programs..." />}

            {!programLoading && programs.length === 0 && (
              <EmptyState
                title="No programs available."
                description="Create programs from the admin panel."
              />
            )}

            {!programLoading && programs.length > 0 && filteredPrograms.length === 0 && (
              <div className="rounded-2xl border border-dashed bg-card p-12 text-center">
                <BookOpen className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />
                <p className="text-muted-foreground">
                  No programs match your filters. Try adjusting your search.
                </p>
              </div>
            )}

            {filteredPrograms.length > 0 && (
              <div className="grid gap-5 md:grid-cols-2">
                {filteredPrograms.map((program) => {
                  const faculty = faculties.find(
                    (item) => item.id === program.faculty
                  );

                  return (
                    <article
                      key={program.id}
                      className="rounded-2xl border bg-card p-6 shadow-soft transition-smooth hover:-translate-y-0.5 hover:shadow-elegant"
                    >
                      <div className="mb-3 flex items-center gap-2">
                        <span className="inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold text-muted-foreground">
                          <Clock className="mr-1 h-3 w-3" />
                          {program.duration}
                        </span>
                      </div>

                      <h3 className="mb-1 text-lg font-semibold text-primary">
                        {program.title}
                      </h3>
                      <p className="mb-2 text-xs text-muted-foreground">
                        {faculty?.name || ""}
                      </p>
                      <p className="mb-4 text-sm text-muted-foreground">
                        {program.description}
                      </p>

                      <Link
                        to={`/academics/${program.id}`}
                        className="inline-flex items-center justify-center rounded-md bg-gradient-accent px-4 py-2 text-xs font-semibold text-accent-foreground"
                      >
                        View Course
                      </Link>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Academics;
