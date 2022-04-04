import React, { useRef, useState } from 'react';
import { Modal, Button, Input, Checkbox, Col, Row, DatePicker, TimePicker, Form } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { usePostLetterMutation } from '../service/Letter';
import { closeWriteModal, openPreviewModal } from '../store/global';
import LetterPreviewModal from './LetterPreviewModal';
import { setSingleLetter } from '../store/letter';

const { TextArea } = Input;

const convertSendDate = (data) => {
  const date = new Date(data.antdDatePicker);
  const time = new Date(data.antdTimePicker);
  const fullDate = JSON.stringify(new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes(), time.getSeconds()));
  delete data.antdDatePicker;
  delete data.antdTimePicker;
  const sendData = { ...data, fullDate };
  return sendData;
};

function WriteLetter() {
  const modalVisible = useSelector((state) => state.global.writeModal);
  const dispatch = useDispatch();
  const { handleSubmit, control, getValues } = useForm();
  const [postLetter, result] = usePostLetterMutation();
  const formRef = useRef();
  const onSubmit = (data) => {
    const sendData = convertSendDate(data);
    console.log(sendData);
    // data fetch API
  };
  return (

    <Modal
      title="편지 작성"
      visible={modalVisible}
      onCancel={() => dispatch(closeWriteModal())}
      footer={[
        <Button type="info" onClick={() => { dispatch(setSingleLetter(convertSendDate(getValues()))); dispatch(openPreviewModal()); }}>
          미리보기
        </Button>,
        <LetterPreviewModal />,
        <Button type="primary" onClick={() => { formRef.current.submit(); }}>
          발송
        </Button>,
        <Button type="danger" onClick={() => dispatch(closeWriteModal())}>
          close
        </Button>]}
    >
      <Form onFinish={handleSubmit(onSubmit)} ref={formRef}>
        <Row justify="center">
          <Col>
            <Controller
              control={control}
              name="antdDatePicker"
              render={({ field: { onChange, onBlur, value } }) => (
                <DatePicker
                  onChange={onChange}
                  onBlur={onBlur}
                  selected={value}
                />
              )}
            />
            <Controller
              control={control}
              name="antdTimePicker"
              render={({ field: { onChange, onBlur, value } }) => (
                <TimePicker
                  onChange={onChange}
                  onBlur={onBlur}
                  selected={value}
                />
              )}
            />
          </Col>
        </Row>
        <Controller
          control={control}
          name="from"
          render={({ field: { onChange, onBlur } }) => (
            <Input addonBefore="발신인" style={{ marginTop: '20px' }} bordered={false} onChange={onChange} onBlur={onBlur} />
          )}
        />
        <hr />
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur } }) => (
            <Input.Password placeholder=" password" style={{ marginTop: '20px' }} bordered={false} onChange={onChange} onBlur={onBlur} />
          )}
        />
        <hr />
        <Controller
          control={control}
          name="title"
          render={({ field: { onChange, onBlur } }) => (
            <Input placeholder="편지 제목" style={{ marginTop: '20px' }} bordered={false} onChange={onChange} onBlur={onBlur} />
          )}
        />
        <hr />
        <Controller
          control={control}
          name="content"
          render={({ field: { onChange, onBlur } }) => (
            <TextArea rows={8} placeholder="편지 본문" style={{ marginTop: '20px' }} bordered={false} onChange={onChange} onBlur={onBlur} />
          )}
        />
        <hr />
        <Controller
          control={control}
          name="to"
          render={({ field: { onChange, onBlur } }) => (
            <Input addonBefore="수신인" style={{ marginTop: '20px' }} onChange={onChange} onBlur={onBlur} />
          )}
        />
        <hr />
      </Form>
    </Modal>

  );
}

export default WriteLetter;
