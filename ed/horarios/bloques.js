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
      const key = `${normal(course)}|${slot?.toUpperCase()}|${normal(group)}|${label}`;
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
    const specific = found.filter(r => r.group !== '*');
    return [...new Set((specific.length ? specific : found).map(r => r.label))].join(' · ');
  }
  // B2 y B3 de 2.º Bachillerato son ofertas comunes confirmadas por el centro.
  // Se reúnen por sesión, conservando el profesor y aula de cada día.
  function activities(g, groups) {
    if (g.etapa !== 'Bachillerato' || normal(g.curso) !== '2BACH') return g.actividades;
    const peers = groups.filter(other => other.etapa === g.etapa && other.curso === g.curso);
    const key = a => JSON.stringify([a.dia, a.inicio, a.fin]);
    const pool = peers.flatMap(other => other.actividades);
    const blocks = [
      {anchor: '71', subjects: ['61', '64', '72', '62', '71']}, // B2: Física
      {anchor: '73', subjects: ['65', '64', '131', '73', '275']} // B3: Química
    ].map(block => ({subjects: new Set(block.subjects),
      slots: new Set(pool.filter(a => a.materiaId === block.anchor).map(key))}));
    const result = [...g.actividades];
    const identity = a => JSON.stringify([a.dia, a.inicio, a.fin, a.materiaId, a.profesor, a.aula]);
    const seen = new Set(result.map(identity));
    for (const other of peers) for (const a of other.actividades) {
      if (blocks.some(block => block.slots.has(key(a)) && block.subjects.has(a.materiaId)) && !seen.has(identity(a))) {
        result.push(a); seen.add(identity(a));
      }
    }
    return result;
  }
  const kind = label => /^(?:G\s*\d|Grupo\b)/i.test(label.trim()) ? 'group' : 'block';
  const option = a => JSON.stringify([a.materiaId, a.profesor]);
  const signature = activities => JSON.stringify(activities.map(option).sort());
  return {parse, eligible, label, kind, option, signature, activities};
})();
