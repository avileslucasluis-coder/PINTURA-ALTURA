"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ArrowLeft, MapPin, Calendar, ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import Image from "next/image";
import { projectsData, ProjectData } from "@/data/projects";

type MediaItem = { type: "image" | "video"; src: string };

function getProjectMedia(project: ProjectData): MediaItem[] {
  const imageItems: MediaItem[] = project.images.map((src) => ({ type: "image", src }));
  const videoItems: MediaItem[] = (project.video ?? []).map((src) => ({ type: "video", src }));
  return [...imageItems, ...videoItems];
}

function useIntersectionObserver(threshold = 0.1) {
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold, rootMargin: "0px 0px -30px 0px" }
    );
    return () => observerRef.current?.disconnect();
  }, [threshold]);

  const observe = useCallback((element: HTMLElement | null) => {
    if (element && observerRef.current) {
      observerRef.current.observe(element);
    }
  }, []);

  return { visibleItems, observe };
}

function MediaCarousel({ media, title }: { media: MediaItem[]; title: string }) {
  const [current, setCurrent] = useState(0);

  if (media.length === 0) return null;

  const renderMedia = (item: MediaItem, alt: string) => {
    if (item.type === "video") {
      return (
        <video
          src={item.src}
          className="w-full h-full object-cover portfolio-image"
          muted
          loop
          playsInline
          autoPlay
        />
      );
    }
    return (
      <Image
        src={item.src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover portfolio-image"
        loading="lazy"
      />
    );
  };

  if (media.length === 1) {
    return renderMedia(media[0], title);
  }

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0"
        >
          {renderMedia(media[current], `${title} - ${current + 1}`)}
        </motion.div>
      </AnimatePresence>
      <button
        onClick={(e) => { e.stopPropagation(); setCurrent((p) => (p - 1 + media.length) % media.length); }}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/60 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Anterior"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); setCurrent((p) => (p + 1) % media.length); }}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/60 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Siguiente"
      >
        <ChevronRight size={18} />
      </button>
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
        {media.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current ? "w-4 bg-white" : "w-1.5 bg-white/50"
            }`}
          />
        ))}
      </div>
    </>
  );
}

export default function ProyectosPage() {
  const [filter, setFilter] = useState("Todos");
  const [lightbox, setLightbox] = useState<{ media: MediaItem[]; index: number } | null>(null);
  const { visibleItems, observe } = useIntersectionObserver(0.1);

  // Filtramos por visibilidad y luego por categoría
  const projects = projectsData.filter(p => p.visible);
  
  const categories = ["Todos", ...Array.from(new Set(projects.map(p => p.category)))];

  const filteredProjects = filter === "Todos"
    ? projects
    : projects.filter(p => p.category === filter);

  useEffect(() => {
    if (lightbox !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [lightbox]);

  const handleNextImage = useCallback(() => {
    if (!lightbox) return;
    setLightbox({ ...lightbox, index: (lightbox.index + 1) % lightbox.media.length });
  }, [lightbox]);

  const handlePrevImage = useCallback(() => {
    if (!lightbox) return;
    setLightbox({ ...lightbox, index: (lightbox.index - 1 + lightbox.media.length) % lightbox.media.length });
  }, [lightbox]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightbox) return;
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") handleNextImage();
      if (e.key === "ArrowLeft") handlePrevImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightbox, handleNextImage, handlePrevImage]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-24 pb-20">
        <div className="container mx-auto px-6">
          <div className="mb-10 animate-fade-in">
            <Link 
              href="/"
              className="inline-flex items-center text-primary hover:text-secondary font-medium transition-colors mb-6 group"
            >
              <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
              Volver al inicio
            </Link>
            
            <h1 className="text-4xl md:text-5xl font-extrabold text-secondary tracking-tight mb-4">
              Nuestro Portafolio
            </h1>
            <div className="w-20 h-1.5 bg-primary rounded-full mb-6"></div>
            <p className="text-slate-600 text-lg md:text-xl max-w-3xl">
              Explora nuestra galería de proyectos recientes. Cada trabajo refleja nuestro compromiso con la calidad, el detalle y la satisfacción del cliente.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-10 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  filter === cat
                    ? "bg-primary text-white shadow-md shadow-primary/20 scale-105"
                    : "bg-white text-slate-600 hover:bg-slate-100 hover:text-secondary border border-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => {
              const isVisible = visibleItems.has(`project-${project.id}`);
              const media = getProjectMedia(project);
              
              return (
                <div
                  key={project.id}
                  id={`project-${project.id}`}
                  ref={observe}
                  className={`bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 group flex flex-col h-full transition-all duration-700 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                  }`}
                  style={{ transitionDelay: `${index % 3 * 100}ms` }}
                >
                  <div className="relative h-64 overflow-hidden bg-slate-100">
                    <MediaCarousel media={media} title={project.title} />
                    
                    {/* Botón para expandir galería */}
                    {media.length > 0 && (
                      <button
                        onClick={() => setLightbox({ media, index: 0 })}
                        className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-secondary p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-primary hover:text-white hover:scale-110 shadow-sm z-20"
                        title="Ver galería ampliada"
                      >
                        <ZoomIn size={18} />
                      </button>
                    )}

                    <div className="absolute top-4 left-4 z-20">
                      <span className="bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex-grow flex flex-col">
                    <h3 className="text-xl font-bold text-secondary mb-3 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-slate-600 mb-6 flex-grow text-sm leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-col gap-2 mt-auto pt-4 border-t border-slate-100">
                      <div className="flex items-center text-sm font-medium text-slate-500">
                        <MapPin size={16} className="text-primary/70 mr-2 shrink-0" />
                        <span className="truncate">{project.location}</span>
                      </div>
                      <div className="flex items-center text-sm font-medium text-slate-500">
                        <Calendar size={16} className="text-primary/70 mr-2 shrink-0" />
                        <span>{project.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {filteredProjects.length === 0 && (
            <div className="text-center py-20 bg-white rounded-2xl border border-slate-100 mt-8">
              <h3 className="text-2xl font-bold text-slate-400 mb-2">No hay proyectos</h3>
              <p className="text-slate-500">Aún no hemos agregado proyectos en esta categoría.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <WhatsAppButton />

      {/* Lightbox para vista ampliada */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-12"
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-6 right-6 text-white/70 hover:text-white p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all"
            >
              <X size={24} />
            </button>

            {lightbox.media.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}
                  className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 md:p-4 bg-white/10 hover:bg-white/20 rounded-full transition-all"
                >
                  <ChevronLeft size={32} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); handleNextImage(); }}
                  className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 md:p-4 bg-white/10 hover:bg-white/20 rounded-full transition-all"
                >
                  <ChevronRight size={32} />
                </button>
              </>
            )}

            <div 
              className="relative w-full max-w-5xl aspect-[4/3] md:aspect-[16/9] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={lightbox.index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0"
                >
                  {lightbox.media[lightbox.index].type === "video" ? (
                    <video
                      src={lightbox.media[lightbox.index].src}
                      className="w-full h-full object-contain"
                      controls
                      autoPlay
                    />
                  ) : (
                    <Image
                      src={lightbox.media[lightbox.index].src}
                      alt="Proyecto ampliado"
                      fill
                      className="object-contain"
                      sizes="100vw"
                      priority
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Indicador de posición en el lightbox */}
              {lightbox.media.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-1.5 rounded-full text-sm font-medium backdrop-blur-md">
                  {lightbox.index + 1} / {lightbox.media.length}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}