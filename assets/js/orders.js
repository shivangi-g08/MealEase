checkAuth();
const orders = JSON.parse(localStorage.getItem("orders")) || [];
const list = document.getElementById("ordersList");

if(orders.length === 0){
  list.innerHTML = `
    <div class="empty">
      <h2>No orders yet 🛒</h2>
      <p>Start ordering from the menu</p>
    </div>
  `;
}else{

  orders.reverse().forEach(order=>{

    let itemsHTML = "";

    order.items.forEach(i=>{
      itemsHTML += `<p>${i.name} x ${i.qty}</p>`;
    });

    list.innerHTML += `
      <div class="order-card">

        <div class="order-top">
          <span class="order-id">${order.id}</span>
          <span class="order-time">${order.date}</span>
        </div>

        <div class="order-items">
          ${itemsHTML}
        </div>

        <div class="order-total">
          <span>Total</span>
          <span>₹${order.total}</span>
        </div>

        <div class="status">
          Ready for Pickup ✅
        </div>

      </div>
    `;
  });
}