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
})
