/* Variables */
const inputUser = document.querySelector('.name_user');
const btnUser = document.querySelector('.btn-game');
const formUser = document.querySelector('.login-form');

/* Input validation function */
const validateInput = ({ target }) => {
    if(target.value.length > 0) {
        btnUser.removeAttribute('disabled');
    } else {
        btnUser.setAttribute('disabled', '');
    }
}

const handleSubmit = (event) => {
    event.preventDefault();  // Desativa o carregamento automático da página ao clicar no botão

    localStorage.setItem('player', inputUser.value);  // Armazena o nome do usuário na memória do navegador com o parâmetro player
    window.location = '/assets/pages/modes.html';  // Redireciona para a página de seleção de modo
}

/* When accessing the input action... */
inputUser.addEventListener('input', validateInput);
formUser.addEventListener('submit', handleSubmit);

