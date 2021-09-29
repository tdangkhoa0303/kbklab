import {combineReducers} from 'redux';
import userReducer from 'shared/components/AppProvider/FetchUser.slice';
import asyncActionsReducers from 'shared/components/AppProvider/AsyncActions.reducers'

const rootReducer = combineReducers({
	user: userReducer,
	asyncActions: asyncActionsReducers
})

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;