import { useEffect, useState } from 'react';
import { useGetSingleLetterQuery } from '../service/Letter';
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
  // const { data, isError } = useGetSingleLetterQuery();
  const { data, isLoading } = dummyQuery();
  return (
    <>
      {!isLoading && (data.readable && !data.iscrypted ? <LetterView data={data} /> : <LetterLoading data={data} />)}
    </>
  );
}

export default Letter;
