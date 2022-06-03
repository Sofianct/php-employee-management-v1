//Variables URL PHP Controller


const urlController = "./library/employeeController.php";
const urlControllerGet = "./library/employeeController.php?id=";

window.onload = async () => {

    await getEmployees(); //print employees

    initializeUpdateButtons();
    initializeDeleteButtons();

    //initialize update buttons to all rows table
    function initializeUpdateButtons() {
        const editButtons = document.querySelectorAll("[data-edit]");
        // Add edit event listener to all edit buttons
        Array.from(editButtons).map(btn => {
            btn.addEventListener('click', async (e) => {
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
                const employeeId = e.target.getAttribute('data-id');
                deleteEmployee(urlManagerController, employeeId);
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
        console.log(data);
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

            img.setAttribute('src', 'https://mdbootstrap.com/img/new/avatars/8.jpg');
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

    //get data employee
    async function getEmployee(id) {

        const response = await fetch(`${urlControllerGet}${id}`, {
            method: 'GET',
            headers: {
                "content-type": "application/json",
            }
        });
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
        editRow.innerHTML = `<form action="" method="post" id="editFormRow"><td></td>
        <td><input value = "${employee.name}" form="editFormRow" type="text" name="name" class="form-control" required></td>
        <td><input value = "${employee.lastName}" form="editFormRow" type="text" name="lastName" class="form-control" required></td>
        <td><input value = "${employee.email}" form="editFormRow" type="text" name="email" class="form-control" required></td>
        <td><input value = "${employee.age}" form="editFormRow" type="number" name="age" class="form-control" required></td>
        <td><input value = "${employee.streetAddress}" form="editFormRow" type="text" name="streetAddress" class="form-control" required></td>
        <td><input value = "${employee.city}" form="editFormRow" type="text" name="city" class="form-control" required></td>
        <td><input value = "${employee.state}" form="editFormRow" type="text" name="state" class="form-control" required>
        <td><input value = "${employee.postalCode}" form="editFormRow" type="text" name="postalCode" class="form-control" required>
        </td><td><input value = "${employee.phoneNumber}" form="editFormRow" type="text" name="phoneNumber" class="form-control" required></td>
        <td><div class="d-flex justify-content-center">
        <button id="btnUpdate" type="submit" form="editFormRow" class="btn btn-link"><i class="fa-solid fa-circle-check"></i></button>
        <button id="btnCancel" class="btn btn-link"><i class="fa-solid fa-circle-xmark"></i></button>
        </div></td></form>`;

        employeeRow.parentElement.insertAdjacentElement("afterbegin", editRow);
        toogleDisplay(employeeRow);

        const formEditEmployee = document.getElementById("editFormRow");
        formEditEmployee.addEventListener("submit", (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            //convert form data to json
            let jsonData = Object.fromEntries(formData.entries());
            //insert id
            jsonData = {
                "id": id,
                ...jsonData
            };
            console.log(jsonData);
            updateEmployee(jsonData);
        })

        //remove form edit row and show employeeRow
        const cancelEditButton = document.getElementById("btnCancel");
        // https://stackoverflow.com/questions/51120813/addeventlistener-not-working-more-than-once-with-a-button
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

        const data = await response.json();
        console.log(data);
        return data;
    }

    //cancel inline update employee
    function cancelUpdateEmployee(employeeRow) {
        //remove row form
        const rowForm = document.getElementById("formRow");
        rowForm.remove();
        //show default current row
        // const employeeRow = document.querySelector(`[data-row="${row}"]`);
        toogleDisplay(employeeRow);
    }


    //fetch to delete employee
    async function deleteEmployee(url, id) {

        const response = await fetch(url, {
            method: "DELETE",
            body: id,
        });

        const data = await response.text();
        console.log(data);
    }

    //toggle hidden class
    function toogleDisplay(element) {
        element.classList.toggle("hidden");
    }

}