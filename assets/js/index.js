const formLogin = document.getElementById("login");

//submit form
formLogin.addEventListener('submit', (e) => {
    e.preventDefault();

    const url = "./src/library/loginController.php";
    // const data = {};
    const formData = new FormData(e.target);
    //convert form data to json
    // formData.forEach((value, key) => (data[key] = value));
    sendDataForm(url, formData);

});

//send post data form to loginController.php
const sendDataForm = async ((url, data) => {
    
    const response = await fetch(url, {
        method : 'post',
        // headers: {"content-type":"application/json"},
        body : data
    });


    const data = await response.text();

    if(data == true) {
        window.location.href = "./src/dashboard.php";
    }else{
        console.log("error");
    }

});


    
fetch(url, {
    method : 'post',
    // headers: {"content-type":"application/json"},
    body : data
}).then((response) => {
    response.text();
}).then((text) => {
    console.log(text);
}).catch((error) => {
    console.log(error);
    const loginError = document.getElementById("loginError");
    loginError.classList.add("show");
    loginError.textContent = error.message;
})