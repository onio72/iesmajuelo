# Propuesta de calculadora científica y plantilla SCORM 1.2

Revisión del 12 de octubre de 2026 sobre `origin/master` (`9d02293`). Rama:
`propuesta/calculadora-scorm-fi2`. Se han leído `AGENTS.md`,
`herramientas/SCORM_CONTRATO.md`, `herramientas/README.md` y `bach/fi2/index.html`.
Esta entrega es un plan con auditoría estática, no una implementación de los componentes.
No cambia aplicaciones, índices, URLs ni paquetes publicados. El acceso web a Pages
no permitió inspeccionar la página; se revisó el código del repositorio actualizado.

## Evidencia y prioridades

| Recursos revisados | Observación del código | Implicación para el diseño |
| --- | --- | --- |
| t01/fuerza_grav_plano y energia_potencial_grav_plano, y sus SCORM | Calculadoras incrustadas; variantes con `Function` para evaluar expresiones | Motor común con gramática explícita y UI independiente |
| t01/energia_potencial_grav_SCORM/app.js | `score.max=100`, `Math.round(score*10)`; guardado sin comprobación de retornos ni límite de tamaño | Corregir escala y persistencia al migrar; no copiar literalmente su adaptador |
| t01/fuerza_grav_plano_SCORM/index.html | Máximo 100 y conversión de puntos a escala 100 | Mismo bloqueo para futura adopción |
| t01/momento_angular_vectores_SCORM/index.html | Recupera localStorage si falta suspend_data; finaliza al alcanzar 10 puntos; genera más ejercicios mientras score<10 | Separar duración, nota y finalización; evitar heredar otros intentos |
| t03/coulomb02/index.html | Escala 10; admite API_1484_11 pero llama métodos LMS de 1.2; excepciones silenciadas | Descubrir exclusivamente API 1.2 y tratar fallos explícitamente |
| t02/ondas, t04/trazadorayos y potencia_lente, t05/desintegración | Bibliotecas de presentación y simulación remotas | Inventariar dependencias, licencias y copiar las imprescindibles al paquete |
| t01/energia_potencial_grav_SCORM/app.js, downloadPDF | PDF incluye masas, posiciones y respuestas, pero omite el enunciado completo y la constante G | Informe derivado de una instantánea íntegra, verificable tras reanudar |
| Índice FI2 | Parejas práctica/SCORM contiguas en gravitación; no expone todos los recursos presentes en t02–t05 | Mantener orden y enlaces; inventario de archivos no equivale a catálogo publicado |

Son hallazgos estáticos, no fallos reproducidos en navegador o Moodle. Revisar además
los ZIP: pueden contener versiones distintas de los archivos de su directorio.

## Secuencia y archivos propuestos

1. **Fijar pruebas y contratos antes de extraer.** Crear
   `herramientas/tests/calculadora.test.mjs`, `scorm12.test.mjs`,
   `intentos.test.mjs`, `informe.test.mjs`, `paquete_test.py` y pruebas de navegador.
   Añadir `herramientas/scorm/simulador-api.js`: API 1.2 que registre llamadas,
   simule fallos y configure inicio, reanudación y revisión. El simulador no
   autoriza nuevos intentos reales ni sustituye la validación en Moodle.
2. **Calculadora v1 independiente.** Crear
   `herramientas/calculadora/v1/motor.js`, `calculadora.js`, `calculadora.css`
   y `demo.html`. JS/CSS locales sin framework obligatorio. API de montaje y
   desmontaje, evaluación pura y callback de resultado; no acceder a IDs de la app.
   Operaciones +, −, ×, ÷, paréntesis, raíz, potencias, 1/x y EXP;
   aceptar coma decimal y `-2.5e8`. Definir `-2^2=-4`, `(-2)^2=4`,
   `2^3^2=512`; EXP forma un literal científico. Rechazar división por cero,
   raíces negativas, expresiones inválidas y resultados no finitos. No usar eval
   ni Function. Normalizar el redondeo que haga pasar el coeficiente de 9,999… a 10.
   Ventana flotante desplazable con Pointer Events y límites del viewport;
   botón visible, Escape, devolución del foco, nombres accesibles y alternativa
   al arrastre por teclado. Copiar solo a campos editables mediante el callback.
3. **Adaptador y estado SCORM separados.** Crear
   `herramientas/scorm/v1/api.js`, `intento.js`, `estado.js`.
   Buscar `window.API` en padres/opener con límite y manejo de acceso entre orígenes.
   Inicializar una sola vez y comprobar retornos y LMSGetLastError, incluyendo
   GetValue; mostrar errores de guardado y permitir reintento sin duplicar nota.
   Score min=0, max=10 y raw=nota visible: 2/10 envía 2.
   Leer entry, lesson_mode, lesson_status y suspend_data antes de escribir.
   Estado nuevo solo cuando el LMS indique lanzamiento nuevo; `resume` recupera
   el incompleto, y revisión/completado bloquea cambios. Si la combinación es
   ambigua o faltan datos de una reanudación, mostrar incidencia sin sobrescribir.
   Sin fallback de caché local para intentos conectados. Preview aislada y marcada.
   Completar por número de ejercicios corregidos (10), incluso con nota cero;
   estado final completed, o passed/failed si hay umbral configurado y validado.
   Salida incompleta suspend; sesión cerrada con Finish no implica prueba completada.
4. **Plantilla y PDF reproducibles.** Crear
   `herramientas/plantilla-scorm/v1/{index.html,app.js,styles.css,actividad.js,imsmanifest.xml}`
   y `herramientas/informe/v1/informe.js`. Contrato de actividad:
   generar parámetros, renderizar, validar respuesta, corregir por apartado y
   producir instantánea del enunciado/datos/figura. Generador determinista versionado,
   IDs por ejercicio, respuestas originales, correcciones y puntos; derivar la nota
   de registros únicos, sin contador acumulativo independiente.
   Guardar borradores además de correcciones. Serialización compacta versionada:
   comprobar <=4096 caracteres antes de SetValue; con datos no ASCII comprobar
   también bytes UTF-8 de forma conservadora. Si excede, detener avance y avisar.
   Conservar semillas y parámetros mínimos que reconstruyan todos los enunciados,
   sin confiar en algoritmos que puedan cambiar de versión. Probar el peor tamaño.
   Evaluación: Bien/Mal, rojo en errores, sin solución ni desarrollo, sin reinicio.
   PDF con enunciados íntegros, constantes, figuras, respuestas, estados y puntos
   por apartado/ejercicio y total; biblioteca local con fuentes y licencia,
   texto largo paginado. Revisión final permite reproducir el mismo informe.
   Práctica mantiene feedback y resolución solicitada en una entrada separada.
5. **Empaquetado autónomo.** Crear `herramientas/empaquetar_scorm.py` y ampliar
   el comprobador existente: manifiesto raíz, organization/item/resource/SCO
   coherentes, referencias relativas resueltas desde cada HTML/CSS, todos los assets
   declarados, sin archivos ajenos ni dependencia remota imprescindible.
   Copiar versiones concretas de componentes dentro del ZIP: ninguna referencia
   a `../../herramientas` o a la versión más reciente en Pages.
6. **Piloto fuera de producción.** Crear demos en herramientas con un ejercicio
   escalar y otro vectorial A→B; probar fuerza atractiva hacia la masa fuente,
   notación, etiquetas y figuras. Tras pasar pruebas, preparar una migración
   específica de energía potencial en una nueva rama y revisar su diff.
   No aplicar sustituciones masivas. La incorporación a una app y al índice
   requiere revisión del piloto; conservar rutas y práctica, SCORM a continuación,
   sin enlaces duplicados. Cada adopción debe poder revertirse por separado.

## Pruebas y criterio de integración futura

| Nivel | Casos obligatorios |
| --- | --- |
| Motor | Precedencia y signos anteriores, raíz, inverso, EXP negativo, coma, errores, extremos y redondeo científico |
| API simulada | Inicio, corrección doble, borrador y reanudación, diez ejercicios con nota 0/2/10, raw=2/max=10, revisión bloqueada, nuevo intento sin datos heredados |
| Persistencia | 4096 y 4097 caracteres, JSON corrupto/versión desconocida, fallos Initialize/Get/Set/Commit/Finish, reintento de guardado sin doble puntuación |
| Navegador | Escritorio y móvil (390 y 320 px), enunciado y opciones realmente visibles, uso por teclado/táctil, arrastre y resize, vectores/unidades sin roturas, consola sin errores, recursos sin red |
| Informe | Diez enunciados completos, constantes/figuras, respuestas originales, puntos y total, texto largo y caracteres españoles, ausencia de soluciones, reproducción después de revisión |
| ZIP | Descomprimir, validar XML y cada referencia, servir el contenido desde ruta anidada y abrirlo en iframe con API simulada |
| Moodle Centros real | Importar piloto, revisar nota 2/10 en calificador, salir/reanudar, completar, revisión y nuevo intento autorizado; verificar PDF y documentar configuración del reproductor y evidencias |

Proponer integración de los componentes cuando pasen las pruebas locales;
proponer adopción en aplicaciones solo con pruebas específicas y validación real
en Moodle. No afirmar ahora compatibilidad, accesibilidad o funcionamiento móvil.

## Comprobaciones ejecutadas para esta propuesta

- `python3 herramientas/auditar_fi2.py`: 99 archivos HTML/JS inventariados,
  112 scripts comprobados con `node --check`, cero errores de sintaxis.
  Excluye bundles en carpetas assets y no analiza JSX ni handlers HTML.
  Detección textual: 13 archivos con LMSInitialize y 22 con términos de calculadora;
  esos números no son cantidades de aplicaciones independientes.
- `python3 herramientas/comprobar_scorm.py` sobre los ZIP existentes de
  momento angular vectores y momento de fuerza: ambos con cero errores y avisos.
  El comprobador es preliminar: no certifica escala, intentos, PDF ni ejecución.
- No se han ejecutado pruebas en navegador ni Moodle; no hay componentes nuevos
  implementados que puedan integrarse todavía.

La entrega añade únicamente este plan y `herramientas/auditar_fi2.py`.
