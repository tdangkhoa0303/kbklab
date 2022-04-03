import {AnyAction} from 'redux';
import Immutable from 'seamless-immutable';
import {AsyncActionsState} from '../../constants';

const initialAsyncActionsState: AsyncActionsState = {
  currentActions: {},
  numberOfRequests: 0,
};

export const getActionName = (actionType: string): string => {
  return actionType.split('/').slice(0, -1).join('/');
};

const asyncActionsTrackingReducer = (
  state = initialAsyncActionsState,
  action: AnyAction
) => {
  const { type } = action;
  const actionName = getActionName(type);
  const immutableState = Immutable(state);

  if (type.endsWith('/pending')) {
    return immutableState
      .set('numberOfRequests', (previousState: number) => previousState + 1)
      .setIn(['currentActions', actionName], true);
  }

  if (type.endsWith('/fulfilled') || type.endsWith('/rejected')) {
    return immutableState
      .set('numberOfRequests', (previousState: number) =>
        previousState > 0 ? previousState - 1 : 0
      )
      .update('currentActions', (previousState: Record<string, boolean>) =>
        Immutable(previousState).without(actionName)
      );
  }

  return state;
};

export default asyncActionsTrackingReducer;
