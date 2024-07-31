const cards = document.querySelectorAll('.card');

cards.forEach(card => {
  card.addEventListener('click', () => {
    const mode = card.getAttribute('data-mode');
    localStorage.setItem('mode', mode);

    if (mode === 'tradicional') {
      window.location = '/assets/pages/categories.html';  // Redireciona para a página do modo tradicional
    } else if (mode === 'genius') {
      window.location = '/assets/pages/genius/genius.html';  // Redireciona para a página do modo genius
    }
  });
});
