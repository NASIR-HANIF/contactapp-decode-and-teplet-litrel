var lactive = document.getElementById("l-active-btn");
var sactive = document.getElementById("s-active-btn");
var l_active_el = document.querySelector(".l-active");
var s_active_el = document.querySelector(".s-active");

sactive.onclick = function () {
  s_active_el.style.opacity = "0";
  s_active_el.classList =
    "animate__animated animate__fadeOutUp active-box s-active";
  l_active_el.style.opacity = "1";
  l_active_el.style.zIndex = "1";
  l_active_el.classList =
    "animate__animated animate__fadeInDown active-box l-active";
};
lactive.onclick = function () {
  l_active_el.style.opacity = "0";
  l_active_el.classList =
    "animate__animated animate__fadeOutUp active-box s-active";
  s_active_el.style.opacity = "1";
  s_active_el.style.zIndex = "1";
  s_active_el.classList =
    "animate__animated animate__fadeInDown active-box l-active";
};



// sing up start

let supbtn = document.querySelector(".sup-btn");
let fname = document.getElementById("f-name");
let lname = document.getElementById("l-name");
let uemail = document.getElementById("s-email");
let upassword = document.querySelector("#s-password");
let snotify = document.querySelector(".s-notify");




supbtn.onclick = function (e) {
  e.preventDefault();

  if (
    fname.value != "" ||
    lname.value != "" ||
    uemail.value != "" ||
    upassword.value != ""
  ) {
    if (localStorage.getItem(uemail.value) == null) {
      //  encoded Password
      function encodePassword(password) {
        return btoa(password); // Base64 encoding
    }

      let encodedPassword = encodePassword(upassword.value);
      
      let data = {
        fname: fname.value,
        lname: lname.value,
        uemail: uemail.value,
        upassword: encodedPassword,
      };
      let stringData = JSON.stringify(data);
      localStorage.setItem(uemail.value, stringData);

      snotify.innerText = "sign up success ";
      snotify.classList.add("green");
      setTimeout(function () {
        snotify.classList.remove("green");
        snotify.innerText = "";
      }, 3000);

      fname.value = "";
      lname.value = "";
      uemail.value = "";
      upassword.value = "";
    } else {
      snotify.innerText = "username already exist !";
      snotify.classList.add("red");
      setTimeout(function () {
        snotify.classList.remove("red");
        snotify.innerText = "";
      }, 3000);
    };
  } else {
    snotify.innerText = "please fill all fields";
    snotify.classList.add("red");
    setTimeout(function () {
      snotify.classList.remove("red");
      snotify.innerText = "";
    }, 3000);
  }
};

// login start

let logIBtn = document.querySelector(".login-btn");
let logiUser = document.getElementById("username");
let logiPas = document.getElementById("password");
let logiNotify = document.getElementById("si-notify");

logIBtn.onclick = function (e) {
  e.preventDefault();

  if (logiUser.value != "" || logiPas.value != "") {
    if (localStorage.getItem(logiUser.value) != null) {
      let data = localStorage.getItem(logiUser.value);
      let parsData = JSON.parse(data);
      let encryptedPassword = parsData.upassword;

      // decode password

      function decodePassword(encodedPassword) {
        return atob(encodedPassword); // Base64 decoding
    }
    
    let decodedPassword = decodePassword(encryptedPassword);
  
      if (logiPas.value == decodedPassword) {

        // sessionStorage me jo key apni marzi ki or 

        window.location = "contact/contact.html";
        sessionStorage.setItem("username", logiUser.value);


      } else {

        logiNotify.innerText = "password not match !";
        logiNotify.classList.add("red");
        setTimeout(function () {
          logiNotify.classList.remove("red");
          logiNotify.innerText = "";
        }, 3000);

      }

    }
    else {
      logiNotify.innerText = "user name not found !";
      logiNotify.classList.add("red");
      setTimeout(function () {
        logiNotify.classList.remove("red");
        logiNotify.innerText = "";
      }, 3000);
    }
  } else {
    logiNotify.innerText = "input field is empty !";
    logiNotify.classList.add("red");
    setTimeout(function () {
      logiNotify.classList.remove("red");
      logiNotify.innerText = "";
    }, 3000);
  }
};
