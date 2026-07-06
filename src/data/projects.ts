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
    title: "Pintura Exterior en McDonald's (Sur, Alborada)",
    location: "Sur y Alborada",
    date: "Enero 2026",
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
    location: "Zona Industrial Norte",
    date: "Marzo 2026",
    description: "Pintura exterior completa en condominio residencial, incluyendo fachadas y áreas comunes, con trabajo realizado cumpliendo todas las normativas de seguridad.",
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
    location: "Urb. Los Rosales",
    date: "Mayo 2026",
    description: "Servicio completo de pintura exterior e interior en vivienda residencial, incluyendo preparación de superficies y acabados de calidad.",
    category: "Pintura Residencial",
    visible: true,
    images: [
      "/uploads/ejemplo3-a.jpg",
      "/uploads/ejemplo3-b.jpg",
      "/uploads/ejemplo3-c.jpg"
    ]
  }
];