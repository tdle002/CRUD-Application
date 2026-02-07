import { query } from "../utils/connectToDB.js";
import { createRoleQuery, 
         createEmployeeTableQuery, 
         getAllEmployeeQuery,
         createEmployeeQuery,
         getEmployeeQuery, 
         deleteEmployeeQuery,
         updateEmployeeQuery
} from "../utils/sqlQuery.js";
import { createError } from "../utils/error.js";

// async function always returns a promise
// creating a function that may take time and can be used in other files


// check if employee detail is present or not in the database
// if not, then we create the table and send the data
// when hitting the "getAllEmployee" endpoint this function executes
// export async function getAllEmployee(req, res, next){
export async function getAllEmployee(req, res, next) {
    try {
        // checking to see if the table employee details is present
        const response = await query(`
            SELECT to_regclass('employee_details');
        `);
            
        // define the types for the roll types from the sqlQuery file
        if (!response.rows[0].to_regclass) {
            // safely create role type (won't error if already exists)
            await query(createRoleQuery);
            // create table
            await query(createEmployeeTableQuery);
        }
        // return all data
        const { rows } = await query(getAllEmployeeQuery);
        res.status(200).json(rows);
        // utilizing error handling middleware 
    } catch (error) {
        console.log(error.message);
        return next(createError(400, "Unable to get employee data"));
        // res.status(500).json({ error: error.message });
    }
};


export async function getEmployee(req, res, next){
    const id = req.params.id;
    //tested in postman and confirmed id was 1
    // console.log(id);
    const data = await query(getEmployeeQuery, [id]);
    console.log(data);
    // if the database returns 0 rows.   length === 0
    if(!data.rows.length)
    {
        return next(createError(400, 'Employee not found!'))
    };
    // if employee was found json sends it back to client
    // data row indicate first and only record
    res.status(200).json(data.rows[0])
};

export async function deleteEmployee(req, res, next){
    // gets the id from the URL parameter
    const id = req.params.id;
    // functions that runs a SQL query against the database to delete and employee
    const data = await query(deleteEmployeeQuery, [id]);
    // just for debugging to see what was affected
    console.log(data);
    // if the database returns 0 rows affected then the employee was not found and we return an error message
    // if rowCount === 0 
    if(!data.rowCount){
        return next(createError(400, "Employee not found!"));
    }
    res.status(200).json({message: "Deleted succesfully"});
};

export async function updateEmployee(req, res, next){
    try{
        const{id} = req.params;
        const{name, email, age, salary, role} = req.body;
        const result = await query(updateEmployeeQuery, [name, email, age, salary, role, id]);
        if(result.rowCount === 0){
        return res.status(404).json({error: "Employee not found. "})
    }    
    res.status(200).json(result.rows[0]);
    }catch(error){
        res.status(400).json({error: error.message});
    }
};

export async function createEmployee(req, res, next){
    try{
        const {name, role, salary, age, email} = req.body;
        // if or not all details are provided
        if(!name || !salary || !age || !email){
            // return this error message
            return res.status(400).json({error:"Missing fields"});
        };
        // pass inside the query function
        const data = await query(createEmployeeQuery, [
            name, 
            email, 
            age, 
            role, 
            salary
        ]);
        res.status(201).json(data.rows[0])
    }catch(error){
        console.log(error.message);
        return next(createError(400, error.message));
    };
};