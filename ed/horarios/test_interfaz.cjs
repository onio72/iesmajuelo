// Verifica filtros y navegación sin dependencias ni servicios externos.
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
class Element {
  constructor(tag = '', text = '') { this.tagName = tag; this.textContent = text; this.children = []; this.dataset = {}; this.events = {}; this._value = ''; this.style = {setProperty(){}}; this.classList = {toggle(){}, add(){}}; }
  setAttribute(name, value) { this[name] = value; }
  append(...items) { this.children.push(...items); }
  replaceChildren(...items) { this.children = items; this._value = items[0]?.value ?? ''; }
  set value(v) { this._value = v; }
  get value() { return this._value; }
  addEventListener(type, fn) { this.events[type] = fn; }
}
const descendants = e => e.children.flatMap(c => [c, ...descendants(c)]);
const elements = {};
for (const id of ['etapa','curso','grupo','variante','centro','actualizacion','dia','titulo','resumen','horario','imprimir','personalizar','ayuda-seleccion','estado-seleccion','restablecer']) elements[id] = new Element();
const events = {};
const context = {document: {getElementById: id => elements[id], createElement: t => new Element(t), querySelectorAll: () => [], querySelector: () => null},
  Option: function(text, value) { const e = new Element('option',text); e.value = value; return e; },
  location: {hash: '', protocol: 'file:'}, URLSearchParams, Date, window: {addEventListener: (t,fn) => events[t] = fn, print(){}}};
vm.createContext(context);
for (const file of ['datos.js', 'bloques.js', 'app.js']) vm.runInContext(fs.readFileSync(`${__dirname}/${file}`, 'utf8'),context);
assert.equal(elements.grupo.value, 'C');
assert.equal(elements.variante.value, 'No bilingüe');
assert.equal(elements.variante.children.length, 3);
elements.variante.value = 'Bilingüe'; elements.variante.events.change();
assert.equal(context.location.hash, 'grupo=74');
elements.variante.value = 'Diversificación'; elements.variante.events.change();
assert.equal(context.location.hash, 'grupo=67');
for (const g of context.window.HORARIOS.grupos) {
  context.location.hash = `#grupo=${g.id}`; events.hashchange();
  for (const field of ['etapa','curso','grupo','variante']) assert.equal(elements[field].value, g[field]);
  const table = elements.horario.children[0];
  const body = table.children[2];
  const cards = descendants(body).filter(e => e.tagName === 'article');
  assert.equal(cards.length, g.actividades.length, g.id);
}
// Cambiar enseñanza debe recalcular todos los desplegables dependientes.
elements.etapa.value = 'ESO'; elements.etapa.events.change();
assert.ok(elements.curso.children.every(e => e.value.endsWith('ESO')));
console.log('OK: filtros, modalidades, navegación y clases renderizadas de los 70 horarios.');

// Seleccionar deja una sola materia y propaga sesiones con las mismas opciones.
context.location.hash = '#grupo=11'; events.hashchange();
assert.equal(elements.imprimir.disabled, true);
const slots = () => descendants(elements.horario).filter(e => e.dataset.slot);
const findButton = td => td.children.find(e => e.className === 'choose-subject');
// className se asigna directamente por la interfaz.
let cell = slots().find(td => findButton(td));
const slot = cell.dataset.slot;
findButton(cell).events.click();
cell = slots().find(td => td.dataset.slot === slot);
assert.equal(cell.children.filter(e => e.tagName === 'article').length, 1);
assert.ok(cell.children.some(e => e.className === 'change-choice'));
for (let i = 0; i < 100; i++) {
 const next = slots().find(td => findButton(td));
 if (!next) break;
 findButton(next).events.click();
}
assert.equal(elements.imprimir.disabled, false);
assert.ok(slots().every(td => td.children.filter(e => e.tagName === 'article').length <= 1));
context.location.hash = '#grupo=74'; events.hashchange();
assert.equal(elements.imprimir.disabled, true, 'No se mezclan modalidades');
context.location.hash = '#grupo=11'; events.hashchange();
assert.equal(elements.imprimir.disabled, false, 'Se conservan elecciones al volver');
elements.restablecer.events.click();
assert.equal(elements.imprimir.disabled, true);
const fp = context.window.HORARIOS.grupos.find(g => g.etapa === 'Formación profesional');
context.location.hash = `#grupo=${fp.id}`; events.hashchange();
assert.equal(elements.personalizar.hidden, true);
assert.equal(elements.imprimir.disabled, false);
assert.equal(descendants(elements.horario).filter(e => e.className === 'choose-subject').length, 0);
const B = context.window.BloquesHorario;
let parsed = B.parse('4ºESO, L1, B2\n4.º ESO; L1; B3; 4CBi\n3ºESO, X2, Grupo 1 # comentario');
assert.equal(parsed.errors.length, 0);
assert.equal(B.label(parsed.rules, context.window.HORARIOS.grupos.find(g => g.id === '11'), 'L1'), 'B2');
assert.equal(B.label(parsed.rules, context.window.HORARIOS.grupos.find(g => g.id === '74'), 'L1'), 'B3');
assert.equal(B.parse('4ºESO, Q1, B1').errors.length, 1);
assert.equal(B.parse('4ºESO, L1, B1\n4ºESO, L1, B2').errors.length, 1);
assert.equal(B.parse('# solo comentarios').rules.length, 0);
console.log('OK: elecciones, propagación, aislamiento, restablecer, FP y archivo de bloques.');
(() => {
 // Dos materias repetidas: cambia el orden, el profesor y el aula.
 const example = {...context.window.HORARIOS.grupos.find(g => g.id === '11'), id: 'test-pares', grupo: 'Prueba', abreviatura: '4Prueba', actividades: []};
 for (const day of [1, 2, 3]) {
   for (const id of (day === 2 ? ['B', 'A'] : ['A', 'B'])) example.actividades.push({dia: day, inicio: '08:00', fin: '09:00', materiaId: id, materia: `Materia ${id}`, profesor: `Profesor ${id} ${day}`, aula: `Aula ${day}`});
 }
 context.window.HORARIOS.grupos.push(example);
 context.location.hash = '#grupo=test-pares'; events.hashchange();
 findButton(slots().find(c => c.dataset.slot === 'L1')).events.click();
 for (const code of ['L1', 'M1', 'X1']) {
   const articles = slots().find(c => c.dataset.slot === code).children.filter(e => e.tagName === 'article');
   assert.equal(articles.length, 1);
   assert.equal(articles[0].children[0].textContent, 'Materia A');
 }
 assert.equal(elements.imprimir.disabled, false);
 const monday = slots().find(c => c.dataset.slot === 'L1');
 monday.children.find(e => e.className === 'change-choice').events.click();
 slots().find(c => c.dataset.slot === 'L1').children.filter(e => e.className === 'choose-subject')[1].events.click();
 for (const code of ['L1', 'M1', 'X1']) assert.equal(slots().find(c => c.dataset.slot === code).children.find(e => e.tagName === 'article').children[0].textContent, 'Materia B');
 console.log('OK: propagación de parejas y cambio de elección.');
})();

const html = fs.readFileSync(`${__dirname}/index.html`, 'utf8');
assert.ok(!/archivo-bloques|lista-bloques|estado-config|type="file"/.test(html));
console.log('OK: la interfaz pública no incluye carga de TXT ni los apartados eliminados.');
