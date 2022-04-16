import {AuthenticateByGoogleResponseData, LecturerDTO, UserDTO, UserRole} from '@kbklab/api-interfaces';
import {environment} from 'environments/environment';
import {OAuth2Client} from 'google-auth-library';
import {ClassModel, ScoreModel, UserModel} from 'infra/database/models';
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
   .then(data => data.toObject<UserDTO>())
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
    role: {$in: [UserRole.Lecturer, UserRole.HeadDepartment]},
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

export const deleteLecturer = async (lecturerId: string, user: UserDTO): Promise<boolean> => {
  const lecturer = await UserModel.findOne({
    _id: lecturerId,
    role: UserRole.Lecturer
  });

  if(!lecturer) {
    throw new AppError('Cannot find lecturer with this id', 400);
  }

  const lecturerClasses = await ClassModel.find({lecturer: lecturerId});

  // Assign all lecturer classes to current user
  await Promise.all(
    lecturerClasses.map(async (currentClass) => {
      await currentClass.set('lecturer', user.id);
      await currentClass.save();
    })
  );

  // Delete all score records
  await ScoreModel.deleteMany({user: lecturerId});

  // Remove user from classes (if any)
  const classes = await ClassModel.find({students: lecturerId});
  await Promise.all(
    classes.map(async (classToUpdate) => {
      await classToUpdate.set('students', classToUpdate.students.filter(studentId => studentId.toString() !== lecturerId));
      await classToUpdate.save();
    })
  )

  return !!(await lecturer.delete());
}

export const deleteLecturers = async (lecturerIds: string[], user: UserDTO): Promise<boolean> => {
  if(user.role < UserRole.HeadDepartment) {
    throw new AppError('You do not have permission to perform this action', 403);
  }

  return !!(await Promise.all(
    lecturerIds.map((id) => deleteLecturer(id, user))
  ))
}
