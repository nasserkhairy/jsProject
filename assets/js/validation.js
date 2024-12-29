function checkEmpty(value){
    if(value == ""){
        return true;
    }
}
/* fullname validation */ 
function checkFullname(value){
    let fullnamePattern=/^[A-Za-z ]{3,}$/;
    return fullnamePattern.test(value);
}
/* email validation */ 
function checkEmail(value){
    let emailPattern=/^[A-za-z0-9]+@[A-za-z0-9]+\.[a-zA-Z]{2,}$/; 
    return emailPattern.test(value);
}
function checkEmailExist(users , email) { // [{},{}]
    if (users.find(user => user.email === email)) {
        return true;
    }
}
/* phone validation */ 
function checkPhone(value){
    let phonePattern=/^(010|012|015|011)[0-9]{8}$/; 
    return phonePattern.test(value);
}
function checkPhoneExist(users , phone) {
    if (users.find(user => user.phone === phone)) {
        return true;
    }
}
/* password validation */ 
// function checkPassword(value){
//     let passPattern=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/; 
//     return passPattern.test(value);
// }

function displayError(input,message){
    input.nextElementSibling.innerText=message;
}