import axios from 'axios';
import { academicBooks, mockIssueRecords, mockReservations, mockReports } from '../data/mockData';

const ERPNEXT_URL = import.meta.env.VITE_ERPNEXT_URL;
const API_KEY = import.meta.env.VITE_API_KEY;
const API_SECRET = import.meta.env.VITE_API_SECRET;

const isConfigured = ERPNEXT_URL && API_KEY && API_SECRET;

// Create Axios instance only if configured
const api = isConfigured ? axios.create({
  baseURL: ERPNEXT_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `token ${API_KEY}:${API_SECRET}` 
  }
}) : null;

export const libraryService = {
  
  // Fetch Books Catalog
  getAllBooks: async () => {
    if (isConfigured) {
      try {
        const response = await api.get('/api/resource/Article', {
          params: { 
            fields: '["name", "article_name", "author", "available", "category"]',
            limit_page_length: 500
          }
        });
        return response.data.data.map(item => ({
          id: item.name,
          title: item.article_name || item.name,
          author: item.author || "Unknown Author",
          category: item.category || "General",
          status: item.available ? 'Available' : 'Issued',
          coverImage: null
        }));
      } catch (error) {
        console.error("ERPNext API Failed (Books). Falling back to mock data.", error);
      }
    }
    console.warn("Using mock catalog data.");
    return academicBooks;
  },

  // Fetch Dashboard Stats
  getDashboardStats: async () => {
    if (isConfigured) {
      try {
        const [booksRes, circRes] = await Promise.all([
          api.get('/api/resource/Article', {
            params: { fields: '["available"]', limit_page_length: 500 }
          }),
          api.get('/api/resource/Issue Record', {
            params: { fields: '["status"]', limit_page_length: 500 }
          })
        ]);
        
        const books = booksRes.data.data;
        const issues = circRes.data.data;
        
        const totalArticles = books.length;
        const availableBooks = books.filter(b => b.available === 1).length;
        const issuedBooks = books.filter(b => b.available === 0).length;
        const overdueBooks = issues.filter(i => i.status === 'Overdue').length;
        
        return {
          totalArticles: totalArticles.toLocaleString(),
          availableBooks: availableBooks.toLocaleString(),
          issuedBooks: issuedBooks.toLocaleString(),
          overdueBooks: overdueBooks.toLocaleString()
        };
      } catch (error) {
        console.error("ERPNext API Failed (Stats). Falling back to mock data.", error);
      }
    }
    return {
      totalArticles: "15,240",
      availableBooks: "11,850",
      issuedBooks: "3,210",
      overdueBooks: "180"
    };
  },

  // Fetch Recent Circulations
  getRecentCirculations: async () => {
    if (isConfigured) {
      try {
        const response = await api.get('/api/resource/Issue Record', {
          params: { 
            fields: '["name", "member", "article", "status", "return_date"]',
            limit_page_length: 5, 
            order_by: 'creation desc' 
          }
        });
        return response.data.data.map(item => ({
          member: item.member,
          article: item.article,
          status: item.status,
          returnDate: item.return_date || '-'
        }));
      } catch (error) {
        console.error("ERPNext API Failed (Circulations). Falling back to mock data.", error);
      }
    }
    return mockIssueRecords;
  },

  // Submit Reservation
  reserveBook: async (reservationData) => {
    if (isConfigured) {
      try {
        const response = await api.post('/api/resource/Issue Record', {
          article: reservationData.articleId,
          member: reservationData.memberEmail, 
          issue_date: new Date().toISOString().split('T')[0],
          status: 'Pending'
        });
        return response.data;
      } catch (error) {
        console.error("ERPNext Reservation Failed.", error);
        throw error;
      }
    }
    return new Promise((resolve) => setTimeout(() => resolve({ success: true }), 1000));
  },

  // Add New Book
  addBook: async (bookData) => {
    if (isConfigured) {
      try {
        const response = await api.post('/api/resource/Article', {
          article_name: bookData.title,
          author: bookData.author,
          category: bookData.category,
          available: 1
        });
        return response.data;
      } catch (error) {
        console.error("ERPNext Add Book Failed.", error);
        throw error;
      }
    }
    return new Promise((resolve) => setTimeout(() => resolve({ success: true }), 1000));
  },

  // Fetch User Reservations
  getMyReservations: async () => {
    if (isConfigured) {
      try {
        const response = await api.get('/api/resource/Issue Record', {
          params: { 
            fields: '["name", "article", "creation", "return_date", "status"]',
            limit_page_length: 50
          }
        });
        return response.data.data.map(res => ({
          id: res.name,
          article: res.article,
          date: res.creation.split(' ')[0],
          expectedAvailability: res.return_date || 'Pending',
          status: res.status
        }));
      } catch (error) {
        console.error("ERPNext API Failed (Reservations). Falling back to mock data.", error);
      }
    }
    return mockReservations;
  },

  // Fetch Library Reports
  getLibraryReports: async () => {
    if (isConfigured) {
      try {
        const [booksRes, issuesRes, membersRes] = await Promise.all([
          api.get('/api/resource/Article', {
            params: { fields: '["category"]', limit_page_length: 500 }
          }),
          api.get('/api/resource/Issue Record', {
            params: { fields: '["fine_amount", "member", "article", "status"]', limit_page_length: 500 }
          }),
          api.get('/api/resource/Library Member', {
            params: { fields: '["name"]', limit_page_length: 500 }
          })
        ]);

        const books = booksRes.data.data;
        const issues = issuesRes.data.data;
        const members = membersRes.data.data;

        const totalFines = issues.reduce((acc, curr) => acc + (parseFloat(curr.fine_amount) || 0), 0);
        const activeMembers = members.length;

        const categories = {};
        books.forEach(b => {
          const cat = b.category || 'General';
          categories[cat] = (categories[cat] || 0) + 1;
        });
        const totalBooks = books.length || 1;
        const categoryBreakdown = Object.entries(categories).map(([name, count]) => ({
          name,
          percentage: Math.round((count / totalBooks) * 100)
        })).sort((a, b) => b.percentage - a.percentage).slice(0, 4);

        const mostPopularCategory = categoryBreakdown[0]?.name || 'Technology';

        const overdueFines = issues
          .filter(i => i.status === 'Overdue')
          .map(i => ({
            member: i.member,
            article: i.article,
            daysOverdue: 5, 
            fineAmount: `$${parseFloat(i.fine_amount).toFixed(2)}`
          })).slice(0, 5);

        return {
          finesCollected: `$${totalFines.toFixed(2)}`,
          activeMembers: activeMembers.toLocaleString(),
          mostPopularCategory,
          categoryBreakdown,
          overdueFines
        };
      } catch (error) {
        console.error("ERPNext API Failed (Reports). Falling back to mock data.", error);
      }
    }
    return mockReports;
  }
};
