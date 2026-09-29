# Vector unitario en la dirección AB

Actividad SCORM 1.2 de Física de 2.º de Bachillerato para practicar coordenadas de dos puntos, vector AB, módulo y vector unitario.

## Archivos del paquete

El ZIP debe contener en su raíz:

- `imsmanifest.xml`
- `index.html`
- `payload_00.js`
- `payload_01.js`

No comprimas la carpeta `vectorunit`; comprime directamente estos archivos.

### macOS

```bash
zip -X vectorunit_scorm.zip imsmanifest.xml index.html payload_00.js payload_01.js
```

## Uso en Moodle

1. Activa edición en el curso.
2. Añade una actividad **Paquete SCORM**.
3. Sube el ZIP.
4. Configura intentos, calificación y presentación.
5. Guarda y prueba la actividad como alumno.

## Seguimiento SCORM

El recurso está declarado como `sco` y la aplicación está preparada para comunicar puntuación, estado y progreso al LMS. La puntuación sigue el modelo de aciertos del primer intento.

## Estructura técnica

`index.html` une los dos payloads, descomprime el contenido mediante `DecompressionStream` y reconstruye la actividad. Por ello los dos archivos `payload_*.js` son obligatorios.

Si se modifica la aplicación y cambia el número o nombre de payloads, hay que actualizar simultáneamente `index.html`, `imsmanifest.xml` y el contenido del ZIP.

La carga requiere un navegador moderno compatible con `DecompressionStream`.

## GitHub Pages

`https://onio72.github.io/iesmajuelo/bach/fi2/t00/vectorunit/`
