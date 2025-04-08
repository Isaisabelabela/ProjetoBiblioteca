const form = document.getElementById('book-form');
const container = document.querySelector('.cards-container');

form.addEventListener('submit', function(event) {
  event.preventDefault(); // Impede o envio padrão do formulário

  const title = document.getElementById('book-title').value;
  const description = document.getElementById('book-description').value;
  const price = parseFloat(document.getElementById('book-price').value).toFixed(2);
  const imageUrl = document.getElementById('book-image').value;

  const newCard = document.createElement('div');
  newCard.classList.add('card');
  newCard.innerHTML = `
    <img src="${imageUrl}" alt="Capa do Livro">
    <h2>${title}</h2>
    <p class="descricao">${description}</p>
    <p class="preco">R$ ${price}</p>
  `;

  container.appendChild(newCard);

  // Limpa os campos depois de adicionar
  form.reset();
});
