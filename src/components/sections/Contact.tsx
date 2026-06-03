"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useState } from "react";

export function Contact() {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setStatus("sending");
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", phone: "", email: "", message: "" });
      setTimeout(() => setStatus(""), 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-primary font-bold tracking-wider uppercase text-sm mb-2">Contacto</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-secondary mb-6 font-heading">Cotiza tu Proyecto Hoy</h3>
            <p className="text-slate-600 text-lg">
              Estamos listos para evaluar tu edificio o fachada y ofrecerte la mejor solución.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100">
          
          {/* Contact Info */}
          <div className="lg:col-span-1 bg-secondary p-10 text-white flex flex-col justify-between">
            <div>
              <h4 className="text-2xl font-bold mb-6 font-heading">Información de Contacto</h4>
              <p className="text-slate-300 mb-10">Ponte en contacto directo o visítanos en nuestra oficina en Guayaquil.</p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Phone className="text-primary mt-1" size={24} />
                  <div>
                    <p className="font-bold">Teléfono / WhatsApp</p>
                    <p className="text-slate-300">+593 99 999 9999</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="text-primary mt-1" size={24} />
                  <div>
                    <p className="font-bold">Correo Electrónico</p>
                    <p className="text-slate-300">contacto@tupintorluis.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="text-primary mt-1" size={24} />
                  <div>
                    <p className="font-bold">Ubicación</p>
                    <p className="text-slate-300">Guayaquil, Ecuador</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="text-primary mt-1" size={24} />
                  <div>
                    <p className="font-bold">Horario de Atención</p>
                    <p className="text-slate-300">Lunes a Sábado: 8:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-12 pt-8 border-t border-white/10">
              <p className="text-slate-400 text-sm">Respuesta promedio en menos de 2 horas.</p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2 p-10 lg:p-12">
            <h4 className="text-2xl font-bold text-secondary mb-8 font-heading">Envíanos un Mensaje</h4>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Nombre Completo</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                    placeholder="Ej. Juan Pérez"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Teléfono</label>
                  <input 
                    type="tel" 
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                    placeholder="Ej. 099 999 9999"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Correo Electrónico (Opcional)</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                  placeholder="ejemplo@correo.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Mensaje / Requerimiento</label>
                <textarea 
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none"
                  placeholder="Describe el trabajo que necesitas cotizar..."
                />
              </div>

              <button 
                type="submit" 
                disabled={status === "sending"}
                className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status === "sending" ? "Enviando..." : "Enviar Solicitud"}
              </button>

              {status === "success" && (
                <p className="text-green-600 font-medium text-center mt-4 bg-green-50 p-3 rounded-lg">
                  ¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.
                </p>
              )}
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
