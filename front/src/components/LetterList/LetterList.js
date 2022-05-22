import { Card, Col, Row } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { useDispatch, useSelector } from 'react-redux';

import style from '../../css/Main.module.css';
import { openDetailModal } from '../../store/global';
import LetterDetail from '../LetterDetail';
import LetterListCard from './LetterListCard';

function LetterList({ openLetter, closeLetter, allLetter }) {
  const dispatch = useDispatch();
  const { letterList } = useSelector((state) => state.letter);
  const today = new Date();
  let showList = [];
  if (openLetter) {
    showList = letterList.filter((letter) => new Date(letter.openAt) < today);
  } else if (closeLetter) {
    showList = letterList.filter((letter) => new Date(letter.openAt) > today);
  } else if (allLetter) {
    showList = letterList;
  }

  const onCardClick = (hash) => {
    dispatch(openDetailModal(hash));
  };
  return (
    <Row gutter={[20, 20]} align="center" sm={12}>
      {showList.map((letter) => (
        <LetterListCard letter={letter} onCardClick={onCardClick} key={letter.hash} />
      ))}
    </Row>
  );
}

export default LetterList;
