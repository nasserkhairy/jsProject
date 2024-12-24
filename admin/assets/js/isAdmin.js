let userEmail = sessionStorage.getItem('userEmail');
let isAdmin = sessionStorage.getItem('isAdmin');
if(!(userEmail && isAdmin == 1)){
    location.assign("../login.html");
}