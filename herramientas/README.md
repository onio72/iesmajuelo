# Infraestructura compartida para recursos educativos

Esta carpeta se ha creado para desarrollar componentes y pruebas reutilizables sin alterar los recursos publicados.

## Plan de implantación
0. **Estilos comunes:** leer [la guía de estilos](estilos/GUIA_ESTILOS.md) y elegir una de las tres hojas versionadas antes de crear o rediseñar una app. La elección es obligatoria según `AGENTS.md`; las apps existentes se migran gradualmente.
1. **Contrato y pruebas SCORM:** ver `SCORM_CONTRATO.md`. Crear un simulador de API SCORM 1.2 para comprobar el registro de calificación y la reanudación antes de importar a Moodle.
2. **Calculadora científica:** extraer una implementación independiente, accesible y móvil, con 1/x y EXP y pruebas de cálculo.
3. **Notación matemática y vectores:** usar HTML/CSS/SVG o renderizado matemático comprobado en navegador.
4. **Informe PDF:** incluir siempre el enunciado íntegro y la información del intento sin desvelar soluciones en evaluación.
5. **Plantilla de aplicación:** reutilizar componentes versionados y generar ZIP SCORM autónomos.
6. **Indexación:** validar enlaces y orden del índice con una comprobación automatizada.

La adopción en apps existentes será gradual y requerirá pruebas. Nunca modificar aplicaciones existentes en bloque.

## Iniciar una tarea con Codex
Abrir este repositorio en Codex y pedir: «Lee AGENTS.md y herramientas/SCORM_CONTRATO.md. Propón primero un plan y los archivos afectados. Implementa los cambios en una rama, comprueba el funcionamiento en navegador y prepara los cambios para revisión. No modifiques aplicaciones publicadas fuera del alcance solicitado».
