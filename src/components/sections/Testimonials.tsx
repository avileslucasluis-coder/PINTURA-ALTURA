"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Quote, Send, CheckCircle2 } from "lucide-react";

type ApprovedReview = {
  id: number;
  name: string;
  content: string;
  rating: number;
};

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

  const [approvedReviews, setApprovedReviews] = useState<ApprovedReview[]>([]);

  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const res = await fetch("/api/reviews");
        if (res.ok) {
          const data = await res.json();
          setApprovedReviews(data);
        }
      } catch {
        // Si falla, simplemente no se muestran reseñas adicionales
      }
    };
    loadReviews();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !content.trim() || rating === 0) {
      setError("Por favor completa tu nombre, comentario y calificación.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, content, rating }),
      });

      if (!res.ok) throw new Error("Error al enviar");

      setSubmitted(true);
      setName("");
      setContent("");
      setRating(0);
    } catch {
      setError("No se pudo enviar tu reseña. Intenta de nuevo.");
    } finally {
      setSubmitting(false);
    }
  };

  // Combinamos las reseñas fijas con las aprobadas desde la base de datos
  const allTestimonials = [
    ...testimonials,
    ...approvedReviews.map((r) => ({
      name: r.name,
      role: "Cliente",
      content: r.content,
      rating: r.rating,
    })),
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {allTestimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (index % 3) * 0.1 }}
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

        {/* Formulario para dejar una reseña */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
        >
          {submitted ? (
            <div className="text-center py-8">
              <CheckCircle2 className="mx-auto mb-4 text-primary" size={48} />
              <h4 className="text-xl font-bold mb-2">¡Gracias por tu reseña!</h4>
              <p className="text-slate-400">
                La revisaremos pronto y la publicaremos aquí.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 text-primary hover:text-white font-medium transition-colors"
              >
                Dejar otra reseña
              </button>
            </div>
          ) : (
            <>
              <h4 className="text-xl font-bold mb-1 text-center">Cuéntanos tu experiencia</h4>
              <p className="text-slate-400 text-sm mb-6 text-center">
                Tu reseña será revisada antes de publicarse.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">Tu nombre</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Ej. Ana Torres"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">Calificación</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-0.5"
                      >
                        <Star
                          size={26}
                          className={
                            star <= (hoverRating || rating)
                              ? "text-primary fill-primary"
                              : "text-slate-600"
                          }
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">Tu comentario</label>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    placeholder="Cuéntanos cómo fue tu experiencia con nuestro trabajo..."
                  />
                </div>

                {error && (
                  <p className="text-red-400 text-sm">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-primary hover:bg-primary-dark disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Send size={18} />
                  {submitting ? "Enviando..." : "Enviar Reseña"}
                </button>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}