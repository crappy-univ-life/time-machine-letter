import { Col, Row } from 'antd';
import { useDispatch } from 'react-redux';
import style from '../css/NavBar.module.css';
import { openWriteModal } from '../store/global';

function NavBar({ setLetterMode }) {
  const dispatch = useDispatch();
  const onClickAllLetters = () => {
    setLetterMode({ allLetter: true, closeLetter: false, openLetter: false });
  };
  const onClickOpenLetters = () => {
    setLetterMode({ allLetter: false, closeLetter: false, openLetter: true });
  };
  const onClickCloseLetters = () => {
    setLetterMode({ allLetter: false, closeLetter: true, openLetter: false });
  };
  return (
    <Row justify="space-around" className={style.nav} align="middle">
      <Col onClick={onClickAllLetters}><span>전체 편지</span></Col>
      <Col onClick={onClickCloseLetters}><span>열람 불가 편지</span></Col>
      <Col onClick={onClickOpenLetters}><span>열람 가능 편지</span></Col>
      <Col onClick={() => dispatch(openWriteModal())}><span>편지 작성</span></Col>
      <Col />
      <Col><span>로그아웃</span></Col>
    </Row>
  );
}
export default NavBar;
