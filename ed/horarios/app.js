'use strict';
(() => {
  const data = window.HORARIOS;
  const $ = id => document.getElementById(id);
  if (!data || !data.grupos.length) {
    $('resumen').textContent = 'No se han podido cargar los horarios. Comprueba que datos.js está disponible.';
    return;
  }
  const B = window.BloquesHorario;
  let rules = [], saved = {};
  try { saved = JSON.parse(localStorage.getItem('horarios-elecciones-v1') || '{}') || {}; } catch (_) {}
  if (typeof saved !== 'object' || Array.isArray(saved)) saved = {};
  const persist = () => { try { localStorage.setItem('horarios-elecciones-v1', JSON.stringify(saved)); } catch (_) {} };
  const fields = ['etapa', 'curso', 'grupo', 'variante'];
  const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
  const compare = (a, b) => a.localeCompare(b, 'es', {numeric: true});
  const node = (tag, text, className) => {
    const e = document.createElement(tag);
    if (text !== undefined) e.textContent = text;
    if (className) e.className = className;
    return e;
  };
  $('centro').textContent = 'IES El Majuelo. Gines (Sevilla)';
  $('actualizacion').textContent = `Actualizado: ${data.fecha}`;
  $('dia').value = String(Math.min(5, Math.max(1, new Date().getDay())));
  function selection() {
    return data.grupos.find(g => fields.every(f => g[f] === $(f).value));
  }
  function populate(start, preferred) {
    for (let i = start; i < fields.length; i++) {
      const f = fields[i], select = $(f);
      const candidates = data.grupos.filter(g => fields.slice(0, i).every(k => g[k] === $(k).value));
      const values = [...new Set(candidates.map(g => g[f]))].sort(compare);
      if (f === 'variante') values.sort((a, b) => ['General', 'No bilingüe', 'Bilingüe', 'Diversificación'].indexOf(a) - ['General', 'No bilingüe', 'Bilingüe', 'Diversificación'].indexOf(b));
      const previous = preferred?.[f] ?? select.value;
      select.replaceChildren(...values.map(v => new Option(v, v)));
      if (values.includes(previous)) select.value = previous;
      select.disabled = values.length === 1;
    }
    render();
  }
  const subjectName = name => window.MateriasHorario.name(name);
  function card(a) {
    const c = node('article', undefined, 'class-card');
    const hash = [...a.materiaId].reduce((sum, ch) => (sum * 31 + ch.charCodeAt(0)) >>> 0, 0);
    const hue = Math.round(hash * 137.508) % 360;
    c.style.setProperty('--subject-color', `hsl(${hue} 60% 34%)`);
    c.style.setProperty('--subject-background', `hsl(${hue} 65% 90%)`);
    c.append(node('h3', subjectName(a.materia)), node('p', `Aula: ${window.AulasHorario.name(a.aula)}`, 'room'), node('p', a.profesor, 'teacher'));
    return c;
  }
  function render() {
    const g = selection();
    if (!g) return;
    const title = g.etapa === 'ESO' ? `${g.curso} · Grupo ${g.grupo}` : g.grupo;
    $('titulo').textContent = title;
    $('resumen').textContent = g.variante === 'General' ? `${g.etapa} · ${g.curso}` : g.variante;
    document.title = `${title} · ${g.variante} · Horarios`;
    // Cada registro HORARIO_GRUP contiene su variante completa. No hereda
    // las actividades del grupo ordinario, ni se mezcla con otras variantes.
    const slots = [...new Set(g.actividades.map(a => `${a.inicio}|${a.fin}`))].sort(compare);
    const interactive = B.eligible(g);
    const cells = [];
    slots.forEach((slot, hour) => {
      const [inicio, fin] = slot.split('|');
      days.forEach((_, i) => {
        const activities = g.actividades.filter(a => a.dia === i + 1 && a.inicio === inicio && a.fin === fin);
        const code = `${'LMXJV'[i]}${hour + 1}`;
        cells.push({key: `${i + 1}|${slot}`, code, activities, label: interactive ? B.label(rules, g, code) : ''});
      });
    });
    const choices = saved[g.id] || (saved[g.id] = {});
    const selected = cell => {
      const choice = choices[cell.key];
      return choice?.signature === B.signature(cell.activities) ? cell.activities.find(a => JSON.stringify(a) === choice.activity) : undefined;
    };
    const pending = interactive ? cells.filter(c => c.activities.length > 1 && !selected(c)).length : 0;
    $('personalizar').hidden = !interactive;
    $('ayuda-seleccion').textContent = interactive ? 'Pulsa tu materia en cada tramo con opciones. Tu elección se aplica también a todos los tramos con las mismas materias.' : 'Horario completo del grupo, con su profesor y aula.';
    $('estado-seleccion').textContent = pending ? `Quedan ${pending} tramos por elegir para imprimir tu horario.` : 'Tu horario está listo para imprimir.';
    $('imprimir').disabled = pending > 0;
    $('imprimir').title = pending ? 'Elige una materia en cada tramo simultáneo.' : '';
    function choose(cell, activity) {
      // Los tramos con las mismas materias se vinculan aunque cambie su etiqueta, profesor o aula.
      const identity = B.option(activity);
      const subjects = c => JSON.stringify([...new Set(c.activities.map(a => a.materiaId))].sort());
      cells.filter(c => c.activities.length > 1 && (c.key === cell.key || subjects(c) === subjects(cell) || (cell.label && c.label === cell.label))).forEach(c => {
        const matches = c.activities.filter(a => B.option(a) === identity);
        const sameSubject = c.activities.filter(a => a.materiaId === activity.materiaId);
        const target = c.key === cell.key ? activity : matches.length === 1 ? matches[0] : sameSubject.length === 1 ? sameSubject[0] : null;
        if (target) choices[c.key] = {signature: B.signature(c.activities), activity: JSON.stringify(target)};
        else if (cell.label && c.label === cell.label) delete choices[c.key];
      });
      persist(); render();
      document.querySelector(`[data-slot="${cell.code}"] .change-choice`)?.focus();
    }
    const table = node('table');
    const caption = node('caption', `${title} · ${g.variante}`, 'sr-only');
    const head = node('thead'), hr = node('tr');
    const timeHead = node('th', 'Hora'); timeHead.scope = 'col'; hr.append(timeHead);
    days.forEach((day, i) => {
      const th = node('th', day); th.scope = 'col'; th.dataset.day = i + 1; hr.append(th);
    });
    head.append(hr);
    const body = node('tbody');
    slots.forEach(slot => {
      const [inicio, fin] = slot.split('|');
      const row = node('tr');
      const time = node('th', undefined, 'time'); time.scope = 'row';
      time.append(node('span', inicio), node('span', fin)); row.append(time);
      days.forEach((day, i) => {
        const td = node('td'); td.dataset.day = i + 1;
        const cell = cells.find(c => c.key === `${i + 1}|${slot}`);
        const activities = cell.activities;
        td.dataset.slot = cell.code;
        const slotHeading = node('div', undefined, 'slot-heading');
        if (cell.label) {
          cell.label.split(' · ').forEach(label => {
            const badge = node('strong', label, `block-label ${B.kind(label)}-badge`);
            badge.title = B.kind(label) === 'group' ? 'Grupo de materias' : 'Bloque de materias';
            slotHeading.append(badge);
          });
          td.append(slotHeading);
        }
        if (interactive && activities.length > 1) {
          const chosen = selected(cell);
          if (chosen) {
            td.append(card(chosen));
            const change = node('button', 'Cambiar materia', 'change-choice'); change.type = 'button';
            change.addEventListener('click', () => { delete choices[cell.key]; persist(); render(); document.querySelector(`[data-slot="${cell.code}"] .choose-subject`)?.focus(); });
            td.append(change);
          } else {
            td.classList.add('pending-choice');
            slotHeading.append(node('p', `Elige tu materia · ${activities.length} opciones`, 'options-count'));
            if (!cell.label) td.append(slotHeading);
            activities.forEach(a => {
              const button = node('button', undefined, 'choose-subject'); button.type = 'button';
              button.setAttribute('aria-label', `Elegir ${subjectName(a.materia)}, ${a.profesor}, aula ${window.AulasHorario.name(a.aula)}, ${day} ${inicio}`);
              button.append(card(a)); button.addEventListener('click', () => choose(cell, a)); td.append(button);
            });
            td.append(node('p', 'Materia pendiente de elegir', 'print-pending'));
          }
        } else activities.forEach(a => td.append(card(a)));
        if (!activities.length) td.append(node('span', 'Sin clase', 'empty'));
        row.append(td);
      });
      body.append(row);
    });
    table.append(caption, head, body);
    $('horario').replaceChildren(slots.length ? table : node('p', 'Este grupo no tiene clases registradas.'));
    updateDay();
    // El fragmento permite volver a abrir o compartir una variante concreta,
    // también al abrir index.html directamente desde el disco.
    if (location.hash !== `#grupo=${g.id}`) location.hash = `grupo=${g.id}`;
  }
  function updateDay() {
    document.querySelectorAll('[data-day]').forEach(e => e.classList.toggle('other-day', e.dataset.day !== $('dia').value));
  }
  function fromHash() {
    const id = new URLSearchParams(location.hash.slice(1)).get('grupo');
    return data.grupos.find(g => g.id === id);
  }
  fields.forEach((f, i) => $(f).addEventListener('change', () => populate(i + 1)));
  $('dia').addEventListener('change', updateDay);
  $('imprimir').addEventListener('click', () => { if (!$('imprimir').disabled) window.print(); });
  $('restablecer').addEventListener('click', () => { delete saved[selection().id]; persist(); render(); });
  // La configuración del centro se mantiene en el repositorio; no se edita desde la web.
  if (location.protocol !== 'file:') {
    fetch('bloques.txt', {cache: 'no-store'})
      .then(response => { if (!response.ok) throw new Error('No se pudo leer bloques.txt'); return response.text(); })
      .then(text => {
        const parsed = B.parse(text);
        if (parsed.errors.length) throw new Error(parsed.errors.join(' '));
        rules = parsed.rules;
        render();
      })
      .catch(error => console.warn('Configuración de bloques:', error.message));
  }
  window.addEventListener('hashchange', () => {
    const g = fromHash();
    if (g && g.id !== selection()?.id) populate(0, g);
  });
  populate(0, fromHash() || data.grupos.find(g => g.id === '11') || data.grupos[0]);
})();
