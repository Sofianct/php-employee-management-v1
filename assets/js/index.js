//Variables URL PHP Controller
const deleteButtonModal = document.getElementById("deleteBtnModal");
const idInputModal = document.getElementById("idEmployee");
const newEmployeeButton = document.getElementById("newEmployee");
const urlController = "./library/employeeController.php";
const urlControllerGet = "./library/employeeController.php?id=";
const urlSessionHelper = "./library/sessionHelper.php";
const urlLoginController = './library/loginController.php';
const formUpdateEmployee = document.getElementById('updateEmployee');

// Toastr Options Library
toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": true,
    "progressBar": false,
    "positionClass": "toast-top-center",
    "preventDuplicates": true,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "3000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}


window.onload = async () => {

    await getEmployees(); //print employees

    initializeCreateButton();
    initializeUpdateButtons();
    initializeDeleteButtons();
    initializeRowsListener();
    logOut();

    //check session activity every 10 seconds
    const checkSession = async () => {
        const response = await fetch(urlSessionHelper, {
            method: 'POST'
        });

        const data = await response.text();

        if (data == 1) {
            window.location.href = "../index.php?sessionExpired";
        }
    }

    setInterval(() => {
        checkSession();
    }, 10000) //every ten seconds

    //initialize create button
    function initializeCreateButton() {
        newEmployeeButton.addEventListener("click", () => {
            createNewRowEmployee();
        });
    }

    //initialize update buttons to all rows table
    function initializeUpdateButtons() {
        const editButtons = document.querySelectorAll("[data-edit]");
        // Add edit event listener to all edit buttons
        Array.from(editButtons).map(btn => {
            btn.addEventListener('click', async (e) => {
                e.stopPropagation();
                const employeeId = e.target.parentElement.getAttribute('data-id'); //get ID
                const employee = await getEmployee(employeeId); //get data employee
                showEditRow(employee, employeeId); //show edit form row
            });
        });
    };

    //initialize delete buttons to all rows table
    function initializeDeleteButtons() {
        const deleteButtons = document.querySelectorAll("[data-delete]");
        // Add delete event listener to all delete buttons
        Array.from(deleteButtons).map(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const employeeId = e.target.parentElement.getAttribute('data-id');
                deleteEmployee(employeeId);
            });
        });
    }

    //initialize add event listener table rows
    function initializeRowsListener() {
        const rowBtn = document.querySelectorAll('[data-row]');

        Array.from(rowBtn).map(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.parentElement.getAttribute('data-row');
                window.document.location = '../src/employee.php' + '?listId=' + id;
            });
        });
    }

    //display employees table
    async function getEmployees() {
        const res = await fetch(urlController, {
            method: 'GET',
            headers: {
                "content-type": "application/json",
            }
        });
        const data = await res.json();
        //console.log(data);
        data.forEach(employee => {
            const tbody = document.getElementById('tbody');
            const tr = document.createElement('tr');
            tr.dataset.row = employee.id;
            const imgtd = document.createElement('td');
            const img = document.createElement('img');
            const name = document.createElement('td');
            const lastName = document.createElement('td');
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
            editBtn.dataset.edit = "";
            editBtn.dataset.id = employee.id;
            editBtn.classList.add('btn', 'btn-link');
            deleteBtn.dataset.delete = "";
            deleteBtn.dataset.id = employee.id;
            deleteBtn.classList.add('btn', 'btn-link');
            editBtn.appendChild(editIcon);
            deleteBtn.appendChild(deleteIcon);
            btns.append(editBtn, deleteBtn);

            img.setAttribute('src', employee.image);
            img.classList.add('rounded-circle');
            img.style.width = "45px";
            img.style.height = "45px";
            imgtd.appendChild(img);

            name.textContent = employee.name;
            lastName.textContent = employee.lastName;
            email.textContent = employee.email;
            age.textContent = employee.age;
            streetNo.textContent = employee.streetAddress;
            city.textContent = employee.city;
            state.textContent = employee.state;
            posCode.textContent = employee.postalCode;
            phNumber.textContent = employee.phoneNumber;

            tr.append(imgtd, name, lastName, email, age, streetNo, city, state, posCode, phNumber, btns);
            tbody.append(tr);
        });
    }

    //create new form row employee
    function createNewRowEmployee() {
        newEmployeeButton.disabled = true; //avoid add new row

        const firstRow = document.querySelector("tbody tr:first-child");
        const tr = document.createElement("tr");
        tr.id = "newEmployeeRow";
        //for each td insert input form
        tr.innerHTML = `<form action="" method="post" id="newFormRow"><td><img src="../assets/images/default.jpg" class="rounded-circle" style="width: 45px; height: 45px;"></td>
            <td><input form="newFormRow" type="text" name="name" class="form-control"></td>
            <td><input form="newFormRow" type="text" name="lastName" class="form-control"></td>
            <td><input form="newFormRow" type="email" name="email" class="form-control"></td>
            <td><input form="newFormRow" type="number" name="age" class="form-control"></td>
            <td><input form="newFormRow" type="text" name="streetAddress" class="form-control"></td>
            <td><input form="newFormRow" type="text" name="city" class="form-control"></td>
            <td><input form="newFormRow" type="text" name="state" class="form-control">
            <td><input form="newFormRow" type="text" name="postalCode" class="form-control">
            </td><td><input form="newFormRow" type="tel" name="phoneNumber" class="form-control"></td>
            <td><div class="d-flex justify-content-center">
            <button id="btnCreate" type="submit" form="newFormRow" class="btn btn-link"><i class="fa-solid fa-circle-check link-dark p-2"></i></button>
            <button id="btnCancel" class="btn btn-link"><i class="fa-solid fa-circle-xmark link-dark p-2"></i></button>
            </div></td></form>`;

        firstRow.insertAdjacentElement("beforebegin", tr);

        //submit form for create employee
        const formEditEmployee = document.getElementById("newFormRow");
        formEditEmployee.addEventListener("submit", async (e) => {

            e.preventDefault();
            const formData = new FormData(e.target);
            //convert form data to json
            let jsonData = Object.fromEntries(formData.entries());
            const createdEmployee = await createEmployee(jsonData); //get updated data
            //re-print table
            if (createdEmployee) {
                displayNewEmployee(createdEmployee);
                newEmployeeButton.disabled = false;
            }
        })

        //remove form edit row and show employeeRow
        const cancelEditButton = document.getElementById("btnCancel");
        cancelEditButton.addEventListener("click", () => {
            cancelCreateEmployee();
            newEmployeeButton.disabled = false;
        });

    }

    //fetch to create employee
    async function createEmployee(formData) {
        const response = await fetch(urlController, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(formData),
        });
        if (!response.ok) {
            toastr.error('There was an error in the request. Please refresh the borwser and try again.')
            return null;
        }
        const data = await response.json();
        console.log(data);
        if (data.id) {
            toastr.success('Employee successfully created!')
            return data;
        } else {
            const errors = Object.values(data);
            let message = "";
            errors.map((error) => {
                if (error !== "") {
                    message += (error + "</br>");
                }
            });
            //give error style after invalid inputs
            const formEditEmployee = document.getElementById("newEmployeeRow");
            const dataFormInput = formEditEmployee.querySelectorAll("td>input");
            formEditEmployee.classList.add("errorValidation__tr");
            Array.from(dataFormInput).map((td) => {
                td.classList.add("errorValidation__td");
            });
            toastr.warning(`${message}`);
        }
    }

    function displayNewEmployee(newEmployee) {

        cancelCreateEmployee(); //remove add new employee form

        const newRowEmployee = document.createElement("tr");
        newRowEmployee.dataset.row = newEmployee.id;

        const firstRow = document.querySelector("tbody tr:first-child");

        newRowEmployee.innerHTML = `<td><img src="${newEmployee.image}" class="rounded-circle" style="width: 45px; height: 45px;"></td>
        <td>${newEmployee.name}</td>
        <td>${newEmployee.lastName}</td>
        <td>${newEmployee.email}</td>
        <td>${newEmployee.age}</td>
        <td>${newEmployee.streetAddress}</td>
        <td>${newEmployee.city}</td>
        <td>${newEmployee.state}</td>
        <td>${newEmployee.postalCode}</td>
        <td>${newEmployee.phoneNumber}</td>
        <td><button data-edit="" data-id="${newEmployee.id}" class="btn btn-link"><i class="fa-solid fa-pen-to-square link-dark p-2"></i></button><button data-delete="" data-id="${newEmployee.id}" class="btn btn-link"><i class="fa-solid fa-trash-can link-dark"></i></button></td>`;

        firstRow.insertAdjacentElement("beforebegin", newRowEmployee);

        //initialize delete and edit buttons for all the table
        initializeUpdateButtons();
        initializeDeleteButtons();
        initializeRowsListener();
    }

    //cancel inline create employee
    function cancelCreateEmployee() {
        //remove new employee row
        const rowForm = document.getElementById("newEmployeeRow");
        rowForm.remove();
    }

    //get data employee
    async function getEmployee(id) {

        const response = await fetch(`${urlControllerGet}${id}`, {
            method: 'GET',
            headers: {
                "content-type": "application/json",
            }
        });
        if (!response.ok) {
            toastr.error('There was an error in the request. Please refresh the borwser and try again.')
            return null;
        }
        const data = await response.json();
        console.log(data);
        return data;

    }

    //show edit form in row target
    function showEditRow(employee, id) {
        // const idRow = `row${id}`;
        const employeeRow = document.querySelector(`[data-row="${id}"]`);
        //get all data from tr
        const editRow = document.createElement("tr");
        editRow.id = "formRow";

        //for each td insert input form
        editRow.innerHTML = `<form action="" method="post" id="editFormRow"><td><img src="${employee.image}" class="rounded-circle" style="width: 45px; height: 45px;"></td>
            <td><input value = "${employee.name}" form="editFormRow" type="text" name="name" class="form-control"></td>
            <td><input value = "${employee.lastName}" form="editFormRow" type="text" name="lastName" class="form-control"></td>
            <td><input value = "${employee.email}" form="editFormRow" type="email" name="email" class="form-control"></td>
            <td><input value = "${employee.age}" form="editFormRow" type="number" name="age" class="form-control"></td>
            <td><input value = "${employee.streetAddress}" form="editFormRow" type="text" name="streetAddress" class="form-control"></td>
            <td><input value = "${employee.city}" form="editFormRow" type="text" name="city" class="form-control"></td>
            <td><input value = "${employee.state}" form="editFormRow" type="text" name="state" class="form-control">
            <td><input value = "${employee.postalCode}" form="editFormRow" type="text" name="postalCode" class="form-control">
            </td><td><input value = "${employee.phoneNumber}" form="editFormRow" type="tel" name="phoneNumber" class="form-control"></td>
            <td><div class="d-flex justify-content-center">
            <button id="btnUpdate" type="submit" form="editFormRow" class="btn btn-link"><i class="fa-solid fa-circle-check link-dark p-2"></i></button>
            <button id="btnCancel" class="btn btn-link"><i class="fa-solid fa-circle-xmark link-dark p-2"></i></button>
            </div></td></form>`;

        employeeRow.parentElement.insertAdjacentElement("afterbegin", editRow);
        toogleDisplay(employeeRow);

        //submit form for editting employee
        const formEditEmployee = document.getElementById("editFormRow");
        formEditEmployee.addEventListener("submit", async (e) => {

            e.preventDefault();
            const formData = new FormData(e.target);
            //convert form data to json
            let jsonData = Object.fromEntries(formData.entries());
            //insert id
            jsonData = {
                "id": id,
                ...jsonData
            };

            const employeeUpdated = await updateEmployee(jsonData); //get updated data
        })

        //remove form edit row and show employeeRow
        const cancelEditButton = document.getElementById("btnCancel");
        cancelEditButton.addEventListener("click", () => {
            cancelUpdateEmployee(employeeRow);
        });

    }

    //fetch to edit employee
    async function updateEmployee(formData) {

        const response = await fetch(urlController, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(formData),
        });
        if (!response.ok) {
            toastr.error('There was an error in the request. Please refresh the borwser and try again.')
            return null;
        }
        const data = await response.json();
        console.log(data);
        if (data.id) {
            toastr.success('Employee succesfully updated!')
            displayUpdatedRow(data); //modified trow current employee;
        } else {
            const errors = Object.values(data);
            let message = "";
            errors.map((error) => {
                if (error !== "") {
                    message += (error + "</br>");
                }
            });
            //give error style after invalid inputs
            const formEditEmployee = document.getElementById("editFormRow").parentElement;
            const dataFormInput = formEditEmployee.querySelectorAll("td>input");
            console.log(dataFormInput);
            formEditEmployee.classList.add("errorValidation__tr");
            Array.from(dataFormInput).map((td) => {
                td.classList.add("errorValidation__td");
            });
            toastr.warning(`${message}`);
        }

    }

    //display employee row updated
    function displayUpdatedRow(employee) {

        const employeeRow = document.querySelector(`[data-row="${employee.id}"]`);
        const dataEmployeeRow = employeeRow.childNodes;

        dataEmployeeRow[1].textContent = employee.name;
        dataEmployeeRow[2].textContent = employee.lastName;
        dataEmployeeRow[3].textContent = employee.email;
        dataEmployeeRow[4].textContent = employee.age;
        dataEmployeeRow[5].textContent = employee.streetAddress;
        dataEmployeeRow[6].textContent = employee.city;
        dataEmployeeRow[7].textContent = employee.state;
        dataEmployeeRow[8].textContent = employee.postalCode;
        dataEmployeeRow[9].textContent = employee.phoneNumber;

        //toggle row
        toogleDisplay(employeeRow);

        //delete row form input
        const formRow = document.getElementById("formRow");
        formRow.remove();

    }

    //cancel inline update employee
    function cancelUpdateEmployee(employeeRow) {
        //remove row form
        const rowForm = document.getElementById("formRow");
        rowForm.remove();
        //show default current row
        toogleDisplay(employeeRow);
    }

    //open modal and assign id to hidden input
    async function deleteEmployee(id) {
        //get info to open modal
        idInputModal.value = id;
        const deleteModal = document.getElementById("myModal");
        let ModalEdit = new bootstrap.Modal(deleteModal, {}).show();
    }

    //delete employee from modal button
    deleteButtonModal.addEventListener("click", async (e) => {
        await fetchDeleteEmployee(idInputModal.value);
        const rowEmployee = document.querySelector(`[data-row="${idInputModal.value}"]`);
        //remove employee row
        console.log(rowEmployee);
        rowEmployee.remove();
    });

    //fetch to delete employee
    async function fetchDeleteEmployee(id) {

        const response = await fetch(urlController, {
            method: "DELETE",
            body: id
        });
        if (!response.ok) {
            toastr.error('There was an error in the request. Please refresh the borwser and try again.')
        }
        const data = await response.text();
        console.log(data);
        toastr.success('Employee succesfully deleted!')
        return id;
    }

    //log out button
    function logOut() {
        const logOutBtn = document.getElementById('logout');
        logOutBtn.addEventListener('click', async () => {
            const response = await fetch(urlLoginController + '?logout', {
                method: 'GET'
            });
            if (response.ok) {
                window.location.href = '../index.php';
            }
        });
    }

    //toggle hidden class
    function toogleDisplay(element) {
        element.classList.toggle("hidden");
    }

}