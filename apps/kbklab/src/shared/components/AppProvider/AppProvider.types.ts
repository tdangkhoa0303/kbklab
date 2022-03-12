import {Reducer, Middleware} from 'redux'

export interface ReduxConfigurations {
	reducers: Record<string, Reducer>,
	middlewares: Middleware[]
}
