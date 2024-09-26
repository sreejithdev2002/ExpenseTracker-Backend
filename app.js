const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dbConnection = require("./Config/dbConnection");
require("dotenv").config();


const UserRouter = require("./Router/UserRouter");
const ExpenseRouter = require("./Router/ExpenseRouter");
const BudgetRouter = require("./Router/BudgetRouter");

const app = express();

dbConnection.dbConnect();

app.use(cors());
app.use(bodyParser.json());

app.use("/", UserRouter);
app.use("/expense", ExpenseRouter);
app.use("/budget", BudgetRouter);

const PORT = process.env.PORT;

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`)
});