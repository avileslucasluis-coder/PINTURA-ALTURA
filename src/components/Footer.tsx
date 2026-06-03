import Link from "next/link";
import { PaintRoller, Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="bg-primary p-2 rounded-lg text-white">
                <PaintRoller size={24} />
              </div>
              <span className="text-2xl font-bold tracking-tight font-heading text-white">
                TUPINTOR LUIS
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              Especialistas en trabajos de pintura en altura, mantenimiento de fachadas y trabajos verticales con las máximas medidas de seguridad en Guayaquil.
            </p>
            <div className="flex space-x-4 text-sm mt-4">
              <a href="#" className="text-slate-400 hover:text-white transition-colors underline underline-offset-4">
                Facebook
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors underline underline-offset-4">
                Instagram
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-6">Enlaces Rápidos</h3>
            <ul className="space-y-4">
              <li><Link href="#home" className="hover:text-primary transition-colors">Inicio</Link></li>
              <li><Link href="#services" className="hover:text-primary transition-colors">Servicios</Link></li>
              <li><Link href="#portfolio" className="hover:text-primary transition-colors">Proyectos</Link></li>
              <li><Link href="#about" className="hover:text-primary transition-colors">Nosotros</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-6">Servicios Principales</h3>
            <ul className="space-y-4 text-sm">
              <li>Pintura de Fachadas</li>
              <li>Pintura de Edificios</li>
              <li>Limpieza Exterior en Altura</li>
              <li>Sellado de Grietas</li>
              <li>Impermeabilización</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-6">Contacto</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-primary shrink-0" />
                <span>Guayaquil, Ecuador</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-primary shrink-0" />
                <span>+593 99 999 9999</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-primary shrink-0" />
                <span>contacto@tupintorluis.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>&copy; {new Date().getFullYear()} TUPINTOR LUIS. Todos los derechos reservados.</p>
          <div className="flex space-x-4">
            <Link href="/admin" className="hover:text-white transition-colors">Panel Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
