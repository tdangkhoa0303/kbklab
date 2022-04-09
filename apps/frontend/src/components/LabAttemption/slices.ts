import {createSlice, SliceCaseReducers} from '@reduxjs/toolkit';
import {AppContext, ResponseStatus} from 'shared/constants';
import {attemptLabThunk, finishLabThunk} from './thunks';
import {LabAttemptionUIState} from './types';

const initialLabAttemptionUIState: LabAttemptionUIState = {
  finishLabStatus: null,
  attemptLabStatus: null,
};

export const labAttemptionUISlice = createSlice<
  LabAttemptionUIState,
  SliceCaseReducers<LabAttemptionUIState>
>({
  name: AppContext.Class,
  initialState: initialLabAttemptionUIState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(attemptLabThunk.pending, (state) => {
        return {
          ...state,
          attemptLabStatus: null,
        };
      })

      .addCase(attemptLabThunk.fulfilled, (state) => {
        return {
          ...state,
          attemptLabStatus: ResponseStatus.Success,
        };
      })
      .addCase(attemptLabThunk.rejected, (state) => {
        return {
          ...state,
          attemptLabStatus: ResponseStatus.Failed,
        };
      })
      .addCase(finishLabThunk.pending, (state) => {
        return {
          ...state,
          finishLabStatus: null,
        };
      })
      .addCase(finishLabThunk.fulfilled, (state) => {
        return {
          ...state,
          finishLabStatus: ResponseStatus.Success,
        };
      })
      .addCase(finishLabThunk.rejected, (state) => {
        return {
          ...state,
          finishLabStatus: ResponseStatus.Failed,
        };
      });
  },
});

export const labAttemptionUIReducer = labAttemptionUISlice.reducer;
