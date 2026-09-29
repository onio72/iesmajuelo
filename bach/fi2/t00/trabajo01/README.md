# Trabajo mecánico con vectores

Actividad SCORM 1.2 de Física de 2.º de Bachillerato. La puntuación se basa en los aciertos del primer intento de los distintos apartados y la actividad conserva el progreso mediante SCORM.

## Archivos del paquete

El ZIP debe contener en su raíz:

- `imsmanifest.xml`
- `index.html`
- `payload_00.js`
- `payload_01.js`
- `payload_02.js`
- `payload_03.js`

No comprimas la carpeta `trabajo01`; comprime directamente estos archivos.

### macOS

```bash
zip -X trabajo01_scorm.zip imsmanifest.xml index.html payload_00.js payload_01.js payload_02.js payload_03.js
```

## Uso en Moodle

1. Activa edición en el curso.
2. Añade una actividad **Paquete SCORM**.
3. Sube el ZIP.
4. Configura intentos, calificación y presentación según el uso didáctico previsto.
5. Guarda y realiza una prueba completa como alumno.

## Seguimiento SCORM

El recurso se declara como `sco` y está preparado para comunicar con el LMS. La actividad puede registrar puntuación, estado y progreso, permitiendo reanudar el trabajo según la implementación interna de la actividad.

## Importante al actualizar

`index.html` es un cargador y necesita los cuatro archivos `payload_*.js`. Si se regenera la actividad y cambia el número o nombre de payloads, hay que actualizar simultáneamente:

- las etiquetas `<script src="...">` de `index.html`;
- los elementos `<file href="..."/>` de `imsmanifest.xml`;
- los archivos incluidos en el ZIP.

Si falta uno de los payloads, la actividad no podrá reconstruirse correctamente.

## GitHub Pages

`https://onio72.github.io/iesmajuelo/bach/fi2/t00/trabajo01/`
