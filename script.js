const form = document.getElementById('book-form');
const container = document.querySelector('.cards-container');

const errorMessage = document.createElement('p');
errorMessage.style.color = 'red';
errorMessage.style.textAlign = 'center';
errorMessage.style.scrollMarginTop = '10px';
form.appendChild(errorMessage);

form.addEventListener('submit', function(event) {
  event.preventDefault(); 

  const title = document.getElementById('book-title').value;
  const description = document.getElementById('book-description').value;
  const price = parseFloat(document.getElementById('book-price').value).toFixed(2);
  const imageUrl = document.getElementById('book-image').value;

  if (!title || !description || !price || !imageUrl){
    errorMessage.textContent = "Por favor, preencha todos os campos corretamente!";
    return;
  }

  errorMessage.textContent = "";

  const newCard = document.createElement('div');
  newCard.classList.add('card');
  newCard.innerHTML = `
    <img src="${imageUrl}" alt="Capa do Livro">
    <h2>${title}</h2>
    <p class="descricao">${description}</p>
    <p class="preco">R$ ${price}</p>
  `;

  container.appendChild(newCard);

  form.reset();
});
