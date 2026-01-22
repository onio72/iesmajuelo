const scoreValue = document.getElementById('scoreValue');
const fieldImage = document.getElementById('fieldImage');
const imageBadge = document.getElementById('imageBadge');
const nextImageBtn = document.getElementById('nextImageBtn');
const dataWarning = document.getElementById('dataWarning');
const questionCounter = document.getElementById('questionCounter');
const questionType = document.getElementById('questionType');
const questionText = document.getElementById('questionText');
const options = document.getElementById('options');
const feedback = document.getElementById('feedback');
const nextQuestionBtn = document.getElementById('nextQuestionBtn');

let items = [];
let queue = [];
let currentItem = null;
let currentQuestions = [];
let questionIndex = 0;
let score = 0;
let answered = false;
let selectedValues = new Set();

function shuffle(list) {
  const arr = [...list];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function formatSigned(value) {
  if (value === '+') return '+';
  if (value === '-') return '-';
  return value;
}

function buildQuestions(item) {
  const questions = [];
  const charges = Number(item.charges || 0);
  const signs = Array.isArray(item.signs) ? item.signs : [];
  const equalMagnitude = item.equalMagnitude;
  const larger = item.larger;

  if (!charges || charges < 1) return questions;

  questions.push({
    id: 'charges',
    type: 'Numero',
    text: '1. ¿Cuántas cargas generan el campo?',
    options: [1, 2, 3, 4].map((value) => ({ value, label: String(value) })),
    correct: charges,
  });

  for (let i = 0; i < charges; i++) {
    if (!signs[i]) continue;
    questions.push({
      id: `sign-${i + 1}`,
      type: 'Signo',
      text: `${questions.length + 1}. ¿Signo de la carga ${i + 1}?`,
      options: [
        { value: '+', label: '+ (positiva)' },
        { value: '-', label: '- (negativa)' },
      ],
      correct: signs[i],
    });
  }

  if (charges >= 2 && typeof equalMagnitude === 'boolean') {
    questions.push({
      id: 'equal',
      type: 'Magnitud',
      text: `${questions.length + 1}. ¿Las cargas son iguales en valor absoluto?`,
      options: [
        { value: 'igual', label: 'Iguales' },
        { value: 'distinta', label: 'Distintas' },
      ],
      correct: equalMagnitude ? 'igual' : 'distinta',
    });

    if (!equalMagnitude && (Number.isInteger(larger) || Array.isArray(larger))) {
      const correct = Array.isArray(larger) ? larger : [larger];
      const isMulti = correct.length > 1;
      questions.push({
        id: 'larger',
        type: 'Magnitud',
        text: `${questions.length + 1}. ¿${isMulti ? 'Cuáles son' : 'Cuál es'} la carga de mayor valor absoluto?`,
        options: Array.from({ length: charges }, (_, idx) => ({
          value: idx + 1,
          label: `Carga ${idx + 1}`,
        })),
        correct: correct,
        multi: isMulti,
      });
    }
  }

  return questions;
}

function isItemComplete(item) {
  if (!item) return false;
  if (!item.charges || item.charges < 1) return false;
  if (!Array.isArray(item.signs) || item.signs.length < item.charges) return false;
  if (item.charges >= 2 && typeof item.equalMagnitude !== 'boolean') return false;
  if (
    item.charges >= 2 &&
    item.equalMagnitude === false &&
    !Number.isInteger(item.larger) &&
    !(Array.isArray(item.larger) && item.larger.length > 0)
  ) {
    return false;
  }
  return true;
}

function updateScore(delta) {
  score = Math.round((score + delta) * 10) / 10;
  scoreValue.textContent = score.toFixed(1).replace('.0', '');
}

function showFeedback(ok, correctLabel) {
  feedback.hidden = false;
  feedback.textContent = ok
    ? 'Correcto: +0.5 puntos.'
    : `Incorrecto: -0.5 puntos. Respuesta correcta: ${correctLabel}`;
  feedback.className = `qa__feedback ${ok ? 'qa__feedback--ok' : 'qa__feedback--bad'}`;
}

function resetFeedback() {
  feedback.hidden = true;
  feedback.textContent = '';
  feedback.className = 'qa__feedback';
}

function renderQuestion() {
  answered = false;
  resetFeedback();
  nextQuestionBtn.disabled = true;
  selectedValues = new Set();

  const q = currentQuestions[questionIndex];
  if (!q) return;

  questionCounter.textContent = `Pregunta ${questionIndex + 1} de ${currentQuestions.length}`;
  questionType.textContent = q.type;
  questionText.textContent = q.text;

  options.innerHTML = '';
  q.options.forEach((option) => {
    const btn = document.createElement('button');
    btn.className = 'option';
    btn.type = 'button';
    btn.textContent = option.label;
    btn.dataset.value = String(option.value);
    btn.addEventListener('click', () => {
      if (answered) return;
      if (q.multi) {
        const value = String(option.value);
        if (selectedValues.has(value)) {
          selectedValues.delete(value);
          btn.classList.remove('option--selected');
        } else {
          selectedValues.add(value);
          btn.classList.add('option--selected');
        }
        nextQuestionBtn.disabled = selectedValues.size === 0;
        return;
      }
      handleAnswer(option);
    });
    options.appendChild(btn);
  });

  if (q.multi) {
    nextQuestionBtn.textContent = 'Comprobar';
  }
}

function handleAnswer(option) {
  if (answered) return;
  answered = true;

  const q = currentQuestions[questionIndex];
  const isCorrect = String(option.value) === String(q.correct);

  options.querySelectorAll('button').forEach((btn) => {
    btn.disabled = true;
    if (btn.dataset.value === String(option.value)) {
      btn.classList.add('option--selected');
    }
  });

  updateScore(isCorrect ? 0.5 : -0.5);

  const correctLabel = q.options.find((opt) => String(opt.value) === String(q.correct))?.label || q.correct;
  showFeedback(isCorrect, formatSigned(correctLabel));

  nextQuestionBtn.textContent = questionIndex === currentQuestions.length - 1
    ? 'Siguiente imagen'
    : 'Siguiente pregunta';
  nextQuestionBtn.disabled = false;
}

function handleMultiAnswer() {
  if (answered) return;
  const q = currentQuestions[questionIndex];
  const correctSet = new Set(q.correct.map((value) => String(value)));
  const selectedSet = new Set([...selectedValues].map((value) => String(value)));

  const isCorrect = correctSet.size === selectedSet.size &&
    [...correctSet].every((value) => selectedSet.has(value));

  answered = true;
  options.querySelectorAll('button').forEach((btn) => {
    btn.disabled = true;
  });

  updateScore(isCorrect ? 0.5 : -0.5);

  const correctLabels = q.options
    .filter((opt) => correctSet.has(String(opt.value)))
    .map((opt) => opt.label)
    .join(', ');
  showFeedback(isCorrect, correctLabels);

  nextQuestionBtn.textContent = questionIndex === currentQuestions.length - 1
    ? 'Siguiente imagen'
    : 'Siguiente pregunta';
  nextQuestionBtn.disabled = false;
}

function loadNextQuestion() {
  if (!answered) return;
  if (questionIndex < currentQuestions.length - 1) {
    questionIndex += 1;
    renderQuestion();
  } else {
    loadNextItem();
  }
}

function loadNextItem() {
  if (queue.length === 0) {
    queue = shuffle(items);
  }
  currentItem = queue.shift();
  currentQuestions = buildQuestions(currentItem);
  questionIndex = 0;

  const imgPath = `img/${currentItem.image}`;
  fieldImage.src = encodeURI(imgPath);
  fieldImage.alt = `Lineas de campo - ${currentItem.image}`;
  imageBadge.textContent = currentItem.id || 'Imagen';

  const complete = isItemComplete(currentItem);
  dataWarning.hidden = complete;

  if (!complete || currentQuestions.length === 0) {
    questionCounter.textContent = 'Sin preguntas disponibles';
    questionType.textContent = '';
    questionText.textContent = 'Completa los datos en data.json para esta imagen.';
    options.innerHTML = '';
    nextQuestionBtn.textContent = 'Siguiente imagen';
    nextQuestionBtn.disabled = false;
    resetFeedback();
    answered = true;
    return;
  }

  renderQuestion();
}

async function init() {
  const response = await fetch('data.json');
  const data = await response.json();
  items = Array.isArray(data.items) ? data.items : [];
  queue = shuffle(items);

  if (items.length === 0) {
    questionText.textContent = 'No hay imagenes configuradas en data.json.';
    nextQuestionBtn.disabled = true;
    nextImageBtn.disabled = true;
    return;
  }

  loadNextItem();
}

nextQuestionBtn.addEventListener('click', () => {
  const q = currentQuestions[questionIndex];
  if (!q) return;
  if (q.multi && !answered) {
    if (selectedValues.size === 0) return;
    handleMultiAnswer();
    return;
  }
  loadNextQuestion();
});
nextImageBtn.addEventListener('click', loadNextItem);

init();
