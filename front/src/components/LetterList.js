import { Card, Col, Row } from 'antd';
import Meta from 'antd/lib/card/Meta';
import style from '../css/Main.module.css';

function LetterList() {
  return (
    <Row gutter={[20, 20]} align="center" sm={12}>
      <Col lg={12} xs={22}>
        <Card bordered={false} hoverable className={style.card}><Meta title="2022-03-16" description="천진우에게 " /></Card>
      </Col>
      <Col lg={12} xs={22}>
        <Card bordered={false} hoverable className={style.card}><Meta title="2022-03-16" description="천진우에게 " /></Card>
      </Col>
      <Col lg={12} xs={22}>
        <Card bordered={false} hoverable className={style.card}><Meta title="2022-03-16" description="천진우에게 " /></Card>
      </Col>
      <Col lg={12} xs={22}>
        <Card bordered={false} hoverable className={style.card}><Meta title="2022-03-16" description="천진우에게 " /></Card>
      </Col>
    </Row>
  );
}

export default LetterList;
