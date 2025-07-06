import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App.jsx';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import { AppTheme } from './theme/AppTheme.jsx';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <AppTheme>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AppTheme>
    </Provider>
  </StrictMode>
);
