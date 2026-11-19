# GWM Quiz Venezuela

Quiz interactivo de una sola página que recomienda el modelo GWM ideal (HAVAL, ORA, TANK y POER) según la personalidad y preferencias del usuario.

## Características

- Preguntas con iconografía (Lucide) y selección simple.
- Motor de puntuación ponderado por modelo y respuesta.
- Resultado con modelo recomendado, descripción, personalidad y selector de colores.
- Galería de imágenes local en formato WebP.
- Diseño responsive sin dependencias de build.

## Modelos incluidos

HAVAL H7, ORA 5, TANK 300, HAVAL H6 GT, POER PASSENGER, HAVAL H6, HAVAL H9, HAVAL Jolion y TANK 500.

## Ejecutar en local

Al ser un sitio estático, basta con abrir `index.html` en el navegador. Para servirlo con un servidor local:

```bash
npx serve .
# o
python -m http.server 8000
```

Luego visita `http://localhost:8000`.

## Estructura

```
.
├── index.html        # Estructura y pantallas
├── styles.css        # Estilos, animaciones y reglas táctiles
├── app.js            # Datos del quiz, scoring y lógica
├── README.kiosk.md   # Guía de despliegue en tablet de stand
└── public/           # Imágenes de vehículos y logo
```

## Versión kiosco

La rama `feature/kiosk-experience` adapta la experiencia a tablets táctiles de stand: 10 preguntas, targets de 48 px, sin dependencia de hover, confeti y revelado dramático del resultado, y persistencia de sesión. Consulta [README.kiosk.md](README.kiosk.md).

## Créditos

Hecho para [GWM Venezuela](https://www.gwm-ve.com/es) — Hello, Tomorrow.
