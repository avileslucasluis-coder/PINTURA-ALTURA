# 🎨 TUPINTOR LUIS — Portafolio Profesional de Pintura en Altura

Plataforma web moderna para **TUPINTOR LUIS**, empresa especializada en pintura de fachadas, edificios y trabajos en altura. Incluye un portafolio dinámico con galería de imágenes, panel de administración protegido con contraseña y sistema de métricas de visitas.

---

## 📋 Tabla de Contenidos

1. [Requisitos Previos](#-requisitos-previos)
2. [Cómo Abrir la Página Web Localmente](#-cómo-abrir-la-página-web-localmente)
3. [Cómo Ingresar al Panel de Administración](#-cómo-ingresar-al-panel-de-administración)
4. [Cómo Administrar el Portafolio](#-cómo-administrar-el-portafolio)
5. [Cómo Verán la Página los Clientes](#-cómo-verán-la-página-los-clientes)
6. [Acceso Local Personalizado](#-acceso-local-personalizado)
7. [Preparación para Producción](#-preparación-para-producción)
8. [Preguntas Frecuentes (FAQ)](#-preguntas-frecuentes-faq)
9. [Tecnologías Utilizadas](#-tecnologías-utilizadas)

---

## 🔧 Requisitos Previos

Antes de comenzar, asegúrate de tener instalados los siguientes programas en tu computadora:

| Programa | Versión Mínima | Enlace de Descarga |
|----------|---------------|---------------------|
| **Node.js** | v18 o superior | [https://nodejs.org](https://nodejs.org) |
| **Git** | Cualquiera | [https://git-scm.com](https://git-scm.com) |

### ¿Cómo verificar si ya los tengo instalados?

Abre la **Terminal** (PowerShell en Windows) y escribe:

```bash
node --version
```

Si aparece algo como `v18.x.x` o superior, Node.js está listo.

```bash
git --version
```

Si aparece un número de versión, Git está instalado.

> **💡 Consejo:** Si no tienes Node.js, descárgalo desde [nodejs.org](https://nodejs.org) e instala la versión **LTS** (la que dice "Recomendado").

---

## 🚀 Cómo Abrir la Página Web Localmente

Sigue estos pasos en orden para abrir la página web en tu computadora:

### Paso 1: Abrir la terminal

- En Windows: Presiona `Win + R`, escribe `powershell` y presiona Enter.
- Navega hasta la carpeta del proyecto:

```bash
cd C:\Gato\pintura-altura
```

### Paso 2: Instalar dependencias

Este comando descarga todas las librerías necesarias para que el proyecto funcione. Solo necesitas ejecutarlo **una vez** (o cuando actualices el proyecto):

```bash
npm install
```

> ⏱️ Este proceso puede tardar entre 1 y 3 minutos. Espera a que termine completamente.

### Paso 3: Configurar variables de entorno

Copia el archivo de ejemplo y ajusta las credenciales del administrador:

```bash
copy .env.example .env
```

Edita el archivo `.env` y define tus valores:

```env
ADMIN_USER="admin"
ADMIN_PASSWORD="tu_contraseña_segura"
NEXTAUTH_SECRET="una-clave-larga-y-aleatoria"
NEXTAUTH_URL="http://localhost:3000"
```

> 📌 No se necesita base de datos: los proyectos y servicios se gestionan desde el código y el login del panel se valida con estas variables.

### Paso 4: Iniciar el servidor de desarrollo

```bash
npm run dev
```

Si todo funciona correctamente, verás un mensaje similar a:

```
▲ Next.js 16.2.6 (Turbopack)
- Local:         http://localhost:3000
- Network:       http://192.168.100.xxx:3000
✓ Ready in 1.5s
```

### Paso 5: Abrir en el navegador

Abre tu navegador (Chrome, Edge, Firefox) y visita:

```
http://localhost:3000
```

¡Tu página web ya está funcionando! 🎉

### ¿Cómo detener el servidor?

En la terminal donde está corriendo, presiona `Ctrl + C`.

### ¿Qué hacer si aparece un error?

| Error | Solución |
|-------|----------|
| `'npm' no se reconoce` | Instala Node.js desde [nodejs.org](https://nodejs.org) |
| `EACCES permission denied` | Ejecuta la terminal como Administrador |
| `Port 3000 is already in use` | Cierra la otra aplicación que usa el puerto, o ejecuta: `npx next dev -p 3001` |
| `Cannot find module` | Ejecuta `npm install` nuevamente |
| `Unauthorized` o error de login | Verifica que `ADMIN_USER`, `ADMIN_PASSWORD` y `NEXTAUTH_SECRET` estén bien definidos en `.env` |

---

## 🔐 Cómo Ingresar al Panel de Administración

El panel de administración es una sección privada donde puedes gestionar todos los proyectos, imágenes y ver las estadísticas de visitas.

### Acceder al panel

1. Asegúrate de que el servidor esté corriendo (`npm run dev`).
2. Abre tu navegador y ve a:

```
http://localhost:3000/admin
```

3. Serás redirigido automáticamente a la página de inicio de sesión.

### Credenciales por defecto

| Campo | Valor |
|-------|-------|
| **Usuario** | `admin` |
| **Contraseña** | `123456` |

### ¿Cómo cambiar las credenciales?

1. Abre el archivo `.env` en la raíz del proyecto (`C:\Gato\pintura-altura\.env`).
2. Modifica las siguientes líneas:

```env
# Cambia "admin" por tu nombre de usuario deseado
ADMIN_USER="tu_nuevo_usuario"

# Cambia "123456" por una contraseña segura
ADMIN_PASSWORD="tu_nueva_contraseña_segura"
```

3. Guarda el archivo.
4. Reinicia el servidor (detén con `Ctrl + C` y vuelve a ejecutar `npm run dev`).

> ⚠️ **Importante:** En producción, usa una contraseña fuerte de al menos 12 caracteres con mayúsculas, números y símbolos.

---

## 📁 Cómo Administrar el Portafolio

Una vez dentro del panel de administración, podrás gestionar todos los proyectos del portafolio sin necesidad de editar código.

### ➕ Crear un nuevo proyecto

1. En el panel, haz clic en el botón **"Nuevo Proyecto"** (color naranja, esquina superior derecha).
2. Completa los campos del formulario:
   - **Título:** Nombre descriptivo del proyecto (ejemplo: "Edificio Torre Norte").
   - **Categoría:** Selecciona del menú desplegable (Pintura de Fachadas, Pintura de Edificios, etc.).
   - **Ubicación:** Ciudad o dirección (ejemplo: "Urdesa, Guayaquil").
   - **Fecha:** Mes y año del proyecto (ejemplo: "Octubre 2024").
   - **Descripción:** Texto explicativo del trabajo realizado.
3. **Subir imágenes:** Haz clic en el área de carga o arrastra las imágenes. Puedes subir **varias imágenes a la vez**.
4. **Visibilidad:** Usa el interruptor para decidir si el proyecto será visible para los visitantes o no.
5. Haz clic en **"Crear Proyecto"**.

### ✏️ Editar un proyecto

1. En la lista de proyectos, busca el que deseas editar.
2. Haz clic en el ícono de **lápiz azul** (✏️).
3. Modifica los campos que necesites.
4. Haz clic en **"Actualizar"** para guardar los cambios.

### 🗑️ Eliminar un proyecto

1. Haz clic en el ícono de **papelera roja** (🗑️) junto al proyecto.
2. Confirma la eliminación en el cuadro de diálogo.

> ⚠️ Esta acción eliminará el proyecto y **todas sus imágenes asociadas** de forma permanente.

### 🖼️ Gestión de imágenes

- **Subir nuevas imágenes:** Al editar un proyecto, usa el área de carga para añadir más fotos.
- **Eliminar una imagen específica:** En la lista de proyectos, pasa el cursor sobre la miniatura de la imagen y haz clic en la **X roja** que aparece.
- **Vista previa:** Antes de guardar, verás una vista previa de las imágenes seleccionadas.

### 👁️ Activar y desactivar proyectos (Visibilidad)

- Haz clic en el ícono de **ojo verde** (👁️) para ocultar un proyecto visible.
- Haz clic en el ícono de **ojo tachado gris** para volver a mostrar un proyecto oculto.
- Los proyectos ocultos **solo se ven en el panel de administración**, nunca en la web pública.

### 🔍 Buscar proyectos

Usa la barra de búsqueda en la parte superior del panel para filtrar proyectos por título, categoría o ubicación.

### 📊 Ver estadísticas de visitas

1. En el panel de administración, haz clic en la pestaña **"Visitas del Sitio"**.
2. Verás:
   - **Gráfico semanal:** Barras interactivas mostrando las visitas de los últimos 7 días.
   - **Páginas más visitadas:** Un desglose con barras de progreso que muestra qué secciones del sitio reciben más tráfico.
   - **Contador total:** El número total de visitas acumuladas.

---

## 🌐 Cómo Verán la Página los Clientes

### URL pública (desarrollo local)

```
http://localhost:3000
```

### Secciones visibles para los visitantes

| Sección | Descripción |
|---------|-------------|
| **Inicio** | Presentación de la empresa con animaciones de entrada |
| **Servicios** | Catálogo completo de servicios ofrecidos |
| **Portafolio** | Galería de proyectos con filtros por categoría, carrusel de imágenes y visor de pantalla completa (lightbox) |
| **Nosotros** | Información sobre la empresa y su experiencia |
| **Testimonios** | Opiniones de clientes satisfechos |
| **Contacto** | Formulario de contacto y datos de ubicación |

### ¿Qué pueden hacer los visitantes?

✅ Navegar por todas las secciones del sitio.
✅ Filtrar proyectos del portafolio por categoría.
✅ Ver todas las imágenes de cada proyecto con el visor de pantalla completa.
✅ Navegar entre imágenes con las flechas o el teclado.
✅ Contactar por WhatsApp mediante el botón flotante.
✅ Enviar mensajes a través del formulario de contacto.

### ¿Qué acciones están restringidas?

🚫 No pueden acceder al panel de administración.
🚫 No pueden crear, editar ni eliminar proyectos.
🚫 No pueden subir ni eliminar imágenes.
🚫 No pueden ver las estadísticas de visitas.
🚫 No pueden ver los proyectos marcados como "ocultos".

---

## 🏠 Acceso Local Personalizado

En lugar de usar `http://localhost:3000`, puedes configurar un nombre personalizado como:

```
http://pintura-altura.local:3000
```

### Paso 1: Modificar el archivo hosts de Windows

1. Abre el **Bloc de Notas como Administrador**:
   - Presiona `Win`, escribe `Bloc de notas`.
   - Haz clic derecho sobre la app y selecciona **"Ejecutar como administrador"**.

2. Abre el archivo hosts:
   - Ve a `Archivo` > `Abrir`.
   - Navega a: `C:\Windows\System32\drivers\etc\`
   - En el filtro de archivos, cambia "Documentos de texto" a **"Todos los archivos"**.
   - Selecciona el archivo `hosts` y ábrelo.

3. Agrega esta línea al final del archivo:

```
127.0.0.1    pintura-altura.local
```

> 💡 Puedes cambiar `pintura-altura.local` por cualquier otro nombre que prefieras, como `portafolio.local` o `tupintorluis.local`.

4. Guarda el archivo (`Ctrl + S`).

### Paso 2: Configurar el archivo .env

Abre el archivo `.env` del proyecto y cambia la variable `NEXTAUTH_URL`:

```env
NEXTAUTH_URL="http://pintura-altura.local:3000"
```

### Paso 3: Reiniciar el servidor

Detén el servidor (`Ctrl + C` en la terminal) y vuelve a iniciarlo:

```bash
npm run dev
```

### Paso 4: Probar el acceso

Abre tu navegador y visita:

```
http://pintura-altura.local:3000
```

¡Tu página web ahora es accesible con un nombre personalizado! 🎉

### Nombres sugeridos

| Nombre | URL completa |
|--------|-------------|
| `pintura-altura.local` | `http://pintura-altura.local:3000` |
| `portafolio.local` | `http://portafolio.local:3000` |
| `tupintorluis.local` | `http://tupintorluis.local:3000` |

> ⚠️ Este nombre solo funciona en **tu propia computadora**. Para que funcione en internet, necesitas un dominio real (ver sección de producción).

---

## 🌍 Preparación para Producción

Cuando estés listo para que tu página sea accesible en internet, tienes varias opciones:

### Opción 1: Publicar en Vercel (Más Fácil y Gratuito)

[Vercel](https://vercel.com) es la plataforma creada por los desarrolladores de Next.js. Es la forma más rápida de publicar.

**Pasos:**

1. **Crear una cuenta** en [vercel.com](https://vercel.com) (puedes iniciar sesión con GitHub).
2. **Subir tu proyecto a GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Versión inicial del portafolio"
   git remote add origin https://github.com/tu-usuario/pintura-altura.git
   git push -u origin main
   ```
3. **Conectar con Vercel:**
   - Entra a Vercel y haz clic en **"Add New Project"**.
   - Selecciona tu repositorio de GitHub.
   - Configura las **variables de entorno** (las que están en `.env`):
     - `ADMIN_USER` → Tu usuario administrador.
     - `ADMIN_PASSWORD` → Tu contraseña administrador.
     - `NEXTAUTH_SECRET` → Una clave larga y aleatoria.
     - `NEXTAUTH_URL` → `https://tu-dominio.vercel.app`
   - Haz clic en **"Deploy"**.

> ✅ **Nota importante:** Esta versión ya no depende de una base de datos externa. El contenido del sitio se gestiona desde el código y el acceso de administración se controla por variables de entorno.

### Opción 2: Publicar en un VPS (Servidor Privado Virtual)

Si prefieres tener control total del servidor, puedes usar un VPS de DigitalOcean, Hetzner o Contabo.

**Pasos generales:**

1. **Contratar un VPS** con Ubuntu 22.04 o superior.
2. **Conectarte por SSH:**
   ```bash
   ssh root@tu-ip-del-servidor
   ```
3. **Instalar Node.js:**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt install -y nodejs
   ```
4. **Clonar el proyecto:**
   ```bash
   git clone https://github.com/tu-usuario/pintura-altura.git
   cd pintura-altura
   ```
5. **Instalar dependencias y compilar:**
   ```bash
   npm install
   npm run build
   ```
6. **Iniciar con PM2** (gestor de procesos que mantiene la app viva):
   ```bash
   npm install -g pm2
   pm2 start npm --name "pintura-altura" -- start
   pm2 save
   pm2 startup
   ```

### Cómo usar un dominio propio

1. **Comprar un dominio** en un registrador como:
   - [Namecheap](https://namecheap.com)
   - [GoDaddy](https://godaddy.com)
   - [Google Domains](https://domains.google)
   - [Porkbun](https://porkbun.com) (más económico)

2. **Conectar el dominio:**

   **Para Vercel:**
   - En tu proyecto de Vercel, ve a `Settings` > `Domains`.
   - Agrega tu dominio personalizado (ejemplo: `tupintorluis.com`).
   - Vercel te dará los registros DNS que debes configurar en tu registrador.
   - Configura los registros DNS tipo `A` o `CNAME` según las instrucciones.

   **Para VPS:**
   - En tu registrador de dominios, ve a la configuración DNS.
   - Agrega un registro `A` apuntando a la IP de tu servidor:
     ```
     Tipo: A
     Nombre: @
     Valor: TU_IP_DEL_SERVIDOR
     TTL: 3600
     ```
   - Agrega otro para `www`:
     ```
     Tipo: CNAME
     Nombre: www
     Valor: tupintorluis.com
     TTL: 3600
     ```

### Cómo habilitar HTTPS (Certificado SSL)

**En Vercel:** HTTPS se habilita automáticamente. No necesitas hacer nada.

**En VPS:** Usa [Certbot](https://certbot.eff.org/) con Nginx:

1. **Instalar Nginx y Certbot:**
   ```bash
   sudo apt install nginx certbot python3-certbot-nginx
   ```

2. **Configurar Nginx** como proxy inverso. Crea el archivo `/etc/nginx/sites-available/pintura-altura`:
   ```nginx
   server {
       server_name tupintorluis.com www.tupintorluis.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

3. **Activar el sitio y obtener el certificado:**
   ```bash
   sudo ln -s /etc/nginx/sites-available/pintura-altura /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   sudo certbot --nginx -d tupintorluis.com -d www.tupintorluis.com
   ```

4. Certbot renovará el certificado automáticamente cada 90 días.

---

## ❓ Preguntas Frecuentes (FAQ)

### 🔹 ¿Necesito saber programar para usar esta aplicación?

**No.** Una vez que el proyecto está instalado y corriendo, puedes administrar todo el contenido desde el panel de administración sin tocar código. Solo necesitas seguir los pasos de esta guía para la instalación inicial.

### 🔹 La página no carga y veo un error en la terminal

Prueba estos pasos en orden:

1. Detén el servidor con `Ctrl + C`.
2. Elimina las dependencias e instálalas de nuevo:
   ```bash
   rm -rf node_modules
   npm install
   ```
3. Verifica tus variables de entorno en `.env`.
4. Reinicia el servidor:
   ```bash
   npm run dev
   ```

### 🔹 Olvidé mi contraseña del panel de administración

Abre el archivo `.env` y cambia la variable `ADMIN_PASSWORD` por una nueva contraseña. Reinicia el servidor.

### 🔹 Las imágenes no se ven en el portafolio

- Verifica que las imágenes estén en la carpeta `public/uploads/`.
- Si usas imágenes de internet (URLs externas), agrega el dominio en `next.config.ts` dentro de `images.remotePatterns`.
- Asegúrate de que las imágenes sean de formato compatible: `.jpg`, `.png`, `.webp`.

### 🔹 ¿Cómo hago una copia de seguridad del contenido del sitio?

Como esta versión no usa base de datos, la copia de seguridad se realiza guardando el repositorio y los archivos estáticos o de contenido que modifiques en el código.

### 🔹 ¿Puedo usar esta aplicación en mi teléfono o tablet?

**Sí.** La página web es totalmente responsiva y se adapta automáticamente a cualquier tamaño de pantalla: celulares, tablets y computadoras de escritorio.

### 🔹 ¿Cómo actualizo Node.js?

Descarga la última versión LTS desde [nodejs.org](https://nodejs.org) e instálala sobre la versión actual. Tus proyectos seguirán funcionando.

### 🔹 ¿Puedo tener más de un administrador?

El sistema actual soporta un único administrador definido en el archivo `.env`. Si necesitas múltiples administradores, se requiere una modificación al sistema de autenticación.

### 🔹 ¿Cuántas imágenes puedo subir por proyecto?

No hay un límite predefinido. Puedes subir tantas imágenes como desees por cada proyecto. Se recomienda usar imágenes optimizadas (menos de 2 MB por archivo) para mantener un buen rendimiento.

### 🔹 ¿Las visitas del panel se cuentan como visitas reales?

**No.** El sistema de analíticas excluye automáticamente las visitas a las rutas `/admin` y `/api`. Solo se registran las visitas de las páginas públicas del sitio.

### 🔹 ¿Cómo reinicio el estado del sitio?

Si deseas volver a un estado inicial, puedes restaurar el contenido desde el código o volver a clonar el repositorio. No existe una base de datos que reiniciar.

---

## 🛠️ Tecnologías Utilizadas

| Tecnología | Propósito |
|------------|-----------|
| **Next.js 16** | Framework principal de React con renderizado del lado del servidor |
| **React 19** | Librería de interfaz de usuario |
| **TypeScript** | Tipado estático para código más seguro |
| **Tailwind CSS 4** | Estilos utilitarios modernos |
| **NextAuth.js** | Autenticación segura para el panel de administración |
| **Framer Motion** | Animaciones fluidas y profesionales |
| **Lucide Icons** | Iconos modernos y ligeros |

---

## 📄 Resumen Rápido

| Elemento | Valor |
|----------|-------|
| **URL Local** | `http://localhost:3000` |
| **URL del Panel Admin** | `http://localhost:3000/admin` |
| **Usuario** | `admin` |
| **Contraseña** | `123456` |
| **Archivo de credenciales** | `.env` |
| **Base de datos** | No aplica |
| **Carpeta de imágenes subidas** | `public/uploads/` |

---

> **Desarrollado con ❤️ para TUPINTOR LUIS**
