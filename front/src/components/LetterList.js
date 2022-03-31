import { Card, Col, Row } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { useSelector } from 'react-redux';
import style from '../css/Main.module.css';
import useModal from '../Hooks/useModal';
import LetterDetail from './LetterDetail';

function LetterList() {
  const { openModal: openDetail, closeModal: closeDetail, modal: visibleDetail } = useModal();
  const letterList = useSelector((state) => state.letter.letters);
  return (
    <Row gutter={[20, 20]} align="center" sm={12}>
      {letterList.map((letter) => (
        <Col lg={12} xs={22}>
          <Card bordered={false} hoverable className={style.card} onClick={openDetail}><Meta title={letter.createAt} description={letter.title} /></Card>
        </Col>
      ))}
      <LetterDetail modal={visibleDetail} closeModal={closeDetail} />
    </Row>
  );
}

export default LetterList;
