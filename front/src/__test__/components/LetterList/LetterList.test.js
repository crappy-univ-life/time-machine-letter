import { render, screen, fireEvent } from '../../../../test.utils';
import LetterList from '../../../components/LetterList/LetterList';
import { dummyLetter } from '../../../fixtures/dummyLetter';

describe('LetterList 테스트코드', () => {
  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(new Date('2022-05-20T06:10:16.000+00:00'));
  });

  it('열람가능한 편지', async () => {
    render(<LetterList openLetter />, { initialState: dummyLetter });
    expect(await screen.findByText('오픈된 편지')).toBeInTheDocument();
  });
  it('열람불가능한 편지', () => {
    render((<LetterList closeLetter />), { initialState: dummyLetter });
    expect(screen.getByText('오픈되지 않은 편지')).toBeInTheDocument();
  });
  it('모든편지', () => {
    render((<LetterList allLetter />), { initialState: dummyLetter });
    expect(screen.getByText('오픈된 편지')).toBeInTheDocument();
    expect(screen.getByText('오픈되지 않은 편지')).toBeInTheDocument();
  });
});
