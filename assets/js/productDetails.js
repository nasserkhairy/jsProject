//        <img src="${imgSrc}" alt="product image" class="img-fluid mb-3">
//     let imgSrc = product.querySelector(".product-img").src;
// let product=(localStorage.getItem("product")) ? JSON.parse(localStorage.getItem("product")):[];
 // بيانات المنتج (يمكنك استبدالها ببيانات ديناميكية)
    // const productDetails = {
    //   title: product.querySelector(".product-title").innerHTML;
    //   description: "This is an amazing product with outstanding features.",
    //   price: "200 LE",
    //   image: "https://via.placeholder.com/150", // صورة المنتج
    // };
    // let product = this.parentElement;
// function handle_displayDetailsProduct() {
    function handle_displayDetailsProduct(event) {

    const productBox = event.target.closest(".product-box");

    let title = productBox.querySelector(".product-title").innerText;
    let price = productBox.querySelector(".product-price").innerText;
    let description = productBox.querySelector(".product-description").innerText;
    let category= productBox.querySelector(".product-category").innerText;
    // .innerText;

    const modalBody = document.getElementById("modal-body");
    modalBody.innerHTML = `
      <div class="text-center">
        <h4>${title}</h4>
         <p>${description}</p>
         <p>${category}</p>
        <p class="fw-bold">Price: ${price}</p>
      </div>
    `;
  
    const modal = new bootstrap.Modal(document.getElementById("productModal"));
    modal.show();
  }
  


// const detailsDiv=document.querySelector("#product-details");


// function handle_displayDetailsProduct(){
//     window.location.href = "productDetails.html";
//     document.write(samar);
//     let product = document.createElement("h2");
//     let samar=product.textContent = "Details pro"; 
//     // detailsDiv.appendChild(product); 
//     console.log("details");
// }


// function handle_displayDetailsProduct() {
//     let product = document.createElement("h2");
//     product.textContent = "Details pro";
//     console.log(product.textContent); // تنفيذ الكود
//     alert("Details pro"); // عرض نص المنتج
//     window.location.href = "productDetails.html"; // إعادة التوجيه بعد التنفيذ
//   }

// function handle_displayDetailsProduct() {
//   const link = document.createElement("a");
// link.href = "productDetails.html";
// link.target = "_self"; // استخدمي "_blank" لو عايزة صفحة جديدة
// document.body.appendChild(link);
// link.click();
// let product = document.createElement("h2");
//     product.textContent = "Details pro";
//     detailsDiv.appendChild(product); 

//     console.log(product); // تنفيذ الكود
// }