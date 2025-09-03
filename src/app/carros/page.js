import React from "react";
import Hero from "../components/carros/Hero";
import CarCard from "../components/carros/CarCard";
import FeacturedSections from "../components/carros/FeacturedSections";
import Banner from "../components/carros/Banner";
import { ImgBanner } from "../components/carros/ImgBanner";

const Carros = () => {
  return (
    <div data-scroll-section className="pt-25">
      {/* <Hero /> */}
      <ImgBanner />
      <FeacturedSections />
      <Banner />
    </div>
  );
};

export default Carros;
