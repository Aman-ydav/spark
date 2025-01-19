const images = document.querySelectorAll(".carousel-image");
let currentIndex = 0;

setInterval(() => {
  images[currentIndex].classList.remove("active");
  currentIndex = (currentIndex + 1) % images.length;
  images[currentIndex].classList.add("active");
}, 3000);

const urlParams = new URLSearchParams(window.location.search);
const errorMessage = urlParams.get("error");

if (errorMessage) {
  document.getElementById("error-message").textContent = errorMessage;
  document.getElementById("error-message").style.display = "block";
}

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const errorMessage = params.get("error");

  if (errorMessage) {
    const errorDiv = document.getElementById("error-message");
    errorDiv.style.display = "block";
    errorDiv.textContent = errorMessage;
  }
});

let form = document.querySelector("form");

form.addEventListener("submit", () => {
  alert("Successfully submitted");
});
