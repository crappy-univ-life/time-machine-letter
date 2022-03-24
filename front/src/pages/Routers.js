import { Routes, Route, Link } from 'react-router-dom';
import App from './App';
import KakaoHandler from './KakaoHandler';
import Main from './Main';
import Letter from '../components/Letter';

function Routers() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/kakao_callback" element={<KakaoHandler />} />
        <Route path="/letter/:hash" element={<Letter />} />
      </Routes>
    </div>
  );
}

export default Routers;
