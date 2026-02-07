import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
// importing exmployee Route
import employeeRoute from "./routes/employee.js";

// use envornment variable
dotenv.config();

// create isntance of express module
const app = express();
const PORT = 3000;

// specify port Number
const corsOptions = {
    // asterisk allowing all origins
    origin: "*"
};
// pass the cors option using middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());

// ?? pass in the employee route for the endpoint from the route folder??
app.use("/api/employee", employeeRoute);
//if the api route doesn't match the endpoint "employee"
app.use(function (req, res){
    res.status(404).json({error: "Not Found!"})
});

// create the route
// app.get("/api/employee", (req, res) => {
//     res.send("hello world")
// });


// create global error handler - catches error anywhere in the routes or middleware
// centralizes error responses so they are consistent.
app.use((err, req, res, next) => {
    // if status code is not something liek 400 then it will be 500 according to this code
    const statusCode = err.statusCode || 500;
    // if error doesn't precent itself then it will be internal server error
    const message = err.message || "Internal Server Error";
    // return the error message in json format
    return res.status(statusCode).json({error: message});
});

app.listen(PORT, () =>{
    console.log(`Listen on port ${PORT}`)
});