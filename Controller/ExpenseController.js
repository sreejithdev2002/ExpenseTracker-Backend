const ExpenseModel = require("../Model/ExpenseModel");
const expenseModel = require("../Model/ExpenseModel");

module.exports.createExpense = async (req, res) => {
  try {
    const { amount, category, description, isRecurring } = req.body;

    const newExpense = new ExpenseModel({
      user: req.user.id,
      amount,
      category,
      description,
      isRecurring,
    });

    const savedExpense = await newExpense.save();
    res.status(201).json(savedExpense);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create Expense",
    });
  }
};

module.exports.getExpense = async (req, res) => {
  try {
    const expenses = await expenseModel.find({ user: req.user.id });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch Expenses",
    });
  }
};

module.exports.getExpenseById = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await expenseModel.findById(id);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Expense", error });
  }
};

module.exports.updateExpense = async (req, res) => {
  try {
    const { amount, category, description, isRecurring } = req.body;
    const expenseId = req.params.id;

    const updatedExpense = await expenseModel.findByIdAndUpdate(
      expenseId,
      { amount, category, description, isRecurring },
      { new: true }
    );

    if (!updatedExpense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }
    res.status(200).json(updatedExpense);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update Expense",
    });
  }
};

module.exports.deleteExpense = async (req, res) => {
  try {
    const expenseId = req.params.id;
    const deleteExpense = await expenseModel.findByIdAndDelete(expenseId);

    if (!deleteExpense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    res.status(200).json({
      message: "Expense Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete Expense",
    });
  }
};

