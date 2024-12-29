
let orderStatus = localStorage.getItem("orderStatus") ? JSON.parse(localStorage.getItem("orderStatus")) : [];

const tableHeader = document.getElementById("tableHeader");
const tableBody = document.getElementById("tableBody");

if (orderStatus.length > 0) {
  tableHeader.innerHTML = "<th>Num</th>";

  Object.keys(orderStatus[0]).forEach(key => {
    let th = document.createElement("th");
    th.textContent = key.charAt(0).toUpperCase() + key.slice(1); // العنوان
    tableHeader.appendChild(th);
  });

  let actionsHeader = document.createElement("th");
  actionsHeader.textContent = "Actions";
  actionsHeader.classList = "Actions";
  tableHeader.appendChild(actionsHeader);
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

  let actionCell = document.createElement("td");

  let editButton = document.createElement("button");
  editButton.textContent = "Confirm";
  editButton.classList.add("btn", "btn-primary", "me-2","mb-4","confirm-btn");
  actionCell.appendChild(editButton);

  let deleteButton = document.createElement("button");
  deleteButton.textContent = "Reject ";
  deleteButton.classList.add("btn", "btn-danger","reject-btn");
  actionCell.appendChild(deleteButton);

  row.appendChild(actionCell);

  tableBody.appendChild(row);
});

// // =============  EVENTS  =============

let confirmBtn=document.querySelectorAll(".confirm-btn");
confirmBtn.forEach((btn)=>{
    btn.addEventListener("click",confirmCase);
});
let rejectBtn=document.querySelectorAll(".reject-btn");
rejectBtn.forEach((btn)=>{
    btn.addEventListener("click",rejectCase);
});

// // ============= HANDLE EVENTS FUNCTIONS =============

function confirmCase(event){
 
    const row = event.target.closest("tr");
    row.cells[4].innerText="Confirmed";
    showAlert("The order has been accepted.","success");
    let index=parseInt(row.cells[0].innerText);
    orderStatus[index-1].status="Confirmed";
    localStorage.setItem("orderStatus",JSON.stringify(orderStatus));

};

function rejectCase(event){
    const row = event.target.closest("tr");
    row.cells[4].innerText="Reject";
    showAlert("The order was rejected.","danger");
    let index=parseInt(row.cells[0].innerText);
    orderStatus[index-1].status="Reject";
    localStorage.setItem("orderStatus",JSON.stringify(orderStatus));

}
localStorage.setItem("orderStatus",JSON.stringify(orderStatus));
// console.log(orderStatus);
// =============== ALERT ====================

function showAlert(message, type = "success", timeout = 3000) {

    const alertBox = document.querySelector("#alert-box");
    const alertElement = document.createElement("div");
    alertElement.className = `alert alert-${type} alert-dismissible fade show`;
    alertElement.setAttribute("role", "alert");
    alertElement.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="X"></button>
    `;
    alertBox.appendChild(alertElement);
  
    if (timeout > 0) {
        setTimeout(() => {
            const bsAlert = new bootstrap.Alert(alertElement);
            bsAlert.close();
        }, timeout);
    }
  }