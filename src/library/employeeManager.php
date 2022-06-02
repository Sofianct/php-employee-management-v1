<?php

/**
 * EMPLOYEE FUNCTIONS LIBRARY
 *
 * @author: Jose Manuel Orts
 * @date: 11/06/2020
 */

function addEmployee(array $newEmployee)
{
    // TODO implement it
}


function deleteEmployee(string $id)
{
    // TODO implement it
}


function updateEmployee(array $updateEmployee)
{
    // TODO implement it
}


function getEmployee() //string $id as param
{
    // TODO implement it
    //get employee info and return that info 

    //get employees
    $employees = (file_get_contents(dirname(__DIR__, 2) . './resources/employees.json'));

    echo $employees;
}


function removeAvatar($id)
{
    // TODO implement it
}


function getQueryStringParameters() //: array
{
    // TODO implement it
}

function getNextIdentifier(array $employeesCollection) //: int
{
    // TODO implement it
}
