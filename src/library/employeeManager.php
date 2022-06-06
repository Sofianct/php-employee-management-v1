<?php

/**
 * EMPLOYEE FUNCTIONS LIBRARY
 *
 * @author: Jose Manuel Orts
 * @date: 11/06/2020
 */

function getEmployees()
{
    //get employees
    $employees = json_decode(file_get_contents(dirname(__DIR__, 2) . './resources/employees.json'), true);
    return $employees;
}

function addEmployee(array $newEmployee)
{
    // TODO implement it
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
    // header('Content-type: text/javascript');
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

function getNextIdentifier(array $employeesCollection) //: int
{
    return 1;
    // TODO implement it
}
