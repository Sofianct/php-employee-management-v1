document.addEventListener('DOMContentLoaded', async () => {

    const galleryButton = document.getElementById("displayGallery");
    const imagesPicker = document.querySelectorAll("[data-image]>img");
    const id = document.location.search.replace(/^.*?\=/, "");
    const refreshButton = document.getElementById("refreshButton");
    await showEmployee(id);

    // hide/show image gallery
    galleryButton.addEventListener("click", () => {
        const galleryContainer = document.getElementById("galleryContainer");
        const refreshContainer = document.getElementById("refreshContainer");
        toogleDisplay(galleryContainer);
        toogleDisplay(refreshContainer);
        modifyText(galleryButton);
    });

    //image picker
    Array.from(imagesPicker).map((image) => {
        image.addEventListener("click", (e) => {
            const arrayImages = Array.from(imagesPicker);
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

    initializeRefreshButton();

    function initializeRefreshButton() {
        refreshButton.addEventListener(async () => {
            const random = Math.floor(Math.random() * 70);
            const response = await fetch(`./library/avatarsApi.php?getRandom=${random}`, {
                method: "GET",
            });
            const data = await response.text();
            console.log(data);
        });
    }

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

    const image = document.getElementById('image');
    const photo = document.getElementById('photo'); //input iamge field hidden
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