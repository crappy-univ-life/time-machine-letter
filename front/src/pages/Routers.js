import { Routes, Route, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './Login';
import KakaoHandler from './KakaoHandler';
import Main, { RequireAuth } from './Main';
import Letter from './Letter';

function Routers() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={(
            <RequireAuth>
              <Main />
            </RequireAuth>
          )}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/kakao_callback" element={<KakaoHandler />} />
        <Route path="/letter/:hash" element={<Letter />} />
      </Routes>
    </div>
  );
}

export default Routers;
