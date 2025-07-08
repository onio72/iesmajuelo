const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const mass1Slider = document.getElementById('mass1');
const mass2Slider = document.getElementById('mass2');
const speed1Slider = document.getElementById('speed1');

const mass1Value = document.getElementById('mass1Value');
const mass2Value = document.getElementById('mass2Value');
const speed1Value = document.getElementById('speed1Value');

const startButton = document.getElementById('startButton');
const pauseButton = document.getElementById('pauseButton');
const resetButton = document.getElementById('resetButton');
const slowButton = document.getElementById('slowButton');

const correctAnswers = document.getElementById('correctAnswers');
const incorrectAnswers = document.getElementById('incorrectAnswers');
const progressBar = document.getElementById('progressBar');

const tableCells = {
  momentoAzulAntes: document.getElementById('momentoAzulAntes'),
  momentoRojaAntes: document.getElementById('momentoRojaAntes'),
  momentoTotalAntes: document.getElementById('momentoTotalAntes'),
  momentoAzulDespues: document.getElementById('momentoAzulDespues'),
  momentoRojaDespues: document.getElementById('momentoRojaDespues'),
  momentoTotalDespues: document.getElementById('momentoTotalDespues'),
  ecAzulAntes: document.getElementById('ecAzulAntes'),
  ecRojaAntes: document.getElementById('ecRojaAntes'),
  ecTotalAntes: document.getElementById('ecTotalAntes'),
  ecAzulDespues: document.getElementById('ecAzulDespues'),
  ecRojaDespues: document.getElementById('ecRojaDespues'),
  ecTotalDespues: document.getElementById('ecTotalDespues')
};

let correctAnswerCount = 0;
let incorrectAnswerCount = 0;
let currentQuestion = 1;
const totalQuestions = 10;

let mass1 = parseInt(mass1Slider.value);
let mass2 = parseInt(mass2Slider.value);
let speed1 = parseInt(speed1Slider.value);

let radius1 = 20 + (mass1 * 3);
let radius2 = 20 + (mass2 * 3);

let x1 = 100;
let x2 = 500;

let v1 = speed1;
let v2 = 0;
let v3 = 0;
let collided = false;

let animationId;
let paused = false;
let slowMotion = false;

mass1Slider.oninput = () => {
  mass1 = parseInt(mass1Slider.value);
  mass1Value.textContent = mass1;
  radius1 = 20 + (mass1 * 3);
  draw();
};

mass2Slider.oninput = () => {
  mass2 = parseInt(mass2Slider.value);
  mass2Value.textContent = mass2;
  radius2 = 20 + (mass2 * 3);
  draw();
};

speed1Slider.oninput = () => {
  speed1 = parseInt(speed1Slider.value);
  speed1Value.textContent = speed1;
  v1 = speed1;
  draw();
};

function drawGrid() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  for (let x = 0; x <= canvas.width; x += 20) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
  }
  for (let y = 0; y <= canvas.height; y += 20) {
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
  }
  ctx.strokeStyle = '#ddd';
  ctx.stroke();
}

function drawBalls() {
  ctx.beginPath();
  ctx.arc(x1, canvas.height / 2, radius1, 0, Math.PI * 2);
  ctx.fillStyle = 'blue';
  ctx.fill();
  ctx.stroke();
  ctx.font = '16px Arial';
  ctx.fillText(`v=${v1.toFixed(2)} m/s`, x1 - 10, canvas.height / 2 - radius1 - 10);

  ctx.beginPath();
  ctx.arc(x2, canvas.height / 2, radius2, 0, Math.PI * 2);
  ctx.fillStyle = 'red';
  ctx.fill();
  ctx.stroke();
  ctx.font = '16px Arial';
  ctx.fillText(`v=${v3.toFixed(2)} m/s`, x2 - 10, canvas.height / 2 - radius2 - 10);
}

function draw() {
  drawGrid();
  drawBalls();
}

function updatePositions() {
  if (!collided && x1 + radius1 >= x2 - radius2) {
    const vFinal = (mass1 * v1 + mass2 * v2) / (mass1 + mass2);
    v1 = v3 = vFinal;
    collided = true;
    x1 = x2 - radius1 - radius2; // Coloca las bolas juntas
  }

  if (!collided) {
    x1 += v1;
  } else {
    x1 += v1;
    x2 = x1 + radius1 + radius2;
  }

  // Si las bolas han salido del borde derecho, detener la animación
  if (x1 - radius1 > canvas.width && x2 - radius2 > canvas.width) {
    paused = true;
    cancelAnimationFrame(animationId);
  }
}

function animate() {
  if (!paused) {
    updatePositions();
    draw();
    if (slowMotion) {
      setTimeout(() => {
        animationId = requestAnimationFrame(animate);
      }, 100);
    } else {
      animationId = requestAnimationFrame(animate);
    }
  }
}

startButton.onclick = () => {
  paused = false;
  slowMotion = false;
  collided = false; // Reset the collision flag
  document.getElementById('questionSection').style.display = 'block'; // Muestra la sección de preguntas
  resetQuestions();
  animate();
  // Actualiza la tabla con los valores iniciales
  tableCells.momentoAzulAntes.textContent = (mass1 * v1).toFixed(2);
  tableCells.momentoRojaAntes.textContent = (mass2 * v2).toFixed(2);
  tableCells.momentoTotalAntes.textContent = (mass1 * v1 + mass2 * v2).toFixed(2);
  tableCells.ecAzulAntes.textContent = (0.5 * mass1 * v1 * v1).toFixed(2);
  tableCells.ecRojaAntes.textContent = (0.5 * mass2 * v2 * v2).toFixed(2);
  tableCells.ecTotalAntes.textContent = (0.5 * mass1 * v1 * v1 + 0.5 * mass2 * v2 * v2).toFixed(2);
};

pauseButton.onclick = () => {
  paused = true;
  cancelAnimationFrame(animationId);
};

resetButton.onclick = () => {
  paused = true;
  cancelAnimationFrame(animationId);
  x1 = 100;
  x2 = 500;
  v1 = speed1;
  v2 = 0;
  v3 = 0;
  collided = false;
  draw();
  resetQuestions();
  // Limpia la tabla de valores
  for (let key in tableCells) {
    tableCells[key].textContent = '';
  }
};

slowButton.onclick = () => {
  paused = false;
  slowMotion = true;
  collided = false; // Reset the collision flag
  animate();
};

// Preguntas y respuestas

function checkAnswer(questionNumber, correctAnswer) {
  const answerInput = document.getElementById(`answer${questionNumber}`);
  const feedback = document.getElementById(`feedback${questionNumber}`);
  let userAnswer;
  if (questionNumber === 5 || questionNumber === 10) {
    userAnswer = document.querySelector(`input[name="answer${questionNumber}"]:checked`);
    userAnswer = userAnswer ? userAnswer.value : null;
  } else {
    userAnswer = questionNumber <= 4 ? parseFloat(answerInput.value) : answerInput.value.trim().toLowerCase();
  }

  if (userAnswer === correctAnswer || userAnswer === String(correctAnswer).toLowerCase()) {
    feedback.textContent = 'Correcto!';
    correctAnswerCount++;
    correctAnswers.textContent = correctAnswerCount;
  } else {
    feedback.textContent = `Incorrecto. La respuesta correcta es ${correctAnswer}.`;
    incorrectAnswerCount++;
    incorrectAnswers.textContent = incorrectAnswerCount;
  }

  // Actualizar la tabla con los valores a medida que se responden las preguntas
  if (questionNumber === 1) {
    tableCells.momentoAzulAntes.textContent = (mass1 * v1).toFixed(2);
  } else if (questionNumber === 2) {
    tableCells.momentoRojaAntes.textContent = (mass2 * v2).toFixed(2);
  } else if (questionNumber === 3) {
    tableCells.momentoTotalAntes.textContent = (mass1 * v1 + mass2 * v2).toFixed(2);
  } else if (questionNumber === 4) {
    tableCells.momentoAzulDespues.textContent = (mass1 * v1).toFixed(2);
    tableCells.momentoRojaDespues.textContent = (mass2 * v3).toFixed(2);
    tableCells.momentoTotalDespues.textContent = (mass1 * v1 + mass2 * v3).toFixed(2);
  } else if (questionNumber === 6) {
    tableCells.ecAzulAntes.textContent = (0.5 * mass1 * v1 * v1).toFixed(2);
  } else if (questionNumber === 7) {
    tableCells.ecRojaAntes.textContent = (0.5 * mass2 * v2 * v2).toFixed(2);
  } else if (questionNumber === 8) {
    tableCells.ecTotalAntes.textContent = (0.5 * mass1 * v1 * v1 + 0.5 * mass2 * v2 * v2).toFixed(2);
  } else if (questionNumber === 9) {
    tableCells.ecAzulDespues.textContent = (0.5 * mass1 * v1 * v1).toFixed(2);
    tableCells.ecRojaDespues.textContent = (0.5 * mass2 * v3 * v3).toFixed(2);
    tableCells.ecTotalDespues.textContent = (0.5 * mass1 * v1 * v1 + 0.5 * mass2 * v3 * v3).toFixed(2);
  }

  showNextQuestion();
}

function showNextQuestion() {
  const currentQuestionElement = document.getElementById(`question${currentQuestion}`);
  currentQuestionElement.style.display = 'none';
  currentQuestion++;
  updateProgressBar();
  if (currentQuestion <= totalQuestions) {
    const nextQuestionElement = document.getElementById(`question${currentQuestion}`);
    nextQuestionElement.style.display = 'block';
  }
}

function updateProgressBar() {
  const progress = (currentQuestion - 1) / totalQuestions * 100;
  progressBar.style.width = progress + '%';
}

function resetQuestions() {
  currentQuestion = 1;
  correctAnswerCount = 0;
  incorrectAnswerCount = 0;
  correctAnswers.textContent = correctAnswerCount;
  incorrectAnswers.textContent = incorrectAnswerCount;
  for (let i = 1; i <= totalQuestions; i++) {
    document.getElementById(`question${i}`).style.display = 'none';
    document.getElementById(`feedback${i}`).textContent = '';
    const answerInput = document.getElementById(`answer${i}`);
    if (answerInput) answerInput.value = '';
  }
  document.getElementById('question1').style.display = 'block';
  updateProgressBar();
}

submitAnswer1.onclick = () => checkAnswer(1, mass1 * v1);
submitAnswer2.onclick = () => checkAnswer(2, 0); // La bola roja tiene velocidad 0 antes de la colisión
submitAnswer3.onclick = () => checkAnswer(3, mass1 * v1 + mass2 * v2);
submitAnswer4.onclick = () => checkAnswer(4, mass1 * v1 + mass2 * v3); // El momento lineal después de la colisión
submitAnswer5.onclick = () => checkAnswer(5, 'sí');
submitAnswer6.onclick = () => checkAnswer(6, 0.5 * mass1 * Math.pow(v1, 2));
submitAnswer7.onclick = () => checkAnswer(7, 0); // La bola roja tiene velocidad 0 antes de la colisión
submitAnswer8.onclick = () => checkAnswer(8, 0.5 * mass1 * Math.pow(v1, 2));
submitAnswer9.onclick = () => checkAnswer(9, 0.5 * (mass1 + mass2) * Math.pow(v1, 2));
submitAnswer10.onclick = () => checkAnswer(10, 'no');

draw();
