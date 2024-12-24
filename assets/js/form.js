onload=function(){
    const regForm=document.forms['RegForm'];
    const username=document.forms['RegForm']['username'];
    const password=document.forms['RegForm']['password'];
    const email=document.forms['RegForm']['email'];
    const confPass=document.forms['RegForm']['conf-password'];
    const phone=document.forms['RegForm']['phone'];
    let users = JSON.parse(localStorage.getItem("users")) || [];
    
    function addUser() {
        const user = {
            username: username.value,
            email: email.value,
            password: password.value,
            phone: phone.value,
            isAdmin: 0
        }
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));
    }

    regForm.onsubmit=function(){
        let isValid=true;
        if(checkEmpty(username.value)){
            isValid = false;
            displayError(username,"Full Name Is Required.");
        }else if(!checkFullname(username.value)){
            displayError(username,"Please enter a valid fullname.");
            isValid = false;
        }else{
            displayError(username,"");
        }

        if(checkEmpty(email.value)){
            isValid = false;
            displayError(email,"Email Is Required.");
        }else if(!checkEmail(email.value)){
            displayError(username,"Please enter a valid email.");
            isValid = false;
        }else if(checkEmailExist(users, email.value)){
            displayError(email,"Email Exist.");
            isValid = false;
        }else{
            displayError(email,"");
        }
        if(checkEmpty(phone.value)){
            isValid = false;
            displayError(phone,"Phone Is Required.");
        }else if(!checkPhone(phone.value)){
            displayError(phone,"Please enter a valid Phone.");
            isValid = false;
        }else if(checkPhoneExist(users, phone.value)){
            displayError(phone,"Phone Exist.");
            isValid = false;
        }else{
            displayError(phone,"");
        }
        if(checkEmpty(password.value)){
            isValid = false;
            document.querySelector("#password-error").innerText="Password Is Required.";
        }else if(password.value.length < 8){
            document.querySelector("#password-error").innerText="Please enter a valid password.";
            isValid = false;
        }else{
            document.querySelector("#password-error").innerText="";
        }
        if(password.value != confPass.value){
            isValid=false;
            document.querySelector("#confPass-error").innerText="Password & Conf Password not Equal.";
        }else{
            document.querySelector("#confPass-error").innerText="";
        }
        if(isValid == true){
            addUser();
        }
        return isValid;
    }
}