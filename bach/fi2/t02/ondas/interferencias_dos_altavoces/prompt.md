# Prompt de reconstrucción — Interferencias con dos altavoces

Crea desde cero una aplicación didáctica en español para Física de 2.º de Bachillerato, tema Ondas. Entrega un index.html funcional con HTML, CSS y JavaScript, sin servidor. Este prompt se ha reconstruido a partir de la versión vigente; no es el original.

## Modelo
Dos fuentes puntuales coherentes de misma f, separación d y fase relativa δ=0 o π. v del sonido aproximadamente 343 m/s, k=2πf/v; mapa de intensidad relativa proporcional a |exp(ikr1)/r1+exp(i(kr2+δ))/r2|² con regularización próxima a las fuentes. Modo de canal único como referencia.
## Interfaz
- Dos pestañas: Emisor y mapa / Medidor móvil. Frecuencia numérica 150–1500 Hz y deslizador 200–1200 Hz, inicial 500; separación 0,4–2,4 m, inicial 1,2; volumen inicial 35 %. Selección izquierda/derecha/ambos y fase 0°/180°, reproducción y pantalla completa.
- Web Audio API: un oscilador común, división estéreo con ganancias y signo del canal derecho para oposición. Recomienda altavoces estéreo por cable, no mono ni dispositivos Bluetooth independientes; d del mapa no mueve altavoces reales.
- Medidor móvil: solicita micrófono solo con gesto; análisis local alrededor de la frecuencia objetivo, desactiva AGC y reducción de ruido cuando el navegador permita. Guarda una referencia con solo izquierdo y compara lectura relativa en dB al activar ambos sin moverse. No guarda ni envía audio. Aclara que no es sonómetro calibrado.
## Verificación
En la mediatriz, fuentes iguales en fase refuerzan y en oposición cancelan idealmente; canal único sale por su altavoz. La medición exige HTTPS/permiso y presenta mensajes útiles si falla.

## Requisitos comunes
- Diseño científico legible, responsive, controles etiquetados y accesibles, sin superposiciones. Gráficas con unidades y leyendas. Info en la cabecera en flujo normal con ventana de instrucciones, cierre y Escape.
- Mantén el modelo físico y las simplificaciones explícitas. Usa requestAnimationFrame cuando corresponda y evita bucles duplicados. Entrega código completo y comprueba los criterios indicados.
