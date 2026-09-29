# Desplazamiento, trabajo y energía cinética

Actividad SCORM 1.2 de Física de 2.º de Bachillerato. Trabaja desplazamiento, componentes de la fuerza, trabajo como producto escalar, relación angular entre fuerza y desplazamiento y variación de la energía cinética.

## Archivos del paquete

El ZIP debe contener en su raíz:

- `imsmanifest.xml`
- `index.html`
- `payload_00.js`
- `payload_01.js`

No comprimas la carpeta `trabajo02`; comprime directamente estos archivos.

### macOS

```bash
zip -X trabajo02_scorm.zip imsmanifest.xml index.html payload_00.js payload_01.js
```

## Uso en Moodle

1. Activa edición en el curso.
2. Añade una actividad **Paquete SCORM**.
3. Sube el ZIP.
4. Configura intentos, calificación y presentación según el uso didáctico previsto.
5. Guarda y prueba el paquete con un usuario alumno.

## Seguimiento SCORM

El recurso se declara como `sco`. La actividad está preparada para registrar en el LMS la puntuación, el estado y datos de progreso. La calificación se basa en los aciertos del primer intento de los apartados puntuables.

## Estructura técnica

`index.html` reconstruye la aplicación completa a partir de dos payloads gzip (`payload_00.js` y `payload_01.js`). Es imprescindible que ambos estén presentes en el ZIP y declarados en `imsmanifest.xml`.

Si en una futura actualización cambia el número o el nombre de los payloads, deben modificarse a la vez:

- `index.html`;
- `imsmanifest.xml`;
- los archivos incluidos en el ZIP.

## GitHub Pages

`https://onio72.github.io/iesmajuelo/bach/fi2/t00/trabajo02/`
