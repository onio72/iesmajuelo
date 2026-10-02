# Fuerzas y movimiento

Simulación de repaso de Física de 1.º de Bachillerato integrada en el bloque `FI2/t00`.

## Archivos

Para generar el paquete SCORM deben incluirse en la raíz del ZIP:

- `imsmanifest.xml`
- `index.html`

No comprimas la carpeta `fuerzamov`; comprime directamente esos archivos para que `imsmanifest.xml` quede en la raíz del ZIP.

### macOS

Desde Terminal, situándote dentro de la carpeta de la actividad:

```bash
zip -X fuerzamov_scorm.zip imsmanifest.xml index.html
```

La opción `-X` evita metadatos innecesarios de macOS.

## Uso en Moodle

1. Activa edición en el curso.
2. Añade una actividad o recurso.
3. Elige **Paquete SCORM**.
4. Sube el archivo ZIP.
5. Guarda y prueba la actividad.

## Seguimiento

La aplicación actual es una simulación HTML y **no realiza llamadas a la API SCORM**. Por ello el manifiesto la declara como `asset`.

Moodle puede mostrarla dentro de una actividad SCORM, pero esta versión no envía puntuación, estado de aprobado/completado ni progreso al libro de calificaciones. Si se desea seguimiento, habrá que añadir comunicación SCORM a `index.html` y cambiar `adlcp:scormtype="asset"` por `adlcp:scormtype="sco"`.

## Actualizaciones

Si la actividad sigue constando únicamente de `index.html`, no es necesario modificar el manifiesto al cambiar el código interno. Si se añaden CSS, JavaScript, imágenes u otros archivos externos locales, deberán añadirse también como elementos `<file href="..."/>` en `imsmanifest.xml` y formar parte del ZIP.

## GitHub Pages

La versión web puede abrirse en:

`https://onio72.github.io/iesmajuelo/bach/fi2/t00/fuerzamov/`
