# Práctica de notación científica · 2.º ESO

Recurso autónomo sin dependencias JavaScript externas. Se publica en `eso/fq2/metodo_cientifico/notacion_cientifica/`.

## Contenido y evaluación

Seis modalidades aleatorias: decimal a científica, científica a decimal, reconocimiento de expresiones normalizadas, comparación científica, comparación decimal y comparación mixta. Cada bloque exige cinco aciertos netos, con +1 por acierto y −1 por error (mínimo 0, máximo 5). Nota final de 0 a 5, calculada como suma de los seis progresos dividida entre 5. Un bloque superado deja de sortearse, y no se puede puntuar dos veces el mismo ejercicio.

Admite punto y coma decimal, entrada decimal directa y validación del coeficiente y exponente. Los datos numéricos se generan con mantisas de 1 a 3 cifras y exponentes entre −7 y 8. No se muestran respuestas antes de corregir.

## Diseño

Hoja común elegida: `herramientas/estilos/v1/cuestiones.css` (v1.0.0), apropiada para preguntas de selección, comparación y respuestas breves. No se han introducido colores de magnitudes, pues no hay estados físicos inicial/modificado. CSS local limitado a disposición del enunciado, progreso y comparadores.

## Comprobaciones

Revisar en navegador a 1280, 390 y 320 px: seis tipos, entrada con coma/punto, aciertos y errores, posibilidad de igual, bloqueo de doble corrección, finalización con 5 y reinicio. No es paquete SCORM ni registra notas en Moodle.
