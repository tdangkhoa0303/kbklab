// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class AppError<TData = any> extends Error {
  status: number;
  message: string;
  data?: TData;
  operational = true;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(message: string, status: number, data?: TData) {
    super();
    this.message = message;
    this.status = status;
    this.data = data || {} as TData

    Error.captureStackTrace(this, this.constructor);
  }
}
