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
      "/uploads/ejemplo1-a.jpg",
      "/uploads/ejemplo1-b.jpg",
      "/uploads/ejemplo1-c.jpg"
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
      "/uploads/ejemplo3-a.jpg",
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
      "/public/salinas1.jpg",
      "/uploads/ejemplo3-b.jpg",
      "/uploads/ejemplo3-c.jpg"
    ]
  },
];