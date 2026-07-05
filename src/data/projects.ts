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
    title: "Restauración de Fachada Principal",
    location: "Centro Histórico",
    date: "Enero 2026",
    description: "Trabajo completo de pintura exterior en edificio colonial de 4 pisos. Incluyó sellado de grietas y aplicación de recubrimiento impermeabilizante.",
    category: "Restauración",
    visible: true,
    images: [
      "/uploads/ejemplo1-a.jpg",
      "/uploads/ejemplo1-b.jpg",
      "/uploads/ejemplo1-c.jpg"
    ]
  },
  {
    id: "2",
    title: "Pintura Industrial Silos",
    location: "Zona Industrial Norte",
    date: "Marzo 2026",
    description: "Pintura epóxica en 3 silos industriales. Trabajo realizado mediante acceso por cuerdas cumpliendo todas las normativas de seguridad.",
    category: "Pintura Industrial",
    visible: true,
    images: [
      "/uploads/ejemplo2-a.jpg",
      "/uploads/ejemplo2-b.jpg",
      "/uploads/ejemplo2-c.jpg"
    ]
  },
  {
    id: "3",
    title: "Mantenimiento Residencial",
    location: "Urb. Los Rosales",
    date: "Mayo 2026",
    description: "Limpieza profunda y pintura en conjunto residencial de 5 torres.",
    category: "Pintura de Edificios",
    visible: true,
    images: [
      "/uploads/ejemplo3-a.jpg",
      "/uploads/ejemplo3-b.jpg",
      "/uploads/ejemplo3-c.jpg"
    ]
  }
];
