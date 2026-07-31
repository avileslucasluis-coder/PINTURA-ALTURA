export const metadata = {
  title: "Política de Privacidad | TupinTor Luis",
  description: "Política de privacidad y tratamiento de datos personales de TupinTor Luis.",
};

export default function PoliticaPrivacidad() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-8 font-heading">
        Política de Privacidad
      </h1>

      <div className="prose prose-slate max-w-none space-y-6 text-slate-700">
        <p className="text-sm text-slate-500">Última actualización: julio de 2026</p>

        <section>
          <h2 className="text-xl font-bold text-secondary mt-8 mb-3">1. Responsable del tratamiento</h2>
          <p>
            TupinTor Luis, con domicilio en Guayaquil, Ecuador, es responsable del tratamiento
            de los datos personales que usted nos proporciona a través de este sitio web.
            Para consultas relacionadas con sus datos, puede escribirnos a{" "}
            <a href="mailto:gerente@tu-pintor.com" className="text-primary underline">
              gerente@tu-pintor.com
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-secondary mt-8 mb-3">2. Datos que recolectamos</h2>
          <p>A través de nuestro formulario de contacto recolectamos:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Nombre completo</li>
            <li>Número de teléfono</li>
            <li>Correo electrónico (opcional)</li>
            <li>El mensaje o requerimiento que usted nos escribe</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-secondary mt-8 mb-3">3. Finalidad del tratamiento</h2>
          <p>
            Utilizamos estos datos exclusivamente para responder a su solicitud de cotización o
            información, contactarlo por teléfono, correo o WhatsApp, y dar seguimiento a los
            trabajos solicitados. No utilizamos sus datos para fines distintos a estos.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-secondary mt-8 mb-3">4. Compartición de datos</h2>
          <p>
            No vendemos, alquilamos ni compartimos sus datos personales con terceros, salvo
            obligación legal expresa.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-secondary mt-8 mb-3">5. Tiempo de conservación</h2>
          <p>
            Conservamos los datos enviados a través del formulario de contacto durante el tiempo
            necesario para atender su solicitud y, posteriormente, hasta 12 meses con fines de
            seguimiento comercial, salvo que usted solicite su eliminación antes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-secondary mt-8 mb-3">6. Sus derechos</h2>
          <p>
            Conforme a la Ley Orgánica de Protección de Datos Personales del Ecuador, usted tiene
            derecho a acceder, rectificar, eliminar o solicitar la portabilidad de sus datos
            personales, así como a oponerse a su tratamiento. Para ejercer estos derechos,
            escríbanos a{" "}
            <a href="mailto:gerente@tu-pintor.com" className="text-primary underline">
              gerente@tu-pintor.com
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-secondary mt-8 mb-3">7. Seguridad</h2>
          <p>
            Este sitio utiliza conexión segura (HTTPS) y medidas técnicas razonables para proteger
            la información que usted nos proporciona contra accesos no autorizados.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-secondary mt-8 mb-3">8. Cambios a esta política</h2>
          <p>
            Podemos actualizar esta política de privacidad ocasionalmente. Cualquier cambio será
            publicado en esta misma página.
          </p>
        </section>
      </div>
    </main>
  );
}