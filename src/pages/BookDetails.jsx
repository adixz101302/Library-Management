import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Calendar, BookOpen, AlertCircle, CheckCircle } from 'lucide-react';

const mockBookDetails = {
  id: '1',
  title: 'The Design of Everyday Things',
  author: 'Don Norman',
  category: 'Design',
  isbn: '978-0465050659',
  publisher: 'Basic Books',
  publishDate: '2013-11-05',
  pages: 368,
  description: "Even the smartest among us can feel inept as we fail to figure out which light switch or oven burner to turn on, or whether to push, pull, or slide a door. The fault, argues this ingenious—even liberating—book, lies not in ourselves, but in product design that ignores the needs of users and the principles of cognitive psychology. The problems range from ambiguous and hidden controls to arbitrary relationships between controls and functions, coupled with a lack of feedback or other assistance and unreasonable demands on memorization. The Design of Everyday Things shows that good, usable design is possible. The rules are simple: make things visible, exploit natural relationships that couple function and control, and make intelligent use of constraints. The goal: guide the user effortlessly to the right action on the right control at the right time.",
  available: true,
  coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800'
};

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [reservationData, setReservationData] = useState({ name: '', email: '' });
  const [isSuccess, setIsSuccess] = useState(false);

  // In a real app, you would fetch details using `id`
  const book = mockBookDetails;

  const handleReserve = (e) => {
    e.preventDefault();
    // Simulate API call to ERPNext endpoint
    setTimeout(() => {
      setIsSuccess(true);
      setTimeout(() => {
        setShowModal(false);
        setIsSuccess(false);
      }, 3000);
    }, 1000);
  };

  return (
    <div className="container main-content">
      <button className="btn" style={{ marginBottom: '2rem', padding: 0 }} onClick={() => navigate(-1)}>
        <ArrowLeft size={20} /> Back to Catalog
      </button>

      <div className="card" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '3rem', padding: '3rem' }}>
        {/* Image Column */}
        <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
          <img src={book.coverImage} alt={book.title} style={{ width: '100%', height: 'auto', display: 'block' }} />
        </div>

        {/* Details Column */}
        <div>
          <div style={{ marginBottom: '1rem' }}>
            <span className={`badge ${book.available ? 'badge-success' : 'badge-danger'}`}>
              {book.available ? 'Available' : 'Currently Issued'}
            </span>
            <span className="badge" style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text-secondary)', marginLeft: '0.5rem' }}>
              {book.category}
            </span>
          </div>

          <h1 style={{ fontSize: 'var(--font-size-3xl)', marginBottom: '0.5rem' }}>{book.title}</h1>
          <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-text-secondary)', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <User size={20} /> {book.author}
          </p>

          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '0.5rem' }}>Description</h3>
            <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>{book.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4" style={{ marginBottom: '3rem', padding: '1.5rem', backgroundColor: 'var(--color-background)', borderRadius: 'var(--radius-md)' }}>
            <div>
              <p className="text-muted" style={{ fontSize: 'var(--font-size-sm)' }}>Publisher</p>
              <p className="font-semibold">{book.publisher}</p>
            </div>
            <div>
              <p className="text-muted" style={{ fontSize: 'var(--font-size-sm)' }}>ISBN</p>
              <p className="font-semibold">{book.isbn}</p>
            </div>
            <div>
              <p className="text-muted" style={{ fontSize: 'var(--font-size-sm)' }}>Publish Date</p>
              <p className="font-semibold">{book.publishDate}</p>
            </div>
            <div>
              <p className="text-muted" style={{ fontSize: 'var(--font-size-sm)' }}>Pages</p>
              <p className="font-semibold">{book.pages}</p>
            </div>
          </div>

          <button 
            className="btn btn-primary" 
            style={{ padding: '1rem 2rem', fontSize: 'var(--font-size-md)' }}
            disabled={!book.available}
            onClick={() => setShowModal(true)}
          >
            {book.available ? 'Reserve this Book' : 'Join Waitlist'}
          </button>
        </div>
      </div>

      {/* Reservation Modal (Vanilla CSS Modal) */}
      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div className="card" style={{ width: '100%', maxWidth: '500px', padding: '2rem' }}>
            {isSuccess ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <CheckCircle size={64} color="var(--color-success)" style={{ margin: '0 auto 1rem' }} />
                <h2>Reservation Successful!</h2>
                <p className="text-muted">Your reservation for "{book.title}" has been confirmed.</p>
              </div>
            ) : (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <h2>Reserve Book</h2>
                  <button onClick={() => setShowModal(false)} style={{ fontSize: '1.5rem', lineHeight: 1 }}>&times;</button>
                </div>
                <form onSubmit={handleReserve}>
                  <div className="input-group">
                    <label className="input-label">Member Name</label>
                    <input 
                      type="text" 
                      className="input-field" 
                      required 
                      value={reservationData.name}
                      onChange={e => setReservationData({...reservationData, name: e.target.value})}
                    />
                  </div>
                  <div className="input-group" style={{ marginBottom: '2rem' }}>
                    <label className="input-label">Email Address</label>
                    <input 
                      type="email" 
                      className="input-field" 
                      required 
                      value={reservationData.email}
                      onChange={e => setReservationData({...reservationData, email: e.target.value})}
                    />
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                    <button type="submit" className="btn btn-primary">Confirm Reservation</button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetails;
