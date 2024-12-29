let userEmail = sessionStorage.getItem('userEmail');
let isAdmin = sessionStorage.getItem('isAdmin');
const logoutBtn=document.querySelector("#logout");
if(!(userEmail && isAdmin == 1)){
    location.assign("../login.html");
}
if(logoutBtn){
    logoutBtn.addEventListener("click", function(e){
        e.preventDefault();
        sessionStorage.removeItem("userEmail");
        sessionStorage.removeItem("isAdmin");
        location.assign("../login.html");
    })
}