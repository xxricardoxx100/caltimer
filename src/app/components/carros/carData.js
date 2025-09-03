// src/app/components/carros/carData.js

// Datos de ejemplo para autos
const dummyCarData = [
  {
    id: 1,
    brand: "Toyota",
    model: "Corolla",
    year: 2022,
    category: "Sedan",
    image:
      "https://cdn.sanity.io/images/90qxor39/production/d727bb2e9d8a075a43772a0080e0344a2aa72f04-800x450.jpg?q=75&fit=max&auto=format&dpr=2",
    images: [
      "https://cdn.sanity.io/images/90qxor39/production/d727bb2e9d8a075a43772a0080e0344a2aa72f04-800x450.jpg?q=75&fit=max&auto=format&dpr=2",
      "https://ecoloauto.com/?attachment_id=41879",
      "https://d1gl66oyi6i593.cloudfront.net/wp-content/uploads/2022/03/prueba-toyota-corolla-125h-style-1.jpg",
    ],
    price: 12000,
    isAvailable: true,
    seating_capacity: 5,
    fuel_type: "Gasoline",
    transmission: "Automatic",
    location: "Lima",
    description:
      "Toyota Corolla 2022, cómodo y eficiente, ideal para ciudad y viajes largos.",
  },
  {
    id: 2,
    brand: "Honda",
    model: "Civic",
    year: 2021,
    category: "Sedan",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=400&q=80",
    price: 50000,
    isAvailable: false,
    seating_capacity: 5,
    fuel_type: "Gasoline",
    transmission: "Manual",
    location: "Cusco",
    description:
      "Honda Civic 2021, deportivo y confiable, perfecto para quienes buscan estilo y rendimiento.",
  },
  {
    id: 3,
    brand: "Ford",
    model: "Explorer",
    year: 2023,
    category: "SUV",
    image:
      "https://img.sm360.ca/images/article/humberviewgroup-941/125430//2025-ford-explorer-platinum_011707972728473.jpg",
    price: 23002,
    isAvailable: true,
    seating_capacity: 7,
    fuel_type: "Diesel",
    transmission: "Automatic",
    location: "Arequipa",
    description:
      "Ford Explorer 2023, SUV espacioso y potente, ideal para familias y aventuras.",
  },
  {
    id: 4,
    brand: "Chevrolet",
    model: "Spark",
    year: 2020,
    category: "Hatchback",
    image:
      "https://beta.maxipublica.com/pictures/2023/9/3898/20806747/chevrolet_spark_2020_6bf888791cab1_b.jpeg",
    price: 30000,
    isAvailable: true,
    seating_capacity: 4,
    fuel_type: "Gasoline",
    transmission: "Manual",
    location: "Trujillo",
    description:
      "Chevrolet Spark 2020, compacto y económico, perfecto para la ciudad.",
  },
  {
    id: 5,
    brand: "BMW",
    model: "X5",
    year: 2022,
    category: "SUV",
    image:
      "https://hips.hearstapps.com/hmg-prod/images/2025-bmw-x5-xdrive40i-119-6824bd515c0cc.jpg?crop=0.698xw:0.588xh;0.182xw,0.195xh&resize=2048:*",
    price: 12900,
    isAvailable: false,
    seating_capacity: 5,
    fuel_type: "Gasoline",
    transmission: "Automatic",
    location: "Lima",
    description:
      "BMW X5 2022, lujo y tecnología en un SUV premium para los más exigentes.",
  },
  {
    id: 6,
    brand: "Hyundai",
    model: "Tucson",
    year: 2021,
    category: "SUV",
    image:
      "https://hips.hearstapps.com/hmg-prod/images/2025-hyundai-tucson-phev-111-660424e19bc9d.jpg?crop=0.662xw:0.559xh;0.158xw,0.365xh&resize=1200:*",
    price: 15070,
    isAvailable: true,
    seating_capacity: 5,
    fuel_type: "Diesel",
    transmission: "Automatic",
    location: "Cusco",
    description:
      "Hyundai Tucson 2021, moderno y versátil, excelente para ciudad y carretera.",
  },
];
export default dummyCarData;
