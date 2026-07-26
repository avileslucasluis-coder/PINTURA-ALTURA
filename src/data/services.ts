export type ServiceItem = {
  id: string;
  title: string;
  description: string;
  icon: string | null;
  order: number;
};

export const servicesData: ServiceItem[] = [
  {
    id: "service-1",
    title: "Pintura de fachadas",
    description: "Servicio completo de restauración y renovación de fachadas.",
    icon: "paintbrush",
    order: 1,
  },
  {
    id: "service-2",
    title: "Pintura industrial",
    description: "Aplicación especializada en estructuras y equipos industriales.",
    icon: "building",
    order: 2,
  },
  {
    id: "service-3",
    title: "Trabajos en altura",
    description: "Mantenimiento y pintura con equipos de descenso y líneas de vida certificadas.",
    icon: "mountain",
    order: 3,
  },
  {
    id: "service-4",
    title: "Sellado de grietas",
    description: "Reparación de fisuras y tratamiento de humedad para prevenir filtraciones.",
    icon: "droplet",
    order: 4,
  },
  {
    id: "service-5",
    title: "Impermeabilización de losas",
    description: "Aplicación de membranas y mantos asfálticos para eliminar filtraciones de agua.",
    icon: "layers",
    order: 5,
  },
  // Agrega aquí los que faltan, siguiendo el mismo formato
];