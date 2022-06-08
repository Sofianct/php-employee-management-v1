<?php

require_once('./library/sessionHelper.php');

?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
    <!-- Image Picker -->

    <!-- Image Picker -->
    <script src="https://kit.fontawesome.com/ae63adffc0.js" crossorigin="anonymous" defer></script>
    <script src="../assets/js/employee.js" defer></script>
    <link rel="stylesheet" href="../assets/css/main.css">
    <title>Employee Management</title>
</head>

<body>
    <header>
        <?php include_once("../assets/html/header.html"); ?>
    </header>

    <main>

        <form>
            <!-- 2 column grid layout with text inputs -->
            <div class="row m-4">
                <div class="col-2">
                    <div class="form-outline">
                        <label class="form-label" for="form3Example1">Profile Picture</label>
                        <input type="hidden" name="photo" id="photo">
                        <img id="image" class="form-control form__image" src="../assets/images/default.jpg" />
                    </div>
                </div>
                <div class="col-1 hidden" id="refreshContainer">
                    <button type="button" class="btn btn-dark refreashGallery__button" id="refreshButton">Refresh</button>
                </div>
                <?php
                require_once('./imageGallery.php');
                ?>
            </div>
            <button type="button" id="displayGallery" class="btn btn-dark ms-5">Select Profile Image</button>
            <div class="row m-4">
                <div class="col">
                    <div class="form-outline">
                        <label class="form-label" for="form3Example1">Name</label>
                        <input type="text" id="name" class="form-control" />
                    </div>
                </div>
                <div class="col">
                    <div class="form-outline">
                        <label class="form-label" for="form3Example2">Last name</label>
                        <input type="text" id="lastName" class="form-control" />
                    </div>
                </div>
            </div>
            <!-- 2 column grid layout with text inputs -->
            <div class="row m-4">
                <div class="col">
                    <div class="form-outline">
                        <label class="form-label" for="form3Example1">Email Address</label>
                        <input type="text" id="email" class="form-control" />
                        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                    </div>
                </div>
                <div class="col">
                    <div class="form-outline">
                        <label class="form-label" for="form3Example2">Gender</label>
                        <select id="gender" class="form-select" aria-label="Default select example">
                            <option value="female">Female</option>
                            <option value="male">Male</option>
                            <option value="notAnswered">Prefer not to respond</option>
                        </select>
                    </div>
                </div>
            </div>
            <!-- 2 column grid layout with text inputs -->
            <div class="row m-4">
                <div class="col">
                    <div class="form-outline">
                        <label class="form-label" for="form3Example1">City</label>
                        <input type="text" id="city" class="form-control" />
                    </div>
                </div>
                <div class="col">
                    <div class="form-outline">
                        <label class="form-label" for="form3Example2">Street Address</label>
                        <input type="text" id="streetAddress" class="form-control" />
                    </div>
                </div>
            </div>
            <!-- 2 column grid layout with text inputs -->
            <div class="row m-4">
                <div class="col">
                    <div class="form-outline">
                        <label class="form-label" for="form3Example1">State</label>
                        <input type="text" id="state" class="form-control" />
                    </div>
                </div>
                <div class="col">
                    <div class="form-outline">
                        <label class="form-label" for="form3Example2">Age</label>
                        <input type="text" id="age" class="form-control" />
                    </div>
                </div>
            </div>
            <!-- 2 column grid layout with text inputs -->
            <div class="row m-4">
                <div class="col">
                    <div class="form-outline">
                        <label class="form-label" for="form3Example1">Postal Code</label>
                        <input type="text" id="postalCode" class="form-control" />
                    </div>
                </div>
                <div class="col">
                    <div class="form-outline">
                        <label class="form-label" for="form3Example2">Phone Number</label>
                        <input type="text" id="phoneNumber" class="form-control" />
                    </div>
                </div>
            </div>

            <!-- Submit button -->
            <button type="" class="btn btn-primary btn-block ms-5">Submit</button>
            <button type="" class="btn btn-secondary btn-block ms-2">Return</button>
        </form>

    </main>

    <footer>
        <?php include_once("../assets/html/footer.html"); ?>
    </footer>

</body>

</html>