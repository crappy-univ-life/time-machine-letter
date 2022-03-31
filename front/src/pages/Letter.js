import { useGetSingleLetterQuery } from '../service/Letter';
import LetterView from '../components/LetterView';
import LetterLoading from '../components/LetterLoading';

function Letter() {
  const { data, isError } = useGetSingleLetterQuery();
  return (
    <>
      {data.readable ? <LetterView data={data} /> : <LetterLoading data={data} />}
      {isError && <div>에러발생</div>}
    </>
  );
}

export default Letter();
