let bar = document.querySelector("header .bar");
let nav = document.querySelector("header .navbar");

bar.addEventListener("click", () => {
  if (nav.style.maxHeight == "300px") {
    nav.style.maxHeight = "0px";
  } else {
    nav.style.maxHeight = "300px";
  }
});


const carousel = document.querySelector('.carousel-inner');
const items = document.querySelectorAll('.carousel-item');
const prevBtn = document.querySelector('.carousel-prev');
const nextBtn = document.querySelector('.carousel-next');
let currentIndex = 0;

function updateCarousel() {
    carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
}

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    updateCarousel();
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % items.length;
    updateCarousel();
});

setInterval(() => {
    currentIndex = (currentIndex + 1) % items.length;
    updateCarousel();
}, 5000);


const news = document.querySelector('#newsletter');

news.addEventListener('submit',()=> {
  alert("We will keep you updated via email regularly.\nClick OK to confirm!");
});
