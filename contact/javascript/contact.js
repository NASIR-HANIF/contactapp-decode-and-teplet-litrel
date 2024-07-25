// Start log out coding
let logOutBtn = document.getElementById("logout-btn");
let wellcomActiUser = document.getElementById("wellcom");

// sessionStorage me login user ko call karo
let username = sessionStorage.getItem("username");

if (username == null) {
  document.body.innerHTML = "<h1>Sign in first<h1/>";
  document.body.classList.add("illegal");
  window.location = "../index.html";
}

logOutBtn.onclick = function () {
  window.location = "../index.html";
  sessionStorage.removeItem("username");
};

// yeh sessionStorage wali ke jo keh localStorage wali hey
let userData = JSON.parse(localStorage.getItem(username));

wellcomActiUser.innerText = `WELL COME Ms / Mrs ${userData.fname} ${userData.lname}`;

// Start add contact button function list coding
let creat_Btn = document.querySelector(".create-btn");
let update_Btn = document.querySelector(".update-btn");

let contact_Detail = document.querySelector(".contact-details");
let input_name = document.querySelector(".name");
let input_number = document.querySelector(".number");

// Form data submit
creat_Btn.onclick = function (e) {
  e.preventDefault();
  if (input_name.value != "" && input_number.value != "") {
    newContactApp();
    upDateLocalStorage();
  } else {
    alert("Please enter name & number");
  }
};

// Local storage se data get ket key dubara newContactApp me dall ke print karwana
if (localStorage.getItem(username + "_list") != null) {
  var array_list = JSON.parse(localStorage.getItem(username + "_list"));

  array_list.forEach((task) => {
    newContactApp(task);
  });
}

// New data body me append karwana or yeh hi function localStorage se data le ke print karwaye ga
function newContactApp(task) {
  var name = input_name.value;
  var number = input_number.value;

  if (task) {
    name = task.co_name;
    number = task.co_number;
  }

  var contactIndex = contact_Detail.childElementCount;

  var accordion = document.createElement("div");
  accordion.classList.add("accordion", "mb-3");

  accordion.innerHTML = `
    <div class="accordion-item">
      <h5 class="accordion-header">
        <button class="accordion-button" data-bs-toggle="collapse" data-bs-target="#collapse-${contactIndex}">
          ${name}
        </button>
      </h5>
      <div id="collapse-${contactIndex}" class="accordion-collapse collapse">
        <div class="accordion-body">
          <div class="row">
            <div class="col-md-6">
              <h5 id="contact-${contactIndex}">${name}</h5>
              <p>${number}</p>
            </div>
            <div class="col-md-6 d-flex justify-content-around align-items-center position-relative">
              <i class="fa-regular fa-message"></i>
              <i class="fa-solid fa-phone"></i>
              <i class="fa-solid fa-ellipsis-vertical op-btn"></i>
              <div class="option-box">
                <i class="fa-regular fa-pen-to-square"></i>
                <i class="fa-regular fa-trash-can"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  contact_Detail.appendChild(accordion);
  input_name.value = "";
  input_number.value = "";

  // Update contact
  accordion.querySelector(".fa-pen-to-square").onclick = function () {
    input_name.value = name;
    input_number.value = number;
    input_name.focus();

    creat_Btn.classList.add("d-none");
    update_Btn.classList.remove("d-none");

    update_Btn.onclick = function () {
      var id = contactIndex;
      var co_name = input_name.value;
      var co_number = input_number.value;
      upDateLocalStorage(co_name, co_number, id);
    };
  };

  // Delete contact
  accordion.querySelector(".fa-trash-can").onclick = function () {
    if (confirm("Do you want to delete this contact?")) {
      accordion.remove();
      upDateLocalStorage();
    }
  };

  // Toggle options
  accordion.querySelector(".op-btn").onclick = function () {
    accordion.querySelector(".option-box").classList.toggle("active");
  };
}

// Update localStorage
function upDateLocalStorage(name, number, id) {
  if (name && number) {
    array_list[id] = { co_name: name, co_number: number };
  } else {
    array_list = [];
    var accordions = contact_Detail.querySelectorAll(".accordion");
    accordions.forEach((accordion) => {
      var contactName = accordion.querySelector("h5").innerText;
      var contactNumber = accordion.querySelector("p").innerText;
      array_list.push({ co_name: contactName, co_number: contactNumber });
    });
  }
  localStorage.setItem(username + "_list", JSON.stringify(array_list));
}

// Search coding start
function mySearch() {
  var input = document.getElementById("search").value.toUpperCase();
  var accordions = contact_Detail.querySelectorAll(".accordion");

  accordions.forEach((accordion) => {
    var btn = accordion.getElementsByTagName("button")[0];
    if (btn.innerText.toUpperCase().indexOf(input) > -1) {
      accordion.style.display = "";
    } else {
      accordion.style.display = "none";
    }
  });
}
