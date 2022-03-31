import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppContext } from 'shared/constants';
import { APIClient } from 'shared/utilities';
import { FetchStudentLabsResponse } from './LabsGrid.types';

export const fetchUserClassLabs = createAsyncThunk<FetchStudentLabsResponse>(
  `${AppContext.Lab}/fetchUserClassLabs`,
  async () => {
    const response = await APIClient.get<FetchStudentLabsResponse>(
      'classLab/getUserClassLabs'
    );
    return response.data;
  }
);
