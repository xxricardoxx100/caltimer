import React from "react";

const Banner = () => {
  return (
    <div className="flex flex-col md:flex-row md:items-start items-center justify-between px-8 min-md:pl-14 p-10 bg-gradient-to-r from-orange-400 to-orange-300 max-w-6xl mx-3 md:mx-auto rounded-2xl overflow-hidden">
      <div className="text-white ">
        <h2 className="text-3xl font-medium">do you own a luxuty car</h2>
        <p className="mt-2">
          vende tu carro al instante en nuestra aplicacion donde quieras
        </p>
        <p className="max-w-130">
          tenemos lo mejores carros que te pueden interasar, somos lo mjores{" "}
        </p>
        <button className="px-6 py-2 bg-white hover:bg-slate-100 transition-all text-black rounded-lg text-sm cursor-pointer mt-4">
          List yout car
        </button>
      </div>
      {/* <img
        src="https://beta.maxipublica.com/pictures/2023/9/3898/20806747/chevrolet_spark_2020_6bf888791cab1_b.jpeg"
        alt="car"
        className="max-h-45 mt-10"
      /> */}
    </div>
  );
};

export default Banner;
