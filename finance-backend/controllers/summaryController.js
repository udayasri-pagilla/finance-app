
// const Record = require("../models/Record");

// exports.getSummary = async (req, res) => {
//   try {
//     const records = await Record.find();

//     let totalIncome = 0;
//     let totalExpense = 0;
//     let categoryBreakdown = {};

//     records.forEach((rec) => {
//       const amount = Number(rec.amount) || 0;

//       if (rec.type === "income") {
//         totalIncome += amount;
//       } else if (rec.type === "expense") {
//         totalExpense += amount;
//       }

//       if (!categoryBreakdown[rec.category]) {
//         categoryBreakdown[rec.category] = 0;
//       }

//       categoryBreakdown[rec.category] += amount;
//     });

//     res.status(200).json({
//       totalIncome,
//       totalExpense,
//       netBalance: totalIncome - totalExpense,
//       categoryBreakdown,
//       totalTransactions: records.length,
//     });

//   } catch (error) {
//     console.error("SUMMARY ERROR:", error); // ADD THIS
//     res.status(500).json({ message: "Error fetching summary" });
//   }
// };


const Record = require("../models/Record");

exports.getSummary = async (req, res) => {
  try {
    const records = await Record.find();

    let totalIncome = 0;
    let totalExpense = 0;
    let categoryBreakdown = {};

    records.forEach((rec) => {
      const amount = Number(rec.amount) || 0;

      // income / expense
      if (rec.type === "income") {
        totalIncome += amount;
      } else if (rec.type === "expense") {
        totalExpense += amount;
      }

      // category breakdown
      if (!categoryBreakdown[rec.category]) {
        categoryBreakdown[rec.category] = 0;
      }
      categoryBreakdown[rec.category] += amount;
    });

    const netBalance = totalIncome - totalExpense;

    // 🔥 RECENT ACTIVITY (last 5)
    const recentActivity = await Record.find()
      .sort({ date: -1 })
      .limit(5);

    // 🔥 MONTHLY TRENDS
    const monthlyTrends = {};
    records.forEach((rec) => {
      const month = new Date(rec.date).toLocaleString("default", {
        month: "short",
      });

      monthlyTrends[month] =
        (monthlyTrends[month] || 0) + Number(rec.amount);
    });

    // 🔥 WEEKLY TRENDS
    const weeklyTrends = {};
    records.forEach((rec) => {
      const day = new Date(rec.date).getDate();
      const week = `Week-${Math.ceil(day / 7)}`;

      weeklyTrends[week] =
        (weeklyTrends[week] || 0) + Number(rec.amount);
    });

    res.status(200).json({
      totalIncome,
      totalExpense,
      netBalance,
      categoryBreakdown,
      totalTransactions: records.length,
      recentActivity,
      monthlyTrends,
      weeklyTrends,
    });

  } catch (error) {
    console.error("SUMMARY ERROR:", error);
    res.status(500).json({ message: "Error fetching summary" });
  }
};