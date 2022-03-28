import { createSlice } from '@reduxjs/toolkit';

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
