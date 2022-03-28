import React, { useRef, useState } from 'react';
import { Modal, Button, Input, Checkbox, Col, Row, DatePicker, TimePicker, Form } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import useInput from '../Hooks/useInput';

const { TextArea } = Input;

function WriteLetter({ modal, clsoeModal }) {
  const { register, handleSubmit, control } = useForm();
  const formRef = useRef();
  const onSubmit = (data) => {
    const date = new Date(data.antdDatePicker);
    const time = new Date(data.antdTimePicker);
    const fullDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes(), time.getSeconds());
    console.log(fullDate);
    // data fetching
  };
  return (

    <Modal
      title="편지 작성"
      visible={modal}
      onCancel={clsoeModal}
      footer={[
        <Button type="info">
          미리보기
        </Button>,
        <Button type="primary" onClick={() => { formRef.current.submit(); }}>
          발송
        </Button>,
        <Button type="danger" onClick={clsoeModal}>
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

        <Input addonBefore="발신인" style={{ marginTop: '20px' }} bordered={false} {...register('from')} />
        <hr />
        <Input.Password placeholder=" password" style={{ marginTop: '20px' }} bordered={false} {...register('password')} />
        <hr />
        <Input placeholder="편지 제목" style={{ marginTop: '20px' }} bordered={false} {...register('title')} />
        <hr />
        <TextArea rows={8} placeholder="편지 본문" style={{ marginTop: '20px' }} bordered={false} {...register('content')} />
        <hr />
        <Input addonBefore="수신인" style={{ marginTop: '20px' }} {...register('to')} />
        <hr />
      </Form>
    </Modal>

  );
}

export default WriteLetter;
