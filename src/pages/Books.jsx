import React, { useState, useEffect } from 'react';
import { Search, Filter, BookOpen } from 'lucide-react';
import BookCard from '../components/shared/BookCard';
import { libraryService } from '../services/api';

const statuses = ['All', 'Available', 'Issued', 'Reserved', 'Overdue'];

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Compute unique categories dynamically from loaded books
  const dynamicCategories = ['All', ...new Set(books.map(book => book.category).filter(Boolean))];

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await libraryService.getAllBooks();
        setBooks(data);
      } catch (error) {
        console.error("Error fetching books catalog", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || book.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="container main-content">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <BookOpen size={28} color="var(--color-primary)" />
            Library Catalog
          </h1>
          <p className="text-muted">Browse our complete collection of {books.length} articles.</p>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div className="input-group" style={{ marginBottom: 0, minWidth: '250px' }}>
            <div style={{ position: 'relative' }}>
              <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} size={18} />
              <input 
                type="text" 
                className="input-field" 
                placeholder="Search by title or author..." 
                style={{ width: '100%', paddingLeft: '2.5rem' }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="input-group" style={{ marginBottom: 0, minWidth: '180px' }}>
            <div style={{ position: 'relative' }}>
              <Filter style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} size={18} />
              <select 
                className="input-field" 
                style={{ width: '100%', paddingLeft: '2.5rem', appearance: 'none' }}
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {dynamicCategories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="input-group" style={{ marginBottom: 0, minWidth: '150px' }}>
            <div style={{ position: 'relative' }}>
              <select 
                className="input-field" 
                style={{ width: '100%', paddingLeft: '1rem', appearance: 'none' }}
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                {statuses.map(stat => (
                  <option key={stat} value={stat}>{stat === 'All' ? 'All Status' : stat}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem 0' }}>Loading catalog...</div>
      ) : (
        <div className="grid grid-cols-4 gap-6">
          {filteredBooks.length > 0 ? (
            filteredBooks.map(book => <BookCard key={book.id} {...book} />)
          ) : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem 0' }}>
              <p className="text-muted">No books found matching your criteria.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Books;
