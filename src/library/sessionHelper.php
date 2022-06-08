<?php

require_once('loginManager.php');

if (session_status() == PHP_SESSION_NONE) session_start();

//check session
if (!isset($_SESSION['userId'])) {
    header('Location: ../index.php');
}

if (isset($_SESSION["userId"])){
    $timeExpire = 6000; // 10' x 60'' 
    if ((time() - $_SESSION["lastloginTime"]) >= $timeExpire) {
        destroySession();
        echo '1';
    }
}

// https://www.youtube.com/watch?v=D6u9bjyMO1w