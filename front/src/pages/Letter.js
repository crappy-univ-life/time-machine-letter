import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetSingleLetterQuery, usePostLetterPasswordMutation } from '../service/Letter';
import LetterView from '../components/LetterView';
import LetterLoading from '../components/LetterLoading';

const dummyQuery = () => {
  const date = new Date('2022-04-04T23:50:00');
  const dummy = {
    readable: true,
    iscrypted: false,
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

function Letter() {
  const { hash } = useParams();
  const { data, isSuccess } = useGetSingleLetterQuery(hash);
  // const { data, isLoading } = dummyQuery();
  // 데이터 저장 state도 필요
  const [letterData, setLetterData] = useState(data);
  useEffect(() => {
    if (data) {
      setLetterData(data);
    }
  }, [data, isSuccess]);
  return (
    <>
      {letterData && ((letterData.readable && !letterData.isEncrypted) ? <LetterView data={letterData} /> : <LetterLoading data={letterData} setLetterData={setLetterData} />)}
    </>
  );
}

export default Letter;
