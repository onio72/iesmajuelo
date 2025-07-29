/*
 * Aplicación interactiva para estudiar el potencial eléctrico.
 *
 * Esta aplicación carga distintas configuraciones de cargas puntuales y
 * permite al alumno marcar en la cuadrícula aquellos puntos donde crea
 * que el potencial total se anula. También ofrece la opción de indicar
 * que no existe ningún punto con potencial nulo. Para corregir la
 * respuesta se comparan las distancias respecto a las soluciones
 * conocidas de cada configuración.
 */

(() => {
  const canvas = document.getElementById('grid');
  const ctx = canvas.getContext('2d');
  const checkbox = document.getElementById('noZeroCheckbox');
  const nextBtn = document.getElementById('nextBtn');
  const messageEl = document.getElementById('message');
  const scoreEl = document.getElementById('scoreValue');

  // Elementos de la ventana modal
  const modalOverlay = document.getElementById('modal-overlay');
  const closeModalBtn = document.getElementById('closeModal');

  // Rango del plano cartesiano mostrado en la cuadrícula.
  const gridRange = 10;
  const width = canvas.width;
  const height = canvas.height;

  // Lista de distribuciones de carga. Cada elemento contiene:
  //  - charges: array de objetos { x, y, q }
  //  - zeroType: 'none', 'point' o 'line'
  //  - zeroPoints: array de puntos donde el potencial se anula (solo para zeroType='point')
  //  - line: { orientation: 'vertical'|'horizontal', coordinate: número } para zeroType='line'
  // Original list of charge distributions. We'll later filter this list to enforce that
  // zero potential points (if any) have integer coordinates and that distances between
  // charges are integer multiples of the sum of the absolute values of the charges.
  let distributions = [
    // 1. Una carga positiva
    {
      name: 'Una carga positiva',
      charges: [{ x: 0, y: 0, q: 1 }],
      zeroType: 'none'
    },
    // 2. Una carga negativa
    {
      name: 'Una carga negativa',
      charges: [{ x: 2, y: 1, q: -1 }],
      zeroType: 'none'
    },
    // 3. Dos cargas positivas
    {
      name: 'Dos cargas positivas',
      charges: [
        { x: -3, y: 0, q: 1 },
        { x: 3, y: 0, q: 1 }
      ],
      zeroType: 'none'
    },
    // 4. Dos cargas negativas
    {
      name: 'Dos cargas negativas',
      charges: [
        { x: -2, y: 3, q: -1 },
        { x: 2, y: 3, q: -1 }
      ],
      zeroType: 'none'
    },
    // 5. Dipolo igual horizontal
    {
      name: 'Dipolo igual (horizontal)',
      charges: [
        { x: -4, y: 0, q: 1 },
        { x: 4, y: 0, q: -1 }
      ],
      zeroType: 'line',
      line: { orientation: 'vertical', coordinate: 0 }
    },
    // 6. Dipolo igual vertical
    {
      name: 'Dipolo igual (vertical)',
      charges: [
        { x: 0, y: -4, q: 1 },
        { x: 0, y: 4, q: -1 }
      ],
      zeroType: 'line',
      line: { orientation: 'horizontal', coordinate: 0 }
    },
    // 7. Dipolo desigual +1 y -2 en y=5
    {
      name: '+1 y -2 (horizontal)',
      charges: [
        { x: 3, y: 5, q: 1 },
        { x: 6, y: 5, q: -2 }
      ],
      zeroType: 'point',
      zeroPoints: [{ x: 0, y: 5 }]
    },
    // 8. Dipolo desigual +2 y -1 en y=4
    {
      name: '+2 y -1 (horizontal)',
      charges: [
        { x: 4, y: 4, q: 2 },
        { x: 2, y: 4, q: -1 }
      ],
      zeroType: 'point',
      zeroPoints: [{ x: 0, y: 4 }]
    },
    // 9. Dipolo desigual +3 y -1 en y=6
    {
      name: '+3 y -1 (horizontal)',
      charges: [
        { x: 3, y: 6, q: 3 },
        { x: 1, y: 6, q: -1 }
      ],
      zeroType: 'point',
      zeroPoints: [{ x: 0, y: 6 }]
    },
    // 10. Dipolo desigual +1 y -3 en y=7
    {
      name: '+1 y -3 (horizontal)',
      charges: [
        { x: -2, y: 7, q: 1 },
        { x: -6, y: 7, q: -3 }
      ],
      zeroType: 'point',
      zeroPoints: [{ x: 0, y: 7 }]
    },
    // 11. Dipolo desigual +4 y -2 en y=2
    {
      name: '+4 y -2 (horizontal)',
      charges: [
        { x: 4, y: 2, q: 4 },
        { x: 2, y: 2, q: -2 }
      ],
      zeroType: 'point',
      zeroPoints: [{ x: 0, y: 2 }]
    },
    // 12. Dipolo desigual +2 y -3 en y=8
    {
      name: '+2 y -3 (horizontal)',
      charges: [
        { x: 4, y: 8, q: 2 },
        { x: 6, y: 8, q: -3 }
      ],
      zeroType: 'point',
      zeroPoints: [{ x: 0, y: 8 }]
    },
    // 13. Dipolo desigual +5 y -4 en y=1
    {
      name: '+5 y -4 (horizontal)',
      charges: [
        { x: 5, y: 1, q: 5 },
        { x: 4, y: 1, q: -4 }
      ],
      zeroType: 'point',
      zeroPoints: [{ x: 0, y: 1 }]
    },
    // 14. Dipolo desigual +2 y -5 en y=3
    {
      name: '+2 y -5 (horizontal)',
      charges: [
        { x: 10, y: 3, q: 2 },
        { x: 4, y: 3, q: -5 }
      ],
      zeroType: 'point',
      zeroPoints: [{ x: 0, y: 3 }]
    },
    // 15. Tres cargas positivas (triángulo)
    {
      name: 'Tres positivas (triángulo)',
      charges: [
        { x: 0, y: 3, q: 1 },
        { x: -2, y: -1, q: 1 },
        { x: 2, y: -1, q: 1 }
      ],
      zeroType: 'none'
    },
    // 16. Tres cargas negativas (triángulo)
    {
      name: 'Tres negativas (triángulo)',
      charges: [
        { x: 0, y: 3, q: -1 },
        { x: -2, y: -1, q: -1 },
        { x: 2, y: -1, q: -1 }
      ],
      zeroType: 'none'
    },
    // 17. Triángulo con -2q
    {
      name: 'Triángulo con -2q',
      charges: [
        { x: 0, y: Math.sqrt(3), q: -2 },
        { x: -1, y: -Math.sqrt(3) / 2, q: 1 },
        { x: 1, y: -Math.sqrt(3) / 2, q: 1 }
      ],
      zeroType: 'point',
      zeroPoints: [{ x: 0, y: 0 }]
    },
    // 18. Cuadrado alternado
    {
      name: 'Cuadrado alternado',
      charges: [
        { x: 1, y: 1, q: 1 },
        { x: -1, y: 1, q: -1 },
        { x: -1, y: -1, q: 1 },
        { x: 1, y: -1, q: -1 }
      ],
      zeroType: 'point',
      zeroPoints: [{ x: 0, y: 0 }]
    },
    // 19. Cuadrado de positivas
    {
      name: 'Cuadrado de positivas',
      charges: [
        { x: 2, y: 2, q: 1 },
        { x: -2, y: 2, q: 1 },
        { x: -2, y: -2, q: 1 },
        { x: 2, y: -2, q: 1 }
      ],
      zeroType: 'none'
    },
    // 20. Hexágono alternado
    {
      name: 'Hexágono alternado',
      charges: [
        { x: 2, y: 0, q: 1 },
        { x: 1, y: Math.sqrt(3), q: -1 },
        { x: -1, y: Math.sqrt(3), q: 1 },
        { x: -2, y: 0, q: -1 },
        { x: -1, y: -Math.sqrt(3), q: 1 },
        { x: 1, y: -Math.sqrt(3), q: -1 }
      ],
      zeroType: 'point',
      zeroPoints: [{ x: 0, y: 0 }]
    },
    // 21. Colineal alternado
    {
      name: 'Colineal alternado',
      charges: [
        { x: -3, y: 0, q: 1 },
        { x: -1, y: 0, q: -1 },
        { x: 1, y: 0, q: 1 },
        { x: 3, y: 0, q: -1 }
      ],
      zeroType: 'point',
      zeroPoints: [{ x: 0, y: 0 }]
    },
    // 22. Dipolo igual vertical (otra posición)
    {
      name: 'Dipolo igual vertical 2',
      charges: [
        { x: -5, y: -3, q: 1 },
        { x: -5, y: 3, q: -1 }
      ],
      zeroType: 'line',
      line: { orientation: 'horizontal', coordinate: 0 }
    },
    // 23. Dipolo desigual vertical +1 y -2 en x=5
    {
      name: '+1 y -2 (vertical)',
      charges: [
        { x: 5, y: 3, q: 1 },
        { x: 5, y: 6, q: -2 }
      ],
      zeroType: 'point',
      zeroPoints: [{ x: 5, y: 0 }]
    },
    // 24. Dipolo desigual vertical +2 y -1 en x=1
    {
      name: '+2 y -1 (vertical)',
      charges: [
        { x: 1, y: 4, q: 2 },
        { x: 1, y: 2, q: -1 }
      ],
      zeroType: 'point',
      zeroPoints: [{ x: 1, y: 0 }]
    },
    // 25. Dipolo desigual vertical +3 y -1 en x=2
    {
      name: '+3 y -1 (vertical)',
      charges: [
        { x: 2, y: 6, q: 3 },
        { x: 2, y: 2, q: -1 }
      ],
      zeroType: 'point',
      zeroPoints: [{ x: 2, y: 0 }]
    },
    // 26. Dipolo desigual vertical +1 y -3 en x=7
    {
      name: '+1 y -3 (vertical)',
      charges: [
        // Elegimos y1=-3; y2 = -9 para mantener ambos dentro del rango [-10,10]
        { x: 7, y: -3, q: 1 },
        { x: 7, y: -9, q: -3 }
      ],
      zeroType: 'point',
      zeroPoints: [{ x: 7, y: 0 }]
    },
    // 27. Dipolo desigual vertical +4 y -2 en x=9
    {
      name: '+4 y -2 (vertical)',
      charges: [
        { x: 9, y: 8, q: 4 },
        { x: 9, y: 4, q: -2 }
      ],
      zeroType: 'point',
      zeroPoints: [{ x: 9, y: 0 }]
    },
    // 28. Dipolo desigual vertical +2 y -3 en x=3
    {
      name: '+2 y -3 (vertical)',
      charges: [
        { x: 3, y: 6, q: 2 },
        { x: 3, y: 9, q: -3 }
      ],
      zeroType: 'point',
      zeroPoints: [{ x: 3, y: 0 }]
    },
    // 29. Dipolo desigual vertical +5 y -4 en x=6
    {
      name: '+5 y -4 (vertical)',
      charges: [
        { x: 6, y: 5, q: 5 },
        { x: 6, y: 4, q: -4 }
      ],
      zeroType: 'point',
      zeroPoints: [{ x: 6, y: 0 }]
    },
    // 30. Dipolo desigual vertical +2 y -5 en x=8
    {
      name: '+2 y -5 (vertical)',
      charges: [
        { x: 8, y: 4, q: 2 },
        { x: 8, y: 10, q: -5 }
      ],
      zeroType: 'point',
      zeroPoints: [{ x: 8, y: 0 }]
    }
  ];

  /*
   * Filtro de distribuciones para cumplir las nuevas restricciones:
   *  1. Se descartan las distribuciones con líneas de potencial nulo (zeroType === 'line').
   *  2. Si existe un punto de potencial nulo, sus coordenadas deben ser números enteros.
   *  3. Para cada pareja de cargas, la distancia euclidiana entre ellas debe ser un múltiplo
   *     exacto (dentro de una pequeña tolerancia) de la suma de los valores absolutos de ambas cargas.
   */
  const isValidDistribution = (dist) => {
    // descartar líneas de potencial nulo
    if (dist.zeroType === 'line') return false;
    // comprobar que todos los puntos de potencial nulo tienen coordenadas enteras
    if (dist.zeroType === 'point' && dist.zeroPoints) {
      for (const zp of dist.zeroPoints) {
        if (!Number.isInteger(zp.x) || !Number.isInteger(zp.y)) {
          return false;
        }
      }
    }
    // comprobar pares de cargas
    const charges = dist.charges;
    for (let i = 0; i < charges.length; i++) {
      for (let j = i + 1; j < charges.length; j++) {
        const c1 = charges[i];
        const c2 = charges[j];
        const dx = c1.x - c2.x;
        const dy = c1.y - c2.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        const sumAbs = Math.abs(c1.q) + Math.abs(c2.q);
        if (sumAbs === 0) continue;
        const ratio = d / sumAbs;
        if (Math.abs(ratio - Math.round(ratio)) > 1e-6) {
          return false;
        }
      }
    }
    return true;
  };

  // Filtrar las distribuciones al cargar la página para eliminar las no válidas.
  distributions = distributions.filter(isValidDistribution);

  let currentIndex = 0;
  let score = 0;
  let clickPosition = null;

  // Información de retroalimentación sobre la respuesta. Cuando el usuario responde de
  // manera incorrecta o parcialmente correcta, esta variable almacena el punto correcto
  // y la distancia a la que se ha marcado el punto. Se restablece al cargar una nueva
  // distribución.
  let feedbackInfo = null;

  // Mostrar la introducción al cargar la página
  if (modalOverlay) {
    // Quitar la clase 'hidden' para mostrar la superposición
    modalOverlay.classList.remove('hidden');
    closeModalBtn.addEventListener('click', () => {
      modalOverlay.classList.add('hidden');
      // Reiniciar puntuación y carga de ejercicio inicial cuando se cierra la introducción
      score = 0;
      scoreEl.textContent = score.toFixed(1);
      loadDistribution(0);
    });
  }

  // Convert grid coordinate to canvas pixel coordinate
  function toPixel(x, y) {
    const px = ((x - (-gridRange)) / (2 * gridRange)) * width;
    // invert y-axis: canvas origin at top-left, grid origin at center
    const py = height - ((y - (-gridRange)) / (2 * gridRange)) * height;
    return { x: px, y: py };
  }

  // Convert pixel coordinate to grid coordinate
  function toGrid(px, py) {
    const x = (px / width) * (2 * gridRange) + (-gridRange);
    const y = ((height - py) / height) * (2 * gridRange) + (-gridRange);
    return { x, y };
  }

  // Dibujar la cuadrícula, ejes y cargas
  function draw() {
    ctx.clearRect(0, 0, width, height);
    drawGrid();
    drawCharges(distributions[currentIndex]);
    if (clickPosition) {
      // resaltar punto elegido
      const pt = toPixel(clickPosition.x, clickPosition.y);
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 6, 0, 2 * Math.PI);
      ctx.fillStyle = 'green';
      ctx.fill();
      // Mostrar las coordenadas del punto elegido junto al marcador
      ctx.fillStyle = '#333';
      ctx.font = '12px Arial';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'bottom';
      const label = `(${clickPosition.x.toFixed(2)}, ${clickPosition.y.toFixed(2)})`;
      ctx.fillText(label, pt.x + 8, pt.y - 8);
    }

    // Si hay información de retroalimentación y la respuesta no es completamente correcta,
    // dibujar una cruz roja en la posición correcta e indicar sus coordenadas.
    if (feedbackInfo && feedbackInfo.correctPoint) {
      const cp = toPixel(feedbackInfo.correctPoint.x, feedbackInfo.correctPoint.y);
      const size = 8;
      ctx.strokeStyle = '#e74c3c';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cp.x - size, cp.y - size);
      ctx.lineTo(cp.x + size, cp.y + size);
      ctx.moveTo(cp.x - size, cp.y + size);
      ctx.lineTo(cp.x + size, cp.y - size);
      ctx.stroke();
      // Mostrar las coordenadas del punto correcto junto a la cruz
      ctx.fillStyle = '#e74c3c';
      ctx.font = '12px Arial';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      const cpLabel = `(${feedbackInfo.correctPoint.x}, ${feedbackInfo.correctPoint.y})`;
      ctx.fillText(cpLabel, cp.x + size + 4, cp.y + size + 4);
    }
  }

  function drawGrid() {
    ctx.save();
    ctx.strokeStyle = '#ccc';
    ctx.lineWidth = 1;
    const step = 1; // unidad entre líneas de la cuadrícula
    for (let i = -gridRange; i <= gridRange; i += step) {
      // líneas verticales
      const xPix = ((i - (-gridRange)) / (2 * gridRange)) * width;
      ctx.beginPath();
      ctx.moveTo(xPix, 0);
      ctx.lineTo(xPix, height);
      ctx.stroke();
      // marcas en ejes
      if (i !== 0 && i % 1 === 0) {
        ctx.font = '10px Arial';
        ctx.fillStyle = '#888';
        const text = i.toString();
        const metrics = ctx.measureText(text);
        ctx.fillText(text, xPix - metrics.width / 2, height / 2 + 12);
      }
    }
    for (let j = -gridRange; j <= gridRange; j += step) {
      // líneas horizontales
      const yPix = ((j - (-gridRange)) / (2 * gridRange)) * height;
      ctx.beginPath();
      ctx.moveTo(0, height - yPix);
      ctx.lineTo(width, height - yPix);
      ctx.stroke();
      if (j !== 0 && j % 1 === 0) {
        ctx.font = '10px Arial';
        ctx.fillStyle = '#888';
        const text = j.toString();
        const metrics = ctx.measureText(text);
        ctx.fillText(text, width / 2 + 4, height - yPix + 3);
      }
    }
    // Ejes principales
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 1.5;
    // eje X
    const y0 = ((0 - (-gridRange)) / (2 * gridRange)) * height;
    ctx.beginPath();
    ctx.moveTo(0, height - y0);
    ctx.lineTo(width, height - y0);
    ctx.stroke();
    // eje Y
    const x0 = ((0 - (-gridRange)) / (2 * gridRange)) * width;
    ctx.beginPath();
    ctx.moveTo(x0, 0);
    ctx.lineTo(x0, height);
    ctx.stroke();
    ctx.restore();
  }

  function drawCharges(dist) {
    dist.charges.forEach((chg) => {
      const { x, y, q } = chg;
      const pt = toPixel(x, y);
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 10, 0, 2 * Math.PI);
      ctx.fillStyle = q >= 0 ? '#c0392b' : '#2980b9';
      ctx.fill();
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 1;
      ctx.stroke();
      // Dibujar signo
      ctx.fillStyle = 'white';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(q > 0 ? '+' : '−', pt.x, pt.y + 1);
      // Mostrar valor de la carga encima
      ctx.fillStyle = q >= 0 ? '#c0392b' : '#2980b9';
      ctx.font = '11px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      ctx.fillText(q + ' C', pt.x, pt.y - 12);
    });
  }

  // Calcular el potencial en un punto
  function potentialAt(x, y, dist) {
    let V = 0;
    for (const ch of dist.charges) {
      const dx = x - ch.x;
      const dy = y - ch.y;
      const r = Math.sqrt(dx * dx + dy * dy);
      if (r === 0) {
        return Infinity;
      }
      V += ch.q / r;
    }
    return V;
  }

  // Calcular la puntuación para la respuesta actual
  function evaluateResponse() {
    const dist = distributions[currentIndex];
    let awarded = 0;
    // Reiniciar la información de retroalimentación
    feedbackInfo = null;
    if (dist.zeroType === 'none') {
      if (checkbox.checked && !clickPosition) {
        awarded = 1;
        messageEl.textContent = '¡Correcto! No hay puntos de potencial nulo.';
        messageEl.style.color = 'green';
      } else {
        awarded = 0;
        messageEl.textContent = 'Incorrecto. No existe punto con potencial nulo en esta configuración.';
        messageEl.style.color = 'red';
      }
    } else if (dist.zeroType === 'point') {
      if (checkbox.checked) {
        // incorrecto porque sí existe punto
        awarded = 0;
        messageEl.textContent = 'Incorrecto. Existe al menos un punto donde el potencial se anula.';
        messageEl.style.color = 'red';
      } else if (!clickPosition) {
        awarded = 0;
        messageEl.textContent = 'Seleccione un punto en la cuadrícula.';
        messageEl.style.color = 'red';
        return 0;
      } else {
        // Calcular la distancia al punto de potencial nulo más próximo
        let minDist = Infinity;
        let nearestPoint = null;
        for (const zp of dist.zeroPoints) {
          const dx = clickPosition.x - zp.x;
          const dy = clickPosition.y - zp.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < minDist) {
            minDist = d;
            nearestPoint = { x: zp.x, y: zp.y };
          }
        }
        if (minDist < 0.1) {
          awarded = 1;
          messageEl.textContent = '¡Correcto! Punto muy cercano al punto donde el potencial se anula.';
          messageEl.style.color = 'green';
        } else if (minDist < 0.3) {
          awarded = 0.5;
          // Guardar información de retroalimentación
          feedbackInfo = {
            correctPoint: nearestPoint,
            distance: minDist
          };
          messageEl.textContent = `Casi correcto. Te has desviado ${minDist.toFixed(2)} unidades del punto correcto (${nearestPoint.x}, ${nearestPoint.y}).`;
          messageEl.style.color = 'orange';
        } else {
          awarded = 0;
          // Guardar información de retroalimentación
          feedbackInfo = {
            correctPoint: nearestPoint,
            distance: minDist
          };
          messageEl.textContent = `Incorrecto. Te has desviado ${minDist.toFixed(2)} unidades del punto correcto (${nearestPoint.x}, ${nearestPoint.y}).`;
          messageEl.style.color = 'red';
        }
      }
    } else if (dist.zeroType === 'line') {
      if (checkbox.checked) {
        awarded = 0;
        messageEl.textContent = 'Incorrecto. Existe una línea de puntos donde el potencial se anula.';
        messageEl.style.color = 'red';
      } else if (!clickPosition) {
        awarded = 0;
        messageEl.textContent = 'Seleccione un punto en la cuadrícula.';
        messageEl.style.color = 'red';
        return 0;
      } else {
        // Distancia a la línea y cálculo del punto más cercano de potencial nulo sobre la línea
        let d;
        let nearest;
        if (dist.line.orientation === 'vertical') {
          d = Math.abs(clickPosition.x - dist.line.coordinate);
          nearest = { x: dist.line.coordinate, y: clickPosition.y };
        } else if (dist.line.orientation === 'horizontal') {
          d = Math.abs(clickPosition.y - dist.line.coordinate);
          nearest = { x: clickPosition.x, y: dist.line.coordinate };
        } else {
          d = Infinity;
          nearest = null;
        }
        if (d < 0.1) {
          awarded = 1;
          messageEl.textContent = '¡Correcto! El punto está sobre la línea de potencial nulo.';
          messageEl.style.color = 'green';
        } else if (d < 0.3) {
          awarded = 0.5;
          feedbackInfo = {
            correctPoint: nearest,
            distance: d
          };
          messageEl.textContent = `Casi correcto. Te has desviado ${d.toFixed(2)} unidades de la línea de potencial nulo en la posición (${nearest.x.toFixed(2)}, ${nearest.y.toFixed(2)}).`;
          messageEl.style.color = 'orange';
        } else {
          awarded = 0;
          feedbackInfo = {
            correctPoint: nearest,
            distance: d
          };
          messageEl.textContent = `Incorrecto. Te has desviado ${d.toFixed(2)} unidades de la línea de potencial nulo en la posición (${nearest.x.toFixed(2)}, ${nearest.y.toFixed(2)}).`;
          messageEl.style.color = 'red';
        }
      }
    }
    // Tras actualizar el mensaje y la información de retroalimentación, redibujar la escena
    draw();
    return awarded;
  }

  function loadDistribution(index) {
    currentIndex = index;
    clickPosition = null;
    feedbackInfo = null;
    checkbox.checked = false;
    nextBtn.disabled = true;
    messageEl.textContent = '';
    draw();
  }

  // Control de eventos
  canvas.addEventListener('click', (event) => {
    // Solo permitir clic si no se ha seleccionado la casilla de "no se anula"
    // o si la casilla aún no ha sido utilizada (se puede marcar antes de pulsar comprobar)
    const rect = canvas.getBoundingClientRect();
    const px = event.clientX - rect.left;
    const py = event.clientY - rect.top;
    const gridPos = toGrid(px, py);
    clickPosition = { x: gridPos.x, y: gridPos.y };
    // Eliminar cualquier retroalimentación anterior al elegir un nuevo punto
    feedbackInfo = null;
    nextBtn.disabled = false;
    draw();
  });

  checkbox.addEventListener('change', () => {
    // Si el usuario marca la casilla, eliminamos la selección previa de punto
    if (checkbox.checked) {
      clickPosition = null;
      feedbackInfo = null;
    }
    nextBtn.disabled = false;
    draw();
  });

  nextBtn.addEventListener('click', () => {
    // Evaluar la respuesta y actualizar puntuación
    const points = evaluateResponse();
    score += points;
    scoreEl.textContent = score.toFixed(1);
    // Deshabilitar botón para evitar múltiples clics
    nextBtn.disabled = true;
    checkbox.disabled = true;
    // Si quedan distribuciones, mostrar feedback y esperar un momento antes de avanzar
    if (currentIndex < distributions.length - 1) {
      // Esperar 1.5 segundos antes de cargar la siguiente distribución
      setTimeout(() => {
        loadDistribution(currentIndex + 1);
        checkbox.disabled = false;
      }, 1500);
    } else {
      // Fin del cuestionario: añadir nota al mensaje
      messageEl.textContent += ' Fin del cuestionario.';
    }
  });

  // Inicializar la primera distribución únicamente si la introducción no está visible.
  if (!modalOverlay || modalOverlay.classList.contains('hidden')) {
    loadDistribution(0);
  }
})();