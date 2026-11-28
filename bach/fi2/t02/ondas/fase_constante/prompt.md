# Prompt de reconstrucción — Una fase constante en movimiento

Crea desde cero una aplicación educativa en español para Física de 2.º de Bachillerato, tema Ondas. Entrega un index.html funcional con HTML, CSS y JavaScript integrados, sin servidor ni bibliotecas externas obligatorias. Este prompt ha sido reconstruido a partir de la versión actual, no es una transcripción del original.

## Modelo físico
Onda armónica en una cuerda inicialmente en reposo, foco x=0: A=1 m, λ=4 m, T=4 s, φ₀=0, ω=k=π/2 en sus respectivas unidades; v=1 m/s. Dirección d=±1; y=sen[(π/2)(t−d x)] en 0≤d x≤min(t,14), fuera del tramo perturbado la cuerda está horizontal. Sin reflexión.
Para Φ seleccionada, x=d(t−Φ/ω); el marcador aparece solo cuando la fase ya ha sido emitida y está dentro del tramo. Las fases equivalentes están separadas por λ, se muestran opcionalmente y no deben aparecer antes de ser emitidas.
## Interfaz
- Selector de sentido +X/−X y deslizador de fase 0…2π en pasos de π/4; reproducción 0,1–2× y tiempo 0–20 s.
- Dibuja SVG con foco, frente de onda, curva, fase exacta, flecha de velocidad y fases equivalentes opcionales.
- Reproducir/Pausar, −0,1 s, +0,1 s, Reiniciar y deslizador temporal.
- Deducción progresiva en cuatro pasos de ωt±kx+φ₀=Φ hasta x=x₀+vt; botones Mostrar siguiente paso y Mostrar todo. Gráfica x(t) con extrapolación discontinua y tramo físico continuo.
## Pruebas
- Para Φ=π, la fase sale del foco en t=2 s; en t=6 s se encuentra en x=4 m o −4 m según el sentido.
- El cambio de dirección cambia el signo de v y de kx, no el módulo de v.
- La velocidad visual no cambia la física.

## Diseño y requisitos comunes
- Interfaz científica limpia, responsive, texto legible en español y etiquetas con unidades SI cuando proceda. Controles con etiquetas accesibles, navegación por teclado, contraste suficiente y gráficas sin solapamientos.
- Incluye botón Info junto al título, en flujo normal, con una ventana modal que contenga las instrucciones de uso; permite cerrar con Escape y devolver el foco al botón.
- Mantén la lógica de simulación independiente de la velocidad de reproducción. No añadas datos o efectos físicos que contradigan el modelo.
- Entrega el código completo listo para publicar en GitHub Pages y comprueba los criterios indicados.
