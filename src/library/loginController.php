<?php
require('./loginManager.php');

//Login
if (isset($_POST['email'])) {
    echo authUser();
}

//Logout
if (isset($_GET['logout'])) {
    destroySession();
}
