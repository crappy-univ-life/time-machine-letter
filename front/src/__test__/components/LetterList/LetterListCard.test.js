import { render, fireEvent } from '../../../../test.utils';
import LetterListCard from '../../../components/LetterList/LetterListCard';
import { singleDummyLetter } from '../../../fixtures/dummyLetter';

describe('LetterListCard 테스트코드', () => {
  it('클릭시 modal창이 열림', () => {
    const onCardClick = jest.fn();
    const { container } = render((<LetterListCard onCardClick={onCardClick} letter={singleDummyLetter} />));
    fireEvent.click(container);
    expect(onCardClick).toBeCalledWith('sodihfgiu9oah894r3hjiohwsrfoi');
  });
});
