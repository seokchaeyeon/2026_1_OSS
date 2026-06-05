import React, { useState, useEffect } from 'react';
import Dashboard from './pages/Dashboard';
import LogDetail from './pages/LogDetail';
import Login from './pages/Login';
import RuleManagement from './pages/RuleManagement';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');

  // 서버 상태와 데이터 건수를 저장할 공간
  const [serverMessage, setServerMessage] = useState('서버 연결 확인 중...');
  const [logData, setLogData] = useState('데이터 로딩 중...');

  useEffect(() => {
    // 1. 서버 상태 받아오기
    fetch('http://localhost:8080/api/status')
      .then(res => res.text())
      .then(data => setServerMessage(data))
      .catch(() => setServerMessage('❌ 서버 연결 실패'));

    // 2. 백엔드에서 로그 데이터 받아오기
    fetch('http://localhost:8080/api/file-logs')
      .then(res => res.text())
      .then(data => setLogData('✅ 실시간 데이터 로딩 완료'))
      .catch(() => setLogData('데이터 로딩 실패'));
  }, []);

  if (!isLoggedIn) {
    return (
      <>
        <Login onLoginSuccess={() => setIsLoggedIn(true)} />
        {/* 로그인 전 배너 */}
        <div style={{ position: 'fixed', bottom: '20px', right: '20px', backgroundColor: '#1e293b', color: '#10b981', padding: '15px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', zIndex: 9999 }}>
          <div>{serverMessage}</div>
          <div style={{ color: '#fbbf24', marginTop: '5px' }}>📊 {logData}</div>
        </div>
      </>
    );
  }

  return (
    <div>
      <nav style={{ backgroundColor: '#1e293b', padding: '1rem', display: 'flex', gap: '20px', alignItems: 'center' }}>
        <div style={{ color: 'white', fontWeight: 'bold', fontSize: '1.2rem', marginRight: '30px' }}>FDS Admin</div>
        <button onClick={() => setCurrentPage('dashboard')} style={{ backgroundColor: currentPage === 'dashboard' ? '#3b82f6' : 'transparent', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}>실시간 대시보드</button>
        <button onClick={() => setCurrentPage('detail')} style={{ backgroundColor: currentPage === 'detail' ? '#3b82f6' : 'transparent', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}>위반 증거 상세</button>
        <button onClick={() => setCurrentPage('rules')} style={{ backgroundColor: currentPage === 'rules' ? '#3b82f6' : 'transparent', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}>탐지 룰 관리</button>
        <button onClick={() => setIsLoggedIn(false)} style={{ marginLeft: 'auto', backgroundColor: '#475569', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}>로그아웃</button>
      </nav>

      <main>
        {currentPage === 'dashboard' && <Dashboard />}
        {currentPage === 'detail' && <LogDetail />}
        {currentPage === 'rules' && <RuleManagement />}
      </main>

      {/* 로그인 후 배너 */}
      <div style={{ position: 'fixed', bottom: '20px', right: '20px', backgroundColor: '#1e293b', color: '#10b981', padding: '15px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', zIndex: 9999 }}>
        <div>{serverMessage}</div>
        <div style={{ color: '#fbbf24', marginTop: '5px' }}>📊 {logData}</div>
      </div>
    </div>
  );
}

export default App;