import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { LetterApi } from '../service/Letter';
import { LoginApi } from '../service/login';
import auth from './auth';
import letter from './letter';
import global from './global';

const store = configureStore({
  reducer: {
    [LoginApi.reducerPath]: LoginApi.reducer,
    [LetterApi.reducerPath]: LetterApi.reducer,
    auth,
    letter,
    global,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(LoginApi.middleware)
    .concat(LetterApi.middleware),

});

export default store;
