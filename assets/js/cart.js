if(typeof checkAuth === "function") {
  try {
    checkAuth();
  } catch(e) {
    console.warn("Auth check failed:", e.message);
  }
}

function getCart(){
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart){
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function renderCart(){
  const cart = getCart();
  const cartDiv = document.getElementById("cartItems");
  const empty = document.getElementById("emptyCart");
  const layout = document.querySelector(".cart-layout");

  if(cart.length === 0){
    cartDiv.innerHTML = "";
    empty.classList.remove("hidden");
    if(layout) layout.classList.add("hidden");
    return;
  }

  empty.classList.add("hidden");
  if(layout) layout.classList.remove("hidden");
  cartDiv.innerHTML = "";

  let subtotal = 0;

  cart.forEach(item => {
    const itemTotal = item.price * item.qty;
    subtotal += itemTotal;

    cartDiv.innerHTML += `
      <div class="cart-item">
        <img src="${encodeURI(item.img)}" alt="${item.name}" onerror="this.src='assets/Images/image.png'">

        <div class="cart-info">
          <h3>${item.name}</h3>
          <div class="tags">
            <span class="tag">${item.type}</span>
            <span class="tag">${item.cat}</span>
          </div>
          <p class="price">₹${item.price}</p>
          <p class="subtotal">Subtotal: ₹${itemTotal}</p>
        </div>

        <div class="cart-actions">
          <div class="qty-controls">
            <button class="qty-btn" onclick="updateQty('${item.name.replace(/'/g, "\\'")}',-1)" ${item.qty === 1 ? 'disabled' : ''}>−</button>
            <span>${item.qty}</span>
            <button class="qty-btn" onclick="updateQty('${item.name.replace(/'/g, "\\'")}',${ 1})" ${item.qty === 10 ? 'disabled' : ''}>+</button>
          </div>
          <button class="remove-btn" onclick="removeItem('${item.name.replace(/'/g, "\\'")}')" title="Remove item">🗑</button>
        </div>
      </div>
    `;
  });

  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + tax;

  document.getElementById("subtotal").innerText = "₹" + subtotal;
  document.getElementById("tax").innerText = "₹" + tax;
  document.getElementById("finalTotal").innerText = "₹" + total;
}

function updateQty(name, change){
  let cart = getCart();
  let item = cart.find(i => i.name === name);

  if(item){
    item.qty += change;

    if(item.qty > 10) item.qty = 10;
    if(item.qty <= 0){
      cart = cart.filter(i => i.name !== name);
    }
  }

  saveCart(cart);
}

function removeItem(name){
  let cart = getCart();
  cart = cart.filter(i => i.name !== name);
  saveCart(cart);
}

function goCheckout(){
  window.location.href = "checkout.html";
}

// INIT
renderCart();
