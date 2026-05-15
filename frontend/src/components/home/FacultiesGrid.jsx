import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import { EmptyState, LoadingState } from "@/components/shared/ContentState";
import { getFacultyIcon } from "@/utils/facultyIcons";
import { fetchFaculties } from "@/store/actions/contentActions.js";

const FacultiesGrid = () => {
  const dispatch = useDispatch();
  const faculties = useSelector((state) => state.content.faculties);
  const status = useSelector((state) => state.content.status.faculties);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchFaculties());
    }
  }, [dispatch, status]);

  return (
    <section className="py-20 bg-background">
      <div className="container">
        <SectionHeading
          eyebrow="What we offer"
          title="Our Popular Faculties"
          description="Explore a diverse range of academic disciplines led by experienced faculty and modern curricula."
        />
        {status === "loading" ? <LoadingState label="Loading faculties..." /> : null}
        {status !== "loading" && faculties.length === 0 ? (
          <EmptyState title="No faculties available." description="Please add faculties from the admin panel." />
        ) : null}
        {faculties.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {faculties.map((f) => {
              const Icon = getFacultyIcon(f.icon);
              return (
                <Link
                  key={f.id}
                  to="/academics"
                  className="group rounded-2xl border bg-card p-7 shadow-soft hover:shadow-elegant hover:-translate-y-1 transition-smooth"
                >
                  <div className="h-12 w-12 rounded-xl bg-accent-soft flex items-center justify-center mb-4 group-hover:bg-gradient-accent transition-smooth">
                    <Icon className={`h-6 w-6 ${f.color} group-hover:text-accent-foreground transition-smooth`} />
                  </div>
                  <h3 className="text-lg font-semibold text-primary mb-2">{f.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{f.description}</p>
                  <span className="inline-flex items-center text-sm font-medium text-accent">
                    View Programs <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-smooth" />
                  </span>
                </Link>
              );
            })}
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default FacultiesGrid;
