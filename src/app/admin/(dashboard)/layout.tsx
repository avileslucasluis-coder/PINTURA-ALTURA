import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Home, LayoutDashboard, PaintRoller, Settings } from "lucide-react";
import LogoutButton from "./LogoutButton";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-72 bg-secondary text-white md:min-h-screen p-6 flex flex-col">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-primary p-2 rounded-lg">
              <PaintRoller size={22} className="text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white font-heading leading-tight">Panel Admin</h2>
              <p className="text-primary text-xs font-medium">TUPINTOR LUIS</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-1.5">
          <Link
            href="/admin"
            className="flex items-center gap-3 px-4 py-3 bg-white/10 rounded-xl text-white font-medium hover:bg-white/15 transition-colors"
          >
            <LayoutDashboard size={20} />
            <span>Proyectos</span>
          </Link>
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
          >
            <Home size={20} />
            <span>Ver Sitio Web</span>
          </Link>
        </nav>

        <div className="mt-auto pt-6 border-t border-white/10 space-y-3">
          <div className="flex items-center gap-3 px-4 py-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <Settings size={16} className="text-primary" />
            </div>
            <div>
              <p className="text-sm text-white font-medium">{session.user?.name || "Administrador"}</p>
              <p className="text-xs text-slate-500">Sesión activa</p>
            </div>
          </div>
          <LogoutButton />
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-4 md:p-8 lg:p-10 overflow-auto">
        {children}
      </main>
    </div>
  );
}
