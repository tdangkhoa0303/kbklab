import {createSlice, SliceCaseReducers} from '@reduxjs/toolkit';
import {AppContext} from 'shared/constants';
import {AppBarUIState} from './AppBar.types';

const initialAppBarUIState: AppBarUIState = {
	searchText: ''
}

export const appBarUISlice = createSlice<AppBarUIState, SliceCaseReducers<AppBarUIState>>({
	name: AppContext.AppBar,
	initialState: initialAppBarUIState,
	reducers: {
		setSearchText: (state, {payload}) => ({
			...state,
			searchText: payload
		}),
	},
});

export const appBarUIReducer = appBarUISlice.reducer;
export const {setSearchText} = appBarUISlice.actions;
