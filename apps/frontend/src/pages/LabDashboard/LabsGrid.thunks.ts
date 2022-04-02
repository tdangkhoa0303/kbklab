import {createAsyncThunk} from '@reduxjs/toolkit';
import {ClassLabId} from 'components/LabAttemption';
import {AppContext} from 'shared/constants';
import {ClassLab} from 'shared/models';
import {APIClient, APIClientResponse} from 'shared/utilities';
import {FetchStudentLabsResponse} from './LabsGrid.types';

export const fetchUserClassLabs = createAsyncThunk<FetchStudentLabsResponse>(
  `${AppContext.Lab}/fetchUserClassLabs`,
  async () => {
    const response = await APIClient.get<FetchStudentLabsResponse>(
      'classLab/getUserClassLabs'
    );
    return response.data;
  }
);

export const fetchClassLab = createAsyncThunk<ClassLab, ClassLabId>(
  `${AppContext.ClassLab}/fetchClassLab`,
  async (classLabId) => {
    const {data: response} = await APIClient.get<APIClientResponse<ClassLab>>(`classLab/${classLabId}/detail`);
    return response.data;
  }
);
