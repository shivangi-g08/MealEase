// CHECK AUTH
function checkAuth(){

  const isLoggedIn = localStorage.getItem("loggedIn");

  if(!isLoggedIn){
    window.location.href = "login.html";
  }
}

// LOGOUT
function logout(){
  localStorage.removeItem("loggedIn");
  window.location.href = "login.html";
}

// GET USER
function getUser(){
  return JSON.parse(localStorage.getItem("user"));
}