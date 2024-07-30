const cards = document.querySelectorAll('.card');

cards.forEach(card => {
  card.addEventListener('click', () => {
    const mode = card.getAttribute('data-mode');
    localStorage.setItem('mode', mode);
    window.location = '/assets/pages/levels.html';  // Redireciona para a página de seleção de nível
  });
});
