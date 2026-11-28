# Prompt de reconstrucción — La ley de la refracción

Crea desde cero una aplicación didáctica en español para Física de 2.º de Bachillerato, tema Ondas. Entrega un index.html funcional con HTML, CSS y JavaScript, sin servidor. Este prompt se ha reconstruido a partir de la versión vigente; no es el original.

## Geometría y deducción
Dos medios homogéneos e isótropos, índices n₁,n₂ y velocidades c/n. Frente AB llega a frontera en A primero; durante Δt B alcanza B′ y A emite onda secundaria de radio v₂Δt. Tangente A′B′ forma frente refractado; triángulos rectángulos ABB′ y AA′B′ comparten AB′. sen i=BB′/AB′, sen r=AA′/AB′; división da sen i/sen r=v₁/v₂=n₂/n₁; n₁ sen i=n₂ sen r. Calcula q=n₁ sen i/n₂; si q>1 no existe r real ni frente refractado propagante, indica reflexión total sin simular una refracción imposible. Omite onda reflejada en esta deducción.
## Interfaz
- SVG grande con medios, frontera, normal, rayos y frentes, ondas secundarias hacia medio 2, triángulos y segmentos coloreados. Etiquetas legibles.
- Ocho pasos: frente incidente, propagación Δt, envolvente refractada, triángulo incidente, triángulo refractado, división, sustitución de distancias, ley de Snell.
- Anterior/Siguiente, Reproducir/Pausar, Reiniciar e indicadores. i=20–65° (42), n₁=1–2 (1), n₂=1–2,5 (1,5), paso índices 0,05. Muestra ángulos, relaciones y fórmula.
- Diseño sin scroll en pantalla de escritorio cuando sea viable y adaptable en móviles.
## Verificación
n₁=n₂ implica i=r; n₂>n₁ aproxima el rayo a la normal; n₁=2, n₂=1, i=42° implica reflexión total. Frecuencia se conserva.

## Requisitos comunes
- Diseño científico legible, responsive, controles etiquetados y accesibles, sin superposiciones. Gráficas con unidades y leyendas. Info en la cabecera en flujo normal con ventana de instrucciones, cierre y Escape.
- Mantén el modelo físico y las simplificaciones explícitas. Usa requestAnimationFrame cuando corresponda y evita bucles duplicados. Entrega código completo y comprueba los criterios indicados.
