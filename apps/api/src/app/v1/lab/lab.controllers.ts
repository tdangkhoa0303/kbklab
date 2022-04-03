import {apiWrapper} from 'utils';
import * as LabActions from './lab.actions';

export const getAllLabs = apiWrapper(async () => (
  LabActions.getAllLabs()
));
