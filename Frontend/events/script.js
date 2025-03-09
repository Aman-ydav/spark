let bar = document.querySelector("header .bar");
let nav = document.querySelector("header .navbar");

bar.addEventListener("click", () => {
  if (nav.style.maxHeight == "300px") {
    nav.style.maxHeight = "0px";
  } else {
    nav.style.maxHeight = "300px";
  }
});

const images = document.querySelectorAll(".carousel-image");
let currentIndex = 0;

setInterval(() => {
  images[currentIndex].classList.remove("active");
  currentIndex = (currentIndex + 1) % images.length;
  images[currentIndex].classList.add("active");
}, 3000);



document.addEventListener("DOMContentLoaded", function () {
  const eventCards = document.querySelectorAll(".card");
  const popup = document.getElementById("popup-container");
  const popupTitle = document.getElementById("popup-title");
  const popupImage = document.getElementById("popup-image");
  const popupDescription = document.getElementById("popup-description");
  const popupLink = document.getElementById("popup-link");
  const closeBtn = document.querySelector(".close-btn");


  fetch("event.json")
      .then(response => response.json())
      .then(eventDetails => {
          eventCards.forEach(card => {
              card.addEventListener("click", function () {
                  const eventId = this.getAttribute("data-id");
                  const details = eventDetails[eventId];

                  if (details) {
                      popupTitle.innerHTML = details.title;
                      popupImage.src = details.image;
                      popupDescription.innerHTML = details.description; 
                      popupLink.href = details.link;
                  }

                  popup.style.display = "flex";
              });
          });
      })
      .catch(error => console.error("Error loading event details:", error));

 
  closeBtn.addEventListener("click", function () {
      popup.style.display = "none";
  });

 
  popup.addEventListener("click", function (e) {
      if (e.target === popup) {
          popup.style.display = "none";
      }
  });
});


document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll(".card").forEach(card => {
      const infoText = document.createElement("div");
      infoText.classList.add("info-text");
      infoText.textContent = "Click for more info";
      card.appendChild(infoText);

      card.addEventListener("mousemove", function(e) {
          const x = e.clientX - card.getBoundingClientRect().left + 10;
          const y = e.clientY - card.getBoundingClientRect().top + 10;
          infoText.style.transform = `translate(${x-50}px, ${y-700}px)`;
      });

      card.addEventListener("mouseleave", function() {
          infoText.style.opacity = "0";
      });

      card.addEventListener("mouseenter", function() {
          infoText.style.opacity = "1";
      });
  });
});


const news = document.querySelector('#newsletter');

news.addEventListener('submit',()=> {
  alert("We will keep you updated via email regularly.\nClick OK to confirm!");
});
