import express from "express";
// imported our employee js from the controller folder
import { 
    getAllEmployee, 
    getEmployee, 
    deleteEmployee, 
    updateEmployee, 
    createEmployee
} from "../controllers/employee.js";

const router = express.Router();

// specify endpoint grabbed from controller folder
router.get("/", getAllEmployee);

router.post("/", createEmployee);

router.get("/:id", getEmployee)

router.delete("/:id" , deleteEmployee);

router.put("/:id", updateEmployee);

// export it
export default router;

// this is used with common js
// aka using const express = require("express");
// module.exports = router;