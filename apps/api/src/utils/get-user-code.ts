import {UserRole} from '@kbklab/api-interfaces';

export const getUserCode = (email: string, role: UserRole): string => {
  const username: string = email.split('@')[0];
  if(role > UserRole.Student) {
    return username
  }

  return username.match(/IA|SE\d{6}/i)[0];
}
