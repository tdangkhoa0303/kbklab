import {AppContext} from 'shared/constants';
import {createAsyncThunkWithErrorHandler} from 'shared/redux/utils';
import {APIClient} from 'shared/utilities';
import {
  AttemptLabFulfilledPayload,
  AttemptLabPayload,
  AttemptLabResponse,
  FinishLabFulfilledPayload,
  FinishLabPayload,
  FinishLabResponse,
} from './types';

export const attemptLabThunk = createAsyncThunkWithErrorHandler<
  AttemptLabFulfilledPayload,
  AttemptLabPayload
>(`${AppContext.Lab}/attemptLab`, async ({ classLabId, isStudent }) => {
  const {data: response} = await APIClient.post<AttemptLabResponse>(
    `instances/${classLabId}/attempt`
  );
  return {
    data: response.data,
    classLabId,
    isStudent,
  };
});

export const finishLabThunk = createAsyncThunkWithErrorHandler<
  FinishLabFulfilledPayload,
  FinishLabPayload
>(`${AppContext.Lab}/finishLab`, async (payload) => {
  const { data: response } = await APIClient.post<FinishLabResponse>(
    `instances/finishAttempt`,
    payload
  );
  return {
    ...payload,
    ...response.data,
  };
});
