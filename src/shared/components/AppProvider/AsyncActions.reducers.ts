import {AnyAction} from 'redux'
type AsyncActionState = Record<string, boolean>;

const initialAsyncActionState: AsyncActionState = {};

export const getActionName = (actionType: string): string => {
	return actionType
		.split('/')
		.slice(0, -1)
		.join('/');
}

const asyncActionsReducers = (state = initialAsyncActionState, action: AnyAction) => {
	const {type} = action;
	const actionName = getActionName(type);

	if (type.endsWith('/pending')) {
		return {
			...state,
			[actionName]: true
		};
	}

	if (type.endsWith('/fulfilled') || type.endsWith('/rejected')) {
		return {
			...state,
			[actionName]: false
		};
	}

	return {
		...state
	};
};

export default asyncActionsReducers;