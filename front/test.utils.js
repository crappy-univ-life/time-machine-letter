import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import store from './src/store';
import { LoginApi } from './src/service/login';
import { LetterApi } from './src/service/Letter';
import auth from './src/store/auth';
import letter from './src/store/letter';
import global from './src/store/global';

const customRender = (ui, {
  initialState = {},
  customStore = configureStore({
    preloadedState: initialState,
    reducer: {
      [LoginApi.reducerPath]: LoginApi.reducer,
      [LetterApi.reducerPath]: LetterApi.reducer,
      auth,
      letter,
      global,
    },
  }),
} = {}, options) => {
  function AllTheProviders({ children }) {
    return (
      <Provider store={customStore}>
        {children}
      </Provider>
    );
  }
  return render(ui, { wrapper: AllTheProviders, ...options });
};

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
