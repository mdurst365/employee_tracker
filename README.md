# Unit 12 MySQL Homework: Employee Tracker

This is a homework assignment for OSU coding bootcamp. It is the first project that we have done that uses MySQL and Inquirer to create a command line interface with the intention that this is an app that could be used to keep track of company and employee information. I admit that I struggled with this assignment, I feel that the tutor pointed me in the right direction, but the recommended fixes would require extensive rework and I don't have enough time before the deadline to accomplish a complete restart. I will need a lot more practice before I feel confident with CRUD operations in Inquirer/MySQL, but I did learn a lot while working on this project.

## Instructions

Design the following database schema containing three tables:

* **DEPARTMENT**:

- [x]  * **id** - INT PRIMARY KEY
- [x]  * **name** - VARCHAR(30) to hold department name

* **ROLE**:

- [x]  * **id** - INT PRIMARY KEY
- [x]  * **title** -  VARCHAR(30) to hold role title
- [x]  * **salary** -  DECIMAL to hold role salary
- [x]  * **department_id** -  INT to hold reference to department role belongs to

* **EMPLOYEE**:

- [x]  * **id** - INT PRIMARY KEY
- [x]  * **first_name** - VARCHAR(30) to hold employee first name
- [x]  * **last_name** - VARCHAR(30) to hold employee last name
- [x]  * **role_id** - INT to hold reference to role employee has
- [x]  * **manager_id** - INT to hold reference to another employee that manages the employee being Created. This field may be null if the employee has no manager
  
Build a command-line application that at a minimum allows the user to:

- [x] Add departments, roles, employees
- [x] View departments, roles, employees
- [x] Update employee roles

## Minimum Requirements
- [x] Functional application.
- [x] GitHub repository with a unique name and a README describing the project.

* The command-line application should allow users to:

- [x] Add departments, roles, employees
- [x] View departments, roles, employees
- [x] Update employee roles

## Animated Gif
[Link to Demo of App](https://github.com/mdurst365/employee_tracker/blob/main/employee_tracker.gif)

