export default class AppError extends Error {
  status: number;
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  operational = true;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(status: number, message: string, data?: any) {
    super();
    this.message = message;
    this.status = status;
    this.data = data || {}

    Error.captureStackTrace(this, this.constructor);
  }
}
