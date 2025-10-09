"use client";

import CTA from "./components/home/CTA";
import MisionVision from "./components/home/MisionVision";
import NuestraComunidad from "./components/home/NuestraComunidad";
import CeoDEscripcion from "./components/home/CeoDEscripcion";
import Header from "./components/home/Header";
import Incentives from "./components/home/Incentives";
import LogoCloud from "./components/home/LogoCloud";
import UseCases from "./components/home/UseCases";
import Footer from "./components/navigation/Footer";
import Navbar from "./components/navigation/Navbar";
//import Scroll from "components/SmoothScrollbar";
import Layout from "./hocs/layouts/Layout";
import { useEffect } from "react";
import BlogList from "./components/home/BlogList";
import { ImgBanner } from "./components/carros/ImgBanner";

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Layout>
      <div data-scroll-section className="pt-28">
        <Header />
        <MisionVision />
        <CeoDEscripcion />
        <NuestraComunidad/>
        <CTA />
        <LogoCloud />
        <BlogList />
      </div>
    </Layout>
  );
}
export default Home;
