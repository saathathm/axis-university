import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ArrowRight } from "lucide-react";

import SectionHeading from "../../components/widgets/SectionHeading";
import {
  EmptyState,
  LoadingState,
} from "../../components/widgets/ContentState";
import { getFaculties } from "../../features/faculty/facultyActions";
import { getFacultyIcon } from "../../utils/facultyIcons";

const FacultiesGrid = () => {
  const dispatch = useDispatch();

  const { faculties = [], loading } = useSelector(
    (state) => state.facultyState
  );

  useEffect(() => {
    dispatch(getFaculties());
  }, [dispatch]);

  const hasFaculties = faculties.length > 0;

  return (
    <section className="bg-background py-20">
      <div className="container">
        <SectionHeading
          eyebrow="What we offer"
          title="Our Popular Faculties"
          description="Explore a diverse range of academic disciplines led by experienced faculty and modern curricula."
        />

        {loading && <LoadingState label="Loading faculties..." />}

        {!loading && !hasFaculties && (
          <EmptyState
            title="No faculties available."
            description="Please add faculties from the admin panel."
          />
        )}

        {!loading && hasFaculties && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {faculties.map((faculty) => (
              <FacultyCard key={faculty.id} faculty={faculty} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const FacultyCard = ({ faculty }) => {
  const Icon = getFacultyIcon(faculty.icon);

  return (
    <Link
      to="/academics"
      className="group rounded-2xl border bg-card p-7 shadow-soft transition-smooth hover:-translate-y-1 hover:shadow-elegant"
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft transition-smooth group-hover:bg-gradient-accent">
        <Icon
          className={`h-6 w-6 transition-smooth group-hover:text-accent-foreground ${
            faculty.color || ""
          }`}
        />
      </div>

      <h3 className="mb-2 text-lg font-semibold text-primary">
        {faculty.name}
      </h3>

      <p className="mb-4 text-sm text-muted-foreground">
        {faculty.description}
      </p>

      <span className="inline-flex items-center text-sm font-medium text-accent">
        View Programs
        <ArrowRight className="ml-1 h-4 w-4 transition-smooth group-hover:translate-x-1" />
      </span>
    </Link>
  );
};

export default FacultiesGrid;