# MAS · Cálculo de la ecuación

Aplicación práctica guiada para Física de 2.º de Bachillerato.

## Objetivo
Deducir las ecuaciones del movimiento armónico simple vertical a partir de la amplitud, un dato temporal (periodo, frecuencia o frecuencia angular), la posición inicial y, cuando es necesario, el sentido inicial de la velocidad.

## Etapas
1. Interpretar el enunciado y representar la condición inicial arrastrando la masa y orientando la velocidad.
2. Elegir seno o coseno, ambos válidos con fases diferentes.
3. Determinar A y ω.
4. Completar las ecuaciones particulares de posición, velocidad y aceleración, manteniendo φ₀ como incógnita.
5. Determinar φ₀ con una pista opcional que invita a evaluar las ecuaciones en t = 0 s.
6. Comparar las dos expresiones equivalentes y reproducir el movimiento.

## Dificultad
- Ejercicios 1–3: extremos ±A y equilibrio.
- Ejercicios 4–6: ±A/2.
- Desde el ejercicio 7: ±A√2/2 y ±A√3/2.

Los enunciados no proporcionan directamente la ecuación simbólica de las condiciones iniciales ni anticipan la velocidad cero en los extremos. En posiciones intermedias se indica el sentido inicial de movimiento.

## Diseño y dependencias
Usa **herramientas/estilos/v1/practica.css**, porque la tarea predominante consiste en interpretar una representación y dar respuestas que reciben corrección. La hoja importa la base común v1. Azul para la masa, naranja para el vector velocidad y verde para el equilibrio. Aplicación HTML/JavaScript sin bibliotecas JavaScript externas.

## Comprobaciones
- Sintaxis JavaScript comprobada.
- Comprobadas matemáticamente 32 combinaciones de posición, sentido y forma trigonométrica para las fases definidas.
- Archivos y enlaces publicados en GitHub.
- Pendientes pruebas de navegación e interacción real en navegador de escritorio y móvil (1280, 390 y 320 px), accesibilidad visual y consola. Sin pruebas en Moodle ni integración SCORM.
