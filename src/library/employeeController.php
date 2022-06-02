<?php

require ('./employeeManager.php');

//check session first of all

if (session_status() == PHP_SESSION_NONE) session_start();

if (isset($_SERVER['REQUEST_METHOD'])) {

    $requestType = $_SERVER['REQUEST_METHOD'];

    //switch statement
    switch ($requestType) {
        case 'POST':

            break;
        case 'GET':
            if (isset($_GET['id'])) {
                $id = $_GET['id'];
                echo json_encode(getEmployee($id));
                break;
            } else{
                echo json_encode(getEmployees());
            }
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

// getEmployee();
