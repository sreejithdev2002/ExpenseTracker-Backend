const budgetModel = require("../Model/BudgetModel");

module.exports.createBudget = async (req, res) => {
  try {
    const { category, amount, month, year, warning } = req.body;

    const newBudget = new budgetModel({
      user: req.user.id,
      category,
      amount,
      month,
      year,
      warning,
    });

    const savedBudget = await newBudget.save();
    res.status(201).json(savedBudget);
  } catch (error) {
    res.status(201).json({
      message: "Failed to create Budget",
    });
  }
};

module.exports.getBudget = async (req, res) => {
  try {
    const budgets = await budgetModel.find({ user: req.user.id });
    res.status(200).json(budgets);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch Budgets",
    });
  }
};

module.exports.getBudgetById = async (req, res) => {
  try {
    const { id } = req.params;
    const budget = await budgetModel.findById(id);

    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }

    res.status(200).json(budget);
  } catch (error) {
    res.status(500).json({ message: "Error fetching budget", error });
  }
};

module.exports.updateBudget = async (req, res) => {
  try {
    const { category, amount, month, year, warning } = req.body;
    const budgetId = req.params.id;

    const updatedBudget = await budgetModel.findByIdAndUpdate(
      budgetId,
      { category, amount, month, year, warning },
      { new: true }
    );

    if (!updatedBudget) {
      return res.status(404).json({
        message: "Budget not found",
      });
    }

    res.status(200).json(updatedBudget);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update Budget",
    });
  }
};

module.exports.deleteBudget = async (req, res) => {
  try {
    const budgetId = req.params.id;
    const deleteBudget = await budgetModel.findByIdAndDelete(budgetId);

    if (!deleteBudget) {
      return res.status(404).json({
        message: "Budget not found",
      });
    }

    res.status(200).json({
      message: "Budget Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete Budget",
    });
  }
};
