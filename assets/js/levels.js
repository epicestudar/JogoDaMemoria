const cards = document.querySelectorAll('.card');

cards.forEach(card => {
  card.addEventListener('click', () => {
    const level = card.getAttribute('data-level');
    const mode = localStorage.getItem('mode');
    localStorage.setItem('level', level);

    let gameFile;
    if (mode === 'child') {
      if (level === 'easy') {
        gameFile = '/assets/pages/child/facil.html';
      } else if (level === 'medium') {
        gameFile = '/assets/pages/child/medio.html';
      } else if (level === 'hard') {
        gameFile = '/assets/pages/child/dificil.html';
      }
    } else if (mode === 'student') {
      if (level === 'easy') {
        gameFile = '/assets/pages/student/facil.html';
      } else if (level === 'medium') {
        gameFile = '/assets/pages/student/medio.html';
      } else if (level === 'hard') {
        gameFile = '/assets/pages/student/dificil.html';
      }
    } else if (mode === 'clt') {
      if (level === 'easy') {
        gameFile = '/assets/pages/clt/facil.html';
      } else if (level === 'medium') {
        gameFile = '/assets/pages/clt/medio.html';
      } else if (level === 'hard') {
        gameFile = '/assets/pages/clt/dificil.html';
      }
    } else if (mode === 'programmer') {
      if (level === 'easy') {
        gameFile = '/assets/pages/programador/facil.html';
      } else if (level === 'medium') {
        gameFile = '/assets/pages/programador/medio.html';
      } else if (level === 'hard') {
        gameFile = '/assets/pages/programador/dificil.html';
      }
    }

    window.location = gameFile;  // Redireciona para o arquivo de jogo específico
  });
});
