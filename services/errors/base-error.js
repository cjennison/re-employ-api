class BaseError {
  constructor(errorString, code) {
    this.errorString = errorString;
    this.code = code;
  }

  format() {
    return {
      error: this.errorString,
      code: this.code
    };
  }
}

module.exports = BaseError;
