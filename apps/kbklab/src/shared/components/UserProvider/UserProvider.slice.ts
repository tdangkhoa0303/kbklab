import {createSlice, isAnyOf, SliceCaseReducers} from '@reduxjs/toolkit';
import {AppContext, ResponseStatus, UserState} from '../../constants';
import {fetchUser, login, loginWithGoogle} from './UserProvider.thunk';

const initialUserState: UserState = {
	currentUser: null,
	isLoginSuccess: false,
	fetchUserInfoStatus: null,
}

export const userSlice = createSlice<UserState, SliceCaseReducers<UserState>>({
	name: AppContext.User,
	initialState: initialUserState,
	reducers:{
		logout: () => initialUserState
	},
	extraReducers: builder => {
		builder
			.addCase(fetchUser.fulfilled, (state, {payload}) => {
				return {
					...state,
					currentUser: payload.data,
					isLoginSuccess: true,
					fetchUserInfoStatus: ResponseStatus.Success
				}
			})
			.addCase(fetchUser.rejected, (state, {payload}) => {
				return {
					...state,
					fetchUserInfoStatus: ResponseStatus.Failed
				}
			})
			.addMatcher(isAnyOf(login.pending, loginWithGoogle.pending), (state, {payload}) => {
				return {
					...state,
					isLoginSuccess: false
				}
			})
			.addMatcher(isAnyOf(login.fulfilled, loginWithGoogle.fulfilled), (state, {payload}) => {
				return {
					...state,
					currentUser: payload.data,
					isLoginSuccess: true,
				}
			})
	}
});

export const {logout} = userSlice.actions;
