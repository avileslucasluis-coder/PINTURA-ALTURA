"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, ChevronLeft, ChevronRight, X, ZoomIn, Eye } from "lucide-react";
import Image from "next/image";
import { ProjectData } from "@/data/projects";

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
      { threshold, rootMargin: "0px 0px -50px 0px" }
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
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
            className={`carousel-dot ${i === current ? 'active' : ''}`}
            aria-label={`Elemento ${i + 1}`}
          />
        ))}
      </div>
    </>
  );
}

function Lightbox({
  media,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: {
  media: MediaItem[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  const current = media[currentIndex];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="lightbox-overlay z-[100]"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white/80 hover:text-white z-10 p-2"
        aria-label="Cerrar"
      >
        <X size={32} />
      </button>

      {media.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all z-10"
            aria-label="Anterior"
          >
            <ChevronLeft size={28} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all z-10"
            aria-label="Siguiente"
          >
            <ChevronRight size={28} />
          </button>
        </>
      )}

      <motion.div
        key={currentIndex}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="relative w-[90vw] h-[80vh] max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        {current.type === "video" ? (
          <video
            src={current.src}
            className="w-full h-full object-contain"
            controls
            autoPlay
          />
        ) : (
          <Image
            src={current.src}
            alt={"Proyecto"}
            fill
            className="object-contain"
            sizes="90vw"
            priority
          />
        )}
      </motion.div>

      <div className="absolute bottom-6 text-white/60 text-sm">
        {currentIndex + 1} / {media.length}
      </div>
    </motion.div>
  );
}

export function Portfolio({ projects }: { projects: ProjectData[] }) {
  const [filter, setFilter] = useState("Todos");
  const [lightbox, setLightbox] = useState<{ media: MediaItem[]; index: number } | null>(null);
  const { visibleItems, observe } = useIntersectionObserver(0.1);

  const categories = ["Todos", ...Array.from(new Set(projects.map(p => p.category)))];

  const filteredProjects = filter === "Todos"
    ? projects
    : projects.filter(p => p.category === filter);

  const openLightbox = (project: ProjectData, index = 0) => {
    const media = getProjectMedia(project);
    if (media.length > 0) {
      setLightbox({ media, index });
    }
  };

  return (
    <section id="portfolio" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h2 className="text-primary font-bold tracking-wider uppercase text-sm mb-2">Nuestro Portafolio</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-secondary mb-6 font-heading">
              Proyectos <span className="animate-gradient-text">Destacados</span>
            </h3>
            <p className="text-slate-600 text-lg">
              Conoce algunos de los trabajos realizados por TUPINTOR LUIS. Resultados que hablan por sí solos.
            </p>
          </motion.div>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-14"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`filter-btn px-6 py-2.5 rounded-full font-medium text-sm transition-all ${
                filter === cat
                  ? "bg-primary text-white shadow-lg shadow-primary/25"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => {
              const isVisible = visibleItems.has(`project-${project.id}`);
              const media = getProjectMedia(project);

              return (
                <motion.div
                  key={project.id}
                  id={`project-${project.id}`}
                  ref={observe}
                  layout
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  animate={{
                    opacity: isVisible ? 1 : 0,
                    y: isVisible ? 0 : 40,
                    scale: isVisible ? 1 : 0.95
                  }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.08,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                  className="portfolio-card bg-white rounded-2xl overflow-hidden shadow-md group border border-slate-100/80 flex flex-col cursor-pointer"
                  onClick={() => openLightbox(project)}
                >
                  <div className="relative h-72 overflow-hidden bg-slate-100">
                    {media.length > 0 ? (
                      <MediaCarousel media={media} title={project.title} />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-slate-400">
                        <div className="text-center">
                          <Eye size={32} className="mx-auto mb-2 opacity-40" />
                          <span className="text-sm">Sin Imagen</span>
                        </div>
                      </div>
                    )}

                    <div className="portfolio-image-overlay flex items-end justify-center pb-6">
                      <div className="portfolio-overlay-content text-center text-white">
                        <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full inline-block mb-3">
                          <ZoomIn size={24} />
                        </div>
                        <p className="text-sm font-medium">Ver Detalle</p>
                      </div>
                    </div>

                    <div className="portfolio-badge absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3.5 py-1.5 rounded-full text-xs font-bold text-primary shadow-sm z-[3]">
                      {project.category}
                    </div>

                    {media.length > 1 && (
                      <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-medium text-white z-[3]">
                        {media.length} elementos
                      </div>
                    )}
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <h4 className="text-lg font-bold text-secondary mb-2 group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h4>

                    <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                      <div className="flex items-center gap-1.5">
                        <MapPin size={14} className="text-primary" />
                        <span>{project.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar size={14} className="text-primary" />
                        <span>{project.date}</span>
                      </div>
                    </div>

                    <p className="text-slate-600 text-sm line-clamp-2 flex-grow leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-slate-500 py-16"
          >
            <Eye size={48} className="mx-auto mb-4 opacity-30" />
            <p className="text-lg">No hay proyectos en esta categoría aún.</p>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {lightbox && (
          <Lightbox
            media={lightbox.media}
            currentIndex={lightbox.index}
            onClose={() => setLightbox(null)}
            onPrev={() => setLightbox(prev => prev ? { ...prev, index: (prev.index - 1 + prev.media.length) % prev.media.length } : null)}
            onNext={() => setLightbox(prev => prev ? { ...prev, index: (prev.index + 1) % prev.media.length } : null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}