import React, { useState } from 'react';
import Dashboard from './pages/Dashboard';
import LogDetail from './pages/LogDetail';
import Login from './pages/Login'; // 👈 새로 만든 로그인 화면 불러오기

function App() {
  // 로그인 상태 관리 (처음엔 false, 즉 로그아웃 상태)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 로그인 성공 시 보여줄 첫 화면 메뉴
  const [currentPage, setCurrentPage] = useState('dashboard');

  // 1. 만약 로그인이 안 되어 있다면? -> 무조건 Login 화면만 보여줌
  if (!isLoggedIn) {
    return <Login onLoginSuccess={() => setIsLoggedIn(true)} />;
  }

  // 2. 로그인이 성공했다면? -> 아래의 메인 관제 시스템 화면을 보여줌
  return (
    <div>
      {/* 상단 네비게이션(메뉴) 바 */}
      <nav style={{ backgroundColor: '#1e293b', padding: '1rem', display: 'flex', gap: '20px', alignItems: 'center' }}>
        <div style={{ color: 'white', fontWeight: 'bold', fontSize: '1.2rem', marginRight: '30px' }}>
          FDS Admin
        </div>

        <button
          onClick={() => setCurrentPage('dashboard')}
          style={{ backgroundColor: currentPage === 'dashboard' ? '#3b82f6' : 'transparent', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          실시간 대시보드
        </button>

        <button
          onClick={() => setCurrentPage('detail')}
          style={{ backgroundColor: currentPage === 'detail' ? '#3b82f6' : 'transparent', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          위반 증거 상세
        </button>

        {/* 로그아웃 버튼 (오른쪽 끝으로 밀어내기 위해 marginLeft: 'auto' 적용) */}
        <button
          onClick={() => setIsLoggedIn(false)}
          style={{ marginLeft: 'auto', backgroundColor: '#475569', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          로그아웃
        </button>
      </nav>

      {/* 메뉴 선택에 따라 화면 전환 */}
      <main>
        {currentPage === 'dashboard' && <Dashboard />}
        {currentPage === 'detail' && <LogDetail />}
      </main>
    </div>
  );
}

export default App;