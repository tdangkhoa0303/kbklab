import {AppContext} from 'shared/constants';
import {createAsyncThunkWithErrorHandler} from 'shared/redux/utils';
import {APIClient, APIClientResponse} from 'shared/utilities';
import {FetchPlaygroundResponse, StartPlaygroundFulfilledPayload} from './PlaygroundGrid.types';

export const fetchPlaygroundsThunk = createAsyncThunkWithErrorHandler<FetchPlaygroundResponse>(
  `${AppContext.Playground}/fetchPlaygrounds`,
  async () => {
    const response = await APIClient.get<FetchPlaygroundResponse>('playgrounds');
    return response.data;
  }
);

export const startPlaygroundThunk = createAsyncThunkWithErrorHandler<StartPlaygroundFulfilledPayload, string>(
  `${AppContext.Playground}/startPlayground`,
  async (playgroundId) => {
    const {data: response} = await APIClient.post<APIClientResponse<string>>(`playgrounds/${playgroundId}/attempt`);
    return {
      playgroundId,
      url: response.data
    };
  }
);

export const finishPlaygroundThunk = createAsyncThunkWithErrorHandler<string, string>(
  `${AppContext.Playground}/finishPlayground`,
  async (playgroundId) => {
    await APIClient.post<APIClientResponse<boolean>>(`playgrounds/${playgroundId}/finish`);
    return playgroundId;
  }
)
