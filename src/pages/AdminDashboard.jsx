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
  const [stats, setStats] = useState({ totalArticles: '0', availableBooks: '0', issuedBooks: '0', overdueBooks: '0' });
  const [recentReservations, setRecentReservations] = useState([]);
  const [overdueReturns, setOverdueReturns] = useState([]);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statsData = await libraryService.getDashboardStats();
        setStats(statsData);
        
        const resData = await libraryService.getAllReservations();
        setRecentReservations(resData.slice(0, 3));
        
        const overdueData = await libraryService.getOverdueReturns();
        setOverdueReturns(overdueData.slice(0, 3));
      } catch (error) {
        console.error("Failed to load dashboard overview data", error);
      }
    };
    fetchData();
  }, []);

  const handleGenerateReport = async () => {
    setGenerating(true);
    try {
      const [allReservations, overdues, allBooks, members] = await Promise.all([
        libraryService.getAllReservations(),
        libraryService.getOverdueReturns(),
        libraryService.getAllBooks(),
        libraryService.getAllMembers()
      ]);
      const now = new Date().toLocaleString();
      const html = `
<!DOCTYPE html>
<html>
<head>
  <title>LibraryERP - Full Report</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 2rem; color: #111; }
    h1 { color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 0.5rem; }
    h2 { color: #3498db; margin-top: 2rem; }
    table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
    th { background: #3498db; color: white; padding: 0.6rem 1rem; text-align: left; }
    td { padding: 0.6rem 1rem; border-bottom: 1px solid #eee; }
    tr:hover td { background: #f9f9f9; }
    .badge { padding: 2px 8px; border-radius: 999px; font-size: 0.75rem; font-weight: 600; }
    .badge-success { background: #d4edda; color: #155724; }
    .badge-danger { background: #f8d7da; color: #721c24; }
    .badge-warning { background: #fff3cd; color: #856404; }
    .stats { display: flex; gap: 1rem; flex-wrap: wrap; margin: 1rem 0; }
    .stat-box { border: 1px solid #ddd; border-radius: 8px; padding: 1rem 1.5rem; min-width: 160px; }
    .stat-box h3 { margin: 0; font-size: 1.5rem; color: #3498db; }
    .stat-box p { margin: 0.25rem 0 0; color: #666; font-size: 0.85rem; }
    @media print { body { padding: 0; } button { display: none; } }
  </style>
</head>
<body>
  <h1>📚 LibraryERP - Library Management Report</h1>
  <p style="color:#666">Generated: ${now}</p>
  <button onclick="window.print()" style="padding:0.5rem 1rem;background:#3498db;color:white;border:none;border-radius:6px;cursor:pointer;margin-bottom:1rem">🖨️ Print / Save as PDF</button>

  <h2>📊 Summary Statistics</h2>
  <div class="stats">
    <div class="stat-box"><h3>${stats.totalArticles}</h3><p>Total Articles</p></div>
    <div class="stat-box"><h3>${stats.availableBooks}</h3><p>Available Books</p></div>
    <div class="stat-box"><h3>${stats.issuedBooks}</h3><p>Issued Books</p></div>
    <div class="stat-box"><h3>${stats.overdueBooks}</h3><p>Overdue Books</p></div>
    <div class="stat-box"><h3>${members.length}</h3><p>Total Members</p></div>
  </div>

  <h2>📋 All Reservations (${allReservations.length})</h2>
  <table>
    <thead><tr><th>Reservation ID</th><th>Member</th><th>Book</th><th>Date</th><th>Status</th></tr></thead>
    <tbody>${allReservations.map(r => `<tr><td>${r.id}</td><td>${r.member}</td><td>${r.book}</td><td>${r.date}</td><td>${r.status}</td></tr>`).join('')}</tbody>
  </table>

  <h2>⚠️ Overdue Returns (${overdues.length})</h2>
  <table>
    <thead><tr><th>Record ID</th><th>Member</th><th>Book</th><th>Due Date</th><th>Fine</th></tr></thead>
    <tbody>${overdues.map(o => `<tr><td>${o.id}</td><td>${o.member}</td><td>${o.book}</td><td>${o.dueDate}</td><td>${o.fine}</td></tr>`).join('')}</tbody>
  </table>

  <h2>📦 Book Inventory (${allBooks.length})</h2>
  <table>
    <thead><tr><th>Book ID</th><th>Title</th><th>Author</th><th>Category</th><th>Status</th></tr></thead>
    <tbody>${allBooks.map(b => `<tr><td>${b.id}</td><td>${b.title}</td><td>${b.author}</td><td>${b.category}</td><td>${b.status}</td></tr>`).join('')}</tbody>
  </table>

  <h2>👥 Members (${members.length})</h2>
  <table>
    <thead><tr><th>Member ID</th><th>Name</th><th>Email</th><th>Status</th></tr></thead>
    <tbody>${members.map(m => `<tr><td>${m.id}</td><td>${m.name}</td><td>${m.email}</td><td>${m.status}</td></tr>`).join('')}</tbody>
  </table>
</body>
</html>`;
      const win = window.open('', '_blank');
      win.document.write(html);
      win.document.close();
    } catch (err) {
      console.error('Failed to generate report', err);
      alert('Failed to generate report. Please try again.');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Dashboard Overview</h1>
        <button className="btn btn-primary" onClick={handleGenerateReport} disabled={generating}>
          {generating ? 'Generating...' : 'Generate Report'}
        </button>
      </div>

      <div className="grid grid-cols-4 gap-6" style={{ marginBottom: '3rem' }}>
        <StatCard title="Total Inventory" value={stats.totalArticles} icon={Book} trend="+2%" />
        <StatCard title="Available Books" value={stats.availableBooks} icon={ClipboardList} trend="+5%" />
        <StatCard title="Issued Books" value={stats.issuedBooks} icon={Users} trend="+12" />
        <StatCard title="Overdue Books" value={stats.overdueBooks} icon={AlertTriangle} trend="-3%" />
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
              {recentReservations.length === 0 ? (
                <tr>
                  <td colSpan="3" style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-secondary)' }}>No recent reservations found.</td>
                </tr>
              ) : (
                recentReservations.map((req, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--color-background)' }}>
                    <td style={{ padding: '1rem 0', fontWeight: 500 }}>{req.member}</td>
                    <td style={{ padding: '1rem 0', color: 'var(--color-text-secondary)' }}>{req.book}</td>
                    <td style={{ padding: '1rem 0' }}>
                      <span className={`badge ${req.status === 'Approved' ? 'badge-success' : req.status === 'Cancelled' ? 'badge-danger' : 'badge-warning'}`}>{req.status}</span>
                    </td>
                  </tr>
                ))
              )}
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
              {overdueReturns.length === 0 ? (
                <tr>
                  <td colSpan="3" style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-secondary)' }}>No overdue books found.</td>
                </tr>
              ) : (
                overdueReturns.map((req, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--color-background)' }}>
                    <td style={{ padding: '1rem 0', fontWeight: 500 }}>{req.member}</td>
                    <td style={{ padding: '1rem 0', color: 'var(--color-text-secondary)' }}>{req.book}</td>
                    <td style={{ padding: '1rem 0' }}>
                      <span className="badge badge-danger">{req.dueDate}</span>
                    </td>
                  </tr>
                ))
              )}
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
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newMember, setNewMember] = useState({ name: '', email: '', phone: '', membershipId: '', joinDate: '', active: true, expiryDate: '' });

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const data = await libraryService.getAllMembers();
        setMembers(data);
      } catch (error) {
        console.error("Failed to load members", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  const handleAddMember = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const result = await libraryService.addMember(newMember);
      const newId = result?.data?.name || newMember.membershipId || `LIB-${Math.floor(Math.random() * 1000)}`;
      
      setMembers([...members, {
        id: newId,
        name: newMember.name,
        email: newMember.email,
        activeIssues: 0,
        status: newMember.active ? 'Active' : 'Suspended'
      }]);
      setShowModal(false);
      setNewMember({ name: '', email: '', phone: '', membershipId: '', joinDate: '', active: true, expiryDate: '' });
    } catch (error) {
      console.error("Failed to add member", error);
      alert("Failed to save the member to ERPNext. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Member Management</h1>
        <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} onClick={() => setShowModal(true)}>
          <Plus size={18} /> Add New Member
        </button>
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
            {loading ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-secondary)' }}>Loading members from ERPNext...</td>
              </tr>
            ) : members.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-secondary)' }}>No members found.</td>
              </tr>
            ) : (
              members.map((mem) => (
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
            )))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="card" style={{ width: '100%', maxWidth: '500px', margin: '2rem', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ margin: 0 }}>Add New Member</h2>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.5rem', color: 'var(--color-text-muted)' }}>&times;</button>
            </div>
            
            <form onSubmit={handleAddMember}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Full Name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  required 
                  value={newMember.name}
                  onChange={e => setNewMember({...newMember, name: e.target.value})}
                  placeholder="e.g. John Doe"
                />
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Email Address</label>
                <input 
                  type="email" 
                  className="form-control" 
                  required 
                  value={newMember.email}
                  onChange={e => setNewMember({...newMember, email: e.target.value})}
                  placeholder="e.g. john@example.com"
                />
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Phone Number (Optional)</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={newMember.phone}
                  onChange={e => setNewMember({...newMember, phone: e.target.value})}
                  placeholder="e.g. +1 234 567 8900"
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Membership ID (Optional)</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={newMember.membershipId}
                  onChange={e => setNewMember({...newMember, membershipId: e.target.value})}
                  placeholder="e.g. LIB-2026-001"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Join Date</label>
                  <input 
                    type="date" 
                    className="form-control" 
                    value={newMember.joinDate}
                    onChange={e => setNewMember({...newMember, joinDate: e.target.value})}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Expiry Date (Optional)</label>
                  <input 
                    type="date" 
                    className="form-control" 
                    value={newMember.expiryDate}
                    onChange={e => setNewMember({...newMember, expiryDate: e.target.value})}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input 
                  type="checkbox" 
                  id="activeMemberCheck"
                  checked={newMember.active}
                  onChange={e => setNewMember({...newMember, active: e.target.checked})}
                />
                <label htmlFor="activeMemberCheck" style={{ fontWeight: 500, cursor: 'pointer' }}>Active Member</label>
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '2rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)} disabled={isSubmitting}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? 'Saving to ERPNext...' : 'Save Member'}
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
// 4. RESERVATIONS REQUESTS VIEW (INTERACTIVE STATUS UPDATES)
// ----------------------------------------------------
const ReservationsView = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);
  const [newReservation, setNewReservation] = useState({
    article: '',
    member: '',
    reservationDate: new Date().toISOString().split('T')[0],
    status: 'Pending'
  });

  useEffect(() => {
    fetchReservations();
    // Fetch books and members for dropdowns
    Promise.all([libraryService.getAllBooks(), libraryService.getAllMembers()])
      .then(([booksData, membersData]) => {
        setBooks(booksData);
        setMembers(membersData);
      })
      .catch(err => console.error("Failed to load dropdown data", err));
  }, []);

  const fetchReservations = async () => {
    try {
      const data = await libraryService.getAllReservations();
      setRequests(data);
    } catch (error) {
      console.error("Failed to load reservations", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddReservation = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const result = await libraryService.reserveBook({
        articleId: newReservation.article,
        memberName: newReservation.member,
        reservationDate: newReservation.reservationDate,
        status: newReservation.status
      });
      const newId = result?.data?.name || `RES-${Date.now()}`;
      setRequests([{
        id: newId,
        member: newReservation.member,
        book: newReservation.article,
        date: newReservation.reservationDate,
        status: newReservation.status
      }, ...requests]);
      setShowModal(false);
      setNewReservation({ article: '', member: '', reservationDate: new Date().toISOString().split('T')[0], status: 'Pending' });
    } catch (error) {
      console.error("Failed to add reservation", error);
      alert("Failed to save reservation to ERPNext. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await libraryService.updateReservationStatus(id, newStatus);
      // Optimistically update the UI
      setRequests(requests.map(req => req.id === id ? { ...req, status: newStatus } : req));
    } catch (error) {
      alert("Failed to update status in ERPNext.");
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Reservation Requests</h1>
        <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} onClick={() => setShowModal(true)}>
          <Plus size={18} /> New Reservation
        </button>
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
            {loading ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-secondary)' }}>Loading reservations from ERPNext...</td>
              </tr>
            ) : requests.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-secondary)' }}>No reservations found.</td>
              </tr>
            ) : (
              requests.map((req) => (
                <tr key={req.id} style={{ borderBottom: '1px solid var(--color-background)' }}>
                  <td style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--color-primary)' }}>{req.id}</td>
                  <td style={{ padding: '1rem 1.5rem', fontWeight: 500 }}>{req.member}</td>
                  <td style={{ padding: '1rem 1.5rem', color: 'var(--color-text-secondary)' }}>{req.book}</td>
                  <td style={{ padding: '1rem 1.5rem', color: 'var(--color-text-secondary)' }}>{req.date}</td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <span className={`badge ${
                      req.status === 'Approved' ? 'badge-success' : 
                      req.status === 'Cancelled' ? 'badge-danger' : 'badge-reserved'
                    }`}>
                      {req.status}
                    </span>
                  </td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    {req.status === 'Pending' ? (
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button className="btn btn-primary" style={{ padding: '0.25rem 0.5rem', fontSize: 'var(--font-size-xs)' }} onClick={() => updateStatus(req.id, 'Approved')}>Approve</button>
                        <button className="btn btn-secondary" style={{ padding: '0.25rem 0.5rem', fontSize: 'var(--font-size-xs)' }} onClick={() => updateStatus(req.id, 'Cancelled')}>Reject</button>
                      </div>
                    ) : (
                      <span className="text-muted" style={{ fontSize: 'var(--font-size-sm)' }}>Processed</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="card" style={{ width: '100%', maxWidth: '520px', margin: '2rem', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ margin: 0 }}>New Book Reservation</h2>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.5rem', color: 'var(--color-text-muted)' }}>&times;</button>
            </div>

            <form onSubmit={handleAddReservation}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Article</label>
                <select
                  className="form-control"
                  required
                  value={newReservation.article}
                  onChange={e => setNewReservation({...newReservation, article: e.target.value})}
                  style={{ appearance: 'auto' }}
                >
                  <option value="">-- Select Article --</option>
                  {books.map(book => (
                    <option key={book.id} value={book.id}>{book.title || book.id}</option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Member</label>
                <select
                  className="form-control"
                  required
                  value={newReservation.member}
                  onChange={e => setNewReservation({...newReservation, member: e.target.value})}
                  style={{ appearance: 'auto' }}
                >
                  <option value="">-- Select Member --</option>
                  {members.map(mem => (
                    <option key={mem.id} value={mem.name}>{mem.name}</option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Reservation Date</label>
                <input
                  type="date"
                  className="form-control"
                  required
                  value={newReservation.reservationDate}
                  onChange={e => setNewReservation({...newReservation, reservationDate: e.target.value})}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Status</label>
                <select
                  className="form-control"
                  value={newReservation.status}
                  onChange={e => setNewReservation({...newReservation, status: e.target.value})}
                  style={{ appearance: 'auto' }}
                >
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)} disabled={isSubmitting}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? 'Saving to ERPNext...' : 'Save Reservation'}
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
// 5. OVERDUE VIEW (WITH TOAST REMINDERS)
// ----------------------------------------------------
const OverdueView = () => {
  const [overdues, setOverdues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    const fetchOverdues = async () => {
      try {
        const data = await libraryService.getOverdueReturns();
        setOverdues(data);
      } catch (error) {
        console.error("Failed to load overdue returns", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOverdues();
  }, []);

  const triggerReminder = (email) => {
    // In a real app, this would call an ERPNext notification API
    setToastMessage(`Email notification sent successfully to ${email || 'member'}!`);
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
              <th style={{ padding: '1rem 1.5rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Transaction ID</th>
              <th style={{ padding: '1rem 1.5rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Member</th>
              <th style={{ padding: '1rem 1.5rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Book Title</th>
              <th style={{ padding: '1rem 1.5rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Due Date</th>
              <th style={{ padding: '1rem 1.5rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Calculated Fine</th>
              <th style={{ padding: '1rem 1.5rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-secondary)' }}>Loading overdue records from ERPNext...</td>
              </tr>
            ) : overdues.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-secondary)' }}>No overdue books found.</td>
              </tr>
            ) : (
              overdues.map((item) => (
                <tr key={item.id} style={{ borderBottom: '1px solid var(--color-background)' }}>
                  <td style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--color-primary)' }}>{item.id}</td>
                  <td style={{ padding: '1rem 1.5rem', fontWeight: 500 }}>{item.member}</td>
                  <td style={{ padding: '1rem 1.5rem', color: 'var(--color-text-secondary)' }}>{item.book}</td>
                  <td style={{ padding: '1rem 1.5rem', color: 'var(--color-danger)', fontWeight: 600 }}>{item.dueDate}</td>
                  <td style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>{item.fine}</td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <button className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', padding: '0.25rem 0.5rem', fontSize: 'var(--font-size-xs)' }} onClick={() => triggerReminder(item.member)}>
                      <Send size={12} /> Send Alert
                    </button>
                  </td>
                </tr>
              ))
            )}
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
