export enum ConstraintErrorCode {
  Existed = 'existed',
  Required = 'required',
  Invalid = 'invalid',
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ValidationError<TData extends Record<any, any>> = Partial<{
  [key in keyof TData]: ConstraintErrorCode;
}>;
