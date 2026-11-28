# Prompt de reconstrucción — Reto · Comparación de ondas transversales

Crea desde cero una aplicación didáctica en español para Física de 2.º de Bachillerato, tema Ondas. Entrega un index.html funcional con HTML, CSS y JavaScript, sin servidor. Este prompt se ha reconstruido a partir de la versión vigente; no es el original.

## Modelo
Dos cuerdas de 12 m inicialmente en reposo; focos simultáneos, dirección hacia derecha o izquierda, y=A sen(2πf(t−distancia/v)) tras llegada del frente; antes y=0. T=1/f, λ=v/f, k=2π/λ. Genera pares aleatorios con comparaciones equilibradas mayor/menor/igual y las cuatro combinaciones de sentido.
## Interfaz y evaluación
- Canvas de dos cuerdas (azul y naranja), cronómetro, Iniciar/Pausar, Volver al inicio, ritmo 0,25–2× y deslizador temporal 0–20 s. Mantén magnitudes físicas independientes del ritmo.
- Alterna ejercicios de observación gráfica y de comparación de dos ecuaciones armónicas escritas. En los primeros compara A, f, T, λ, k, v y sentido; en los segundos compara también si tienen igual valor y si se propagan en el mismo sentido.
- Usa valores discretos sencillos: A alrededor de 0,3–0,9 m, f 0,5–2 Hz, λ 2–6 m. Calcula las magnitudes dependientes a partir de los parámetros escogidos, no de forma independiente.
- Presenta opciones de respuesta, puntuación y retroalimentación; Comprobar solo cuando estén respondidas, Siguiente ejercicio después de corregir. No reveles la respuesta antes de la corrección.
## Verificación
La comparación de T invierte la de f, la de k invierte la de λ; el signo de fase determina sentido. Cada par debe ser físicamente consistente.

## Requisitos comunes
- Diseño científico legible, responsive, controles etiquetados y accesibles, sin superposiciones. Gráficas con unidades y leyendas. Info en la cabecera en flujo normal con ventana de instrucciones, cierre y Escape.
- Mantén el modelo físico y las simplificaciones explícitas. Usa requestAnimationFrame cuando corresponda y evita bucles duplicados. Entrega código completo y comprueba los criterios indicados.
