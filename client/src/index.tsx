import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/store';
import App from './App';
import { FormElementsProvider } from './Components/FormCreation/FormElementsContext';

const rootElement = document.getElementById('root') as HTMLElement;
const root = createRoot(rootElement);

root.render(
  <Provider store={store}>
    <FormElementsProvider>
    <App />
    </FormElementsProvider>
  </Provider>
);