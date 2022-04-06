import { createSelector } from '@reduxjs/toolkit';
import { createApi } from '@reduxjs/toolkit/query';
import { Popover, Spin } from 'antd';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LoginApi, useLoginMutation } from '../service/login';

function KakaoHandler() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const accessCode = new URL(window.location.href).searchParams.get('code');
  const [getUserToken, result] = useLoginMutation();
  const Login = async () => {
    await getUserToken(accessCode);
  };
  useEffect(() => {
    Login();
  }, []);
  if (result.error) {
    alert('로그인 실패');
    navigate('/');
  }
  if (result.isSuccess) {
    navigate('/');
  }
  return (
    <div />
  );
}

export default KakaoHandler;
