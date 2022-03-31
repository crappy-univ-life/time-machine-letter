import { createSlice } from '@reduxjs/toolkit';
import { LetterApi } from '../service/Letter';

const dummyState = {
  email: null,
  singleLetter: {
    readable: true,
    id: 3,
    createAt: '2019-03-28',
    openAt: new Date(),
    title: '제목1',
    content: '첫번째 테스트 본문입니다',
    from: '개발자',
    to: '뭐',
  },
  letters: [{
    id: 3,
    createAt: '2019-03-28',
    openAt: new Date(),
    title: '제목1',
  }, {
    id: 4,
    createAt: '2019-03-28',
    openAt: new Date(),
    title: '제목2',
  }, {
    id: 5,
    createAt: '2019-03-28',
    openAt: new Date(),
    title: '제목3',
  }, {
    id: 6,
    createAt: '2019-03-28',
    openAt: new Date(),
    title: '제목4',
  }],
};

const slice = createSlice({
  name: 'letter',
  initialState: dummyState,
  extraReducers: (builder) => {
    builder.addMatcher(LetterApi.endpoints.getSingleLetter.matchFulfilled, (state, action) => {
      state.singleLetter = action.payload.result;
    });
  },
});

export const { setCredentials } = slice.actions;

export default slice.reducer;
