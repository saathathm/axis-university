import { Calendar, ArrowRight } from "lucide-react";
import { useSelector } from "react-redux";
import SectionHeading from "@/components/shared/SectionHeading";
import { news } from "@/data/content";

const NewsList = () => {
  const apiNews = useSelector((state) => state.content.news);
  const items = apiNews.length ? apiNews : news;

  return (
    <section className="py-20 bg-background">
      <div className="container">
        <SectionHeading eyebrow="Stay updated" title="Latest Events & News" description="Highlights from across the Axis University community." />
        <div className="grid gap-6 md:grid-cols-3">
          {items.map((n) => (
            <article key={n.id || n.title} className="group rounded-2xl border bg-card overflow-hidden shadow-soft hover:shadow-elegant hover:-translate-y-1 transition-smooth">
              <div className="aspect-video bg-gradient-primary relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-hero opacity-60" />
                <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-background/95 text-primary text-xs font-semibold px-3 py-1.5 rounded-full">
                  <Calendar className="h-3 w-3" /> {n.date}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-primary mb-2 group-hover:text-accent transition-smooth">{n.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{n.excerpt}</p>
                <a href="#" className="inline-flex items-center text-sm font-medium text-accent">
                  Read more <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-smooth" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsList;
