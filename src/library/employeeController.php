<?php

require('./employeeManager.php');
require_once('./sessionHelper.php');
//check session first of all

if (session_status() == PHP_SESSION_NONE) session_start();

if (isset($_SERVER['REQUEST_METHOD'])) {

    $requestType = $_SERVER['REQUEST_METHOD'];

    //switch statement
    switch ($requestType) {

        case 'POST':

            $newDataEmployee = json_decode(file_get_contents("php://input"), true);
            $arrayEmployees = getEmployees();
            $newId = getNextIdentifier($arrayEmployees);

            $employee = [
                'id' => $newId,
                'name' => "",
                'lastName' => "",
                'email' => "",
                'gender' => "",
                'age' => "",
                'streetAddress' => "",
                'city' => "",
                'state' => "",
                'postalCode' => "",
                'phoneNumber' => ""
            ];

            $isValid = true;

            $employee = array_merge($employee, $newDataEmployee);

            $isValid = validateEmployee($employee, $errors);

            if ($isValid) {
                echo json_encode(addEmployee($employee));
            } else {
                echo json_encode($errors);
            }

            break;

        case 'GET':

            if (isset($_GET['id'])) {
                $id = $_GET['id'];
                echo json_encode(getEmployee($id));
                break;
            } elseif (isset($_GET['listId'])) {
                $id = $_GET['listId'];
                echo json_encode(getEmployee($id));
            } else {
                echo json_encode(getEmployees());
            }

        case 'DELETE':

            $id = trim(file_get_contents("php://input"));
            deleteEmployee($id);
            break;

        case 'PUT':

            $newDataEmployee = json_decode(file_get_contents("php://input"), true);
            echo json_encode(updateEmployee($newDataEmployee));
            break;

        default:
            //request type that isn't being handled.
            break;
    }
}
