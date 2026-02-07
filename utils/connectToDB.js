import pg from "pg";
import dotenv from "dotenv";


// load environment variables and read the .env file and puts values in the to process.env file
dotenv.config({debug: true}); // enable debug logging

const requiredEnvVars = ["PG_USER", "PG_HOST", "PG_DATABASE", "PG_PORT", "PG_PASSWORD"];


// takes the array of strings 
requiredEnvVars.forEach((varName) => {
    if(!process.env[varName]){
        throw new Error(`Missing required environment variables : ${varName}`);
        // process.exit(1); - pointless line because the error already stop the function from executing
    };
});


// setup db client
// since we stored this in a variable we can  use it later to run SQL queries
// using pool to make a postgres connection using these credentials (open doors)
const db = new pg.Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    port: process.env.PG_PORT,
    password: process.env.PG_PASSWORD
});

// connect to database
db.connect()
.then(() => console.log("Connected with the database"))
.catch((err) => {
    console.log("Couldn't connect with the database ", err);
    process.exit(1);
});

// listening to additional error while connecting to the database
db.on("error", (err) => {
    console.log("Database error: ", err);
    process.exit(1);
})

// export query function
export const query = (text, params) => db.query(text, params);