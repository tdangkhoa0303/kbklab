import {LecturerDTO, UserDTO} from '@kbklab/api-interfaces';
import {AuthenticatedRequest} from 'models';
import {apiWrapper} from 'utils';
import * as UserActions from './user.actions';
import {ImportLecturersResult} from './user.types';
import {setTokenToCookies} from './user.utils';

export const getUserInfo = apiWrapper<UserDTO>(async (req: AuthenticatedRequest) => req.user);

export const authenticateByGoogle = apiWrapper<UserDTO>((req, res) => {
  const {token: ssoToken} = req.body;
  return UserActions
    .authenticateByGoogle(ssoToken)
    .then(data => {
      const {token, user} = data;
      setTokenToCookies(res, token);

      return user;
    });
});

export const login = apiWrapper<UserDTO>((req, res) => {
  const {email, password} = req.body;
  return UserActions
    .login(email, password)
    .then(data => {
      const {token, user} = data;
      setTokenToCookies(res, token);

      return user;
    });

});

export const getAllLecturers = apiWrapper<LecturerDTO[]>(() => {
  return UserActions.getAllLecturers();
});

export const importLecturers = apiWrapper<ImportLecturersResult>((req: AuthenticatedRequest) => (
  UserActions.importLecturers({file: req.file})
));

export const deleteLecturers = apiWrapper<boolean>((req: AuthenticatedRequest) => {
  const {body: {lecturers}, user} = req;
  return UserActions.deleteLecturers(lecturers, user)
})
