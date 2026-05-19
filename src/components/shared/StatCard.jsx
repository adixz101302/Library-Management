import React from 'react';

const StatCard = ({ title, value, icon: Icon, trend }) => {
  return (
    <div className="card card-interactive" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', fontWeight: 500 }}>{title}</h3>
        {Icon && <Icon size={20} color="var(--color-primary-light)" />}
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
        <span style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 700, color: 'var(--color-text-primary)' }}>{value}</span>
        {trend && (
          <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-success)', fontWeight: 500 }}>
            {trend}
          </span>
        )}
      </div>
    </div>
  );
};

export default StatCard;
