import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  letters: [{
    id: 3,
    createAt: '2019-03-28',
    openAt: '2020-04-23-17-32-11',
    title: '타이틀이다',
  }],
};

const slice = createSlice({
  name: 'auth',
  initialState: { email: null },
  reducers: {
    setCredentials: (
      state,
      action,
    ) => {
      state.email = action.payload.email;
    },
  },
});

export const { setCredentials } = slice.actions;

export default slice.reducer;
