const burger = document.querySelector(".burger");
const line1 = document.querySelector(".line1");
const line2 = document.querySelector(".line2");
const navHeader = document.querySelector(".nav-header");
const links = document.querySelector(".links");
const navLinks = document.querySelector(".nav-links");
burger.addEventListener("click", openMenu);
function openMenu() {
  line1.classList.toggle("active");
  line2.classList.toggle("active");
  navHeader.classList.toggle("active");
  links.classList.toggle("active");
  navLinks.classList.toggle("active");
}
let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }

  slides[slideIndex - 1].style.display = "block";

  setTimeout(showSlides, 2000);
}
let tl = gsap.timeline({
  defaults: {
    duration: 1,
    stagger: 0.2,
  },
});
tl.fromTo(
  ".logo",
  {
    x: "-100%",
  },
  {
    x: "0%",
  }
);
tl.fromTo(
  ".menu-links",
  {
    y: "-100%",
  },
  { y: "0%" },
  "-=1"
);
