import {createSlice, SliceCaseReducers} from '@reduxjs/toolkit';
import {UIUserState, UserState} from './UserProvider.types';
import {AppContext, ResponseStatus} from 'shared/constants';
import {fetchUser, login} from './UserProvider.thunk'
import {User} from 'shared/models';

const initialUserState: UserState = null

export const userSlice = createSlice<UserState, SliceCaseReducers<UserState>>({
	name: AppContext.User,
	initialState: initialUserState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchUser.fulfilled, (state, {payload}) => {
				return payload.data as User
			})
			.addCase(login.fulfilled, (state, {payload}) => {
				return payload.data as User
			})
	}
})

const initialUIUserState: UIUserState = {
	isLoginSuccess: false,
	fetchUserInfoStatus: null
}

export const uiUserSlice = createSlice<UIUserState, SliceCaseReducers<UIUserState>>({
	name: AppContext.User,
	initialState: initialUIUserState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(login.pending, (state, {payload}) => {
				return {
					...state,
					isLoginSuccess: false
				}
			})
			.addCase(login.fulfilled, (state, {payload}) => {
				return {
					...state,
					isLoginSuccess: true
				}
			})
			.addCase(fetchUser.fulfilled, (state, {payload}) => {
				return {
					...state,
					fetchUserInfoStatus: ResponseStatus.Success
				}
			})
			.addCase(fetchUser.rejected, (state, {payload}) => {
				return {
					...state,
					fetchUserInfoStatus: ResponseStatus.Failed
				}
			})
	}
});
