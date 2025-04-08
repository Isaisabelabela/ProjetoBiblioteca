const form = document.getElementById('book-form');
const container = document.querySelector('.cards-container');

const errorMessage = document.createElement('p');
errorMessage.style.color = 'red';
errorMessage.style.textAlign = 'center';
errorMessage.style.scrollMarginTop = '10px';
form.appendChild(errorMessage);

form.addEventListener('submit', function(event) {
  event.preventDefault(); 

  const title = document.getElementById('book-title').value.trim();
  const description = document.getElementById('book-description').value.trim();
  const price = document.getElementById('book-price').value.trim();
  const imageUrl = document.getElementById('book-image').value;

  if (!title || !description || !price){
    errorMessage.textContent = "Por favor, preencha todos os campos corretamente!";
    return;
  }

  errorMessage.textContent = "";

  if (!imageUrl){
    imageUrl = "imagens/imagemErro.jpeg";
  }

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
