module.exports = (err, req, res, next) => {
  console.error("GLOBAL ERROR:", err);

  res.status(500).json({
    message: err.message || "Something went wrong",
  });
};