import {AuthenticatedRequest} from 'models';
import {apiWrapper} from 'utils';
import * as ClassLabActions from './classLab.actions';

export const updateClassLabTime = apiWrapper((req: AuthenticatedRequest) => {
  const {classLabId} = req.params;
  const {startDate, endDate} = req.body;

  return ClassLabActions.updateClassLabTime({
    classLabId,
    startDate,
    endDate
  })
});

export const deleteClassLab = apiWrapper((req: AuthenticatedRequest) => {
  const {classLabId} = req.params;
  return ClassLabActions.deleteClassLab(classLabId)
});

export const createClassLab = apiWrapper((req) => ClassLabActions.createClassLab(req.body));

export const getUserClassLabsWithScore = apiWrapper((req: AuthenticatedRequest) => {
  return ClassLabActions.getUserClassLabsWitchScore(req.user);
});
