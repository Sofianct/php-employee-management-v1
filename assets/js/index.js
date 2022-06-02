const formLogin = document.getElementById("login");

//submit form
// formLogin.addEventListener('submit', (e) => {
//     e.preventDefault();

//     const url = "./src/library/loginController.php";
//     // const data = {};
//     const formData = new FormData(e.target);
//     //convert form data to json
//     // formData.forEach((value, key) => (data[key] = value));
//     sendDataForm(url, formData);

// });


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

//display employees table
async function getEmployees() {
    const res = await fetch('./library/employeeController.php');
    const data = await res.json();
    data.forEach(employee => {
        const tbody = document.getElementById('tbody');
        const tr = document.createElement('tr');
        const imgtd = document.createElement('td');
        const img = document.createElement('img');
        const name = document.createElement('td');
        const email = document.createElement('td');
        const age = document.createElement('td');
        const streetNo = document.createElement('td');
        const city = document.createElement('td');
        const state = document.createElement('td');
        const posCode = document.createElement('td');
        const phNumber = document.createElement('td');
        const btns = document.createElement('td');
        const editBtn = document.createElement('button');
        const deleteBtn = document.createElement('button');
        const editIcon = document.createElement('i');
        const deleteIcon = document.createElement('i');

        editIcon.classList.add('fa-solid', 'fa-pen-to-square', 'link-dark', 'p-2');
        deleteIcon.classList.add('fa-solid', 'fa-trash-can', 'link-dark');
        editBtn.classList.add('btn', 'btn-link');
        deleteBtn.classList.add('btn', 'btn-link');
        editBtn.appendChild(editIcon);
        deleteBtn.appendChild(deleteIcon);
        btns.append(editBtn, deleteBtn);

        img.setAttribute('src', 'https://mdbootstrap.com/img/new/avatars/8.jpg');
        img.classList.add('rounded-circle');
        img.style.width = "45px";
        img.style.height = "45px";
        imgtd.appendChild(img);

        name.textContent = employee.name + ' ' + employee.lastName;
        email.textContent = employee.email;
        age.textContent = employee.age;
        streetNo.textContent = employee.streetAddress;
        city.textContent = employee.city;
        state.textContent = employee.state;
        posCode.textContent = employee.postalCode;
        phNumber.textContent = employee.phoneNumber;

        tr.append(imgtd, name, email, age, streetNo, city, state, posCode, phNumber, btns);
        tbody.append(tr);
    });
}



getEmployees();