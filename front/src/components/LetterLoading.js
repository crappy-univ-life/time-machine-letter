import { CloseOutlined } from '@ant-design/icons';
import { Card, Col, Image, Row } from 'antd';
import Meta from 'antd/lib/card/Meta';
import Countdown from 'antd/lib/statistic/Countdown';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import style from '../css/Main.module.css';

const renderTime = ({ remainingTime }) => {
  if (remainingTime === 0) {
    return <div className="timer"><h1>로딩중...</h1></div>;
  }
  console.log(remainingTime);
  const hours = Math.floor(remainingTime / 3600).toString().padStart(2, '0');
  const minutes = Math.floor((remainingTime % 3600) / 60).toString().padStart(2, '0');
  const seconds = (remainingTime % 60).toString().padStart(2, '0');

  return (
    <div className="timer">
      <div className="text"><h1>남은시간</h1></div>
      <div>
        <p>{hours}:{minutes}:{seconds}</p>
      </div>
    </div>
  );
};

function LetterLoading() {
  const duration = 60;
  return (
    <Row className={style.content} style={{ height: '100vh', alignItems: 'center' }}>
      <Col md={10} xs={23} align="center">
        <Row>
          <Col xs={24}><h1>FROM. 프론트</h1></Col>
        </Row>
        <Row style={{ marginTop: '20px' }}>
          <Col xs={24}>
            <CountdownCircleTimer
              isPlaying
              size={300}
              strokeWidth={18}
              duration={duration}
              colors={['#004777', '#F7B801', '#A30000', '#A30000']}
              colorsTime={[duration * 0.75, duration * 0.5, duration * 0.1, 0]}
            >
              {renderTime}
            </CountdownCircleTimer>
          </Col>
        </Row>

      </Col>
    </Row>
  );
}

export default LetterLoading;
