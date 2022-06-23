import { CloseOutlined } from '@ant-design/icons';
import { Card, Col, Image, Row } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { useDispatch, useSelector } from 'react-redux';
import style from '../css/Main.module.css';
import img from '../img/bonfire.jpg';

function Letter({ data }) {
  return (
    <Row style={{ justifyContent: 'center', background: '#272D40', height: '100vh%' }}>
      <Col md={10} xs={23} align="center" className={style.backgroundImg}>
        <Row justify="center" align="middle" style={{ height: '90vh', padding: '14px' }}>
          <Col>
            <div>
              <h1 style={{ color: 'white' }}>{data.title}</h1>
            </div>
            <hr />
            <div style={{ textAlign: 'right', padding: '10px' }}>
              <p style={{ color: 'white' }}>{data.letterFrom}</p>
            </div>
            <br />
            <div>
              <p style={{ color: 'white' }}>{data.content}</p>
            </div>
            <br />
            <h1 style={{ color: 'white' }}>{data.letterTo}</h1>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default Letter;
