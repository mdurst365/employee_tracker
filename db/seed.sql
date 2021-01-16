USE tracker_DB;

--- departments
INSERT INTO department
	(name)
VALUES
	("Human Resources"),
    ("Information Technology"),
    ("Accounting"),
    ("Sales");

---- roles
INSERT INTO role
	(title, salary, department_id)
VALUES
	("manager", 80000.00, 1),
	("developer", 65000.00, 2),
    ("account rep", 40000.00, 3),
    ("assitant", 24000.00, 4),
    ("sales", 35000.00, 5);

---- employees
INSERT INTO employee 
	(first_name, last_name, role_id, manager_id)
VALUES
	("Bob", "Corben", 1, 1),
    ("Libby", "Smith", 2, 2),
    ("Tammy", "Decker", 3, 3),
    ("Jeremy", "Tanner", 4, 4),
    ("James", "Tanner", 5, 5);
    