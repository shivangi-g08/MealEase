// Check authentication if available
if(typeof checkAuth === "function") {
  try {
    checkAuth();
  } catch(e) {
    console.warn("Auth check failed:", e.message);
  }
}

// ===== MENU DATA =====
const menuData = [
  {name:"Aloo Paratha",price:60,cat:"breakfast",type:"veg",img:"assets/Images/Aloo Paratha.jpg"},
  {name:"Chole Rice",price:80,cat:"lunch",type:"veg",img:"assets/Images/Chole Rice.jpg"},
  {name:"Chicken Roll",price:120,cat:"lunch",type:"nonveg",img:"assets/Images/Chicken Roll.png"},
  {name:"Coffee",price:50,cat:"drinks",type:"veg",img:"assets/Images/coffee.jpg"},
  {name:"Chilli Cheese Toast",price:80,cat:"lunch",type:"veg",img:"assets/Images/Chilli Cheese Toast.jpg"},
  {name:"Idli Vada",price:60,cat:"lunch",type:"veg",img:"assets/Images/Idli vada.jpg"},
  {name:"Milkshake",price:80,cat:"drinks",type:"veg",img:"assets/Images/Milkshake.jpg"},
  {name:"Veg Thali",price:120,cat:"lunch",type:"veg",img:"assets/Images/roti-sabji.jpg"},
];

const menuDiv = document.getElementById("menu");
const searchInput = document.getElementById("search");
const resultInfo = document.getElementById("resultInfo");

let activeType = "all";

// ===== TIME FILTER =====
function getTimeCategory(){
  const hour = new Date().getHours();
  return hour < 11 ? "breakfast" : "lunch";
}

// ===== CART FUNCTIONS =====
function getCart(){
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart){
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount(){
  const cart = getCart();
  const count = cart.reduce((sum,i)=>sum+i.qty,0);
  document.getElementById("cartCount").innerText = count;
}

function getQty(name){
  const cart = getCart();
  const item = cart.find(i=>i.name===name);
  return item ? item.qty : 0;
}

// ===== RENDER MENU =====
function getFilteredData(){
  const query = searchInput?.value.trim().toLowerCase() || "";
  return menuData.filter(item => {
    const matchesType = activeType === "all" || item.type === activeType;
    const matchesSearch = !query || item.name.toLowerCase().includes(query) || item.cat.toLowerCase().includes(query) || item.type.toLowerCase().includes(query);
    return matchesType && matchesSearch;
  });
}

function updateResultInfo(count){
  if(!resultInfo) return;
  const typeLabel = activeType === "all" ? "All types" : activeType === "veg" ? "Veg" : "Non-Veg";
  resultInfo.innerText = count
    ? `Showing ${count} items · ${typeLabel}`
    : `No items found for selected filters.`;
}

function renderMenu(data){
  if(data.length === 0){
    menuDiv.innerHTML = "<p style='text-align:center; color:#666; padding:40px 0;'>No items found</p>";
    updateResultInfo(0);
    return;
  }

  menuDiv.innerHTML = "";
  data.forEach(item => {
    const qty = getQty(item.name);
    menuDiv.innerHTML += `
      <div class="menu-card">
        <img src="${encodeURI(item.img)}" alt="${item.name}" onerror="this.onerror=null; this.src='assets/Images/image.png'">
        <div class="menu-info">
          <div class="meta">
            <span class="tag">${item.type}</span>
            <span class="tag">${item.cat}</span>
          </div>
          <h3>${item.name}</h3>
          <p class="price">₹${item.price}</p>
          <div class="qty-box">
            <button class="qty-btn" ${qty === 0 ? "disabled" : ""} onclick="updateQty('${item.name}', -1)">-</button>
            <span>${qty}</span>
            <button class="qty-btn" onclick="updateQty('${item.name}', 1)">+</button>
          </div>
          <button class="add-btn" onclick="updateQty('${item.name}', 1)">
            ${qty > 0 ? "Update Cart" : "Add to Cart"}
          </button>
        </div>
      </div>`;
  });

  updateResultInfo(data.length);
}

// ===== INITIAL LOAD =====
renderMenu(getFilteredData());
updateCartCount();

// ===== SEARCH =====
if(searchInput){
  searchInput.addEventListener("input", () => renderMenu(getFilteredData()));
}

// ===== FILTER =====
function setActiveButton(selector, btn){
  document.querySelectorAll(selector).forEach(el => el.classList.remove("active"));
  if(btn) btn.classList.add("active");
}

function filterType(type, btn){
  activeType = type;
  setActiveButton(".filter", btn);
  renderMenu(getFilteredData());
}

// ===== UPDATE QTY =====
function updateQty(name, change){
  let cart = getCart();
  const itemIndex = cart.findIndex(i => i.name === name);
  const item = cart[itemIndex];
  let message = "";

  if(item){
    item.qty += change;
    if(item.qty > 10) item.qty = 10;
    if(item.qty <= 0){
      cart.splice(itemIndex, 1);
      message = `${name} removed from cart`;
    } else {
      message = `${name} updated in cart`;
    }
  } else if(change > 0){
    const food = menuData.find(i => i.name === name);
    cart.push({...food, qty:1});
    message = `${name} added to cart`;
  }

  saveCart(cart);
  renderMenu(getFilteredData());
  showToast(message || "Cart updated");
}

// ===== TOAST =====
function showToast(msg){
  const toast = document.getElementById("toast");
  if(!toast) return;

  toast.innerText = msg;
  toast.classList.add("show");

  setTimeout(()=>{
    toast.classList.remove("show");
  },2000);
}