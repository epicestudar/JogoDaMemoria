const cards = document.querySelectorAll('.card');

cards.forEach(card => {
  card.addEventListener('click', () => {
    const level = card.getAttribute('data-level');
    localStorage.setItem('level', level);
    window.location = '/assets/pages/game.html';  // Redireciona para a página do jogo
  });
});
