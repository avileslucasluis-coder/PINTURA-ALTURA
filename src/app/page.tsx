"use client";

import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Trust } from "@/components/sections/Trust";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Portfolio } from "@/components/sections/Portfolio";
import Link from "next/link";
import { motion } from "framer-motion";
import { projectsData } from "@/data/projects";

export default function Home() {
  // Solo mostramos proyectos visibles y hasta un máximo de 6 en el inicio
  const visibleProjects = projectsData.filter(p => p.visible).slice(0, 6);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        
        {/* Services Preview */}
        <section id="services" className="py-24 bg-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-primary font-bold tracking-wider uppercase text-sm mb-2">Nuestros Servicios</h2>
                <h3 className="text-3xl md:text-5xl font-bold text-secondary mb-6 font-heading">Soluciones Integrales</h3>
                <p className="text-slate-600 text-lg mb-8">
                  Ofrecemos un catálogo completo de servicios diseñados para mantener, proteger y embellecer su infraestructura.
                </p>
                <Link
                  href="/servicios"
                  className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105"
                >
                  Ver Todos los Servicios
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Dynamic Portfolio Section */}
        <Portfolio projects={visibleProjects} />

        {/* View all projects button container */}
        {visibleProjects.length > 0 && (
          <div className="text-center pb-24 bg-white -mt-12">
            <Link
              href="/proyectos"
              className="inline-block bg-secondary hover:bg-secondary-light text-white px-8 py-3.5 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg"
            >
              Ver Todos los Proyectos
            </Link>
          </div>
        )}

        <About />
        <Trust />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
