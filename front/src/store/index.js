import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { LoginApi } from '../service/login';
import auth from './auth';

const store = configureStore({
  reducer: {
    [LoginApi.reducerPath]: LoginApi.reducer,
    auth,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(LoginApi.middleware),
});

export default store;
