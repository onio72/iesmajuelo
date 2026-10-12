/* Calculadora científica común v1.0.0. Sin dependencias de red. */
(function (global) {
  'use strict';
  function evaluate(expression, mode = 'DEG') {
    const source = String(expression).replace(/,/g, '.').replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-').replace(/√/g, 'sqrt');
    if (!source.trim()) throw Error('Escribe una operación.');
    if (source.length > 1000) throw Error('La expresión es demasiado larga.');
    const tokens = [];
    let position = 0;
    while (position < source.length) {
      const tail = source.slice(position);
      const number = tail.match(/^(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?/i);
      const name = tail.match(/^[a-z]+/i);
      if (/^\s/.test(tail)) { position++; continue; }
      if (number) { tokens.push(Number(number[0])); position += number[0].length; }
      else if (name) { tokens.push(name[0].toLowerCase()); position += name[0].length; }
      else if ('+-*/^()'.includes(tail[0])) { tokens.push(tail[0]); position++; }
      else throw Error('Hay un símbolo no admitido.');
    }
    let index = 0;
    const match = token => tokens[index] === token && (++index, true);
    const finite = value => { if (!Number.isFinite(value)) throw Error('El resultado no es un número finito.'); return value; };
    const expect = token => { if (!match(token)) throw Error('Falta cerrar un paréntesis o completar la expresión.'); };
    function primary() {
      const token = tokens[index++];
      if (typeof token === 'number') return finite(token);
      if (token === '(') { const value = sum(); expect(')'); return value; }
      if (token === 'pi') return Math.PI;
      if (token === 'e') return Math.E;
      if (!['sqrt', 'inv', 'sin', 'cos', 'tan', 'ln', 'log', 'abs'].includes(token)) throw Error('Escribe un número o completa la expresión.');
      expect('('); const value = sum(); expect(')');
      const angle = mode === 'DEG' ? value * Math.PI / 180 : value;
      if (token === 'sqrt' && value < 0) throw Error('La raíz necesita un número no negativo.');
      if (token === 'inv' && value === 0) throw Error('No se puede dividir entre cero.');
      if ((token === 'ln' || token === 'log') && value <= 0) throw Error('El logaritmo necesita un número positivo.');
      if (token === 'tan' && Math.abs(Math.cos(angle)) < 1e-14) throw Error('La tangente no está definida para ese ángulo.');
      return finite({sqrt: () => Math.sqrt(value), inv: () => 1 / value,
        sin: () => Math.sin(angle), cos: () => Math.cos(angle), tan: () => Math.tan(angle),
        ln: () => Math.log(value), log: () => Math.log10(value), abs: () => Math.abs(value)}[token]());
    }
    function power() { const value = primary(); return match('^') ? finite(value ** unary()) : value; }
    function unary() { if (match('+')) return unary(); if (match('-')) return -unary(); return power(); }
    function product() {
      let value = unary();
      while (tokens[index] === '*' || tokens[index] === '/') {
        const op = tokens[index++], right = unary();
        if (op === '/' && right === 0) throw Error('No se puede dividir entre cero.');
        value = finite(op === '*' ? value * right : value / right);
      }
      return value;
    }
    function sum() {
      let value = product();
      while (tokens[index] === '+' || tokens[index] === '-') {
        const op = tokens[index++], right = product(); value = finite(op === '+' ? value + right : value - right);
      }
      return value;
    }
    const result = sum();
    if (index !== tokens.length) throw Error('Revisa la expresión: quedan elementos sin calcular.');
    return finite(result);
  }
  function format(value) { return String(Number(value.toPrecision(12))); }

  function mount(options = {}) {
    const host = document.createElement('div'); host.dataset.calculadoraComun = '1.0.0';
    // A shadow root prevents each application's global CSS from changing the calculator.
    const root = host.attachShadow({mode: 'open'});
    root.innerHTML = `<style>
      :host{font:15px system-ui,sans-serif;color:#172f43;line-height:1.4}
      *{box-sizing:border-box} [hidden]{display:none!important}
      .launcher{position:fixed;right:16px;bottom:16px;z-index:10000;box-shadow:0 4px 16px #12384d40}
      button{font:600 15px system-ui;min-height:44px;border:1px solid #c2d4df;border-radius:8px;background:#e9f1f6;color:#173c54;cursor:pointer;padding:8px}
      button:hover{background:#d8e9f2}button:focus-visible,input:focus-visible,select:focus-visible,.head:focus-visible{outline:3px solid #e9a300;outline-offset:2px}
      .primary,.launcher{background:#145f80;color:white;border-color:#145f80}.primary:hover,.launcher:hover{background:#114c67}
      .box{position:fixed;z-index:10001;top:64px;right:16px;width:340px;max-width:calc(100vw - 16px);max-height:calc(100dvh - 16px);overflow:auto;border:1px solid #93b0c1;border-radius:14px;background:white;box-shadow:0 12px 40px #12384d55}
      .head{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:8px 12px;background:#12384d;color:white;cursor:move;touch-action:none;user-select:none}
      .head button{background:#31566d;color:white;border:0;min-width:44px;font-size:22px}
      .body{padding:12px}.display{width:100%;font:22px ui-monospace,monospace;text-align:right;padding:10px;border:1px solid #abc1ce;border-radius:8px;color:#172f43;background:#f7fbfd;margin:6px 0 10px}
      .toolbar{display:flex;justify-content:space-between;align-items:center;gap:8px;font-size:13px}.toolbar select{min-height:36px;font:inherit;border:1px solid #abc1ce;border-radius:6px;background:white;padding:4px}
      .keys{display:grid;grid-template-columns:repeat(4,1fr);gap:6px}.status{min-height:22px;margin:8px 0;font-size:13px;color:#25465b}.status.error{color:#b91c1c}
      .help{font-size:12px;color:#476478;margin:8px 0}.copy{width:100%}
    </style><button class="launcher" type="button" aria-expanded="false">▦ Calculadora</button>
    <section class="box" role="dialog" aria-label="Calculadora científica" hidden>
      <div class="head" tabindex="0" aria-label="Mover calculadora con las flechas del teclado"><strong>Calculadora científica</strong><button type="button" aria-label="Cerrar calculadora">×</button></div>
      <div class="body"><div class="toolbar"><label>Ángulos <select aria-label="Unidad de ángulos"><option>DEG</option><option>RAD</option></select></label><span>EXP · potencias de diez</span></div>
      <label for="expression">Expresión</label><input id="expression" class="display" type="text" autocomplete="off" spellcheck="false" placeholder="0">
      <div class="keys"></div><p class="status" role="status" aria-live="polite"></p>
      <button class="copy" type="button">Copiar resultado al campo</button>
      <p class="help">Punto o coma decimal. 2,5 EXP − 8 = 2,5e−8. Arrastra la cabecera o muévela con las flechas. Escape cierra.</p></div>
    </section>`;
    (options.container || document.body).append(host);
    const q = selector => root.querySelector(selector);
    const box = q('.box'), display = q('.display'), head = q('.head'), status = q('.status'), launcher = q('.launcher');
    let target = null, returnFocus = null, drag = null, disposed = false;
    const controller = new AbortController(), on = (el, event, handler) => el.addEventListener(event, handler, {signal: controller.signal});
    function message(text, error = false) { status.textContent = text; status.classList.toggle('error', error); }
    function calculate() {
      try { const result = evaluate(display.value, q('select').value); display.value = format(result); message('Resultado calculado.'); return result; }
      catch (error) { message(error.message, true); return null; }
    }
    function constrain(x, y) {
      const width = global.innerWidth, height = global.innerHeight;
      box.style.left = Math.max(8, Math.min(Math.max(8, width - box.offsetWidth - 8), x)) + 'px';
      box.style.top = Math.max(8, Math.min(Math.max(8, height - box.offsetHeight - 8), y)) + 'px';
      box.style.right = 'auto';
    }
    function open(event) {
      returnFocus = event?.currentTarget || document.activeElement;
      box.hidden = false; launcher.setAttribute('aria-expanded', 'true');
      const rect = box.getBoundingClientRect(); constrain(rect.left, rect.top); display.focus();
    }
    function close() { box.hidden = true; launcher.setAttribute('aria-expanded', 'false'); (returnFocus?.isConnected ? returnFocus : launcher).focus(); }
    on(launcher, 'click', open); on(head.querySelector('button'), 'click', close);
    for (const trigger of options.triggers || []) on(trigger, 'click', open);
    const keys = ['C','⌫','(',')','sin','cos','tan','π','ln','log','√','1/x','7','8','9','÷','4','5','6','×','1','2','3','−','0',',','EXP','+','±','x²','^','='];
    const names = {'C':'Borrar todo','⌫':'Borrar último carácter','√':'Raíz cuadrada','1/x':'Inverso','EXP':'Exponente de diez','±':'Cambiar signo','x²':'Elevar al cuadrado','^':'Potencia','=':'Calcular resultado','π':'Pi','÷':'Dividir','×':'Multiplicar','−':'Restar','+':'Sumar'};
    function insert(text) {
      const start = display.selectionStart ?? display.value.length, end = display.selectionEnd ?? start;
      display.setRangeText(text, start, end, 'end'); display.focus(); message('');
    }
    function wrap(name) {
      const start = display.selectionStart, end = display.selectionEnd;
      if (start !== end) insert(`${name}(${display.value.slice(start, end)})`);
      else if (display.value.trim()) { display.value = `${name}(${display.value})`; display.focus(); }
      else insert(`${name}(`);
    }
    for (const key of keys) {
      const button = document.createElement('button'); button.type = 'button'; button.textContent = key; button.setAttribute('aria-label', names[key] || key);
      if (key === '=') button.className = 'primary';
      // Preserve the display's selection when pressing a calculator key.
      on(button, 'pointerdown', event => event.preventDefault());
      on(button, 'click', () => {
        if (key === '=') calculate();
        else if (key === 'C') { display.value = ''; message(''); display.focus(); }
        else if (key === '⌫') { const a = display.selectionStart, b = display.selectionEnd; display.setRangeText('', a === b ? Math.max(0, a - 1) : a, b, 'end'); display.focus(); }
        else if (['sin','cos','tan','ln','log'].includes(key)) wrap(key);
        else if (key === '√') wrap('sqrt');
        else if (key === '1/x') wrap('inv');
        else if (key === 'x²') { display.value = `(${display.value || '0'})^2`; display.focus(); }
        else if (key === '±') { display.value = `-(${display.value || '0'})`; display.focus(); }
        else insert(key === 'EXP' ? 'e' : key === 'π' ? 'pi' : key);
      }); q('.keys').append(button);
    }
    on(document, 'focusin', event => {
      const el = event.target;
      if (el instanceof HTMLInputElement && ['text','number',''].includes(el.type) && !el.disabled && !el.readOnly && !host.contains(el)) target = el;
    });
    on(q('.copy'), 'click', () => {
      const result = calculate(); if (result === null) return;
      const field = options.getTarget ? options.getTarget() : target;
      if (!field?.isConnected || field.disabled || field.readOnly || options.canCopy?.() === false) { message('Selecciona primero un campo de respuesta editable.', true); return; }
      field.value = format(result); field.dispatchEvent(new Event('input', {bubbles:true})); field.dispatchEvent(new Event('change', {bubbles:true}));
      close(); field.focus();
    });
    on(root, 'keydown', event => {
      if (event.key === 'Escape') { event.preventDefault(); close(); }
      else if (event.target === display && event.key === 'Enter') { event.preventDefault(); calculate(); }
    });
    on(head, 'pointerdown', event => {
      if (event.target.closest('button')) return;
      const rect = box.getBoundingClientRect(); drag = {x:event.clientX - rect.left,y:event.clientY - rect.top}; head.setPointerCapture(event.pointerId);
    });
    on(head, 'pointermove', event => { if (drag) constrain(event.clientX-drag.x,event.clientY-drag.y); });
    on(head, 'pointerup', () => drag = null); on(head, 'pointercancel', () => drag = null);
    on(head, 'keydown', event => {
      if (event.target !== head || !['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.key)) return;
      event.preventDefault(); const rect = box.getBoundingClientRect(), step = event.shiftKey ? 40 : 10;
      constrain(rect.left + (event.key === 'ArrowRight' ? step : event.key === 'ArrowLeft' ? -step : 0), rect.top + (event.key === 'ArrowDown' ? step : event.key === 'ArrowUp' ? -step : 0));
    });
    on(global, 'resize', () => { if (!box.hidden) { const rect = box.getBoundingClientRect(); constrain(rect.left,rect.top); } });
    return {open, close, destroy() { if (!disposed) { controller.abort(); host.remove(); disposed = true; } }};
  }
  global.CalculadoraCientifica = Object.freeze({version:'1.0.0',evaluate,format,mount});
})(typeof window === 'undefined' ? globalThis : window);
