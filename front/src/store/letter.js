import { createSlice } from '@reduxjs/toolkit';
import { LetterApi } from '../service/Letter';
import { LoginApi } from '../service/login';

const initialState = {
  email: null,
  singleLetter: null,
  letterList: [],
};

const slice = createSlice({
  name: 'letter',
  initialState,
  reducers: {
    setSingleLetter: (state, action) => {
      state.singleLetter = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addMatcher(LetterApi.endpoints.getSingleLetter.matchFulfilled, (state, action) => {
      state.singleLetter = action.payload;
    });
    builder.addMatcher(LetterApi.endpoints.getLetterList.matchFulfilled, (state, action) => {
      state.letterList = action.payload.letterList;
    });
    builder.addMatcher(LoginApi.endpoints.login.matchFulfilled, (state, action) => {
      state.letterList = action.payload.letterList;
    });
  },
});

export const { setCredentials, setSingleLetter } = slice.actions;

export default slice.reducer;
