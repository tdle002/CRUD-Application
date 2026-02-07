// create the role type
export const createRoleQuery = `
    CREATE TYPE role_type AS 
    ENUM('Manager', 'Developer', 'HR', 'Sales', 'Intern');    
`;

// creating a table using id, name, email, age, role, salary
export const createEmployeeTableQuery = `
    CREATE TABLE employee_details(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    age SMALLINT NOT NULL CHECK (age > 17),
    role role_type NOT NULL DEFAULT 'Intern',
    salary DECIMAL(8,2) NOT NULL 
    );
`;

// selects everything from the table
export const getAllEmployeeQuery = `
    SELECT * FROM employee_details
`;

// create employee query 
export const createEmployeeQuery = `INSERT INTO employee_details(name, email, age, role, salary)
                                    VALUES($1, $2, $3, COALESCE($4::role_type, 'Intern'::role_type),$5) RETURNING *
                                    `;// using COALESCE to set default value if role is not provided
                                    // $1, $2, $3, $4, $5 are placeholders for parameterized query to prevent SQL injection
                                    // returning the value after the employee values have been inserted


export const getEmployeeQuery = `SELECT * FROM employee_details WHERE id=$1`;
// declared variable to select all columns from the employee_details table and uses the paramitized value to prevent sql injection and filter the result by the id


export const deleteEmployeeQuery = `DELETE FROM employee_details WHERE id=$1`;
// declare teh deleteEmployeeQuery and deletes the column from the table whose id matches the value passed


export const updateEmployeeQuery = `UPDATE employee_details
SET
name = COALESCE($1, name),
email = COALESCE($2, email),
age = COALESCE($3, age),
salary = COALESCE($5, salary),
role = COALESCE($4::role_type, role)
WHERE id = $6 
RETURNING *`;
// updates the employee details and uses COALESCE for the values if they are not provided then the fallback value is example "name"