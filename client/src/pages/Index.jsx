import Layout from "@/components/layout/Layout";
import HeroSlider from "@/components/home/HeroSlider";
import FacultiesGrid from "@/components/home/FacultiesGrid";
import StatsCounter from "@/components/home/StatsCounter";
import Testimonials from "@/components/home/Testimonials";
import Newsletter from "@/components/home/Newsletter";

const Index = () => {
  return (
    <Layout>
      <HeroSlider />
      <FacultiesGrid />
      <StatsCounter />
      <Testimonials />
      <Newsletter />
    </Layout>
  );
};

export default Index;
