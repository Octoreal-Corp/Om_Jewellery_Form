class ApiResponse {
  constructor(statusCode = 200, message, data = null) {
    this.success = true;
    this.message = message;
    this.statusCode = statusCode;
    if (data !== null) {
      this.data = data;
    }
  }
}

export { ApiResponse };
