# Prompt de reconstrucción — Reflexión, transmisión e interferencia en dos cuerdas

Crea desde cero una aplicación didáctica en español para Física de 2.º de Bachillerato, tema Ondas. Entrega un index.html funcional con HTML, CSS y JavaScript, sin servidor. Este prompt se ha reconstruido a partir de la versión vigente; no es el original.

## Modelo físico y algoritmo
Dos cuerdas ideales bajo tensión F, vj=√(F/μj), λj=vj/f. Continuidad de desplazamiento y fuerza transversal. r₁₂=(v₂−v₁)/(v₂+v₁), t₁₂=1+r₁₂; r₂₁=−r₁₂, t₂₁=1−r₁₂. Reflexión extremo fijo −1. Potencia media ½μvω²A², fracciones de primera incidencia R=r², T=1−R. No interpretar como balance instantáneo.
Foco absorbente: inyecta señal A g(t) sen(ωt) y absorbe retornos. Foco impuesto: obliga a y(0,t)=A g(t) sen(ωt) y añade reflexión de retorno −1. g(t) sube suavemente durante un período; sin amortiguamiento. Construye series causales de retardos y coeficientes de trayectorias por propagación, reflexión y transmisión en unión y extremos hasta horizonte 60 s; agrega retardos coincidentes y usa sumas acumuladas seno/coseno para evaluar eficientemente ondas ya establecidas y transitorios. Calcula límite armónico mediante amplitudes complejas para foco absorbente, denominador 1−r exp(−2iωL₂/v₂). Extremo fijo satisface y(L₁+L₂,t)=0 en solución completa.
## Interfaz
- Cinco modos: incidente; primeras reflejada/transmitida; añade primera reflexión extremo fijo; todas contribuciones (solución real causal); límite armónico estacionario con foco absorbente. Aclara que los primeros tres son descomposiciones parciales y el quinto no es un estado instantáneo.
- μ₁,μ₂ 0,05–0,8 kg/m paso 0,01 (0,1/0,4); F 5–25 N (10); f 0,4–3 Hz paso 0,01 (1,4); A 0,02–0,20 m (0,1); L₁,L₂ 4–12 m paso 0,5 (8). Presets ligera→densa, densa→ligera, iguales, resonancia foco impuesto. Cambios físicos reinician; modos 1–4 conservan instante.
- Canvas con suma oscura y contribuciones de colores; casillas de incidente, primera reflejada, primera transmitida, primera del extremo, posteriores, sumas derecha/izquierda, envolventes, nodos, mínimos/máximos, cruces, λ. Cruces instantáneos naranjas, nodos confirmados verdes, aproximados huecos; no marcar cuerda aún en reposo. Distingue cruces móviles de nodos permanentes.
- Reproducir/Pausar, ±0,05 s, reiniciar, tiempo 0–60 s, ritmo 0,1–2×. Tabla de velocidades, λ, amplitudes y potencia; barras R/T. Guía de exploración que pausa simulación.
## Verificación
Densidades iguales r=0. De ligera a densa r negativo; de densa a ligera t puede superar 1 sin violar conservación de potencia. Dos ondas contrapropagantes de igual amplitud forman estacionaria pura; distintas amplitudes dan mínimos no nulos. Límite absorbente tiene flujo neto cero; foco impuesto puede presentar crecimiento resonante ideal. En modo 4 verifica causalidad, continuidad de la unión y extremo fijo.

## Requisitos comunes
- Diseño científico legible, responsive, controles etiquetados y accesibles, sin superposiciones. Gráficas con unidades y leyendas. Info en la cabecera en flujo normal con ventana de instrucciones, cierre y Escape.
- Mantén el modelo físico y las simplificaciones explícitas. Usa requestAnimationFrame cuando corresponda y evita bucles duplicados. Entrega código completo y comprueba los criterios indicados.
