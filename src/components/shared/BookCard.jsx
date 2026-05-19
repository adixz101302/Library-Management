import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

const BookCard = ({ id, title, author, category, status, coverImage }) => {
  return (
    <div className="card card-interactive" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ height: '200px', backgroundColor: 'var(--color-background)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {coverImage ? (
          <img src={coverImage} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <BookOpen size={48} color="var(--color-text-muted)" />
        )}
        <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
          <span className={`badge ${
            status === 'Available' ? 'badge-success' : 
            status === 'Issued' ? 'badge-danger' : 
            status === 'Reserved' ? 'badge-reserved' : 
            'badge-overdue'
          }`}>
            {status}
          </span>
        </div>
      </div>
      
      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ marginBottom: '0.5rem' }}>
          <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-primary-light)', fontWeight: 600, textTransform: 'uppercase' }}>
            {category}
          </span>
        </div>
        <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: '0.5rem', color: 'var(--color-text-primary)' }}>{title}</h3>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)', marginBottom: '1.5rem', flex: 1 }}>By {author}</p>
        
        <Link to={`/books/${id}`} className="btn btn-primary" style={{ width: '100%' }}>
          {status === 'Available' ? 'Reserve' : 'View Details'}
        </Link>
      </div>
    </div>
  );
};

export default BookCard;
