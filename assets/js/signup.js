// ENTER KEY
document.addEventListener("keypress", function(e){
  if(e.key === "Enter"){
    signup();
  }
});

// TOGGLE PASSWORD
function togglePass(id){
  let input = document.getElementById(id);
  input.type = input.type === "password" ? "text" : "password";
}

// SIGNUP
function signup(){

  let name = document.getElementById("name");
  let phone = document.getElementById("phone");
  let email = document.getElementById("email");
  let pass = document.getElementById("password");
  let confirm = document.getElementById("confirm");
  let terms = document.getElementById("terms");

  let valid = true;

  // RESET
  document.querySelectorAll(".error").forEach(e=>e.innerText="");
  document.querySelectorAll("input").forEach(i=>i.classList.remove("invalid"));

  // NAME
  if(!/^[A-Za-z ]+$/.test(name.value)){
    showError(name,"nameError","Only alphabets allowed");
    valid=false;
  }

  // PHONE
  if(!/^[0-9]{10}$/.test(phone.value)){
    showError(phone,"phoneError","Enter valid 10-digit number");
    valid=false;
  }

  // EMAIL
  if(!/^\S+@\S+\.\S+$/.test(email.value)){
    showError(email,"emailError","Invalid email");
    valid=false;
  }

  // PASSWORD
  if(pass.value.length < 6){
    showError(pass,"passError","Min 6 characters");
    valid=false;
  }

  // CONFIRM
  if(pass.value !== confirm.value){
    showError(confirm,"confirmError","Passwords do not match");
    valid=false;
  }

  // TERMS
  if(!terms.checked){
    alert("Please accept terms");
    valid=false;
  }

  if(!valid) return;

  // DUPLICATE CHECK
  let existing = JSON.parse(localStorage.getItem("user"));
  if(existing && existing.email === email.value){
    alert("Email already registered");
    return;
  }

  // SAVE USER
  let user = {
    name:name.value,
    phone:phone.value,
    email:email.value,
    pass:pass.value
  };

  localStorage.setItem("user", JSON.stringify(user));

  alert("Signup Successful 🎉");

  window.location.href = "login.html";
}

// ERROR
function showError(input,id,msg){
  document.getElementById(id).innerText = msg;
  input.classList.add("invalid");
}