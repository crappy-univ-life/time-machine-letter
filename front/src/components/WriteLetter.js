import React, { useState } from 'react';
import { Modal, Button, Input, Checkbox, Col, Row, DatePicker, TimePicker } from 'antd';

const { TextArea } = Input;

function WriteLetter({ modal, clsoeModal }) {
  return (
    <Modal
      title="편지 작성"
      visible={modal}
      onCancel={clsoeModal}
      footer={[
        <Button type="info">
          미리보기
        </Button>,
        <Button type="danger" onClick={clsoeModal}>
          close
        </Button>]}
    >
      <Row justify="center">
        <Col> <DatePicker />
          <TimePicker />
        </Col>
      </Row>

      <Input addonBefore="발신인" style={{ marginTop: '20px' }} bordered={false} />
      <hr />
      <Input.Password placeholder=" password" style={{ marginTop: '20px' }} bordered={false} />
      <hr />
      <Input placeholder="편지 제목" style={{ marginTop: '20px' }} bordered={false} />
      <hr />
      <TextArea rows={8} placeholder="편지 본문" style={{ marginTop: '20px' }} bordered={false} />
      <hr />
      <Input addonBefore="수신인" style={{ marginTop: '20px' }} />
      <hr />
    </Modal>
  );
}

export default WriteLetter;
