<?php

//authorize user
function authUser()
{

    if (session_status() == PHP_SESSION_NONE) session_start();

    $email = $_POST["email"];
    $password = $_POST["password"];

    //get info from users.json
    $dbUser = json_decode(file_get_contents(dirname(__DIR__, 2) . '/resources/users.json'), true)['users'][0];

    $emailDB = $dbUser['email'];
    $passDB = $dbUser['password'];

    //verify password
    if ($email === $emailDB & password_verify($password, $passDB)) {
        $_SESSION["userId"] = $dbUser['userId'];
        $_SESSION["lastloginTime"] = time();
        return true;
    } else {
        return false;
    }
}

//destroy session
function destroySession()
{
    if (session_status() === PHP_SESSION_NONE) session_start();

    unset($_SESSION);

    destroySessionCookies();

    session_destroy();
}

//destroy cookies
function destroySessionCookies()
{
    // destroy session cookie
    if (ini_get("session.use_cookies")) {
        $params = session_get_cookie_params();
        setcookie(
            session_name(),
            '',
            time() - 42000,
            $params["path"],
            $params["domain"],
            $params["secure"],
            $params["httponly"]
        );
    }
}
