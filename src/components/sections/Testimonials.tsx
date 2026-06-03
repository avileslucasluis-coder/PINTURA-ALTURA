"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

export function Testimonials() {
  const testimonials = [
    {
      name: "Carlos Mendoza",
      role: "Administrador de Edificio Torre Norte",
      content: "Excelente trabajo de TUPINTOR LUIS. Cumplieron con los tiempos y las medidas de seguridad fueron impecables. El edificio quedó como nuevo.",
      rating: 5,
    },
    {
      name: "María Fernanda P.",
      role: "Propietaria",
      content: "Muy profesionales desde el primer contacto. Cotización clara y trabajo de altísima calidad. Recomiendo 100% sus servicios de impermeabilización.",
      rating: 5,
    },
    {
      name: "Ing. Roberto Sánchez",
      role: "Constructora RS",
      content: "Hemos trabajado con ellos en múltiples proyectos industriales y residenciales. Siempre entregan acabados de primera bajo estrictas normas de seguridad.",
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="py-24 bg-secondary text-white relative overflow-hidden">
      {/* Decorative bg */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-primary font-bold tracking-wider uppercase text-sm mb-2">Testimonios</h2>
            <h3 className="text-3xl md:text-5xl font-bold mb-6 font-heading">Lo que Dicen Nuestros Clientes</h3>
            <p className="text-slate-400 text-lg">
              La satisfacción de nuestros clientes es nuestra mejor carta de presentación y garantía de calidad.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 relative"
            >
              <Quote className="absolute top-6 right-6 text-primary/20" size={48} />
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={18} className="text-primary fill-primary" />
                ))}
              </div>
              <p className="text-slate-300 italic mb-6 relative z-10">
                "{testimonial.content}"
              </p>
              <div>
                <h4 className="font-bold text-white">{testimonial.name}</h4>
                <p className="text-sm text-slate-400">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
