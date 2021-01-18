//Connect to database
const connection = require("./connection");

//constructor methods 
class DB{
    constructor (){
        this.connection = connection
    }

// methods for adding data


// methods for viewing data    

    viewAllDepartments(){
        return this.connection.query("SELECT * FROM department")
    }
    viewAllRoles(){
        return this.connection.query("SELECT * FROM role")
    }
    viewAllEmployees(){
        return this.connection.query("SELECT * FROM employee")
    }

//methods for updating data

    updateEmployee(employee_id, role_id){
        return this.connection.query("UPDATE employee SET role_id = ? WHERE id = ? ", [role_id, employee_id])
    }
}

//Export database values
module.exports=new DB(connection)