# Prompt de reconstrucción — Laboratorio de batidos acústicos

Crea desde cero una aplicación didáctica en español para Física de 2.º de Bachillerato, tema Ondas. Entrega un index.html funcional con HTML, CSS y JavaScript, sin servidor. Este prompt se ha reconstruido a partir de la versión vigente; no es el original.

## Modelo
Suma de dos sinusoides coherentes inicialmente en fase, de igual amplitud: s=sin(2πfAt)+sin(2πfBt)=2 cos(π(fA−fB)t) sin(2π(fA+fB)t/2). Muestra frecuencia media, frecuencia de batido |fA−fB| y período de batido (infinito si coinciden).
## Interfaz
- Dos campos numéricos 100–2000 Hz, paso 0,1, y deslizadores 200–1000 Hz, paso 1; iniciales 440 y 442 Hz. Presets 440+440, +441, +442 y +445.
- Representa señales y suma con envolvente, escalas temporales legibles y lecturas actualizadas. Audio Web Audio API con dos osciladores sinusoidales y ganancia común limitada, iniciar/detener mediante gesto del usuario, volumen inicial 40 %, recomienda volumen bajo. Al modificar frecuencias reinicia ambos tonos en fase.
- Pantalla completa opcional, diseño adaptable.
## Verificación
Para 440 y 442 Hz se oyen 2 batidos/s; con frecuencias iguales la envolvente es constante. El audio debe detenerse sin dejar osciladores activos.

## Requisitos comunes
- Diseño científico legible, responsive, controles etiquetados y accesibles, sin superposiciones. Gráficas con unidades y leyendas. Info en la cabecera en flujo normal con ventana de instrucciones, cierre y Escape.
- Mantén el modelo físico y las simplificaciones explícitas. Usa requestAnimationFrame cuando corresponda y evita bucles duplicados. Entrega código completo y comprueba los criterios indicados.
