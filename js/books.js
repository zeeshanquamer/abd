//get api from google books
let fetchLink;
const auth = "AIzaSyBiZRAOMrnhtVCzoI_gUHGx4LoVBqesq5o";
const input = document.querySelector("#search");
const categories = document.querySelector(".categories");

let searchValue;

input.addEventListener("keyup", updateInput);
function updateInput() {
  searchValue = input.value;
  clear();
  pics();
}

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
  fetchLink = `https://www.googleapis.com/books/v1/volumes?q=${searchValue}&key=${auth}`;
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
    const thumbnail = `https://books.google.com/books/publisher/content/images/frontcover/${id}?fife=w400-h600&source=gbs_api`;
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("categories-item");
    galleryImg.innerHTML = `
    <img src="${thumbnail}" alt="" />
    <h3 class="title">${title}</h3>
    <p class="author">-${author}</p>
    <div class="desc">
       <span class="desc-text"> ${description}</span>
    <a href="">Buy Now</a>
    </div
    `;
    categories.appendChild(galleryImg);
  });
}
function clear() {
  categories.innerHTML = "";
}

pics();
