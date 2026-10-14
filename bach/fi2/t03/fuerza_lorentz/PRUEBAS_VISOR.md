# Visor 3D compatible

Se conserva el recurso recibido. No se ha rediseñado su interfaz.

El visor usa WebGL cuando está disponible. Si falla la creación del contexto,
renderer-compatible.js proyecta la misma escena, mallas, huesos y vectores
sobre Canvas 2D, conservando los controles de cámara. El modo compatible
reduce las sombras y limita el refresco a 20 imágenes por segundo.

Validación: Chrome de escritorio, con WebGL activado y desactivado mediante
intercepción del contexto. Ambos recursos cargan sin excepciones JavaScript.
Se revisaron capturas de la escena en el modo compatible.
Los ZIP incluyen la misma corrección. No se ha probado Moodle.
