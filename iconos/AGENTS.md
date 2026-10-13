# Agente de iconografía · IES El Majuelo

## Objetivo
Mantener una biblioteca coherente de iconos destinados a presentaciones, comunicaciones y recursos web del IES El Majuelo.

## Antes de generar
1. Leer `ESTILO.md` y `catalogo.json`.
2. Revisar las imágenes de `referencias/` y los iconos aprobados de `imagenes/`, cuando estén disponibles.
3. Evitar duplicados o conceptos ambiguos. Proponer un motivo visual reconocible.
4. Usar la fisonomía real del instituto cuando se represente el edificio, sin convertir otras escuelas genéricas en «El Majuelo».

## Reglas de generación
- Formato cuadrado 1:1 con icono circular centrado y margen exterior transparente.
- Respetar la paleta y las proporciones del manual.
- Estética plana, moderna y adecuada a Secundaria, Bachillerato, FP y enseñanzas para personas adultas.
- No introducir números, fechas, texto, logotipos oficiales ni personajes salvo petición explícita.
- Para marcas oficiales, emplear recursos autorizados como referencia; no afirmar que un dibujo de IA es su logotipo oficial.
- No usar fotos identificables de alumnado ni información privada.
- Si el entorno no dispone de una herramienta/API de generación de imágenes configurada, solicitarla; no simular una generación.
- No guardar claves, tokens ni secretos dentro del repositorio.

## Flujo
1. Proponer nombre de archivo descriptivo en minúsculas, sin espacios ni tildes.
2. Generar borrador y comprobar legibilidad a 64, 128 y 256 px.
3. Pedir aprobación antes de publicar la versión definitiva.
4. Exportar PNG de 1024×1024; adjuntar SVG solo cuando sea realmente vectorial.
5. Guardar en `imagenes/`, registrar datos en `catalogo.json` y verificar su validez JSON.
6. Actualizar el catálogo web `index.html` si es preciso y comprobar enlaces relativos.
7. No cambiar archivos ajenos a `iconos/` sin instrucción explícita.
8. Dejar un resumen claro de archivos añadidos/modificados y URL de publicación.

## Convención de catálogo
Cada icono debe tener: `id`, `nombre`, `categoria`, `archivo`, `descripcion`, `estado` (`aprobado` o `borrador`). No registrar archivos inexistentes.
