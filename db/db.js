const connection = require("./connection");

class DB{
    constructor (){
        this.connection = connection
    }

    viewAllDepartments(){
        return this.connection.query("SELECT * FROM department")
    }
    viewAllRoles(){
        return this.connection.query("SELECT * FROM role")
    }
    viewAllEmployees(){
        return this.connection.query("SELECT * FROM employee")
    }
    updateEmployee(employee_id, role_id){
        return this.connection.query("UPDATE employee SET role_id = ? WHERE id = ? ", [role_id, employee_id])
    }
}

module.exports=new DB(connection)