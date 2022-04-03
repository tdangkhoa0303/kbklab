export enum UserRole {
  Student,
  Lecturer,
  HeadDepartment,
  Admin,
}

export interface UserDTO {
  id: string,
  name: string,
  email: string
  role: UserRole,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export interface LecturerDTO extends UserDTO {
  classes: string[];
}

export interface AuthenticateByGoogleResponseData {
  user: UserDTO;
  token: string;
}

export interface LoginResponseData {
  user: UserDTO
}
