import React, { useEffect, useRef, useState } from 'react';
import { Modal, Button, Input, Checkbox, Col, Row, DatePicker, TimePicker, Form } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { usePostLetterMutation } from '../service/Letter';
import { closeWriteModal, openPreviewModal } from '../store/global';
import LetterPreviewModal from './LetterPreviewModal';
import { setSingleLetter } from '../store/letter';
import { convertSendDate } from '../utils/converter';

const { TextArea } = Input;

function LetterWrite() {
  const modalVisible = useSelector((state) => state.global.writeModal);
  const dispatch = useDispatch();
  const { handleSubmit, control, getValues, reset } = useForm();
  const [postLetter, result] = usePostLetterMutation();
  const formRef = useRef();
  const onSubmit = (data) => {
    const sendData = convertSendDate(data);
    postLetter(sendData);
    console.log(sendData);
  };
  useEffect(() => {
    if (result.isSuccess) {
      alert('메세지 보내기 성공');
      reset();
      dispatch(closeWriteModal());
    } else if (result.isError) {
      alert(result.error);
    }
  }, [result]);

  return (

    <Modal
      title="편지 작성"
      visible={modalVisible}
      onCancel={() => dispatch(closeWriteModal())}
      footer={[
        <Button style={{ backgroundColor: '#EAEFF9', borderRadius: '10px' }} onClick={() => { dispatch(setSingleLetter(convertSendDate(getValues()))); dispatch(openPreviewModal()); }}>
          <p style={{ color: 'black' }}>미리보기</p>
        </Button>,
        <LetterPreviewModal />,
        <Button style={{ backgroundColor: '#EAEFF9', borderRadius: '10px' }} onClick={() => { formRef.current.submit(); }}>
          <p style={{ color: 'black' }}>쓰기</p>
        </Button>,
        <Button style={{ backgroundColor: '#EA6F66', borderColor: '#EA6F66', borderRadius: '10px' }} onClick={() => dispatch(closeWriteModal())}>
          <p style={{ color: 'black' }}>닫기</p>
        </Button>]}
    >
      <Form onFinish={handleSubmit(onSubmit)} ref={formRef}>
        <Row justify="center" style={{ marginTop: '20px' }}>
          <Col>
            <Controller
              control={control}
              name="antdDatePicker"
              defaultValue={moment()}
              render={({ field: { onChange, onBlur, value } }) => (
                <DatePicker
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}

                />
              )}
            />
            <Controller
              control={control}
              name="antdTimePicker"
              defaultValue={moment()}
              render={({ field: { onChange, onBlur, value } }) => (
                <TimePicker
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
            />
          </Col>
        </Row>
        <Controller
          control={control}
          name="letterFrom"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input addonBefore="발신인" style={{ marginTop: '20px', padding: '20px', backgroundColor: '#2E364F' }} bordered={false} onChange={onChange} onBlur={onBlur} value={value} />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input.Password addonBefore="비밀번호" placeholder=" password" style={{ marginTop: '20px', padding: '20px' }} bordered={false} onChange={onChange} onBlur={onBlur} value={value} />
          )}
        />
        <Controller
          control={control}
          name="title"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input addonBefore="제목" placeholder="편지 제목" style={{ marginTop: '20px', padding: '20px' }} bordered={false} onChange={onChange} onBlur={onBlur} value={value} />
          )}
        />
        <Controller
          control={control}
          name="content"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextArea addonBefore="내용" rows={8} placeholder="편지 본문" style={{ marginTop: '20px', padding: '20px' }} bordered={false} onChange={onChange} onBlur={onBlur} value={value} />
          )}
        />
        <Controller
          control={control}
          name="letterTo"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input addonBefore="수신인" style={{ marginTop: '20px', padding: '20px' }} onChange={onChange} onBlur={onBlur} value={value} />
          )}
        />
      </Form>
    </Modal>

  );
}

export default LetterWrite;
