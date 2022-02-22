import React from 'react'
import ReactDOM from 'react-dom';
import '../public/index.css';
import App from "../src/components/app/app";
import { Provider } from "react-redux";
import { ItplusServiceProvider } from './itplus-service-context/itplus-service-context';
import ItplusService from './services/itplus-service';
import store from './store';

const itplusService = new ItplusService;

ReactDOM.render(
  <Provider store={store}>
    <ItplusServiceProvider value={itplusService}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ItplusServiceProvider>
  </Provider>,
  document.getElementById('root')
)
