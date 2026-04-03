const Record = require("../models/Record");
// CREATE RECORD
exports.createRecord = async (req, res) => {
  try {
    const { amount, type, category, date, notes } = req.body;

    const record = new Record({
      amount,
      type,
      category,
      date,
      notes,
    });

    await record.save();

    res.status(201).json({
      message: "Record created",
      record,
    });

  } catch (error) {
    console.error("CREATE ERROR:", error);
    res.status(500).json({ message: "Error creating record" });
  }
};


// GET RECORDS WITH FILTER
exports.getRecords = async (req, res) => {
  try {
    const { type, category, startDate, endDate } = req.query;

    let filter = {};

    if (type) {
      filter.type = type; // income / expense
    }

    if (category) {
      filter.category = { $regex: category, $options: "i" };
    }

    if (startDate && endDate) {
      filter.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const records = await Record.find(filter).sort({ date: -1 });

    res.status(200).json(records);

  } catch (error) {
    console.error("GET RECORDS ERROR:", error);
    res.status(500).json({ message: "Failed to fetch records" });
  }
};

// UPDATE RECORD
exports.updateRecord = async (req, res) => {
  try {
    const record = await Record.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.status(200).json(record);

  } catch (error) {
    console.error("UPDATE ERROR:", error);
    res.status(500).json({ message: "Update failed" });
  }
};

// DELETE RECORD
exports.deleteRecord = async (req, res) => {
  try {
    const record = await Record.findByIdAndDelete(req.params.id);

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.status(200).json({ message: "Record deleted" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};