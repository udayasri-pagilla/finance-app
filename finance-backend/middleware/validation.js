const validateCreateRecord = (req, res, next) => {
  const { amount, type, category } = req.body;

  if (!amount || !type || !category) {
    return res.status(400).json({
      message: "Amount, type, and category are required",
    });
  }

  if (amount <= 0) {
    return res.status(400).json({
      message: "Amount must be greater than 0",
    });
  }

  if (!["income", "expense"].includes(type)) {
    return res.status(400).json({
      message: "Type must be income or expense",
    });
  }

  next();
};


const validateUpdateRecord = (req, res, next) => {
  const { amount, type } = req.body;

  if (amount && amount <= 0) {
    return res.status(400).json({
      message: "Amount must be greater than 0",
    });
  }

  if (type && !["income", "expense"].includes(type)) {
    return res.status(400).json({
      message: "Invalid type",
    });
  }

  next();
};


const validateUser = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Name, email, and password are required",
    });
  }

  next();
};


module.exports = {
  validateCreateRecord,
  validateUpdateRecord,
  validateUser,
};