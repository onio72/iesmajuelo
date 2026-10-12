# Calculadora común

`v1/calculadora.js` es el origen único del motor y la interfaz, versión 1.0.0.
No usa eval/Function ni dependencias remotas. La interfaz se aísla con Shadow DOM.
Admite +, −, ×, ÷, paréntesis, raíz, potencias, 1/x, EXP, trigonometría
DEG/RAD, logaritmos, pi, coma decimal y notación científica.

Incluir el script antes de montar:

```js
CalculadoraCientifica.mount({
  triggers: [document.getElementById('abrir-calculadora')],
  getTarget: () => document.getElementById('respuesta'),
  canCopy: () => !ejercicioCorregido
});
```

Sin getTarget se recuerda el último campo de texto/número editable enfocado.
Nunca escribe en campos deshabilitados ni readonly. Cada instancia ofrece open,
close y destroy. El botón flotante permanece accesible al desplazarse por la app.
Escape devuelve el foco; la cabecera se mueve con puntero o flechas del teclado.

Las apps SCORM usan una copia idéntica `calculadora.js` en su propia carpeta,
declarada en imsmanifest.xml y dentro del ZIP. Los cambios de versión se prueban
y publican por aplicación; cambiar el origen no actualiza automáticamente un SCO.

Pruebas:

```sh
node --test herramientas/tests/calculadora.test.cjs
node herramientas/tests/calculadora.browser.cjs
```

La prueba de navegador requiere Playwright y Chrome; PLAYWRIGHT_MODULE y
CHROME_PATH permiten indicar sus ubicaciones. No comprueba compatibilidad Moodle.
