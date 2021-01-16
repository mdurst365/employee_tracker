// Dependencies

const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const dotenv = require('dotenv').config();

// Establish server & PORT

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "process.env.DB_PASS",
  database: "tracker_DB"
});

connection.connect(function(err) {
  if (err) throw err;
  start();
});

function start() {
  inquirer
    .prompt({
      type: "list",
      name: "option",
      message: "What would you like to do?",
      choices: [
        "Add Department",
        "Add Role",
        "Add Employee",
        "View Department",
        "View Role",
        "View Employee",
        "Exit"
      ]
    })

    .then(function(result) {
      console.log("You entered: " + result.option);
      switch (result.option) {
        case "Add Department":
          addDepartment();
          break;
        case "Add Role":
          addRole();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "View Department":
          viewDepartment();
          break;
        case "View Role":
          viewRole();
          break;
        case "View Employee":
          viewEmployee();
          break;
        case "Update Employee Role":
          updateRole();
          break;
        case "Exit":
          connection.end();
          process.exit();
          break;
      }
    });
}

function addDepartment() {
  inquirer
    .prompt({
      type: "input",
      message: "What is the name of the department you want to add?",
      name: "department"
    })
    .then(function(res) {
      const department = res.department;
      const query = `INSERT INTO department (name) VALUES("${department}")`;
      connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
        start();
      });
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the job title you want to add?",
        name: "title"
      },
      {
        type: "number",
        message: "What is the salary for this position? (Please enter numbers only)",
        name: "salary"
      },
      {
        type: "number",
        message: "What is the department ID for this position? (Please enter numbers only)",
        name: "departmentID"
      }
    ])
    .then(function(res) {
      const title = res.title;
      const salary = res.salary;
      const departmentID = res.departmentID;
      const query = `INSERT INTO role (title, salary, department_id) VALUE("${title}", "${salary}", "${departmentID}")`;
      connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
        start();
      });
    });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the employee's first name?",
        name: "firstName"
      },
      {
        type: "input",
        message: "What is the employee's last name?",
        name: "lastName"
      },
      {
        type: "input",
        message: "What is the employee's role ID?",
        name: "roleID"
      },
      {
        type: "input",
        message: "What is the employee's manager ID?",
        name: "managerID"
      }
    ])
    .then(function(res) {
      const firstName = res.firstName;
      const lastName = res.lastName;
      const roleID = res.roleID;
      const managerID = res.managerID;
      const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE("${firstName}", "${lastName}", "${roleID}", "${managerID}")`;
      connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
        start();
      });
    });
}

function viewDepartment() {
  const query = "SELECT * FROM department";
  connection.query(query, function(err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
}

function viewRole() {
  const query = "SELECT * FROM role";
  connection.query(query, function(err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
}

function viewEmployee() {
  const query = "SELECT * FROM employee";
  connection.query(query, function(err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
}

