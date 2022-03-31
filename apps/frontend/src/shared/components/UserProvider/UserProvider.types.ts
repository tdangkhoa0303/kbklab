import { User } from '../../models';
import { APIClientResponse } from '../../utilities';

export type FetchUserResponse = APIClientResponse<User>;

export interface LoginPayload {
  email: string;
  password: string;
}
export type LoginResponse = APIClientResponse<User>;

export interface LoginWithGooglePayload {
  token: string;
}
