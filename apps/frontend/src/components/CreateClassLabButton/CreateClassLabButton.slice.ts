import {
  createEntityAdapter,
  createSlice,
  SliceCaseReducers,
} from '@reduxjs/toolkit';
import { AppContext, ResponseStatus } from 'shared/constants';
import { Lab } from 'shared/models';
import { createClassLab, getAllLabs } from './CreateClassLabButton.thunks';
import { LabsState, LabsUIState } from './CreateClassLabButton.types';

export const labsAdapter = createEntityAdapter<Lab>({
  selectId: (lab) => lab.id,
});
const initialState = labsAdapter.getInitialState();

export const labsSlice = createSlice<LabsState, SliceCaseReducers<LabsState>>({
  name: AppContext.Lab,
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllLabs.fulfilled, (state, { payload }) => {
      const { data } = payload;
      labsAdapter.upsertMany(state, data);
    });
  },
});

const initialLabsUIState: LabsUIState = {
  createdClassLabStatus: null,
};

export const labsUISlice = createSlice<
  LabsUIState,
  SliceCaseReducers<LabsUIState>
>({
  name: AppContext.Lab,
  initialState: initialLabsUIState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createClassLab.pending, (state, { payload }) => {
        return {
          ...state,
          createdClassLabStatus: null,
        };
      })
      .addCase(createClassLab.fulfilled, (state, { payload }) => {
        return {
          ...state,
          createdClassLabStatus: ResponseStatus.Success,
        };
      })
      .addCase(createClassLab.rejected, (state, { payload }) => {
        return {
          ...state,
          createdClassLabStatus: ResponseStatus.Failed,
        };
      });
  },
});

export const labsUIReducer = labsUISlice.reducer;
export const labsReducer = labsSlice.reducer;
