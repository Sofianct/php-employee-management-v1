//Variables Dashboard Frame
const editButtons = document.querySelectorAll("[data-edit]");
const deleteButtons = document.querySelectorAll("[data-delete]");
const urlController = "./library/employeeController.php";
const urlControllerGet = "./library/employeeController.php?id=";


//Add edit event listener to all edit buttons
Array.from(editButtons).map(btn => {
    btn.addEventListener('click', async (e) => {
        const employeeId = e.currentTarget.getAttribute('data-id'); //get ID
        const employee = await getEmployee(employeeId); //get data employee
        showEditRow(employee, employeeId); //show edit form row
    });
});

//Add delete event listener to all delete buttons
Array.from(deleteButtons).map(btn => {
    btn.addEventListener('click', (e) => {
        const employeeId = e.currentTarget.getAttribute('data-id');
        deleteEmployee(urlManagerController, employeeId);
    });
});

//fetch to edit employee
async function editEmployee(url, id) {

    const response = await fetch(url, {
        method: "PUT",
        body: id,
    });

    const data = await response.text();
    console.log(data);
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
    const idRow = `row${id}`;
    const employeeRow = document.getElementById(idRow);

    //get all data from tr
    const employeeDataSelector = employeeRow.querySelectorAll('[data-td]');

    //for each td insert input form
    employeeDataSelector[0].textContent = `<td><form action="" method="post" id="editFormRow"></form>`;
    Array.from(employeeDataSelector).slice(1).map((td) => {
        
    })
    `< input value = ${employee.name} form="editFormRow" type="text" name="name" class="form-control" required></td>`   
    `< input value = ${employee.email} form="editFormRow" type="text" name="name" class="form-control" required></td>`   
    `< input value = ${employee.age} form="editFormRow" type="text" name="name" class="form-control" required></td>`   
    `< input value = ${employee.city} form="editFormRow" type="text" name="name" class="form-control" required></td>`   
    `< input value = ${employee.state} form="editFormRow" type="text" name="name" class="form-control" required></td>`   
    `< input value = ${employee.postalCode} form="editFormRow" type="text" name="name" class="form-control" required></td>`   
    `< input value = ${employee.phoneNumber} form="editFormRow" type="text" name="name" class="form-control" required></td>`   
    `< input value = ${employee.name} form="editFormRow" type="text" name="name" class="form-control" required></td>`   




}