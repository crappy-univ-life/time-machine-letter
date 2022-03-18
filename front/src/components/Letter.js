import { CloseOutlined } from '@ant-design/icons';
import { Card, Col, Image, Row } from 'antd';
import Meta from 'antd/lib/card/Meta';
import style from '../css/Main.module.css';
import img from '../img/bonfire.jpg';

function Letter() {
  return (
    <Row className={style.content} style={{ height: '100vh%' }}>
      <Col md={10} xs={23} align="center" className={style.backgroundImg}>
        <Row justify="center" align="middle" style={{ height: '90vh', padding: '14px' }}>
          <Col>
            <div>
              <h1>디자이너를 줘라</h1>
            </div>
            <hr />
            <div style={{ textAlign: 'right', padding: '10px' }}>
              <p>발신 프론트</p>
            </div>
            <br />
            <div>
              <p>{'디자이너 불러와 디자이너 불러와 디자이너 불러와 디자이너 불러와 디자이너 불러와 디자이너 불러와 디자이너 불러와 \n디자이너 불러와 디자이너 불러와 디자이너 불러와 디자이너 불러와 디자이너 불러와 디자이너 불러와 디자이너 불러와 \n디자이너 불러와 디자이너 불러와 디자이너 불러와 디자이너 불러와 디자이너 불러와 디자이너 불러와 디자이너 불러와 \n디자이너 불러와 디자이너 불러와 디자이너 불러와 디자이너 불러와 디자이너 불러와 디자이너 불러와 디자이너 불러와 \n디자이너 불러와 디자이너 불러와 디자이너 불러와 디자이너 불러와 디자이너 불러와 디자이너 불러와 디자이너 불러와 \n디자이너 불러와 디자이너 불러와 디자이너 불러와 디자이너 불러와 디자이너 불러와 디자이너 불러와 디자이너 불러와 \n디자이너 불러와 디자이너 불러와 디자이너 불러와 디자이너 불러와 디자이너 불러와 디자이너 불러와 디자이너 불러와 \n'}</p>
            </div>
            <br />
            <h1>수신 디자이너</h1>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default Letter;
