import {Middleware, Reducer} from 'redux';

export interface ReduxConfigurations {
  reducers: Record<string, Reducer>;
  middlewares: Middleware[];
}
