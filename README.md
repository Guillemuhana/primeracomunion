# Invitación de Primera Comunión · 5° Grado B

App para que cada chico/a arme y comparta su propia invitación de Primera
Comunión: tapa con su nombre, efecto de "libro que se abre", mensaje
personalizado, música ambiental generada en el navegador (sin archivos de
audio) y descarga de la tarjeta como imagen. No usa base de datos: cada
invitación viaja codificada en el link (`?i=...`), así que compartir el link
por WhatsApp ya alcanza.

## Requisitos

- Node.js 18 o superior
- npm

## Cómo correrlo en tu máquina (VS Code)

```bash
npm install
npm run dev
```

Abre `http://localhost:5173`. Los cambios se recargan solos.

## Estructura

```
index.html         punto de entrada
src/main.js        toda la lógica de la app (vanilla JS, sin frameworks)
src/style.css       estilos
public/             imágenes (logo, tapas, fondos) — se sirven desde la raíz "/"
vercel.json         config de build para Vercel
```

## Conectar con GitHub

Si el repo ya existe (por ejemplo `https://github.com/Guillemuhana/primeracomunion.git`):

```bash
git init
git add .
git commit -m "Invitación de Primera Comunión 5°B"
git branch -M main
git remote add origin https://github.com/Guillemuhana/primeracomunion.git
git push -u origin main
```

Si te pide login, usá un Personal Access Token de GitHub como contraseña
(Settings → Developer settings → Personal access tokens), o conectate desde
VS Code con la extensión de GitHub (botón "Publish Branch").

## Deploy en Vercel

**Opción recomendada (auto-deploy):**
1. Entrá a [vercel.com](https://vercel.com) → "Add New" → "Project".
2. Elegí el repo `primeracomunion` de GitHub (dale acceso si te lo pide).
3. Vercel detecta Vite automáticamente (usa el `vercel.json` incluido).
   Dejá todo por defecto y tocá "Deploy".
4. Cada `git push` a `main` va a re-deployar solo.

**Opción CLI:**
```bash
npm i -g vercel
vercel login
vercel        # deploy de prueba
vercel --prod # deploy a producción
```

## Notas

- Las imágenes de tapa (`cover-boy.jpg`, `cover-girl.jpg`) tienen una marca
  de agua tenue de un banco de imágenes ("Fondosbella"). Si tenés las
  versiones sin marca de agua, reemplazá esos archivos en `public/` (mismo
  nombre) y listo.
- El botón de descarga genera la imagen en el navegador de cada chico/a
  (no hace falta backend).
- Fecha y hora por defecto: viernes 25 de septiembre de 2026, 19:00 hs —
  se puede cambiar desde el formulario.
