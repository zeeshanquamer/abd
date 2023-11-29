//get api from google books
let fetchLink;
const auth = "AIzaSyD73quCWBjATs8i-QN77oyGvJYHyxoTqQ0";
const input = document.querySelector("#search");
const categories = document.querySelector(".categories");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");

const purchseSuccess = document.querySelector(".purchaseSuccessful");

const purchase = document.querySelector(".purchase");
const popup = document.querySelector(".buy-popup");
const cross = document.querySelector(".cross");

let titlee = document.getElementById("book-title");
let authorr = document.getElementById("author-name");
let namee = document.getElementById("your-name");
let numberr = document.getElementById("your-number");
let addresse = document.getElementById("your-address");
let emaill = document.getElementById("your-email");

let random_auth;
let currentSearch;
let searchValue = input.defaultValue;
input.value = input.defaultValue;
input.addEventListener("change", updateInput);
function updateInput() {
  searchValue = input.value;
}
form.addEventListener("submit", (e) => {
  e.preventDefault();
  currentSearch = searchValue;
  searchPhotos(currentSearch);
});

async function fetchApi(url) {
  const dataFetch = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: auth,
    },
  });
  const data = await dataFetch.json();
  return data;
}
async function pics() {
  fetchLink = `https://www.googleapis.com/books/v1/volumes?q=subject:${searchValue}&maxResults=40`;
  const data = await fetchApi(fetchLink);
  generatePictures(data);
}

function generatePictures(data) {
  data.items.forEach((item) => {
    // console.log(item);
    const title = item.volumeInfo.title;
    const author = item.volumeInfo.authors;

    const id = item.id;
    const description = item.volumeInfo.description;

    // console.log(author);
    const thumbnail = `https://books.google.com/books/publisher/content/images/frontcover/${id}?fife=w400-h600&source=gbs_api`;
    // console.log(thumbnail);

    const galleryImg = document.createElement("div");
    galleryImg.classList.add("categories-item");
    galleryImg.innerHTML = `
    <img src="${thumbnail}" alt="" />
    <h3 class="title">${title}</h3>
    <p class="author">${author}</p>
    <div class="desc">
       <span class="desc-text"> ${title}</span>
       <span class="desc-text"> - ${author}</span>
    <a href="#" class="buy-now">Buy Now</a>
    </div>
    `;
    categories.appendChild(galleryImg);
  });
  const buyNow = document.querySelectorAll(".buy-now");
  buyNow.forEach((button) => {
    button.addEventListener("click", (e) => {
      const purchaseBookTitle =
        e.target.parentElement.parentElement.children[1].innerText;
      const purchasedBookAuthor =
        e.target.parentElement.parentElement.children[2].innerHTML;
      titlee.value = purchaseBookTitle;
      authorr.value = purchasedBookAuthor;
      popup.classList.add("active");
    });
  });
}
function clear() {
  categories.innerHTML = "";
  input.value = "";
}
async function searchPhotos(query) {
  clear();
  fetchLink = `https://www.googleapis.com/books/v1/volumes?q=subject:${query}&maxResults=40`;
  const data = await fetchApi(fetchLink);
  generatePictures(data);
}

purchase.addEventListener("click", buyProduct);
async function buyProduct(e) {
  e.preventDefault();
  let res;
  let obj = {
    name: namee.value,
    title: titlee.value,
    email: emaill.value,
    phone: numberr.value,
    author: authorr.value,
    address: addresse.value,
  };
  try {
    const response = await fetch("http://localhost:8080/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });

    res = await response.json();
    console.log(res);
  } catch (error) {
    console.log(error);
  }
  document.getElementById("your-name").value = "";
  document.getElementById("book-title").value = "";
  document.getElementById("author-name").value = "";
  document.getElementById("your-address").value = "";
  document.getElementById("your-number").value = "";
  document.getElementById("your-email").value = "";
  popup.classList.remove("active");
  if (res.success) {
    purchseSuccess.children[0].innerText = "Purchase successfully";
    purchseSuccess.classList.add("active");
  } else {
    purchseSuccess.children[0].innerText = res.msg.toUpperCase();

    purchseSuccess.classList.add("active");
  }
}
cross.addEventListener("click", () => {
  popup.classList.remove("active");
});

purchseSuccess.addEventListener("transitionend", () => {
  purchseSuccess.classList.remove("active");
});
pics();
