const axios = require('axios');
const api = axios.create({
  baseURL: 'http://dcode.com:8000',
  headers: {
    'Authorization': 'token 7db28f0ba9fca3c:42ac2d8f94da53a'
  }
});
async function getStats() {
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
        console.error("Failed:", error.response ? error.response.data : error.message);
        return "Failed";
      }
}
getStats().then(console.log);
