import {RootState} from './rootReducers';
import {UserState} from 'shared/components/AppProvider/FetchUser.types';

export const userSelector = (state: RootState): UserState => state.user;