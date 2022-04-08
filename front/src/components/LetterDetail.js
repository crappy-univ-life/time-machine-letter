import { Button, Col, Modal, Row, Skeleton, Space, Table } from 'antd';
import Countdown from 'antd/lib/statistic/Countdown';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import style from '../css/Main.module.css';
import useModal from '../Hooks/useModal';
import { useDeleteLetterMutation, useGetSingleLetterQuery } from '../service/Letter';
import { closeDetailModal, openPreviewModal, openUpdateModal, openWriteModal } from '../store/global';
import LetterPreviewModal from './LetterPreviewModal';
import LetterView from './LetterView';
import WriteLetter from './WriteLetter';

const dummyQuery = () => {
  const date = new Date('2022-04-04T23:50:00');
  const dummy = {
    readable: true,
    id: 3,
    createAt: '2019-03-28',
    openAt: date,
    title: '제목1',
    content: '첫번째 테스트 본문입니다',
    from: '개발자',
    to: '뭐',
  };
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  useEffect(() => {
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(dummy);
      }, 1000);
    }).then((result) => { setData(result); setIsLoading(false); });
  }, []);
  return { isLoading, data };
};

const convertDeadLine = (date) => date.getTime();

function LetterModal({ modal, LetterHash }) {
  const dispatch = useDispatch();
  const { data, isLoading } = useGetSingleLetterQuery(LetterHash);
  // const { isLoading, data } = dummyQuery();
  const [letterDelete, result] = useDeleteLetterMutation();
  useEffect(() => {
    if (result.isSuccess) {
      alert('삭제되었습니다');
      dispatch(closeDetailModal());
    } else if (result.isError) {
      alert('삭제에 실패하였습니다');
    }
  }, [result]);
  return (
    <Modal
      title="2022-03-18"
      visible={modal}
      onCancel={() => dispatch(closeDetailModal())}
      footer={[
        <Button type="info" onClick={() => dispatch(openPreviewModal())}>
          미리보기
        </Button>,
        <Button type="success" onClick={() => { dispatch(openUpdateModal()); dispatch(closeDetailModal()); }}>
          수정
        </Button>,
        <Button type="danger" onClick={() => letterDelete(LetterHash)}>
          삭제
        </Button>]}
    >
      <div style={{ textAlign: 'center', whiteSpace: 'pre-line' }}>
        <Countdown title="개봉까지 남은시간" value={isLoading ? 0 : data.openAt && convertDeadLine(new Date(data.openAt))} />
        <hr />
        <div style={{ padding: '10px' }}>
          <h1>{isLoading ? <Skeleton.Button active shape="round" /> : data?.title}</h1>
        </div>
        <div style={{ padding: '10px' }}>
          <p>{isLoading ? <Skeleton.Button active shape="round" /> : data?.content }</p>
        </div>
      </div>
      <hr />
      <div style={{ textAlign: 'end' }}>
        <p>발신자: {isLoading ? <Skeleton.Button active shape="round" /> : data?.letterFrom }</p>
        <p>수신자: {isLoading ? <Skeleton.Button active shape="round" /> : data?.letterTo }</p>
      </div>
    </Modal>
  );
}

function LetterDetail() {
  const detailModal = useSelector((state) => state.global.detailModal);
  const LetterHash = useSelector((state) => state.global.LetterHash);
  return (
    <>
      {detailModal && <LetterModal modal={detailModal} LetterHash={LetterHash} />}
    </>
  );
}

export default LetterDetail;
