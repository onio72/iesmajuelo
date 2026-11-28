# Prompt de reconstrucción — Propagación de ondas en dos cuerdas

Crea desde cero una aplicación didáctica en español para Física de 2.º de Bachillerato, tema Ondas. Entrega un index.html funcional con HTML, CSS y JavaScript, sin servidor. Este prompt se ha reconstruido a partir de la versión vigente; no es el original.

## Modelo
Dos tramos de longitud L=8 m con tensión común F y densidades μ₁,μ₂; vj=√(F/μj), λj=vj/f. Foco en x=0. Pulso único A sen²(πu/0,8) para 0<u<0,8 s, o señal armónica A sen(2πfu) para u>0. Propaga cada contribución con retardos. Modelo idealizado R=0, T=1 (omite reflexión y no conserva generalmente potencia); modelo real r=(v₂−v₁)/(v₂+v₁), t=1+r; desde el otro lado r₂₁=−r, t₂₁=1−r. Extremo absorbente sin retorno o fijo con inversión −1 y suma de ecos sucesivos; foco absorbente de retornos. No anticipes llegadas.
## Interfaz
- Experiencia pulso/continua, modelo ideal/real, extremo absorbente/fijo. μ₁ y μ₂ 10–90 g/m paso 5 (inicial 10/40); F=0,04–0,64 N paso 0,04 (0,16); f=0,5–2 Hz paso 0,25 (1); A=0,05–0,30 m paso 0,05 (0,20).
- Canvas con dos colores y grosor según densidad, frente y foco. Reproducir/Pausar, ±0,05 s, Reiniciar, ritmo ¼–2×, deslizador de tiempo. Casillas puntos materiales A/B/C en x=4/8/12, longitudes de onda y gráficas elongación-tiempo.
- Indica λ y fase instantánea del foco φ=2πft. Segmentos λ viajan con crestas mientras sean viajeras; inmovilízalos únicamente cuando se haya establecido superposición estacionaria en el tramo, no antes.
## Verificación
Cuadruplicar μ reduce v a la mitad; f se conserva. En modo real μ iguales no reflejan en frontera; extremo fijo mantiene desplazamiento cero. Etiqueta explícitamente las simplificaciones.

## Requisitos comunes
- Diseño científico legible, responsive, controles etiquetados y accesibles, sin superposiciones. Gráficas con unidades y leyendas. Info en la cabecera en flujo normal con ventana de instrucciones, cierre y Escape.
- Mantén el modelo físico y las simplificaciones explícitas. Usa requestAnimationFrame cuando corresponda y evita bucles duplicados. Entrega código completo y comprueba los criterios indicados.
