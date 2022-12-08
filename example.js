// tangkap element
const getBody = document.querySelector("#getBody");
const getPrevious = document.querySelector("#previous");
const getNext = document.querySelector("#next");
const getInput = document.querySelector("#input");
const getForm = document.querySelector("form");
const getTableRow = document.querySelector("#table_row");

// Siapkan function untuk tampil data
var renderTd = (title, author, publisher, price, image, i) => {
  const tableRow = `
      <tr id="table_row">
        <td>${i}</td>
        <td>${title}</td>
        <td>${author}</td>
        <td>${publisher}</td>
        <td>${price}</td>
        <td>${image}</td>
      </tr>
      `;

  getBody.insertAdjacentHTML("beforebegin", tableRow);
};

// function for loop
var getLooping = async (data, bool) => {
  let i = 1;
  data.forEach((e) => {
    // destructuring data
    const { title, author, publisher, price, image } = e;
    // lakukan render kedalam tampilan
    renderTd(title, author, publisher, price, image, i++);
  });
};

// agar tidak reload halaman
getForm.addEventListener("submit", (e) => {
  e.preventDefault();
});

// function search data
const getSearch = async () => {
  const input = getInput.value;
  const url = `http://localhost:3000/products/search/${input}?page=1&limit=10`;
  const getData = await fetch(url);
  const result = await getData.json();

  const getArray = result.data;

  //   lakukan perulangan dan tampilkan data
  getLooping(getArray);
};

// function fetch semua data api
const fetchAPI = async (page = 1, limit = 10) => {
  const url = `http://localhost:3000/products/all?page=${page}&limit=${limit}`;
  const responses = await fetch(url);
  const result = await responses.json();

  // get data yang bersifat arrray
  const getDataFromApi = result.result;

  //   lakukan perulangan dan tampilkan data
  getLooping(getDataFromApi);
};

fetchAPI();
