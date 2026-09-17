const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const context = {window: {}};
for (const file of ['datos.js', 'materias.js']) vm.runInNewContext(fs.readFileSync(`${__dirname}/${file}`, 'utf8'), context);
const M = context.window.MateriasHorario;
const originals = [...new Set(context.window.HORARIOS.grupos.flatMap(g => g.actividades.map(a => a.materia)))];
for (const original of originals) {
 assert.ok(M.reviewed(original), `Falta revisar: ${original}`);
 const name = M.name(original);
 assert.ok(!/[+_]|[1-4]º\s*(ESO|BAC)/.test(name), name);
 assert.equal(M.name(name), name, `El nombre corregido debe ser estable: ${name}`);
}
for (const [original, expected] of [
 ['BIOLOG+A Y GEOLOG 1º BAC', 'Biología y geología'],
 ['RELIGI_N 2º BAC', 'Religión'],
 ['LENGUA LIT. CAST. 1º BAC', 'Lengua castellana y literatura'],
 ['EDUCACIÓN PLÁSTICA VISULA Y AUD.', 'Educación plástica, visual y audiovisual'],
 ['FISICA Y QUIMICA 1º BAC', 'Física y química'],
 ['Matemáticas A 4º ESO', 'Matemáticas A'],
 ['Matemáticas B 4º ESO', 'Matemáticas B'],
 ['LATÍN I 1º BACH', 'Latín I'],
 ['LATÍN II', 'Latín II'],
 ['Francés (2º idioma) 4º ESO', 'Francés (segundo idioma)'],
 ['Preparación Nivel B1', 'Preparación del nivel B1'],
 ['PEPA', 'PEPA'], ['REVA', 'REVA'],
 ['Materia nueva', 'Materia nueva']
]) assert.equal(M.name(original), expected);
console.log(`OK: ${originals.length} nombres revisados, tildes y distinciones entre materias.`);
