# Plan de Arquitectura y Rediseño Responsive Móvil

Este documento define la estrategia integral para resolver la adaptación visual, legibilidad tipográfica y visualización de videos en dispositivos móviles, conforme a las preferencias confirmadas por el usuario.

---

## 1. Decisiones Confirmadas por el Usuario

1. **Escala y márgenes**: Escala responsiva dinámica ajustando márgenes, paddings y tipografía para encajar al 100% del ancho del dispositivo (sin artificios de zoom fijo o recortes laterales).
2. **Reproductor y sección de videos**: Proporción fluida 16:9 (`aspect-video`) con tarjetas apiladas ordenadamente en vertical en celulares y en cuadrícula equilibrada en pantallas medianas/grandes.
3. **Página de inicio y textos**: Alineación limpia y centrada, con tipografía calculada dinámicamente (`clamp`), espaciados de seguridad (*safe-area*) y sin textos cortados a mitad de pantalla.

---

## 2. Diagnóstico de Problemas Identificados

- **Distorsión y desborde de videos**:
  - `src/components/LiveInterviews.tsx` y `src/components/Services.tsx` presentaban alturas fijas mínimas (`min-h-[220px]`, `min-h-[280px]`) e iframes con dimensiones poco elásticas en pantallas estrechas (<390px).
- **Corte de textos en Hero (Inicio)**:
  - La combinación de `min-h-[100svh]` con un padding superior estático excesivo provocaba que los títulos grandes se desplazaran hacia el pliegue inferior de la pantalla, dando la impresión de "texto a medias".
- **Superposición y sobrecarga de elementos fijos**:
  - Múltiples botones flotantes (asistente virtual, enlace a WhatsApp, barra de navegación) competían por el área táctil inferior del pulgar (*thumb zone*).
- **Contraste y jerarquía de botones**:
  - Botones con etiquetas dispersas o estilos dispares sin una línea de color coherente (paleta 60-30-10: fondo pizarra oscuro #09090b, acentos teal/esmeralda clínico y ámbar cálido).

---

## 3. Plan de Acción por Módulos

### Fase 1: Hero & Encabezado Principal (`src/components/Hero.tsx`)
- Implementar escala tipográfica fluida con `text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight` y `leading-tight`.
- Centrar armoniosamente el bloque de títulos, bajada y llamadas a la acción (*CTAs*) en viewport móvil.
- Ajustar el contenedor general con `min-h-[calc(100svh-4rem)]` y un padding superior controlado (`pt-12 pb-8 sm:pt-20 sm:pb-16`) para que el contenido sea visible y navegable desde el primer vistazo sin recortes.
- Mantener la insignia institucional de la UNC y credenciales en formato compacto de una sola fila en móviles.

### Fase 2: Módulo de Videos y Entrevistas (`src/components/LiveInterviews.tsx` y `src/components/Services.tsx`)
- Convertir todos los contenedores de video al estándar CSS `aspect-video` (relación 16:9 pura), eliminando alturas mínimas fijas que distorsionan el reproductor.
- En `LiveInterviews.tsx`:
  - Contenedor principal de video con bordes redondeados ergonómicos (`rounded-2xl`), borde fino sutil y controles accesibles.
  - Lista de entrevistas organizadas en tarjeta única vertical en móvil (`grid-cols-1`) pasando a 2 y 3 columnas (`md:grid-cols-2 lg:grid-cols-3`) con hitboxes táctiles de al menos 44px.
  - Títulos de videos con límite de 2 líneas (`line-clamp-2`) para evitar tarjetas asimétricas.
- En `Services.tsx`:
  - Rediseñar el bloque del video introductorio para que fluya en columna completa en celular con ancho 100% y se integre fluidamente al lateral en pantallas de escritorio.

### Fase 3: Ergonomía Táctil y Botones Flotantes (`src/components/AIAvatarWidget.tsx` y `src/components/FloatingNav.tsx`)
- Cumplir la regla de presupuesto de elementos fijos (<15% de la altura total de pantalla móvil).
- Agrupar o reposicionar los accesos de WhatsApp y del asistente virtual con espaciado de seguridad inferior (`bottom-4 right-4 sm:bottom-6 sm:right-6`) para que no bloqueen los botones de acción primarios de las secciones.
- Estandarizar botones principales con etiquetas claras de una sola línea ("Agendar Consulta", "Ver Entrevistas", "Conocer Tratamientos").

### Fase 4: Armonización Visual y Verificación
- Revisión de contraste WCAG AA en textos sobre fondo oscuro.
- Verificación exhaustiva en anchos móviles estándar (375px, 390px, 412px) y en pantallas de escritorio.
- Compilación final con `compile_applet` y validación con `lint_applet`.
