// src/app/components/carros/carData.js

// Datos de ejemplo para autos
const dummyCarData = [
  {
    id: 1,
    brand: "Kia",
    model: "Soluto",
    year: 2020,
    category: "Sedan",
    image:"/soluto/1.jfif",
    images: [
      "/soluto/1.jfif", "/soluto/2.jfif", "/soluto/3.jfif",
      "/soluto/4.jfif", "/soluto/5.jfif","/soluto/6.jfif",
      "/soluto/7.jfif",
    ],
    price: 10200,
    isAvailable: true,
    seating_capacity: 5,
    fuel_type: "Gasolina / GLP",
    transmission: "Mecanico",
    location: "Lima",
    description:
      "Motor 1.4L súper económico y confiable. Versión SEMIFULL, con aire acondicionado, pantalla táctil con Apple CarPlay/Android Auto y cámara de retroceso. Uso particular, mantenimientos al día en concesionario. Papeles en regla. ¡Listo para transferencia!",
  },
  { 
    id: 2,
    brand: "RAM",
    model: "V700",
    year: 2022,
    category: "Pickup compacta",
    image:
      "/Ramv700/4.jpg",
    images: [
      "/Ramv700/1.jpg", "/Ramv700/2.jpg", "/Ramv700/3.jpg",
      "/Ramv700/4.jpg", "/Ramv700/5.jpg","/Ramv700/6.jpg",
      "/Ramv700/7.jpg",
    ],
    price: 7200,
    isAvailable: true,
    seating_capacity: 2,
    fuel_type: "Gasolina",
    transmission: "Manual",
    location: "Lima",
    description:
      "Excelente RAM V700 año 2022, lista para el trabajo. Confiable y económica en consumo de combustible. Cuenta con 2 asientos delanteros y amplio almacenamiento. Mantenimientos al día y en perfecto estado. ¡No dejes pasar esta oportunidad!",
  },
  
 
];
export default dummyCarData;
