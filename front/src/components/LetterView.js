import { CloseOutlined } from '@ant-design/icons';
import { Card, Col, Image, Row } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { useDispatch, useSelector } from 'react-redux';
import style from '../css/Main.module.css';
import img from '../img/bonfire.jpg';

function Letter({ data }) {
  return (
    <Row className={style.content} style={{ height: '100vh%' }}>
      <Col md={10} xs={23} align="center" className={style.backgroundImg}>
        <Row justify="center" align="middle" style={{ height: '90vh', padding: '14px' }}>
          <Col>
            <div>
              <h1>{data.title}</h1>
            </div>
            <hr />
            <div style={{ textAlign: 'right', padding: '10px' }}>
              <p>{data.from}</p>
            </div>
            <br />
            <div>
              <p>{data.content}</p>
            </div>
            <br />
            <h1>{data.to}</h1>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default Letter;
