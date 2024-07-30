const cards = document.querySelectorAll('.memory-card');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');
const congratsMessage = document.querySelector('.congrats-message');
const playerNameElement = document.querySelector('.player-name');
const playerTimerPointsElement = document.querySelector('.player-timer');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matchCount = 0;  // Contador de pares combinados
/* let pointsCount = 0; */

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
  playerTimerPointsElement.textContent = timer.innerHTML;
  playerNameElement.textContent = /* localStorage.getItem('player'); */
  playerNameElement.textContent = "Heitor"

  ranking(playerNameElement.textContent, playerTimerPointsElement.textContent);
  console.log(playerTimerPointsElement.textContent, playerNameElement.textContent);
  clearInterval(this.loop);  // Para o timer
  congratsMessage.style.display = 'block';
}

//Utilização do JSON para armazenar os dados de pontuação
function ranking(name,pontuacao) {
  // Criar item:
let myObj = { name: name , pontuacao: pontuacao };
localStorage.setItem(key, JSON.stringify(myObj));

// Ler item:
let myItem = JSON.parse(localStorage.getItem(key));
console.log(myItem);
console.log(name + "....."+ pontuacao);
}


window.onload = () => {
  spanPlayer.innerHTML = localStorage.getItem('player');
  startTimer();
  shuffle();
}


