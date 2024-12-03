import ClientError from "./ClientError.js";

class InputError extends ClientError {
  constructor(message, statusCode = 400) {
    super(message);
    this.name = "InputError";
    this.statusCode = statusCode;
  }
}

export default InputError;
