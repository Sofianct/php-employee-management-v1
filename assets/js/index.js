//Variables Login
const formLogin = document.getElementById("login");

//Variables Dashboard Frame
const editButtons = document.querySelectorAll("[data-edit]");
const deleteButtons = document.querySelectorAll("[data-delete]");


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


//send data form to logincontroller.php and handle response
async function sendDataForm(url, dataForm) {

    const response = await fetch(url, {
        method: 'post',
        body: dataForm
    });

    const data = await response.text();

    if (data == true) {
        window.location.href = "./src/dashboard.php";
    } else {
        console.log("error");
        const loginError = document.getElementById("loginError");
        loginError.classList.add("show");
        loginError.textContent = "Wrong email or password";
    }

};

//Add edit event listener to all edit buttons

//Add delete event listener to all delete buttons
