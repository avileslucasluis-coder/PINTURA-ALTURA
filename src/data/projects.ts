export type ProjectData = {
  id: string;
  title: string;
  location: string;
  date: string;
  description: string;
  category: string;
  visible: boolean;
  images: [string, string, string]; // Exactamente 3 imágenes
};

export const projectsData: ProjectData[] = [
  {
    id: "1",
    title: "Pintura Exterior en McDonald's (Sur, Alborada, y otros locales)",
    location: "Sur y Alborada Locales de McDonald's",
    date: "30 de noviembre 2026",
    description: "Trabajo completo de pintura exterior en locales de McDonald's ubicados en el sur y la Alborada. Incluyó preparación de superficie y aplicación de pintura acorde a los estándares de la marca.",
    category: "Pintura Comercial",
    visible: true,
    images: [
      "/mc-1.png",
      "/mc-2.png",
      "/mc-3.png"
    ]
  },
  {
    id: "2",
    title: "Pintura Exterior en Condominio",
    location: "Jose de Antepara entre Luque y Velez",
    date: "21 de abril, 2026",
    description: "Los trabajos comprenden el rasqueteo de pintura deteriorada, reparación de fisuras, sellado de superficies y aplicación de pintura en la fachada principal, parte posterior, laterales, terraza, tumbados y columnas. Además, se efectuará la pintura de las rejas de las ventanas, la reja del aire acondicionado, la reja del balcón y el tubo ubicado junto al aire acondicionado de la entrada, garantizando un acabado uniforme, resistente y de alta calidad.",
    category: "Pintura de Edificios",
    visible: true,
    images: [
      "/uploads/ejemplo2-a.jpg",
      "/uploads/ejemplo2-b.jpg",
      "/uploads/ejemplo2-c.jpg"
    ]
  },
  {
    id: "3",
    title: "Pintura Exterior e Interior de Casa",
    location: "Urb. Aurora",
    date: "15 de Septiembre, 2024",
    description: "Servicio completo de pintura exterior e interior en vivienda residencial, incluyendo preparación de superficies y acabados de calidad.",
    category: "Pintura Residencial",
    visible: true,
    images: [
      "/ejemplo3-a.jpg",
      "/uploads/ejemplo3-b.jpg",
      "/uploads/ejemplo3-c.jpg"
    ]
  },
    {
    id: "4",
    title: "Pintura Exterior en Condominio",
    location: "Antepara y Pedro Pablo Gomez",
    date: "25 de Marzo, 2026",
    description: "Mantenimiento integral de la fachada del edificio, que incluye rasqueteo de pintura deteriorada, reparación y sellado de fisuras, preparación de superficies y aplicación de pintura en fachadas, columnas, losas, balcones y rejas, garantizando un acabado uniforme, estético y de larga duración.",
    category: "Pintura de Edificios",
    visible: true,
    images: [
      "/uploads/ejemplo2-a.jpg",
      "/uploads/ejemplo2-b.jpg",
      "/uploads/ejemplo2-c.jpg"
    ]
  },
    {
    id: "5",
    title: "Pintura interior en departamento",
    location: "Jose de Antepara entre Luque y Velez",
    date: "04 de Mayo, 2026",
    description: "Mantenimiento de pintura del departamento, que incluye preparación de superficies, rasqueteo, reparación de fisuras, empastado, lijado, sellado y aplicación de pintura para lograr un acabado uniforme y duradero.",
    category: "Pintura Residencial",
    visible: true,
    images: [
      "/uploads/ejemplo3-a.jpg",
      "/uploads/ejemplo3-b.jpg",
      "/uploads/ejemplo3-c.jpg"
    ]
  },
      {
    id: "6",
    title: "Pintura interior en bodega",
    location: "Jose de Antepara entre Luque y Velez",
    date: "27 de Abril, 2026",
    description: "Mantenimiento de pintura del departamento, que incluye preparación de superficies, rasqueteo, reparación de fisuras, empastado, lijado, sellado y aplicación de pintura para lograr un acabado uniforme y duradero.",
    category: "Pintura Residencial",
    visible: true,
    images: [
      "/uploads/ejemplo3-a.jpg",
      "/uploads/ejemplo3-b.jpg",
      "/uploads/ejemplo3-c.jpg"
    ]
  },
      {
    id: "7",
    title: "Pintura en edificio",
    location: "Villamil Playa",
    date: "10 de enero, 2015",
    description: "Se realizó el sellado de superficies y la aplicación de pintura en la fachada del edificio, garantizando una adecuada protección contra la humedad y los agentes climáticos. El trabajo incluyó la preparación de las superficies, aplicación de sellador y acabado con pintura de alta calidad para lograr una terminación uniforme, resistente y de excelente presentación.",
    category: "Pintura de Edificios",
    visible: true,
    images: [
      "/salinas1.jpg",
      "/uploads/ejemplo3-b.jpg",
      "/uploads/ejemplo3-c.jpg"
    ]
  },
   {
    id: "8",
    title: "Pintura en Shopping Duran",
    location: "El paseo Shopping Duran",
    date: "15 de mayo, 2015",
    description: "Se realizó el sellado de superficies y la aplicación de pintura en la fachada del edificio, garantizando una adecuada protección contra la humedad y los agentes climáticos. El trabajo incluyó la preparación de las superficies, aplicación de sellador y acabado con pintura de alta calidad para lograr una terminación uniforme, resistente y de excelente presentación.",
    category: "Pintura de Edificios",
    visible: true,
    images: [
      "/duran 1.png",
      "/duran 2.png",
      "/duran 3.png"
    ]
  },
  {
    id: "8",
    title: "Pintura en ciudadela Rinconada del lago",
    location: "Samborondon",
    date: "10 de septiembre, 2024",
    description: "El trabajo realizado en la propiedad consistió en el sellado y reparación de fisuras, seguido de la aplicación de Plasmont y un corrector de enlucido para nivelar y alisar las superficies antes del pintado general de las fachadas, complementado con una limpieza profunda y el pintado final de todas las rejas y elementos metálicos para asegurar su protección y renovar su estética.",
    category: "Pintura Residencial",
    visible: true,
    images: [
      "/rinconada 1.png",
      "/rinconada 2.png",
      "/rinconada 3.png"
    ]
  },
  {
    id: "9",
    title: "Pintura en el Edificio Administrativo de Colgate Palmolive ",
    location: "Km 16.5, Vía a Daule, Daule",
    date: "01 de julio, 2024",
    description: "Se realizó el mantenimiento de pintura en el edificio administrativo de la fábrica Colgate Palmolive. El trabajo consistió en la limpieza del edificio mediante hidrolavado, seguida de una mano de sellador. Posteriormente, se repararon las fisuras existentes y se aplicó corrector de enlucido para nivelar la superficie. Finalmente, se realizaron dos manos de pintura exterior. Este proceso se llevó a cabo con el objetivo de prevenir la humedad y proteger el recubrimiento, evitando que la pintura se deteriore con facilidad.",
    category: "Pintura de Edificios",
    visible: true,
    images: [ 
      "/colgate 1.png",
      "/colgate 2.png",
      "/colgate 3.png"
    ]
  },
  {
    id: "10",
    title: "Pintura la cafeteria de Colgate Palmolive ",
    location: "Km 16.5, Vía a Daule, Daule",
    date: "01 de julio, 2024",
    description: "Se realizó el mantenimiento de pintura en cafeteria de la fábrica Colgate Palmolive. El trabajo consistió en la limpieza del edificio mediante hidrolavado, seguida de una mano de sellador. Posteriormente, se repararon las fisuras existentes y se aplicó corrector de enlucido para nivelar la superficie. Finalmente, se realizaron dos manos de pintura exterior. Este proceso se llevó a cabo con el objetivo de prevenir la humedad y proteger el recubrimiento, evitando que la pintura se deteriore con facilidad.",
    category: "Pintura de Edificios",
    visible: true,
    images: [ 
      "/Cafeteria 1.png",
      "/Cafeteria 2.png",
      "/Cafeteria 3.png"
    ]
  },
   {
    id: "11",
    title: "Pintura en los condominios de las acacias ",
    location: "sur de Guayaquil, frente al parque del sector TikTok y cerca de la Av. 25 de Julio y el Mall del Sur",
    date: "15 de mayo, 2017",
    description: "Se realizó el mantenimiento de pintura en condominios Las Acacias. El trabajo consistió en la limpieza del edificio mediante hidrolavado, seguida de una mano de sellador. Posteriormente, se repararon las fisuras existentes y se aplicó corrector de enlucido para nivelar la superficie. Finalmente, se realizaron dos manos de pintura exterior. Este proceso se llevó a cabo con el objetivo de prevenir la humedad y proteger el recubrimiento, evitando que la pintura se deteriore con facilidad.",
    category: "Pintura de Edificios",
    visible: true,
    images: [ 
      "/acacias 1.png",
      "/acacias 2.png",
      "/acacias 3.png"
    ]
  },
  {
    id: "12",
    title: "Pintura en el Mall del fortin ",
    location: "Km. 25 de la Av. Perimetral, entre la Av. Modesto Luque y la Calle Casuarina",
    date: "01 de marzo, 2024",
    description: "Se realizó el mantenimiento de pintura en el Mall El Fortín, donde se pintó un lateral del edificio. El trabajo consistió en la limpieza de la superficie mediante hidrolavado, seguida de una mano de sellador y la reparación de fisuras existentes. Finalmente, se realizaron dos manos de pintura exterior. Este proceso se llevó a cabo con el objetivo de prevenir la humedad y proteger el recubrimiento, evitando que la pintura se deteriore con facilidad..",
    category: "Pintura de Edificios",
    visible: true,
    images: [ 
      "/fortin 1.png",
      "/fortin 2.png",
      "/fortin 3.png"
    ]
  },
];