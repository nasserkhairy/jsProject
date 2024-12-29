let cat_Name = document.getElementById("cat_Name");
let description = document.getElementById("description");
let submit = document.getElementById("submit");
let mood = "create";
let tmp;
let categoriesData = JSON.parse(localStorage.getItem("categories")) || [];
submit.onclick = function () {
  let newCategory = {
    name: cat_Name.value.toLowerCase(),
    description: description.value
  };

  // validation
  const nameRegex =/^[a-z][a-z0-9 -.]{2,}$/i;
  if (newCategory.name === "" || 
  !nameRegex.test(newCategory.name) ) {
    alert("Please fill category name field correctly.");
    return;
  }

  if (mood === "create") {
    categoriesData.push(newCategory);
  }else {
    categoriesData[tmp] = newCategory;
    mood = "create";
    submit.innerHTML = "Create";
    clearData();
  }

  localStorage.setItem("categories", JSON.stringify(categoriesData));
  clearData();
  showData();
};

function clearData() {
  cat_Name.value = "";
  description.value = "";
}

function showData() {
  let table = "";
  for (let i = 0; i < categoriesData.length; i++) {
    table += `
      <tr>
        <td>${i + 1}</td>
        <td>${categoriesData[i].name}</td>
        <td>${categoriesData[i].description}</td>
        <td style="display:flex;">
          <button onclick="updateData(${i})" id="update">Update</button>
          <button onclick="deleteData(${i})" id="delete">Delete</button>
        </td>
      </tr>
    `;
  }
  document.getElementById("tbody").innerHTML = table;

  let btnDelete = document.getElementById("deleteAll");
  if (categoriesData.length > 0) {
    btnDelete.innerHTML = `
      <button onclick="deleteAll()">Delete All (${categoriesData.length})</button>
    `;
  } else {
    btnDelete.innerHTML = "";
  }
}
showData();

function deleteAll() {
  localStorage.removeItem("categories");
  categoriesData.splice(0);
  clearData();
  showData();
}

function deleteData(i) {
  categoriesData.splice(i, 1);
  localStorage.setItem("categories", JSON.stringify(categoriesData)); // تأكد من حفظ التغييرات
  showData();
}

function updateData(i) {
  console.log(categoriesData[i]);
  cat_Name.value = categoriesData[i].name.toLowerCase();
  description.value = categoriesData[i].description;
  submit.innerHTML = "Update";
  mood = "update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}
