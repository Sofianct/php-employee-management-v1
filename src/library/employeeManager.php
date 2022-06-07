<?php

/**
 * EMPLOYEE FUNCTIONS LIBRARY
 *
 * @author: Jose Manuel Orts
 * @date: 11/06/2020
 */

if (session_status() == PHP_SESSION_NONE) session_start();

$errors = [
    'name' => "",
    'lastName' => "",
    'email' => "",
    'age' => "",
    'postalCode' => "",
    'phoneNumber' => "",
    'unique' => ""
];

function getEmployees()
{
    $employees = json_decode(file_get_contents(dirname(__DIR__, 2) . './resources/employees.json'), true);
    return $employees;
}

function addEmployee(array $newEmployee)
{
    $employees = getEmployees();
    array_push($employees, $newEmployee);
    saveDate($employees);
    return $newEmployee;
}


function deleteEmployee($id)
{

    $employees = getEmployees();
    foreach ($employees as $key => $employee) {
        if ($employee["id"] == $id) {
            array_splice($employees, $key, 1);
            saveDate($employees);
        }
    }
}


function updateEmployee(array $updateEmployee)
{
    $employees = getEmployees();
    foreach ($employees as $key => $employee) {
        if ($employee["id"] == $updateEmployee["id"]) {
            $employees[$key] = array_merge($employee, $updateEmployee);
            saveDate($employees);
            return $employees[$key];
        }
    }
}


function getEmployee($id) //string $id as param
{
    $employees = getEmployees();
    foreach ($employees as $employee) {
        if ($employee["id"] == $id) {
            return $employee;
        }
    }
    return null;
}


function saveDate($data)
{
    $pathDir = dirname(__DIR__, 2);
    $pathDb = './resources/employees.json';
    file_put_contents($pathDir . $pathDb, json_encode($data, JSON_PRETTY_PRINT));
}

function removeAvatar($id)
{
    // TODO implement it
}


function getQueryStringParameters() //: array
{
    return array();
    // TODO implement it
}

function getNextIdentifier(array $employeesCollection)
{
    $lastEmployeeId = end($employeesCollection)["id"];
    $nextId = intval($lastEmployeeId) + 1;
    return $nextId;
}


function validateEmployee($employee, &$errors)
{
    $isValid = true;

    // Start of validation
    if (!$employee['name']) {
        $isValid = false;
        $errors['name'] = 'Name is mandatory';
    }
    if (!$employee['lastName']) {
        $isValid = false;
        $errors['lastName'] = 'Name is mandatory';
    }
    if ($employee['email'] && !filter_var($employee['email'], FILTER_VALIDATE_EMAIL)) {
        $isValid = false;
        $errors['email'] = 'This must be a valid email address';
    } elseif (!$employee['email']) {
        $isValid = false;
        $errors['email'] = 'Email is mandatory';
    }
    if ($employee['age'] && intval($employee['age']) < 18) {
        $isValid = false;
        $errors['age'] = 'The employee must not be underage';
    } elseif (!$employee['age']) {
        $isValid = false;
        $errors['age'] = 'Age is mandatory';
    }
    if (!preg_match(('/^[0-9]{5}$/i'), $employee['postalCode'])) {
        $isValid = false;
        $errors['postalCode'] = 'This must be a valid postal code';
    }
    if (!filter_var($employee['phoneNumber'], FILTER_VALIDATE_INT)) {
        $isValid = false;
        $errors['phoneNumber'] = 'This must be a valid phone number';
    }
    //validate unique email
    $employees = getEmployees();
    foreach ($employees as $user) {
        if ($user["email"] == $employee["email"]) {
            $isValid = false;
            $errors['unique'] = 'This employee already exists in the database';
        }
    }
    // End Of validation
    return $isValid;
}
