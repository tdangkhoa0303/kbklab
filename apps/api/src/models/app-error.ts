// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class AppError<TData = any> extends Error {
  status: number;
  message: string;
  data?: TData;
  operational = true;

  constructor(message: string, status: number, data?: TData, operational = true) {
    super();
    this.message = message;
    this.status = status;
    this.data = data || {} as TData;
    this.operational = operational;

    Error.captureStackTrace(this, this.constructor);
  }
}
