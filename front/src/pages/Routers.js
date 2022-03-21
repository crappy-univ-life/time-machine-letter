import { Routes, Route, Link } from 'react-router-dom';
import App from './App';
import KakaoHandler from './KakaoHandler';

function Routers() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/kakao_callback" element={<KakaoHandler />} />
      </Routes>
    </div>
  );
}

export default Routers;
