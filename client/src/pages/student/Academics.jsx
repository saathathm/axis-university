import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BookOpen, Clock, Search, X } from "lucide-react";

import PageHero from "../../components/widgets/PageHero";
import {
  EmptyState,
  LoadingState,
} from "../../components/widgets/ContentState";
import { getFaculties } from "../../features/faculty/facultyActions";
import { getCourses } from "../../features/course/courseActions";

const SEARCH_DELAY = 500;

const Academics = () => {
  const dispatch = useDispatch();

  const { faculties = [], loading: facultyLoading } = useSelector(
    (state) => state.facultyState,
  );

  const { courses = [], loading: courseLoading } = useSelector(
    (state) => state.courseState,
  );

  const [search, setSearch] = useState("");
  const [selectedFacultyId, setSelectedFacultyId] = useState("");

  useEffect(() => {
    dispatch(getFaculties());
  }, [dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(getCourses(search, selectedFacultyId));
    }, SEARCH_DELAY);

    return () => {
      clearTimeout(timer);
    };
  }, [dispatch, search, selectedFacultyId]);

  const hasCourses = courses.length > 0;
  const hasFilters = search.trim() || selectedFacultyId;

  const handleFacultyChange = (facultyId) => {
    setSelectedFacultyId((currentFacultyId) =>
      Number(currentFacultyId) === Number(facultyId) ? "" : facultyId,
    );
  };

  const handleClearFilters = () => {
    setSearch("");
    setSelectedFacultyId("");
  };

  return (
    <>
      <PageHero
        title="Academic Programs"
        subtitle="Explore our full catalog of diplomas, bachelor's, master's and doctoral programs."
      />

      <section className="py-12">
        <div className="container grid items-start gap-8 md:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="space-y-6 md:sticky md:top-24">
            <SearchFilter search={search} onSearchChange={setSearch} />

            <FacultyFilter
              faculties={faculties}
              selectedFacultyId={selectedFacultyId}
              onFacultyChange={handleFacultyChange}
              loading={facultyLoading}
            />

            {hasFilters && <ClearFiltersButton onClear={handleClearFilters} />}
          </aside>

          <div className="min-w-0">
            <div className="mb-4 text-sm text-muted-foreground">
              {courseLoading
                ? "Searching courses..."
                : `${courses.length} course${courses.length !== 1 ? "s" : ""} found`}
            </div>

            {courseLoading && <LoadingState label="Loading courses..." />}

            {!courseLoading && !hasCourses && (
              <EmptyState
                title="No courses found."
                description={
                  hasFilters
                    ? "No courses match your search or selected faculty."
                    : "Create courses from the admin panel."
                }
              />
            )}

            {!courseLoading && hasCourses && (
              <div className="grid gap-5 md:grid-cols-2">
                {courses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    faculties={faculties}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

const SearchFilter = ({ search, onSearchChange }) => {
  return (
    <div className="rounded-2xl border bg-card p-5 shadow-soft">
      <label className="mb-3 block text-sm font-semibold text-primary">
        Search Courses
      </label>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by course name..."
          maxLength={100}
          className="w-full rounded-md border border-input bg-background py-2 pl-9 pr-3 text-sm outline-none transition-smooth focus:border-primary"
        />
      </div>
    </div>
  );
};

const FacultyFilter = ({
  faculties,
  selectedFacultyId,
  onFacultyChange,
  loading,
}) => {
  return (
    <div className="rounded-2xl border bg-card p-5 shadow-soft">
      <h3 className="mb-3 font-semibold text-primary">Faculty</h3>

      {loading && (
        <p className="text-sm text-muted-foreground">Loading faculties...</p>
      )}

      {!loading && faculties.length === 0 && (
        <p className="text-sm text-muted-foreground">No faculties available.</p>
      )}

      {!loading && faculties.length > 0 && (
        <div className="space-y-2">
          {faculties.map((faculty) => {
            const isChecked = Number(selectedFacultyId) === Number(faculty.id);

            return (
              <label
                key={faculty.id}
                className={`flex cursor-pointer items-center gap-2 rounded-lg px-2 py-2 text-sm transition-smooth ${
                  isChecked
                    ? "bg-accent/10 text-primary"
                    : "hover:bg-secondary/50"
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => onFacultyChange(faculty.id)}
                  className="h-4 w-4 rounded accent-primary"
                />

                <span>{faculty.name}</span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
};

const ClearFiltersButton = ({ onClear }) => {
  return (
    <button
      type="button"
      onClick={onClear}
      className="inline-flex w-full items-center justify-center gap-2 rounded-md border px-3 py-2 text-sm text-foreground/80 transition-smooth hover:bg-secondary"
    >
      <X className="h-4 w-4" />
      Clear filters
    </button>
  );
};

const CourseCard = ({ course, faculties }) => {
  const faculty = getCourseFaculty(course, faculties);

  return (
    <article className="rounded-2xl border bg-card p-6 shadow-soft transition-smooth hover:-translate-y-0.5 hover:shadow-elegant">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        {course.duration && (
          <span className="inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold text-muted-foreground">
            <Clock className="mr-1 h-3 w-3" />
            {course.duration}
          </span>
        )}

        {course.level && (
          <span className="inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold text-muted-foreground">
            {course.level}
          </span>
        )}
      </div>

      <h3 className="mb-1 text-lg font-semibold text-primary">{course.name}</h3>

      {faculty?.name && (
        <p className="mb-2 text-xs font-medium text-accent">{faculty.name}</p>
      )}

      <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">
        {course.short_description || course.description}
      </p>

      <Link
        to={`/academics/${course.id}`}
        className="inline-flex items-center justify-center rounded-md bg-gradient-accent px-4 py-2 text-xs font-semibold text-accent-foreground transition-smooth hover:opacity-90"
      >
        View Course
      </Link>
    </article>
  );
};

const getCourseFaculty = (course, faculties) => {
  return faculties.find(
    (faculty) => Number(faculty.id) === Number(course.faculty_id),
  );
};

export default Academics;
