import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Award } from "lucide-react";

import Layout from "@/components/layout/Layout";
import PageHero from "@/components/shared/PageHero";
import SectionHeading from "@/components/shared/SectionHeading";
import { EmptyState, LoadingState } from "@/components/shared/ContentState";
import { fetchRecognitions } from "@/store/actions/contentActions.js";

const Recognitions = () => {
  const dispatch = useDispatch();

  const recognitions = useSelector((state) => state.content.recognitions);
  const recognitionStatus = useSelector(
    (state) => state.content.status.recognitions
  );

  const isLoading = recognitionStatus === "loading";
  const hasRecognitions = recognitions.length > 0;
  const isEmpty = !isLoading && !hasRecognitions;

  useEffect(() => {
    if (recognitionStatus === "idle") {
      dispatch(fetchRecognitions());
    }
  }, [dispatch, recognitionStatus]);

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

          {isLoading && <LoadingState label="Loading recognitions..." />}

          {isEmpty && (
            <EmptyState
              title="No recognitions available."
              description="Seed or add recognitions in the backend."
            />
          )}

          {hasRecognitions && (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {recognitions.map((recognition) => {
                const recognitionImage = recognition.image || recognition.logo;

                return (
                  <div
                    key={recognition.id || recognition.name}
                    className="rounded-2xl border bg-card p-6 shadow-soft transition-smooth hover:shadow-elegant"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-accent">
                        {recognitionImage ? (
                          <img
                            src={recognitionImage}
                            alt={recognition.name}
                            loading="lazy"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <Award className="h-6 w-6 text-accent-foreground" />
                        )}
                      </div>

                      <div>
                        <h3 className="mb-1 font-semibold text-primary">
                          {recognition.name}
                        </h3>

                        <p className="text-sm text-muted-foreground">
                          {recognition.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Recognitions;