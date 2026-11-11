# Notación científica · FQ 2.º ESO

Práctica interactiva y generador de listas imprimibles, sin dependencias JavaScript externas.

## Modalidades

Cinco modalidades, cada una con cinco aciertos netos requeridos:
1. Decimal → científica: respuesta integrada visualmente como [mantisa] × 10^[exponente].
2. Científica → decimal: campo de texto.
3. Identificar si la notación científica está normalizada.
4. Indicar si una cantidad es mayor o menor que 1: la cantidad se presenta alternativamente en notación científica y decimal. Se equilibran valores mayores y menores que 1 (2/3 o 3/2 en series de cinco), sin mostrar exactamente 1.\n5. Comparar dos cantidades, alternando ordenadamente tres variantes: dos científicas, dos decimales y una comparación mixta. La lista imprimible incluye 2 + 2 + 1 ejemplos respectivamente. Las parejas se generan con valores próximos: normalmente comparten el mismo exponente y difieren aproximadamente entre un 1 % y un 12 %; algunos ejemplos quedan a ambos lados de la frontera entre dos órdenes consecutivos.

En las dos modalidades de conversión, cada serie de cinco preguntas generadas contiene dos exponentes positivos y tres negativos, o viceversa, en orden aleatorio y sin exponentes cero. La lista imprimible respeta el mismo reparto en sus cinco preguntas de cada modalidad.

Cada respuesta correcta suma un acierto neto en su modalidad; un error resta uno (mínimo 0); los bloques completados dejan de sortearse. Cada bloque vale 1 punto, hasta 5,00. La corrección es inmediata y bloquea la doble puntuación.

## Lista de ejercicios para PDF

El botón «Lista de ejercicios (PDF)» abre una hoja de impresión con 25 ejercicios aleatorios (5 por modalidad), espacio para respuestas y campos de identificación. El diálogo del navegador permite seleccionar «Guardar como PDF». No se genera un archivo PDF independiente sin usar el diálogo de impresión del navegador.

## Diseño

Hoja común `herramientas/estilos/v1/cuestiones.css` (v1). Se utiliza para preguntas y comparaciones. CSS específico únicamente para maquetación, progreso y respuesta de notación científica. Sin SCORM.

## Comprobaciones

Sintaxis JavaScript verificada; comprobar visualmente en navegador de escritorio y móvil, además de impresión y opción «Guardar como PDF». No se ha verificado el resultado en una impresora real ni en Moodle.
