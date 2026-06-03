"use client";

import { motion } from "framer-motion";
import { Paintbrush2, Building2, Mountain, Droplet, Brush, Construction, Wrench, ShieldCheck } from "lucide-react";

const services = [
  { icon: Building2, title: "Pintura de Fachadas", desc: "Renovación completa de exteriores para edificios comerciales y residenciales." },
  { icon: Mountain, title: "Trabajos en Altura", desc: "Mantenimiento y pintura con equipos de descenso y líneas de vida certificadas." },
  { icon: Droplet, title: "Sellado de Grietas", desc: "Reparación de fisuras y tratamiento de humedad para prevenir filtraciones." },
  { icon: Brush, title: "Limpieza Exterior", desc: "Lavado a presión y remoción de moho u hollín en vidrios y paredes." },
  { icon: Construction, title: "Pintura Industrial", desc: "Recubrimientos especiales para galpones, tanques y estructuras metálicas." },
  { icon: Wrench, title: "Restauración", desc: "Recuperación de superficies deterioradas antes de la aplicación de pintura." },
  { icon: ShieldCheck, title: "Seguridad Total", desc: "Uso estricto de arneses y EPP para garantizar cero accidentes." },
  { icon: Paintbrush2, title: "Acabados Premium", desc: "Materiales de alta durabilidad resistentes al clima de Guayaquil." },
];

export function Services() {
  return (
    <section id="services" className="py-24 bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-primary font-bold tracking-wider uppercase text-sm mb-2">Nuestros Servicios</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-secondary mb-6 font-heading">Soluciones Integrales en Altura</h3>
            <p className="text-slate-600 text-lg">
              Ofrecemos un catálogo completo de servicios diseñados para mantener, proteger y embellecer su infraestructura.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 border border-slate-100 group"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                <service.icon size={28} className="text-primary group-hover:text-white transition-colors" />
              </div>
              <h4 className="text-xl font-bold text-secondary mb-3">{service.title}</h4>
              <p className="text-slate-600">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
