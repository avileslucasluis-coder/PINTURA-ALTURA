"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";

export function About() {
  const stats = [
    { value: "10+", label: "Años de Experiencia" },
    { value: "500+", label: "Proyectos Realizados" },
    { value: "100%", label: "Clientes Satisfechos" },
    { value: "24/7", label: "Soporte de Emergencia" },
  ];

  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2 relative"
          >
            <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1541888045610-18e47eb5ce15?q=80&w=1964&auto=format&fit=crop"
                alt="Pintor en altura trabajando"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent" />
            </div>
            
            {/* Floating badge */}
            <motion.div 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="absolute -bottom-10 -right-10 bg-primary text-white p-8 rounded-full shadow-xl hidden md:flex flex-col items-center justify-center w-40 h-40 border-8 border-white"
            >
              <span className="text-4xl font-bold">10+</span>
              <span className="text-sm font-medium text-center leading-tight mt-1">Años<br/>Experiencia</span>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <h2 className="text-primary font-bold tracking-wider uppercase text-sm mb-2">Sobre TUPINTOR LUIS</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-secondary mb-6 font-heading">
              Experiencia y Compromiso en Cada Gota de Pintura
            </h3>
            
            <p className="text-slate-600 text-lg mb-8 leading-relaxed">
              Somos una empresa radicada en Guayaquil, especializada en trabajos de pintura en altura y mantenimiento de fachadas. Nuestro enfoque principal es la seguridad, la calidad de los materiales y la satisfacción total de nuestros clientes.
            </p>
            
            <ul className="space-y-4 mb-10">
              {[
                "Personal altamente capacitado y certificado.",
                "Uso exclusivo de materiales de primera calidad.",
                "Cumplimiento estricto de normas de seguridad industrial.",
                "Garantía por escrito en todos nuestros trabajos."
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="text-primary shrink-0 mt-1" size={20} />
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>

            <div className="grid grid-cols-2 gap-6 pt-8 border-t border-slate-100">
              {stats.map((stat, index) => (
                <div key={index}>
                  <p className="text-3xl font-bold text-secondary mb-1">{stat.value}</p>
                  <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
