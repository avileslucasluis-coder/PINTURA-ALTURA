"use client";

import { useState, useEffect } from "react";
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

type ProjectImage = {
  id: string;
  url: string;
  alt: string | null;
  order: number;
};

type Project = {
  id: string;
  title: string;
  location: string;
  date: string;
  description: string;
  category: string;
  imageUrl: string | null;
  images: ProjectImage[];
};

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          // Limit to 6 projects for the landing page preview
          setProjects(data.slice(0, 6));
        }
      })
      .catch((err) => console.error("Error fetching projects for homepage:", err));
  }, []);

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
        <Portfolio projects={projects} />

        {/* View all projects button container */}
        {projects.length > 0 && (
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
