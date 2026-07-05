"use client";

import { useState, useEffect, useCallback } from "react";
import { BarChart3, TrendingUp, Globe, Loader2 } from "lucide-react";

type AnalyticsData = {
  totalViews: number;
  viewsByPath: { path: string; count: number }[];
  dailyStats: { date: string; count: number }[];
};

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(true);

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
    fetchAnalytics();
  }, [fetchAnalytics]);

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
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-secondary font-heading">Panel de Administración</h1>
          <p className="text-slate-500 mt-1">Métricas de visitantes</p>
        </div>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-6 rounded-xl border border-slate-200 text-center shadow-sm">
          <p className="text-4xl font-bold text-primary flex items-center justify-center gap-1">
            {analyticsLoading ? (
              <Loader2 size={32} className="animate-spin text-slate-400" />
            ) : (
              analytics?.totalViews || 0
            )}
          </p>
          <p className="text-sm text-slate-500 font-medium mt-2 uppercase tracking-wider">Visitas Totales</p>
        </div>
      </div>

      {/* Analytics content */}
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
            <div className="bg-white p-6 rounded-2xl border border-slate-200 lg:col-span-2 shadow-sm">
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
                      <div className="mb-2 bg-secondary text-white text-xs px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-250 shadow-md font-bold z-10 select-none">
                        {day.count} {day.count === 1 ? 'vista' : 'vistas'}
                      </div>
                      <div
                        style={{ height: `${pct}%` }}
                        className={`w-full max-w-[40px] rounded-t-lg transition-all duration-500 ${
                          day.count > 0 
                            ? "bg-gradient-to-t from-primary to-primary-light hover:brightness-110 shadow-sm"
                            : "bg-slate-100"
                        }`}
                      />
                      <span className="text-[10px] sm:text-xs text-slate-500 font-semibold mt-3 whitespace-nowrap">
                        {formatDateLabel(day.date)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Pages view list */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold text-secondary font-heading flex items-center gap-2 mb-2">
                <Globe size={20} className="text-primary" />
                Páginas Más Visitadas
              </h3>
              <p className="text-slate-500 text-xs mb-6">Desglose de visitas por ruta URL</p>

              <div className="space-y-4">
                {analytics.viewsByPath.map((item, idx) => {
                  const total = analytics.totalViews || 1;
                  const percent = Math.round((item.count / total) * 100);

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
    </div>
  );
}
