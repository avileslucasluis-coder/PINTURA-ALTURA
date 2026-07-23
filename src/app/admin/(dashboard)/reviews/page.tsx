"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, Check, X, Trash2, Star } from "lucide-react";
import Link from "next/link";

type Review = {
  id: number;
  name: string;
  content: string;
  rating: number;
  status: "pending" | "approved" | "rejected";
  created_at: string;
};

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"pending" | "approved" | "rejected" | "all">("pending");

  const loadReviews = async () => {
    try {
      const res = await fetch("/api/admin/reviews");
      if (res.ok) {
        const data = await res.json();
        setReviews(data);
      }
    } catch (error) {
      console.error("Error loading reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const updateStatus = async (id: number, status: "approved" | "rejected") => {
    try {
      const res = await fetch("/api/admin/reviews", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        setReviews(reviews.map(r => r.id === id ? { ...r, status } : r));
      }
    } catch (error) {
      console.error("Error updating review:", error);
    }
  };

  const deleteReview = async (id: number) => {
    if (!confirm("¿Eliminar esta reseña permanentemente?")) return;
    try {
      const res = await fetch("/api/admin/reviews", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setReviews(reviews.filter(r => r.id !== id));
      }
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const filteredReviews = filter === "all" ? reviews : reviews.filter(r => r.status === filter);

  const statusLabel = {
    pending: "Pendiente",
    approved: "Aprobada",
    rejected: "Rechazada",
  };

  const statusColor = {
    pending: "bg-amber-100 text-amber-700",
    approved: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
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
          <h1 className="text-3xl font-bold text-secondary font-heading">Reseñas de Clientes</h1>
          <p className="text-slate-500 mt-1">Aprueba o rechaza las reseñas enviadas por visitantes</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {(["pending", "approved", "rejected", "all"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              filter === f
                ? "bg-primary text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {f === "all" ? "Todas" : statusLabel[f]}
            {f !== "all" && (
              <span className="ml-1.5 opacity-70">
                ({reviews.filter(r => r.status === f).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl border border-slate-200 text-slate-400">
            No hay reseñas en esta categoría.
          </div>
        )}

        {filteredReviews.map((review) => (
          <div
            key={review.id}
            className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-secondary">{review.name}</h3>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColor[review.status]}`}>
                    {statusLabel[review.status]}
                  </span>
                </div>
                <div className="flex gap-0.5 mt-1.5">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={14} className="text-primary fill-primary" />
                  ))}
                </div>
              </div>
              <span className="text-xs text-slate-400">
                {new Date(review.created_at).toLocaleDateString("es-EC", {
                  day: "numeric", month: "short", year: "numeric"
                })}
              </span>
            </div>

            <p className="text-slate-600 text-sm mb-4 leading-relaxed">{review.content}</p>

            <div className="flex gap-2">
              {review.status !== "approved" && (
                <button
                  onClick={() => updateStatus(review.id, "approved")}
                  className="flex items-center gap-1.5 bg-green-50 hover:bg-green-100 text-green-700 text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
                >
                  <Check size={16} /> Aprobar
                </button>
              )}
              {review.status !== "rejected" && (
                <button
                  onClick={() => updateStatus(review.id, "rejected")}
                  className="flex items-center gap-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
                >
                  <X size={16} /> Rechazar
                </button>
              )}
              <button
                onClick={() => deleteReview(review.id)}
                className="flex items-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-700 text-sm font-semibold px-4 py-2 rounded-lg transition-colors ml-auto"
              >
                <Trash2 size={16} /> Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}