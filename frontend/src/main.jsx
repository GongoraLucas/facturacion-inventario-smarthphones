import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App.jsx';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import { AppTheme } from './theme/AppTheme.jsx';
import { BrowserRouter } from 'react-router-dom';
import GlobalSnackbar from './components/GlobalSnackbar.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <AppTheme>
        <BrowserRouter>
          <App />
          <GlobalSnackbar/>
        </BrowserRouter>
      </AppTheme>
    </Provider>
  </StrictMode>
);
