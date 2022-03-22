import { createApi } from '@reduxjs/toolkit/query';
import { useEffect } from 'react';
import { useGetUserTokenMutation } from '../service/login';

function KakaoHandler() {
  const accessCode = new URL(window.location.href).searchParams.get('code');
  console.log(accessCode);
  const [getUserToken, result] = useGetUserTokenMutation();
  const getToken = async () => {
    await getUserToken(accessCode);
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
