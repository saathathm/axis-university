import Layout from "@/components/layout/Layout";
import PageHero from "@/components/shared/PageHero";

const grades = [
  { letter: "A+", percent: "95-100", gpa: "4.00", desc: "Excellent" },
  { letter: "A", percent: "90-94", gpa: "4.00", desc: "Excellent" },
  { letter: "A-", percent: "85-89", gpa: "3.70", desc: "Very Good" },
  { letter: "B+", percent: "80-84", gpa: "3.30", desc: "Very Good" },
  { letter: "B", percent: "75-79", gpa: "3.00", desc: "Good" },
  { letter: "B-", percent: "70-74", gpa: "2.70", desc: "Good" },
  { letter: "C+", percent: "65-69", gpa: "2.30", desc: "Satisfactory" },
  { letter: "C", percent: "60-64", gpa: "2.00", desc: "Satisfactory" },
  { letter: "D", percent: "50-59", gpa: "1.00", desc: "Pass" },
  { letter: "F", percent: "0-49", gpa: "0.00", desc: "Fail" },
];

const Grading = () => (
  <Layout>
    <PageHero title="Grading System" subtitle="Our grading scale follows internationally recognized standards." />
    <section className="py-16">
      <div className="container max-w-3xl">
        <div className="rounded-2xl border bg-card overflow-hidden shadow-soft">
          <table className="w-full text-left text-sm">
            <thead className="bg-secondary">
              <tr>
                <th className="px-4 py-3 font-semibold text-primary">Letter Grade</th>
                <th className="px-4 py-3 font-semibold text-primary">Percentage</th>
                <th className="px-4 py-3 font-semibold text-primary">GPA</th>
                <th className="px-4 py-3 font-semibold text-primary">Description</th>
              </tr>
            </thead>
            <tbody>
              {grades.map((g) => (
                <tr key={g.letter} className="border-t">
                  <td className="px-4 py-3 font-bold text-primary">{g.letter}</td>
                  <td className="px-4 py-3">{g.percent}%</td>
                  <td className="px-4 py-3">{g.gpa}</td>
                  <td className="px-4 py-3 text-muted-foreground">{g.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-8 rounded-2xl bg-accent-soft p-6 border border-accent/30">
          <h3 className="font-semibold text-primary mb-2">GPA Calculation</h3>
          <p className="text-sm text-muted-foreground">Cumulative GPA is calculated as the weighted average of all course grades by credit hours. A minimum cumulative GPA of 2.0 is required for graduation in undergraduate programs, and 3.0 for graduate programs.</p>
        </div>
      </div>
    </section>
  </Layout>
);

export default Grading;
