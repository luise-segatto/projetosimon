let sequence = [];
let playerSequence = [];
let level = 0;

const colors = ['red', 'green', 'blue', 'yellow'];

function nextLevel() {
  level++;
  playerSequence = [];
  const nextColor = colors[Math.floor(Math.random() * 4)];
  sequence.push(nextColor);
  flashSequence();
}

function flashSequence() {
  let i = 0;
  const interval = setInterval(() => {
    flashColor(sequence[i]);
    i++;
    if (i >= sequence.length) {
      clearInterval(interval);
    }
  }, 600);
}

function flashColor(color) {
  const sound = new Audio(`sounds/${color}.mp3`);
  document.getElementById(color).classList.add('active');
  sound.play();
  setTimeout(() => {
    document.getElementById(color).classList.remove('active');
  }, 300);
}

function playerTurn(color) {
  playerSequence.push(color);
  flashColor(color);
  if (!checkSequence()) {
    alert('Você errou! Tente novamente.');
    resetGame();
  } else if (playerSequence.length === sequence.length) {
    setTimeout(() => nextLevel(), 1000);
  }
}

function checkSequence() {
  for (let i = 0; i < playerSequence.length; i++) {
    if (playerSequence[i] !== sequence[i]) {
      return false;
    }
  }
  return true;
}

function resetGame() {
  sequence = [];
  level = 0;
  nextLevel();
}

document.querySelectorAll('.color-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const color = btn.getAttribute('id');
    playerTurn(color);
  });
});