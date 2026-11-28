# Prompt de reconstrucción — Cuerda vibrante: armónicos y sonido

Crea desde cero una aplicación didáctica en español para Física de 2.º de Bachillerato, tema Ondas. Entrega un index.html funcional con HTML, CSS y JavaScript, sin servidor. Este prompt se ha reconstruido a partir de la versión vigente; no es el original.

## Modelo
Cuerda con dos extremos fijos, tensión y densidad constantes, longitud ajustable L=20–65 cm, velocidad v constante, λn=2L/n, fn=nv/(2L). Forma modal proporcional a sen(nπx/L); nodos en x=jL/n. Distingue frecuencia fundamental, armónico y timbre. Usa espectro discreto y síntesis aditiva en los modos instrumentales.
## Interfaz
- Deslizador L 20–65 cm paso 0,5; inicial 65. Botones n=1…6, inicial 1. Visualización de cuerda, apoyos, nodos y vientres, frecuencia y longitud de onda, espectro y nota aproximada.
- Tres modos sonoros: aislado (una sinusoide), guitarra pulsada (armónicos con coeficientes dependientes del punto de pulsación y decaimiento), cuerda frotada (varios armónicos sostenidos). Deslizador punto de pulsación 10–50 % inicial 22 %, volumen 0–100 % inicial 35 %.
- Escuchar/tocar, Detener, pantalla completa. Web Audio API, audio solo tras gesto y con ganancia limitada. Deja explícito que son timbres sintetizados.
## Verificación
Acortar L eleva fn, duplicar n duplica fn; n=1 no tiene nodo interior, n=6 tiene cinco. Pulsar en un nodo reduce o anula la excitación del modo correspondiente.

## Requisitos comunes
- Diseño científico legible, responsive, controles etiquetados y accesibles, sin superposiciones. Gráficas con unidades y leyendas. Info en la cabecera en flujo normal con ventana de instrucciones, cierre y Escape.
- Mantén el modelo físico y las simplificaciones explícitas. Usa requestAnimationFrame cuando corresponda y evita bucles duplicados. Entrega código completo y comprueba los criterios indicados.
