import {ClassLabId} from 'components/LabAttemption';
import {useSelector} from 'react-redux';
import {ClassLab} from 'shared/models';
import {RootState} from 'shared/redux/rootReducers';
import {classLabByIdSelector} from '../LabsGrid.selectors';

export const useClassLabById = (classLabId: ClassLabId): ClassLab | undefined =>
  useSelector((rootState: RootState) => classLabByIdSelector(rootState, classLabId));
