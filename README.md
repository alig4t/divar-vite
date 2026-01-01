# Divar Clone - Modernized React Application

A modernized classified ads platform built with React, featuring a clean architecture and mock backend.

## 🚀 Features

- **Modern React Architecture**: Uses React 18 with hooks and functional components
- **Lazy Loading**: All pages are lazy-loaded for better performance
- **Mock Backend**: JSON Server for local development (replaces Supabase)
- **Clean Code**: Refactored for better maintainability and readability
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Authentication**: Mock authentication system
- **File Upload**: Mock file upload with preview functionality

## 🛠 Tech Stack

- **Frontend**: React 18, React Router DOM
- **Styling**: Tailwind CSS, Material Tailwind
- **Backend**: JSON Server (Mock API)
- **Build Tool**: Vite
- **Icons**: React Icons
- **File Upload**: React Dropzone

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd divar-vite
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development servers**
   ```bash
   # Start both frontend and mock backend
   npm run dev:full
   
   # Or start them separately:
   # Terminal 1: Mock backend
   npm run mock-server
   
   # Terminal 2: Frontend
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:5173
   - Mock API: http://localhost:3001

## 🏗 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Posts/          # Post listing components
│   ├── Navbar/         # Navigation components
│   ├── UI/             # Generic UI components
│   └── HOC/            # Higher-order components
├── pages/              # Page components (lazy-loaded)
│   ├── Home/
│   ├── Login/
│   ├── NewPost/
│   └── index.js        # Lazy loading exports
├── services/           # API service layer
│   └── api.js          # Mock API service
├── context/            # React context providers
├── helper/             # Utility functions
├── JsonFiles/          # Static data files
└── assets/             # Static assets
```

## 🔧 API Service Layer

The application uses a service layer (`src/services/api.js`) that abstracts API calls:

```javascript
import apiService from './services/api';

// Get posts
const posts = await apiService.getPosts();

// Create post
const newPost = await apiService.createPost(postData);

// Authentication
await apiService.signIn(email, password);
```

## 🎯 Key Improvements

### 1. **Supabase Replacement**
- Removed Supabase dependencies
- Implemented JSON Server for local development
- Created API service layer for easy backend switching

### 2. **Performance Optimizations**
- Lazy loading for all pages
- Optimized imports
- Memoized components where appropriate

### 3. **Code Quality**
- Removed unused imports and code
- Consistent code formatting
- Better error handling
- Modern React patterns

### 4. **Architecture**
- Separated concerns (UI/Logic/Services)
- Service layer abstraction
- Clean component structure

## 🔐 Authentication

The app includes a mock authentication system:

- **Login**: Use any email/password combination
- **Session**: Stored in localStorage
- **Protected Routes**: Use `WithAuthCheck` HOC

## 📝 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run mock-server  # Start JSON server
npm run dev:full     # Start both frontend and backend
```

## 🗄 Mock Data

The mock backend (`db.json`) includes:
- Sample posts with images and details
- User accounts for authentication
- Proper data structure matching the original Supabase schema

## 🚀 Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your hosting service

3. **For production**, replace the mock API with a real backend service

## 🔄 Migration from Supabase

The application maintains the same API interface as the original Supabase implementation, making it easy to switch back to a real backend:

1. Update `src/services/api.js` with real API endpoints
2. Replace mock authentication with real auth service
3. Update file upload to use real storage service

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.