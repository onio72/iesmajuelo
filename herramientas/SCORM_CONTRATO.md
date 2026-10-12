# Contrato de evaluación SCORM 1.2 (Moodle Centros)

## Datos SCORM
- Usar el API SCORM 1.2: `LMSInitialize("")`, `LMSGetValue`, `LMSSetValue`, `LMSCommit("")`, `LMSFinish("")`.
- La nota visible se define en la misma escala que se envía: **0–10**.
- Guardar `cmi.core.score.min = 0`, `cmi.core.score.max = 10`, `cmi.core.score.raw = puntuaciónVisible` (sin multiplicar por 10).
- Los datos del ejercicio y el historial se almacenan en `cmi.suspend_data`, respetando el límite SCORM 1.2 de 4096 caracteres: compactar datos y comprobar tamaño; ante desbordamiento, fallar de forma visible, no perder silenciosamente el progreso.
- Usar `cmi.core.lesson_status` y `cmi.core.exit` coherentemente. Evitar finalizar un intento incompleto.
- Revisar resultados y códigos de error de las llamadas a API; no suponer que guardar ha tenido éxito solo porque se llamó a `LMSCommit`.
- Identificar y diferenciar: primer inicio, reanudación incompleta, revisión de intento completado y nuevo intento autorizado por el LMS.
- La caché `localStorage`, si existe, no debe recuperar una prueba completada de otro intento Moodle; el estado del LMS tiene prioridad, y un intento nuevo no debe heredar el anterior.
- Una corrección se registra exactamente una vez y la prueba finalizada no se puede reiniciar desde la propia app.

## Experiencia de evaluación
- Normalmente diez ejercicios, un punto cada uno; el desglose puede variar según el ejercicio.
- Tras corregir: solo «Bien»/«Mal» por apartado, sin solución correcta ni explicación; errores rojos.
- PDF final con enunciados íntegros, parámetros, figuras si las hay, respuestas del alumno, estados y puntos, además de nota total. No incluir soluciones razonadas.
- Mantener el PDF reproducible tras reanudar una prueba finalizada.

## Empaquetado
- ZIP con `imsmanifest.xml` en la raíz, organización y recurso SCO correctos; todos los assets declarados.
- No depender de bibliotecas remotas imprescindibles para que aparezca la pregunta. Preferir JS/CSS locales y verificar que cargan dentro del ZIP.
- Asegurar que la pantalla de ejercicio se inicializa en el reproductor SCORM y en vista de revisión.
- Para previsualización HTML independiente, comprobar que se cargan scripts externos relativos. Si la vista previa aísla el HTML, facilitar una previsualización autocontenida sin romper el ZIP SCORM.

## Pruebas mínimas antes de entregar
1. Primera carga: título, enunciado y respuestas visibles, sin errores de consola.
2. Corregir una vez y volver a pulsar: no sumar doble puntuación.
3. Reabrir a mitad de la prueba: ejercicio, respuestas y puntuación recuperados.
4. Completar 10 ejercicios: nota sobre 10 y bloqueo coherente.
5. Nota 2/10 → `cmi.core.score.raw = 2`, nunca 20; `score.max = 10`.
6. Revisión de prueba completada y nuevo intento independiente autorizado: no confundir ambos.
7. PDF final: enunciados completos y resultados de todos los ejercicios, sin soluciones.
8. Verificar ZIP y manifiesto; realizar validación final real en Moodle Centros, pues un simulador no sustituye al LMS.
