import React, { useState, useEffect } from 'react';

function LogDetail() {
  // 백엔드에서 받아올 데이터 배열을 저장할 공간
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    // 우리가 방금 자바에 새로 만든 API 주소로 요청!
    fetch('http://localhost:8080/api/violation-logs')
      .then(res => res.json()) // 이번엔 text가 아니라 json으로 변환합니다
      .then(data => setLogs(data))
      .catch(err => console.error('데이터 로딩 에러:', err));
  }, []);

  return (
    <div style={{ padding: '20px', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', maxWidth: '900px', margin: '0 auto' }}>

        <h2 style={{ textAlign: 'center', color: '#1e293b' }}>증거 거래 내역 (실시간 연동)</h2>
        <p style={{ textAlign: 'center', color: '#64748b' }}>백엔드의 FDS 탐지 알고리즘이 찾아낸 실제 위반 거래들입니다.</p>

        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e2e8f0', color: '#475569', textAlign: 'left' }}>
              <th style={{ padding: '12px' }}>거래 ID</th>
              <th style={{ padding: '12px' }}>위반 유형</th>
              <th style={{ padding: '12px' }}>탐지 금액</th>
              <th style={{ padding: '12px' }}>수취인 (계좌)</th>
              <th style={{ padding: '12px' }}>사유 및 방식</th>
            </tr>
          </thead>
          <tbody>
            {/* 받아온 데이터 개수만큼 표의 줄(tr)을 반복해서 그려줍니다 */}
            {logs.map((log, index) => (
              <tr key={index} style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '12px', color: '#64748b' }}>{log.id}</td>
                <td style={{ padding: '12px', color: '#ef4444', fontWeight: 'bold' }}>🚨 {log.type}</td>
                {/* 숫자에 쉼표(,)를 찍어주는 toLocaleString() */}
                <td style={{ padding: '12px', fontWeight: 'bold' }}>{log.amount.toLocaleString()} 원</td>
                <td style={{ padding: '12px', color: '#334155' }}>{log.recipient}</td>
                <td style={{ padding: '12px', color: '#64748b' }}>{log.method}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {logs.length === 0 && (
          <div style={{ textAlign: 'center', padding: '20px', color: '#94a3b8' }}>
            현재 탐지된 위반 내역이 없습니다.
          </div>
        )}

      </div>
    </div>
  );
}

export default LogDetail;