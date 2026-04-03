
const Record = require("../models/Record");

exports.getSummary = async (req, res) => {
  try {
    const records = await Record.find();

    let totalIncome = 0;
    let totalExpense = 0;
    let categoryBreakdown = {};

    records.forEach((rec) => {
      const amount = Number(rec.amount) || 0;

      if (rec.type === "income") {
        totalIncome += amount;
      } else if (rec.type === "expense") {
        totalExpense += amount;
      }

      if (!categoryBreakdown[rec.category]) {
        categoryBreakdown[rec.category] = 0;
      }

      categoryBreakdown[rec.category] += amount;
    });

    res.status(200).json({
      totalIncome,
      totalExpense,
      netBalance: totalIncome - totalExpense,
      categoryBreakdown,
      totalTransactions: records.length,
    });

  } catch (error) {
    console.error("SUMMARY ERROR:", error); // 🔥 ADD THIS
    res.status(500).json({ message: "Error fetching summary" });
  }
};