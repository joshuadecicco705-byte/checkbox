const startBtn = document.getElementById('start-btn');
const gameArea = document.getElementById('game-area');
const timerEl = document.getElementById('timer');
const levelEl = document.getElementById('level');
const messageEl = document.getElementById('message');

let level = 1;
let time = 10;
let interval;
let checkboxes = [];

startBtn.addEventListener('click', startGame);

function startGame() {
  level = 1;
  time = 10;
  levelEl.textContent = level;
  messageEl.textContent = '';
  startBtn.disabled = true;
  nextLevel();
}

function nextLevel() {
  gameArea.innerHTML = '';
  checkboxes = [];
  for(let i=0; i<level; i++){
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.style.top = Math.random() * 450 + 'px';
    checkbox.style.left = Math.random() * 450 + 'px';
    checkbox.addEventListener('change', checkAllChecked);
    gameArea.appendChild(checkbox);
    checkboxes.push(checkbox);
  }
  time = 10;
  timerEl.textContent = time;
  clearInterval(interval);
  interval = setInterval(() => {
    time--;
    timerEl.textContent = time;
    if(time <= 0){
      gameOver();
    }
  }, 1000);
}

function checkAllChecked() {
  if(checkboxes.every(cb => cb.checked)){
    level++;
    levelEl.textContent = level;
    nextLevel();
  }
}

function gameOver() {
  clearInterval(interval);
  messageEl.textContent = `Game Over! You reached level ${level}`;
  startBtn.disabled = false;
}
