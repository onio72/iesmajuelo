# Prompt de reconstrucción — Puntos en fase y en oposición de fase

Crea desde cero una aplicación didáctica en español para Física de 2.º de Bachillerato, tema Ondas. Entrega un index.html funcional con HTML, CSS y JavaScript, sin servidor. Este prompt se ha reconstruido a partir de la versión vigente; no es el original.

## Modelo
Cuerda de 12 m en régimen establecido sin reflexión, y=A sen[2π(t/T−x/λ)]. Punto Z rojo inicialmente 5,2 m, arrastrable. En fase: x=Z+nλ, n entero distinto de 0. En oposición: x=Z+(n+1/2)λ, n entero. Filtra al dominio [0,12].
## Interfaz
- Canvas 1000×365, ejes y onda azul; Z y puntos seleccionados con guías. Permite arrastrar Z o pulsar otra posición.
- A 0,2–1,6 m paso 0,1 (1), T 0,5–5 s paso 0,1 (2), λ 1–6 m paso 0,1 (3). Radio En fase / En oposición de fase. Animar, Pausar, Retroceder, Avanzar, Ir al inicio; deslizador 0–12 s.
- Explica igualdad de elongación y velocidad de oscilación en fase y signos opuestos en oposición.
## Verificación
Para λ=3 m los puntos en fase distan múltiplos de 3 m y los opuestos múltiplos impares de 1,5 m; Z queda excluido. Conservan sus posiciones x durante animación.

## Requisitos comunes
- Diseño científico legible, responsive, controles etiquetados y accesibles, sin superposiciones. Gráficas con unidades y leyendas. Info en la cabecera en flujo normal con ventana de instrucciones, cierre y Escape.
- Mantén el modelo físico y las simplificaciones explícitas. Usa requestAnimationFrame cuando corresponda y evita bucles duplicados. Entrega código completo y comprueba los criterios indicados.
