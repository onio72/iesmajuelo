# Prompt de reconstrucción — ¿Cómo se mueve un punto de una cuerda?

Crea desde cero una aplicación didáctica en español para Física de 2.º de Bachillerato, tema Ondas. Entrega un index.html funcional con HTML, CSS y JavaScript, sin servidor. Este prompt se ha reconstruido a partir de la versión vigente; no es el original.

## Modelo
Onda transversal viajera hacia +x ya establecida, y=A sen(2π(x/λ−ft)), x=0–10 m; v=λf. Un punto material mantiene x constante. Sin reflexión.
## Interfaz
- Canvas de 1000×440, eje de equilibrio, curva y punto amarillo. Modos Onda completa, Ventana móvil y Punto aislado; en ventana atenúa resto de la onda, en aislado destaca solo el punto.
- Deslizador posición 0–10 m paso 0,05 inicial 5; arrastra ventana horizontalmente para seleccionar punto. Ancho 0,4–2,5 m inicial 0,9; atenuación 0–100 % inicial 90. Ritmo 0,1–2× inicial 1.
- A=0,2–1,4 m inicial 0,8; f=0,1–1,5 Hz inicial 0,5; λ=1,5–8 m inicial 4. Pausar/Reanudar, Reiniciar tiempo, Restablecer.
- Pregunta de reflexión y botón Mostrar explicación sobre oscilación local y propagación.
## Verificación
En la vista aislada x no cambia aunque se muevan las crestas. Cambiar ritmo no modifica v, T ni f; cambiar λ o f sí modifica v.

## Requisitos comunes
- Diseño científico legible, responsive, controles etiquetados y accesibles, sin superposiciones. Gráficas con unidades y leyendas. Info en la cabecera en flujo normal con ventana de instrucciones, cierre y Escape.
- Mantén el modelo físico y las simplificaciones explícitas. Usa requestAnimationFrame cuando corresponda y evita bucles duplicados. Entrega código completo y comprueba los criterios indicados.
