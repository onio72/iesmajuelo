// @requires recharts@^2.8.0
// @requires framer-motion@^10.16.4
// @requires-asset ./materiales.json

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";

const g = 9.81; // m/s²

export default function PlanoInclinadoMuSk() {
  const [m, setM] = useState(3);
  const [theta, setTheta] = useState(20);
  const [muS, setMuS] = useState(0.40);
  const [muK, setMuK] = useState(0.30);
  const [materiales, setMateriales] = useState([]);
  const [matSel, setMatSel] = useState("custom");
  const [sDown, setSDown] = useState(0);
  const velRef = useRef(0);
  const rafRef = useRef(0);
  const lastRef = useRef(0);

  const w = 520, h = 360, pad = 40, base = 360;
  const angle = (theta * Math.PI) / 180;
  const rise = Math.tan(angle) * base;
  const x0 = pad, y0 = h - pad;
  const x1 = x0 + base, y1 = y0;
  const x2 = x1, y2 = y0 - rise;
  const Lpx = Math.hypot(x2 - x0, y2 - y0);
  const pxPerMeter = 40;

  useEffect(() => {
    fetch("./materiales.json")
      .then(r => r.json())
      .then(setMateriales)
      .catch(() => setMateriales([]);
  }, []);

  useEffect(() => {
    if (matSel !== "custom") {
      const mat = materiales.find(x => x.id === matSel);
      if (mat) {
        setMuS(mat.mu_s);
        setMuK(mat.mu_k);
      }
    }
  }, [matSel, materiales]);

  useEffect(() => { if (muK > muS) setMuK(muS); }, [muS, muK]);

  const { W, Wx, Wy, N, slides, frictionApplied, stateText, accWhenSliding } = useMemo(() => {
    const W = m * g;
    const Wx = W * Math.sin(angle);
    const Wy = W * Math.cos(angle);
    const N = Wy;
    const fMaxStatic = muS * N;
    const slides = Wx > fMaxStatic + 1e-9;
    const frictionApplied = slides ? muK * N : Wx;
    const accWhenSliding = slides ? g * (Math.sin(angle) - muK * Math.cos(angle)) : 0;
    const stateText = slides ? "DESLIZA" : "EN EQUILIBRIO";
    return { W, Wx, Wy, N, slides, frictionApplied, stateText, accWhenSliding };
  }, [m, angle, muS, muK]);

  const chartData = useMemo(() => {
    const data = [];
    for (let a = 0; a <= 45; a++) {
      const th = (a * Math.PI) / 180;
      data.push({
        a,
        "mg·sinθ": m * g * Math.sin(th),
        "μs·mg·cosθ": muS * m * g * Math.cos(th),
        "μk·mg·cosθ": muK * m * g * Math.cos(th),
      });
    }
    return data;
  }, [m, muS, muK]);

  useEffect(() => { setSDown(Lpx * 0.35); velRef.current = 0; }, [Lpx]);
  useEffect(() => { velRef.current = 0; }, [m, theta, muS, muK]);

  useEffect(() => {
    const tick = (t) => {
      if (!lastRef.current) lastRef.current = t;
      const dt = Math.min((t - lastRef.current) / 1000, 0.05);
      lastRef.current = t;
      let s = sDown;
      let v = velRef.current;
      if (s < Lpx - 0.5) {
        if (accWhenSliding > 0) {
          v = v + accWhenSliding * dt;
          const ds = v * dt * pxPerMeter;
          s = Math.min(Lpx, s + ds);
        } else {
          v = 0;
        }
      } else { v = 0; }
      if (s !== sDown) setSDown(s);
      velRef.current = v;
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [accWhenSliding, Lpx, sDown]);

  const tDown = Math.min(1, Math.max(0, sDown / Lpx));
  const bx = x2 + (x0 - x2) * tDown;
  const by = y2 + (y0 - y2) * tDown;

  const ut = [Math.cos(angle), -Math.sin(angle)];
  const un = [Math.sin(angle),  Math.cos(angle)];
  const Fw = [0, -W];
  const Ff = [ut[0] * (-frictionApplied), ut[1] * (-frictionApplied)];
  const Fn = [un[0] * N, un[1] * N];

  const k = 6;
  const toSvg = (Fx, Fy) => [Fx * k, -Fy * k];
  const [dFwX, dFwY] = toSvg(Fw[0], Fw[1]);
  const [dFfX, dFfY] = toSvg(Ff[0], Ff[1]);
  const [dFnX, dFnY] = toSvg(Fn[0], Fn[1]);

  function arrow(sx, sy, ex, ey) {
    const head = 6;
    const dx = ex - sx, dy = ey - sy;
    const L = Math.hypot(dx, dy) || 1;
    const ux = dx / L, uy = dy / L;
    const hx = ex - ux * head, hy = ey - uy * head;
    return (
      <>
        <line x1={sx} y1={sy} x2={ex} y2={ey} stroke="black" strokeWidth="2" />
        <line x1={hx} y1={hy} x2={hx - uy * head} y2={hy + ux * head} stroke="black" strokeWidth="2" />
        <line x1={hx} y1={hy} x2={hx + uy * head} y2={hy - ux * head} stroke="black" strokeWidth="2" />
      </>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-slate-50 text-slate-800">
      <h1 className="text-2xl font-bold mb-2">Plano inclinado (μₛ / μₖ)</h1>
      <p className="mb-4 text-sm">{stateText}</p>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Controles */}
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow p-4">
            <label>Masa m (kg): {m.toFixed(1)}</label>
            <input type="range" min="0.5" max="10" step="0.1" value={m}
              onChange={e => setM(parseFloat(e.target.value))} className="w-full" />
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <label>Ángulo θ (°): {theta.toFixed(1)}</label>
            <input type="range" min="0" max="45" step="0.5" value={theta}
              onChange={e => setTheta(parseFloat(e.target.value))} className="w-full" />
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <label>Material</label>
            <select value={matSel} onChange={e => setMatSel(e.target.value)} className="w-full">
              <option value="custom">Personalizado</option>
              {materiales.map(m => (
                <option key={m.id} value={m.id}>
                  {m.nombre} (μₛ={m.mu_s}, μₖ={m.mu_k})
                </option>
              ))}
            </select>
            <label>μₛ: {muS.toFixed(2)}</label>
            <input type="range" min="0" max="1" step="0.01" value={muS}
              onChange={e => setMuS(parseFloat(e.target.value))} className="w-full" />
            <label>μₖ: {muK.toFixed(2)}</label>
            <input type="range" min="0" max={muS} step="0.01" value={muK}
              onChange={e => setMuK(parseFloat(e.target.value))} className="w-full" />
          </div>
        </div>

        {/* SVG */}
        <div className="bg-white rounded-lg shadow p-2 md:p-4">
          <svg width={w} height={h}>
            <polygon points={`${x0},${y0} ${x1},${y1} ${x2},${y2}`} fill="#e2e8f0" stroke="#475569" strokeWidth="2" />
            <line x1={x0} y1={y0} x2={x2} y2={y2} stroke="#94a3b8" strokeDasharray="4 4"/>
            <g transform={`translate(${bx},${by}) rotate(${-theta})`}>
              <rect x={-30} y={-44} width={60} height={40} rx="6" fill="#cbd5e1" stroke="#334155" />
            </g>
            <circle cx={bx} cy={by - 20} r="3" fill="#111827" />
            {arrow(bx, by - 20, bx + dFwX, by - 20 + dFwY)}
            <text x={bx - 8} y={by - 20 + dFwY + 14} fontSize="12">W</text>
            {arrow(bx, by - 20, bx + dFnX, by - 20 + dFnY)}
            <text x={bx + dFnX + 6} y={by - 20 + dFnY} fontSize="12">N</text>
            {arrow(bx, by - 20, bx + dFfX, by - 20 + dFfY)}
            <text x={bx + dFfX + 6} y={by - 20 + dFfY} fontSize="12">f</text>
          </svg>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4 mt-6">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="a" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="mg·sinθ" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="μs·mg·cosθ" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="μk·mg·cosθ" strokeWidth={2} dot={false} strokeDasharray="5 5" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

