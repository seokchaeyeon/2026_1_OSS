import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AlertTriangle, Activity, ShieldCheck } from 'lucide-react';

// 화면에 뿌려줄 가상의 시간대별 거래 데이터 (나중엔 백엔드에서 받아올 예정)
const mockData = [
  { time: '09:00', normal: 400, fraud: 24 },
  { time: '10:00', normal: 300, fraud: 13 },
  { time: '11:00', normal: 550, fraud: 45 },
  { time: '12:00', normal: 450, fraud: 22 },
  { time: '13:00', normal: 700, fraud: 80 }, // 피크 타임
  { time: '14:00', normal: 600, fraud: 35 },
  { time: '15:00', normal: 800, fraud: 55 },
];

function Dashboard() {
  return (
    <div style={{ padding: '2rem', backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: 'sans-serif' }}>

      {/* 헤더 영역 */}
      <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.5rem', color: '#1e293b' }}>White-box FDS</h1>
          <p style={{ margin: 0, color: '#64748b' }}>실시간 모니터링 대시보드</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', color: '#10b981', fontWeight: 'bold' }}>
          <Activity size={20} style={{ marginRight: '8px' }} /> 시스템 정상 가동 중
        </div>
      </header>

      {/* 요약 카드 영역 */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ flex: 1, backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#64748b', fontSize: '0.9rem' }}>총 거래 건수</h3>
          <p style={{ margin: 0, fontSize: '2rem', fontWeight: 'bold', color: '#0f172a' }}>6,230</p>
        </div>
        <div style={{ flex: 1, backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#64748b', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <ShieldCheck size={16} color="#10b981" /> 정상 처리 건수
          </h3>
          <p style={{ margin: 0, fontSize: '2rem', fontWeight: 'bold', color: '#10b981' }}>6,060</p>
        </div>
        <div style={{ flex: 1, backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #fee2e2' }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#ef4444', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <AlertTriangle size={16} /> 차단된 이상 거래
          </h3>
          <p style={{ margin: 0, fontSize: '2rem', fontWeight: 'bold', color: '#ef4444' }}>170</p>
        </div>
      </div>

      {/* 차트 영역 */}
      <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <h3 style={{ marginTop: 0, color: '#1e293b' }}>시간대별 거래 발생 추이</h3>
        <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '2rem' }}>정상 거래 vs 이상 거래 실시간 비교</p>

        <div style={{ width: '100%', height: 400 }}>
          <ResponsiveContainer>
            <LineChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="normal" name="정상 거래" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="fraud" name="이상 거래" stroke="#ef4444" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}

export default Dashboard;