"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, Save, Edit2 } from "lucide-react";
import Link from "next/link";
import { ImageUploader } from "../components/ImageUploader";

type Project = {
  id: string;
  title: string;
  location: string;
  date: string;
  description: string;
  category: string;
  visible: boolean;
  images: [string, string, string];
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageIndices, setImageIndices] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const res = await fetch("/api/services");
        if (res.ok) {
          const data = await res.json();
          setProjects(data);
        }
      } catch (error) {
        console.error("Error loading projects:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  const handleEdit = (project: Project) => {
    setEditingId(project.id);
    setEditForm({ ...project });
  };

  const handleImageUpload = (url: string, imageIndex: number) => {
    if (editForm) {
      const newImages = [...editForm.images] as [string, string, string];
      newImages[imageIndex] = url;
      setEditForm({
        ...editForm,
        images: newImages,
      });
    }
  };

  const handleSave = async () => {
    if (!editForm) return;

    try {
      const res = await fetch(`/api/services/${editForm.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });

      if (res.ok) {
        const updated = await res.json();
        setProjects(projects.map(p => p.id === updated.id ? updated : p));
        setEditingId(null);
        setEditForm(null);
      }
    } catch (error) {
      console.error("Error saving project:", error);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm(null);
  };

  if (loading) {
    return <div className="flex items-center justify-center py-20">Cargando...</div>;
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin" className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
          <ChevronLeft size={20} className="text-slate-500" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-secondary font-heading">Gestionar Proyectos</h1>
          <p className="text-slate-500 mt-1">Edita las imágenes y detalles de tus proyectos</p>
        </div>
      </div>

      {/* Projects List */}
      <div className="space-y-6">
        {projects.map((project) => {
          const isEditing = editingId === project.id;
          const currentForm = isEditing ? editForm : project;

          return (
            <div
              key={project.id}
              className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm"
            >
              {isEditing ? (
                <div className="space-y-6">
                  {/* Edit Form */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Título
                    </label>
                    <input
                      type="text"
                      value={editForm?.title || ""}
                      onChange={(e) =>
                        setEditForm({ ...editForm!, title: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Ubicación
                      </label>
                      <input
                        type="text"
                        value={editForm?.location || ""}
                        onChange={(e) =>
                          setEditForm({ ...editForm!, location: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Categoría
                      </label>
                      <select
                        value={editForm?.category || ""}
                        onChange={(e) =>
                          setEditForm({ ...editForm!, category: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option>Pintura Comercial</option>
                        <option>Pintura de Edificios</option>
                        <option>Pintura Residencial</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Descripción
                    </label>
                    <textarea
                      value={editForm?.description || ""}
                      onChange={(e) =>
                        setEditForm({ ...editForm!, description: e.target.value })
                      }
                      rows={3}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  {/* Image Uploaders */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-slate-700">Imágenes (exactamente 3)</h3>
                    {[0, 1, 2].map((idx) => (
                      <div key={idx}>
                        <p className="text-sm text-slate-600 mb-3">
                          Imagen {idx + 1} de 3
                        </p>
                        <ImageUploader
                          initialImage={editForm?.images[idx]}
                          onImageUpload={(url) => handleImageUpload(url, idx)}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={handleSave}
                      className="flex-1 bg-primary hover:bg-primary-dark text-white font-semibold py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <Save size={18} />
                      Guardar Cambios
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2 rounded-lg transition-colors"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  {/* View Mode */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-secondary">{project.title}</h3>
                      <p className="text-sm text-slate-600 mt-1">{project.location}</p>
                      <p className="text-xs text-slate-500 mt-1">{project.date}</p>
                    </div>
                    <button
                      onClick={() => handleEdit(project)}
                      className="p-2 hover:bg-primary/10 text-primary rounded-lg transition-colors"
                    >
                      <Edit2 size={18} />
                    </button>
                  </div>

                  {/* Images Preview */}
                  <div className="grid grid-cols-3 gap-3 mt-4">
                    {project.images.map((img, idx) => (
                      <div
                        key={idx}
                        className="aspect-square rounded-lg overflow-hidden bg-slate-100"
                      >
                        {img ? (
                          <img
                            src={img}
                            alt={`${project.title} - ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-400">
                            Sin imagen
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <p className="text-sm text-slate-600 mt-4 line-clamp-2">
                    {project.description}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
