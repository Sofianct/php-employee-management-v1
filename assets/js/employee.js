document.addEventListener('DOMContentLoaded', async () => {
    const id = document.location.search.replace(/^.*?\=/, "");
    await showEmployee(id);
    updateEmployee();
});

const dashboard = document.getElementById('dashboard');
dashboard.addEventListener('click', () => {
    window.location.href = "./dashboard.php";
});

function updateEmployee() {
    const url = `./library/employeeController.php`; //url should be the same as the selected employee
    const form = document.getElementById('updateEmployee');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        let jsonData = Object.fromEntries(formData.entries());

        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(jsonData)
        });

        let result = await response.text();

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

}