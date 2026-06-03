"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Pencil, Trash2, Image as ImageIcon, Eye, EyeOff, Upload, X, ChevronDown, Search, Loader2, BarChart3, TrendingUp, Globe, Calendar } from "lucide-react";
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
  visible: boolean;
  order: number;
  images: ProjectImage[];
  createdAt: string;
};

type AnalyticsData = {
  totalViews: number;
  viewsByPath: { path: string; count: number }[];
  dailyStats: { date: string; count: number }[];
};

const CATEGORIES = [
  "Pintura de Fachadas", "Pintura de Edificios", "Limpieza Exterior",
  "Sellado de Grietas", "Pintura Industrial", "Restauración",
  "Impermeabilización", "Trabajos en Altura"
];

export default function AdminDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [activeTab, setActiveTab] = useState<"projects" | "analytics">("projects");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: "", location: "", date: "", description: "", category: CATEGORIES[0], imageUrl: "", visible: true, order: 0
  });
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [projectLoading, setProjectLoading] = useState(true);
  const [analyticsLoading, setAnalyticsLoading] = useState(true);

  const showToast = useCallback((message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const fetchProjects = async () => {
    setProjectLoading(true);
    try {
      const res = await fetch("/api/projects?all=true");
      if (res.ok) {
        const data = await res.json();
        setProjects(Array.isArray(data) ? data : []);
      } else {
        setProjects([]);
      }
    } catch {
      showToast("Error al cargar proyectos", "error");
      setProjects([]);
    } finally {
      setProjectLoading(false);
    }
  };

  const fetchAnalytics = useCallback(async () => {
    setAnalyticsLoading(true);
    try {
      const res = await fetch("/api/analytics");
      if (res.ok) {
        const data = await res.json();
        setAnalytics(data);
      }
    } catch {
      console.error("Error fetching analytics");
    } finally {
      setAnalyticsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
    fetchAnalytics();
  }, [fetchAnalytics]);

  // Generate previews when files change
  useEffect(() => {
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setPreviews(newPreviews);
    return () => newPreviews.forEach(url => URL.revokeObjectURL(url));
  }, [files]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let finalImageUrl = formData.imageUrl;
      const uploadedUrls: string[] = [];

      // Upload images if selected
      if (files.length > 0) {
        const formDataUpload = new FormData();
        files.forEach(file => formDataUpload.append("files", file));
        
        const resUpload = await fetch("/api/upload", {
          method: "POST",
          body: formDataUpload
        });
        
        if (resUpload.ok) {
          const { url, urls } = await resUpload.json();
          finalImageUrl = finalImageUrl || url;
          uploadedUrls.push(...(urls || [url]));
        }
      }

      const payload = { ...formData, imageUrl: finalImageUrl };
      const url = editingId ? `/api/projects/${editingId}` : "/api/projects";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const savedProject = await res.json();

        // If we uploaded images, associate them with the project
        if (uploadedUrls.length > 0) {
          await fetch(`/api/projects/${savedProject.id}/images`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              images: uploadedUrls.map((u, i) => ({ url: u, order: i }))
            })
          });
        }

        closeModal();
        fetchProjects();
        fetchAnalytics(); // Refresh analytics as views/counts might be affected
        showToast(editingId ? "Proyecto actualizado" : "Proyecto creado");
      } else {
        showToast("Error al guardar proyecto", "error");
      }
    } catch {
      showToast("Error al guardar proyecto", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (project: Project) => {
    setFormData({
      title: project.title,
      location: project.location,
      date: project.date,
      description: project.description,
      category: project.category,
      imageUrl: project.imageUrl || "",
      visible: project.visible,
      order: project.order,
    });
    setEditingId(project.id);
    setFiles([]);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("¿Estás seguro de eliminar este proyecto? Se eliminarán también todas sus imágenes.")) {
      try {
        const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
        if (res.ok) {
          fetchProjects();
          showToast("Proyecto eliminado");
        }
      } catch {
        showToast("Error al eliminar proyecto", "error");
      }
    }
  };

  const handleToggleVisibility = async (project: Project) => {
    try {
      const res = await fetch(`/api/projects/${project.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...project, visible: !project.visible })
      });
      if (res.ok) {
        fetchProjects();
        showToast(project.visible ? "Proyecto oculto" : "Proyecto visible");
      }
    } catch {
      showToast("Error al cambiar visibilidad", "error");
    }
  };

  const handleDeleteImage = async (projectId: string, imageId: string) => {
    try {
      const res = await fetch(`/api/projects/${projectId}/images`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageId })
      });
      if (res.ok) {
        fetchProjects();
        showToast("Imagen eliminada");
      }
    } catch {
      showToast("Error al eliminar imagen", "error");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    setFiles(prev => [...prev, ...selectedFiles]);
  };

  const removePreview = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFiles([]);
    setFormData({
      title: "", location: "", date: "", description: "",
      category: CATEGORIES[0], imageUrl: "", visible: true, order: 0
    });
  };

  const filteredProjects = projects.filter(p =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // For the custom premium chart
  const maxDayCount = analytics && analytics.dailyStats.length > 0
    ? Math.max(...analytics.dailyStats.map(d => d.count), 1)
    : 1;

  // Format date helper: "2026-06-03" -> "Miér 03"
  const formatDateLabel = (dateStr: string) => {
    try {
      const [year, month, day] = dateStr.split("-").map(Number);
      const date = new Date(year, month - 1, day);
      const days = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
      return `${days[date.getDay()]} ${day.toString().padStart(2, "0")}`;
    } catch {
      return dateStr;
    }
  };

  return (
    <div>
      {/* Toast */}
      {toast && (
        <div className={`toast-enter fixed top-4 right-4 z-50 px-6 py-3 rounded-xl shadow-lg font-medium text-white ${
          toast.type === "success" ? "bg-green-500" : "bg-red-500"
        }`}>
          {toast.message}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-secondary font-heading">Panel de Administración</h1>
          <p className="text-slate-500 mt-1">Control de contenidos y métricas de visitantes</p>
        </div>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={() => {
              closeModal();
              setIsModalOpen(true);
            }}
            className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-all shadow-md hover:shadow-lg"
          >
            <Plus size={20} /> Nuevo Proyecto
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 mb-8">
        <button
          onClick={() => setActiveTab("projects")}
          className={`pb-4 px-6 font-semibold text-sm transition-all border-b-2 ${
            activeTab === "projects"
              ? "border-primary text-primary"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          Proyectos ({projects.length})
        </button>
        <button
          onClick={() => setActiveTab("analytics")}
          className={`pb-4 px-6 font-semibold text-sm transition-all border-b-2 flex items-center gap-2 ${
            activeTab === "analytics"
              ? "border-primary text-primary"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <BarChart3 size={16} />
          Visitas del Sitio {analytics ? `(${analytics.totalViews})` : ""}
        </button>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-white p-4 rounded-xl border border-slate-200 text-center">
          <p className="text-2xl font-bold text-secondary">{projects.length}</p>
          <p className="text-xs text-slate-500 font-medium mt-0.5">Total Proyectos</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 text-center">
          <p className="text-2xl font-bold text-green-600">{projects.filter(p => p.visible).length}</p>
          <p className="text-xs text-slate-500 font-medium mt-0.5">Visibles</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 text-center">
          <p className="text-2xl font-bold text-slate-400">{projects.filter(p => !p.visible).length}</p>
          <p className="text-xs text-slate-500 font-medium mt-0.5">Ocultos</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 text-center">
          <p className="text-2xl font-bold text-primary">{projects.reduce((acc, p) => acc + (p.images?.length || 0), 0)}</p>
          <p className="text-xs text-slate-500 font-medium mt-0.5">Imágenes</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 text-center col-span-2 md:col-span-1">
          <p className="text-2xl font-bold text-amber-500 flex items-center justify-center gap-1">
            {analyticsLoading ? (
              <Loader2 size={20} className="animate-spin text-slate-400" />
            ) : (
              analytics?.totalViews || 0
            )}
          </p>
          <p className="text-xs text-slate-500 font-medium mt-0.5">Visitas Totales</p>
        </div>
      </div>

      {activeTab === "projects" ? (
        <>
          {/* Search */}
          <div className="relative mb-6">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por título, categoría o ubicación..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
            />
          </div>

          {/* Projects grid/list */}
          {projectLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 size={32} className="animate-spin text-primary" />
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProjects.length === 0 ? (
                <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
                  <ImageIcon size={48} className="mx-auto mb-4 text-slate-300" />
                  <p className="text-slate-500 text-lg">{searchTerm ? "No se encontraron proyectos" : "No hay proyectos. Crea el primero."}</p>
                </div>
              ) : (
                filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    className={`bg-white rounded-xl border transition-all hover:shadow-md ${
                      project.visible ? 'border-slate-200' : 'border-slate-200 opacity-60'
                    }`}
                  >
                    <div className="p-4 md:p-6">
                      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                        {/* Main image */}
                        <div className="w-full md:w-40 h-32 md:h-28 relative rounded-lg overflow-hidden bg-slate-100 shrink-0">
                          {project.imageUrl ? (
                            <Image src={project.imageUrl} alt={project.title} fill className="object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-300">
                              <ImageIcon size={28} />
                            </div>
                          )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-lg font-bold text-secondary truncate">{project.title}</h3>
                                {!project.visible && (
                                  <span className="bg-slate-200 text-slate-500 px-2 py-0.5 rounded text-xs font-medium shrink-0">Oculto</span>
                                )}
                              </div>
                              <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 mb-2">
                                <span className="bg-primary/10 text-primary px-2.5 py-0.5 rounded-full text-xs font-semibold">
                                  {project.category}
                                </span>
                                <span>{project.location}</span>
                                <span>{project.date}</span>
                              </div>
                              <p className="text-slate-600 text-sm line-clamp-1">{project.description}</p>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-1.5 shrink-0">
                              <button
                                onClick={() => handleToggleVisibility(project)}
                                className={`p-2 rounded-lg transition-all ${
                                  project.visible
                                    ? 'text-green-600 hover:bg-green-50'
                                    : 'text-slate-400 hover:bg-slate-100'
                                }`}
                                title={project.visible ? "Ocultar" : "Mostrar"}
                              >
                                {project.visible ? <Eye size={18} /> : <EyeOff size={18} />}
                              </button>
                              <button
                                onClick={() => handleEdit(project)}
                                className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-all"
                                title="Editar"
                              >
                                <Pencil size={18} />
                              </button>
                              <button
                                onClick={() => handleDelete(project.id)}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                title="Eliminar"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </div>

                          {/* Gallery thumbnails */}
                          {project.images && project.images.length > 0 && (
                            <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                              {project.images.map((img) => (
                                <div key={img.id} className="relative w-16 h-12 rounded-lg overflow-hidden bg-slate-100 shrink-0 group/thumb">
                                  <Image src={img.url} alt={img.alt || ""} fill className="object-cover" />
                                  <button
                                    onClick={() => handleDeleteImage(project.id, img.id)}
                                    className="absolute inset-0 bg-red-500/70 flex items-center justify-center opacity-0 group-hover/thumb:opacity-100 transition-opacity"
                                    title="Eliminar imagen"
                                  >
                                    <X size={14} className="text-white" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </>
      ) : (
        /* Analytics Tab content */
        <div className="space-y-8 animate-fade-in">
          {analyticsLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 size={32} className="animate-spin text-primary" />
            </div>
          ) : !analytics ? (
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
              <BarChart3 size={48} className="mx-auto mb-4 text-slate-300" />
              <p className="text-slate-500 text-lg">No hay datos de analíticas disponibles.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Daily view graph */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 lg:col-span-2">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-lg font-bold text-secondary font-heading flex items-center gap-2">
                      <TrendingUp size={20} className="text-primary" />
                      Visitas de la Última Semana
                    </h3>
                    <p className="text-slate-500 text-xs mt-0.5">Tráfico diario registrado en el sitio</p>
                  </div>
                </div>

                <div className="flex items-end justify-between gap-2 h-64 pt-4 px-2 border-b border-slate-100">
                  {analytics.dailyStats.map((day, idx) => {
                    const pct = (day.count / maxDayCount) * 100;
                    return (
                      <div key={idx} className="flex flex-col items-center flex-1 h-full justify-end group">
                        {/* Tooltip on hover */}
                        <div className="mb-2 bg-secondary text-white text-xs px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-250 shadow-md font-bold z-10 select-none">
                          {day.count} {day.count === 1 ? 'vista' : 'vistas'}
                        </div>
                        {/* Bar */}
                        <div
                          style={{ height: `${pct}%` }}
                          className={`w-full max-w-[40px] rounded-t-lg transition-all duration-500 ${
                            day.count > 0 
                              ? "bg-gradient-to-t from-primary to-primary-light hover:brightness-110 shadow-sm"
                              : "bg-slate-100"
                          }`}
                        />
                        {/* Label */}
                        <span className="text-[10px] sm:text-xs text-slate-500 font-semibold mt-3 whitespace-nowrap">
                          {formatDateLabel(day.date)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Pages view list */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200">
                <h3 className="text-lg font-bold text-secondary font-heading flex items-center gap-2 mb-2">
                  <Globe size={20} className="text-primary" />
                  Páginas Más Visitadas
                </h3>
                <p className="text-slate-500 text-xs mb-6">Desglose de visitas por ruta URL</p>

                <div className="space-y-4">
                  {analytics.viewsByPath.map((item, idx) => {
                    const total = analytics.totalViews || 1;
                    const percent = Math.round((item.count / total) * 100);

                    // Prettify path name
                    let pathName = item.path;
                    if (pathName === "/") pathName = "Inicio (/)";
                    else if (pathName === "/proyectos") pathName = "Portafolio (/proyectos)";
                    else if (pathName === "/servicios") pathName = "Servicios (/servicios)";

                    return (
                      <div key={idx} className="space-y-1.5">
                        <div className="flex justify-between text-sm">
                          <span className="font-semibold text-secondary truncate max-w-[200px]" title={item.path}>
                            {pathName}
                          </span>
                          <span className="text-slate-500 font-medium">
                            {item.count} ({percent}%)
                          </span>
                        </div>
                        {/* Custom progress bar */}
                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div
                            style={{ width: `${percent}%` }}
                            className="h-full bg-primary rounded-full transition-all duration-500"
                          />
                        </div>
                      </div>
                    );
                  })}

                  {analytics.viewsByPath.length === 0 && (
                    <div className="text-center text-slate-400 py-6 text-sm">
                      No hay registros de rutas aún.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}>
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[92vh] overflow-y-auto p-6 md:p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-secondary font-heading">
                {editingId ? "Editar Proyecto" : "Nuevo Proyecto"}
              </h2>
              <button onClick={closeModal} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Título *</label>
                  <input
                    required
                    type="text"
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                    className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                    placeholder="Ej: Edificio Torre Norte"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Categoría *</label>
                  <div className="relative">
                    <select
                      value={formData.category}
                      onChange={e => setFormData({ ...formData, category: e.target.value })}
                      className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all appearance-none bg-white"
                    >
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Ubicación *</label>
                  <input
                    required
                    type="text"
                    value={formData.location}
                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                    className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                    placeholder="Ej: Urdesa, Guayaquil"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Fecha *</label>
                  <input
                    required
                    type="text"
                    value={formData.date}
                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                    className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                    placeholder="Ej: Octubre 2024"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Descripción *</label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none"
                  placeholder="Describe el proyecto realizado..."
                />
              </div>

              {/* Visibility toggle */}
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                <div>
                  <p className="font-medium text-slate-700">Visible para visitantes</p>
                  <p className="text-sm text-slate-500">Los proyectos ocultos no aparecen en la web pública</p>
                </div>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, visible: !formData.visible })}
                  className={`toggle-switch ${formData.visible ? 'active' : ''}`}
                  aria-label="Toggle visibility"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Imágenes del Proyecto</label>
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:border-primary/50 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload size={32} className="mx-auto mb-3 text-slate-400" />
                    <p className="text-slate-600 font-medium">Arrastra o haz clic para subir imágenes</p>
                    <p className="text-slate-400 text-sm mt-1">PNG, JPG, WEBP (múltiples archivos)</p>
                  </label>
                </div>

                {/* Image previews */}
                {previews.length > 0 && (
                  <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {previews.map((preview, index) => (
                      <div key={index} className="relative aspect-square rounded-xl overflow-hidden bg-slate-100 group">
                        <Image src={preview} alt={`Preview ${index + 1}`} fill className="object-cover" />
                        <button
                          type="button"
                          onClick={() => removePreview(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                        >
                          <X size={14} />
                        </button>
                        <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs text-center py-1">
                          {files[index]?.name.substring(0, 15)}...
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Existing images when editing */}
                {editingId && (
                  <div className="mt-3">
                    {formData.imageUrl && (
                      <p className="text-sm text-slate-500">
                        ✅ Imagen principal guardada. Sube nuevas para añadir más fotos.
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-700 font-medium transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-xl font-medium disabled:opacity-70 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                >
                  {loading && <Loader2 size={18} className="animate-spin" />}
                  {loading ? "Guardando..." : (editingId ? "Actualizar" : "Crear Proyecto")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
