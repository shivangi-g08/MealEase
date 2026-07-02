// NAVIGATION
function goTo(page){
  window.location.href = page;
}

// 🔥 FINAL LOADER SYSTEM (CLEAN + SAFE)

function hideLoader(){
  const loader = document.getElementById("loader");
  if(loader){
    loader.style.opacity = "0";
    loader.style.pointerEvents = "none";

    setTimeout(() => {
      loader.style.display = "none";
    }, 300);
  }
}

// Hide when page loads
window.addEventListener("load", hideLoader);

// HARD FAILSAFE (always hides after 1.5s)
setTimeout(hideLoader, 1500);

// TOAST
function showToast(msg){
  const t = document.createElement("div");
  t.className="toast";
  t.innerText=msg;

  document.body.appendChild(t);

  setTimeout(()=>{
    t.style.opacity="0";
    setTimeout(()=>t.remove(),300);
  },2000);
}

// LOADER FIX
window.addEventListener("load", ()=>{
  const l=document.getElementById("loader");
  if(l) l.style.display="none";
});

// CART COUNT
function updateCartCount(){
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let count = 0;

  cart.forEach(item => count += item.qty);

  const cartCount = document.getElementById("cartCount");
  if(cartCount){
    cartCount.innerText = count;
  }
}

updateCartCount();

// SET USERNAME IN LOGO
const user = getUser();
if(user){
  const logoText = document.querySelector(".logo-text");
  if(logoText){
    logoText.innerText = "MealEase | " + user.name;
  }
}

// SCROLL NAVBAR EFFECT
window.addEventListener("scroll", ()=>{
  const nav = document.querySelector(".navbar");

  if(window.scrollY > 50){
    nav.classList.add("scrolled");
  }else{
    nav.classList.remove("scrolled");
  }
});