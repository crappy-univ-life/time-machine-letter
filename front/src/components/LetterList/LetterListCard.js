import { Card, Col } from 'antd';
import Meta from 'antd/lib/card/Meta';
import moment from 'moment';
import style from '../../css/Main.module.css';

export default function LetterListCard({ letter, onCardClick }) {
  return (
    <Col lg={12} xs={22}>
      <Card
        bordered={false}
        hoverable
        className={style.card}
        onClick={onCardClick(letter.hash)}
      >
        <Meta title={letter.title} description={moment(letter.createAt).format('YYYY-MM-DD')} />
      </Card>
    </Col>
  );
}
