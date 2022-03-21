import { createApi } from '@reduxjs/toolkit/query';

function KakaoHandler() {
  const accessCode = new URL(window.location.href).searchParams.get('code');
  console.log(accessCode);
  return (
    <div>kakao</div>
  );
}

export default KakaoHandler;
