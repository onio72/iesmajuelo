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
for (const id of ['etapa','curso','grupo','variante','centro','actualizacion','dia','titulo','resumen','horario','imprimir','imprimir-bloques','horario-bloques','personalizar','ayuda-seleccion','estado-seleccion','restablecer']) elements[id] = new Element();
const events = {};
const context = {document: {body: new Element(), getElementById: id => elements[id], createElement: t => new Element(t), querySelectorAll: () => [], querySelector: () => null},
  Option: function(text, value) { const e = new Element('option',text); e.value = value; return e; },
  location: {hash: '', protocol: 'file:'}, URLSearchParams, Date, window: {addEventListener: (t,fn) => events[t] = fn, print(){}}};
vm.createContext(context);
for (const file of ['datos.js', 'bloques.js', 'materias.js', 'aulas.js', 'app.js']) vm.runInContext(fs.readFileSync(`${__dirname}/${file}`, 'utf8'),context);
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
  assert.equal(cards.length, g.actividades.length + ({'15': 32, '16': 4, '17': 20}[g.id] || 0), g.id);
}
// Cambiar enseñanza debe recalcular todos los desplegables dependientes.
elements.etapa.value = 'ESO'; elements.etapa.events.change();
assert.ok(elements.curso.children.every(e => e.value.endsWith('ESO')));
console.log(`OK: filtros, modalidades, navegación y clases renderizadas de los ${context.window.HORARIOS.grupos.length} horarios.`);

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
assert.equal(B.parse('4ºESO, L1, B1\n4ºESO, L1, B2').errors.length, 0);
const actualRules = B.parse(fs.readFileSync(`${__dirname}/bloques.txt`, 'utf8'));
assert.equal(actualRules.errors.length, 0, 'El TXT publicado debe ser válido');
const multiple = B.parse('4ºESO, L1, B3\n4ºESO, L1, B1');
assert.equal(B.label(multiple.rules, context.window.HORARIOS.grupos.find(g => g.id === '11'), 'L1'), 'B3 · B1');
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

// B3 ofrece cinco materias en A, B y C, y conserva el aula de cada sesión.
for (const id of ['15', '16', '17']) {
 context.location.hash = `#grupo=${id}`; events.hashchange();
 elements.restablecer.events.click();
 for (const code of ['L2', 'M1', 'J4', 'V3']) {
  const cell = slots().find(c => c.dataset.slot === code);
  const cards = descendants(cell).filter(e => e.tagName === 'article');
  assert.equal(cards.length, 5, `${id} ${code}`);
  const names = cards.map(c => c.children[0].textContent);
  for (const name of ['Química', 'Tecnología', 'Empresa', 'Geografía', 'Griego'])
   assert.ok(names.some(n => n.startsWith(name)), `${id} ${code} ${name}`);
 }
 const monday = slots().find(c => c.dataset.slot === 'L2');
 const greek = monday.children.find(e => e.className === 'choose-subject' && descendants(e).some(c => c.tagName === 'h3' && c.textContent.startsWith('Griego')));
 greek.events.click();
 for (const [code, room] of [['L2','79'], ['M1','79'], ['J4','86'], ['V3','79']]) {
  const cell = slots().find(c => c.dataset.slot === code);
  const cards = descendants(cell).filter(e => e.tagName === 'article');
  assert.equal(cards.length, 1);
  assert.ok(cards[0].children[0].textContent.startsWith('Griego'));
  assert.ok(cards[0].children[1].textContent.includes(room));
 }
}
console.log('OK: cinco materias de B3 en A/B/C; elección de Griego propagada con el aula de cada día.');

// B2 mantiene cinco opciones en las cuatro sesiones y no incorpora B3.
for (const id of ['15', '16', '17']) {
 context.location.hash = `#grupo=${id}`; events.hashchange();
 elements.restablecer.events.click();
 for (const code of ['L3', 'M2', 'X5', 'V5']) {
  const cell = slots().find(c => c.dataset.slot === code);
  const names = descendants(cell).filter(e => e.tagName === 'h3').map(e => e.textContent);
  assert.equal(names.length, 5, `${id} ${code}`);
  for (const name of ['Matemáticas', 'Geografía', 'Biología', 'Historia del arte', 'Física'])
   assert.ok(names.some(n => n.startsWith(name)), `${id} ${code} ${name}`);
 }
}
assert.ok(!/provisional/i.test(html));
console.log('OK: B2 completo en A/B/C; sin aviso de horario provisional.');

// B1: las cuatro materias aparecen en cada grupo y sesión, con sus aulas.
for (const id of ['15', '16', '17']) {
 context.location.hash = `#grupo=${id}`; events.hashchange();
 elements.restablecer.events.click();
 const group = context.window.HORARIOS.grupos.find(g => g.id === id);
 const enriched = B.activities(group, context.window.HORARIOS.grupos);
 const times = [[2, '11:30'], [3, '13:30'], [4, '12:30'], [5, '08:00']];
 for (const [day, start] of times) {
  const options = enriched.filter(a => a.dia === day && a.inicio === start);
  assert.deepEqual(Array.from(options, a => a.materiaId).sort(), ['274', '61', '65', '69']);
  for (const a of options) assert.ok(context.window.HORARIOS.grupos.some(g =>
   g.curso === group.curso && g.actividades.some(original => JSON.stringify(original) === JSON.stringify(a))));
 }
 for (const code of ['M4', 'X6', 'J5', 'V1']) {
  const names = descendants(slots().find(c => c.dataset.slot === code)).filter(e => e.tagName === 'h3').map(e => e.textContent);
  assert.equal(names.length, 4);
  for (const name of ['Matemáticas', 'Matemáticas aplicadas', 'Latín', 'Empresa'])
   assert.ok(names.some(n => n.toLowerCase().startsWith(name.toLowerCase())), `${id} ${code} ${name}`);
 }
 const cell = slots().find(c => c.dataset.slot === 'M4');
 cell.children.find(e => e.className === 'choose-subject' && descendants(e).some(c => c.tagName === 'h3' && c.textContent.startsWith('Latín'))).events.click();
 for (const code of ['M4', 'X6', 'J5', 'V1']) {
  const cards = descendants(slots().find(c => c.dataset.slot === code)).filter(e => e.tagName === 'article');
  assert.equal(cards.length, 1);
  assert.ok(cards[0].children[0].textContent.startsWith('Latín'));
 }
}
console.log('OK: B1 completo en A/B/C y selección de Latín en las cuatro sesiones.');

// Comprueba la carga automática del TXT en la web publicada, sin interfaz de archivos.
(async () => {
 const current = context.window.HORARIOS.grupos.find(g => g.id === 'test-pares');
 current.actividades = current.actividades.filter(a => a.dia !== 2 || a.materiaId === 'A');
 context.location.protocol = 'https:';
 context.location.hash = '#grupo=test-pares';
 context.console = console;
 const requests = [];
 context.fetch = async (url, options) => {
   requests.push({url, options});
   return {ok: true, text: async () => '4ºESO, L1, B2\n4ºESO, M1, B3'};
 };
 vm.runInContext(fs.readFileSync(`${__dirname}/app.js`, 'utf8'), context);
 await new Promise(resolve => setImmediate(resolve));
 assert.equal(requests[0].url, 'bloques.txt');
 const label = code => descendants(slots().find(c => c.dataset.slot === code)).find(e => e.className?.split(' ').includes('block-label'))?.textContent;
 assert.equal(label('L1'), 'B2', 'Etiqueta con varias opciones');
 assert.equal(label('M1'), 'B3', 'Etiqueta con una sola materia');
 assert.equal(label('X1'), undefined, 'No se inventan etiquetas');
 findButton(slots().find(c => c.dataset.slot === 'L1')).events.click();
 assert.equal(label('L1'), 'B2', 'La etiqueta permanece tras elegir');
 context.fetch = async () => ({ok: true, text: async () => fs.readFileSync(`${__dirname}/bloques.txt`, 'utf8')});
 vm.runInContext(fs.readFileSync(`${__dirname}/app.js`, 'utf8'), context);
 await new Promise(resolve => setImmediate(resolve));
 for (const g of secondYear) {
   context.location.hash = `#grupo=${g.id}`; events.hashchange();
   for (const rule of secondRules) {
     const cell = slots().find(c => c.dataset.slot === rule.slot);
     assert.ok(cell, `${g.id}: existe ${rule.slot}`);
     const badge = descendants(cell).find(e => e.className?.split(' ').includes('block-label'));
     assert.equal(badge?.textContent, rule.label);
     assert.ok(badge.className.includes(`${B.kind(rule.label)}-badge`));
   }
 }
 // Diversificación conserva ámbitos, sin B2 en pantalla ni en el PDF.
 for (const id of ['66', '67']) {
   context.location.hash = `#grupo=${id}`; events.hashchange();
   elements.restablecer.events.click();
   const group = context.window.HORARIOS.grupos.find(g => g.id === id);
   assert.equal(B.activities(group, context.window.HORARIOS.grupos), group.actividades);
   for (const [code, row, col] of [['M2',1,2], ['X3',2,3], ['J2',1,4]]) {
     const cell = slots().find(c => c.dataset.slot === code);
     assert.equal(descendants(cell).filter(e => e.className?.split(' ').includes('block-label')).length, 0);
     assert.ok(descendants(cell).some(e => e.tagName === 'h3' && e.textContent.startsWith('Ámbito')));
     const pdfCell = elements['horario-bloques'].children[0].children[1].children[row].children[col];
     assert.equal(pdfCell.textContent, '');
   }
   for (const [code, label] of [['L4', 'B1'], ['L5', 'B3']])
     assert.equal(B.label(actualRules.rules, group, code), label);
 }
 for (const id of ['11', '74']) {
   const group = context.window.HORARIOS.grupos.find(g => g.id === id);
   for (const code of ['M2', 'X3', 'J2']) assert.equal(B.label(actualRules.rules, group, code), 'B2');
 }
 context.location.hash = '#grupo=17'; events.hashchange();
 console.log('OK: diversificación sin B2 en pantalla y PDF; ámbitos, B1/B3 y grupos ordinarios conservados.');
 // El segundo PDF no depende de haber elegido las materias del alumno.
 let printCalls = 0;
 context.window.print = () => { printCalls++; };
 elements.restablecer.events.click();
 assert.equal(elements.imprimir.disabled, true);
 assert.equal(elements['imprimir-bloques'].disabled, false);
 elements['imprimir-bloques'].events.click();
 assert.equal(printCalls, 1);
 assert.equal(context.document.body.dataset.printMode, 'blocks');
 const blockTable = elements['horario-bloques'].children[0];
 assert.equal(blockTable.children[0].children[0].children.length, 6);
 const rows = blockTable.children[1].children;
 assert.equal(rows.length, 6);
 let labels = 0;
 rows.forEach((row, hour) => row.children.slice(1).forEach((cell, day) => {
   const rule = secondRules.find(r => r.slot === `${'LMXJV'[day]}${hour + 1}`);
   assert.equal(cell.textContent, rule?.label || '');
   if (cell.textContent) labels++;
 }));
 assert.equal(labels, 16);
 assert.equal(descendants(blockTable).filter(e => e.tagName === 'article').length, 0);
 events.afterprint();
 assert.equal(context.document.body.dataset.printMode, undefined);
 // El PDF de materias vuelve a usar su modo habitual.
 elements.imprimir.disabled = false;
 elements.imprimir.events.click();
 assert.equal(context.document.body.dataset.printMode, 'subjects');
 events.afterprint();
 const fpGroup = context.window.HORARIOS.grupos.find(g => g.etapa === 'Formación profesional');
 context.location.hash = `#grupo=${fpGroup.id}`; events.hashchange();
 assert.equal(elements['imprimir-bloques'].disabled, true);
 elements['imprimir-bloques'].events.click();
 assert.equal(printCalls, 2);
 console.log('OK: segundo PDF con 16 etiquetas, 14 celdas vacías y semana completa; impresión independiente.');
 console.log('OK: etiquetas del TXT en tramos múltiples, únicos y seleccionados.');
})().catch(error => { console.error(error); process.exitCode = 1; });

assert.equal(B.kind('B1'), 'block');
assert.equal(B.kind('Bloque 2'), 'block');
assert.equal(B.kind('G2'), 'group');
assert.equal(B.kind('Grupo 1'), 'group');
const secondYear = context.window.HORARIOS.grupos.filter(g => g.curso === '2.º Bachillerato');
assert.equal(secondYear.length, 3);
const secondRules = actualRules.rules.filter(r => r.course === '2BACH');
assert.equal(secondRules.length, 16);
for (const g of secondYear) {
 for (const r of secondRules) assert.equal(B.label(actualRules.rules, g, r.slot), r.label);
}
console.log('OK: 16 etiquetas de 2.º Bachillerato en A, B y C; bloques y grupos con estilos distintos.');
