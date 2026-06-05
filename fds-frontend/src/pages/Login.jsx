import React, { useState } from 'react';
import { ShieldCheck, AlertCircle } from 'lucide-react';

function Login({ onLoginSuccess }) {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault(); // 폼 제출 시 페이지 새로고침 방지

    // 가상의 인증 로직 (나중에 우리가 만든 자바 Admin 객체와 연결될 부분입니다)
    if (userId === 'admin' && password === 'admin123') {
      setError(false);
      onLoginSuccess(); // 인증 성공 시 App.jsx에 "성공했어!" 하고 알려줌
    } else {
      setError(true); // 실패 시 에러 메시지 표시
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'sans-serif' }}>
      <div style={{ backgroundColor: 'white', padding: '3rem 2rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', width: '100%', maxWidth: '400px' }}>

        {/* 상단 로고 및 타이틀 */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#eff6ff', borderRadius: '50%', padding: '15px', marginBottom: '15px' }}>
            <ShieldCheck size={40} color="#3b82f6" strokeWidth={1.5} />
          </div>
          <h1 style={{ margin: '0 0 10px 0', fontSize: '1.75rem', color: '#1e293b' }}>White-box FDS</h1>
          <p style={{ margin: 0, color: '#64748b', fontSize: '0.95rem' }}>금융거래 이상탐지 시스템</p>
        </div>

        {/* 로그인 입력 폼 */}
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#475569', fontSize: '0.9rem' }}>관리자 사번 (ID)</label>
            <input
              type="text"
              placeholder="사번을 입력하세요 (예: admin)"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '1rem', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#475569', fontSize: '0.9rem' }}>비밀번호 (Password)</label>
            <input
              type="password"
              placeholder="비밀번호를 입력하세요 (예: admin123)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '1rem', boxSizing: 'border-box' }}
            />
          </div>

          {/* 에러 발생 시 나타나는 빨간 경고창 */}
          {error && (
            <div style={{ display: 'flex', alignItems: 'center', color: '#dc2626', backgroundColor: '#fef2f2', padding: '12px', borderRadius: '6px', fontSize: '0.9rem', marginTop: '5px' }}>
              <AlertCircle size={16} style={{ marginRight: '8px' }} /> 정보가 일치하지 않습니다
            </div>
          )}

          <button
            type="submit"
            style={{ width: '100%', padding: '14px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '6px', fontSize: '1.05rem', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}
          >
            로그인
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '2rem', color: '#94a3b8', fontSize: '0.85rem' }}>
          관리자 계정으로만 접속 가능합니다
        </p>
      </div>
    </div>
  );
}

export default Login;