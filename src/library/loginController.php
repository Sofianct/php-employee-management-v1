<?php
require_once("./loginManager.php");

var_dump($_POST["email"]);

//Login
if (isset($_POST['submit'])) {
    //call to authorize user
}

//Logout
if (isset($_GET['logout'])) {
    destroySession();
    header('Location: ../../index.php');
}
