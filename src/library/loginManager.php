<?php







function destroySession() {
    if(session_status() === PHP_SESSION_NONE) session_start();

    unset($_SESSION);

    destroySessionCookies();

    session_destroy();
    
}

function destroySessionCookies() {
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