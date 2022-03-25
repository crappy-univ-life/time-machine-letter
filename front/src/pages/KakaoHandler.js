import { createSelector } from '@reduxjs/toolkit';
import { createApi } from '@reduxjs/toolkit/query';
import { Spin } from 'antd';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LoginApi, useGetUserTokenMutation } from '../service/login';
import { setCredentials } from '../store/auth';

function KakaoHandler() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const accessCode = new URL(window.location.href).searchParams.get('code');
  const [getUserToken] = useGetUserTokenMutation();

  const Login = async () => {
    const token = await getUserToken(accessCode).unwrap();
    dispatch(setCredentials(token));
    navigate('/');
  };
  useEffect(() => {
    Login();
  }, []);
  return (
    <div />
  );
}

export default KakaoHandler;
