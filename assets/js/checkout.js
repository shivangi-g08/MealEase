if(typeof checkAuth === "function"){
  try {
    checkAuth();
  } catch(e) {
    console.warn("Auth check failed:", e.message);
  }
}

// ===== GET CART =====
function getCart(){
  return JSON.parse(localStorage.getItem("cart")) || [];
}

const summaryDiv = document.getElementById("summaryItems");
const totalDiv = document.getElementById("total");
const itemCountSpan = document.getElementById("itemCount");
const summaryMessage = document.getElementById("summaryMessage");
const successBox = document.getElementById("successBox");
const placeOrderButton = document.querySelector(".place-order-btn");

let cart = getCart();
let total = 0;

// ===== RENDER SUMMARY =====
function renderSummary(){
  cart = getCart();
  total = 0;

  if(cart.length === 0){
    summaryDiv.innerHTML = `
      <div class="summary-breakdown">
        <div>No items in cart yet.</div>
      </div>`;
    totalDiv.innerText = "₹0";
    if(placeOrderButton) placeOrderButton.disabled = true;
    if(itemCountSpan) itemCountSpan.innerText = "0 items";
    if(summaryMessage) summaryMessage.innerText = "Add items from your cart to continue.";
    return;
  }

  if(placeOrderButton) placeOrderButton.disabled = false;
const totalItems = cart.reduce(
  (sum,item)=>sum + item.qty,
  0
);

if(itemCountSpan)
itemCountSpan.innerText =
`${totalItems} item${totalItems === 1 ? "" : "s"}`;
  if(summaryMessage) summaryMessage.innerText = "Review your order before placing.";

  summaryDiv.innerHTML = "";

  cart.forEach(item => {
    const itemTotal = item.price * item.qty;
    total += itemTotal;

    summaryDiv.innerHTML += `
      <div class="summary-item">
        <div>
          <span class="item-name">${item.name}</span>
          <span>× ${item.qty}</span>
        </div>
        <span>₹${itemTotal}</span>
      </div>
    `;
  });

  const tax = Math.round(total * 0.05);
  const grandTotal = total + tax;

  const breakdownHtml = `
    <div class="summary-breakdown">
      <div><span>Subtotal</span><span>₹${total}</span></div>
      <div><span>Tax (5%)</span><span>₹${tax}</span></div>
      <div><span>Delivery</span><span class="free">Free</span></div>
    </div>
  `;

  summaryDiv.innerHTML += breakdownHtml;
  summaryDiv.innerHTML += `
    <div class="summary-footnote">Pickup time will be ready at your selected slot.</div>
  `;

  totalDiv.innerText = "₹" + grandTotal;
}

// ===== VALIDATION =====
function validate(name, phone, time){
  if(cart.length === 0){
    showToast("Your cart is empty. Add items before placing order.");
    return false;
  }

  if(name.length < 3){
    showToast("Enter valid name");
    return false;
  }

  if(!/^[0-9]{10}$/.test(phone)){
    showToast("Enter valid 10-digit phone");
    return false;
  }

  if(!time){
    showToast("Select pickup time");
    return false;
  }

  return true;
}

// ===== GENERATE ORDER ID =====
function generateOrderId(){
  return "ME" + Date.now().toString().slice(-6);
}

// ===== FORM SUBMIT =====
document.getElementById("orderForm").addEventListener("submit", function(e){
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const time = document.getElementById("time").value;

  if(!validate(name, phone, time)) return;

 const savedTime = Math.floor(Math.random() * 11) + 10; // 10-20 min

const order = {
  id: generateOrderId(),
  name,
  phone,
  time,
  items: cart,
  total,
  savedTime,
  date: new Date().toLocaleString()
};
  localStorage.setItem("order", JSON.stringify(order));

  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.push(order);
  localStorage.setItem("orders", JSON.stringify(orders));

  localStorage.removeItem("cart");

  if(successBox){
    successBox.classList.remove("hidden");
    successBox.classList.add("show");
  }

  if(placeOrderButton){
    placeOrderButton.disabled = true;
    placeOrderButton.innerText = "Placing...";
  }

  showToast("Order Placed 🎉");

  setTimeout(()=>{
    window.location.href = "success.html";
  },1200);
});

// ===== TOAST (if not already added globally) =====
function showToast(msg){
  let toast = document.getElementById("toast");

  if(!toast){
    toast = document.createElement("div");
    toast.id = "toast";
    toast.style.position = "fixed";
    toast.style.bottom = "30px";
    toast.style.right = "30px";
    toast.style.background = "#ff6b35";
    toast.style.color = "white";
    toast.style.padding = "12px 20px";
    toast.style.borderRadius = "24px";
    toast.style.boxShadow = "0 10px 30px rgba(0,0,0,0.18)";
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.25s ease";
    document.body.appendChild(toast);
  }

  toast.innerText = msg;
  toast.style.opacity = "1";

  setTimeout(()=>{
    toast.style.opacity = "0";
  },2000);
}

// INIT
renderSummary();