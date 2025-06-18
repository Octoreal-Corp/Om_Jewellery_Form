const errorHandler = (err, req, res, next) => {
  const statusCode =
    (Number.isInteger(err.statusCode) && err.statusCode) || 500;

  const isOperational =
    typeof err.isOperational === "boolean"
      ? err.isOperational
      : statusCode >= 400 && statusCode < 500;

  const timestamp = new Date().toISOString();

  const errorResponse = {
    success: false,
    message: isOperational ? err.message : "Internal Server Error",
  };

  if (process.env.NODE_ENV === "development") {
    errorResponse.error = {
      name: err.name,
      message: err.message,
      stack: err.stack,
    };
  }

  console.error(`\n[${timestamp}] ERROR:`);
  console.error(`URL: ${req.originalUrl}`);
  console.error(`Status: ${statusCode}`);
  console.error(`Message: ${err.message}`);
  if (err.stack) console.error(err.stack);

  res.status(statusCode).json(errorResponse);
};

export { errorHandler };
