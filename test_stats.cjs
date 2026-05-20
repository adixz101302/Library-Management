const axios = require('axios');
const api = axios.create({
  baseURL: 'http://dcode.com:8000',
  headers: {
    'Authorization': 'token 7db28f0ba9fca3c:42ac2d8f94da53a'
  }
});
async function test() {
  try {
        const [booksRes, circRes] = await Promise.all([
          api.get('/api/resource/Article', {
            params: { fields: '["available"]', limit_page_length: 500 }
          }),
          api.get('/api/resource/Issue Record', {
            params: { fields: '["status"]', limit_page_length: 500 }
          })
        ]);
        console.log("Books length:", booksRes.data.data.length);
        console.log("Circ length:", circRes.data.data.length);
  } catch (error) {
     console.error(error.response ? error.response.data : error.message);
  }
}
test();
