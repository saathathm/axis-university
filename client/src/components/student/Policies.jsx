import PageHero from "../widgets/PageHero";

const policies = [
  { q: "Equal Opportunity", a: "Axis University admits students of any race, color, nationality, religion or gender to all the rights, privileges, programs and activities generally accorded or made available to students at the University." },
  { q: "Application Deadlines", a: "Applications are accepted for Fall, Spring and Summer intakes. Deadlines are typically 6 weeks before the start of each semester." },
  { q: "Credit Transfer", a: "Students transferring from other accredited institutions may apply for credit transfer. Each application is reviewed individually by the academic department." },
  { q: "Refund Policy", a: "Tuition refunds follow a sliding scale based on the date of withdrawal. Full details are in the Student Handbook." },
  { q: "Code of Conduct", a: "All admitted students must abide by the University's Code of Conduct, ensuring an environment of integrity and respect." },
  { q: "Privacy & Records", a: "Student records are confidential and managed in accordance with international data protection standards." },
];

const Policies = () => (
  <>
    <PageHero title="Admission Policies" subtitle="Our policies ensure a fair, transparent admission process for every applicant." />
    <section className="py-16">
      <div className="container max-w-3xl">
        <div className="space-y-3">
          {policies.map((p, i) => (
            <details key={i} className="group rounded-xl border bg-card px-5 shadow-soft">
              <summary className="cursor-pointer list-none py-4 font-semibold text-primary">
                {p.q}
              </summary>
              <div className="pb-4 text-muted-foreground">{p.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default Policies;
