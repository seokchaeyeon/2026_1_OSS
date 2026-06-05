import React, { useState } from 'react';
import { ArrowLeft, AlertTriangle, ShieldAlert, CheckCircle, Info } from 'lucide-react';

function LogDetail() {
  // 실제 백엔드 연동 전까지 화면에 보여줄 가상의 화이트박스 증거 데이터
  const evidenceLogs = [
    { id: 'TXN-001', time: '14:02:15', amount: 300000, receiver: '이영희 (농협 302-****)', type: '계좌이체' },
    { id: 'TXN-002', time: '14:05:42', amount: 400000, receiver: '박민수 (신한 110-****)', type: '계좌이체' },
    { id: 'TXN-003', time: '14:10:28', amount: 300000, receiver: '최지원 (카카오 3333-****)', type: '계좌이체' },
  ];

  // 총 합계 금액 계산
  const totalAmount = evidenceLogs.reduce((sum, log) => sum + log.amount, 0);

  // 관리자 제어 버튼 클릭 상태 관리
  const [controlStatus, setControlStatus] = useState(null);

  const handleBlock = () => {
    alert("코어뱅킹(CoreBanking) 망에 계좌 영구 잠금 명령을 전송합니다.");
    setControlStatus('blocked');
  };

  const handleUnlock = () => {
    alert("코어뱅킹(CoreBanking) 망에 계좌 정상화(Unlock) 명령을 전송합니다.");
    setControlStatus('unlocked');
  };

  return (
    <div style={{ padding: '2rem', backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: 'sans-serif', display: 'flex', justifyContent: 'center' }}>

      {/* 중앙 정렬 컨테이너 */}
      <div style={{ width: '100%', maxWidth: '900px' }}>

        {/* 상단 뒤로가기 및 제목 */}
        <header style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem', cursor: 'pointer' }}>
          <ArrowLeft size={24} color="#64748b" style={{ marginRight: '10px' }} />
          <div>
            <h2 style={{ margin: 0, fontSize: '1.4rem', color: '#1e293b' }}>위반 증거 로그 상세</h2>
            <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.85rem' }}>Log ID: LOG-2026-05-08-00142</p>
          </div>
        </header>

        {/* 🚨 위반 사유 경고 배너 */}
        <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', color: '#dc2626', margin: '0 0 10px 0', fontSize: '1.1rem' }}>
            <AlertTriangle size={20} style={{ marginRight: '8px' }} /> 스머핑(분할 송금) 제한 한도 초과
          </h3>
          <p style={{ margin: 0, color: '#7f1d1d', fontSize: '0.95rem' }}>10분 이내 3회 이상, 합산 100만 원 이상 송금 시 차단</p>
          <div style={{ display: 'flex', gap: '15px', marginTop: '10px', fontSize: '0.9rem', color: '#991b1b', fontWeight: 'bold' }}>
            <span>기준 한도: 100만 원</span>
            <span>실제 합계: {totalAmount.toLocaleString()} 원</span>
            <span>위험도: 92점</span>
          </div>
        </div>

        {/* 👤 고객 정보 카드 */}
        <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h4 style={{ margin: '0 0 1rem 0', color: '#1e293b' }}>고객 정보</h4>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569', fontSize: '0.95rem' }}>
            <div><span style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8' }}>고객 ID</span> C20240521</div>
            <div><span style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8' }}>고객명</span> 김철수</div>
            <div><span style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8' }}>계좌번호</span> 1002-****-****</div>
            <div><span style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8' }}>탐지 시각</span> 2026-05-08 14:12:35</div>
          </div>
        </div>

        {/* 📋 증거 거래 내역 테이블 */}
        <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h4 style={{ margin: '0 0 0.5rem 0', color: '#1e293b' }}>증거 거래 내역</h4>
          <p style={{ margin: '0 0 1rem 0', color: '#64748b', fontSize: '0.85rem' }}>아래 거래들이 위반 탐지의 근거가 되었습니다.</p>

          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e2e8f0', color: '#64748b' }}>
                <th style={{ padding: '10px 0' }}>거래 ID</th>
                <th>시각</th>
                <th style={{ textAlign: 'right' }}>금액</th>
                <th style={{ paddingLeft: '20px' }}>수취인</th>
                <th>방식</th>
              </tr>
            </thead>
            <tbody>
              {evidenceLogs.map((log) => (
                <tr key={log.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 0', color: '#475569' }}>{log.id}</td>
                  <td style={{ color: '#475569' }}>{log.time}</td>
                  <td style={{ textAlign: 'right', fontWeight: 'bold', color: '#1e293b' }}>{log.amount.toLocaleString()} 원</td>
                  <td style={{ paddingLeft: '20px', color: '#475569' }}>{log.receiver}</td>
                  <td style={{ color: '#475569' }}>{log.type}</td>
                </tr>
              ))}
              {/* 총계 로우 */}
              <tr style={{ backgroundColor: '#fef9c3', borderBottom: '2px solid #eab308' }}>
                <td colSpan="2" style={{ padding: '12px 0', paddingLeft: '10px', fontWeight: 'bold', color: '#854d0e' }}>합계 (10분 이내)</td>
                <td style={{ textAlign: 'right', fontWeight: 'bold', color: '#dc2626' }}>{totalAmount.toLocaleString()} 원</td>
                <td colSpan="2" style={{ paddingLeft: '20px', fontSize: '0.8rem', color: '#854d0e' }}>기준 한도 초과</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ⚙️ 계좌 제어 패널 */}
        <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h4 style={{ margin: '0 0 0.5rem 0', color: '#1e293b' }}>계좌 제어</h4>
          <p style={{ margin: '0 0 1.5rem 0', color: '#64748b', fontSize: '0.85rem' }}>위 증거를 기반으로 계좌에 대한 조치를 결정하세요.</p>

          <div style={{ display: 'flex', gap: '15px' }}>
            <button
              onClick={handleBlock}
              style={{ flex: 1, padding: '15px', backgroundColor: controlStatus === 'unlocked' ? '#f1f5f9' : '#dc2626', color: controlStatus === 'unlocked' ? '#94a3b8' : 'white', border: 'none', borderRadius: '6px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', transition: 'all 0.2s' }}
            >
              <ShieldAlert size={20} style={{ marginRight: '8px' }} /> 계좌 잠금 유지 (수동 차단)
            </button>

            <button
              onClick={handleUnlock}
              style={{ flex: 1, padding: '15px', backgroundColor: controlStatus === 'blocked' ? '#f1f5f9' : '#10b981', color: controlStatus === 'blocked' ? '#94a3b8' : 'white', border: 'none', borderRadius: '6px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', transition: 'all 0.2s' }}
            >
              <CheckCircle size={20} style={{ marginRight: '8px' }} /> 보류 해제 (정상 거래 처리)
            </button>
          </div>

          <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#eff6ff', borderRadius: '6px', display: 'flex', alignItems: 'center', color: '#1e40af', fontSize: '0.85rem' }}>
            <Info size={16} style={{ marginRight: '8px', flexShrink: 0 }} />
            <span><strong>화이트박스 장점:</strong> 블랙박스 모델과 달리, 정확히 어떤 거래들이 왜 문제가 되었는지 투명하게 확인할 수 있습니다.</span>
          </div>
        </div>

      </div>
    </div>
  );
}

export default LogDetail;