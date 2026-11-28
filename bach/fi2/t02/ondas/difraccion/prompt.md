# Prompt de reconstrucción — Difracción de ondas

Crea desde cero una aplicación didáctica en español para Física de 2.º de Bachillerato, tema Ondas. Entrega un index.html funcional con HTML, CSS y JavaScript, sin servidor. Este prompt se ha reconstruido a partir de la versión vigente; no es el original.

## Modelo
Difracción cualitativa 2D de frentes planos incidentes de izquierda a derecha, rendija u obstáculo complementario. Usa propagación de espectro angular: FFT de la apertura transversal, componente ky=2πm/(N·G), propagación exp(i√(k²−ky²)·x) para modos propagantes y decaimiento exp(−√(ky²−k²)·x) para evanescentes. Para obstáculo usa campo incidente menos campo de rendija (complementariedad ideal). k=2π/λ. Omite reflexión en la barrera y advierte que no es una medición cuantitativa.
## Interfaz
- Canvas 960×480, barrera x=370, malla G=2, FFT N=1024 con buffer de menor resolución. Recalcula campo complejo al cambiar parámetros; anima fase y representa crestas azules, barrera y límites geométricos naranjas discontinuos.
- Selector Rendija/Obstáculo; d 12–320 unidades gráficas paso 2 y λ 24–96 paso 2, ambos iniciales 60. Presets d=λ/2, d=λ, d=4λ ajustando a límites permitidos. Mostrar límites, Pausar/Reanudar, Reiniciar sin modificar parámetros.
- Lectura d/λ, cota de tamaño, interpretación cualitativa y guía sobre cómo comparar casos.
## Verificación
Con d≈λ o menor se aprecia más extensión lateral. Con obstáculo estrecho se llena la sombra; con d≫λ el frente se aproxima a propagación rectilínea. No confundir frentes con trayectorias de partículas.

## Requisitos comunes
- Diseño científico legible, responsive, controles etiquetados y accesibles, sin superposiciones. Gráficas con unidades y leyendas. Info en la cabecera en flujo normal con ventana de instrucciones, cierre y Escape.
- Mantén el modelo físico y las simplificaciones explícitas. Usa requestAnimationFrame cuando corresponda y evita bucles duplicados. Entrega código completo y comprueba los criterios indicados.
