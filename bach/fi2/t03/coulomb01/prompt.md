# Prompt de reconstrucción — Dirección y sentido de la fuerza de Coulomb

Crea desde cero una aplicación educativa en español para Física de 2.º de Bachillerato. Prompt reconstruido a partir de la versión actual, no original.

## Modelo y comportamiento

Canvas de dos cargas de signos aleatorios y módulos enteros 1–9, separación suficiente y flecha desde q₁ de longitud fija proporcional a distancia. Usuario orienta la flecha con ratón/tacto, recta de unión opcional. Para signos iguales fuerza sobre q₁ apunta alejándose de q₂; opuestos hacia q₂. Calcula ángulo con atan2 teniendo en cuenta eje y de canvas; tolerancia circular 0,28 rad, diferencia de sentido frente a dirección incorrecta. +1 acierto, −1 error, mínimo cero, verde desde 5, final 10 y reinicio; siguiente ejercicio automático tras acierto y botón nuevo. Conserva comunicación SCORM si existe API. Cabecera en flujo normal sin solapar canvas.

## Requisitos

Entrega código completo y funcional, diseño adaptable, controles accesibles, unidades SI y botón Info integrado en flujo normal junto al título con instrucciones. Conserva el comportamiento didáctico y los sistemas de evaluación y comprueba los casos indicados.
