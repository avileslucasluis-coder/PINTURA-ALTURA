"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

export function Hero() {
  return (
    <section id="home" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2071&auto=format&fit=crop')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F4C5C]/85 via-[#1F2937]/70 to-[#0A3948]/90" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#020607]/90" />
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white/90 border border-white/20 mb-8">
            <ShieldCheck size={18} className="text-accent" />
            <span className="text-sm font-medium">Seguridad y Calidad Garantizada en Guayaquil</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight font-heading [text-shadow:_0_2px_12px_rgba(0,0,0,0.65)]">
            Expertos en <span className="text-accent [text-shadow:_0_2px_12px_rgba(0,0,0,0.65)]">Pintura en Altura</span> y Fachadas
          </h1>
          
          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto font-light">
            Renovamos y protegemos la imagen de tu edificio con los más altos estándares de seguridad y acabados profesionales.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="#contact"
              className="w-full sm:w-auto px-8 py-4 bg-accent hover:bg-[#b23f33] text-white rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-lg shadow-accent/20 flex items-center justify-center gap-2"
            >
              Solicitar Cotización por WhatsApp
            </Link>
            <Link 
              href="#portfolio"
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-2"
            >
              Ver Proyectos <ArrowRight size={20} />
            </Link>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <div className="w-8 h-12 rounded-full border-2 border-white/30 flex justify-center p-1">
          <div className="w-1.5 h-3 bg-white/60 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
