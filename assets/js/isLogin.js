let userEmail = sessionStorage.getItem('userEmail');
if(!(userEmail)){
    location.assign("login.html");
}