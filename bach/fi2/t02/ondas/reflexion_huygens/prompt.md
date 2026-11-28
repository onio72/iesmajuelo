# Prompt de reconstrucción — La ley de la reflexión

Crea desde cero una aplicación didáctica en español para Física de 2.º de Bachillerato, tema Ondas. Entrega un index.html funcional con HTML, CSS y JavaScript, sin servidor. Este prompt se ha reconstruido a partir de la versión vigente; no es el original.

## Geometría y deducción
Frente plano AB llega oblicuamente a frontera; A llega primero. Durante Δt B avanza a B′ y A emite onda secundaria de radio v₁Δt. Tangente común A′B′ es frente reflejado. AB′ es hipotenusa común de los triángulos rectángulos ABB′ y AA′B′. BB′=AB′ sen i, AA′=AB′ sen r. Como AA′=BB′=v₁Δt se obtiene sen i=sen r y por tanto i=r para ángulos entre 0° y 90°. Rayos perpendiculares a frentes, ángulos respecto a normal. Omite transmisión.
## Interfaz
- SVG amplio, dos medios, frontera, normal, rayos incidente/reflejado y ondas secundarias en medio 1. Construcción geométrica exacta y etiquetas sin solapamientos; colores para triángulos y segmentos.
- Ocho pasos: frente incidente, propagación Δt, envolvente reflejada, triángulo incidente, triángulo reflejado, igualdad de distancias, deducción matemática, ley de reflexión.
- Anterior/Siguiente, indicadores numerados, Reproducir/Pausar y Reiniciar, ángulo de incidencia 20–65° inicial 42°. Resalta elementos del paso y anima crecimiento de ondas secundarias.
- Optimiza altura para visualizar gráfica, controles y deducción simultáneamente sin scroll en escritorio; permite scroll en pantalla pequeña.
## Verificación
Para cualquier i permitido r=i; catetos iguales y tangente perpendicular al radio. No se dibuja onda transmitida.

## Requisitos comunes
- Diseño científico legible, responsive, controles etiquetados y accesibles, sin superposiciones. Gráficas con unidades y leyendas. Info en la cabecera en flujo normal con ventana de instrucciones, cierre y Escape.
- Mantén el modelo físico y las simplificaciones explícitas. Usa requestAnimationFrame cuando corresponda y evita bucles duplicados. Entrega código completo y comprueba los criterios indicados.
