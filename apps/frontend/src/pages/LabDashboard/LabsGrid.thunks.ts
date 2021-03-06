import {ClassLabId} from 'components/LabAttemption';
import {AppContext} from 'shared/constants';
import {ClassLab} from 'shared/models';
import {createAsyncThunkWithErrorHandler} from 'shared/redux/utils';
import {APIClient, APIClientResponse} from 'shared/utilities';
import {FetchStudentLabsResponse} from './LabsGrid.types';

export const fetchUserClassLabs = createAsyncThunkWithErrorHandler<FetchStudentLabsResponse>(
  `${AppContext.Lab}/fetchUserClassLabs`,
  async () => {
    const response = await APIClient.get<FetchStudentLabsResponse>('classLab/getUserClassLabs');
    return response.data;
  }
);

export const fetchClassLab = createAsyncThunkWithErrorHandler<ClassLab, ClassLabId>(
  `${AppContext.ClassLab}/fetchClassLab`,
  async (classLabId) => {
    const {data: response} = await APIClient.get<APIClientResponse<ClassLab>>(`classLab/${classLabId}/detail`);
    return response.data;
  }
);
