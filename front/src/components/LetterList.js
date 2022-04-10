import { Card, Col, Row } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import style from '../css/Main.module.css';
import useModal from '../Hooks/useModal';
import { openDetailModal } from '../store/global';
import LetterDetail from './LetterDetail';

function LetterList({ openLetter, closeLetter, allLetter }) {
  const letterList = useSelector((state) => state.letter.letterList);
  const today = new Date();
  let showList = [];
  const dispatch = useDispatch();
  if (openLetter) {
    showList = letterList.filter((letter) => new Date(letter.openAt) < today);
  } else if (closeLetter) {
    showList = letterList.filter((letter) => new Date(letter.openAt) > today);
  } else if (allLetter) {
    showList = letterList;
  }
  return (
    <Row gutter={[20, 20]} align="center" sm={12}>
      {showList.map((letter) => (
        <Col lg={12} xs={22}>
          <Card bordered={false} hoverable className={style.card} onClick={() => dispatch(openDetailModal(letter.hash))}><Meta title={letter.title} description={moment(letter.createAt).format('YYYY-MM-DD')} /></Card>
        </Col>
      ))}
    </Row>

  );
}

export default LetterList;
