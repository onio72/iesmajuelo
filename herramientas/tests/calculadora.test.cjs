const assert = require('node:assert/strict');
const {test} = require('node:test');
require('../calculadora/v1/calculadora.js');
const {evaluate:e,format} = globalThis.CalculadoraCientifica;
test('operaciones, signos, precedencia y exponentes científicos', () => {
  for (const [expression, expected] of [['2+3*4',14],['(2+3)*4',20],['-2^2',-4],['(-2)^2',4],['2^3^2',512],['2^-3',.125],['-2,5e8',-2.5e8],['2,5e−8',2.5e-8],['1/1e-20',1e20],['sqrt(9)',3],['inv(4)',.25],['7÷2',3.5],['0',0]]) assert.equal(e(expression),expected,expression);
});
test('funciones científicas y modos angulares', () => {
  assert.ok(Math.abs(e('sin(30)')-.5)<1e-12);
  assert.ok(Math.abs(e('sin(pi/2)','RAD')-1)<1e-12);
  assert.equal(e('ln(e)'),1); assert.equal(e('log(100)'),2);
});
test('rechaza errores, ejecución de código y resultados no finitos', () => {
  for (const expression of ['', '1/0', 'inv(0)', 'sqrt(-1)', 'log(0)', '1e999', '1e308*10', '2(3)', '2+', 'tan(90)', 'window.alert(1)', 'Math.sqrt(4)', '2;3', '2**3']) assert.throws(()=>e(expression),undefined,expression);
});
test('conserva valores pequeños y formato científico normalizado', () => {
  assert.equal(e('1e-20'),1e-20); assert.equal(format(9.999999999999e20),'1e+21');
  assert.equal(Number(format(-2.5e-8)),-2.5e-8);
});
