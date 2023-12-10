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

const isEmptyCart = () => {
  const li = document.createElement('li');
  const btnDone = document.getElementById("btnDone");
  li.textContent = "Seu carrinho está vazio!";
  li.classList.add("empty-cart");
  if (listaCompras.length <= 0) {
    listaDestino.appendChild(li);
    btnDone.disabled = true;
    btnDone.classList.add("disabled");
  } else {
    btnDone.disabled = false;
    btnDone.classList.remove("disabled");
  }
}

const renderElements = () => {
  listaDestino.innerHTML = '';
  const contagemProdutos = {};

  listaCompras.forEach((produto, index) => {
    const imgSrc = produto.imgSrc;

    contagemProdutos[imgSrc] = (contagemProdutos[imgSrc] || 0) + 1;
    const produtoRenderizado = document.getElementById(`produto${imgSrc}`);

    if (produtoRenderizado) {
      const qnt = document.getElementById(`qntProduto${imgSrc}`);
      qnt.textContent = `Qnt: ${contagemProdutos[produto.imgSrc]}`;
      const preco = document.getElementById(`priceProduto${imgSrc}`);
      preco.textContent = `R$ ${(contagemProdutos[produto.imgSrc] * produto.preco).toFixed(2)}`;
    } else {

      const li = document.createElement('li');
      li.id = `produto${produto.imgSrc}`
      const img = document.createElement('img');
      img.src = produto.imgSrc;
      img.alt = produto.nome;
      li.appendChild(img);

      const textContainer = document.createElement("div");
      textContainer.classList.add("text-container");
      textContainer.innerHTML = `
    <p>${produto.nome}</p>
    <div class="price-container">
      <p id="qntProduto${produto.imgSrc}">Qnt: ${contagemProdutos[produto.imgSrc]}</p>
      <p id="priceProduto${produto.imgSrc}">R$ ${(contagemProdutos[produto.imgSrc] * produto.preco.toFixed(2))}</p>      
    </div>
    `;
      li.appendChild(textContainer);

      const trash = document.createElement("img");
      trash.src = `./assets/lixeira.webp`;
      trash.alt = `icone-lixeira`;
      const btnRemover = document.createElement('button');
      btnRemover.onclick = () => removerItem(index);

      btnRemover.appendChild(trash);
      li.appendChild(btnRemover);
      listaDestino.appendChild(li);
    }
  });

  const total = listaCompras.reduce((a, b) => a + b.preco, 0).toFixed(2);
  const totalContainer = document.getElementById("total");
  totalContainer.innerHTML = `<p>Total: <span>R$ ${total}</span></p>`;

  updateNotification();
  isEmptyCart();
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