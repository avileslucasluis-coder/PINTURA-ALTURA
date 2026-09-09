"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export type CookieConsent = "accepted" | "rejected" | null;

export function CookieBanner({ onChange }: { onChange: (value: CookieConsent) => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(localStorage.getItem("cookie-consent") === null);
  }, []);

  const choose = (value: Exclude<CookieConsent, null>) => {
    localStorage.setItem("cookie-consent", value);
    setVisible(false);
    onChange(value);
  };

  if (!visible) return null;

  return (
    <aside
      role="dialog"
      aria-label="Preferencias de cookies"
      className="fixed inset-x-4 bottom-4 z-200 mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl sm:inset-x-auto sm:right-6 sm:left-auto"
    >
      <h2 className="text-lg font-bold text-secondary">Privacidad y cookies</h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">
        Usamos tecnologías de medición para conocer cómo se usa el sitio y mejorar tu experiencia.
        Puedes aceptar o rechazar estas tecnologías no esenciales. Consulta nuestra{" "}
        <Link href="/privacidad" className="font-semibold text-primary underline">
          Política de Privacidad
        </Link>.
      </p>
      <div className="mt-4 flex flex-wrap justify-end gap-3">
        <button
          type="button"
          onClick={() => choose("rejected")}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
        >
          Rechazar
        </button>
        <button
          type="button"
          onClick={() => choose("accepted")}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-dark"
        >
          Aceptar cookies
        </button>
      </div>
    </aside>
  );
}
