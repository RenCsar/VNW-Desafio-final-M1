// Trocar imagem na responsividade
window.addEventListener('DOMContentLoaded', () => {
  const responsiveImage = document.getElementById('responsiveImage');

  const changeImage = () => {
    if (window.innerWidth <= 500) {
      responsiveImage.src = './assets/banner-sm.webp';
    } else {
      responsiveImage.src = './assets/banner.webp';
    }
  }
  changeImage();
  window.addEventListener('resize', changeImage);
});

// ------------- Modal ------------
const listaCompras = JSON.parse(sessionStorage.getItem('listaCompras')) || [];
const listaDestino = document.getElementById('listaDestino');
const indicadorItens = document.getElementById('count');

const updateNotification = () => {
  if (listaCompras.length > 0) {
    indicadorItens.textContent = listaCompras.length;
    indicadorItens.classList.add("notification")
  } else {
    indicadorItens.textContent = '';
    indicadorItens.classList.remove("notification");
  }
};

const emptyCartMessage = () => {
  const li = document.createElement('li');
  li.textContent = "Seu carrinho está vazio!";
  li.classList.add("empty-cart");
  if (listaCompras.length <= 0) {
    listaDestino.appendChild(li);
  }
}

const renderElements = () => {
  listaDestino.innerHTML = '';
  listaCompras.forEach((produto, index) => {
    const li = document.createElement('li');
    const img = document.createElement('img');
    img.src = produto.imgSrc;
    img.alt = produto.nome;
    li.appendChild(img);

    const textoProduto = document.createElement('span');
    textoProduto.textContent = `${produto.nome} - R$ ${produto.preco.toFixed(2)}`;
    li.appendChild(textoProduto);

    const btnRemover = document.createElement('button');
    btnRemover.textContent = 'Remover';
    btnRemover.onclick = () => removerItem(index);

    li.appendChild(btnRemover);
    listaDestino.appendChild(li);
  });
  updateNotification();
  emptyCartMessage();
};

const openModal = () => {
  const modal = document.getElementById("modal");
  modal.classList.toggle('show');

  const sectionBanner = document.getElementById("banner");
  const sectionContent = document.getElementById("sectionContent");
  const footer = document.getElementById("footer");

  sectionBanner.classList.toggle("blur-content");
  sectionContent.classList.toggle("blur-content");
  footer.classList.toggle("blur-content");

  renderElements();
};

const addProduto = (nome, preco, btnId, imgSrc) => {
  imgSrc = `.${imgSrc}`;
  listaCompras.push({ nome, preco, imgSrc });
  sessionStorage.setItem('listaCompras', JSON.stringify(listaCompras));
  renderElements();
};

const removerItem = index => {
  listaCompras.splice(index, 1);
  sessionStorage.setItem('listaCompras', JSON.stringify(listaCompras));
  renderElements();
};

const clearList = () => {
  listaCompras.length = 0;
  sessionStorage.removeItem('listaCompras');
  renderElements();
  openModal();
};

const modalFinal = () => {
  clearList();
  alert("Compra Finalizada!");
}