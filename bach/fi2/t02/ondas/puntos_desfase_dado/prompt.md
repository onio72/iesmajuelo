# Prompt de reconstrucción — Puntos con un desfase dado

Crea desde cero una aplicación didáctica en español para Física de 2.º de Bachillerato, tema Ondas. Entrega un index.html funcional con HTML, CSS y JavaScript, sin servidor. Este prompt se ha reconstruido a partir de la versión vigente; no es el original.

## Modelo
Cuerda ideal 12 m, onda establecida y=A sen[2π(t/T−x/λ)], sin reflexión. Punto Z rojo arrastrable inicialmente x=5 m; para desfase elegido δ representa puntos a ambos lados que satisfacen |Δφ espacial|=δ+2πn con n≥0; x=Z±λ(δ/(2π)+n) en [0,12], sin duplicados ni el propio Z. Para δ=2π equivale a fase 0. Aclara que se usa el módulo no orientado de la diferencia de fase, no un desfase dirigido.
## Interfaz
- SVG con onda, ejes, Z, puntos naranjas y sus guías. Arrastre horizontal y parámetros A=0,2–1,5 paso 0,05 (0,9), T=0,5–5 paso 0,1 (2), λ=1–8 paso 0,1 (4).
- Selección δ: 0, π/6, π/4, π/3, π/2, 2π/3, 3π/4, 5π/6, π, 7π/6, 5π/4, 4π/3, 3π/2, 5π/3, 7π/4, 11π/6, 2π.
- Animar/Pausar, Retroceder/Avanzar, Reiniciar y tiempo 0–12 s. Muestra distancias y relación Δx=λδ/(2π).
## Verificación
Con Z=5, λ=4, δ=π se señalan x=3,7,11 (y cualquier otro candidato dentro del dominio). Con δ=0, x=1,9. Las partículas no se desplazan horizontalmente.

## Requisitos comunes
- Diseño científico legible, responsive, controles etiquetados y accesibles, sin superposiciones. Gráficas con unidades y leyendas. Info en la cabecera en flujo normal con ventana de instrucciones, cierre y Escape.
- Mantén el modelo físico y las simplificaciones explícitas. Usa requestAnimationFrame cuando corresponda y evita bucles duplicados. Entrega código completo y comprueba los criterios indicados.
