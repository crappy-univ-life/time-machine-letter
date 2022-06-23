import { LoginOutlined, LogoutOutlined, PlusSquareTwoTone, SendOutlined } from '@ant-design/icons';
import { Button, Card, Col, Image, Layout, Menu, Row, Tabs } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { Content, Header } from 'antd/lib/layout/layout';
import SubMenu from 'antd/lib/menu/SubMenu';
import { Children, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import style from '../css/Main.module.css';
import WriteLetter from '../components/WriteLetter';
import { openWriteModal } from '../store/global';
import { useLogoutMutation } from '../service/login';
import { useGetLetterListQuery } from '../service/Letter';
import LetterPreviewModal from '../components/LetterPreviewModal';
import LetterDetail from '../components/LetterDetail';
import LetterUpdate from '../components/LetterUpdate';
import LetterList from '../components/LetterList/LetterList';
import NavBar from '../components/NavBar';

const { TabPane } = Tabs;

export function RequireAuth({ children }) {
  const { data, isSuccess } = useGetLetterListQuery();
  return (isSuccess && (data.email ? children : <Navigate to="/login" />));
}

function Main() {
  const navigate = useNavigate();
  const [logout, result] = useLogoutMutation();
  const [letterMode, setLetterMode] = useState({ allLetter: true, closeLetter: false, openLetter: false });
  useEffect(() => {
    if (result.error) {
      alert('로그아웃 실패');
    }
    if (result.isSuccess) {
      navigate('/login');
    }
  }, [result]);

  return (
    <>
      <Row align="center">
        <LetterPreviewModal />
        <WriteLetter />
        <LetterUpdate />
        <LetterDetail />
        <Col md={12} xs={20}>
          <NavBar setLetterMode={setLetterMode} logout={logout} />
        </Col>
      </Row>
      <Row align="center">
        <Col md={12} xs={20} className={style.content}>
          <Row align="center">
            <Col style={{ marginTop: '60px' }}>
              <h1>제목</h1>
            </Col>
          </Row>
          <Row align="center">
            <Col md={12} xs={20}>
              <hr size="1" />
            </Col>
          </Row>
          <Row align="center">
            <Col xs={20}>
              <LetterList {...letterMode} />
            </Col>
          </Row>
        </Col>
      </Row>
    </>

  );
}

export default Main;
