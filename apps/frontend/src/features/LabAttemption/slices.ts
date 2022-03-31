import { createSlice, SliceCaseReducers } from '@reduxjs/toolkit';
import { AppContext, ResponseStatus } from 'shared/constants';
import { attemptLabThunk, finishLabThunk } from './thunks';
import { LabAttemptionUIState } from './types';

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
      .addCase(attemptLabThunk.pending, (state, { payload }) => {
        return {
          ...state,
          attemptLabStatus: null,
        };
      })

      .addCase(attemptLabThunk.fulfilled, (state, { payload }) => {
        return {
          ...state,
          attemptLabStatus: ResponseStatus.Success,
        };
      })
      .addCase(attemptLabThunk.rejected, (state, { payload }) => {
        return {
          ...state,
          attemptLabStatus: ResponseStatus.Failed,
        };
      })
      .addCase(finishLabThunk.pending, (state, { payload }) => {
        return {
          ...state,
          finishLabStatus: null,
        };
      })
      .addCase(finishLabThunk.fulfilled, (state, { payload }) => {
        return {
          ...state,
          finishLabStatus: ResponseStatus.Success,
        };
      })
      .addCase(finishLabThunk.rejected, (state, { payload }) => {
        return {
          ...state,
          finishLabStatus: ResponseStatus.Failed,
        };
      });
  },
});

export const labAttemptionUIReducer = labAttemptionUISlice.reducer;
