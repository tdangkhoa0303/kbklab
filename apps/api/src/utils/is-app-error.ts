import {AppError} from '../models';

export const isAppError = (error: Error): error is AppError => {
  return (error as AppError).operational;
}
