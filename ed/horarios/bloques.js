'use strict';
// Funciones compartidas por la interfaz y las pruebas.
window.BloquesHorario = (() => {
  const normal = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase().replace(/BACHILLERATO/g, 'BACH').replace(/[.ºª°\s]/g, '');
  function parse(text) {
    const rules = [], errors = [], seen = new Set();
    text.split(/\r?\n/).forEach((line, i) => {
      line = line.split('#')[0].trim();
      if (!line) return;
      const parts = line.split(/[,;]/).map(s => s.trim());
      const [course, slot, label, group = '*'] = parts;
      const key = `${normal(course)}|${slot?.toUpperCase()}|${normal(group)}`;
      if (parts.length < 3 || parts.length > 4 || !/^(3ESO|4ESO|1BACH|2BACH)$/.test(normal(course)) || !/^[LMXJV][1-9]\d*$/i.test(slot || '') || !label || label.length > 30 || !group || seen.has(key)) {
        errors.push(`Línea ${i + 1}: revisa curso, tramo, etiqueta y grupo; no repitas una asignación.`);
      } else {
        seen.add(key); rules.push({course: normal(course), slot: slot.toUpperCase(), label, group: normal(group)});
      }
    });
    return {rules, errors};
  }
  const eligible = g => (g.etapa === 'ESO' && /^[34]/.test(g.curso)) || g.etapa === 'Bachillerato';
  function label(rules, g, slot) {
    const found = rules.filter(r => r.course === normal(g.curso) && r.slot === slot && (r.group === '*' || r.group === normal(g.abreviatura)));
    return (found.find(r => r.group !== '*') || found[0])?.label || '';
  }
  const option = a => JSON.stringify([a.materiaId, a.profesor]);
  const signature = activities => JSON.stringify(activities.map(option).sort());
  return {parse, eligible, label, option, signature};
})();
