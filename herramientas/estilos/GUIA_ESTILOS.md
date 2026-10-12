# Estilos comunes para aplicaciones educativas

## Elección obligatoria

Cada app nueva o rediseñada elige una única hoja de entrada de `v1/`. Las tres importan `base.css` y comparten tipografía, botones, campos, foco, paneles y colores semánticos. Son tres variantes de una misma identidad, no tres diseños inconexos.

| Hoja | Uso principal | Referencias elegidas por Antonio |
| --- | --- | --- |
| `cuestiones.css` | Enunciado, opciones, comparación de variables y resolución | 05 Variación de magnitudes II; 23 su versión SCORM |
| `practica.css` | Gráfico y respuestas del alumno, con corrección | 18 Momento de una fuerza 3D |
| `laboratorio.css` | Simulación, controles, magnitudes y resultados | 21 Regla del sacacorchos; 22 Trabajo gravitatorio |

No se elige por el nombre del tema ni por usar SCORM. En una app mixta se toma el uso predominante y se aprovechan los componentes de la base. La elección debe quedar en su README: hoja, versión, motivo, colores físicos propios y comprobaciones realizadas.

Estas hojas son una primera propuesta implementada para futuros pilotos. Las referencias son aprobadas; el resultado de aplicar v1 se revisará visualmente antes de extenderlo a apps existentes. No se ha modificado su presentación publicada.

## Identidad común

- Fondo claro, texto oscuro y paneles blancos; bordes finos, radios moderados y sombras discretas.
- Tipografía de sistema sin dependencia de fuentes remotas; fórmulas con su renderizador matemático y cifras tabulares en resultados.
- Una acción principal por bloque, controles cómodos en teléfono y foco visible por teclado.
- Usar título descriptivo y terminología científica. Evitar «misión», «cadete», trofeos, emojis ornamentales y gamificación visual.
- Gráficos precisos: ejes y unidades legibles, marcas de posición claras y etiquetas sin solapamientos. Un escenario 3D puede tener fondo oscuro dentro del panel.
- La estética no modifica enunciados, respuestas, puntuación, cálculos o comportamiento SCORM.

## Color con significado

`--initial` (azul) identifica el estado inicial y `--modified` (rojo) el modificado; clases `.edu-initial` y `.edu-modified`. Mantener esta distinción en enunciados, opciones y fórmulas, con etiquetas Inicial/Modificado o subíndices 1/2. En MathJax/KaTeX conservar el color definido en las expresiones: no forzar un color global al renderizador.

Los colores de masas y vectores se documentan por app y se aplican de forma coherente a representación y leyenda. Los colores de feedback no sustituyen los de la física. Los avisos tienen texto e iconografía comprensible además del color. Comprobar contraste en su contexto real.

## Uso web

```html
<!-- Ajustar la ruta relativa a la profundidad de la página. Elegir solo una. -->
<link rel="stylesheet" href="../../../../herramientas/estilos/v1/practica.css">
<body class="edu-app">
  <main class="edu-shell">
    <header class="edu-header"><h1>Título científico</h1><p>Objetivo del recurso</p></header>
    <div class="edu-layout">
      <section class="edu-panel"><h2>Representación</h2><!-- gráfico --></section>
      <section class="edu-panel"><h2>Resolución</h2><!-- campos y acciones --></section>
    </div>
  </main>
</body>
```

Los componentes tienen prefijo `edu-` para evitar colisiones. El CSS queda limitado a `.edu-app`: enlazarlo no convierte automáticamente una interfaz antigua. Migrar explícitamente su estructura y retirar reglas duplicadas. El componente calculadora mantiene su Shadow DOM; estas hojas no lo sobrescriben.

Clases disponibles: `edu-shell`, `edu-header`, `edu-layout`, `edu-panel`, `edu-actions`, `edu-button`, `edu-button-secondary`, `edu-field`, `edu-options`, `edu-option`, `edu-readout`, `edu-formula`, `edu-initial`, `edu-modified`, `edu-feedback`, `edu-ok`, `edu-error`, `edu-note`, `edu-scene-dark`.

El CSS local posterior se limita a tamaño y disposición del gráfico, leyendas físicas e interacciones específicas. Para cambiar un componente compartido, revisar la base y todas las variantes, no añadir excepciones arbitrarias en cada app. Las modificaciones incompatibles requieren otra versión.

## SCORM

Copiar `base.css` y la hoja elegida a una carpeta del SCO conservando la relación de rutas de `@import`. Declarar ambos recursos en `imsmanifest.xml` e incluirlos en el ZIP. No enlazar CSS publicado en GitHub ni depender de una versión que pueda cambiar. Mantener práctica/evaluación, feedback, estado de intento e informes según `SCORM_CONTRATO.md`.

## Comprobación de cada adopción

Abrir a 1280, 390 y 320 px; comprobar enunciado y opciones/campos reales, fórmulas renderizadas, colores semánticos, leyendas, consola, foco y controles. Revisar ausencia de solapamientos y desbordamiento horizontal. Probar la corrección, el nuevo ejercicio o los controles de simulación según la app. En SCORM comprobar además paquete y reproductor; no afirmar compatibilidad Moodle sin validación real.

La página `demo.html` permite comparar las tres variantes con el mismo contenido antes de elegir una.

Comprobación inicial de v1 (12 de octubre de 2026): las tres variantes se han abierto en Chrome a 1280, 390 y 320 px; importación de la base, cambio de hoja, colores inicial/modificado distintos, selección de opciones, feedback y reinicio correctos. Sin errores JavaScript ni desbordamiento horizontal en la muestra. Esta prueba no sustituye la revisión de cada app al migrarla.
