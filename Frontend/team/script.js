let bar = document.querySelector("header .bar");
let nav = document.querySelector("header .navbar");

bar.addEventListener("click", () => {
  if (nav.style.maxHeight == "300px") {
    nav.style.maxHeight = "0px";
  } else {
    nav.style.maxHeight = "300px";
  }
});



const news = document.querySelector('#newsletter');

news.addEventListener('submit',()=> {
  alert("We will keep you updated via email regularly.\nClick OK to confirm!");
});
