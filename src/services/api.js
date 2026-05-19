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
        const response = await api.get('/api/resource/Library Article', {
          params: { fields: '["name", "article_name", "author", "status", "image", "item_group"]' }
        });
        return response.data.data.map(item => ({
          id: item.name,
          title: item.article_name,
          author: item.author,
          category: item.item_group,
          status: item.status,
          coverImage: item.image ? `${ERPNEXT_URL}${item.image}` : null
        }));
      } catch (error) {
        console.error("ERPNext API Failed (Books). Falling back to mock data.", error);
      }
    }
    // Graceful Fallback
    console.warn("Using mock catalog data.");
    return academicBooks;
  },

  // Fetch Dashboard Stats
  getDashboardStats: async () => {
    if (isConfigured) {
      try {
        const response = await api.get('/api/method/library_management.api.get_dashboard_stats');
        return response.data.message;
      } catch (error) {
        console.error("ERPNext API Failed (Stats). Falling back to mock data.", error);
      }
    }
    // Graceful Fallback
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
        const response = await api.get('/api/resource/Library Transaction', {
          params: { limit_page_length: 5, order_by: 'creation desc' }
        });
        return response.data.data;
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
        const response = await api.post('/api/resource/Library Transaction', {
          article: reservationData.articleId,
          library_member: reservationData.memberEmail, // Assuming email maps to member
          type: 'Issue' // Or your custom reservation type
        });
        return response.data;
      } catch (error) {
        console.error("ERPNext Reservation Failed.", error);
        throw error; // If live API fails, we should actually throw so the UI shows an error
      }
    }
    
    // Graceful Fallback mock success
    return new Promise((resolve) => setTimeout(() => resolve({ success: true }), 1000));
  },

  // Fetch User Reservations
  getMyReservations: async () => {
    if (isConfigured) {
      try {
        const response = await api.get('/api/resource/Library Transaction', {
          params: { 
            filters: '[["type", "=", "Issue"], ["status", "in", ["Pending", "Approved"]]]',
            fields: '["name", "article", "creation", "expected_availability", "status"]',
            limit_page_length: 50
          }
        });
        return response.data.data.map(res => ({
          id: res.name,
          article: res.article,
          date: res.creation.split(' ')[0],
          expectedAvailability: res.expected_availability || 'Pending',
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
        const response = await api.get('/api/method/library_management.api.get_reports');
        return response.data.message;
      } catch (error) {
        console.error("ERPNext API Failed (Reports). Falling back to mock data.", error);
      }
    }
    return mockReports;
  }
};
