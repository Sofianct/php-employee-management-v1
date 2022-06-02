//Variables Dashboard Frame
const editButtons = document.querySelectorAll("[data-edit]");
const deleteButtons = document.querySelectorAll("[data-delete]");
const urlManagerController = "./library/employeeController.php";


//Add edit event listener to all edit buttons
Array.from(editButtons).map(btn => {
    btn.addEventListener('click', (e) => {
        const employeeId = e.currentTarget.getAttribute('data-id'); //get ID
        const employee = getEmployee(employeeId); //get data employee
        console.log(employee);
        // showEditRow(e); //show edit form row
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
async function getEmployee($id) {
    const response = await fetch(urlManagerController, {
        method: "GET",
        body: $id,
    });

    const data = response.text();
    console.log(data);
    return data;
}

//show edit form in row target
function showEditRow(employee, id) {
    const idRow = `row${id}`;
    const employeeRow = document.getElementById(idRow);

    //get all data from tr
    const employeeDataSelector = employeeRow.querySelectorAll('[data-td]');
    let employeeData = [];

    Array.from(employeeDataSelector).map(data => {
        employeeData.push(data.textContent);
    })

    
}