// ENTER KEY SUPPORT
document.addEventListener("keypress", function(e){
  if(e.key === "Enter"){
    login();
  }
});

// TOGGLE PASSWORD
function togglePass(){
  let pass = document.getElementById("password");
  pass.type = pass.type === "password" ? "text" : "password";
}

// LOGIN FUNCTION
function login(){

  let name = document.getElementById("name");
  let phone = document.getElementById("phone");
  let email = document.getElementById("email");
  let pass = document.getElementById("password");

  let valid = true;

  // RESET ERRORS
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

  if(!valid) return;

  // STORE USER
  let user = {
    name:name.value,
    phone:phone.value,
    email:email.value,
    pass:pass.value
  };

  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("loggedIn", true);

  alert("Login Successful 🎉");

  window.location.href = "menu.html";
}

// ERROR FUNCTION
function showError(input,id,msg){
  document.getElementById(id).innerText = msg;
  input.classList.add("invalid");
}