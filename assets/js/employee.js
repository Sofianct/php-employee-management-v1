const dashboard = document.getElementById('dashboard');
const employee = document.getElementById('employee');
const returnBtn = document.getElementById('return');

document.addEventListener('DOMContentLoaded', async () => {

    const galleryButton = document.getElementById("displayGallery");
    const imagesPicker = document.querySelectorAll("[data-image]>img");
    const arrayImages = Array.from(imagesPicker);
    const id = document.location.search.replace(/^.*?\=/, "");
    const refreshButton = document.getElementById("refreshButton");
    await showEmployee(id);
    logOut();


    // hide/show image gallery
    galleryButton.addEventListener("click", () => {
        const galleryContainer = document.getElementById("galleryContainer");
        const refreshContainer = document.getElementById("refreshContainer");
        toogleDisplay(galleryContainer);
        toogleDisplay(refreshContainer);
        modifyText(galleryButton);
    });

    //image picker
    arrayImages.map((image) => {
        image.addEventListener("click", (e) => {
            const selectedImage = arrayImages.findIndex(element => element == e.target);
            //add selected image style
            if (!e.target.classList.contains("imageSelected")) {
                e.target.classList.add("imageSelected");
            }
            //remove selected image style from the other images of the gallery
            arrayImages.map((image, index) => {
                if (index !== selectedImage && image.classList.contains("imageSelected")) {
                    image.classList.remove("imageSelected");
                }
            })
            //input hidden assign new src
            const profileImage = document.getElementById("image");
            const srcInputImage = document.getElementById("photo");
            profileImage.src = e.target.src;
            srcInputImage.value = e.target.src;
        });
    });

    refreshButton.addEventListener("click", async () => {
        const random = Math.floor(Math.random() * 71); //limit 70 beacuse we add 10 by request and the limit is 80
        const newArrayImages = await refreshGallery(random);
        arrayImages.map((newImage, index) => {
            newImage.src = newArrayImages[index];
        });
    });

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

        console.log(jsonData);
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

    const image = document.getElementById('image');
    const photo = document.getElementById('photo'); //input image field hidden
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

    image.src = data.image;
    photo.setAttribute('value', data.image);
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

//toggle hidden class
function toogleDisplay(element) {
    element.classList.toggle("hidden");
}

//modify text element
function modifyText(element) {
    if (element.textContent === "Select Profile Image") {
        element.textContent = "Hide Gallery";
    } else {
        element.textContent = "Select Profile Image";
    }
}

async function refreshGallery(random) {
    console.log(random);
    const response = await fetch(`./library/avatarsApi.php?getRandom=${random}`, {
        method: "GET",
        headers: {
            "content-type": "application/json"
        },
    });
    const data = await response.json();
    console.log(data);
    return data;
}

//log out button
function logOut() {
    const urlLoginController = './library/employeeController.php';
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