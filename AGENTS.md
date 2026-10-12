# Instrucciones para Codex — IES El Majuelo

Este repositorio aloja recursos educativos públicos. El objetivo es desarrollar aplicaciones didácticas autónomas, con especial atención a Física y Química de ESO y Bachillerato.

## Flujo obligatorio
1. Inspeccionar el recurso existente y los archivos cercanos antes de modificar.
2. Preservar las URLs públicas y no cambiar rutas sin autorización.
3. Trabajar en una rama o propuesta de cambios cuando se alteren aplicaciones existentes. No desplegar cambios masivos sin revisión.
4. Separar versiones de práctica y evaluación SCORM. Una nunca debe sustituir silenciosamente a la otra.
5. Comprobar sintaxis, interacciones en navegador de escritorio y móvil, accesibilidad básica y consola sin errores.
6. Probar que el enunciado y las opciones aparecen realmente, no únicamente que el HTML carga.
7. Documentar modificaciones y pruebas realizadas; no afirmar compatibilidad con Moodle sin prueba en el LMS.

## Física y presentación
- Interfaz en español, clara y usable desde teléfono.
- Notación científica normalizada: coeficiente entre 1 y 10, potencias bien formateadas; admitir respuestas como `-2.5e8` y coma decimal cuando corresponda.
- Notación vectorial con flechas y subíndices correctamente renderizados; verificar en navegador, no depender de caracteres que fallen.
- Magnitud, subíndice y unidad deben permanecer en la misma línea cuando sea posible.
- Para vectores `r_AB`, establecer y respetar la convención de sentido A→B; las fuerzas gravitatorias atractivas apuntan hacia la masa que las produce.
- Ejes y cuadrículas legibles. Las etiquetas no deben solaparse con las masas.
- Calculadora auxiliar común: operaciones +, −, ×, ÷, paréntesis, raíz, potencias, 1/x, EXP; ventana flotante desplazable y botón visible.

## Hoja de estilos obligatoria
- Antes de crear una app o rediseñar una existente, leer `herramientas/estilos/GUIA_ESTILOS.md` y elegir **una** hoja de entrada versionada: `cuestiones.css`, `practica.css` o `laboratorio.css`, en `herramientas/estilos/v1/`.
- Documentar la elección y el motivo en el README de la app. Si no existe, crearlo con esa información. Seleccionar según el uso principal; resolver elecciones rutinarias sin pedir aprobación adicional.
- Estética elegante, moderna, minimalista y rigurosa: evitar trofeos, emojis decorativos, rangos, nombres de misión y adornos infantiles. La puntuación académica sí se mantiene cuando corresponda.
- Preservar colores didácticos de magnitudes iniciales/modificadas, masas y vectores, también en fórmulas. No sustituirlos por el color del tema. Acompañarlos de etiquetas y leyendas.
- Usar componentes y variables de la hoja elegida. El CSS específico se limita a gráficos, disposición propia e interacciones; no crear otra paleta o sistema de botones, campos y paneles.
- Las apps existentes se migran solo dentro del alcance solicitado y tras pruebas de escritorio/móvil; estas reglas no autorizan rediseños masivos. Las primeras adopciones de v1 son pilotos pendientes de revisión visual.
- Para SCORM, copiar la hoja elegida **y `base.css` de la misma versión** dentro del paquete, declarar ambas en el manifiesto y comprobar rutas. El modo de evaluación no determina una cuarta hoja.

## Ejercicios de práctica
- Permitir nuevos ejercicios, feedback inmediato y resolución razonada cuando se solicite.
- Mantener preguntas sin pistas que revelen directamente la operación matemática, salvo solicitud didáctica específica.

## Ejercicios SCORM 1.2
Consultar `herramientas/SCORM_CONTRATO.md` antes de generar o editar un paquete.
- Por defecto 10 ejercicios y puntuación máxima de 10, si el usuario no pide otra configuración.
- Feedback breve Bien/Mal; errores visibles en rojo; no revelar solución ni desarrollo en pruebas evaluables.
- Guardar progreso por intento, impedir sumar puntos dos veces por el mismo ejercicio, respetar nuevos intentos autorizados por Moodle.
- Informe PDF al finalizar: enunciado completo, datos y representación gráfica si procede, respuesta seleccionada, Bien/Mal, puntuación individual y total. Sin solución razonada en modo evaluación.
- Empaquetar `imsmanifest.xml` en la raíz del ZIP y comprobar todas las referencias a recursos.

## Índice
Antes de indexar, leer `bach/fi2/index.html`; conservar las entradas existentes, su orden aprobado y sus URLs. Añadir versiones SCORM inmediatamente detrás de la práctica correspondiente. No duplicar enlaces.

## Alcance de cambios
Los nuevos componentes de `herramientas/` son propuestas reutilizables; no se deben incorporar a aplicaciones publicadas sin migración y pruebas específicas.
