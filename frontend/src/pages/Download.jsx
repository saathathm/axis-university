import { useState } from "react";
import { useSelector } from "react-redux";
import Layout from "@/components/layout/Layout";
import PageHero from "@/components/shared/PageHero";
import { downloads } from "@/data/content";
import { Download as DownloadIcon, FileText } from "lucide-react";

const Download = () => {
  const apiDownloads = useSelector((state) => state.content.downloads);
  const items = apiDownloads.length ? apiDownloads : downloads;
  const [notice, setNotice] = useState("");
  const onDownload = (title) => {
    setNotice(`${title} will download shortly.`);
    setTimeout(() => setNotice(""), 2500);
  };
  return (
    <Layout>
      <PageHero title="Downloads" subtitle="Brochures, application forms and student resources." />
      <section className="py-16">
        <div className="container max-w-4xl space-y-10">
          {notice && (
            <div className="rounded-xl border border-accent/30 bg-accent-soft px-4 py-3 text-sm text-primary" aria-live="polite">
              {notice}
            </div>
          )}
          {items.map((cat) => (
            <div key={cat.category}>
              <h2 className="text-2xl font-bold text-primary mb-5">{cat.category}</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {cat.items.map((item) => (
                  <div key={item.title} className="flex items-center gap-4 rounded-2xl border bg-card p-5 shadow-soft hover:shadow-elegant transition-smooth">
                    <div className="h-12 w-12 rounded-xl bg-accent-soft flex items-center justify-center shrink-0">
                      <FileText className="h-6 w-6 text-accent" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-primary truncate">{item.title}</div>
                      <div className="text-xs text-muted-foreground">PDF · {item.size}</div>
                    </div>
                    {item.url ? (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Download ${item.title}`}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-md border text-foreground hover:bg-secondary transition-smooth"
                      >
                        <DownloadIcon className="h-4 w-4" />
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={() => onDownload(item.title)}
                        aria-label={`Download ${item.title}`}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-md border text-foreground hover:bg-secondary transition-smooth"
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
};

export default Download;
