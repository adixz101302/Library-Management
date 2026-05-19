export const academicBooks = [
  { 
    id: '1', 
    title: 'Artificial Intelligence: A Modern Approach', 
    author: 'Stuart Russell, Peter Norvig', 
    category: 'Computer Science', 
    status: 'Available', 
    coverImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=400' 
  },
  { 
    id: '2', 
    title: 'Introduction to Algorithms', 
    author: 'Thomas H. Cormen', 
    category: 'Computer Science', 
    status: 'Issued', 
    coverImage: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=400' 
  },
  { 
    id: '3', 
    title: 'Database System Concepts', 
    author: 'Abraham Silberschatz', 
    category: 'Information Technology', 
    status: 'Reserved', 
    coverImage: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=400' 
  },
  { 
    id: '4', 
    title: 'Cloud Computing Architecture', 
    author: 'Thomas Erl', 
    category: 'Information Technology', 
    status: 'Available', 
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=400' 
  },
  { 
    id: '5', 
    title: 'Python for Data Analysis', 
    author: 'Wes McKinney', 
    category: 'Data Science', 
    status: 'Overdue', 
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=400' 
  },
  { 
    id: '6', 
    title: 'Computer Networks', 
    author: 'Andrew S. Tanenbaum', 
    category: 'Computer Science', 
    status: 'Available', 
    coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=400' 
  },
  { 
    id: '7', 
    title: 'Clean Architecture', 
    author: 'Robert C. Martin', 
    category: 'Software Engineering', 
    status: 'Issued', 
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=400' 
  },
  { 
    id: '8', 
    title: 'Machine Learning Yearning', 
    author: 'Andrew Ng', 
    category: 'Data Science', 
    status: 'Available', 
    coverImage: 'https://images.unsplash.com/photo-1527474305487-b87b222841cc?auto=format&fit=crop&q=80&w=400' 
  }
];

export const mockIssueRecords = [
  { member: 'John Doe', article: 'Introduction to Algorithms', status: 'Issued', returnDate: '2026-05-25' },
  { member: 'Jane Smith', article: 'Clean Architecture', status: 'Overdue', returnDate: '2026-05-15' },
  { member: 'Alan Turing', article: 'Python for Data Analysis', status: 'Overdue', returnDate: '2026-05-18' },
  { member: 'Grace Hopper', article: 'Database System Concepts', status: 'Reserved', returnDate: '-' }
];

export const mockReservations = [
  { id: 'RES-001', article: 'The Design of Everyday Things', date: '2026-05-18', expectedAvailability: '2026-05-22', status: 'Pending' },
  { id: 'RES-002', article: 'Database System Concepts', date: '2026-05-15', expectedAvailability: 'Available Now', status: 'Approved' },
  { id: 'RES-003', article: 'Clean Architecture', date: '2026-05-10', expectedAvailability: '-', status: 'Cancelled' }
];
