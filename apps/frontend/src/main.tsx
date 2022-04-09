import {StrictMode} from 'react';
import * as ReactDOM from 'react-dom';
import {AppProvider} from 'shared/components';
import App from './App';
import {errorHandling} from './shared/redux/middlewares';
import rootReducers from './shared/redux/rootReducers';

ReactDOM.render(
  <StrictMode>
    <AppProvider
      reduxConfigurations={{
        reducers: rootReducers,
        middlewares: [errorHandling],
      }}
    >
      <App />
    </AppProvider>
  </StrictMode>,
  document.getElementById('root')
);
