import React, { useRef, useState } from 'react';
import { Modal, Button, Input, Checkbox, Col, Row, DatePicker, TimePicker, Form } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { usePostLetterMutation } from '../service/Letter';

const { TextArea } = Input;

function WriteLetter({ modal, clsoeModal }) {
  const { register, handleSubmit, control } = useForm();
  const [postLetter, result] = usePostLetterMutation();
  const formRef = useRef();
  const onSubmit = (data) => {
    const date = new Date(data.antdDatePicker);
    const time = new Date(data.antdTimePicker);
    const fullDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes(), time.getSeconds());
    delete data.antdDatePicker;
    delete data.antdTimePicker;
    const snedData = { ...data, fullDate };
    console.log(snedData);
    // postLetter(data);
    // data request
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
          name="title"
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
