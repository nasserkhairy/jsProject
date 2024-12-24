
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
    logoutBtn.addEventListener("click", function(){
        sessionStorage.removeItem("userEmail");
        sessionStorage.removeItem("isAdmin");
        location.assign("login.html");
    })
}