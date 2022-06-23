import { CloseOutlined } from '@ant-design/icons';
import { Button, Card, Col, Form, Image, Input, Row } from 'antd';
import Meta from 'antd/lib/card/Meta';
import Countdown from 'antd/lib/statistic/Countdown';
import { useEffect, useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import style from '../css/Main.module.css';
import { usePostLetterPasswordMutation } from '../service/Letter';
import { formatOpenTime, formatTime } from '../utils/time';

function PasswordInput({ setLetterData }) {
  const [passwordPost, result] = usePostLetterPasswordMutation();
  useEffect(() => {
    if (result.isSuccess && !result.data.isEncrypted) {
      setLetterData(result.data);
    }
  }, [result.isSuccess]);
  const { handleSubmit, control } = useForm();
  const { hash } = useParams();
  const passwordSubmit = (data) => {
    console.log(data);
    console.log(hash);
    passwordPost({ hash, password: data.password });
  };

  return (
    <Form onFinish={handleSubmit(passwordSubmit)}>
      <Input.Group compact>
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur } }) => (
            <Input type="password" placeholder="비밀번호를 입력해주세요" onChange={onChange} onBlur={onBlur} addonAfter={<Button type="primary" htmlType="submit">Submit</Button>} />
          )}
        />
      </Input.Group>
    </Form>
  );
}

const renderTime = ({ remainingTime }) => {
  if (remainingTime === 0) {
    return <p style={{ color: 'white' }}>비밀번호를 입력해 주세요</p>;
  }
  const { hours, minutes, seconds } = formatTime(remainingTime);
  return (
    <div className="timer">
      <div className="text"><h1>남은시간</h1></div>
      <div>
        <p style={{ color: 'white' }}>{hours}:{minutes}:{seconds}</p>
      </div>
    </div>
  );
};

function LetterLoading({ data, setLetterData }) {
  const [isFinish, setIsFinish] = useState(false);
  const nowTime = new Date().getTime();
  const openTime = formatOpenTime(data.openAt);
  const duration = (openTime - nowTime) / 1000;

  return (
    <Row style={{ justifyContent: 'center', background: '#272D40', height: '100vh', alignItems: 'center' }}>
      <Col md={10} xs={23} align="center">
        <Row style={{ marginTop: '20px' }}>
          <Col xs={24}>
            <CountdownCircleTimer
              isPlaying
              size={300}
              strokeWidth={18}
              duration={duration}
              colors={['#004777', '#F7B801', '#A30000', '#A30000']}
              colorsTime={[duration * 0.75, duration * 0.5, duration * 0.1, 0]}
              onComplete={() => {
                setIsFinish(true);
              }}
            >
              {renderTime}
            </CountdownCircleTimer>
          </Col>
        </Row>
        {isFinish && (
        <Row style={{ justifyContent: 'center', marginTop: '20px' }}>
          <Col xs={12}>
            <PasswordInput setLetterData={setLetterData} />
          </Col>
        </Row>
        )}
      </Col>
    </Row>
  );
}

export default LetterLoading;
