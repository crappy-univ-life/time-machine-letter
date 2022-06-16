import { rest } from 'msw';
import { render, screen, fireEvent, waitFor } from '../../../test.utils';
import LetterDetail from '../../components/LetterDetail';
import { server } from '../../__mocks__/server';

describe('LetterDetail 테스트 코드', () => {
  it('dummy 데이터를 받아 컴포넌트에 보여준다', async () => {
    render(<LetterDetail />, {
      initialState: {
        global: {
          detailModal: true,
          LetterHash: 'sodihfgiu9oah894r3hjiohwsrfoi',
        },
      },
    });
    screen.findByText('발신자:');
    await screen.findByText('발신자: 개발자');
    await screen.findByText('수신자: 뭐');
    await screen.findByText('첫번째 테스트 본문입니다');
    await screen.findByText('제목1');
  });
  it('삭제버튼을 클릭했을때 삭제에 성공한다', async () => {
    render(<LetterDetail />, {
      initialState: {
        global: {
          detailModal: true,
          LetterHash: 'sodihfgiu9oah894r3hjiohwsrfoi',
        },
      },
    });
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    const deleteButton = screen.getByText('삭제');
    fireEvent.click(deleteButton);
    await waitFor(() => expect(window.alert).toBeCalledWith('삭제되었습니다'));
  });
  it('삭제 버튼을 클릭했을때 삭제에 실패한다', async () => {
    render(<LetterDetail />, {
      initialState: {
        global: {
          detailModal: true,
          LetterHash: 'sodihfgiu9oah894r3hjiohwsrfoi',
        },
      },
    });
    const baseURL = 'http://timemachineletter.tk:8080/';
    server.use(
      rest.delete(`${baseURL}letter/:hash`, (req, res, ctx) => res(ctx.status(400))),
    );
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    const deleteButton = screen.getByText('삭제');
    fireEvent.click(deleteButton);
    await waitFor(() => expect(window.alert).toBeCalledWith('삭제에 실패하였습니다'));
  });
});
