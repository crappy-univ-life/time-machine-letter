import { createSlice } from '@reduxjs/toolkit';
import { LetterApi } from '../service/Letter';
import { LoginApi } from '../service/login';

const slice = createSlice({
  name: 'auth',
  initialState: { email: null },
  extraReducers: (builder) => {
    builder.addMatcher(LoginApi.endpoints.logout.matchFulfilled, (state) => {
      state.email = '';
    });
    builder.addMatcher(LoginApi.endpoints.login.matchFulfilled, (state, action) => {
      state.email = action.payload.email;
    });
    builder.addMatcher(LetterApi.endpoints.getLetterList.matchFulfilled, (state, action) => {
      state.email = action.payload.email;
    });
  },
});

export default slice.reducer;
