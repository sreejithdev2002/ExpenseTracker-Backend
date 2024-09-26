const express = require("express");
const {
  createExpense,
  getExpense,
  updateExpense,
  deleteExpense,
  getExpenseById,
} = require("../Controller/ExpenseController");
const router = express.Router();
const auth = require("../Middleware/auth");

router.post("/", auth, createExpense);
router.get("/", auth, getExpense);
router.get("/:id", getExpenseById);
router.put("/:id", auth, updateExpense);
router.delete("/:id", auth, deleteExpense);

module.exports = router;
