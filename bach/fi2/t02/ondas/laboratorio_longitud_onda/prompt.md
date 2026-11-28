# Prompt de reconstrucción — ¿Cuánto mide una longitud de onda?

Crea desde cero una aplicación didáctica en español para Física de 2.º de Bachillerato, tema Ondas. Entrega un index.html funcional con HTML, CSS y JavaScript, sin servidor. Este prompt se ha reconstruido a partir de la versión vigente; no es el original.

## Modelo
Cuerda ideal de 12 m, onda establecida hacia +x, y=A sen[2π(vt−x)/λ+φ]. Casos λ=1,5; 2; 2,4; 3; 4 m; caso inicial λ=3 m, velocidad 1,4 m/s y fase 0,45 rad. Varía parámetros en nuevos ejercicios sin revelar λ.
## Interfaz
- Canvas de 1080×460 con regla graduada cada 0,1 m y cursores verticales A y B (rojo y naranja), arrastrables y colocables mediante botones. Dibuja sus intersecciones con la onda y segmento de distancia.
- Pausar/Reanudar, pasos ±0,05 s, Reiniciar, Otro ejercicio, deslizador temporal y ritmo 0,1–3×. Casilla de ayuda para marcar crestas y valles.
- Campo de λ en metros y Comprobar medición; distingue cursor mal colocado, múltiplos de λ y error numérico. Retroalimentación y tolerancia razonable de lectura.
## Verificación
Dos crestas consecutivas separadas λ son correctas; cresta a valle contiguo equivale a λ/2. Los cursores se mantienen en coordenadas x al transcurrir el tiempo.

## Requisitos comunes
- Diseño científico legible, responsive, controles etiquetados y accesibles, sin superposiciones. Gráficas con unidades y leyendas. Info en la cabecera en flujo normal con ventana de instrucciones, cierre y Escape.
- Mantén el modelo físico y las simplificaciones explícitas. Usa requestAnimationFrame cuando corresponda y evita bucles duplicados. Entrega código completo y comprueba los criterios indicados.
