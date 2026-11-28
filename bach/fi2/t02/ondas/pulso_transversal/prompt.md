# Prompt de reconstrucción — Propagación de un pulso transversal

Crea desde cero una aplicación educativa en español para Física de 2.º de Bachillerato, tema Ondas. Entrega un index.html funcional con HTML, CSS y JavaScript integrados, sin servidor ni bibliotecas externas obligatorias. Este prompt ha sido reconstruido a partir de la versión actual, no es una transcripción del original.

## Modelo físico y simulación
Representa 25 esferas azules tangentes en reposo, alineadas horizontalmente, unidas por una polilínea que pasa por sus centros. Cada esfera permanece en su coordenada x y ejecuta exactamente una oscilación vertical de duración T=1/f. El inicio de la esfera i se retrasa i·0,11 s respecto al foco (i=0…24). Para el tiempo local u=t−i·0,11, y=A sen(2πfu) si 0≤u<T, y=0 en otro caso. Se trata de un modelo cinemático didáctico, no de una integración de fuerzas entre partículas.
## Interfaz y controles
- SVG adaptable, 25 círculos tangentes (30 unidades entre centros, radio 15), línea de equilibrio y cuerda azul; escala visual de 27 unidades SVG/cm.
- Amplitud entre 0,5 y 5 cm, paso 0,5, inicial 3; frecuencia entre 0,4 y 2 Hz, paso 0,1, inicial 1.
- Reproducir/Pausar/Continuar y Repetir pulso (reinicia y reproduce). Al variar un parámetro detén y reinicia la escena.
- Indicadores de tiempo, período, amplitud, frecuencia y número de partículas que han concluido su oscilación.
- Usa requestAnimationFrame y detén automáticamente al llegar a 24·0,11+T.
## Pruebas
- Al final las 25 partículas están en reposo en sus posiciones originales.
- Cambiar f modifica T pero no el retardo fijo de 0,11 s; las partículas nunca se desplazan horizontalmente.
- Pausa y reanudación no producen saltos de tiempo.

## Diseño y requisitos comunes
- Interfaz científica limpia, responsive, texto legible en español y etiquetas con unidades SI cuando proceda. Controles con etiquetas accesibles, navegación por teclado, contraste suficiente y gráficas sin solapamientos.
- Incluye botón Info junto al título, en flujo normal, con una ventana modal que contenga las instrucciones de uso; permite cerrar con Escape y devolver el foco al botón.
- Mantén la lógica de simulación independiente de la velocidad de reproducción. No añadas datos o efectos físicos que contradigan el modelo.
- Entrega el código completo listo para publicar en GitHub Pages y comprueba los criterios indicados.
