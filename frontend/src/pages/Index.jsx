import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "@/components/layout/Layout";
import HeroSlider from "@/components/home/HeroSlider";
import FacultiesGrid from "@/components/home/FacultiesGrid";
import StatsCounter from "@/components/home/StatsCounter";
import Testimonials from "@/components/home/Testimonials";
import NewsList from "@/components/home/NewsList";
import Newsletter from "@/components/home/Newsletter";
import { fetchContent } from "@/store/slices/contentSlice.js";

const Index = () => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.content.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchContent());
    }
  }, [dispatch, status]);

  return (
    <Layout>
      <HeroSlider />
      <FacultiesGrid />
      <StatsCounter />
      <Testimonials />
      <NewsList />
      <Newsletter />
    </Layout>
  );
};

export default Index;
