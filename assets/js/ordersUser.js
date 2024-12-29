let orderStatus = localStorage.getItem("orderStatus") ? JSON.parse(localStorage.getItem("orderStatus")) : [];

const tableHeader = document.getElementById("tableHeader");
const tableBody = document.getElementById("tableBody");
//SHOW DATA IN TABLE
if (orderStatus.length > 0) {
  tableHeader.innerHTML = "<th>Num</th>";

  Object.keys(orderStatus[0]).forEach(key => {
    let th = document.createElement("th");
    th.textContent = key.charAt(0).toUpperCase() + key.slice(1); 
    tableHeader.appendChild(th);
  });

}

orderStatus.forEach((order, index) => {
  let row = document.createElement("tr");
  row.classList.add(".row")

  let sequenceCell = document.createElement("td");
  sequenceCell.textContent = index + 1;
  row.appendChild(sequenceCell);

  Object.values(order).forEach(value => {
    let cell = document.createElement("td");
    cell.textContent = value;
    row.appendChild(cell);
  });

  tableBody.appendChild(row);
});
//PRICE
const priceDiv = document.querySelector(".price-box");
orderStatus

let total = 0;
orderStatus.forEach((product) => {
    if(product.status==="Confirmed"){
        let price=parseFloat(product.price.replace("le", ""));
        total +=price;
    }
});
total = total.toFixed(2);
priceDiv.textContent= " Total :$" + total;
console.log(total);
 