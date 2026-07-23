"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import {
  Plus, Edit2, Trash2, ArrowLeft, Wrench, PaintBucket, Paintbrush,
  Building, Building2, Home, Shield, Sparkles, HardHat, Ruler,
  Droplet, Sun, Layers, CheckCircle, Star
} from "lucide-react";
import { useSession } from "next-auth/react";

type Service = {
  id: string;
  title: string;
  description: string;
  icon?: string;
  order: number;
};

// Mapa de nombres de ícono (escritos en el formulario) a componentes reales de lucide-react
const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  paintbrush: Paintbrush,
  brush: Paintbrush,
  paintbucket: PaintBucket,
  bucket: PaintBucket,
  building: Building,
  building2: Building2,
  edificio: Building,
  home: Home,
  casa: Home,
  shield: Shield,
  seguridad: Shield,
  sparkles: Sparkles,
  hardhat: HardHat,
  casco: HardHat,
  ruler: Ruler,
  medida: Ruler,
  droplet: Droplet,
  gota: Droplet,
  sun: Sun,
  sol: Sun,
  layers: Layers,
  capas: Layers,
  check: CheckCircle,
  star: Star,
  estrella: Star,
};

function ServiceIcon({ icon }: { icon?: string }) {
  if (!icon) return <Wrench size={28} />;

  const normalized = icon.trim().toLowerCase().replace(/[\s_-]/g, "");
  const IconComponent = iconMap[normalized];

  if (IconComponent) {
    return <IconComponent size={28} />;
  }

  // Si no coincide con ningún ícono conocido pero el texto es un emoji corto, lo mostramos tal cual
  if (icon.length <= 2) {
    return <span className="text-2xl">{icon}</span>;
  }

  return <Wrench size={28} />;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ title: "", description: "", icon: "", order: "0" });
  const { data: session } = useSession();
  const isAdmin = !!session;

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await fetch("/api/services");
      const data = await res.json();
      setServices(data);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const url = editingId ? `/api/services/${editingId}` : "/api/services";
    const method = editingId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          order: parseInt(formData.order)
        })
      });

      if (res.ok) {
        fetchServices();
        setShowForm(false);
        setEditingId(null);
        setFormData({ title: "", description: "", icon: "", order: "0" });
      }
    } catch (error) {
      console.error("Error saving service:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("¿Eliminar este servicio?")) {
      try {
        const res = await fetch(`/api/services/${id}`, { method: "DELETE" });
        if (res.ok) {
          fetchServices();
        }
      } catch (error) {
        console.error("Error deleting service:", error);
      }
    }
  };

  const handleEdit = (service: Service) => {
    setFormData({
      title: service.title,
      description: service.description,
      icon: service.icon || "",
      order: service.order.toString()
    });
    setEditingId(service.id);
    setShowForm(true);
  };

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20 min-h-screen bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12 flex items-center justify-between">
            <div>
              <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-primary-dark mb-4">
                <ArrowLeft size={20} />
                Volver al Inicio
              </Link>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-4xl md:text-5xl font-bold text-secondary font-heading mb-4">
                  Nuestros Servicios
                </h1>
                <p className="text-slate-600 text-lg max-w-2xl">
                  Descubre todas las soluciones que ofrecemos para tus necesidades de pintura en altura y fachadas.
                </p>
              </motion.div>
            </div>

            {isAdmin && (
              <button
                onClick={() => {
                  setShowForm(!showForm);
                  setEditingId(null);
                  setFormData({ title: "", description: "", icon: "", order: "0" });
                }}
                className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-full font-semibold transition-all"
              >
                <Plus size={20} />
                Agregar Servicio
              </button>
            )}
          </div>

          {/* Form */}
          {showForm && session && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-8 mb-12 border border-slate-200 shadow-lg"
            >
              <h2 className="text-2xl font-bold text-secondary mb-6">
                {editingId ? "Editar Servicio" : "Agregar Nuevo Servicio"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    placeholder="Título del servicio"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    className="px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-primary"
                  />
                  <input
                    type="number"
                    placeholder="Orden"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: e.target.value })}
                    className="px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-primary"
                  />
                </div>
                <textarea
                  placeholder="Descripción del servicio"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-primary"
                />
                <div>
                  <input
                    type="text"
                    placeholder="Nombre del ícono"
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    className="px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-primary w-full"
                  />
                  <p className="text-xs text-slate-500 mt-1.5">
                    Opciones: paintbrush, building, home, shield, sparkles, hardhat, ruler, droplet, sun, layers, check, star
                  </p>
                </div>
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-lg font-semibold transition-all"
                  >
                    {editingId ? "Actualizar" : "Crear"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingId(null);
                      setFormData({ title: "", description: "", icon: "", order: "0" });
                    }}
                    className="bg-slate-300 hover:bg-slate-400 text-slate-800 px-8 py-3 rounded-lg font-semibold transition-all"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Services Grid */}
          {loading ? (
            <div className="text-center text-slate-600">Cargando servicios...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(index * 0.08, 0.3) }}
                  className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all border border-slate-100 group relative"
                >
                  {isAdmin && (
                    <div className="absolute top-4 right-4 flex gap-2">
                      <button
                        onClick={() => handleEdit(service)}
                        className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg transition-all"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(service.id)}
                        className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  )}

                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                    <div className="text-primary group-hover:text-white transition-colors">
                      <ServiceIcon icon={service.icon} />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-secondary mb-3">{service.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{service.description}</p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}