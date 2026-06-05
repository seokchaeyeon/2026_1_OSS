import React, { useState } from 'react';
import { Settings, Plus, Save, ToggleRight, ToggleLeft } from 'lucide-react';

function RuleManagement() {
  const [rules, setRules] = useState([
    { id: 1, name: '스머핑 탐지 (분할 송금)', category: '자금세탁', isActive: true, timeWindow: 10, countThreshold: 3, amountThreshold: 1000000 },
    { id: 2, name: '단기간 고액 이체', category: '이상거래', isActive: true, timeWindow: 60, countThreshold: 1, amountThreshold: 5000000 }
  ]);

  const toggleRule = (id) => {
    setRules(rules.map(rule => rule.id === id ? { ...rule, isActive: !rule.isActive } : rule));
  };

  return (
    <div style={{ padding: '2rem', backgroundColor: '#f8fafc', minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: '900px' }}>
        <header style={{ marginBottom: '2rem' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', color: '#1e293b' }}>
            <Settings size={24} style={{ marginRight: '10px', color: '#3b82f6' }} /> 탐지 룰 관리
          </h2>
        </header>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {rules.map((rule) => (
            <div key={rule.id} style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, color: rule.isActive ? '#1e293b' : '#94a3b8' }}>{rule.name}</h3>
                <div onClick={() => toggleRule(rule.id)} style={{ cursor: 'pointer' }}>
                  {rule.isActive ? <ToggleRight size={36} color="#10b981" /> : <ToggleLeft size={36} color="#cbd5e1" />}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RuleManagement;