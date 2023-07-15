
const contactForm = document.querySelector(".contact-form");
const formName = document.getElementById("formName");
const formEmail = document.getElementById("formEmail");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  document.querySelector(".dotAnimation").classList.add("active");

  let formData = {
    name: formName.value,
    email: formEmail.value,
    message: formMessage.value
  }
  
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/");
  xhr.setRequestHeader("content-type", "application/json");
  xhr.onload = function() {
    console.log(xhr.responseText);
    if (xhr.responseText == "Success") {
      document.querySelector(".dotAnimation").classList.remove("active");
      document.querySelector(".msgSent").classList.add("active");
      setTimeout(() => {
        document.querySelector(".msgSent").classList.remove("active");
      }, 5000);
      formName.value = "";
      formEmail.value = "";
      formMessage.value = "";
    }else {
      document.querySelector(".dotAnimation").classList.remove("active");
      document.querySelector(".msgNotSent").classList.add("active");
      setTimeout(() => {
        document.querySelector(".msgNotSent").classList.remove("active");
      }, 5000);
    }
  }

  xhr.send(JSON.stringify(formData));
})