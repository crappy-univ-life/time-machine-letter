import React, { useEffect, useRef, useState } from 'react';
import { Modal, Button, Input, Checkbox, Col, Row, DatePicker, TimePicker, Form } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { usePostLetterMutation, useUpdateLetterMutation } from '../service/Letter';
import { closeUpdateModal, closeWriteModal, openPreviewModal } from '../store/global';
import LetterPreviewModal from './LetterPreviewModal';
import { setSingleLetter } from '../store/letter';

const { TextArea } = Input;

const convertSendDate = (data) => {
  const date = new Date(data.antdDatePicker);
  const time = new Date(data.antdTimePicker);
  const openAt = new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes(), time.getSeconds());
  delete data.antdDatePicker;
  delete data.antdTimePicker;
  const sendData = { ...data, openAt };
  return sendData;
};

function LetterUpdate() {
  const modalVisible = useSelector((state) => state.global.updateModal);
  const singleLetter = useSelector((state) => state.letter.singleLetter);

  const dispatch = useDispatch();
  const { handleSubmit, control, getValues, reset } = useForm();
  const [updateLetter, result] = useUpdateLetterMutation();
  const formRef = useRef();
  const onSubmit = (data) => {
    const sendData = convertSendDate(data);
    updateLetter(sendData);
    console.log(sendData);
  };
  useEffect(() => {
    reset(singleLetter);
  }, [singleLetter]);
  useEffect(() => {
    if (result.isSuccess) {
      alert('메세지 수정 성공');
      reset();
      dispatch(closeWriteModal());
    } else if (result.isError) {
      alert(result.error);
    }
  }, [result]);
  console.log(getValues());
  return (

    <Modal
      title="편지 작성"
      visible={modalVisible}
      onCancel={() => dispatch(closeUpdateModal())}
      footer={[
        <Button type="info" onClick={() => { dispatch(setSingleLetter(convertSendDate(getValues()))); dispatch(openPreviewModal()); }}>
          미리보기
        </Button>,
        <LetterPreviewModal />,
        <Button type="primary" onClick={() => { formRef.current.submit(); }}>
          발송
        </Button>,
        <Button type="danger" onClick={() => dispatch(closeUpdateModal())}>
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
                  value={value}
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
            <Input addonBefore="발신인" style={{ marginTop: '20px' }} bordered={false} onChange={onChange} onBlur={onBlur} value={value} />
          )}
        />
        <hr />
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input.Password placeholder=" password" style={{ marginTop: '20px' }} bordered={false} onChange={onChange} onBlur={onBlur} value={value} />
          )}
        />
        <hr />
        <Controller
          control={control}
          name="title"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input placeholder="편지 제목" style={{ marginTop: '20px' }} bordered={false} onChange={onChange} onBlur={onBlur} value={value} />
          )}
        />
        <hr />
        <Controller
          control={control}
          name="content"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextArea rows={8} placeholder="편지 본문" style={{ marginTop: '20px' }} bordered={false} onChange={onChange} onBlur={onBlur} value={value} />
          )}
        />
        <hr />
        <Controller
          control={control}
          name="letterTo"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input addonBefore="수신인" style={{ marginTop: '20px' }} onChange={onChange} onBlur={onBlur} value={value} />
          )}
        />
        <hr />
      </Form>
    </Modal>

  );
}

export default LetterUpdate;
