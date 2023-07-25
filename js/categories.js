//get api from google books
let fetchLink;
const auth = "AIzaSyD73quCWBjATs8i-QN77oyGvJYHyxoTqQ0";
const input = document.querySelector("#search");
const categories = document.querySelector(".categories");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
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
    },
  });
  const data = await dataFetch.json();
  console.log(data);
  return data;
}
async function pics() {
  fetchLink = `https://www.googleapis.com/books/v1/volumes?q=subject:${searchValue}&maxResults=40&key=${auth}`;
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
    <p class="author">-${author}</p>
    <div class="desc">
       <span class="desc-text"> ${title}</span>
       <span class="desc-text"> - ${author}</span>
    <a href="">Buy Now</a>
    </div>
    `;
    categories.appendChild(galleryImg);
  });
}
function clear() {
  categories.innerHTML = "";
  input.value = "";
}
async function searchPhotos(query) {
  clear();
  fetchLink = `https://www.googleapis.com/books/v1/volumes?q=subject:${query}&maxResults=40&key=${auth}`;
  const data = await fetchApi(fetchLink);
  generatePictures(data);
}
pics();
