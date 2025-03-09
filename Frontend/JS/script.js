let bar = document.querySelector("header .bar");
let nav = document.querySelector("header .navbar");

bar.addEventListener("click", () => {
  if (nav.style.maxHeight == "300px") {
    nav.style.maxHeight = "0px";
  } else {
    nav.style.maxHeight = "300px";
  }
});


let slideIndex = 0;
const slides = document.querySelectorAll(".event-card");
const carouselInner = document.querySelector(".carousel-inner");

function moveSlide(n) {
  slideIndex += n;
  if (slideIndex >= slides.length) slideIndex = 0;
  if (slideIndex < 0) slideIndex = slides.length - 1;
  updateCarousel();
}

function updateCarousel() {
  const offset = -slideIndex * 100;
  carouselInner.style.transform = `translateX(${offset}%)`;
}

updateCarousel();

let touchStartX = 0;
let touchEndX = 0;

carouselInner.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

carouselInner.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  if (touchStartX - touchEndX > 50) {
    moveSlide(1);
  } else if (touchEndX - touchStartX > 50) {
    moveSlide(-1);
  }
}


let slideIndexT = 0;
const slidesT = document.querySelectorAll(".team-card");
const carouselInnerT = document.querySelector(".carousel-inner-team");

function moveSlideT(nT) {
  slideIndexT += nT;
  if (slideIndexT >= slidesT.length) slideIndexT = 0;
  if (slideIndexT < 0) slideIndexT = slidesT.length - 1;
  updateCarouselT();
}

function updateCarouselT() {
  const offset = -slideIndexT * 100;
  carouselInnerT.style.transform = `translateX(${offset}%)`;
}

updateCarouselT();

let touchStartXT = 0;
let touchEndXT = 0;

carouselInnerT.addEventListener("touchstart", (e) => {
  touchStartXT = e.changedTouches[0].screenX;
});

carouselInnerT.addEventListener("touchend", (e) => {
  touchEndXT = e.changedTouches[0].screenX;
  handleSwipeT();
});

function handleSwipeT() {
  if (touchStartXT - touchEndXT > 50) {
    moveSlideT(1);
  } else if (touchEndXT - touchStartXT > 50) {
    moveSlideT(-1);
  }
}

