import React, {PropsWithChildren, useMemo} from 'react';
import {Provider} from 'react-redux';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import thunkMiddleware from 'redux-thunk';
import {ReduxConfigurations} from '../AppProvider/AppProvider.types';
import {userSlice} from '../UserProvider/UserProvider.slice';
import asyncActionsTrackingReducer from './asyncActionsTrackingReducer';

export interface ReduxProviderProps {
  reduxConfigurations: ReduxConfigurations;
}

const ReduxProvider: React.FC<PropsWithChildren<ReduxProviderProps>> = (
  props
) => {
  const { children, reduxConfigurations } = props;
  const rootReducer = useMemo(
    () =>
      combineReducers({
        user: userSlice.reducer,
        asyncActions: asyncActionsTrackingReducer,
        ...reduxConfigurations.reducers,
      }),
    [reduxConfigurations.reducers]
  );

  const composedEnhancer = useMemo(
    () =>
      composeWithDevTools(
        applyMiddleware(thunkMiddleware, ...reduxConfigurations.middlewares)
      ),
    [reduxConfigurations.middlewares]
  );

  const reduxStore = useMemo(
    () => createStore(rootReducer, composedEnhancer),
    [rootReducer, composedEnhancer]
  );

  return <Provider store={reduxStore}>{children}</Provider>;
};

export default React.memo(ReduxProvider);
