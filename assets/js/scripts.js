const cards = document.querySelectorAll('.memory-card');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');
const congratsMessage = document.querySelector('.congrats-message');
const playerNameElement = document.querySelector('.player-name');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matchCount = 0;  // Contador de pares combinados

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  matchCount++;  // Incrementar contador de pares combinados

  if (matchCount === cards.length / 2) {
    // Todos os pares foram combinados
    endGame();
  }

  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * cards.length);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));

const startTimer = () => {
  this.loop = setInterval(() => {
    const currentTime = +timer.innerHTML;
    timer.innerHTML = currentTime + 1;
  }, 1000);
}

const endGame = () => {
  clearInterval(this.loop);  // Para o timer
  congratsMessage.style.display = 'block';
  playerNameElement.textContent = localStorage.getItem('player');
}

window.onload = () => {
  const playerName = localStorage.getItem('player');
  const gameMode = localStorage.getItem('mode');
  const gameLevel = localStorage.getItem('level');

  spanPlayer.innerHTML = playerName;
  startTimer();

  if (gameMode === 'child') {
    // Configurações específicas para o modo Criança
  } else if (gameMode === 'student') {
    // Configurações específicas para o modo Estudante
  } else if (gameMode === 'clt') {
    // Configurações específicas para o modo CLT
  } else if (gameMode === 'programmer') {
    // Configurações específicas para o modo Programador
  }

  if (gameLevel === 'easy') {
    // Configurações específicas para o nível Fácil
  } else if (gameLevel === 'medium') {
    // Configurações específicas para o nível Médio
  } else if (gameLevel === 'hard') {
    // Configurações específicas para o nível Difícil
  }

  shuffle();
}


