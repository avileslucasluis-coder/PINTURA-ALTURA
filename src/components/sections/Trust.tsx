"use client";

import { motion } from "framer-motion";
import { HardHat, ShieldCheck, Award, Link } from "lucide-react";

export function Trust() {
  const features = [
    {
      icon: HardHat,
      title: "EPP Completo",
      desc: "Uso obligatorio de cascos, guantes y calzado de seguridad."
    },
    {
      icon: Link,
      title: "Líneas de Vida",
      desc: "Anclajes certificados y cuerdas de alta resistencia."
    },
    {
      icon: ShieldCheck,
      title: "Seguro de Riesgos",
      desc: "Personal asegurado para tranquilidad del cliente."
    },
    {
      icon: Award,
      title: "Certificaciones",
      desc: "Técnicos avalados en trabajos de alto riesgo."
    }
  ];

  return (
    <section className="py-16 bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6 font-heading">Su Seguridad y la Nuestra es Prioridad Cero</h2>
            <p className="text-white/90 text-lg mb-8 leading-relaxed">
              En TUPINTOR LUIS no escatimamos en medidas de seguridad. Entendemos los riesgos del trabajo en altura y aplicamos protocolos rigurosos para garantizar que cada proyecto se ejecute sin incidentes.
            </p>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
              <p className="font-bold text-xl mb-2">Cero Accidentes</p>
              <p className="text-white/80">Nuestro récord se mantiene intacto gracias a la capacitación constante de nuestro personal.</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-primary-dark p-6 rounded-2xl flex flex-col items-center text-center"
              >
                <div className="bg-white/10 p-4 rounded-full mb-4">
                  <feature.icon size={32} className="text-white" />
                </div>
                <h4 className="font-bold text-lg mb-2">{feature.title}</h4>
                <p className="text-white/70 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
}
