const errorHandler = (err, req, res, next) => {
  const customError = {
    statusCode: err.statusCode || 500,
    msg: err.message || "Something went wrong, try again later",
  };

  res.status(customError.statusCode).json({ msg: customError.msg });
};

export default errorHandler;
