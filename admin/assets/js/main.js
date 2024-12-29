let pro_Name = document.getElementById("pro_Name");
let price = document.getElementById("price");
let stock_quntity = document.getElementById("stock_quntity");
let image = document.getElementById("image");
let description = document.getElementById("description");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let count = document.getElementById("count");
let mood = "create";
let tmp;
const errorsUL= document.getElementById("errors");
let errors = [];
let productsData = JSON.parse(localStorage.getItem("product")) || [];
let categoriesData = JSON.parse(localStorage.getItem("categories")) || [];

for (let i = 0; i < categoriesData.length; i++) {
  category.innerHTML += `<option value="${categoriesData[i].name}">${categoriesData[i].name}</option`;
}

submit.onclick = function () {
  errors = [];
  document.querySelector(".alert-danger").style.display="none";
  errorsUL.innerHTML="";
  let imageName;
  if (image.files.length > 0) {
    imageName = image.files[0].name;
    imgArr=imageName.split(".");
    let ext = imgArr[imgArr.length - 1];
    ext = ext.toLowerCase();
    if(!['png','jpg','jpeg'].includes(ext)){
      errors.push("not allowed extension.");
    }
  } else if (mood === "update") {
    imageName = productsData[tmp].image;
  } else {
    imageName = "";
  }

  let newPro = {
    name: pro_Name.value.toLowerCase(),
    price: price.value,
    stock_quntity: stock_quntity.value,
    image: imageName,
    description: description.value,
    category: category.value.toLowerCase(),
  };

  // validation
  const nameRegex =/^[a-z][a-z0-9 -.]{4,}$/i;
  if(newPro.name === ""){
    errors.push("product name is required.");
  }else if(!nameRegex.test(newPro.name)){
    errors.push("invalid product name.");
  }
  if(newPro.price === ""){
    errors.push("price is required.");
  }
  if(newPro.stock_quntity === ""){
    errors.push("stock quantity is required.");
  }
  if(newPro.category === ""){
    errors.push("category is required.");
  }
  if(errors.length > 0){
    for (let i = 0; i < errors.length; i++) {
      errorsUL.innerHTML += `<li>${errors[i]}</li>`;
    }
    document.querySelector(".alert-danger").style.display="block";
    return;
  }

  if (mood === "create") {
    productsData.push(newPro);
    document.querySelector(".alert-success").style.display="block";
  }else {
    productsData[tmp] = newPro;
    mood = "create";
    submit.innerHTML = "Create";
    clearData();
  }

  localStorage.setItem("product", JSON.stringify(productsData));
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
        <td><img style="width:50px; height:50px;" src="assets/images/${productsData[i].image}" alt="Image" /></td>
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
  localStorage.removeItem("product");
  productsData.splice(0);
  clearData();
  showData();
}

function deleteData(i) {
  productsData.splice(i, 1);
  localStorage.setItem("product", JSON.stringify(productsData)); // تأكد من حفظ التغييرات
  showData();
}

function updateData(i) {
  console.log(productsData[i]);
  pro_Name.value = productsData[i].name.toLowerCase();
  price.value = productsData[i].price;
  stock_quntity.value = productsData[i].stock_quntity;
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
  searchData("");
}

document.getElementById("search").addEventListener("input", function () {
  searchData(this.value);  
});

function searchData(value) {
  let table = "";
  value = value.toLowerCase(); 
  for (let i = 0; i < productsData.length; i++) {
    if (searchMood === "title") {
      if (productsData[i].name.toLowerCase().includes(value)) {  
        table += `
          <tr>
            <td>${i + 1}</td>
            <td>${productsData[i].name}</td>
            <td>${productsData[i].price}</td>
            <td>${productsData[i].stock_quntity}</td>
            <td><img style="width:50px; height:50px;" src="assets/images/${productsData[i].image}" alt="Image" /></td>
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
      if (productsData[i].category.toLowerCase().includes(value)) {  
        table += `
          <tr>
            <td>${i + 1}</td>
            <td>${productsData[i].name}</td>
            <td>${productsData[i].price}</td>
            <td>${productsData[i].stock_quntity}</td>
            <td><img style="width:50px; height:50px;" src="assets/images/${productsData[i].image}" alt="Image" /></td>
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
