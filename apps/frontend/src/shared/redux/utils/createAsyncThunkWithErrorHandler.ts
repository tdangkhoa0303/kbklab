/* eslint-disable @typescript-eslint/ban-types */
import {AsyncThunk, AsyncThunkOptions, AsyncThunkPayloadCreator, createAsyncThunk} from '@reduxjs/toolkit';

export const createAsyncThunkWithErrorHandler = <Returned, ThunkArg = void>(
  typePrefix: string,
  payloadCreator: AsyncThunkPayloadCreator<Returned, ThunkArg, {}>,
  options?: AsyncThunkOptions<ThunkArg, {}>
): AsyncThunk<Returned, ThunkArg, {}> => (
  createAsyncThunk<Returned, ThunkArg>(
    typePrefix,
    async (payload, thunkAPI) => {
      try {
        return await payloadCreator(payload, thunkAPI);
      } catch (err) {
        return thunkAPI.rejectWithValue(err)
      }
    },
    options
  )
)
