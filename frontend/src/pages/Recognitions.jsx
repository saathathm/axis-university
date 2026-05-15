import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "@/components/layout/Layout";
import PageHero from "@/components/shared/PageHero";
import SectionHeading from "@/components/shared/SectionHeading";
import { EmptyState, LoadingState } from "@/components/shared/ContentState";
import { fetchRecognitions } from "@/store/actions/contentActions.js";
import { Award } from "lucide-react";

const Recognitions = () => {
  const dispatch = useDispatch();
  const recognitions = useSelector((state) => state.content.recognitions);
  const status = useSelector((state) => state.content.status.recognitions);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchRecognitions());
    }
  }, [dispatch, status]);

  return (
    <Layout>
      <PageHero
        title="Recognitions & Accreditations"
        subtitle="Trusted by international bodies, accredited for global standards."
      />

      <section className="py-16">
        <div className="container">
          <SectionHeading
            eyebrow="Trusted by"
            title="Accreditations & Partners"
          />
          {status === "loading" ? <LoadingState label="Loading recognitions..." /> : null}
          {status !== "loading" && recognitions.length === 0 ? (
            <EmptyState title="No recognitions available." description="Seed or add recognitions in the backend." />
          ) : null}
          {recognitions.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {recognitions.map((r) => (
                <div
                  key={r.name}
                  className="rounded-2xl border bg-card p-6 shadow-soft hover:shadow-elegant transition-smooth"
                >
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-xl bg-gradient-accent flex items-center justify-center shrink-0">
                      <Award className="h-6 w-6 text-accent-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary mb-1">
                        {r.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">{r.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </section>
    </Layout>
  );
};

export default Recognitions;
