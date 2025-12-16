const startBtn = document.getElementById('start-btn');
const gameArea = document.getElementById('game-area');
const timerEl = document.getElementById('timer');
const levelEl = document.getElementById('level');
const messageEl = document.getElementById('message');
const usernameEl = document.getElementById('username');
const leaderboardEl = document.getElementById('leaderboard');

let level = 1;
let time = 10;
let interval;
let checkboxes = [];
let leaderboard = [];
let moveIntervals = [];

startBtn.addEventListener('click', startGame);

function startGame() {
  if(!usernameEl.value) {
    alert("Enter a username!");
    return;
  }
  level = 1;
  time = 10;
  levelEl.textContent = level;
  messageEl.textContent = '';
  startBtn.disabled = true;
  nextLevel();
}

function nextLevel() {
  // clear old moving intervals
  moveIntervals.forEach(iv => clearInterval(iv));
  moveIntervals = [];

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

    // start moving if level >= 5
    if(level >= 5){
      const iv = setInterval(() => moveCheckbox(checkbox), 200);
      moveIntervals.push(iv);
    }
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

function moveCheckbox(cb){
  let top = parseFloat(cb.style.top);
  let left = parseFloat(cb.style.left);
  top += (Math.random() - 0.5) * 20;
  left += (Math.random() - 0.5) * 20;
  top = Math.max(0, Math.min(450, top));
  left = Math.max(0, Math.min(450, left));
  cb.style.top = top + 'px';
  cb.style.left = left + 'px';
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
  moveIntervals.forEach(iv => clearInterval(iv));
  messageEl.textContent = `Game Over! You reached level ${level}`;
  startBtn.disabled = false;

  // add to leaderboard
  leaderboard.push({name: usernameEl.value, score: level});
  leaderboard.sort((a,b) => b.score - a.score);
  if(leaderboard.length > 5) leaderboard.pop(); // top 5 only
  renderLeaderboard();
}

function renderLeaderboard() {
  leaderboardEl.innerHTML = '';
  leaderboard.forEach(entry => {
    const li = document.createElement('li');
    li.textContent = `${entry.name}: Level ${entry.score}`;
    leaderboardEl.appendChild(li);
  });
}
