# Instrucciones para mantener el catálogo FI2

Ámbito: `bach/fi2/`. Documento destinado a asistentes de programación que trabajen con este repositorio.

## Principio fundamental

**`recursos.json` es la única fuente de verdad de los enlaces de Física de 2.º de Bachillerato.** El `index.html` solo muestra el catálogo: no insertar manualmente enlaces FI2 ni clasificaciones dentro de él. Mantener la navegación temática y la navegación por función didáctica.

## Al crear o modificar una aplicación FI2

1. Leer este documento y `recursos.json` antes de editar.
2. Revisar el funcionamiento real de la aplicación (HTML, JS, interacciones y preguntas); no clasificar solo por el nombre.
3. Publicar la aplicación en su carpeta existente dentro de `bach/fi2/`. No renombrar carpetas ni URLs publicadas sin autorización.
4. Añadir un solo registro al grupo y sección curricular adecuados de `recursos.json`, respetando el orden de los enlaces existentes. Un recurso se registra una única vez; el índice construye ambas vistas automáticamente.
5. Cada registro debe contener `name`, `url`, `didactica`. `url` será la dirección pública de GitHub Pages.
6. Asignar una sola función principal:
   - `guiado`: aprendizaje guiado, investigación guiada, preguntas que construyen conceptos.
   - `practica`: ejercicios, retos o cuestionarios autocorregibles.
   - `simulacion`: simulaciones para explorar fenómenos y visualizar relaciones.
   - `deduccion`: desarrollos matemáticos y deducciones secuenciadas.
   - `laboratorio`: medidas, experimentación, registro de datos o elaboración de diagramas.
7. Si hay más de una función, escoger la **predominante**. Se puede añadir un campo opcional `funciones_secundarias` como lista de identificadores anteriores, sin duplicar el recurso.
8. Las versiones SCORM son enlaces diferenciados cuando el índice las ofrece, pero SCORM **no** es una categoría didáctica.
9. Verificar JSON válido, campos obligatorios, categorías permitidas, URL única y preservación de los enlaces existentes. Abrir `/iesmajuelo/bach/fi2/` y comprobar las dos vistas, el buscador y los enlaces.
10. Antes de cambios estructurales, crear una rama o commit recuperable. No modificar otros índices ni contenidos ajenos a FI2.
11. Al terminar, informar de los recursos incorporados, la categoría asignada, los cambios realizados y el commit de GitHub.

## Estructura del catálogo

```json
{
  "version": 1,
  "groups": [
    {
      "name": "Nombre del tema",
      "links": [
        {
          "name": "Nombre de la aplicación",
          "url": "https://onio72.github.io/iesmajuelo/bach/fi2/t02/ejemplo/",
          "didactica": "guiado",
          "funciones_secundarias": ["simulacion"]
        }
      ]
    }
  ]
}
```

Los grupos con subdivisiones pueden utilizar `sections: [{"name":"Apartado","links":[...]}]` en lugar de `links`. No utilizar ambas propiedades en un mismo grupo. Mantener el campo `version`.

## Criterio de incorporación de futuras aplicaciones

**Incorporación automática al índice** significa que el navegador reflejará todo registro publicado en `recursos.json`; no significa que GitHub descubra una carpeta nueva y la clasifique por sí mismo. El asistente debe actualizar explícitamente el catálogo en cada publicación. El documento `AGENTS.md` solo ofrece instrucciones a agentes compatibles y no se ejecuta por sí solo.
