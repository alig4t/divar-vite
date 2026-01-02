// Static API Service - Using local JSON data
import dbData from '../../db.json';

// District mapping from DefaultFilters.json
const DISTRICT_MAPPING = {
  12: "آجودانیه",
  13: "آذربایجان", 
  14: "اختیاریه",
  15: "تهران‌ویلا",
  16: "قیطریه",
  17: "ولنجک",
  18: "نیاوران",
  19: "فرمانیه",
  20: "زعفرانیه",
  21: "کامرانیه",
  31: "باغ نگار",
  32: "بهاران",
  43: "فرهنگ",
  53: "گیشا",
  63: "مولوی",
  73: "سعادت آباد",
  83: "جمهوری",
  84: "خیابان چهارباغ"
};

class StaticApiService {
  constructor() {
    this.data = dbData;
    console.log('Static API: Data loaded directly', {
      posts: this.data?.posts?.length || 0,
      categories: this.data?.categories?.length || 0,
      cities: this.data?.cities?.length || 0
    });
  }

  // Simulate async behavior
  async delay(ms = 500) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Posts API
  async getPosts(filters = {}) {
    await this.delay(); // Simulate network delay
    
    console.log('Static API: getPosts called with filters:', filters);
    console.log('Static API: Available posts:', this.data?.posts?.length || 0);
    
    const { page = 1, limit = 42 } = filters;
    const offset = (page - 1) * limit;
    
    let result = [...(this.data?.posts || [])];
    
    // Apply search filter first
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      console.log('Static API: Search term:', searchTerm);
      
      result = result.filter(post => 
        post.title?.toLowerCase().includes(searchTerm) ||
        post.description?.toLowerCase().includes(searchTerm)
      );
      console.log('Static API: After search filter:', result.length);
    }
    
    // Apply city filter
    if (filters.city) {
      result = result.filter(post => post.location?.city === filters.city);
      console.log('Static API: After city filter:', result.length);
    }
    
    // Apply category filter
    if (filters.category) {
      result = result.filter(post => post.category === filters.category);
    } else if (filters.categories && filters.categories.length > 0) {
      result = result.filter(post => filters.categories.includes(post.category));
    }
    
    // Apply neighborhood filter
    if (filters.districts) {
      const districtIds = filters.districts.split(',').map(id => parseInt(id));
      const districtNames = districtIds.map(id => DISTRICT_MAPPING[id]).filter(Boolean);
      
      console.log('Static API: District IDs:', districtIds);
      console.log('Static API: District Names:', districtNames);
      
      result = result.filter(post => 
        districtNames.includes(post.location?.mahal)
      );
      console.log('Static API: After district filter:', result.length);
    }
    
    // Apply price filter
    if (filters.price) {
      console.log('Static API: Raw price filter:', filters.price);
      
      let min, max;
      if (filters.price.endsWith('-')) {
        // Format: "200000000-" means "200M and above"
        min = parseInt(filters.price.replace('-', ''));
        max = Infinity;
      } else if (filters.price.startsWith('-')) {
        // Format: "-200000000" means "up to 200M"
        min = 0;
        max = parseInt(filters.price.replace('-', ''));
      } else {
        // Format: "100000000-200000000" means "between 100M and 200M"
        const parts = filters.price.split('-');
        min = parseInt(parts[0]) || 0;
        max = parseInt(parts[1]) || Infinity;
      }
      
      console.log('Static API: Price filter range:', min, 'to', max === Infinity ? 'infinity' : max);
      
      let priceFilteredCount = 0;
      result = result.filter(post => {
        // Price is stored in post.postDetail.price[0].value
        const priceValue = post.postDetail?.price?.[0]?.value;
        const price = parseInt(priceValue || 0);
        const inRange = price >= min && price <= max;
        
        if (priceFilteredCount < 5) { // Log first 5 posts for debugging
          console.log(`Static API: Post ${post.id} price: ${price}, min: ${min}, max: ${max === Infinity ? 'infinity' : max}, in range: ${inRange}`);
          priceFilteredCount++;
        }
        
        return inRange;
      });
      
      console.log('Static API: After price filter:', result.length);
    }
    
    const total = result.length;
    const paginatedResult = result.slice(offset, offset + limit);
    
    console.log('Static API: Returning posts:', paginatedResult.length, 'of', total);
    
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
    return this.data?.posts?.find(post => post.id === parseInt(id));
  }

  async getPostByCode(code) {
    await this.delay(200);
    console.log('Static API: getPostByCode called with code:', code);
    const post = this.data?.posts?.find(post => post.code === code);
    console.log('Static API: Found post:', post ? `${post.id} - ${post.title}` : 'Not found');
    return post;
  }

  async getCategories() {
    await this.delay(200);
    return this.data?.categories || [];
  }

  async getCities() {
    await this.delay(200);
    return this.data?.cities || [];
  }
}

export default new StaticApiService();