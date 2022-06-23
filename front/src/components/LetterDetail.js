import { Button, Col, Input, Modal, Row, Skeleton, Space, Table } from 'antd';
import Countdown from 'antd/lib/statistic/Countdown';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import style from '../css/Main.module.css';
import { useDeleteLetterMutation, useGetSingleLetterQuery } from '../service/Letter';
import { closeDetailModal, openPreviewModal, openUpdateModal, openWriteModal } from '../store/global';
import { formatOpenTime } from '../utils/time';
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

function LetterDetail() {
  const modal = useSelector((state) => state.global.detailModal);
  const LetterHash = useSelector((state) => state.global.LetterHash);
  const dispatch = useDispatch();
  // const { data, isLoading, refetch } = useGetSingleLetterQuery(LetterHash);
  const { isLoading, data } = dummyQuery();
  const [letterDelete, result] = useDeleteLetterMutation();
  // useEffect(() => {
  //   if (modal) {
  //     refetch();
  //   }
  // }, [modal]);
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
        <Button style={{ backgroundColor: '#EAEFF9', borderRadius: '10px' }} onClick={() => dispatch(openPreviewModal())}>
          <p style={{ color: 'black' }}>미리보기</p>
        </Button>,
        <Button style={{ backgroundColor: '#EAEFF9', borderRadius: '10px' }} onClick={() => { dispatch(openUpdateModal()); dispatch(closeDetailModal()); }}>
          <p style={{ color: 'black' }}>수정</p>
        </Button>,
        <Button style={{ backgroundColor: '#EA6F66', borderColor: '#EA6F66', borderRadius: '10px' }} onClick={() => letterDelete(LetterHash)}>
          <p style={{ color: 'black' }}>삭제</p>
        </Button>]}
    >
      <div style={{ textAlign: 'center', whiteSpace: 'pre-line' }}>
        <div style={{ backgroundColor: '#2E364F', width: '100%', padding: '20px' }}>
          <Countdown title="개봉까지 남은시간" value={isLoading ? 0 : data && formatOpenTime(data.openAt)} />
        </div>
        <div style={{ padding: '10px', backgroundColor: '#2E364F', marginTop: '20px' }}>
          <h1>{isLoading ? <Skeleton.Button active shape="round" /> : data?.title}</h1>
          <p>{isLoading ? <Skeleton.Button active shape="round" /> : data?.content }</p>
        </div>
      </div>
      <div style={{ textAlign: 'end', backgroundColor: '#2E364F', padding: '20px' }}>
        <p>발신자: {isLoading ? <Skeleton.Button active shape="round" /> : data?.letterFrom }</p>
        <p>수신자: {isLoading ? <Skeleton.Button active shape="round" /> : data?.letterTo }</p>
      </div>
      <div style={{ textAlign: 'center', backgroundColor: '#2E364F', marginTop: '20px', padding: '10px' }}>
        <p>{data && `http://timemachineletter.tk/letter/${LetterHash}`}</p>
      </div>
    </Modal>
  );
}

export default LetterDetail;
