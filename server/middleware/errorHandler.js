const errorHandler = (err, req, res, next) => {
  console.log(err);
  // if statusCode is not provided set it to 500 (INTERNAL_SERVER_ERROR)
  res.statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  err.message = err.message || "Something went wrong";

  res.json({ success: false, message: err.message });
};

module.exports = errorHandler;
