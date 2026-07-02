// GET ORDER
const order = JSON.parse(localStorage.getItem("order"));

if (!order) {
  window.location.href = "index.html";
}

// SHOW ORDER ID
document.getElementById("orderId").innerText = order.id;

// SHOW PICKUP SLOT
const pickupSlot = document.getElementById("pickupSlot");
if (pickupSlot) {
  pickupSlot.innerText = order.time;
}

// SHOW TIME SAVED
const savedTime = document.getElementById("savedTime");
if (savedTime) {
  savedTime.innerText =
    `You saved ${order.savedTime || 15} minutes by pre-ordering 🎉`;
}

// GENERATE QR
new QRCode(document.getElementById("qr"), {
  text: order.id,
  width: 150,
  height: 150
});

// STATUS FLOW
const steps = [
  "Order Received",
  "Preparing",
  "Cooking",
  "Ready for Pickup ✅"
];

let i = 0;

document.getElementById("status").innerText = steps[0];

const timer = setInterval(() => {
  i++;

  if (i >= steps.length) {
    clearInterval(timer);
    return;
  }

  document.getElementById("status").innerText = steps[i];
}, 3000);