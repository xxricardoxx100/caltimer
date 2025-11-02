import React from "react";
import ImgBanner2 from "../components/subastas/ImgBanner2";
import Title from "../components/subastas/Title";
import ListaVehiculos from "../components/subastas/ListaVehiculos";

export default function Subasta() {
  return (
    <div data-scroll-section className="pt-25">
      <ImgBanner2 />
      <Title />
      <ListaVehiculos />
    </div>
  );
}