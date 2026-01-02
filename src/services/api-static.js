// Static API Service - Using local JSON data
import dbData from '../../db.json';

class StaticApiService {
  constructor() {
    this.data = dbData;
  }

  // Simulate async behavior
  async delay(ms = 500) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Posts API
  async getPosts(filters = {}) {
    await this.delay(); // Simulate network delay
    
    const { page = 1, limit = 42 } = filters;
    const offset = (page - 1) * limit;
    
    let result = [...this.data.posts];
    
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
    await this.delay(200);
    return this.data.posts.find(post => post.id === parseInt(id));
  }

  async getCategories() {
    await this.delay(200);
    return this.data.categories;
  }

  async getCities() {
    await this.delay(200);
    return this.data.cities;
  }
}

export default new StaticApiService();