import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import './services/i18n';
import './index.css';
import App from './components/App/App';
import store from './store/store';
import reportWebVitals from './reportWebVitals';
import theme from './constants/theme';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
function render() {
  root.render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

render();
if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./components/App/App', render);
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
