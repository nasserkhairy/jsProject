
let wishing=(localStorage.getItem("wishing")) ? JSON.parse(localStorage.getItem("wishing")):[];
const wish = document.querySelector(".wish");

// // ===============  PREVIOUS DATA ===============
// localStorage.getItem("wishing");
wishing.forEach((elm)=>{
  // Add product to cart
  let cartBoxElement = CartBoxComponent(elm.title, elm.price,  elm.imgSrc);
  let newNode = document.createElement("div");
  newNode.innerHTML = cartBoxElement;
  const cartContent = wish.querySelector(".wish-content");
  cartContent.appendChild(newNode);

});
// // ===============  EVENTS ===============
//ADD TO WISH
let addWish_btns = document.querySelectorAll(".add-wish");

addWish_btns.forEach((btn) => {
  btn.addEventListener("click", handle_wishingItem);
});
//REMOVE FROM WISH
let wishRemove_btns = document.querySelectorAll(".wish-remove");
wishRemove_btns.forEach((btn) => {
  btn.addEventListener("click",handle_removeWISHItem);
});

//ADD TO CARD
const AddToCard_btn = document.querySelector("#add-to-cart");
AddToCard_btn.addEventListener("click", handle_addToCart);

// // ===============  HANDEL EVENTS ===============
function handle_wishingItem() {
    let product = this.parentElement;
    let title = product.querySelector(".product-title").innerHTML;
    let price = product.querySelector(".product-price").innerHTML;
    let imgSrc = product.querySelector(".product-img").src;
    console.log(title, price, imgSrc);
  
    let newToAdd = {
      title,
      price,
      imgSrc,
    };
  
    // handle item is already exist
    if (wishing.find((el) => el.title == newToAdd.title)) {
      showAlert("This Item Is Already Exist!","info");
      return;
    } else {
      // update local storge and array
      wishing.push(newToAdd);
      localStorage.setItem("wishing",JSON.stringify(wishing));
      console.log(wishing);
    }
    
    // Add product to wish
    let wishBoxElement = CartBoxComponent(title, price, imgSrc);
  
    let newNode = document.createElement("div");
    newNode.innerHTML = wishBoxElement;
    const wishContent = wish.querySelector(".wish-content");
    wishContent.appendChild(newNode);
    //handel delete
    handle_removeWISHItem();
  }

  
  //REMOVE
  function handle_removeWISHItem() {
    this.parentElement.remove();
    wishing = wishing.filter(
      (el) =>
        el.title != 
        this.parentElement.querySelector(".cart-product-title").innerHTML
    );
    showAlert("Item Deleted successfully","danger")
    localStorage.setItem("wishing",JSON.stringify(wishing));
  
  }
  //ADD TO CARD
  function handle_addToCart() {
    if (!wishing || wishing.length <= 0) {
      showAlert("Your wishing list is empty. Please add items.", "info");
    }
  else{


    let contant=wish.querySelector(".wish-content");
    contant.innerHTML="";
    showAlert("You have successfully transferred to the shopping cart.", "success");
    let wishToCard=[...wishing];
    wishing = [];
    localStorage.setItem("wishToCard", JSON.stringify(wishToCard));
    localStorage.setItem("wishing", JSON.stringify(wishing));

    }
  
  }
  
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

  // // ===============  FUNCTION ===============

  function CartBoxComponent(title, price, imgSrc) {
    return `
      <div class="cart-box">
          <img src=${imgSrc} alt="" class="cart-img">
          <div class="detail-box">
              <div class="cart-product-title">${title}</div>
              <div class="cart-price">${price}</div>
          </div>
          <!-- REMOVE CART  -->
          <i class='bx bxs-trash-alt wish-remove'></i>
      </div>`;
  }