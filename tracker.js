// Dependencies
const DB = require("./db/db.js")
const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
// using dotenv to hide credentials
const dotenv = require('dotenv');
const db = require("./db/db.js");
dotenv.config();

//please use your own login credentials to access this project
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.PASSWORD,
  database: "tracker_DB"
});

connection.connect(function (err) {
  if (err) throw err;
  list();
});


//Main Menu
function list() {
  inquirer
    .prompt({
      type: "list",
      name: "option",
      message: "What would you like to do?",
      choices: [
        "Add departments, roles and/or employees",
        "View departments, roles and/or employees",
        "Update employee roles",
        "Exit"
      ]
    })

    .then(function (result) {
      console.log("You entered: " + result.option);
      switch (result.option) {
        case "Add departments, roles and/or employees":
          addInfo();
          break;
        case "View departments, roles and/or employees":
          viewInfo();
          break;
        case "Update employee roles":
          updateEmployee();
          break;
        case "Exit":
          console.log("Good-bye");
          connection.end();
          process.exit();
          break;
      }
    });
}

//Add Info         
function addInfo() {
  inquirer
    .prompt({
      type: "list",
      name: "option",
      message: "What would you like to do?",
      choices: [
        "Add Department",
        "Add Role",
        "Add Employee",
        "Exit"
      ]
    })

    .then(function (result) {
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
        case "Exit":
          console.log("Good-bye");
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
      name: "department",
      validate: (answer) => {
        if (answer !== "") {
          return true
        }
        return "Please do not leave entry blank"
      }
    })
    .then(function (res) {
      const department = res.department;
      const query = `INSERT INTO department (name) VALUES("${department}")`;
      connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        list();
      });
    });
}

async function addRole() {
  const departments = await DB.viewAllDepartments();
  const departmentArray = departments.map(({ id, name }) => ({
    name: name,
    value: id
  }));
  console.log(departmentArray)
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the job title you want to add?",
        name: "title",
        validate: (answer) => {
          if (answer !== "") {
            return true
          }
          return "Please do not leave entry blank"
        }
      },
      {
        type: "list",
        message: "What is the salary for this position?",
        name: "salary",
        choices: [
          "80000.00",
          "75000.00",
          "50000.00",
          "24000.00"
        ],
      },
      {
        type: "list",
        message: "Select department ID for this position",
        name: "departmentID",
        choices: departmentArray,
      }
    ])
    .then(function (res) {
      const title = res.title;
      const salary = res.salary;
      const departmentID = res.departmentID;
      const query = `INSERT INTO role (title, salary, department_id) VALUE("${title}", "${salary}", "${departmentID}")`;
      connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        list();
      });
    });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the employee's first name?",
        name: "firstName",
        validate: (answer) => {
          if (answer !== "") {
            return true
          }
          return "Please do not leave entry blank"
        }
      },
      {
        type: "input",
        message: "What is the employee's last name?",
        name: "lastName",
        validate: (answer) => {
          if (answer !== "") {
            return true
          }
          return "Please do not leave entry blank"
        }
      },
      {
        type: "list",
        message: "What is the employee's role ID?",
        name: "roleID",
        choices: [
          "12",
          "14",
          "16",
          "20"
        ]
      },
      {
        type: "list",
        message: "What is the employee's manager ID? (0 is for no manager)",
        name: "managerID",
        choices: [
          "120",
          "240",
          "480",
          "190",
          "0"
        ]
      }
    ])
    .then(function (res) {
      const firstName = res.firstName;
      const lastName = res.lastName;
      const roleID = res.roleID;
      const managerID = res.managerID;
      const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE("${firstName}", "${lastName}", "${roleID}", "${managerID}")`;
      connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        list();
      });
    });
}

//View Info
function viewInfo() {
  inquirer
    .prompt({
      type: "list",
      name: "option",
      message: "What would you like to do?",
      choices: [
        "View Department",
        "View Role",
        "View Employee",
        "Exit"
      ]
    })

    .then(function (result) {
      //console.log("You entered: " + result.option);
      switch (result.option) {
        case "View Department":
          viewDepartment();
          break;
        case "View Role":
          viewRole();
          break;
        case "View Employee":
          viewEmployee();
          break;
        case "Update Employee":
          updateEmployee();
          break;
        case "View All":
          viewAll();
          break;
        case "Exit":
          console.log("Good-bye");
          connection.end();
          break;
      }
    });
}


function viewDepartment() {
  DB.viewAllDepartments()
    .then(function (res) {
      console.table(res);
      list();
    })
};

function viewRole() {
  DB.viewAllRoles()
    .then(function (res) {
      console.table(res);
      list();
    });
}

function viewEmployee() {
  const query = "SELECT * FROM employee";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    list();
  });
}
function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the employee's first name?",
        name: "firstName",
        validate: (answer) => {
          if (answer !== "") {
            return true
          }
          return "Please do not leave entry blank"
        }
      },
      {
        type: "input",
        message: "What is the employee's last name?",
        name: "lastName",
        validate: (answer) => {
          if (answer !== "") {
            return true
          }
          return "Please do not leave entry blank"
        }
      },
      {
        type: "list",
        message: "What is the employee's role ID?",
        name: "roleID",
        choices: [
          "12",
          "14",
          "16",
          "20"
        ]
      },
      {
        type: "list",
        message: "What is the employee's manager ID? (0 is for no manager)",
        name: "managerID",
        choices: [
          "120",
          "240",
          "480",
          "190",
          "0"
        ]
      }
    ])
    .then(function (res) {
      const firstName = res.firstName;
      const lastName = res.lastName;
      const roleID = res.roleID;
      const managerID = res.managerID;
      const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE("${firstName}", "${lastName}", "${roleID}", "${managerID}")`;
      connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        list();
      });
    });
}

async function updateEmployee() {
  const employees = await DB.viewAllEmployees();
  const employeesArray = employees.map(({ firstname, id }) => ({
    first_name: firstname,
    value: id,
  }));

    inquirer
      .prompt([
        {
          type: "list",
          message: "What is the employee's role ID?",
          name: "roleID",
          choices: employeesArray,
        },
      ])
      .then(answer => {
        console.log(roleID)
      })
    }

 /*then(function (res) {
        const updateroleID = res.roleID;
        const query = `UPDATE INTO employee (role_id,) VALUE("${roleID}")`;
        connection.query(query, function (err, res) {
          if (err) throw err;
          console.table(res);
          list();
        });
      });
}

/*
  connection.query(
          "UPDATE auctions SET ? WHERE ?",
          [
            {
              highest_bid: answer.bid
            },
            {
              id: chosenItem.id
            }
          ],
          function(error) {
            if (error) throw err;
            console.log("Bid placed successfully!");
            start();
          }
        );
*/