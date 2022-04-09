import {PlaygroundDTO} from '@kbklab/api-interfaces';
import {createEntityAdapter, createSlice, SliceCaseReducers,} from '@reduxjs/toolkit';
import {AppContext, ResponseStatus} from 'shared/constants';
import {fetchPlaygroundsThunk, finishPlaygroundThunk, startPlaygroundThunk} from './PlaygroundGrid.thunks';
import {PlaygroundGridState, PlaygroundUIState} from './PlaygroundGrid.types';

export const playgroundAdapter = createEntityAdapter<PlaygroundDTO>({
  selectId: (classLab) => classLab.id,
});
const initialState = playgroundAdapter.getInitialState();

export const playgroundsSlice = createSlice<PlaygroundGridState, SliceCaseReducers<PlaygroundGridState>>({
  name: AppContext.Playground,
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlaygroundsThunk.fulfilled, (state, {payload}) => {
        playgroundAdapter.upsertMany(state, payload.data)
      })
      .addCase(startPlaygroundThunk.fulfilled, (state, {payload}) => {
        const {playgroundId, url} = payload;
        playgroundAdapter.updateOne(state, {
          id: playgroundId,
          changes: {url}
        })
      })
      .addCase(finishPlaygroundThunk.fulfilled, (state, {payload}) => {
        playgroundAdapter.updateOne(state, {
          id: payload,
          changes: {url: undefined}
        })
      })
  },
});

const initialUIState: PlaygroundUIState = {
  finishPlaygroundStatus: null,
  startPlaygroundStatus: null,
}

export const playgroundUISlice = createSlice<PlaygroundUIState, SliceCaseReducers<PlaygroundUIState>>({
  name: AppContext.Playground,
  initialState: initialUIState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(startPlaygroundThunk.fulfilled, (state) => ({
        ...state,
        startPlaygroundStatus: ResponseStatus.Success
      }))
      .addCase(startPlaygroundThunk.rejected, (state) => ({
        ...state,
        startPlaygroundStatus: ResponseStatus.Failed
      }))
      .addCase(finishPlaygroundThunk.fulfilled, (state) => ({
        ...state,
        startPlaygroundStatus: ResponseStatus.Success
      }))
      .addCase(finishPlaygroundThunk.rejected, (state) => ({
        ...state,
        startPlaygroundStatus: ResponseStatus.Failed
      }))
  },
});

export const playgroundsReducer = playgroundsSlice.reducer;
export const playgroundsUIReducer = playgroundUISlice.reducer;
