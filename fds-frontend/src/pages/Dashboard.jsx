import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Dashboard() {
  // 백엔드에서 받아올 데이터를 저장할 주머니 준비
  const [stats, setStats] = useState({
    totalTransactions: 0,
    normalTransactions: 0,
    blockedTransactions: 0,
    chartData: []
  });

  useEffect(() => {
    // 백엔드의 대시보드 전용 API 호출!
    fetch('http://localhost:8080/api/dashboard-stats')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error('대시보드 데이터 로딩 에러:', err));
  }, []);

  return (
    <div style={{ padding: '20px', backgroundColor: '#f8fafc', minHeight: '100vh' }}>

      {/* 1. 상단 요약 카드 3개 */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
        <div style={{ flex: 1, backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', textAlign: 'center' }}>
          <h3 style={{ color: '#64748b', margin: '0 0 10px 0' }}>총 거래 건수</h3>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#0f172a' }}>{stats.totalTransactions.toLocaleString()}</div>
        </div>
        <div style={{ flex: 1, backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', textAlign: 'center' }}>
          <h3 style={{ color: '#10b981', margin: '0 0 10px 0' }}>✅ 정상 처리 건수</h3>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#10b981' }}>{stats.normalTransactions.toLocaleString()}</div>
        </div>
        <div style={{ flex: 1, backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', textAlign: 'center' }}>
          <h3 style={{ color: '#ef4444', margin: '0 0 10px 0' }}>🚨 차단된 이상 거래</h3>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#ef4444' }}>{stats.blockedTransactions.toLocaleString()}</div>
        </div>
      </div>

      {/* 2. 시간대별 거래 발생 추이 그래프 */}
      <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h2 style={{ textAlign: 'center', color: '#1e293b', marginBottom: '5px' }}>시간대별 거래 발생 추이</h2>
        <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '30px' }}>정상 거래 vs 이상 거래 실시간 비교</p>

        <div style={{ height: '400px', width: '100%' }}>
          {/* 받아온 chartData를 그래프에 연결! */}
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={stats.chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              {/* 정상 데이터는 초록색 선, 이상 데이터는 빨간색 선으로 그립니다 */}
              <Line type="monotone" dataKey="정상" stroke="#10b981" strokeWidth={3} dot={{ r: 6 }} activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="이상" stroke="#ef4444" strokeWidth={3} dot={{ r: 6 }} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}

export default Dashboard;