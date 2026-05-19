import React, { useState, useEffect } from 'react';
import { Bookmark, Clock, CheckCircle, XCircle } from 'lucide-react';
import { libraryService } from '../services/api';

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const data = await libraryService.getMyReservations();
        setReservations(data);
      } catch (error) {
        console.error("Error fetching reservations", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchReservations();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Approved': return <CheckCircle size={16} />;
      case 'Cancelled': return <XCircle size={16} />;
      default: return <Clock size={16} />;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Approved': return 'badge-success';
      case 'Cancelled': return 'badge-danger';
      default: return 'badge-reserved'; // Orange for pending
    }
  };

  return (
    <div className="container main-content">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
        <Bookmark size={28} color="var(--color-primary)" />
        <h1 style={{ marginBottom: 0 }}>My Reservations</h1>
      </div>

      <div className="card" style={{ padding: '0' }}>
        {loading ? (
          <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
            Loading reservations...
          </div>
        ) : reservations.length === 0 ? (
          <div style={{ padding: '4rem', textAlign: 'center' }}>
            <Bookmark size={48} color="var(--color-border)" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ color: 'var(--color-text-secondary)' }}>No Reservations Found</h3>
            <p className="text-muted">You have not reserved any books yet.</p>
            <a href="/books" className="btn btn-primary" style={{ marginTop: '1.5rem', display: 'inline-block' }}>Browse Catalog</a>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-background)', backgroundColor: 'var(--color-background)' }}>
                <th style={{ padding: '1.25rem 1.5rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Reservation ID</th>
                <th style={{ padding: '1.25rem 1.5rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Article</th>
                <th style={{ padding: '1.25rem 1.5rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Date Reserved</th>
                <th style={{ padding: '1.25rem 1.5rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Expected Availability</th>
                <th style={{ padding: '1.25rem 1.5rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((res) => (
                <tr key={res.id} style={{ borderBottom: '1px solid var(--color-background)' }}>
                  <td style={{ padding: '1.25rem 1.5rem', fontWeight: 500, color: 'var(--color-primary)' }}>{res.id}</td>
                  <td style={{ padding: '1.25rem 1.5rem', fontWeight: 500 }}>{res.article}</td>
                  <td style={{ padding: '1.25rem 1.5rem', color: 'var(--color-text-secondary)' }}>{res.date}</td>
                  <td style={{ padding: '1.25rem 1.5rem', color: 'var(--color-text-secondary)' }}>{res.expectedAvailability}</td>
                  <td style={{ padding: '1.25rem 1.5rem' }}>
                    <span className={`badge ${getStatusBadge(res.status)}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                      {getStatusIcon(res.status)}
                      {res.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Reservations;
