# Prompt de reconstrucción — Laboratorio de resonancia mecánica

Crea desde cero una aplicación didáctica en español para Física de 2.º de Bachillerato, tema Ondas. Entrega un index.html funcional con HTML, CSS y JavaScript, sin servidor. Este prompt se ha reconstruido a partir de la versión vigente; no es el original.

## Modelo físico
Tres osciladores lineales independientes sobre base móvil horizontal y_b=B cos(ωt), frecuencias naturales 2,80; 1,60; 0,90 Hz (varillas corta, media, larga). El desplazamiento relativo x satisface x″+2ζω₀x′+ω₀²x=Bω²cos(ωt). Integra por RK4 con paso 1/480 s y condiciones iniciales de reposo relativo. Mide amplitud relativa como semidiferencia máximo-mínimo de muestras recientes; no confundir con desplazamiento absoluto.
## Interfaz
- Canvas del aparato (tres varillas de 0,30; 0,56; 0,83 m y esferas de colores); deforma visualmente para mostrar oscilación. Gráfica temporal y lecturas de amplitud, gráfica experimental de resonancia.
- f=0,30–3,50 Hz paso 0,01 inicial 0,60; botones ±0,01 Hz. B=0,5–3 paso 0,1 inicial 1; ζ=0,03–0,20 paso 0,01 inicial 0,06. Al cambiar parámetros reinicia ensayo desde reposo relativo.
- Iniciar/Pausar, Reiniciar, Registrar medida tras estabilización, Borrar datos, Exportar CSV. Guarda f, B, ζ y amplitudes de las tres esferas; advierte mantener B y ζ constantes durante barrido.
## Verificación
A amortiguamiento pequeño aparecen tres máximos cerca de las frecuencias propias; mayor ζ reduce y ensancha los picos. Distingue transitorio y régimen estacionario. Los valores son didácticos, no datos de un aparato real.

## Requisitos comunes
- Diseño científico legible, responsive, controles etiquetados y accesibles, sin superposiciones. Gráficas con unidades y leyendas. Info en la cabecera en flujo normal con ventana de instrucciones, cierre y Escape.
- Mantén el modelo físico y las simplificaciones explícitas. Usa requestAnimationFrame cuando corresponda y evita bucles duplicados. Entrega código completo y comprueba los criterios indicados.
