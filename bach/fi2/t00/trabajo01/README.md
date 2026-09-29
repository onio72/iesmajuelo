# Trabajo mecánico con vectores

Actividad SCORM 1.2 de Física de 2.º de Bachillerato. Versión actual: **v14**.

La actividad genera datos aleatorios, puntúa los aciertos del primer intento, conserva el progreso mediante SCORM y permite avanzar a un nuevo ejercicio tras completar correctamente el actual. La notación vectorial se renderiza de forma local, sin depender de KaTeX ni de otras CDN.

## Archivos de la versión publicada en GitHub

La versión de GitHub Pages usa un cargador comprimido. Para empaquetarla directamente desde esta carpeta, el ZIP debe contener en su raíz:

- `imsmanifest.xml`
- `index.html`
- `payload_00.js`
- `payload_01.js`

No comprimas la carpeta `trabajo01`; comprime directamente esos cuatro archivos.

### macOS

```bash
zip -X trabajo01_scorm.zip imsmanifest.xml index.html payload_00.js payload_01.js
```

## Uso en Moodle

1. Activa edición en el curso.
2. Añade una actividad **Paquete SCORM**.
3. Sube el ZIP.
4. Configura intentos, calificación y presentación según el uso didáctico previsto.
5. Haz una prueba completa como alumno: ejercicio 1 → corrección → 5/5 → **Otro ejercicio** → ejercicio 2.

## Seguimiento SCORM

El recurso se declara como `sco` y comunica con SCORM 1.2. Registra puntuación, estado y progreso y puede reanudar el trabajo mediante `cmi.suspend_data`.

## Importante al actualizar

`index.html` reconstruye la aplicación a partir de `payload_00.js` y `payload_01.js`. Si se regenera la aplicación y cambia el número o nombre de payloads, hay que actualizar simultáneamente:

- las etiquetas `<script src="...">` de `index.html`;
- los elementos `<file href="..."/>` de `imsmanifest.xml`;
- los archivos incluidos en el ZIP.

Si falta uno de los payloads, la actividad no podrá cargarse.

## GitHub Pages

`https://onio72.github.io/iesmajuelo/bach/fi2/t00/trabajo01/`
