let pro_Name = document.getElementById("pro_Name");
let price = document.getElementById("price");
let stock_quntity = document.getElementById("stock_quntity");
let image = document.getElementById("image");
let description = document.getElementById("description");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let mood = "create";
let tmp;
let productsData;

if (localStorage.product != null) {
  productsData = JSON.parse(localStorage.product);
} else {
  productsData = [];
}

submit.onclick = function () {
  let newPro = {
    name: pro_Name.value.toLowerCase(),
    price: price.value,
    stock_quntity: stock_quntity.value,
    image: image.value,
    description: description.value,
    category: category.value.toLowerCase(),
  };

  if (mood === "create") {
    if (newPro.count > 1) {
      for (let i = 0; i < newPro.count; i++) productsData.push(newPro);
    } else {
      productsData.push(newPro);
    }
  } else {
    productsData[tmp] = newPro;
    mood = "create";
    submit.innerHTML = "create";
    count.style.display = "block";
  }

  localStorage.setItem("Product", JSON.stringify(productsData));
  clearData();
  showData();
};

function clearData() {
  pro_Name.value = "";
  price.value = "";
  stock_quntity.value = "";
  image.value = "";
  description.value = "";
  category.value = "";
}

function showData() {
  let table = "";
  for (let i = 0; i < productsData.length; i++) {
    table += `
      <tr>
        <td>${i + 1}</td>
        <td>${productsData[i].name}</td>
        <td>${productsData[i].price}</td>
        <td>${productsData[i].stock_quntity}</td>
        <td><img src="${productsData[i].image}" alt="Image" /></td>
        <td>${productsData[i].description}</td>
        <td>${productsData[i].category}</td>
        <td style="display:flex;">
          <button onclick="updateData(${i})" id="update">Update</button>
          <button onclick="deleteData(${i})" id="delete">Delete</button>
        </td>
      </tr>
    `;
  }
  document.getElementById("tbody").innerHTML = table;

  let btnDelete = document.getElementById("deleteAll");
  if (productsData.length > 0) {
    btnDelete.innerHTML = `
      <button onclick="deleteAll()">Delete All (${productsData.length})</button>
    `;
  } else {
    btnDelete.innerHTML = "";
  }
}
showData();

function deleteAll() {
  localStorage.clear();
  productsData.splice(0);
  clearData();
  showData();
}

function deleteData(i) {
  productsData.splice(i, 1);
  localStorage.product = JSON.stringify(productsData);
  showData();
}

function updateData(i) {
  pro_Name.value = productsData[i].name.toLowerCase();
  price.value = productsData[i].price;
  stock_quntity.value = productsData[i].stock_quntity;
  image.value = productsData[i].image;
  description.value = productsData[i].description;
  category.value = productsData[i].category.toLowerCase();
  submit.innerHTML = "Update";
  mood = "update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// البحث
let searchMood = "title";

function getSearhMood(id) {
  let search = document.getElementById("search");
  if (id == "searchTitle") {
    searchMood = "title";
  } else {
    searchMood = "category";
  }
  search.placeholder = `Search by ${searchMood}`;
  search.focus();
  search.value = "";
  searchData("");  // لتحديث البيانات عند تغيير وضع البحث
}

document.getElementById("search").addEventListener("input", function () {
  searchData(this.value);  // استدعاء دالة البحث عند الكتابة في مربع البحث
});

function searchData(value) {
  let table = "";
  value = value.toLowerCase();  // تحويل النص إلى حروف صغيرة
  for (let i = 0; i < productsData.length; i++) {
    if (searchMood === "title") {
      if (productsData[i].name.toLowerCase().includes(value)) {  // البحث عن العنوان
        table += `
          <tr>
            <td>${i + 1}</td>
            <td>${productsData[i].name}</td>
            <td>${productsData[i].price}</td>
            <td>${productsData[i].stock_quntity}</td>
            <td><img src="${productsData[i].image}" alt="Image" /></td>
            <td>${productsData[i].description}</td>
            <td>${productsData[i].category}</td>
            <td style="display:flex;">
              <button onclick="updateData(${i})" id="update">Update</button>
              <button onclick="deleteData(${i})" id="delete">Delete</button>
            </td>
          </tr>
        `;
      }
    } else if (searchMood === "category") {
      if (productsData[i].category.toLowerCase().includes(value)) {  // البحث عن الفئة
        table += `
          <tr>
            <td>${i + 1}</td>
            <td>${productsData[i].name}</td>
            <td>${productsData[i].price}</td>
            <td>${productsData[i].stock_quntity}</td>
            <td><img src="${productsData[i].image}" alt="Image" /></td>
            <td>${productsData[i].description}</td>
            <td>${productsData[i].category}</td>
            <td style="display:flex;">
              <button onclick="updateData(${i})" id="update">Update</button>
              <button onclick="deleteData(${i})" id="delete">Delete</button>
            </td>
          </tr>
        `;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}
