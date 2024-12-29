
const showPass=document.querySelectorAll(".showPass");
const logoutBtn=document.querySelector("#logout");
for(showPassItem of showPass){
    showPassItem.addEventListener("click",function(){
        if (this.previousElementSibling.type === "password") {
            this.previousElementSibling.type = "text";
            this.classList.remove("fa-eye");
            this.classList.add("fa-eye-slash");
        } else {
            this.previousElementSibling.type = "password";
            this.classList.remove("fa-eye-slash");
            this.classList.add("fa-eye");
        }
    })
}
if(logoutBtn){
  logoutBtn.addEventListener("click", function(e){
      e.preventDefault();
      sessionStorage.removeItem("userEmail");
      sessionStorage.removeItem("isAdmin");
      location.assign("login.html");
  })
}
//==================================================
let users=(localStorage.getItem("users")) ? JSON.parse(localStorage.getItem("users")):[];
let wishToCard=(localStorage.getItem("wishToCard")) ? JSON.parse(localStorage.getItem("wishToCard")):[];
let shopping=(localStorage.getItem("shopping")) ? JSON.parse(localStorage.getItem("shopping")):[];
shopping=[...shopping,...wishToCard];
let orders =[];


//SELECT ICONS FROM NAV
const userIcon = document.querySelector("#user-icon");
const signLlink=document.getElementById("sign-link");
const cart = document.querySelector(".cart");


// =============== CHECK IS USER ====================

if (localStorage.getItem("users")){
  signLlink.style.display="none";
  userIcon.classList.add("bx", "bx-user");
  // لحد هنا انا هابقي محتاجه اخد اسم الميتخدم اللى دلخل واعرض اسمه وصوره له فى البروفايل 
  // وهابقي محتاجه اعمل اتشيك على الزراير علشان ماتاخدش اكشن لو هو مش مستخدم
// محتاجين نضيف فى زرار jتسجيل الخروج ف اللبروفايل
}
// =============== PREVIOUS DATA ====================

//ADDING PREVIOUSLY ADDED PRODUCTS TO THE CARD
// localStorage.getItem("shopping");
shopping.forEach((elm)=>{
  // Add product to cart
  let cartBoxElement = CartBoxComponent(elm.title, elm.price,  elm.imgSrc);
  let newNode = document.createElement("div");
  newNode.innerHTML = cartBoxElement;
  const cartContent = cart.querySelector(".cart-content");
  cartContent.appendChild(newNode);
//HANDEL PRICE
  let cartBoxes = document.querySelectorAll(".cart-box");
  const totalElement = cart.querySelector(".total-price");
  let total = 0;
  cartBoxes.forEach((cartBox) => {
    let priceElement = cartBox.querySelector(".cart-price");
    let price = parseFloat(priceElement.innerHTML.replace("le", ""));
    // let quantity = cartBox.querySelector(".cart-quantity").value;
    // total += price * quantity;
  });
  total = total.toFixed(2);
  totalElement.innerHTML = "$" + total;
});


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

// =============== EVENTS  FOR ICONS====================

// OPEN & CLOSE USER PROFILE
const userCart=document.getElementById("user-cart");
const closeUser = document.querySelector("#user-close");

userIcon.addEventListener("click", () => {
  userCart.classList.add("active");
});

closeUser.addEventListener("click", () => {
  userCart.classList.remove("active");
});
// OPEN & CLOSE CART
const cartIcon = document.querySelector("#cart-icon");
const closeCart = document.querySelector("#cart-close");

cartIcon.addEventListener("click", () => {
  cart.classList.add("active");
});

closeCart.addEventListener("click", () => {
  cart.classList.remove("active");
});
// OPEN & CLOSE WISH CART
const wishIcon = document.querySelector("#wish-icon");
const wishCart=document.getElementById("wish-cart");
const closeWish = document.querySelector("#wish-close");

wishIcon.addEventListener("click", () => {
  wishCart.classList.add("active");
});

closeWish.addEventListener("click", () => {
  wishCart.classList.remove("active");
});
// =============== EVENTS  FOR filtration====================
const categoryfiltr = document.getElementById("categoryfiltr");
const categorylist = document.getElementById("categories");

            if (categoryfiltr && categorylist) {
              let categories = [...new Set(products.map(product => product.category))];
              categories.forEach(category => {
                  const catOpt = document.createElement("option");
                  catOpt.value = category;
                  catOpt.textContent = category;
                  categorylist.appendChild(catOpt);
              });

              // filtration event
              categoryfiltr.addEventListener("change", () => {
                  const selectedCategory = categoryfiltr.value;
                  const filteredProducts = products.filter(product => product.category === selectedCategory);
                  console.log(filteredProducts);
                  displayProducts(filteredProducts);
                  });
                }    


  
// // ===============  EVENTS ===============
const productBoxes = document.querySelectorAll(".product-img");
productBoxes.forEach((box) => {
  box.addEventListener("click", handle_displayDetailsProduct)
});

  // Add item to cart
  let addCart_btns = document.querySelectorAll(".add-cart");

  addCart_btns.forEach((btn) => {
    btn.addEventListener("click", handle_addCartItem);
  });

  // Change item quantity
let cartQuantity_inputs = document.querySelectorAll(".cart-quantity");
cartQuantity_inputs.forEach((input) => {
  input.addEventListener("change", handle_changeItemQuantity);
});


//  ADD EVENT TO CART BUTTON
let cartRemove_btns = document.querySelectorAll(".cart-remove");
cartRemove_btns.forEach((btn) => {
  btn.addEventListener("click", handle_removeCartItem);
});

  // Buy Order
  const buy_btn = document.querySelector(".btn-buy");
  buy_btn.addEventListener("click", handle_buyOrder);


// // ============= HANDLE EVENTS FUNCTIONS =============

function displayProducts(products) {
  const container = document.querySelector(".filter-container");
  // container.style.display = "block";
  // container.classList.add(".d-block");
  // تفريغ المحتوى القديم (إذا كان موجودًا)
  container.innerHTML = "";

  // إنشاء بطاقات المنتجات
  products.forEach(product => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-box");

    productCard.innerHTML =`
    <img src="admin/assets/images/${product.image}" alt="" class="product-img">
    <h2 class="product-title">${product.name}</h2>
    <span class="product-price">${product.price} le</span>
    <span class="product-description">${product.description}</span>
    <span class="product-category">${product.category}</span>
    <i class='bx bx-shopping-bag add-cart'></i>
    <i class='bx bx-heart add-wish'></i>
`;

    // إضافة البطاقة إلى الحاوية
    container.appendChild(productCard);
  });
}
//ADD TO CARD

function handle_addCartItem() {
  let product = this.parentElement;
  let title = product.querySelector(".product-title").innerHTML;
  let price = product.querySelector(".product-price").innerHTML;
  let imgSrc = product.querySelector(".product-img").src;

  let newToAdd = {
    title,
    price,
    imgSrc,
  };

  // handle item is already exist
  if (shopping.find((el) => el.title == newToAdd.title)) {
    showAlert("This Item Is Already Exist!","primary");
    return;
  } else {
    // update local storge and array
    shopping.push(newToAdd);
    localStorage.setItem("shopping",JSON.stringify(shopping));
    console.log(shopping);
  }
  
  // Add product to cart
  cartBoxElement = CartBoxComponent(title, price, imgSrc);
  newNode = document.createElement("div");
  newNode.innerHTML = cartBoxElement;
  const cartContent = cart.querySelector(".cart-content");
  cartContent.appendChild(newNode);
  //handel delete
  handle_removeCartItem();
}

//REMOVE FROM CARD
function handle_removeCartItem() {
  this.parentElement.remove();
  shopping = shopping.filter(
    (el) =>
      el.title != 
      this.parentElement.querySelector(".cart-product-title").innerHTML
  );
  localStorage.setItem("shopping",JSON.stringify(shopping));
  let cartBoxes = document.querySelectorAll(".cart-box");
  const totalElement = cart.querySelector(".total-price");
  let total = 0;
  cartBoxes.forEach((cartBox) => {
    let priceElement = cartBox.querySelector(".cart-price");
    let price = parseFloat(priceElement.innerHTML.replace("le", ""));
    let quantity = cartBox.querySelector(".cart-quantity").value;
    total += price * quantity;
  });
  total = total.toFixed(2);
  totalElement.innerHTML = "$" + total;
  
}

function handle_changeItemQuantity() {
  if (isNaN(this.value) || this.value < 1) {
    this.value = 1;
  }
  this.value = Math.floor(this.value); // to keep it integer
}

//MAKE ORDEE

function handle_buyOrder() {
  if (!shopping || shopping.length <= 0) {
    showAlert("Your shopping cart is empty. Please add items before placing an order.", "info");
  }
else{
  orders= [ ...shopping]; 
  shopping = [];
  localStorage.removeItem("shopping");
  localStorage.setItem("Order", JSON.stringify(orders));
  let contant=cart.querySelector(".cart-content");
  contant.innerHTML="";
  total=0;
  showAlert("Order created successfully! Waiting for confirmation.", "success");
  
  let orderStatus=[];
  orders.forEach(order => {
    delete order.imgSrc; 
  });
  
   orderStatus = orders.map(order => {
    return { ...order, status: "pending " }; 
  });
  localStorage.setItem("orderStatus",JSON.stringify(orderStatus))
  console.log(orderStatus);
  }

}

// // ============= HTML COMPONENTS =============
function CartBoxComponent(title, price, imgSrc) {
  return `
    <div class="cart-box">
        <img src=${imgSrc} alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <!-- REMOVE CART  -->
        <i class='bx bxs-trash-alt cart-remove'></i>
    </div>`;
}
