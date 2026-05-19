import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Book, Users, ClipboardList, TrendingUp } from 'lucide-react';
import Sidebar from '../components/layout/Sidebar';
import StatCard from '../components/shared/StatCard';

const DashboardOverview = () => {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Dashboard Overview</h1>
        <button className="btn btn-primary">Generate Report</button>
      </div>

      <div className="grid grid-cols-4 gap-6" style={{ marginBottom: '3rem' }}>
        <StatCard title="Total Inventory" value="12,450" icon={Book} trend="+124" />
        <StatCard title="Active Members" value="2,845" icon={Users} trend="+12" />
        <StatCard title="Total Reservations" value="156" icon={ClipboardList} trend="+24" />
        <StatCard title="Monthly Circulation" value="1,240" icon={TrendingUp} trend="+8%" />
      </div>

      <div className="grid grid-cols-2 gap-6" style={{ marginBottom: '3rem' }}>
        {/* Chart Placeholder 1 */}
        <div className="card">
          <h3 style={{ marginBottom: '1.5rem', color: 'var(--color-text-secondary)' }}>Circulation Trends</h3>
          <div style={{ height: '250px', background: 'linear-gradient(to top, var(--color-background) 0%, transparent 100%)', display: 'flex', alignItems: 'flex-end', gap: '10px', padding: '1rem 0' }}>
             {/* Mock bars */}
             {[40, 60, 45, 80, 55, 90, 75].map((height, i) => (
                <div key={i} style={{ flex: 1, backgroundColor: 'var(--color-primary-light)', height: `${height}%`, borderRadius: 'var(--radius-sm) var(--radius-sm) 0 0', opacity: 0.8 }}></div>
             ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', color: 'var(--color-text-muted)', fontSize: 'var(--font-size-xs)' }}>
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </div>

        {/* Chart Placeholder 2 */}
        <div className="card">
          <h3 style={{ marginBottom: '1.5rem', color: 'var(--color-text-secondary)' }}>Category Distribution</h3>
          <div style={{ height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '200px', height: '200px', borderRadius: '50%', background: 'conic-gradient(var(--color-primary) 0% 35%, var(--color-accent) 35% 60%, var(--color-warning) 60% 85%, var(--color-success) 85% 100%)', boxShadow: 'var(--shadow-md)' }}></div>
          </div>
        </div>
      </div>

      {/* Data Tables */}
      <div className="grid grid-cols-2 gap-6">
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3>Recent Reservations</h3>
            <a href="#" className="text-muted" style={{ fontSize: 'var(--font-size-sm)' }}>View All</a>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-background)' }}>
                <th style={{ padding: '0.75rem 0', color: 'var(--color-text-secondary)', fontWeight: 500 }}>Member</th>
                <th style={{ padding: '0.75rem 0', color: 'var(--color-text-secondary)', fontWeight: 500 }}>Book</th>
                <th style={{ padding: '0.75rem 0', color: 'var(--color-text-secondary)', fontWeight: 500 }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {[{ name: 'Alice Smith', book: 'Clean Code', status: 'Pending' }, { name: 'Bob Jones', book: 'Dune', status: 'Approved' }, { name: 'Charlie Brown', book: '1984', status: 'Pending' }].map((req, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--color-background)' }}>
                  <td style={{ padding: '1rem 0', fontWeight: 500 }}>{req.name}</td>
                  <td style={{ padding: '1rem 0', color: 'var(--color-text-secondary)' }}>{req.book}</td>
                  <td style={{ padding: '1rem 0' }}>
                    <span className={`badge ${req.status === 'Approved' ? 'badge-success' : 'badge-warning'}`}>{req.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3>Overdue Returns</h3>
            <a href="#" className="text-muted" style={{ fontSize: 'var(--font-size-sm)' }}>View All</a>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-background)' }}>
                <th style={{ padding: '0.75rem 0', color: 'var(--color-text-secondary)', fontWeight: 500 }}>Member</th>
                <th style={{ padding: '0.75rem 0', color: 'var(--color-text-secondary)', fontWeight: 500 }}>Book</th>
                <th style={{ padding: '0.75rem 0', color: 'var(--color-text-secondary)', fontWeight: 500 }}>Days Overdue</th>
              </tr>
            </thead>
            <tbody>
              {[{ name: 'David Lee', book: 'Sapiens', days: 5 }, { name: 'Emma Wilson', book: 'Atomic Habits', days: 2 }].map((req, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--color-background)' }}>
                  <td style={{ padding: '1rem 0', fontWeight: 500 }}>{req.name}</td>
                  <td style={{ padding: '1rem 0', color: 'var(--color-text-secondary)' }}>{req.book}</td>
                  <td style={{ padding: '1rem 0' }}>
                    <span className="badge badge-danger">{req.days} days</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const PlaceholderPage = ({ title }) => (
  <div>
    <h1>{title}</h1>
    <p className="text-muted" style={{ marginTop: '1rem' }}>This page will be connected to ERPNext REST APIs.</p>
  </div>
);

const AdminDashboard = () => {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-content">
        <Routes>
          <Route path="/" element={<DashboardOverview />} />
          <Route path="/inventory" element={<PlaceholderPage title="Book Inventory Management" />} />
          <Route path="/members" element={<PlaceholderPage title="Member Management" />} />
          <Route path="/reservations" element={<PlaceholderPage title="Reservation Requests" />} />
          <Route path="/overdue" element={<PlaceholderPage title="Overdue Returns Tracking" />} />
          <Route path="/settings" element={<PlaceholderPage title="System Settings" />} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminDashboard;
