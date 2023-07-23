const burger = document.querySelector(".burger");
const line1 = document.querySelector(".line1");
const line2 = document.querySelector(".line2");
const navHeader = document.querySelector(".nav-header");
const links = document.querySelector(".links");
const navLinks = document.querySelector(".nav-links");
const categories = document.querySelectorAll(".categories-item");
const products = document.querySelectorAll(".categories-item");
const searchtab = document.querySelector("#search");

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
// GSAP Animation
let tl = gsap.timeline({
  defaults: {
    duration: 1,
    ease: "power2.inOut",
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
//card scroll animations
categories.forEach((category) => {
  tl.fromTo(
    category,
    {
      x: "-100%",
      opacity: 0,
      scrollTrigger: {
        trigger: category,
        start: "bottom 0%",
        end: "bottom 100%",
      },
    },
    {
      x: "0%",
      opacity: 1,
      scrollTrigger: {
        trigger: category,
      },
    },
    "-=2"
  );
});

//search functionality

function search() {
  products.forEach((product) => {
    const searchBox = searchtab.value.toUpperCase();

    const match = product.children[1].innerText;
    if (match.toUpperCase().indexOf(searchBox) > -1) {
      product.style.display = "";
    } else {
      product.style.display = "none";
    }
  });
}
searchtab.addEventListener("keyup", search);
