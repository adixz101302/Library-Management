import React from 'react';
import { Search, Book, CheckCircle, Clock, AlertTriangle, Calculator, CalendarCheck, Activity, RotateCcw, PieChart, Printer } from 'lucide-react';
import StatCard from '../components/shared/StatCard';
import BookCard from '../components/shared/BookCard';
import { academicBooks, mockIssueRecords } from '../data/mockData';

const Home = () => {
  const featuredBooks = academicBooks.slice(0, 4);

  return (
    <div>
      {/* Overdue Alert Panel */}
      <div className="container" style={{ paddingTop: '2rem' }}>
        <div className="alert-panel alert-danger">
          <AlertTriangle size={24} />
          <div>
            <strong>System Alert:</strong> There are 2 members with overdue books exceeding the maximum fine limit. 
            <a href="#" style={{ marginLeft: '0.5rem', fontWeight: 600, textDecoration: 'underline' }}>View Overdue Report</a>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="hero" style={{ paddingTop: '3rem', paddingBottom: '4rem' }}>
        <div className="container">
          <h1>Library Management Portal</h1>
          <p>Powered by ERPNext. Manage inventory, reservations, and circulations seamlessly.</p>
          
          <div className="search-bar-large">
            <Search className="search-icon" size={24} />
            <input type="text" placeholder="Search by article, author, or ISBN..." />
          </div>
        </div>
      </section>

      <div className="container main-content" style={{ paddingTop: 0 }}>
        {/* ERP Dashboard Statistics */}
        <section style={{ marginBottom: '4rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2>Library Analytics</h2>
            <span className="text-muted" style={{ fontSize: 'var(--font-size-sm)' }}>Updated: Just now</span>
          </div>
          <div className="grid grid-cols-4 gap-6">
            <StatCard title="Total Articles" value="15,240" icon={Book} trend="+124 this month" />
            <StatCard title="Available Books" value="11,850" icon={CheckCircle} />
            <StatCard title="Issued Books" value="3,210" icon={Clock} trend="-15 since yesterday" />
            <StatCard title="Overdue Books" value="180" icon={AlertTriangle} trend="+12 this week" />
          </div>
        </section>

        <div className="grid grid-cols-3 gap-8" style={{ marginBottom: '4rem' }}>
          {/* Recent Issue Records Table (Takes 2/3 width) */}
          <section style={{ gridColumn: 'span 2' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2>Recent Circulations</h2>
              <a href="/reports" className="btn btn-secondary">View All</a>
            </div>
            <div className="card" style={{ padding: '0' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--color-background)', backgroundColor: 'var(--color-background)' }}>
                    <th style={{ padding: '1rem 1.5rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Member</th>
                    <th style={{ padding: '1rem 1.5rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Article</th>
                    <th style={{ padding: '1rem 1.5rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Return Date</th>
                    <th style={{ padding: '1rem 1.5rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {mockIssueRecords.map((req, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--color-background)' }}>
                      <td style={{ padding: '1rem 1.5rem', fontWeight: 500 }}>{req.member}</td>
                      <td style={{ padding: '1rem 1.5rem', color: 'var(--color-text-secondary)' }}>{req.article}</td>
                      <td style={{ padding: '1rem 1.5rem', color: 'var(--color-text-secondary)' }}>{req.returnDate}</td>
                      <td style={{ padding: '1rem 1.5rem' }}>
                        <span className={`badge ${
                          req.status === 'Issued' ? 'badge-danger' : 
                          req.status === 'Overdue' ? 'badge-overdue' : 
                          req.status === 'Reserved' ? 'badge-reserved' : 'badge-success'
                        }`}>
                          {req.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* ERP Features Section (Takes 1/3 width) */}
          <section style={{ gridColumn: 'span 1' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>ERP Modules</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="feature-card">
                <div className="feature-icon"><Calculator size={20} /></div>
                <div>
                  <h4 style={{ marginBottom: '0.25rem' }}>Fine Calculation</h4>
                  <p className="text-muted" style={{ fontSize: 'var(--font-size-sm)' }}>Automated overdue penalty processing.</p>
                </div>
              </div>
              <div className="feature-card">
                <div className="feature-icon"><RotateCcw size={20} /></div>
                <div>
                  <h4 style={{ marginBottom: '0.25rem' }}>Issue & Return</h4>
                  <p className="text-muted" style={{ fontSize: 'var(--font-size-sm)' }}>Barcode-ready workflow.</p>
                </div>
              </div>
              <div className="feature-card">
                <div className="feature-icon"><PieChart size={20} /></div>
                <div>
                  <h4 style={{ marginBottom: '0.25rem' }}>Analytics</h4>
                  <p className="text-muted" style={{ fontSize: 'var(--font-size-sm)' }}>Circulation and inventory reports.</p>
                </div>
              </div>
              <div className="feature-card">
                <div className="feature-icon"><Printer size={20} /></div>
                <div>
                  <h4 style={{ marginBottom: '0.25rem' }}>Print Formats</h4>
                  <p className="text-muted" style={{ fontSize: 'var(--font-size-sm)' }}>Customizable ID and receipt printing.</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Featured Books */}
        <section>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2>New Academic Arrivals</h2>
            <a href="/books" className="btn btn-secondary">Browse Catalog</a>
          </div>
          <div className="grid grid-cols-4 gap-6">
            {featuredBooks.map(book => (
              <BookCard key={book.id} {...book} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
