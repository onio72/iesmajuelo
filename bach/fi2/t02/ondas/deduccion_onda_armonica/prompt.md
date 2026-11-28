# Prompt de reconstrucción — De un movimiento armónico simple a la ecuación de una onda

Crea desde cero una aplicación didáctica en español para Física de 2.º de Bachillerato, tema Ondas. Entrega un index.html funcional con HTML, CSS y JavaScript, sin servidor. Este prompt se ha reconstruido a partir de la versión vigente; no es el original.

## Modelo
A=1 m, T=2 s, λ=4 m, v=2 m/s, ω=π rad/s, k=π/2 rad/m, cuerda de 12 m inicialmente en reposo, propagación hacia +x. Foco y(0,t)=A sen(ωt); punto P recibe su movimiento con retardo x/v. Antes de llegar el frente permanece en equilibrio.
## Secuencia didáctica
- Presentación interactiva en siete escenas: oscilación del foco, propagación, observación de P, retardo temporal, sustitución t−x/v, introducción de k y ecuación final y=A sen(ωt−kx). Explica el papel de cada magnitud y destaca los términos en el momento adecuado.
- SVG de cuerda, foco, punto P y marcas pertinentes; panel de razonamiento, pregunta y Mostrar respuesta. Anterior/Siguiente y navegación por indicadores de escena.
- Reproducir/Pausar, Reiniciar, ritmo 0,25–2×, posición P 1–10 m paso 0,25 inicial 6 m. Mantén las magnitudes físicas constantes al cambiar ritmo.
## Verificación
P a 6 m empieza a oscilar a los 3 s; el argumento en P es el del foco tres segundos antes. La deducción termina en k=ω/v=2π/λ.

## Requisitos comunes
- Diseño científico legible, responsive, controles etiquetados y accesibles, sin superposiciones. Gráficas con unidades y leyendas. Info en la cabecera en flujo normal con ventana de instrucciones, cierre y Escape.
- Mantén el modelo físico y las simplificaciones explícitas. Usa requestAnimationFrame cuando corresponda y evita bucles duplicados. Entrega código completo y comprueba los criterios indicados.
