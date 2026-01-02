// Production API Service - Using JSONBin.io
const API_BASE_URL = 'https://api.jsonbin.io/v3/b';
const BIN_ID = 'YOUR_BIN_ID'; // Replace with your actual bin ID
const API_KEY = 'YOUR_API_KEY'; // Replace with your actual API key

class ProductionApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.binId = BIN_ID;
    this.apiKey = API_KEY;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}/${this.binId}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': this.apiKey,
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.record || data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Posts API
  async getPosts(filters = {}) {
    const { page = 1, limit = 42 } = filters;
    const offset = (page - 1) * limit;
    
    // Get all posts from JSONBin
    const data = await this.request('');
    const allPosts = data.posts || [];
    
    let result = allPosts;
    
    // Apply city filter
    if (filters.city) {
      result = result.filter(post => post.location?.city === filters.city);
    }
    
    // Apply category filter
    if (filters.category) {
      result = result.filter(post => post.category === filters.category);
    } else if (filters.categories && filters.categories.length > 0) {
      result = result.filter(post => filters.categories.includes(post.category));
    }
    
    // Apply neighborhood filter
    if (filters.districts) {
      const districts = filters.districts.split(',');
      result = result.filter(post => 
        districts.includes(post.location?.neighborhood)
      );
    }
    
    // Apply price filter
    if (filters.price) {
      const [min, max] = filters.price.split('-').map(Number);
      result = result.filter(post => {
        const price = parseInt(post.price?.replace(/[^\d]/g, '') || 0);
        return price >= min && price <= max;
      });
    }
    
    const total = result.length;
    const paginatedResult = result.slice(offset, offset + limit);
    
    return {
      posts: paginatedResult,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasMore: offset + limit < total
      }
    };
  }

  async getPostById(id) {
    const data = await this.request('');
    const posts = data.posts || [];
    return posts.find(post => post.id === parseInt(id));
  }

  async getCategories() {
    const data = await this.request('');
    return data.categories || [];
  }

  async getCities() {
    const data = await this.request('');
    return data.cities || [];
  }
}

export default new ProductionApiService();