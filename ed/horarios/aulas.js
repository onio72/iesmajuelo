'use strict';
// Correcciones de presentación: no modifica los datos ni las elecciones guardadas.
window.AulasHorario = (() => {
  const names = new Map([
    ['AULA ATECA', 'ATECA'],
    ['AULA DE DIBUJO', 'Dibujo'],
    ['DP FRANCES 84', 'Departamento de Francés 84'],
    ['LABORATORIO DE CIENCIAS 64', 'Laboratorio de ciencias 64'],
    ['LABORATORIO DE QUIMICA', 'Laboratorio de química'],
    ['LABORATORIO FISICA', 'Laboratorio de física'],
    ['MADELIA', 'Madelia'],
    ['Sin asignar o sin aula', 'Sin asignar o sin aula']
  ]);
  return {
    name(original) {
      const name = original.trim().replace(/\s+/g, ' ');
      if (names.has(name)) return names.get(name);
      return name
        .replace(/^a\.\s*/i, '')
        .replace(/^aula\s+(?=\d)/i, '')
        .replace(/^AULA TECNOL_GICA\s+/i, 'Tecnológica ')
        .replace(/^AULA INF\.\s+(\d+)\s+\(([^)]+)\)$/i, (_, number, title) => `Informática ${number} (${title[0].toUpperCase()}${title.slice(1).toLowerCase()})`)
        .replace(/^REDUCIDA[-\s]+/i, 'Reducida ');
    }
  };
})();
