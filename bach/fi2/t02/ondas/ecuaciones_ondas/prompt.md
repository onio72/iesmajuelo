# Prompt de reconstrucción — Cuatro formas de la ecuación de ondas

Crea desde cero una aplicación educativa en español para Física de 2.º de Bachillerato, tema Ondas. Entrega un index.html funcional con HTML, CSS y JavaScript integrados, sin servidor ni bibliotecas externas obligatorias. Este prompt ha sido reconstruido a partir de la versión actual, no es una transcripción del original.

## Modelo y equivalencias
Representa cuatro ondas con una misma base A, λ, T, φ₀: A sen(ωt±kx+φ), A cos(ωt±kx+φ), A sen(kx±ωt+φ), A cos(kx±ωt+φ). ω=2π/T, k=2π/λ. El signo menos corresponde a propagación +X, el más a −X.
En el modo de equivalencias, selecciona una referencia y calcula simbólicamente las fases de las otras ondas. Convierte cos a sen sumando π/2; si los argumentos lineales tienen signo opuesto usa sen(π−u)=sen(u). Escribe explícitamente ±φ₀ y el ajuste 0, ±π/2 o π. Si el sentido es distinto, indica que no existe fase inicial constante equivalente.
## Interfaz e interacción
- Cuatro gráficas Canvas apiladas con colores diferenciados, mismas escalas (x 0–6 m, y aproximadamente −2 a 2 m), ecuación y botón de signo por onda.
- A 0,2–2 m (0,1), λ 1–4 m (0,1), T 1–6 s (0,2), fase −180° a 180° (15°), ritmo 0,1–2×. Valores iniciales 1 m, 2 m, 3 s, 0°, 0,6×.
- Reproducir/Pausar, Reiniciar, Cambiar todos los signos; mostrar crestas y partícula negra fija en x=3 m; selector de referencia entre las cuatro ondas y opción Mostrar las fases equivalentes.
- Al pulsar y arrastrar una gráfica, crea una copia semitransparente trasladable verticalmente, imantada al eje de otra gráfica próxima; no cambia las ondas originales. Permite quitar copia y usar teclado.
## Pruebas
- Para cualquier referencia y signos iguales, las curvas equivalentes coinciden en varios x y t, incluyendo φ₀ no nula.
- Signos distintos se señalan como incompatibles.
- Las crestas avanzan, la partícula negra solo oscila y el arrastre no cambia la física.

## Diseño y requisitos comunes
- Interfaz científica limpia, responsive, texto legible en español y etiquetas con unidades SI cuando proceda. Controles con etiquetas accesibles, navegación por teclado, contraste suficiente y gráficas sin solapamientos.
- Incluye botón Info junto al título, en flujo normal, con una ventana modal que contenga las instrucciones de uso; permite cerrar con Escape y devolver el foco al botón.
- Mantén la lógica de simulación independiente de la velocidad de reproducción. No añadas datos o efectos físicos que contradigan el modelo.
- Entrega el código completo listo para publicar en GitHub Pages y comprueba los criterios indicados.
