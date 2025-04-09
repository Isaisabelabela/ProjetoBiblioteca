const form = document.getElementById('book-form');
const container = document.querySelector('.cards-container');
const uploadInput = document.getElementById('book-image-upload');

const errorMessage = document.createElement('p');
errorMessage.style.color = 'red';
errorMessage.style.textAlign = 'center';
errorMessage.style.marginTop = '10px';
form.appendChild(errorMessage);

form.addEventListener('submit', function(event) {
  event.preventDefault();

  const title = document.getElementById('book-title').value.trim();
  const description = document.getElementById('book-description').value.trim();
  const price = document.getElementById('book-price').value.trim();
  const file = uploadInput.files[0];

  if (!title || !description || !price) {
    errorMessage.textContent = "Por favor, preencha todos os campos corretamente!";
    return;
  }

  errorMessage.textContent = "";

  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const imageUrl = e.target.result;
      createCard(title, description, price, imageUrl);
      updateLocalStorage();
      form.reset();
    };
    reader.readAsDataURL(file);
  } else {
    const finalImageUrl = "imagens/imagemErro.jpeg";
    createCard(title, description, price, finalImageUrl);
    updateLocalStorage();
    form.reset();
  }
});

function createCard(title, description, price, imageUrl) {
  const newCard = document.createElement('div');
  newCard.classList.add('card');
  newCard.innerHTML = `
    <img src="${imageUrl}" alt="Capa do Livro">
    <h2>${title}</h2>
    <p class="descricao">${description}</p>
    <p class="preco">R$ ${price}</p>
    <button class="delete-btn">Excluir</button>
  `;

  container.appendChild(newCard);

  const deleteBtn = newCard.querySelector('.delete-btn');
  deleteBtn.addEventListener('click', function() {
    newCard.classList.add('faded-out');
    setTimeout(() => {
      newCard.remove();
      updateLocalStorage();
    }, 300);
  });
}

function updateLocalStorage() {
  const cards = document.querySelectorAll('.card');
  const books = [];

  cards.forEach(card => {
    const img = card.querySelector('img').getAttribute('src');
    const title = card.querySelector('h2').textContent;
    const description = card.querySelector('.descricao').textContent;
    
    let price = card.querySelector('.preco').textContent.trim();
    price = price.replace('R$', '').trim();

    books.push({ img, title, description, price });
  });

  localStorage.setItem('books', JSON.stringify(books));
}

function loadBooks() {
  const books = JSON.parse(localStorage.getItem('books'));

  if(!books || books.length === 0){
    createCard(
      "Livro exemplo",
      "Descrição do livro exemplo",
      "49,90",
      "imagens/livro01.jpg"
    );
  }else{
    books.forEach(book =>{
      createCard(book.title, book.description, book.price, book.img);
    });
  }
}

loadBooks();
