const express = require("express");
const {
  createBudget,
  getBudget,
  updateBudget,
  deleteBudget,
  getBudgetById,
} = require("../Controller/BudgetController");
const router = express.Router();
const auth = require("../Middleware/auth");

router.post("/", auth, createBudget);
router.get("/", auth, getBudget);
router.get("/:id", getBudgetById);
router.put("/:id", auth, updateBudget);
router.delete("/:id", auth, deleteBudget);

module.exports = router; 
