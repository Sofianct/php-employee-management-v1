<?php

function authUser(){

    if (session_status() == PHP_SESSION_NONE) session_start();

    $email = $_POST["email"];
    $password = $_POST["password"];

    //get info from users.json
    $dbUser = json_decode(file_get_contents(dirname(__DIR__, 2).'/resources/users.json'), true)['users'][0];
    
    $emailDB = $dbUser['email'];
    $passDB = $dbUser['password'];

    //verify password
    if($email === $emailDB & password_verify($password, $passDB)){
        return true;
    }else{
        return false;
    }
}