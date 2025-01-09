const errorHandler = (err, req, res, next) => {
  const customError = {
    statusCode: err.statusCode || 500,
    msg: err.message || "Something went wrong, try again later",
  };

  if (err.name === "ValidationError") {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
    customError.statusCode = 400;
  }

  if (err.name === "CastError") {
    customError.msg = `No item found with id: ${err.value._id}`;
    customError.statusCode = 404;
  }

  if (err.code && err.code === 11000) {
    customError.msg = ` ${Object.keys(err.keyValue)} already exist, please choose another value`;
    customError.statusCode = 400;
  }

  res.status(customError.statusCode).json({ msg: customError.msg });
};

export default errorHandler;
