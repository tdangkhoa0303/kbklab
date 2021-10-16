import {combineReducers} from 'redux';
import {userSlice, uiUserSlice} from '../components/UserProvider/UserProvider.slice';
import {labsReducer, labsUIReducer} from 'pages/StudentDashboard.slice'
import asyncActionsReducers from '../components/AppProvider/AsyncActions.reducers'
import {appBarUIReducer} from 'components/AppBar/AppBar.slice';

const uiReducer = combineReducers({
	user: uiUserSlice.reducer,
	labs: labsUIReducer,
	appBar: appBarUIReducer
})

const entitiesReducer = combineReducers({
	labs: labsReducer
})

const rootReducer = combineReducers({
	ui: uiReducer,
	entities: entitiesReducer,
	user: userSlice.reducer,
	asyncActions: asyncActionsReducers
})

export type RootState = ReturnType<typeof rootReducer>;
export type UIState = ReturnType<typeof uiReducer>;
export type EntitiesState = ReturnType<typeof entitiesReducer>;
export default rootReducer;