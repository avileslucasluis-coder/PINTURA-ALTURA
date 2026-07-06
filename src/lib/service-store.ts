export type ServiceItem = {
  id: string;
  title: string;
  description: string;
  icon: string | null;
  order: number;
  createdAt: string;
  updatedAt: string;
};

const initialServices: ServiceItem[] = [
  {
    id: "service-1",
    title: "Pintura de fachadas",
    description: "Servicio completo de restauración y renovación de fachadas.",
    icon: "paintbrush",
    order: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "service-2",
    title: "Pintura industrial",
    description: "Aplicación especializada en estructuras y equipos industriales.",
    icon: "building",
    order: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const services: ServiceItem[] = [...initialServices];

export function getServices(): ServiceItem[] {
  return services;
}

export function createService(input: Omit<ServiceItem, "id" | "createdAt" | "updatedAt">): ServiceItem {
  const service: ServiceItem = {
    id: `service-${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...input
  };

  services.unshift(service);
  return service;
}

export function getServiceById(id: string): ServiceItem | undefined {
  return services.find((item) => item.id === id);
}

export function updateService(id: string, updates: Partial<Omit<ServiceItem, "id" | "createdAt">>): ServiceItem | undefined {
  const index = services.findIndex((item) => item.id === id);
  if (index === -1) {
    return undefined;
  }

  const updatedService: ServiceItem = {
    ...services[index],
    ...updates,
    updatedAt: new Date().toISOString()
  };

  services[index] = updatedService;
  return updatedService;
}

export function deleteService(id: string): boolean {
  const index = services.findIndex((item) => item.id === id);
  if (index === -1) {
    return false;
  }

  services.splice(index, 1);
  return true;
}
