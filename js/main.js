// ---------- Modal Cart -------------
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

updateNotification();

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

    const trash = document.createElement("img");
    trash.src = `./assets/lixeira.webp`;
    trash.alt = `icone-lixeira`;
    const btnRemover = document.createElement('button');
    btnRemover.onclick = () => removerItem(index);

    btnRemover.appendChild(trash);
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
  sectionBanner.classList.toggle("disabled-content");
  sectionContent.classList.toggle("disabled-content");
  sectionContent.classList.toggle("blur-content");
  footer.classList.toggle("blur-content");
  footer.classList.toggle("disabled-content");

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
};

const modalFinal = () => {
  openModal();
  openModalConfirmation()
}

const clearButton = () => {
  clearList();
  openModal();
}

// ---------- Modal Confirm -------------
const openModalConfirmation = () => {
  const modalConfirm = document.getElementById("modalConfirm");
  modalConfirm.classList.toggle('show');

  const sectionBanner = document.getElementById("banner");
  const sectionContent = document.getElementById("sectionContent");
  const footer = document.getElementById("footer");
  const header = document.getElementById("header");

  header.classList.toggle("blur-content");
  header.classList.toggle("disabled-content");
  sectionBanner.classList.toggle("blur-content");
  sectionBanner.classList.toggle("disabled-content");
  sectionContent.classList.toggle("disabled-content");
  sectionContent.classList.toggle("blur-content");
  footer.classList.toggle("blur-content");
  footer.classList.toggle("disabled-content");

  renderElements();
};

const confirmButton = () => {
  clearList();
  renderElements();
  openModalConfirmation();
}