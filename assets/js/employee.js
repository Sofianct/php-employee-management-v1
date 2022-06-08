const dashboard = document.getElementById('dashboard');
const employee = document.getElementById('employee');
const returnBtn = document.getElementById('return');

document.addEventListener('DOMContentLoaded', async () => {
    const id = document.location.search.replace(/^.*?\=/, "");
    await showEmployee(id);
    updateEmployee();
});

dashboard.addEventListener('click', () => {
    window.location.href = "./dashboard.php";
    dashboard.classList.add('active');
    employee.classList.remove('active');
});

returnBtn.addEventListener('click', () => {
    window.location.href = "./dashboard.php";
    dashboard.classList.add('active');
    employee.classList.remove('active');
});

// Toastr Options Library
//Command: toastr["success"]("Are you the six fingered man?")
toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-center",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

function updateEmployee() {
    const url = `./library/employeeController.php`; //url should be the same as the selected employee
    const form = document.getElementById('updateEmployee');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const jsonData = Object.fromEntries(formData.entries());

        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(jsonData)
        });

        const result = await response.json();
        if (response.ok) {
            toastr.success('Updated successfully!');
            console.log(result.id);
            window.location.href = `./employee.php?listId=${result.id}`;
        } else {
            toastr.error('Please refresh the browser and try again');
        }
        console.log(result);

    });
}

async function showEmployee(id) {
    const response = await fetch(`./library/employeeController.php?listId=${id}`, {
        method: 'GET',
        headers: {
            "content-type": "application/json",
        }
    });
    const data = await response.json();
    console.log(data);

    const employeeId = document.getElementById('employeeId');
    const name = document.getElementById('name');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const genderSelect = document.getElementById('gender');
    const city = document.getElementById('city');
    const streetAddress = document.getElementById('streetAddress');
    const state = document.getElementById('state');
    const age = document.getElementById('age');
    const postalCode = document.getElementById('postalCode');
    const phoneNumber = document.getElementById('phoneNumber');

    employeeId.setAttribute('value', data.id);
    name.setAttribute('value', data.name);
    lastName.setAttribute('value', data.lastName);
    email.setAttribute('value', data.email);
    city.setAttribute('value', data.city);
    streetAddress.setAttribute('value', data.streetAddress);
    state.setAttribute('value', data.state);
    age.setAttribute('value', data.age);
    postalCode.setAttribute('value', data.postalCode);
    phoneNumber.setAttribute('value', data.phoneNumber);

    if (data.gender == 'woman') {
        genderSelect.selectedIndex = "0";
    } else if (data.gender == 'man') {
        genderSelect.selectedIndex = "1";
    } else {
        genderSelect.selectedIndex = "2";
    }

    dashboard.classList.remove('active');
    employee.classList.add('active');

}