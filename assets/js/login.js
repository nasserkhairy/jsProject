onload=function(){
    const regForm=document.forms['RegForm'];
    const password=document.forms['RegForm']['password'];
    const email=document.forms['RegForm']['email'];
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let user;
    let userEmail = sessionStorage.getItem('userEmail');

    if((userEmail)){
        location.assign("user.html");
    }

    function checkUser() {
        return (users.find(user => user.email === email.value && user.password === password.value));
    }

    regForm.onsubmit=function(){
        if(user = checkUser()){
            sessionStorage.setItem("userEmail", user.email);
            sessionStorage.setItem("isAdmin", user.isAdmin);
            if(user.isAdmin == 0){
                regForm.action="user.html";
            }else if(user.isAdmin == 1){
                regForm.action="admin/index.html";
            }
        }else{
            document.querySelector("#email-error").innerText="Invalid Email Or Password";
            return false;
        } 
    }    
}