<?php

require ('./employeeManager.php');

//check session first of all

if (session_status() == PHP_SESSION_NONE) session_start();

if (isset($_SERVER['REQUEST_METHOD'])) {

    $requestType = $_SERVER['REQUEST_METHOD'];

    echo $requestType;

    //switch statement
    switch ($requestType) {
        case 'POST':

            break;
        case 'GET':
            
            break;
        case 'DELETE':
            $id = trim(file_get_contents("php://input"));
            deleteEmployee($id);
            break;
        case 'PUT':

            break;
        default:
            //request type that isn't being handled.
            break;
    }
}

