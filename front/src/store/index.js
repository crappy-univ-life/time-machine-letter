import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { LoginApi } from '../service/login';

const store = configureStore({
  reducer: { [LoginApi.reducerPath]: LoginApi.reducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(LoginApi.middleware),
});

export default store;
