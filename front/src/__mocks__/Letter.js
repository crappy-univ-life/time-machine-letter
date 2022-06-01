import { rest } from 'msw';

const date = new Date('2022-04-04T23:50:00');
const dummy = {
  readable: true,
  id: 3,
  createAt: '2019-03-28',
  openAt: date,
  title: '제목1',
  content: '첫번째 테스트 본문입니다',
  from: '개발자',
  to: '뭐',
};
export const Letter = [
  rest.get('http://timemachineletter.tk:8080/letter/:hash', (req, res, ctx) => res(ctx.status(200), ctx.json(dummy))),
];
