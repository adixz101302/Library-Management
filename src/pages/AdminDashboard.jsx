import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Book, Users, ClipboardList, TrendingUp, AlertTriangle, Plus, Send, Settings as SettingsIcon } from 'lucide-react';
import Sidebar from '../components/layout/Sidebar';
import StatCard from '../components/shared/StatCard';
import { libraryService } from '../services/api';

// ----------------------------------------------------
// 1. DASHBOARD OVERVIEW VIEW
// ----------------------------------------------------
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
            <a href="/dashboard/reservations" className="text-muted" style={{ fontSize: 'var(--font-size-sm)' }}>View All</a>
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
            <a href="/dashboard/overdue" className="text-muted" style={{ fontSize: 'var(--font-size-sm)' }}>View All</a>
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

// ----------------------------------------------------
// 2. INVENTORY VIEW (WITH MODAL FORM)
// ----------------------------------------------------
const InventoryView = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await libraryService.getAllBooks();
        // Assume qty is 1 for ERPNext records since we don't have a qty field in tabArticle
        const mappedBooks = data.map(book => ({ ...book, qty: 1 }));
        setBooks(mappedBooks);
      } catch (error) {
        console.error("Failed to load inventory", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newBook, setNewBook] = useState({ title: '', author: '', category: 'Technology', qty: 1, publisher: '', isbn: '', publishedDate: '', price: '', description: '' });

  const handleAddBook = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const result = await libraryService.addBook(newBook);
      // Use the actual ERPNext document name as the ID (or fallback to the title)
      const newId = result?.data?.name || newBook.title;
      
      setBooks([...books, {
        id: newId,
        title: newBook.title,
        author: newBook.author,
        category: newBook.category,
        qty: parseInt(newBook.qty),
        status: 'Available'
      }]);
      setShowModal(false);
      setNewBook({ title: '', author: '', category: 'Technology', qty: 1, publisher: '', isbn: '', publishedDate: '', price: '', description: '' });
    } catch (error) {
      console.error("Failed to add book", error);
      alert("Failed to save the book to ERPNext. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Book Inventory Management</h1>
        <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} onClick={() => setShowModal(true)}>
          <Plus size={18} /> Add New Book
        </button>
      </div>

      <div className="card" style={{ padding: 0 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--color-background)', borderBottom: '1px solid var(--color-background)' }}>
              <th style={{ padding: '1rem 1.5rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Book ID</th>
              <th style={{ padding: '1rem 1.5rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Title</th>
              <th style={{ padding: '1rem 1.5rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Author</th>
              <th style={{ padding: '1rem 1.5rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Category</th>
              <th style={{ padding: '1rem 1.5rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Quantity</th>
              <th style={{ padding: '1rem 1.5rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-secondary)' }}>Loading inventory from ERPNext...</td>
              </tr>
            ) : books.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-secondary)' }}>No books found in ERPNext.</td>
              </tr>
            ) : (
              books.map((book) => (
                <tr key={book.id} style={{ borderBottom: '1px solid var(--color-background)' }}>
                  <td style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--color-primary)' }}>{book.id}</td>
                  <td style={{ padding: '1rem 1.5rem', fontWeight: 500 }}>{book.title}</td>
                  <td style={{ padding: '1rem 1.5rem', color: 'var(--color-text-secondary)' }}>{book.author}</td>
                  <td style={{ padding: '1rem 1.5rem', color: 'var(--color-text-secondary)' }}>{book.category}</td>
                  <td style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>{book.qty}</td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <span className={`badge ${
                      book.status === 'Available' ? 'badge-success' : 
                      book.status === 'Issued' ? 'badge-danger' : 'badge-reserved'
                    }`}>
                      {book.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="card" style={{ width: '100%', maxWidth: '700px', maxHeight: '90vh', overflowY: 'auto', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2>Add New Book</h2>
              <button onClick={() => setShowModal(false)} style={{ fontSize: '1.5rem', lineHeight: 1 }}>&times;</button>
            </div>
            <form onSubmit={handleAddBook}>
              <div className="grid grid-cols-2 gap-4">
                <div className="input-group">
                  <label className="input-label">Title</label>
                  <input type="text" className="input-field" required value={newBook.title} onChange={e => setNewBook({...newBook, title: e.target.value})} />
                </div>
                <div className="input-group">
                  <label className="input-label">Author</label>
                  <input type="text" className="input-field" required value={newBook.author} onChange={e => setNewBook({...newBook, author: e.target.value})} />
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">Description</label>
                <textarea className="input-field" rows="3" value={newBook.description} onChange={e => setNewBook({...newBook, description: e.target.value})}></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="input-group">
                  <label className="input-label">Publisher</label>
                  <input type="text" className="input-field" value={newBook.publisher} onChange={e => setNewBook({...newBook, publisher: e.target.value})} />
                </div>
                <div className="input-group">
                  <label className="input-label">ISBN</label>
                  <input type="text" className="input-field" value={newBook.isbn} onChange={e => setNewBook({...newBook, isbn: e.target.value})} />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="input-group">
                  <label className="input-label">Published Date</label>
                  <input type="date" className="input-field" value={newBook.publishedDate} onChange={e => setNewBook({...newBook, publishedDate: e.target.value})} />
                </div>
                <div className="input-group">
                  <label className="input-label">Price ($)</label>
                  <input type="number" step="0.01" className="input-field" value={newBook.price} onChange={e => setNewBook({...newBook, price: e.target.value})} />
                </div>
                <div className="input-group">
                  <label className="input-label">Quantity</label>
                  <input type="number" min="1" className="input-field" required value={newBook.qty} onChange={e => setNewBook({...newBook, qty: e.target.value})} />
                </div>
              </div>

              <div className="input-group" style={{ marginBottom: '2rem' }}>
                <label className="input-label">Category</label>
                <select className="input-field" value={newBook.category} onChange={e => setNewBook({...newBook, category: e.target.value})}>
                  <option value="Technology">Technology</option>
                  <option value="Programming">Programming</option>
                  <option value="Science">Science</option>
                  <option value="Novel">Novel</option>
                  <option value="History">History</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)} disabled={isSubmitting}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? 'Saving...' : 'Add Book'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// ----------------------------------------------------
// 3. MEMBERS VIEW
// ----------------------------------------------------
const MembersView = () => {
  const [members] = useState([
    { id: 'MEM-001', name: 'John Doe', email: 'john@university.edu', activeIssues: 2, status: 'Active' },
    { id: 'MEM-002', name: 'Jane Smith', email: 'jane@university.edu', activeIssues: 0, status: 'Active' },
    { id: 'MEM-003', name: 'Alan Turing', email: 'turing@university.edu', activeIssues: 4, status: 'Suspended' },
    { id: 'MEM-004', name: 'Grace Hopper', email: 'hopper@university.edu', activeIssues: 1, status: 'Active' }
  ]);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Member Management</h1>
      </div>

      <div className="card" style={{ padding: 0 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--color-background)', borderBottom: '1px solid var(--color-background)' }}>
              <th style={{ padding: '1rem 1.5rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Member ID</th>
              <th style={{ padding: '1rem 1.5rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Name</th>
              <th style={{ padding: '1rem 1.5rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Email</th>
              <th style={{ padding: '1rem 1.5rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Active Issues</th>
              <th style={{ padding: '1rem 1.5rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {members.map((mem) => (
              <tr key={mem.id} style={{ borderBottom: '1px solid var(--color-background)' }}>
                <td style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--color-primary)' }}>{mem.id}</td>
                <td style={{ padding: '1rem 1.5rem', fontWeight: 500 }}>{mem.name}</td>
                <td style={{ padding: '1rem 1.5rem', color: 'var(--color-text-secondary)' }}>{mem.email}</td>
                <td style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>{mem.activeIssues}</td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <span className={`badge ${mem.status === 'Active' ? 'badge-success' : 'badge-danger'}`}>
                    {mem.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ----------------------------------------------------
// 4. RESERVATIONS REQUESTS VIEW (INTERACTIVE STATUS UPDATES)
// ----------------------------------------------------
const ReservationsView = () => {
  const [requests, setRequests] = useState([
    { id: 'REQ-01', member: 'Alice Smith', book: 'Clean Code', date: '2026-05-18', status: 'Pending' },
    { id: 'REQ-02', member: 'Bob Jones', book: 'Dune', date: '2026-05-17', status: 'Approved' },
    { id: 'REQ-03', member: 'Charlie Brown', book: '1984', date: '2026-05-16', status: 'Pending' }
  ]);

  const updateStatus = (id, newStatus) => {
    setRequests(requests.map(req => req.id === id ? { ...req, status: newStatus } : req));
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Reservation Requests</h1>
      </div>

      <div className="card" style={{ padding: 0 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--color-background)', borderBottom: '1px solid var(--color-background)' }}>
              <th style={{ padding: '1rem 1.5rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Request ID</th>
              <th style={{ padding: '1rem 1.5rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Member</th>
              <th style={{ padding: '1rem 1.5rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Book Title</th>
              <th style={{ padding: '1rem 1.5rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Date Requested</th>
              <th style={{ padding: '1rem 1.5rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Status</th>
              <th style={{ padding: '1rem 1.5rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id} style={{ borderBottom: '1px solid var(--color-background)' }}>
                <td style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--color-primary)' }}>{req.id}</td>
                <td style={{ padding: '1rem 1.5rem', fontWeight: 500 }}>{req.member}</td>
                <td style={{ padding: '1rem 1.5rem', color: 'var(--color-text-secondary)' }}>{req.book}</td>
                <td style={{ padding: '1rem 1.5rem', color: 'var(--color-text-secondary)' }}>{req.date}</td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <span className={`badge ${
                    req.status === 'Approved' ? 'badge-success' : 
                    req.status === 'Rejected' ? 'badge-danger' : 'badge-reserved'
                  }`}>
                    {req.status}
                  </span>
                </td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  {req.status === 'Pending' ? (
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="btn btn-primary" style={{ padding: '0.25rem 0.5rem', fontSize: 'var(--font-size-xs)' }} onClick={() => updateStatus(req.id, 'Approved')}>Approve</button>
                      <button className="btn btn-secondary" style={{ padding: '0.25rem 0.5rem', fontSize: 'var(--font-size-xs)' }} onClick={() => updateStatus(req.id, 'Rejected')}>Reject</button>
                    </div>
                  ) : (
                    <span className="text-muted" style={{ fontSize: 'var(--font-size-sm)' }}>Processed</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ----------------------------------------------------
// 5. OVERDUE VIEW (WITH TOAST REMINDERS)
// ----------------------------------------------------
const OverdueView = () => {
  const [overdues] = useState([
    { id: 'TRX-901', member: 'Jane Smith', email: 'jane@university.edu', book: 'Clean Architecture', days: 4, fine: '$8.00' },
    { id: 'TRX-902', member: 'Alan Turing', email: 'turing@university.edu', book: 'Python for Data Analysis', days: 1, fine: '$2.00' }
  ]);
  const [toastMessage, setToastMessage] = useState(null);

  const triggerReminder = (email) => {
    setToastMessage(`Email notification sent successfully to ${email}!`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Overdue Returns Tracking</h1>
      </div>

      {toastMessage && (
        <div className="alert-panel alert-success" style={{ marginBottom: '1.5rem', padding: '0.75rem 1rem' }}>
          <Send size={18} />
          <div>{toastMessage}</div>
        </div>
      )}

      <div className="card" style={{ padding: 0 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--color-background)', borderBottom: '1px solid var(--color-background)' }}>
              <th style={{ padding: '1rem 1.5rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Transaction</th>
              <th style={{ padding: '1rem 1.5rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Member</th>
              <th style={{ padding: '1rem 1.5rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Book Title</th>
              <th style={{ padding: '1rem 1.5rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Days Overdue</th>
              <th style={{ padding: '1rem 1.5rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Calculated Fine</th>
              <th style={{ padding: '1rem 1.5rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {overdues.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid var(--color-background)' }}>
                <td style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--color-primary)' }}>{item.id}</td>
                <td style={{ padding: '1rem 1.5rem', fontWeight: 500 }}>{item.member}</td>
                <td style={{ padding: '1rem 1.5rem', color: 'var(--color-text-secondary)' }}>{item.book}</td>
                <td style={{ padding: '1rem 1.5rem', color: 'var(--color-danger)', fontWeight: 600 }}>{item.days} days</td>
                <td style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>{item.fine}</td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <button className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', padding: '0.25rem 0.5rem', fontSize: 'var(--font-size-xs)' }} onClick={() => triggerReminder(item.email)}>
                    <Send size={12} /> Send Alert
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ----------------------------------------------------
// 6. SYSTEM SETTINGS VIEW
// ----------------------------------------------------
const SettingsView = () => {
  const [settings, setSettings] = useState({
    loanPeriod: '14',
    dailyFine: '2.00',
    maxBooks: '5'
  });
  const [success, setSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div style={{ maxWidth: '600px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2.5rem' }}>
        <SettingsIcon size={28} color="var(--color-primary)" />
        <h1 style={{ margin: 0 }}>System Settings</h1>
      </div>

      {success && (
        <div className="alert-panel alert-success" style={{ marginBottom: '1.5rem', padding: '0.75rem 1rem' }}>
          <CheckCircle size={18} />
          <div>ERPNext System configuration updated successfully!</div>
        </div>
      )}

      <form className="card" onSubmit={handleSave} style={{ padding: '2.5rem' }}>
        <div className="input-group">
          <label className="input-label">Standard Loan Period (Days)</label>
          <input type="number" min="1" className="input-field" value={settings.loanPeriod} onChange={e => setSettings({...settings, loanPeriod: e.target.value})} required />
        </div>
        <div className="input-group">
          <label className="input-label">Daily Overdue Fine Amount ($)</label>
          <input type="text" className="input-field" value={settings.dailyFine} onChange={e => setSettings({...settings, dailyFine: e.target.value})} required />
        </div>
        <div className="input-group" style={{ marginBottom: '2.5rem' }}>
          <label className="input-label">Max Books Borrowed per Member</label>
          <input type="number" min="1" className="input-field" value={settings.maxBooks} onChange={e => setSettings({...settings, maxBooks: e.target.value})} required />
        </div>
        <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem' }}>Save Configurations</button>
      </form>
    </div>
  );
};

// Auxiliary CheckCircle component for Settings view
const CheckCircle = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
);

// ----------------------------------------------------
// MAIN ROUTER CONTAINER
// ----------------------------------------------------
const AdminDashboard = () => {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-content">
        <Routes>
          <Route path="/" element={<DashboardOverview />} />
          <Route path="/inventory" element={<InventoryView />} />
          <Route path="/members" element={<MembersView />} />
          <Route path="/reservations" element={<ReservationsView />} />
          <Route path="/overdue" element={<OverdueView />} />
          <Route path="/settings" element={<SettingsView />} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminDashboard;
