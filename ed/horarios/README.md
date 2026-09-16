# Horarios de grupo

Web estática sin dependencias. Abre `index.html` directamente en el navegador o sirve esta carpeta desde cualquier alojamiento web. Los datos están incluidos en `datos.js`; no necesita servidor de aplicaciones ni conexión a servicios externos.

## Uso

Selecciona enseñanza, curso/ciclo, grupo y modalidad. En pantallas pequeñas se muestra un día seleccionable; en ordenador, la semana. El botón Imprimir / PDF prepara la semana completa en A4 horizontal; en los cursos con selección personal hay que resolver primero los tramos simultáneos. La dirección conserva el identificador del horario, por ejemplo `index.html#grupo=74`.

## Datos y variantes

Exportación inicial: `HORARIO PROVISIONAL.xml`, 16/09/2026 18:54. La cabecera muestra «IES El Majuelo. Gines (Sevilla)», según la identificación indicada por el centro, independientemente del nombre incluido en la exportación.

Se incluyen 70 registros de alumnado y se excluyen los dos registros de guardias. Se utiliza `HORARIOS_GRUPOS` como fuente de cada horario completo. No se suman los horarios de profesores, aulas y materias, que son otras vistas de la misma información.

En 4.º C:

| Modalidad | Identificador HORW | Abreviatura |
| --- | --- | --- |
| No bilingüe | 11 | 4C |
| Bilingüe | 74 | 4CBi |
| Diversificación | 67 | 4CDiv |

El nombre del registro 74 está incompleto (`4º Bilingüe`); su abreviatura permite asociarlo a C. Las variantes se muestran de forma independiente: ya contienen las clases compartidas y específicas. No se heredan las materias ordinarias en diversificación. En ESO la agrupación se obtiene de las abreviaturas; si una futura exportación utiliza otro esquema, el importador detiene la conversión para revisar esa clasificación.

Se conserva una entrada por tramo, materia, profesor y aula. `num_un` no basta para identificar una clase: distintas opciones pueden compartirlo. No se muestran listas de subgrupos. Las materias con distinto profesor o aula permanecen separadas, aunque tengan el mismo nombre. Se conserva el texto original de materias, profesores y aulas.

Las opciones simultáneas son las que contiene el horario de grupo; no se conoce la matrícula individual de cada alumno. Los huecos y horarios parciales se respetan, sin completar clases inventadas. En FP se conservan los nombres y abreviaturas para distinguir registros con nombres idénticos; se puede refinar esta nomenclatura con información del centro.

## Actualizar

Con Python 3, desde esta carpeta:

```sh
python3 importar.py '/ruta/a/nueva-exportacion.xml'
```

El importador respeta la codificación declarada en el XML y escribe `datos.js` en UTF-8. Solo se distribuyen los datos usados por los horarios de alumnado; no es necesario copiar el XML a la web. Tras actualizar, recarga el navegador.

## Validación

Para verificar la exportación inicial (las cantidades y referencias de esta prueba son específicas de este archivo):

```sh
python3 test_importar.py '/ruta/a/HORARIO PROVISIONAL.xml'
node --check app.js
node test_interfaz.cjs
```

La prueba de interfaz usa un DOM mínimo para comprobar los filtros, las 70 selecciones y la navegación por fragmentos. No sustituye una revisión visual en navegador.

## Horario personal y bloques

En 3.º y 4.º ESO y Bachillerato, pulsa una materia en cada tramo simultáneo. Se muestra solo la elegida, con un botón **Cambiar materia**. La elección distingue materia y profesor; el aula puede cambiar entre sesiones. Se propaga a las sesiones del mismo bloque configurado cuando contienen una única opción compatible. También se propaga entre todos los tramos con el mismo conjunto de materias, tengan o no la misma etiqueta. Se conserva el profesor y el aula propios de cada sesión. Cuando una materia tiene varias opciones de profesor, se utiliza la coincidencia de profesor; si sigue habiendo ambigüedad, no se elige automáticamente. Si un bloque no ofrece la elección en otra sesión, esta queda pendiente: no se inventa una equivalencia de matrícula.

Las elecciones se guardan por identificador de horario en este navegador (localStorage); no se envían al centro ni se incluyen en el enlace compartido. **Restablecer elecciones** borra las del horario visible. Un cambio en las opciones de una sesión invalida su elección anterior. Con almacenamiento bloqueado, funcionan durante la visita actual.

El botón de impresión se habilita cuando todos los tramos simultáneos están resueltos. La impresión utiliza A4 horizontal, muestra todos los días y conserva etiquetas, materia, profesor y aula. Si se imprime directamente desde el navegador con elecciones pendientes, esas celdas dicen «Materia pendiente de elegir». FP, 1.º/2.º ESO y educación de adultos mantienen la consulta completa sin selector de materias.

### Editar `bloques.txt`

Archivo UTF-8, una asignación por línea, separada por comas o punto y coma:

```text
# curso, tramo, etiqueta[, abreviatura de grupo]
4ºESO, L1, B2
4ºESO, X2, B2
4ºESO, L1, B3, 4CBi
3ºESO, M2, Grupo 1
1ºBACH, J3, B1
```

Estos son ejemplos de formato, **no asignaciones oficiales**. Las líneas sin # son las asignaciones activas; revisa que correspondan a la distribución oficial antes de publicar. `#` inicia un comentario. Cursos admitidos: `3ºESO`, `4ºESO`, `1ºBACH`, `2ºBACH` (también sus nombres completos). Días: **L, M, X, J, V**. El número es la posición de la franja lectiva en el horario ordenado por hora de inicio; no se cuenta un recreo sin actividades. `L1` significa lunes a primera hora.

La cuarta columna opcional usa la abreviatura de `datos.js` (por ejemplo `4A`, `4CBi`, `4CDiv`), no solo la letra del grupo. Tiene prioridad sobre la regla general del curso. Una misma etiqueta enlaza sesiones dentro de un horario: usa etiquetas distintas para bloques independientes. Se rotulan todos los tramos registrados en el TXT, incluso si tienen una sola actividad o ya se ha seleccionado la materia. No se aplica configuración a FP.

La configuración se edita únicamente en el repositorio, mediante `bloques.txt`. La web pública no ofrece carga, descarga ni edición de archivos ni un listado adicional de bloques. Al servir/publicar la carpeta, las etiquetas se cargan automáticamente. Al abrir mediante `file://`, el selector funciona sin las etiquetas de este archivo.

Publica HTML, CSS, `datos.js`, `bloques.js`, `bloques.txt` y `app.js` juntos. Si el archivo de bloques contiene errores, la selección de materias sigue disponible y la consola del navegador informa del problema.
