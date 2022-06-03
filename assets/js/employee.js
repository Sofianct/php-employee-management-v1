document.addEventListener('DOMContentLoaded', () => {
    const id = document.location.search.replace(/^.*?\=/, "");
    showEmployee(id);
});

const dashboard = document.getElementById('dashboard');
dashboard.addEventListener('click', () => {
    window.location.href = "./dashboard.php";
});

async function showEmployee(id) {
    const response = await fetch(`./library/employeeController.php?listId=${id}`, {
        method: 'GET',
        headers: {
            "content-type": "application/json",
        }
    });
    const data = await response.json();
    console.log(data);

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