import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Download as DownloadIcon, FileText } from "lucide-react";

import Layout from "@/components/layout/Layout";
import PageHero from "@/components/widgets/PageHero";
import { EmptyState, LoadingState } from "@/components/widgets/ContentState";
import { fetchDownloads } from "@/actions/downloadAction";

function Download() {
  const dispatch = useDispatch();
  const { downloads, loading, isLoaded } = useSelector((state) => state.download);

  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (!loading && !isLoaded) {
      dispatch(fetchDownloads());
    }
  }, [dispatch, loading, isLoaded]);

  const handleDownload = (title) => {
    setNotice(`${title} will download shortly.`);
    setTimeout(() => setNotice(""), 2500);
  };

  return (
    <Layout>
      <PageHero
        title="Downloads"
        subtitle="Brochures, application forms and student resources."
      />

      <section className="py-16">
        <div className="container max-w-4xl space-y-10">
          {notice && (
            <div
              className="rounded-xl border border-accent/30 bg-accent-soft px-4 py-3 text-sm text-primary"
              aria-live="polite"
            >
              {notice}
            </div>
          )}

          {loading && <LoadingState label="Loading downloads..." />}

          {!loading && downloads.length === 0 && (
            <EmptyState
              title="No downloads available."
              description="Publish downloads from the admin panel."
            />
          )}

          {downloads.map((category) => (
            <div key={category.category}>
              <h2 className="mb-5 text-2xl font-bold text-primary">
                {category.category}
              </h2>

              <div className="grid gap-4 sm:grid-cols-2">
                {category.items.map((item) => (
                  <div
                    key={item.title}
                    className="flex items-center gap-4 rounded-2xl border bg-card p-5 shadow-soft transition-smooth hover:shadow-elegant"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-soft">
                      <FileText className="h-6 w-6 text-accent" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="truncate font-semibold text-primary">
                        {item.title}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        PDF · {item.size}
                      </div>
                    </div>

                    {item.url ? (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Download ${item.title}`}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-md border text-foreground transition-smooth hover:bg-secondary"
                      >
                        <DownloadIcon className="h-4 w-4" />
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleDownload(item.title)}
                        aria-label={`Download ${item.title}`}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-md border text-foreground transition-smooth hover:bg-secondary"
                      >
                        <DownloadIcon className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}

export default Download;
