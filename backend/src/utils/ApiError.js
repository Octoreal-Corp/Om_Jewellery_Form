class ApiError extends Error {
  /**
   * @param {string} message - Human-readable error message
   * @param {number} statusCode - HTTP status code
   * @param {boolean} [isOperational=true] - Marks if it's a known operational error
   */
  constructor(message, statusCode = 500, isOperational = true) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.success = false;
    this.message = message;
    Error.captureStackTrace(this, this.constructor);
  }
}

export { ApiError };
