import {createEntityAdapter, createSlice, SliceCaseReducers,} from '@reduxjs/toolkit';
import {AppContext, ResponseStatus} from 'shared/constants';
import {Lecturer} from 'shared/models';
import {deleteLecturersThunk, getAllLecturers, importLecturers} from './LecturersGrid.thunks';
import {LecturersGridState, LecturersUIState} from './LecturersGrid.types';

export const lecturersAdapter = createEntityAdapter<Lecturer>({
  selectId: (lecturer) => lecturer.id,
});
const initialState = lecturersAdapter.getInitialState();

export const lecturersSlice = createSlice<
  LecturersGridState,
  SliceCaseReducers<LecturersGridState>
>({
  name: AppContext.Lecturer,
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllLecturers.fulfilled, (state, { payload }) => {
        const { data } = payload;
        lecturersAdapter.upsertMany(state, data);
      })
      .addCase(importLecturers.fulfilled, (state, { payload }) => {
        const { data } = payload;
        lecturersAdapter.upsertMany(state, data);
      })
      .addCase(deleteLecturersThunk.fulfilled, (state, {payload}) => {
        lecturersAdapter.removeMany(state, payload.lecturers);
      });
  },
});

const initialImportLecturersUIState: LecturersUIState = {
  importLecturersStatus: null,
  deleteLecturersStatus: null,
};

export const lecturersUISlice = createSlice<
  LecturersUIState,
  SliceCaseReducers<LecturersUIState>
>({
  name: AppContext.Lecturer,
  initialState: initialImportLecturersUIState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(importLecturers.pending, (state, { payload }) => {
        return {
          ...state,
          importLecturersStatus: null,
        };
      })
      .addCase(importLecturers.fulfilled, (state, { payload }) => {
        return {
          ...state,
          importLecturersStatus: ResponseStatus.Success,
        };
      })
      .addCase(importLecturers.rejected, (state, { payload }) => {
        return {
          ...state,
          importLecturersStatus: ResponseStatus.Failed,
        };
      })
      .addCase(deleteLecturersThunk.pending, (state, { payload }) => {
        return {
          ...state,
          deleteLecturersStatus: null,
        };
      })
      .addCase(deleteLecturersThunk.fulfilled, (state, { payload }) => {
        return {
          ...state,
          deleteLecturersStatus: ResponseStatus.Success,
        };
      })
      .addCase(deleteLecturersThunk.rejected, (state, { payload }) => {
        return {
          ...state,
          deleteLecturersStatus: ResponseStatus.Failed,
        };
      });
  },
});

export const lecturersUIReducer = lecturersUISlice.reducer;
export const lecturersReducer = lecturersSlice.reducer;
