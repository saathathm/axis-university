import React, { Fragment } from "react";
import HeroSlider from "../../components/home/HeroSlider.jsx";
import FacultiesGrid from "../../components/home/FacultiesGrid.jsx";
import StatsCounter from "../../components/home/StatsCounter.jsx";
import Testimonials from "../../components/home/Testimonials.jsx";
import Newsletter from "../../components/home/Newsletter.jsx";

const Home = () => {
  return (
    <Fragment>
      <HeroSlider />
      <FacultiesGrid/>
      <StatsCounter />
      <Testimonials />
      < Newsletter />
    </Fragment>
  );
};

export default Home;
