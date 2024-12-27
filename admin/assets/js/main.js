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
let productsData;
const logoutBtn=document.querySelector("#logout");

if (localStorage.getItem("product") != null) {
  productsData = JSON.parse(localStorage.getItem("product"));
} else {
  productsData = [];
}

submit.onclick = function () {
  
  let newPro = {
    name: pro_Name.value.toLowerCase(),
    price: price.value,
    stock_quntity: stock_quntity.value,
    // image: image.files[0].name,
    image: image.files.length > 0 ? image.files[0].name : mood === "update" ? productsData[tmp].image : "",

    description: description.value,
    // count: count.value,
    category: category.value.toLowerCase(),
  };

  // validation
  const categoryRegex = /^[a-z\s-]{4,20}$/i;
  const nameRegex =/^[a-z][a-z0-9 -.]{4,}$/i;
  if (newPro.name === "" || 
  !nameRegex.test(newPro.name) ||
  newPro.price === "" || 
  newPro.stock_quntity === "" || 
  newPro.category === "" || 
   newPro.category.length > 20||
  !categoryRegex.test(newPro.category)) {
    alert("Please fill all fields correctly.");
    return;
  }

  if (mood === "create") {
    // if (newPro.count > 1) {
    //   for (let i = 0; i < newPro.count; i++) {
    //     productsData.push(newPro);
    //   }
    // } else {
      productsData.push(newPro);
    }
   else {
    productsData[tmp] = newPro;
    mood = "create";
    submit.innerHTML = "Create";
    count.style.display = "block";
  }

  // تأكد من استخدام نفس المفتاح
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
  // count.value = ""; 
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
  // image.value =  productsData[i].image;
  description.value = productsData[i].description;
  category.value = productsData[i].category.toLowerCase();
  // count.value = 1; // القيمة الافتراضية لـ count
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
if(logoutBtn){
  logoutBtn.addEventListener("click", function(){
      sessionStorage.removeItem("userEmail");
      sessionStorage.removeItem("isAdmin");
      location.assign("../login.html");
  })
}
