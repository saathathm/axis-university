import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Award } from "lucide-react";

import PageHero from "../../components/widgets/PageHero";
import SectionHeading from "../../components/widgets/SectionHeading";
import {
  EmptyState,
  LoadingState,
} from "../../components/widgets/ContentState";
import { getRecognitions } from "../../features/recognition/recognitionActions";

const STORAGE_URL = "http://localhost:8000/storage";

const Recognitions = () => {
  const dispatch = useDispatch();

  const { recognitions = [], loading } = useSelector(
    (state) => state.recognitionState
  );

  useEffect(() => {
    dispatch(getRecognitions());
  }, [dispatch]);

  const hasRecognitions = recognitions.length > 0;

  return (
    <>
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

          {loading && <LoadingState label="Loading recognitions..." />}

          {!loading && !hasRecognitions && (
            <EmptyState
              title="No recognitions available."
              description="Seed or add recognitions in the backend."
            />
          )}

          {!loading && hasRecognitions && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {recognitions.map((recognition) => (
                <RecognitionCard
                  key={recognition.id || recognition.organization_name}
                  recognition={recognition}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

const RecognitionCard = ({ recognition }) => {
  const imageUrl = getRecognitionImage(recognition);

  return (
    <div className="group flex h-full flex-col items-center rounded-3xl border bg-card p-6 text-center shadow-soft transition-smooth hover:-translate-y-1 hover:shadow-elegant">
      <RecognitionImage
        imageUrl={imageUrl}
        alt={recognition.organization_name}
      />

      <div className="mt-5 flex flex-1 flex-col items-center">
        <h3 className="text-lg font-semibold leading-snug text-primary">
          {recognition.organization_name}
        </h3>

        {recognition.description && (
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {recognition.description}
          </p>
        )}
      </div>
    </div>
  );
};

const RecognitionImage = ({ imageUrl, alt }) => {
  return (
    <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl border bg-white p-3 shadow-soft transition-smooth group-hover:scale-105">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={alt || "Recognition"}
          loading="lazy"
          className="h-full w-full object-contain"
        />
      ) : (
        <Award className="h-10 w-10 text-accent" />
      )}
    </div>
  );
};

const getRecognitionImage = (recognition) => {
  if (recognition.photo) {
    return `${STORAGE_URL}/${recognition.photo}`;
  }

  return recognition.logo || null;
};

export default Recognitions;