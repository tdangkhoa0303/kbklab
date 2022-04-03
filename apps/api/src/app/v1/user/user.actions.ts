import {AuthenticateByGoogleResponseData, LecturerDTO, UserDTO, UserRole} from '@kbklab/api-interfaces';
import {environment} from 'environments/environment';
import {OAuth2Client} from 'google-auth-library';
import {ClassModel, UserModel} from 'infra/database/models';
import {AppError} from 'models';
import {read, utils} from 'xlsx';
import * as UserQueries from './user.queries';
import {CreateUserPayload, ImportLecturerPayload, ImportLecturerRow, ImportLecturersResult} from './user.types';
import {normalizeSettledResult, signToken} from './user.utils';
import {createUserPayloadValidator, importLecturersValidator} from './user.validators';

export const createUser = async (createUserDTO: CreateUserPayload, isForceUpdateRoleIfUserExisted = false): Promise<UserDTO> => {
  await createUserPayloadValidator(createUserDTO);

 const {email, role, name} = createUserDTO;
 const user = await UserQueries.findUserByEmail(email);
 if (user && isForceUpdateRoleIfUserExisted) {
   user.name = name;
   user.role = role;
   user.isNew = false;
   user.save();
   return user;
 }

 return await UserModel
   .create({
     name: name,
     email: email,
     role: role,
   })
   .then(data => data.toObject<UserDTO>());
};

export const authenticateByGoogle = async (oAuth2Token: string): Promise<AuthenticateByGoogleResponseData> => {
  const {googleSSOClientId} = environment
  const oAuth2Client = new OAuth2Client(googleSSOClientId);
  const loginTicket = await oAuth2Client.verifyIdToken({
    idToken: oAuth2Token,
    audience: googleSSOClientId,
  });

  const {email, name} = loginTicket.getPayload();
  if (!email || !name) {
    throw new AppError('You have to login first', 401)
  }

  let user: UserDTO = await UserQueries.findUserByEmail(email);

  if (!user) {
    user = await createUser({
      email,
      name,
      role: UserRole.Student
    });

  }

  return {
    user,
    token: signToken(user.id)
  };
}

export const login = async (email: string, password: string): Promise<AuthenticateByGoogleResponseData> => {
  const user = await UserQueries.findUserByEmailIncludePassword(email);

  if (!user || !user.password || !user.comparePassword(password, user.password)) {
    throw new AppError('Incorrect email or password', 400)
  }

  return {
    user,
    token: signToken(user.id)
  }
}

export const getAllLecturers = async (): Promise<LecturerDTO[]> => {
  const allLecturers = await UserModel.find({
    role: UserRole.Lecturer,
  });

  const allClasses = await ClassModel
    .find()
    .select('lecturer code');
  const allClassesByLecturerId: Record<string, string[]> = allClasses.reduce((result, currentClass) => {
    const lecturerId = currentClass.lecturer.toString();
    const currentLecturerClasses = result[lecturerId] || [];
    return {
      ...result,
      [lecturerId]: [
        ...currentLecturerClasses,
        currentClass.code
      ]
    }
  }, {});

  return allLecturers.map(lecturer => ({
    ...lecturer.toObject(),
    classes: allClassesByLecturerId[lecturer.id] || []
  }))
};

export const importLecturers = async (payload: ImportLecturerPayload): Promise<ImportLecturersResult> => {
  const {file} = payload;

  await importLecturersValidator(payload);

  const importingLecturerData = read(file.buffer);
  const importLecturerRows = utils.sheet_to_json<ImportLecturerRow>(importingLecturerData.Sheets[importingLecturerData.SheetNames[0]]);
  const createLecturerSettledResult = await Promise.allSettled<LecturerDTO>(
    importLecturerRows.map(({fullName, email}) => (
      createUser({
        email,
        name: fullName,
        role: UserRole.Lecturer
      }).then(user => ({...user, classes: []}))
    ))
  );

  return normalizeSettledResult<LecturerDTO>(createLecturerSettledResult);
}
