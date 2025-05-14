let products = [];
let cart = [];

fetch('products.json')
  .then(res => res.json())
  .then(data => {
    products = data;
    renderProducts(products);
  });

function renderProducts(items) {
  const container = document.getElementById('productList');
  container.innerHTML = '';

  items.forEach(product => {
    container.innerHTML += `
      <div class="col">
        <div class="card h-100 shadow">
          <img src="${product.image}" class="card-img-top" alt="${product.name}">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">Rs.${product.price.toFixed(2)}</p>
            <button class="btn btn-primary mt-auto" onclick="addToCart(${product.id})">Add to Cart</button>
          </div>
        </div>
      </div>
    `;
  });
}


function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  updateCart();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCart();
}

function updateCart() {
  const cartList = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');
  const cartCount = document.getElementById('cartCount');

  cartList.innerHTML = '';
  let total = 0;
  let count = 0;

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    count += item.quantity;

    cartList.innerHTML += `
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <div class="d-flex align-items-center">
          <img src="${item.image}" alt="${item.name}" width="60" height="45" class="me-3">
          <div>
            <strong>${item.name}</strong><br>
            ${item.quantity} — Rs.${itemTotal.toFixed(2)}
          </div>
        </div>
        <button class="btn btn-sm btn-danger" onclick="removeFromCart(${item.id})">✕</button>
      </li>
    `;
  });

  cartTotal.textContent = total.toFixed(2);
  cartCount.textContent = count;
}

document.getElementById('searchInput').addEventListener('input', function () {
    
  const query = this.value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(query));
  renderProducts(filtered);
});
