# Diagramas de fuerzas — paquete SCORM 1.2

Esta carpeta contiene una actividad interactiva de **diagramas de fuerzas** preparada para ejecutarse en web y para empaquetarse como **SCORM 1.2**.

## Archivos necesarios

Para crear el paquete SCORM hay que incluir estos tres archivos en la raíz del ZIP:

```text
imsmanifest.xml
index.html
app.html
```

- `imsmanifest.xml`: manifiesto SCORM 1.2. Moodle lo utiliza para reconocer el paquete y localizar el SCO.
- `index.html`: archivo de entrada del paquete. Aplica la capa visual optimizada para proyección y carga la actividad.
- `app.html`: contiene la aplicación completa y la lógica de interacción y comunicación con SCORM.

> `README.md` no es necesario dentro del ZIP SCORM.

## Importante: estructura del ZIP

Los archivos deben quedar directamente en la raíz del archivo comprimido:

```text
fi2_t0_tarea01_diagramaf.zip
├── imsmanifest.xml
├── index.html
└── app.html
```

No debe quedar una carpeta intermedia del tipo:

```text
fi2_t0_tarea01_diagramaf.zip
└── esquemasfuerzas/
    ├── imsmanifest.xml
    ├── index.html
    └── app.html
```

El `imsmanifest.xml` debe estar en la raíz del ZIP para que Moodle detecte correctamente el paquete.

## Cómo crear el ZIP en macOS

### Opción 1. Finder

1. Descarga o copia en una misma carpeta `imsmanifest.xml`, `index.html` y `app.html`.
2. Selecciona **los tres archivos**, no la carpeta que los contiene.
3. Pulsa con el botón derecho y elige **Comprimir 3 ítems**.
4. Renombra el ZIP si lo deseas, por ejemplo:

```text
fi2_t0_tarea01_diagramaf.zip
```

### Opción 2. Terminal

Desde la carpeta que contiene los tres archivos:

```bash
zip -X fi2_t0_tarea01_diagramaf.zip imsmanifest.xml index.html app.html
```

La opción `-X` evita añadir metadatos extra de macOS. De esta forma también se evita generar contenido innecesario como `__MACOSX`.

## Uso en Moodle

Moodle admite paquetes **SCORM 1.2**, por lo que este manifiesto utiliza esa versión. SCORM 2004 no está completamente soportado de forma nativa en Moodle.

Uso habitual:

1. Activa la edición del curso.
2. Añade una actividad o recurso.
3. Selecciona **Paquete SCORM**.
4. Introduce el nombre de la actividad.
5. Sube el archivo `.zip` en el campo correspondiente al paquete.
6. Configura, si procede, el número de intentos, el método de calificación y la forma de visualización.
7. Guarda y prueba la actividad como alumno.

Documentación oficial de Moodle sobre SCORM:

- https://docs.moodle.org/all/es/SCORM_FAQ
- https://docs.moodle.org/all/es/M%C3%B3dulo_de_SCORM

## Qué información puede registrar Moodle

La aplicación incorpora comunicación con el LMS mediante SCORM. En la versión actual puede enviar y conservar, entre otros datos:

- puntuación mínima, máxima y puntuación obtenida;
- estado de la actividad (`incomplete`, `completed` o `passed`);
- número o posición del intento en el que se encuentra el alumno;
- estado de salida para poder suspender y reanudar una sesión;
- estado serializado de la actividad mediante `suspend_data`.

La escala de puntuación interna de la actividad es de **0 a 10**.

Esto permite utilizarla en Moodle como actividad de práctica adaptativa con seguimiento del progreso y registro de calificación.

## Errores frecuentes

### Moodle indica que no se puede cargar la actividad

Comprueba primero que el ZIP contiene:

```text
imsmanifest.xml
index.html
app.html
```

El `index.html` actual necesita `app.html`. Si falta, la actividad no podrá cargarse.

### Moodle no reconoce el ZIP como SCORM

Comprueba que `imsmanifest.xml` está directamente en la raíz del ZIP y no dentro de una carpeta.

### La actividad funciona en GitHub Pages pero no en Moodle

Verifica que has incluido todos los archivos necesarios en el ZIP. GitHub Pages puede servir archivos que estén en la misma carpeta del repositorio, pero Moodle solo dispone de los archivos que se hayan incluido en el paquete SCORM.

### Aparece una carpeta `__MACOSX`

No suele ser el origen del fallo, pero es preferible crear el ZIP con el comando `zip -X` mostrado anteriormente para evitar metadatos de macOS.

## Cuándo hay que modificar el manifiesto

No es necesario modificar `imsmanifest.xml` cuando solo se cambia el contenido interno de `index.html` o `app.html` y se mantienen esos nombres.

Sí debe revisarse el manifiesto si:

- cambia el nombre del archivo de entrada;
- se elimina `app.html` porque la aplicación pasa a ser autocontenida;
- se añaden archivos imprescindibles para ejecutar el SCO;
- se cambia la versión o estructura SCORM.

## Flujo recomendado para actualizar la actividad

1. Actualizar la aplicación en GitHub.
2. Descargar las versiones actuales de `index.html`, `app.html` e `imsmanifest.xml`.
3. Crear un ZIP nuevo con esos tres archivos en la raíz.
4. Sustituir el paquete SCORM en Moodle.
5. Probar el paquete con un usuario alumno y comprobar que Moodle registra el intento y la puntuación.
