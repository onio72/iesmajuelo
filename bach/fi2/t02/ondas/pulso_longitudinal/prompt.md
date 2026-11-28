# Prompt de reconstrucción — Propagación de un pulso longitudinal

Crea desde cero una aplicación educativa en español para Física de 2.º de Bachillerato, tema Ondas. Entrega un index.html funcional con HTML, CSS y JavaScript integrados, sin servidor ni bibliotecas externas obligatorias. Este prompt ha sido reconstruido a partir de la versión actual, no es una transcripción del original.

## Modelo físico y simulación
Dibuja 25 esferas alineadas que oscilan horizontalmente. En reposo la distancia entre superficies es A (unidades del modelo), con radio base 12 y separación de centros 24+A. Cada esfera i empieza en t=iT/4, realiza una sola oscilación x=x_eq+A sen(2πf(t−iT/4)) durante T y después queda en reposo. En el primer máximo de la esfera anterior se inicia la siguiente; usa este esquema cinemático idealizado, no una simulación dinámica de choques.
## Interfaz y controles
- SVG de referencia 1200 unidades de ancho; escala conjuntamente separación, radio y amplitud para mantener las esferas dentro del lienzo. Marcas de equilibrio y cota de separación inicial.
- Amplitud 8–22 unidades, paso 1, inicial 14; frecuencia 0,3–2 Hz, paso 0,05, inicial 0,8.
- Reproducir, Pausar, Avanzar ¼T y Reiniciar. Resalta esferas activas y contactos con un destello temporal.
- Muestra tiempo, período, retardo T/4, contactos realizados de 24 y explicación contextual del avance.
## Pruebas
- La primera esfera alcanza el máximo cuando arranca la segunda.
- Avanzar ¼T incrementa un contacto hasta completar los 24.
- Al concluir 24T/4+T todas quedan en sus posiciones iniciales.

## Diseño y requisitos comunes
- Interfaz científica limpia, responsive, texto legible en español y etiquetas con unidades SI cuando proceda. Controles con etiquetas accesibles, navegación por teclado, contraste suficiente y gráficas sin solapamientos.
- Incluye botón Info junto al título, en flujo normal, con una ventana modal que contenga las instrucciones de uso; permite cerrar con Escape y devolver el foco al botón.
- Mantén la lógica de simulación independiente de la velocidad de reproducción. No añadas datos o efectos físicos que contradigan el modelo.
- Entrega el código completo listo para publicar en GitHub Pages y comprueba los criterios indicados.
