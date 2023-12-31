// ---------- Modal Cart -------------
const listaCompras = JSON.parse(sessionStorage.getItem('listaCompras')) || [];
const minhasCompras = JSON.parse(sessionStorage.getItem('minhasCompras')) || [];
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

const renderCartElements = () => {
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

const toggleModalClass = (modalType) => {
  const header = document.getElementById("header");
  const sectionBanner = document.getElementById("banner");
  const sectionContent = document.getElementById("sectionContent");
  const footer = document.getElementById("footer");

  let sections;

  if (modalType == "cart") {
    sections = [sectionBanner, sectionContent, footer];
  } else if (modalType == "confirm") {
    sections = [header, sectionBanner, sectionContent, footer];
  }

  sections.forEach((i) => {
    i.classList.toggle("blur-content");
    i.classList.toggle("disabled-content");
  });
}

const toggleCartModal = (home) => {
  const modal = document.getElementById("modal");
  modal.classList.toggle('show');

  toggleModalClass("cart")
  menuActive();
  if (home) {
    renderCartElements();
  }
};

const menuActive = () => {
  const cartIcon = document.getElementById("cartIcon");
  cartIcon.classList.toggle("menu-active");
}

const addProduto = (nome, preco, btnId, imgSrc) => {
  imgSrc = `.${imgSrc}`;
  listaCompras.push({ nome, preco, imgSrc });
  sessionStorage.setItem('listaCompras', JSON.stringify(listaCompras));
  renderCartElements();
};

const removerItem = index => {
  listaCompras.splice(index, 1);
  sessionStorage.setItem('listaCompras', JSON.stringify(listaCompras));
  renderCartElements();
};

const clearList = () => {
  listaCompras.length = 0;
  sessionStorage.removeItem('listaCompras');
  renderCartElements();
};

const toggleConfirmModal = () => {
  const modalConfirm = document.getElementById("modalConfirm");
  modalConfirm.classList.toggle('show');
  toggleCartModal("home");
  toggleModalClass("confirm");
}

const clearButton = () => {
  clearList();
  toggleCartModal("home");
}

const scrollToContent = () => {
  const sectionContent = document.getElementById('sectionContent');
  if (sectionContent) {
    const offsetTop = sectionContent.offsetTop;
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });
  }
}

// ---------- Modal Confirm -------------
const confirmButton = () => {
  addFinalList();
  clearList();
  renderCartElements();
  toggleConfirmModal();
  toggleCartModal("home");
}

const getTimeDate = () => {
  const meses = [
    'jan', 'fev', 'mar', 'abr', 'mai', 'jun',
    'jul', 'ago', 'set', 'out', 'nov', 'dez'
  ];

  const dataAtual = new Date();
  const horas = dataAtual.getHours();
  const minutos = dataAtual.getMinutes();

  const dia = dataAtual.getDate();
  const mes = dataAtual.getMonth();

  const dataHoraString = `${horas}:${minutos < 10 ? '0' : ''}${minutos} - ${dia}/${meses[mes]}`;
  return dataHoraString;
}

const addFinalList = () => {
  let preOrder = [];
  if (preOrder.length == 0) {
    preOrder = [...listaCompras, getTimeDate()]
  } else {
    preOrder = [...listaCompras, preOrder, getTimeDate()]
  }

  minhasCompras.push(preOrder);
  sessionStorage.setItem('minhasCompras', JSON.stringify(minhasCompras));
}

// ---------- Page Compras -------------

const comprasModal = () => {
  checkItemsList();
  toggleCartModal();
}

const redirectHome = () => {
  window.location.href = "/index.html?redirect=true";
}

const clearComprasModal = () => {
  listaCompras.length = 0;
  sessionStorage.removeItem('listaCompras');
  comprasModal();
  updateNotification();
}

const checkItemsList = () => {
  const cartMessenge = document.getElementById("cartMessenge");

  if (listaCompras.length <= 0) {
    cartMessenge.innerHTML = `
    <h3>Carrinho vazio</h3>
    `
  } else {
    cartMessenge.innerHTML = `
    <h3>Você possui itens no carrinho</h3>
    `
  }
}

const isDuplicateItems = (array) => {
  const agrupado = {};

  array.forEach(objeto => {
    const imgSrc = objeto.imgSrc;

    if (!agrupado[imgSrc]) {
      agrupado[imgSrc] = { ...objeto, quantidade: 1 };
    } else {
      agrupado[imgSrc].quantidade++;
    }
  });
  const resultado = Object.values(agrupado);
  return resultado;
}

const renderOrderItems = () => {
  const idList = minhasCompras.map((item, index) => ([index + 1, ...item]))
  const orderList = idList.sort((a, b) => b[0] - a[0]).map((i) => i.slice(1))
  const container = document.getElementById('orderList');

  if (orderList.length == 0) {
    const div = document.createElement("div");
    const h3 = document.createElement("h3");
    div.className = "empty-list-container"
    h3.innerText = "A sua lista de pedidos está vazia :(";
    div.appendChild(h3);
    container.appendChild(div);
  } else {
    orderList.map((i) => {
      const time = i[i.length - 1];
      const list = i.filter((i) => i !== time);

      const pedido = document.createElement("div");
      const pedidoHeader = document.createElement('div');
      const pedidoBody = document.createElement('div');
      const headerTitle = document.createElement('h4');
      const headerData = document.createElement('h5');
      pedidoHeader.classList.add("pedido-item-header");
      pedidoBody.classList.add("pedido-item-body");
      headerTitle.innerText = 'Pedido realziado com sucesso!';
      headerData.innerHTML = `Pedido realizado <span>${time}.</span>`;
      pedido.className = "pedido-item";

      const itensArray = isDuplicateItems(list)

      itensArray.map((j) => {
        const pedidoItem = document.createElement("div");
        const pedidoImg = document.createElement("div");
        const pedidoText = document.createElement("div");
        const img = document.createElement("img");
        const pText = document.createElement("p");
        const pCount = document.createElement("p");

        pedidoImg.className = "img-container";
        pedidoText.className = "text-container";
        pedidoItem.className = "pedido-unidade";

        img.src = `${j.imgSrc}`;
        pText.innerHTML = `${j.nome}`;
        pCount.innerHTML = `${j.quantidade} unidade${j.quantidade == 1 ? '' : 's'}`;

        pedidoImg.appendChild(img);
        pedidoItem.appendChild(pedidoImg);

        pedidoText.appendChild(pText);
        pedidoText.appendChild(pCount);
        pedidoItem.appendChild(pedidoText);
        pedidoBody.appendChild(pedidoItem);
      })

      const total = list.reduce((a, b) => a + b.preco, 0).toFixed(2);
      const totalContainer = document.createElement("div");
      totalContainer.innerHTML = `<p>Total: <span>R$ ${total}</span></p>`;
      totalContainer.className = "total-container";
      pedidoBody.appendChild(totalContainer);

      pedidoHeader.appendChild(headerTitle);
      pedidoHeader.appendChild(headerData);
      pedido.appendChild(pedidoHeader);
      pedido.appendChild(pedidoBody);
      container.appendChild(pedido);
    });
  }
}

const showTab = (id) => {
  const tabs = ['pedido', 'gift', 'credit', 'address'];

  if (!tabs.includes(id)) {
    console.error('ID inválido');
    return;
  }

  const clickedElement = document.getElementById(`${id}Lead`);
  const menuItemClicked = document.getElementById(`${id}MenuItem`);
  const clickedTab = document.getElementById(id);

  if (clickedTab.classList.contains('hide')) {
    clickedTab.classList.remove('hide');
    clickedElement.classList.add("font-weight");
    menuItemClicked.classList.add("active");
  }

  tabs.forEach(tabId => {
    if (tabId !== id) {
      const tab = document.getElementById(tabId);
      const elementWeight = document.getElementById(`${tabId}Lead`);
      const menuItemBefore = document.getElementById(`${tabId}MenuItem`);
      if (!tab.classList.contains('hide')) {
        tab.classList.add('hide');
        elementWeight.classList.remove("font-weight");
        menuItemBefore.classList.remove("active");
      }
    }
  });
}

window.addEventListener('DOMContentLoaded', () => {
  updateNotification();
  if (window.location.pathname === '/pages/compras.html') {
    console.log("Estamos na página minhas compras!");
    renderOrderItems();
  } else if (window.location.pathname === '/index.html' && window.location.search === '?redirect=true') {
    console.log("Estamos na página Home redirecionado!");
    scrollToContent();
  } else {
    console.log("Estamos na página Home!");
  }
})