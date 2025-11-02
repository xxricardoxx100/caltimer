// src/app/components/carros/carData.js

// Datos de ejemplo para autos
const dummyCarData = [
  {
    id: 1,
    brand: "Kia",
    model: "Soluto",
    estado: "Excelente",
    kilometraje: 58000,
    year: 2020,
    category: "Sedan",
    image:"/fotosAutos/soluto/1.jfif",
    images: [
      "/fotosAutos/soluto/1.jfif", "/fotosAutos/soluto/2.jfif", "/fotosAutos/soluto/3.jfif",
      "/fotosAutos/soluto/4.jfif", "fotosAutos/soluto/5.jfif","/fotosAutos/soluto/6.jfif",
      "/fotosAutos/soluto/7.jfif",
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
    kilometraje: 58000,
    estado: "Excelente",
    image:
      "/fotosAutos/Ramv700/4.jpg",
    images: [
      "/fotosAutos/Ramv700/1.jpg", "/fotosAutos/Ramv700/2.jpg", "/fotosAutos/Ramv700/3.jpg",
      "/fotosAutos/Ramv700/4.jpg", "/fotosAutos/Ramv700/5.jpg","/fotosAutos/Ramv700/6.jpg",
      "/fotosAutos/Ramv700/7.jpg",
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
  { 
    id: 3,
    brand: "NISSAN",
    model: "Versa",
    kilometraje: 72000,
    estado: "Excelente",
    year: 2020,
    category: "Sedan",
    image:
      "/fotosAutos/versa2020/9.jpeg",
    images: [
      "/fotosAutos/versa2020/1.jpeg", "/fotosAutos/versa2020/2.jpeg", "/fotosAutos/versa2020/3.jpeg",
      "/fotosAutos/versa2020/5.jpeg", "/fotosAutos/versa2020/6.jpeg","/fotosAutos/versa2020/7.jpeg",
      "/fotosAutos/versa2020/8.jpeg","/fotosAutos/versa2020/9.jpeg","/fotosAutos/versa2020/10.jpeg"
    ],
    price: 10000,
    isAvailable: true,
    seating_capacity: 5,
    fuel_type: "Gasolina",
    transmission: "Manual",
    location: "Lima",
    description:
      "Nissan Versa 2020 [Versión FULL] en venta: Sedán moderno y seguro, con bajo kilometraje [72.000 km] y un motor 1.6L eficiente. Disfruta de su amplio interior, diseño elegante, transmisión [Manual] ¡Excelente estado, listo para usar!",
  },
  { 
    id: 4,
    brand: "NISSAN",
    model: "Kicks",
    kilometraje: 0,
    estado: "Excelente",
    year: 2019,
    category: "SUV",
    image:
      "/fotosAutos/nissankick/3.jpeg",
    images: [
      "/fotosAutos/nissankick/1.jpeg", "/fotosAutos/nissankick/2.jpeg", "/fotosAutos/nissankick/3.jpeg",
      "/fotosAutos/nissankick/4.jpeg", "/fotosAutos/nissankick/5.jpeg"
    ],
    price: 12000,
    isAvailable: true,
    seating_capacity: 5,
    fuel_type: "Gasolina",
    transmission: "Automatico",
    location: "Lima",
    description:
      "El Nissan Kicks 2019 es un SUV compacto, moderno y eficiente, perfecto para la vida urbana. Cuenta con un motor 1.6L que ofrece excelente rendimiento de combustible, un diseño atractivo y un interior espacioso y versátil. Es ágil de manejar y viene equipado con características de seguridad esenciales, siendo una opción práctica y con estilo.",
  },
 
];
export default dummyCarData;
