# Prompt de reconstrucción — ¿Cuánto tarda una partícula en repetir su movimiento?

Crea desde cero una aplicación didáctica en español para Física de 2.º de Bachillerato. Este prompt reconstruye la versión vigente; no es el original.

## Modelo e interfaz

Onda armónica establecida en una cuerda de 12 m, y=A sen[2πf(t−x/v)], T=1/f. Valores iniciales T=2 s, v=2,4 m/s, A=0,82 m, punto x=2 m. Canvas con partícula roja de x fija durante la oscilación; deslizador x=0–12 m paso 0,1. Reproducción, pausa, ±0,05 s, tiempo 0–30 s, ritmo 0,1–3×. Medición automática: espera próximo máximo de la partícula seleccionada, inicia y detiene cronómetro en máximos sucesivos de esa misma partícula, expresa segundos con centésimas (sin minutos). Cancela medición si se cambia el punto o el instante, pausa temporalmente si se pausa la animación. Registra medidas con comprobación y permite reiniciar o generar otra onda. Verifica que T no depende de x ni de ritmo visual. Conserva Info modal original.

## Requisitos técnicos

Entrega HTML, CSS y JavaScript completos para GitHub Pages; interfaz adaptable, controles accesibles, unidades y etiquetas legibles, botón Info integrado en flujo normal, modal con instrucciones y cierre mediante Escape. Conserva el modelo físico y comprueba los casos descritos.
