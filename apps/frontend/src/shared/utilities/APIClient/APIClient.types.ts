import { ValidationError } from '../../constants';

export interface APIClientResponse<TResponseData> {
  errorCode: number;
  errorFields: Record<string, ValidationError>;
  errorMessage: string;
  data: TResponseData;
}
