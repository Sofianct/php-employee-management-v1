<?php

require('./employeeManager.php');
require_once('./sessionHelper.php');

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
                'image' => "../assets/images/default.jpg",
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

            $errors = [
                'name' => "",
                'lastName' => "",
                'email' => "",
                'age' => "",
                'postalCode' => "",
                'phoneNumber' => "",
                'unique' => ""
            ];

            $isValid = true;
            $isValidEmployee = true;

            $employee = array_merge($employee, $newDataEmployee);

            $isValid = validateEmployee($employee, $errors);
            $isValidEmployee = existEmployee($employee, $errors);

            if ($isValid && $isValidEmployee) {
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

            $errors = [
                'name' => "",
                'lastName' => "",
                'email' => "",
                'age' => "",
                'postalCode' => "",
                'phoneNumber' => "",
                'unique' => ""
            ];

            $isValid = true;

            $newDataEmployee = json_decode(file_get_contents("php://input"), true);
            $isValid = validateEmployee($newDataEmployee, $errors);

            if ($isValid) {
                echo json_encode(updateEmployee($newDataEmployee));
            } else {
                echo json_encode($errors);
            }

            break;

        default:
            //request type that isn't being handled.
            break;
    }
}
