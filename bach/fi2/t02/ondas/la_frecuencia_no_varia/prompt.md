# Prompt de reconstrucción — La frecuencia no varía

Crea desde cero una aplicación educativa en español para Física de 2.º de Bachillerato, tema Ondas. Entrega un index.html funcional con HTML, CSS y JavaScript integrados, sin servidor ni bibliotecas externas obligatorias. Este prompt ha sido reconstruido a partir de la versión actual, no es una transcripción del original.

## Modelo físico
Dos cuerdas de 9 m cada una, tensión común 0,90 N, densidades lineales 0,10 y 0,40 kg/m, velocidades 3 y 1,5 m/s. Foco en x=0, período T=2 s, f=0,5 Hz. Retardo τ(x)=x/3 si x≤9 y 3+(x−9)/1,5 si x>9. y=A sen(2π(t−τ)/T) para t≥τ; antes, y=0. Muestra la cuerda 2 más gruesa. La amplitud se mantiene artificialmente y se omite la reflexión con finalidad didáctica; el extremo derecho es absorbente ideal. Advierte que un extremo libre real sí refleja.
## Interfaz y medición
- SVG de dos cuerdas, unión x=9 m, foco, ejes, tramo 0–18 m y punto amarillo P con línea vertical y arrastre horizontal. Deslizador x=0,1–17,9 m, paso 0,1; posición inicial 4 m.
- Iniciar/Pausar/Continuar, Reiniciar, Medir período; ritmo 0,5×, 1×, 2×, 4×.
- Medir período espera el primer máximo de elongación posterior al inicio del ensayo, inicia el cronómetro al alcanzarlo y lo detiene en el siguiente máximo del mismo punto; mide tiempo de simulación, no tiempo de pared.
- Cronómetro en segundos con centésimas, sin minutos; indicadores del primer y segundo máximo. Si se mueve P durante la medición, cancela esa medición y permite empezar otra.
- Registra posición, cuerda, T y f; permite borrar las medidas y muestra conclusión cuando haya medidas en los dos medios.
## Pruebas
- P en ambas cuerdas da T=2,00 s y f=0,50 Hz, incluso a distinto ritmo.
- Longitudes de onda 6 m y 3 m respectivamente.
- No hay medición antes de la llegada del frente ni reflexión artificial.

## Diseño y requisitos comunes
- Interfaz científica limpia, responsive, texto legible en español y etiquetas con unidades SI cuando proceda. Controles con etiquetas accesibles, navegación por teclado, contraste suficiente y gráficas sin solapamientos.
- Incluye botón Info junto al título, en flujo normal, con una ventana modal que contenga las instrucciones de uso; permite cerrar con Escape y devolver el foco al botón.
- Mantén la lógica de simulación independiente de la velocidad de reproducción. No añadas datos o efectos físicos que contradigan el modelo.
- Entrega el código completo listo para publicar en GitHub Pages y comprueba los criterios indicados.
