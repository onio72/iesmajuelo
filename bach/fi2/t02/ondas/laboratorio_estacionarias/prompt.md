# Prompt de reconstrucción — Resonancia de una cuerda bajo tensión

Crea desde cero una aplicación didáctica en español para Física de 2.º de Bachillerato, tema Ondas. Entrega un index.html funcional con HTML, CSS y JavaScript, sin servidor. Este prompt se ha reconstruido a partir de la versión vigente; no es el original.

## Modelo
Cuerda bajo tensión por masa suspendida: F=mg, v=√(F/μ), f₀=v/(2L). Excitación periódica y respuesta resonante modal; representa fundamental y armónicos, nodos y vientres. Incluye diferentes cuerdas con μ distintas y medición simulada de masa/longitud, con incertidumbre experimental.
## Interfaz
- Escena Canvas con cuerda, vibrador, polea y masas; controles Variar longitud, Variar tensión y Pesar la cuerda.
- Frecuencia 0–60 Hz paso 0,1; L 0,400–1,100 m paso 0,025 inicial 1 m; masa suspendida 50–500 g paso 50 inicial 100 g.
- Busca el fundamental ajustando f; Registrar añade medidas. Para variar longitud tabla l, f, 1/f y gráfica 1/f frente a l; para tensión tabla F, f, f² y gráfica f² frente a F. Permite borrar y estimar μ mediante ajuste lineal.
- Instrucciones del ensayo y magnitudes con unidades; diseño científico adaptable.
## Verificación
A tensión constante 1/f₀ proporcional a L; a longitud constante f₀² proporcional a F. La resonancia debe ser visible al aproximarse a f₀.

## Requisitos comunes
- Diseño científico legible, responsive, controles etiquetados y accesibles, sin superposiciones. Gráficas con unidades y leyendas. Info en la cabecera en flujo normal con ventana de instrucciones, cierre y Escape.
- Mantén el modelo físico y las simplificaciones explícitas. Usa requestAnimationFrame cuando corresponda y evita bucles duplicados. Entrega código completo y comprueba los criterios indicados.
