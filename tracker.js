// Dependencies

const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
// using dotenv to hide credentials
const dotenv = require('dotenv');
dotenv.config();

//please use your own login credentials to access this project
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.PASSWORD,
  database: "tracker_DB"
});

connection.connect(function(err) {
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
          "Add Company Information",
          "View Company Information",
          "Exit"
        ]
      })
   
    .then(function(result) {
        console.log("You entered: " + result.option);
        switch (result.option) {
            case "Add Company Information":
              addInfo();
              break;
            case "View Company Information":
              viewInfo();
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
     function addInfo (){
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
                    if(answer !== "") {
                        return true
                    }
                    return "Please do not leave entry blank"
                }
              })
              .then(function(res) {
                const department = res.department;
                const query = `INSERT INTO department (name) VALUES("${department}")`;
                connection.query(query, function(err, res) {
                  if (err) throw err;
                  console.table(res);
                  list();
                });
              });
          }
          
          function addRole() {
            inquirer
              .prompt([
                {
                  type: "input",
                  message: "What is the job title you want to add?",
                  name: "title",
                  validate: (answer) => {
                    if(answer !== "") {
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
                  choices: [
                    "123",
                    "456",
                    "789",
                    "430"
                  ],
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
                    if(answer !== "") {
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
                    if(answer !== "") {
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
              .then(function(res) {
                const firstName = res.firstName;
                const lastName = res.lastName;
                const roleID = res.roleID;
                const managerID = res.managerID;
                const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE("${firstName}", "${lastName}", "${roleID}", "${managerID}")`;
                connection.query(query, function(err, res) {
                  if (err) throw err;
                  console.table(res);
                  list();
                });
              });
          }

//View Info
function viewInfo (){
  inquirer
  .prompt({
    type: "list",
    name: "option",
    message: "What would you like to do?",
    choices: [
      "View Department",
      "View Role",
      "View Employee",
      "Update Employee",
      "Exit"
    ]
  })

  .then(function(result) {
      console.log("You entered: " + result.option);
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
              process.exit();
              break;
              }
        });
    }     


function viewDepartment() {
  const query = "SELECT * FROM department";
  connection.query(query, function(err, res) {
    if (err) throw err;
    console.table(res);
    list();
  });
}

function viewRole() {
  const query = "SELECT * FROM role";
  connection.query(query, function(err, res) {
    if (err) throw err;
    console.table(res);
    list();
  });
}

function viewEmployee() {
  const query = "SELECT * FROM employee";
  connection.query(query, function(err, res) {
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
                    if(answer !== "") {
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
                    if(answer !== "") {
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
              .then(function(res) {
                const firstName = res.firstName;
                const lastName = res.lastName;
                const roleID = res.roleID;
                const managerID = res.managerID;
                const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE("${firstName}", "${lastName}", "${roleID}", "${managerID}")`;
                connection.query(query, function(err, res) {
                  if (err) throw err;
                  console.table(res);
                  list();
                });
              });
          }

          function updateEmployee() {
            const query = "SELECT id, first_name, last_name, role_id  FROM employee";
            connection.query(query, function(err, res) {
              if (err) throw err;
              console.table(res);
              {
                inquirer.prompt({
                  type: "input",
                  message: "Which employee needs to be updated? (please use number from id column only)",
                  name: "employee"
                });
              }
            });
          }          

/*connection.query(`UPDATE employee SET role_id = ${roleID} WHERE id = ${employeeID}`, (err, res) => {
  if(err) return err;

  // confirm update employee
  console.log(`\n ${answer.employee} ROLE UPDATED TO ${answer.role}...\n `);

  // back to main menu
  list();
}); */          


