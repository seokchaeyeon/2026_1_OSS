import React, { useState, useEffect } from 'react';

function RuleManagement() {
  const [rules, setRules] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRule, setNewRule] = useState({ name: '', condition: '', description: '' });

  const fetchRules = () => {
    fetch('http://localhost:8080/api/rules')
      .then(res => res.json())
      .then(data => setRules(data))
      .catch(err => console.error('룰 로딩 에러:', err));
  };

  useEffect(() => {
    fetchRules();
  }, []);

  const handleAddRule = () => {
    if (!newRule.name || !newRule.condition) {
      alert('탐지명과 탐지 조건은 필수입니다!');
      return;
    }

    fetch('http://localhost:8080/api/rules', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRule)
    })
    .then(res => res.json())
    .then(() => {
      setIsModalOpen(false);
      setNewRule({ name: '', condition: '', description: '' });
      fetchRules();
    });
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f8fafc', minHeight: '100vh', position: 'relative' }}>
      <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', maxWidth: '1000px', margin: '0 auto' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h2 style={{ color: '#1e293b', margin: '0' }}>탐지 룰(Rule) 관리</h2>
            <p style={{ color: '#64748b', marginTop: '5px' }}>현재 FDS 엔진에 적용된 이상 거래 탐지 정책입니다.</p>
          </div>
          <button onClick={() => setIsModalOpen(true)} style={{ backgroundColor: '#3b82f6', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
            + 새 탐지 룰 추가
          </button>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f1f5f9', borderBottom: '2px solid #e2e8f0', color: '#475569', textAlign: 'left' }}>
              <th style={{ padding: '15px' }}>룰 ID</th>
              <th style={{ padding: '15px' }}>탐지명</th>
              <th style={{ padding: '15px' }}>탐지 조건 (Condition)</th>
              <th style={{ padding: '15px' }}>상세 설명</th>
              <th style={{ padding: '15px', textAlign: 'center' }}>상태</th>
            </tr>
          </thead>
          <tbody>
            {rules.map((rule, index) => (
              <tr key={index} style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '15px', color: '#64748b', fontWeight: 'bold' }}>{rule.id}</td>
                <td style={{ padding: '15px', color: '#0f172a', fontWeight: 'bold' }}>{rule.name}</td>
                <td style={{ padding: '15px', color: '#ef4444', fontFamily: 'monospace' }}>{rule.condition}</td>
                <td style={{ padding: '15px', color: '#64748b' }}>{rule.description}</td>
                <td style={{ padding: '15px', textAlign: 'center' }}>
                  <span style={{ backgroundColor: '#dcfce7', color: '#166534', padding: '5px 10px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold' }}>
                    {rule.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 팝업창 (모달) */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999 }}>
          <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '8px', width: '400px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#1e293b' }}>새 탐지 룰 등록</h3>

            <input placeholder="탐지명 (예: 단기간 해외 IP 접속)" value={newRule.name} onChange={e => setNewRule({...newRule, name: e.target.value})} style={{ padding: '10px', border: '1px solid #cbd5e1', borderRadius: '5px' }} />
            <input placeholder="탐지 조건 (예: 10분 내 2개국 접속)" value={newRule.condition} onChange={e => setNewRule({...newRule, condition: e.target.value})} style={{ padding: '10px', border: '1px solid #cbd5e1', borderRadius: '5px' }} />
            <textarea placeholder="상세 설명 (왜 차단하는지 적어주세요)" value={newRule.description} onChange={e => setNewRule({...newRule, description: e.target.value})} style={{ padding: '10px', border: '1px solid #cbd5e1', borderRadius: '5px', minHeight: '80px', resize: 'none' }} />

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
              <button onClick={() => setIsModalOpen(false)} style={{ padding: '8px 15px', backgroundColor: '#e2e8f0', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>취소</button>
              <button onClick={handleAddRule} style={{ padding: '8px 15px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>저장하기</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RuleManagement;