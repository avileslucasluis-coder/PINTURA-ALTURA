"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ArrowLeft, MapPin, Calendar, ChevronLeft, ChevronRight, X, ZoomIn, Eye, Loader2 } from "lucide-react";
import Image from "next/image";

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

function ImageCarousel({ images, title }: { images: { url: string; alt?: string | null }[]; title: string }) {
  const [current, setCurrent] = useState(0);

  if (images.length <= 1) {
    return images[0] ? (
      <Image
        src={images[0].url}
        alt={images[0].alt || title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover portfolio-image"
        loading="lazy"
      />
    ) : null;
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
          <Image
            src={images[current].url}
            alt={images[current].alt || `${title} - ${current + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover portfolio-image"
            loading="lazy"
          />
        </motion.div>
      </AnimatePresence>
      <button
        onClick={(e) => { e.stopPropagation(); setCurrent((p) => (p - 1 + images.length) % images.length); }}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/60 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Imagen anterior"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); setCurrent((p) => (p + 1) % images.length); }}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/60 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Siguiente imagen"
      >
        <ChevronRight size={18} />
      </button>
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
            className={`carousel-dot ${i === current ? 'active' : ''}`}
            aria-label={`Imagen ${i + 1}`}
          />
        ))}
      </div>
    </>
  );
}

function Lightbox({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: {
  images: { url: string; alt?: string | null }[];
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="lightbox-overlay"
      onClick={onClose}
    >
      <button onClick={onClose} className="absolute top-6 right-6 text-white/80 hover:text-white z-10 p-2" aria-label="Cerrar">
        <X size={32} />
      </button>
      {images.length > 1 && (
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
        <Image src={images[currentIndex].url} alt={images[currentIndex].alt || "Proyecto"} fill className="object-contain" sizes="90vw" priority />
      </motion.div>
      <div className="absolute bottom-6 text-white/60 text-sm">{currentIndex + 1} / {images.length}</div>
    </motion.div>
  );
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("Todos");
  const [categories, setCategories] = useState<string[]>(["Todos"]);
  const [lightbox, setLightbox] = useState<{ images: { url: string; alt?: string | null }[]; index: number } | null>(null);
  const { visibleItems, observe } = useIntersectionObserver(0.1);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      setProjects(data);
      const cats = ["Todos", ...Array.from(new Set(data.map((p: Project) => p.category))) as string[]];
      setCategories(cats);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = filter === "Todos"
    ? projects
    : projects.filter(p => p.category === filter);

  const getProjectImages = (project: Project) => {
    const imgs: { url: string; alt?: string | null }[] = [];
    if (project.images && project.images.length > 0) {
      project.images.forEach(img => imgs.push({ url: img.url, alt: img.alt }));
    } else if (project.imageUrl) {
      imgs.push({ url: project.imageUrl, alt: project.title });
    }
    return imgs;
  };

  const openLightbox = (project: Project, index = 0) => {
    const imgs = getProjectImages(project);
    if (imgs.length > 0) setLightbox({ images: imgs, index });
  };

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20 min-h-screen bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-14">
            <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-primary-dark mb-6 font-medium transition-colors">
              <ArrowLeft size={20} />
              Volver al Inicio
            </Link>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <h1 className="text-4xl md:text-6xl font-bold text-secondary font-heading mb-4">
                Proyectos <span className="animate-gradient-text">Destacados</span>
              </h1>
              <p className="text-slate-600 text-lg max-w-2xl">
                Explora nuestro portafolio de trabajos realizados con excelencia y profesionalismo.
              </p>
            </motion.div>
          </div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-3 mb-14"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`filter-btn px-6 py-2.5 rounded-full font-medium text-sm transition-all ${
                  filter === cat
                    ? "bg-primary text-white shadow-lg shadow-primary/25"
                    : "bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-800 border border-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 size={40} className="text-primary animate-spin mb-4" />
              <p className="text-slate-500 font-medium">Cargando proyectos...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, index) => {
                  const projectImages = getProjectImages(project);
                  const isVisible = visibleItems.has(`proj-${project.id}`);

                  return (
                    <motion.div
                      key={project.id}
                      id={`proj-${project.id}`}
                      ref={observe}
                      layout
                      initial={{ opacity: 0, y: 40, scale: 0.95 }}
                      animate={{
                        opacity: isVisible ? 1 : 0,
                        y: isVisible ? 0 : 40,
                        scale: isVisible ? 1 : 0.95
                      }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.4, 0, 0.2, 1] }}
                      className="portfolio-card bg-white rounded-2xl overflow-hidden shadow-sm group border border-slate-100 flex flex-col cursor-pointer"
                      onClick={() => openLightbox(project)}
                    >
                      {/* Image */}
                      <div className="relative h-64 sm:h-72 overflow-hidden bg-slate-100">
                        {projectImages.length > 0 ? (
                          <ImageCarousel images={projectImages} title={project.title} />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-slate-400">
                            <Eye size={32} className="opacity-40" />
                          </div>
                        )}
                        <div className="portfolio-image-overlay flex items-end justify-center pb-6">
                          <div className="portfolio-overlay-content text-center text-white">
                            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full inline-block mb-2">
                              <ZoomIn size={22} />
                            </div>
                            <p className="text-sm font-medium">Ver Detalle</p>
                          </div>
                        </div>
                        <div className="portfolio-badge absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold text-primary shadow-sm z-[3]">
                          {project.category}
                        </div>
                        {projectImages.length > 1 && (
                          <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-medium text-white z-[3]">
                            {projectImages.length} fotos
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-6 flex flex-col flex-grow">
                        <h3 className="text-lg font-bold text-secondary mb-2 group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-slate-600 text-sm mb-4 line-clamp-2 flex-grow leading-relaxed">{project.description}</p>
                        <div className="flex items-center gap-4 text-sm text-slate-500 pt-3 border-t border-slate-100">
                          <span className="flex items-center gap-1.5">
                            <MapPin size={14} className="text-primary" />
                            {project.location}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Calendar size={14} className="text-primary" />
                            {project.date}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}

          {!loading && filteredProjects.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
              <Eye size={48} className="mx-auto mb-4 text-slate-300" />
              <p className="text-slate-500 text-lg">No hay proyectos en esta categoría aún.</p>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
      <WhatsAppButton />

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <Lightbox
            images={lightbox.images}
            currentIndex={lightbox.index}
            onClose={() => setLightbox(null)}
            onPrev={() => setLightbox(prev => prev ? { ...prev, index: (prev.index - 1 + prev.images.length) % prev.images.length } : null)}
            onNext={() => setLightbox(prev => prev ? { ...prev, index: (prev.index + 1) % prev.images.length } : null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
