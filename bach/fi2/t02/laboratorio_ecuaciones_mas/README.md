# Laboratorio de ecuaciones del MAS · Física de 2.º de Bachillerato

App para la unidad Vibraciones y ondas. Cuatro ejercicios independientes: (1) reproducir un MAS desde su ecuación de posición; (2) deducir y ajustar condiciones desde la ecuación de velocidad; (3) observar y escribir las tres ecuaciones de un MAS con fase notable (0, +π/2 o −π/2); (4) repetir con fase no notable. El convenio es `x(t)=A·cos(ωt+φ)`, eje vertical positivo hacia arriba. La velocidad usa `v(t)=−Aω·sen(ωt+φ)` y la aceleración `a(t)=−Aω²·cos(ωt+φ)`.

El muelle incluye una escala vertical cada 0,5 m, equilibrio y cronómetro en segundos; reproducción, pausa, avance y retroceso 0,1 s y reinicio del cronómetro. En los ejercicios observacionales se ocultan los deslizadores y la lectura numérica de posición. Los cinco deslizadores A/T/f/ω/φ son visibles en los ejercicios 1 y 2; T, f y ω se mantienen sincronizados. Se admiten expresiones como `π/2`, `2*pi/3`, `2π/3` y decimales con coma o punto en las respuestas.

**Escala específica solicitada**: 0, 1,5, 3, 5 y 10 puntos según los cuatro ejercicios completos. Una corrección parcial nunca suma puntos; puede repetirse hasta que el conjunto sea correcto, sin contar dos veces el ejercicio. La calificación es verde desde 5. En práctica se puede reiniciar cuando se alcanza 10; en evaluación solo un nuevo intento autorizado en Moodle.

## Estilos

`herramientas/estilos/v1/laboratorio.css` como hoja de entrada obligatoria (importe de `base.css`), por ser un laboratorio de medidas y movimiento. `app.css` se limita a la disposición de gráfica y controles propios. Verde petróleo identifica acciones; rojo representa elongación y azul el cuerpo oscilante. Para SCORM las dos hojas compartidas se copian localmente sin dependencia de la web.

## Publicación e integración Moodle

- Versión pública de práctica: `index.html`.
- SCORM de evaluación independiente: `scorm/index.html`, `scorm/imsmanifest.xml` y el archivo `laboratorio_ecuaciones_mas_SCORM12.zip`. Importar **el ZIP**, sin descomprimir, como actividad «Paquete SCORM» en Moodle Centros.
- SCORM 1.2 usa `cmi.core.score.raw` sobre 10, `cmi.suspend_data` para recuperar desafíos y respuestas, `cmi.core.lesson_status` = `incomplete` hasta completar cuatro, y `passed` al llegar a 10. Al salir se transmite `cmi.core.exit=suspend` si no está finalizado. No necesita recursos remotos.
- El informe al finalizar abre impresión: escoger **Guardar como PDF**. Incluye enunciados, las respuestas introducidas, estado y nota, sin revelar las soluciones observacionales.

## Verificación

Pruebas automatizadas del HTML mediante Chromium/Playwright en anchuras 1280, 390 y 320 px, sin errores JS ni desbordamiento horizontal; comprobados cambio de ejercicio, corrección, 5 verde, 10 bloqueado, controles y casos de fase notable/general. Empaquetado ZIP validado localmente. **Pendiente prueba real en Moodle Centros** de guardado de nota, reanudación e impresión dentro del reproductor.
