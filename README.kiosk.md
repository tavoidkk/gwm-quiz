# Guía de kiosco — GWM Quiz

Notas de operación para montar el quiz en una tablet táctil de stand.

## Requisitos

- Tablet con Chrome, Edge o Safari actualizado.
- Carpeta completa del proyecto copiada al dispositivo (no hace falta servidor ni build).
- Idealmente, conexión a internet la primera vez para cargar Inter (Google Fonts) y Lucide (unpkg). Si el stand es offline, ver la sección **Modo offline**.

## Puesta en marcha

1. Copia la carpeta `gwm-quiz/` a la tablet.
2. Abre `index.html` en el navegador.
3. Entra en modo kiosco:
   - **Chrome/Edge en Android:** menú → *Añadir a pantalla de inicio* o usa una app de kiosco; también puedes abrir con `--kiosk` desde desktop.
   - **Chrome/Edge en Windows:** `chrome.exe --kiosk file:///ruta/index.html`
   - **Safari en iPad:** *Opciones → Pantalla de inicio* y guía el acceso; usa *Acceso Guiado* (Ajustes → Accesibilidad) para bloquear gestos.
4. Fija la orientación del stand (vertical recomendado; el layout también funciona en horizontal).
5. Sube el brillo y desactiva el ahorro de energía.

## Comportamiento pensado para táctil

- Targets de al menos 48×48 px en opciones, botones y muestras de color.
- Sin dependencias de hover: toda la información está visible.
- `touch-action: manipulation` y antirrebote de 500 ms para evitar dobles toques.
- Viewport con `interactive-widget=resizes-content` para que el teclado virtual no aplaste la app.
- Wake Lock: se solicita al pulsar **Comenzar** (si el navegador lo soporta).
- Cambio de color por deslizamiento horizontal sobre la imagen o tocando las muestras.

## Reinicio entre usuarios

- **Volver a intentar** limpia respuestas y nombre y regresa al inicio.
- Recargar la página también reinicia. El progreso se guarda en `sessionStorage` solo mientras el quiz está en curso; al terminar se borra.

## Modo offline (opcional)

El sitio carga dos recursos externos:

| Recurso | URL actual | Alternativa |
|---|---|---|
| Inter | Google Fonts | Descargar los `.woff2` y servirlos desde `public/fonts/` |
| Lucide | `unpkg.com/lucide@1.72.0` | Descargar `lucide.min.js` a `public/vendor/` |

Si el stand no tiene red, copia esos archivos localmente y actualiza las referencias en `index.html` (y el `@font-face` en `styles.css`). Verifica con la tablet en modo avión.

## Pruebas recomendadas antes de montar

1. Recorrer el quiz de principio a fin tocando solo con el dedo.
2. Probar en vertical y horizontal.
3. Verificar que los 8 colores del ORA 5 se puedan seleccionar (la barra hace scroll horizontal).
4. Confirmar que el teclado virtual no tapa el campo de nombre.
5. Reiniciar y confirmar que el estado vuelve limpio.
6. Si aplica, probar sin conexión tras cachear los recursos.

## Solución de problemas

- **No se ven iconos:** revisa que `lucide.min.js` haya cargado (consola del navegador) o usa el modo offline.
- **La barra de colores no muestra todos:** desliza horizontalmente; es intencional en pantallas pequeñas.
- **El navegador sale del kiosco con gestos:** usa Acceso Guiado (iPad) o una app de kiosco (Android).
- **La pantalla se apaga:** verifica que el navegador soporte Wake Lock y que el ahorro de energía del sistema esté desactivado.
