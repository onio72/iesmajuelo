import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  Settings,
  Info,
  Plus,
  Trash2,
  RefreshCw,
  RotateCcw,
  Activity,
} from 'lucide-react';

export default function App() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  // --- Estado ---
  const [charges, setCharges] = useState([
    { id: 1, x: -1, y: -1, q: 1 }, // Positiva
    { id: 2, x: -1, y: -1, q: -1 }, // Negativa
  ]);

  const [selectedId, setSelectedId] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [probeValues, setProbeValues] = useState(null); // Estado para la sonda
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  // Configuraciones de visualización
  const [numLinesPerCharge, setNumLinesPerCharge] = useState(16);
  const [showFieldLines, setShowFieldLines] = useState(true);
  const [showEquipotential, setShowEquipotential] = useState(false);
  const [potentialStep, setPotentialStep] = useState(200);
  const [showArrows, setShowArrows] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  const [showCharges, setShowCharges] = useState(true);

  // --- Constantes Físicas y de Dibujo ---
  const k = 20000;
  const baseRadius = 12;
  const stepSize = 4;
  const maxSteps = 800;

  const getRadius = useCallback((q) => {
    return baseRadius + (Math.abs(q) - 1) * 2;
  }, []);

  const colors = {
    pos: '#ef4444',
    posStroke: '#991b1b',
    neg: '#3b82f6',
    negStroke: '#1e40af',
    field: '#475569',
    bg: '#f8fafc',
  };

  // --- Física ---

  const getElectricField = useCallback(
    (x, y, chargeList) => {
      let Ex = 0;
      let Ey = 0;

      for (let i = 0; i < chargeList.length; i++) {
        const charge = chargeList[i];
        const dx = x - charge.x;
        const dy = y - charge.y;
        const r2 = dx * dx + dy * dy;
        const r = Math.sqrt(r2);

        if (r < getRadius(charge.q) * 0.6) continue;

        const E = (k * charge.q) / (r * r2);
        Ex += E * dx;
        Ey += E * dy;
      }

      return { Ex, Ey };
    },
    [getRadius]
  );

  const getPotential = useCallback((x, y, chargeList) => {
    let V = 0;
    for (let i = 0; i < chargeList.length; i++) {
      const charge = chargeList[i];
      const dx = x - charge.x;
      const dy = y - charge.y;
      const r = Math.sqrt(dx * dx + dy * dy);

      if (r < 5) {
        V += charge.q > 0 ? 8000 * Math.abs(charge.q) : -8000 * Math.abs(charge.q);
      } else {
        V += (k * charge.q) / r;
      }
    }
    return V;
  }, []);

  // --- Loop Principal de Renderizado ---

  const drawArrowHead = (ctx, x, y, angle, size = 4) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-size * 2, -size);
    ctx.lineTo(-size * 2, size);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  };

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const dpr = window.devicePixelRatio || 1;
    const logicalWidth = canvas.width / dpr;
    const logicalHeight = canvas.height / dpr;

    ctx.clearRect(0, 0, logicalWidth, logicalHeight);

    // Fondo
    ctx.fillStyle = colors.bg;
    ctx.fillRect(0, 0, logicalWidth, logicalHeight);

    if (charges.length === 0) {
      ctx.fillStyle = '#94a3b8';
      ctx.font = '16px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText("Pulsa '+' para añadir una carga eléctrica", logicalWidth / 2, logicalHeight / 2);
      return;
    }

    // 0. Rejilla
    if (showGrid) {
      ctx.strokeStyle = 'rgba(0,0,0,0.05)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x < logicalWidth; x += 40) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, logicalHeight);
      }
      for (let y = 0; y < logicalHeight; y += 40) {
        ctx.moveTo(0, y);
        ctx.lineTo(logicalWidth, y);
      }
      ctx.stroke();
    }

    // 1. Superficies Equipotenciales
    if (showEquipotential) {
      const gridSize = isDragging ? 16 : 8;

      const cols = Math.ceil(logicalWidth / gridSize) + 1;
      const rows = Math.ceil(logicalHeight / gridSize) + 1;

      let currentRow = new Float32Array(cols);
      let nextRow = new Float32Array(cols);

      for (let i = 0; i < cols; i++) currentRow[i] = getPotential(i * gridSize, 0, charges);

      ctx.lineWidth = 1;

      for (let j = 0; j < rows - 1; j++) {
        const y = j * gridSize;
        for (let i = 0; i < cols; i++) {
          nextRow[i] = getPotential(i * gridSize, (j + 1) * gridSize, charges);
        }

        for (let i = 0; i < cols - 1; i++) {
          const x = i * gridSize;

          const tl = currentRow[i];
          const tr = currentRow[i + 1];
          const bl = nextRow[i];
          const br = nextRow[i + 1];

          const minV = Math.min(tl, tr, bl, br);
          const maxV = Math.max(tl, tr, bl, br);

          const startK = Math.ceil(minV / potentialStep);
          const endK = Math.floor(maxV / potentialStep);

          for (let k = startK; k <= endK; k++) {
            const val = k * potentialStep;
            if (val === 0) continue;

            const points = [];
            if ((tl - val) * (tr - val) <= 0 && tl !== tr) {
              points.push({ x: x + ((val - tl) / (tr - tl)) * gridSize, y: y });
            }
            if ((tr - val) * (br - val) <= 0 && tr !== br) {
              points.push({ x: x + gridSize, y: y + ((val - tr) / (br - tr)) * gridSize });
            }
            if ((bl - val) * (br - val) <= 0 && bl !== br) {
              points.push({ x: x + ((val - bl) / (br - bl)) * gridSize, y: y + gridSize });
            }
            if ((tl - val) * (bl - val) <= 0 && tl !== bl) {
              points.push({ x: x, y: y + ((val - tl) / (bl - tl)) * gridSize });
            }

            if (points.length >= 2) {
              ctx.beginPath();
              ctx.moveTo(points[0].x, points[0].y);
              ctx.lineTo(points[1].x, points[1].y);
              ctx.strokeStyle = val > 0 ? 'rgba(220, 38, 38, 0.4)' : 'rgba(37, 99, 235, 0.4)';
              ctx.stroke();

              if (points.length === 4) {
                ctx.beginPath();
                ctx.moveTo(points[2].x, points[2].y);
                ctx.lineTo(points[3].x, points[3].y);
                ctx.stroke();
              }
            }
          }
        }
        currentRow.set(nextRow);
      }
    }

    // 2. Líneas de Campo
    if (showFieldLines) {
      ctx.strokeStyle = colors.field;
      ctx.lineWidth = 1.2;
      ctx.fillStyle = colors.field;

      charges.forEach((startCharge) => {
        const isPositive = startCharge.q > 0;
        const hasPositive = charges.some((c) => c.q > 0);
        if (hasPositive && !isPositive) return;

        const lines = numLinesPerCharge;

        for (let i = 0; i < lines; i++) {
          const angle = (Math.PI * 2 * i) / lines;
          const startRadius = getRadius(startCharge.q);
          let cx = startCharge.x + Math.cos(angle) * (startRadius + 2);
          let cy = startCharge.y + Math.sin(angle) * (startRadius + 2);

          const points = [{ x: cx, y: cy }];
          let currentX = cx;
          let currentY = cy;

          for (let step = 0; step < maxSteps; step++) {
            const { Ex, Ey } = getElectricField(currentX, currentY, charges);
            const E_mag = Math.hypot(Ex, Ey);

            if (E_mag === 0) break;

            let dx = Ex / E_mag;
            let dy = Ey / E_mag;

            if (!isPositive) {
              dx = -dx;
              dy = -dy;
            }

            const nextX = currentX + dx * stepSize;
            const nextY = currentY + dy * stepSize;

            let collision = false;
            for (let target of charges) {
              if (target.id === startCharge.id && step < 10) continue;

              const targetRadius = getRadius(target.q);
              const dist = Math.hypot(nextX - target.x, nextY - target.y);

              if (dist < targetRadius) {
                collision = true;
                points.push({ x: nextX, y: nextY });
                break;
              }
            }
            if (collision) break;

            if (
              nextX < -20 ||
              nextX > logicalWidth + 20 ||
              nextY < -20 ||
              nextY > logicalHeight + 20
            ) {
              break;
            }

            points.push({ x: nextX, y: nextY });
            currentX = nextX;
            currentY = nextY;
          }

          if (points.length > 1) {
            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y);
            for (let j = 1; j < points.length; j++) {
              ctx.lineTo(points[j].x, points[j].y);
            }
            ctx.stroke();

            if (showArrows) {
              const arrowSpacing = 30;
              for (let j = 15; j < points.length - 10; j += arrowSpacing) {
                const p = points[j];
                const p_next = points[j + 1] || p;
                const angle = Math.atan2(p_next.y - p.y, p_next.x - p.x);
                const visualAngle = isPositive ? angle : angle + Math.PI;
                drawArrowHead(ctx, p.x, p.y, visualAngle);
              }
            }
          }
        }
      });
    }

    // 3. Dibujar las Cargas
    if (showCharges) {
      charges.forEach((c) => {
        const isPos = c.q > 0;
        const r = getRadius(c.q);

        ctx.beginPath();
        ctx.arc(c.x + 2, c.y + 2, r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0,0,0,0.15)';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(c.x, c.y, r, 0, Math.PI * 2);
        ctx.fillStyle = isPos ? colors.pos : colors.neg;
        ctx.fill();

        ctx.lineWidth = 2;
        ctx.strokeStyle = selectedId === c.id ? '#000' : isPos ? colors.posStroke : colors.negStroke;
        if (selectedId === c.id) ctx.setLineDash([3, 2]);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = 'white';
        ctx.font = `bold ${12 + Math.abs(c.q) * 1.5}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(isPos ? '+' : '-', c.x, c.y + 1);

        if (selectedId === c.id) {
          ctx.beginPath();
          ctx.arc(c.x, c.y, r + 6, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(99, 102, 241, 0.5)';
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      });
    }

    // 4. Dibujar puntero de la sonda (círculo pequeño donde está el mouse)
    if (probeValues) {
      ctx.beginPath();
      ctx.arc(probeValues.x, probeValues.y, 4, 0, Math.PI * 2);
      ctx.strokeStyle = '#4f46e5';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.fillStyle = 'rgba(79, 70, 229, 0.2)';
      ctx.fill();
    }
  }, [
    charges,
    numLinesPerCharge,
    showArrows,
    showEquipotential,
    potentialStep,
    showGrid,
    showFieldLines,
    showCharges,
    selectedId,
    isDragging,
    probeValues,
    getElectricField,
    getPotential,
    getRadius,
  ]);

  // --- Event Handlers ---

  const getPointerPos = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const handlePointerDown = (e) => {
    if (!showCharges) {
      setSelectedId(null);
      return;
    }
    const { x, y } = getPointerPos(e);
    let clickedId = null;

    for (let i = charges.length - 1; i >= 0; i--) {
      const c = charges[i];
      const hitRadius = getRadius(c.q) * 1.8;
      if (Math.hypot(x - c.x, y - c.y) < hitRadius) {
        clickedId = c.id;
        break;
      }
    }

    if (clickedId) {
      setSelectedId(clickedId);
      setIsDragging(true);
    } else {
      setSelectedId(null);
    }
  };

  const handlePointerMove = (e) => {
    const pos = getPointerPos(e);

    // --- Cálculo de la Sonda ---
    const { Ex, Ey } = getElectricField(pos.x, pos.y, charges);
    const V = getPotential(pos.x, pos.y, charges);
    const E_mag = Math.hypot(Ex, Ey);
    setProbeValues({ x: pos.x, y: pos.y, E: E_mag, V });

    // --- Lógica de Arrastre ---
    if (!showCharges || !isDragging || selectedId === null) return;

    const canvas = canvasRef.current;
    const width = canvas.width / (window.devicePixelRatio || 1);
    const height = canvas.height / (window.devicePixelRatio || 1);

    const activeCharge = charges.find((c) => c.id === selectedId);
    const margin = activeCharge ? getRadius(activeCharge.q) : baseRadius;

    setCharges((prev) =>
      prev.map((c) =>
        c.id === selectedId
          ? {
              ...c,
              x: Math.max(margin, Math.min(width - margin, pos.x)),
              y: Math.max(margin, Math.min(height - margin, pos.y)),
            }
          : c
      )
    );
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const handlePointerLeave = () => {
    setIsDragging(false);
    setProbeValues(null); // Ocultar sonda al salir del canvas
  };

  // --- Helpers de Estado ---

  const addCharge = () => {
    if (charges.length >= 4) return;
    const canvas = canvasRef.current;
    const width = canvas ? canvas.width / (window.devicePixelRatio || 1) : 600;
    const height = canvas ? canvas.height / (window.devicePixelRatio || 1) : 400;

    const newCharge = {
      id: Date.now(),
      x: width / 2 + (Math.random() * 80 - 40),
      y: height / 2 + (Math.random() * 80 - 40),
      q: 1,
    };
    setCharges([...charges, newCharge]);
    setSelectedId(newCharge.id);
  };

  const removeCharge = (id) => {
    setCharges((prev) => prev.filter((c) => c.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  const toggleChargeSign = (id) => {
    setCharges((prev) => prev.map((c) => (c.id === id ? { ...c, q: -c.q } : c)));
  };

  const updateChargeMagnitude = (id, newMag) => {
    setCharges((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, q: c.q < 0 ? -Number(newMag) : Number(newMag) } : c
      )
    );
  };

  const resetSimulation = () => {
    const canvas = canvasRef.current;
    const width = canvas ? canvas.width / (window.devicePixelRatio || 1) : 600;
    const height = canvas ? canvas.height / (window.devicePixelRatio || 1) : 400;

    setCharges([
      { id: 1, x: width / 2 - 50, y: height / 2, q: 1 },
      { id: 2, x: width / 2 + 50, y: height / 2, q: -1 },
    ]);
    setSelectedId(null);
    setPotentialStep(200);
    setShowFieldLines(true);
    setShowCharges(true);
    setProbeValues(null);
  };

  // --- Inicialización y Resize ---
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current && canvasRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        const dpr = window.devicePixelRatio || 1;
        canvasRef.current.width = clientWidth * dpr;
        canvasRef.current.height = clientHeight * dpr;
        const ctx = canvasRef.current.getContext('2d');
        ctx.scale(dpr, dpr);
        canvasRef.current.style.width = `${clientWidth}px`;
        canvasRef.current.style.height = `${clientHeight}px`;
        setCanvasSize({ width: clientWidth, height: clientHeight });
        setCharges((prev) => {
          const needsInit = prev.some((c) => c.x === -1);
          if (needsInit) {
            return [
              { id: 1, x: clientWidth / 2 - 60, y: clientHeight / 2, q: 1 },
              { id: 2, x: clientWidth / 2 + 60, y: clientHeight / 2, q: -1 },
            ];
          }
          return prev.map((c) => ({
            ...c,
            x: Math.min(c.x, clientWidth - 20),
            y: Math.min(c.y, clientHeight - 20),
          }));
        });
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    setTimeout(handleResize, 50);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    requestAnimationFrame(draw);
  }, [draw]);

  return (
    <div className="flex flex-col h-screen bg-gray-50 text-gray-800 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shadow-sm z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-md shadow-indigo-200">
            <RefreshCw size={20} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">
              Laboratorio Eléctrico{' '}
              <span className="text-xs font-normal text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full ml-2">
                v1.5 Sonda
              </span>
            </h1>
            <p className="text-xs text-gray-500 font-medium">Simulación de Campos y Potenciales</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={resetSimulation}
            className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all"
            title="Reiniciar"
          >
            <RotateCcw size={20} />
          </button>
          <button
            onClick={() =>
              alert(
                'Instrucciones:\\n\\n1. Pasa el ratón para ver el valor del campo y potencial en tiempo real (Sonda).\\n2. Arrastra las cargas (+/-).\\n3. Usa los controles laterales para ajustar visualización.'
              )
            }
            className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all"
          >
            <Info size={22} />
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        <div
          ref={containerRef}
          className="flex-1 relative bg-slate-50 cursor-crosshair overflow-hidden touch-none"
        >
          <div
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          ></div>
          <canvas
            ref={canvasRef}
            className="block absolute top-0 left-0 touch-none outline-none"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerLeave}
          />

          {/* Panel de Sonda de Campo (Top Right) */}
          {probeValues && (
            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-4 py-3 rounded-lg shadow-lg border border-indigo-100 min-w-[180px] animate-in fade-in duration-200 pointer-events-none select-none z-30">
              <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-100">
                <Activity size={14} className="text-indigo-600" />
                <span className="text-xs font-bold uppercase text-gray-500 tracking-wider">
                  Sonda de Campo
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-gray-500">Potencial (V)</span>
                  <span
                    className={`text-sm font-mono font-bold ${
                      probeValues.V > 0 ? 'text-red-600' : 'text-blue-600'
                    }`}
                  >
                    {probeValues.V.toFixed(0)} V
                  </span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-gray-500">Campo (|E|)</span>
                  <span className="text-sm font-mono font-bold text-gray-800">
                    {probeValues.E.toFixed(2)} N/C
                  </span>
                </div>
                <div className="flex justify-between items-baseline text-[10px] text-gray-400 font-mono mt-1 pt-1 border-t border-dashed border-gray-100">
                  <span>
                    Pos: ({Math.round(probeValues.x - canvasSize.width / 2)},{' '}
                    {Math.round(canvasSize.height / 2 - probeValues.y)})
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-3 rounded-xl shadow-lg border border-gray-200/50 text-sm text-gray-600 pointer-events-none select-none max-w-xs">
            <p className="font-medium text-gray-800 mb-1">Interacción en tiempo real</p>
            <p className="text-xs leading-relaxed">
              Mueve el cursor para medir el campo. Arrastra las cargas para modificarlo.
            </p>
          </div>
        </div>

        <aside className="w-80 bg-white border-l border-gray-200 flex flex-col shadow-xl z-20 overflow-y-auto">
          <div className="p-5 border-b border-gray-100">
            <h2 className="font-bold text-gray-800 flex items-center gap-2">
              <Settings className="text-indigo-600" size={18} /> Panel de Control
            </h2>
          </div>

          <div className="p-5 space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Cargas Puntuales
                </label>
                <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded text-gray-600">
                  {charges.length} / 4
                </span>
              </div>

              <div className="space-y-3">
                {charges.map((c, idx) => {
                  const isPos = c.q > 0;
                  const isSelected = selectedId === c.id;
                  return (
                    <div
                      key={c.id}
                      onClick={() => setSelectedId(c.id)}
                      className={`group p-3 rounded-lg border transition-all cursor-pointer shadow-sm relative overflow-hidden
                        ${
                          isSelected
                            ? 'border-indigo-500 bg-indigo-50/50 ring-1 ring-indigo-500/20'
                            : 'border-gray-200 bg-white hover:border-indigo-300 hover:shadow-md'
                        }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold shadow-sm transition-transform group-hover:scale-105 ${
                              isPos
                                ? 'bg-gradient-to-br from-red-400 to-red-600'
                                : 'bg-gradient-to-br from-blue-400 to-blue-600'
                            }`}
                          >
                            {isPos ? '+' : '-'}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold text-gray-700">
                              Carga {idx + 1}
                            </span>
                            <span className="text-[10px] text-gray-400 font-mono">
                              ({Math.round(c.x - canvasSize.width / 2)},{' '}
                              {Math.round(canvasSize.height / 2 - c.y)})
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleChargeSign(c.id);
                            }}
                            className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 hover:text-indigo-600"
                            title="Invertir polaridad"
                          >
                            <RefreshCw size={14} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeCharge(c.id);
                            }}
                            className="p-1.5 rounded-md hover:bg-red-50 text-gray-400 hover:text-red-500"
                            title="Eliminar carga"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-gray-100/50">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[10px] uppercase font-bold text-gray-400">
                            Magnitud
                          </span>
                          <span className="text-xs font-mono font-bold text-indigo-600">
                            {Math.abs(c.q)} µC
                          </span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="5"
                          step="1"
                          value={Math.abs(c.q)}
                          onChange={(e) => updateChargeMagnitude(c.id, e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                          className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={addCharge}
                disabled={charges.length >= 4}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border-2 border-dashed border-gray-300 text-gray-500 font-medium hover:border-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus size={18} /> Añadir Carga
              </button>
            </div>

            <div className="border-t border-gray-100"></div>

            <div className="space-y-5">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                Visualización
              </label>
              <div className="space-y-4">
                <div className={!showFieldLines ? 'opacity-50 pointer-events-none transition-opacity' : 'transition-opacity'}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Densidad líneas campo</span>
                    <span className="text-xs font-mono bg-gray-100 px-2 py-0.5 rounded text-gray-600">
                      {numLinesPerCharge}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="32"
                    step="4"
                    value={numLinesPerCharge}
                    onChange={(e) => setNumLinesPerCharge(Number(e.target.value))}
                    className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 hover:accent-indigo-500"
                  />
                </div>

                <div className={!showEquipotential ? 'opacity-50 pointer-events-none transition-opacity' : 'transition-opacity'}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Salto de Potencial</span>
                    <span className="text-xs font-mono bg-gray-100 px-2 py-0.5 rounded text-gray-600">
                      {potentialStep} V
                    </span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="800"
                    step="50"
                    value={potentialStep}
                    onChange={(e) => setPotentialStep(Number(e.target.value))}
                    className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 hover:accent-indigo-500"
                  />
                </div>

                <div className="space-y-3">
                  <ToggleRow label="Líneas de Campo" checked={showFieldLines} onChange={setShowFieldLines} />
                  <ToggleRow label="Vectores de Campo" checked={showArrows} onChange={setShowArrows} />
                  <ToggleRow label="Rejilla de Fondo" checked={showGrid} onChange={setShowGrid} />
                  <ToggleRow
                    label="Cargas"
                    checked={showCharges}
                    onChange={(value) => {
                      setShowCharges(value);
                      if (!value) {
                        setSelectedId(null);
                        setIsDragging(false);
                      }
                    }}
                  />
                  <ToggleRow
                    label="Equipotenciales"
                    checked={showEquipotential}
                    onChange={setShowEquipotential}
                    highlight
                  />
                  {showEquipotential && (
                    <p className="text-[10px] text-amber-600 bg-amber-50 p-2 rounded border border-amber-100">
                      Nota: Potencial bajo = más líneas = menor rendimiento.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function ToggleRow({ label, checked, onChange, highlight = false }) {
  return (
    <label
      className={`flex items-center justify-between cursor-pointer p-2 rounded-md transition-colors ${
        highlight && checked ? 'bg-indigo-50' : 'hover:bg-gray-50'
      }`}
    >
      <span className={`text-sm ${highlight && checked ? 'font-medium text-indigo-700' : 'text-gray-700'}`}>
        {label}
      </span>
      <div className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" className="sr-only peer" checked={checked} onChange={(e) => onChange(e.target.checked)} />
        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
      </div>
    </label>
  );
}
