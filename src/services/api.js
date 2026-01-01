// API Service Layer - Mock Backend
const API_BASE_URL = 'http://localhost:3001';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Posts API
  async getPosts(filters = {}) {
    const { page = 1, limit = 40 } = filters;
    const offset = (page - 1) * limit;
    
    // Always fetch all posts first since we need to filter by city/neighborhood
    const allPosts = await this.request('/posts?_sort=created_at&_order=desc');
    
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
    
    // Apply search filter
    if (filters.search) {
      result = result.filter(post => 
        post.title.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Apply neighborhood filter
    if (filters.districts) {
      const districtIds = filters.districts.split(',').map(id => parseInt(id));
      const districtMap = {
        12: 'آجودانیه', 13: 'آذربایجان', 14: 'اختیاریه', 15: 'تهران‌ویلا', 16: 'قیطریه',
        17: 'ولنجک', 18: 'نیاوران', 19: 'فرمانیه', 20: 'زعفرانیه', 21: 'کامرانیه',
        31: 'باغ نگار', 32: 'بهاران', 43: 'فرهنگ', 53: 'گیشا', 63: 'مولوی',
        73: 'سعادت آباد', 83: 'جمهوری', 84: 'خیابان چهارباغ'
      };
      
      const selectedNeighborhoods = districtIds.map(id => districtMap[id]).filter(Boolean);
      result = result.filter(post => 
        selectedNeighborhoods.some(neighborhood => 
          post.location?.mahal?.includes(neighborhood)
        )
      );
    }

    // Apply price filter
    if (filters.price) {
      result = this.applyPriceFilter(result, filters.price);
    }
    
    // Apply pagination
    const total = result.length;
    const paginatedResult = result.slice(offset, offset + limit);
    
    const response = {
      posts: paginatedResult,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasMore: offset + limit < total
      }
    };
    
    return response;
  }

  // Helper method to apply price filtering
  applyPriceFilter(posts, priceFilter) {
    const [minPrice, maxPrice] = priceFilter.split('-');
    
    return posts.filter(post => {
      if (!post.postDetail?.price || post.postDetail.price.length === 0) {
        return false;
      }
      
      // Get the main price value (first price entry)
      const postPrice = parseInt(post.postDetail.price[0].value);
      
      if (minPrice && maxPrice) {
        return postPrice >= parseInt(minPrice) && postPrice <= parseInt(maxPrice);
      } else if (minPrice) {
        return postPrice >= parseInt(minPrice);
      } else if (maxPrice) {
        return postPrice <= parseInt(maxPrice);
      }
      
      return true;
    });
  }

  async getPostByCode(code) {
    const posts = await this.request('/posts');
    return posts.find(post => post.code === code);
  }

  async createPost(postData) {
    return this.request('/posts', {
      method: 'POST',
      body: JSON.stringify(postData),
    });
  }

  async updatePost(id, postData) {
    return this.request(`/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(postData),
    });
  }

  async deletePost(id) {
    return this.request(`/posts/${id}`, {
      method: 'DELETE',
    });
  }

  // Auth API (Mock)
  async signIn(email, password) {
    // Mock authentication - in real app this would validate credentials
    const users = await this.request('/users');
    const user = users.find(u => u.email === email);
    
    if (user) {
      // Store mock session
      localStorage.setItem('mockSession', JSON.stringify({
        user,
        access_token: 'mock-token-' + Date.now(),
        expires_at: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
      }));
      return { user, session: this.getSession() };
    }
    
    throw new Error('Invalid credentials');
  }

  async signUp(email, password) {
    // Mock user creation
    const newUser = {
      id: 'user' + Date.now(),
      email,
      created_at: new Date().toISOString()
    };
    
    await this.request('/users', {
      method: 'POST',
      body: JSON.stringify(newUser),
    });

    return this.signIn(email, password);
  }

  async signOut() {
    localStorage.removeItem('mockSession');
    return { error: null };
  }

  getSession() {
    const sessionData = localStorage.getItem('mockSession');
    if (!sessionData) return null;
    
    const session = JSON.parse(sessionData);
    if (session.expires_at < Date.now()) {
      localStorage.removeItem('mockSession');
      return null;
    }
    
    return session;
  }

  onAuthStateChange(callback) {
    // Mock auth state change listener
    const checkAuth = () => {
      const session = this.getSession();
      callback('SIGNED_IN', session);
    };

    // Check immediately
    checkAuth();

    // Return unsubscribe function
    return {
      unsubscribe: () => {
        // Mock unsubscribe
      }
    };
  }

  // Storage API (Mock)
  async uploadFile(bucket, path, file) {
    // Mock file upload - in real app this would upload to a service
    const mockUrl = `https://via.placeholder.com/400x300/0066cc/ffffff?text=${encodeURIComponent(file.name)}`;
    return {
      data: {
        fullPath: `${bucket}/${path}`,
        path: path
      },
      publicUrl: mockUrl
    };
  }

  getPublicUrl(bucket, path) {
    return `https://via.placeholder.com/400x300/0066cc/ffffff?text=Mock+Image`;
  }
}

export const apiService = new ApiService();
export default apiService;