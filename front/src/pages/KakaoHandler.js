import { createApi } from '@reduxjs/toolkit/query';
import { useEffect } from 'react';
import { useGetUserTokenMutation } from '../service/login';

function KakaoHandler() {
  const accessCode = new URL(window.location.href).searchParams.get('code');
  const [getUserToken, result] = useGetUserTokenMutation();
  const getToken = async () => {
    const token = await getUserToken(accessCode);
    console.log(token);
  };
  useEffect(() => {
    getToken();
  }, []);
  console.log(result);
  return (
    <div>kakao</div>
  );
}

export default KakaoHandler;
