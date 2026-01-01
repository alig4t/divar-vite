
// API Configuration - Mock Backend
import apiService from './services/api';

// Export the API service for backward compatibility
export const supabase = {
  // Posts API
  from: (table) => ({
    select: (columns = '*') => ({
      like: (column, pattern) => ({
        order: (column, options) => ({
          then: async (callback) => {
            try {
              const searchTerm = pattern.replace(/%/g, '');
              const data = await apiService.getPosts({ search: searchTerm });
              callback({ data, error: null });
            } catch (error) {
              callback({ data: null, error });
            }
          }
        })
      }),
      in: (column, values) => ({
        order: (column, options) => ({
          then: async (callback) => {
            try {
              // For category filtering
              const data = await apiService.getPosts({ category: values[0] });
              callback({ data, error: null });
            } catch (error) {
              callback({ data: null, error });
            }
          }
        })
      }),
      order: (column, options) => ({
        then: async (callback) => {
          try {
            const data = await apiService.getPosts();
            callback({ data, error: null });
          } catch (error) {
            callback({ data: null, error });
          }
        }
      }),
      then: async (callback) => {
        try {
          const data = await apiService.getPosts();
          callback({ data, error: null });
        } catch (error) {
          callback({ data: null, error });
        }
      }
    }),
    insert: (data) => ({
      select: () => ({
        then: async (callback) => {
          try {
            const result = await apiService.createPost(data[0]);
            callback({ data: [result], error: null });
          } catch (error) {
            callback({ data: null, error });
          }
        }
      })
    })
  }),

  // Auth API
  auth: {
    getSession: () => {
      const session = apiService.getSession();
      return Promise.resolve({ data: { session } });
    },
    onAuthStateChange: (callback) => {
      return apiService.onAuthStateChange(callback);
    },
    signOut: () => apiService.signOut()
  },

  // Storage API
  storage: {
    from: (bucket) => ({
      upload: (path, file) => apiService.uploadFile(bucket, path, file)
    })
  }
};

export default apiService;

