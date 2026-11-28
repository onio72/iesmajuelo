# Prompt de reconstrucción — ¿A qué velocidad viaja una onda?

Crea desde cero una aplicación didáctica en español para Física de 2.º de Bachillerato, tema Ondas. Entrega un index.html funcional con HTML, CSS y JavaScript, sin servidor. Este prompt se ha reconstruido a partir de la versión vigente; no es el original.

## Modelo
Cuerda de 12 m inicialmente en reposo, foco emite una onda sinusoidal y=A sen(2πf(t−x/v)) detrás del frente x=vt, antes y=0. Casos (v m/s,f Hz,A m): (1,20;0,65;0,62), (1,75;0,85;0,46), (2,35;0,72;0,68), (2,70;1,16;0,39), (1,45;1,05;0,72), (2,05;0,51;0,52), (1,90;1,26;0,57), (2,55;0,92;0,76). No reveles v antes del ejercicio.
## Interfaz y procedimiento
- Cuerda, foco, frente discontinuo y cronómetro con centésimas; Reproducir, Pausar, Repetir, Nuevo experimento. Detener antes de que el frente alcance 12 m.
- Cinta métrica disponible con onda pausada; arrastre horizontal de su extremo y deslizador 0–12 m paso 0,05. Mide desde el foco hasta el frente.
- Campos distancia (m), tiempo (s) y velocidad (m/s), aceptan coma decimal. Comprobar cálculo evalúa mediciones y v=d/t con tolerancia experimental; Mostrar solución explica después del intento.
- Calculadora científica modal con operaciones, trigonometría en DEG, logaritmos, potencias, raíz, memoria Ans y controles de borrado.
## Verificación
Si v=1,20 m/s y t=5 s, el frente está a 6 m. No se confunde velocidad de oscilación con velocidad del frente. Reiniciar limpia estado y mediciones, cambiar caso modifica parámetros.

## Requisitos comunes
- Diseño científico legible, responsive, controles etiquetados y accesibles, sin superposiciones. Gráficas con unidades y leyendas. Info en la cabecera en flujo normal con ventana de instrucciones, cierre y Escape.
- Mantén el modelo físico y las simplificaciones explícitas. Usa requestAnimationFrame cuando corresponda y evita bucles duplicados. Entrega código completo y comprueba los criterios indicados.
