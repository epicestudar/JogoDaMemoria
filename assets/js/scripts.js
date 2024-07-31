const cards = document.querySelectorAll('.memory-card');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');
const congratsMessage = document.querySelector('.congrats-message');
const playerNameElement = document.querySelector('.player-name');
const playerScoreElement = document.querySelector('.player-timer');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matchCount = 0;  // Contador de pares combinados
let timerInterval;   // Variável global para o intervalo do timer

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

function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * cards.length);
    card.style.order = randomPos;
  });
}

cards.forEach(card => card.addEventListener('click', flipCard));

const startTimer = () => {
  timerInterval = setInterval(() => {
    const currentTime = +timer.innerHTML;
    timer.innerHTML = currentTime + 1;
  }, 1000);
}

const endGame = () => {
  playerNameElement.textContent = localStorage.getItem('player');
  playerScoreElement.textContent = timer.innerHTML;
  createInJson(localStorage.getItem('player'), parseInt(playerScoreElement.textContent));

  clearInterval(timerInterval);  // Para o timer
  congratsMessage.style.display = 'block';
}

window.onload = () => {/* 
  spanPlayer.innerHTML = localStorage.getItem('player'); */
  startTimer();
  shuffle();
}

function createInJson(name, points) {
  // Fetch the existing data
  fetch("http://localhost:3000/usuarios")
    .then(response => response.json())
    .then(data => {

      // Create a new user object
      let newUser = { nome: name, pontuacao: points };

      // Add the new user to the array and send it to the server
      fetch("http://localhost:3000/usuarios", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify(newUser)
      }).then(response => {
        console.log(response.status, response.statusText); // Log da resposta

        if (response.ok) {
          console.log('Dados atualizados com sucesso.');
        } else {
          response.json().then(err => console.error('Falha ao atualizar os dados:', err));
        }
      })

        .catch(error => {
          console.error('Erro:', error);
        });
    })
    .catch(error => {
      console.error('Erro ao ler o JSON:', error);
    });
  }

  function readJson() {
    let divUsuarios = document.querySelector("#usuarios");

    fetch("http://localhost:3000/usuarios")  // Certifique-se de que o caminho está correto
      .then(response => response.json())
      .then(dados => {
        divUsuarios.innerHTML = '';  // Limpa o conteúdo anterior
        dados.forEach(usuario => {
          divUsuarios.innerHTML += `Teste pratico ${usuario.nome} Pontuação: ${usuario.pontuacao}<br>`;
        });
      });
  }


  function ordenateRanking() {
    let divRanking = document.querySelector(".container-ranking");

    fetch("http://localhost:3000/usuarios")  // Certifique-se de que o caminho está correto
      .then(response => response.json())
      .then(dados => {
        divRanking.innerHTML = '';  // Limpa o conteúdo anterior

        // Ordenar os dados pela pontuação em ordem crescente
        dados.sort((a, b) => a.pontuacao - b.pontuacao);

        // Exibir os dados ordenados
        dados.forEach(usuario => {
          divRanking.innerHTML += `Nome: ${usuario.nome} Pontuação: ${usuario.pontuacao}<br>`;
        });
      })
      .catch(error => {
        console.error('Erro ao ler o JSON:', error);
      });
  }
