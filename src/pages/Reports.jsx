import React, { useState, useEffect } from 'react';
import { BarChart3, Users, DollarSign, AlertTriangle, TrendingUp } from 'lucide-react';
import StatCard from '../components/shared/StatCard';
import { libraryService } from '../services/api';

const Reports = () => {
  const [reports, setReports] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const data = await libraryService.getLibraryReports();
        setReports(data);
      } catch (error) {
        console.error("Error fetching library reports", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchReports();
  }, []);

  if (loading || !reports) {
    return (
      <div className="container main-content" style={{ textAlign: 'center', padding: '4rem 0' }}>
        <div style={{ color: 'var(--color-text-muted)' }}>Loading analytics...</div>
      </div>
    );
  }

  return (
    <div className="container main-content">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
        <BarChart3 size={28} color="var(--color-primary)" />
        <h1 style={{ marginBottom: 0 }}>Library Reports</h1>
      </div>

      {/* Top Level KPIs */}
      <div className="grid grid-cols-3 gap-6" style={{ marginBottom: '3rem' }}>
        <StatCard title="Total Fines Collected" value={reports.finesCollected} icon={DollarSign} />
        <StatCard title="Active Members" value={reports.activeMembers} icon={Users} />
        <StatCard title="Top Category" value={reports.mostPopularCategory} icon={TrendingUp} />
      </div>

      <div className="grid grid-cols-2 gap-8" style={{ marginBottom: '3rem' }}>
        {/* Category Breakdown (CSS Bar Chart) */}
        <section className="card">
          <h2 style={{ marginBottom: '1.5rem', fontSize: 'var(--font-size-xl)' }}>Circulation by Category</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {reports.categoryBreakdown.map((cat, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: 'var(--font-size-sm)', fontWeight: 500 }}>
                  <span>{cat.name}</span>
                  <span>{cat.percentage}%</span>
                </div>
                <div style={{ width: '100%', backgroundColor: 'var(--color-background)', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ 
                    width: `${cat.percentage}%`, 
                    backgroundColor: i === 0 ? 'var(--color-primary)' : 'var(--color-secondary)', 
                    height: '100%',
                    borderRadius: '4px'
                  }}></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Overdue Fines Report */}
        <section className="card" style={{ padding: '0' }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--color-background)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AlertTriangle size={20} color="var(--color-danger)" />
            <h2 style={{ fontSize: 'var(--font-size-xl)', margin: 0 }}>Outstanding Fines</h2>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--color-background)' }}>
                <th style={{ padding: '1rem 1.5rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Member</th>
                <th style={{ padding: '1rem 1.5rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Article</th>
                <th style={{ padding: '1rem 1.5rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Days Overdue</th>
                <th style={{ padding: '1rem 1.5rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Fine</th>
              </tr>
            </thead>
            <tbody>
              {reports.overdueFines.map((fine, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--color-background)' }}>
                  <td style={{ padding: '1rem 1.5rem', fontWeight: 500 }}>{fine.member}</td>
                  <td style={{ padding: '1rem 1.5rem', color: 'var(--color-text-secondary)' }}>{fine.article}</td>
                  <td style={{ padding: '1rem 1.5rem', color: 'var(--color-danger)', fontWeight: 600 }}>{fine.daysOverdue}</td>
                  <td style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>{fine.fineAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};

export default Reports;
