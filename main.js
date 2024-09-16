// CATCH ELEMENTS
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let adds = document.getElementById("adds");
let discount = document.getElementById("discount");
let count = document.getElementById("count");
let category = document.getElementById("category");
let total = document.getElementById("total");
let create = document.getElementById("create");
mood = "create";
let temp;

// GET TOTAL
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +adds.value - +discount.value;
    total.innerHTML = result;
    total.style.backgroundColor = "green";
  } else {
    total.style.backgroundColor = "red";
    total.innerHTML = "";
  }
}

// CREATE PRODUCT
let products;
if (localStorage.product != null) {
  products = JSON.parse(localStorage.product);
} else {
  products = [];
}
create.onclick = () => {
  let pro = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    adds: adds.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };
  if (mood == "create") {
    if (pro.count > 1 && pro.count < 100) {
      for (i = 0; i < pro.count; i++) {
        products.push(pro);
      }
    } else {
      products.push(pro);
    }
  } else {
    count.style.display = "block";
    create.innerHTML = "Create";
    products[temp] = pro;
  }

  setLocalStorage();
  clearData();
  showPro();
  getTotal();
};

// SET LOCALSTORAGE

function setLocalStorage() {
  localStorage.setItem("product", JSON.stringify(products));
}

// FUN CTION CLEAE DATA

function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  adds.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}
// FUNCTION SHOW PRODUCTS

function showPro() {
  let table = "";
  for (let i = 0; i < products.length; i++) {
    table += `<tr><td>${i + 1}</td>
    <td>${products[i].title}</td>
    <td>${products[i].price}</td>
    <td>${products[i].taxes}</td>
    <td>${products[i].adds}</td>
    <td>${products[i].discount}</td>
    <td>${products[i].total}</td>
    <td>${products[i].category}</td>
    <td>
        <button onclick = "updateData(${i})">UPDATE</button>
    </td>
    <td>
        <button onclick ="deletePro(${i})">DELETE</button>
    </td>
</tr>`;
  }
  if (products.length > 0) {
    document.getElementById("deleteAll").innerHTML = `
    <button onclick = "deleteAll()">DELETE All (${products.length})</button>
    `;
  } else {
    document.getElementById("deleteAll").innerHTML = "";
  }
  document.getElementById("table-body").innerHTML = table;
}
showPro();

// FUNCTION DELET PRODUCT

function deletePro(i) {
  products.splice(i, 1);
  localStorage.product = JSON.stringify(products);
  showPro();
}

// DELETE ALL PRODUCTS

function deleteAll() {
  localStorage.clear();
  products.splice(0);
  showPro();
}

// UPATE DATA

function updateData(i) {
  (title.value = products[i].title),
    (price.value = products[i].price),
    (taxes.value = products[i].taxes),
    (adds.value = products[i].adds),
    (discount.value = products[i].discount),
    (count.style.display = "none"),
    (category.value = products[i].category),
    getTotal();
  create.innerHTML = "Update";
  mood = "update";
  scroll({
    top: 0,
    behavior: "smooth",
  });
  temp = i;
}

// FUNCTION SEARCH MOOD
let searchMoood = "title";
function searchMood(id) {
  let search = document.getElementById("search");
  if (id == "searchTitle") {
    searchMoood = "title";
    search.placeholder = "Search By Title";
  } else {
    searchMoood = "category";
    search.placeholder = "Search By Category";
  }
  search.focus();
}

function searchData(value) {
  let table = "";
  if (searchMoood == "title") {
    for (let i = 0; i < products.length; i++) {
      if (products[i].title.includes(value)) {
        table += `<tr><td>${i + 1}</td>
        <td>${products[i].title}</td>
        <td>${products[i].price}</td>
        <td>${products[i].taxes}</td>
        <td>${products[i].adds}</td>
        <td>${products[i].discount}</td>
        <td>${products[i].total}</td>
        <td>${products[i].category}</td>
        <td>
            <button onclick = "updateData(${i})">UPDATE</button>
        </td>
        <td>
            <button onclick ="deletePro(${i})">DELETE</button>
        </td>
    </tr>`;
      }
    }
  } else {
    for (let i = 0; i < products.length; i++) {
      if (products[i].category.includes(value)) {
        table += `<tr><td>${i + 1}</td>
        <td>${products[i].title}</td>
        <td>${products[i].price}</td>
        <td>${products[i].taxes}</td>
        <td>${products[i].adds}</td>
        <td>${products[i].discount}</td>
        <td>${products[i].total}</td>
        <td>${products[i].category}</td>
        <td>
            <button onclick = "updateData(${i})">UPDATE</button>
        </td>
        <td>
            <button onclick ="deletePro(${i})">DELETE</button>
        </td>
    </tr>`;
      }
    }
  }
  document.getElementById("table-body").innerHTML = table;
}

getTotal();
