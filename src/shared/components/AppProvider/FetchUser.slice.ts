import {createSlice, SliceCaseReducers} from '@reduxjs/toolkit';
import {UserState} from "./FetchUser.types";
import {AppContext} from 'shared/constants';
import {fetchUser, login} from './FetchUser.thunk'

const initialUserState: UserState = null

const userSlice = createSlice<UserState, SliceCaseReducers<UserState>>({
	name: AppContext.User,
	initialState: initialUserState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchUser.fulfilled, (state, {payload}) => {
				return payload.data
			})
			.addCase(login.fulfilled, (state, {payload}) => {
				return payload.data
			})
	}
})

export default userSlice.reducer;