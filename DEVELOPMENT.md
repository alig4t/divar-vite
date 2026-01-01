# Development Guide

## 🚀 Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development environment**
   ```bash
   npm run dev:full
   ```
   This starts both the mock API server (port 3001) and the React dev server (port 5173).

## 🏗 Architecture Overview

### Service Layer
The application uses a service layer pattern to abstract API calls:

```
src/services/api.js - Main API service
src/config.jsx - Backward compatibility layer
```

### Component Structure
```
src/
├── components/
│   ├── Posts/          # Post listing and display
│   ├── Navbar/         # Navigation components  
│   ├── Sidebar/        # Sidebar and drawer components
│   ├── UI/             # Reusable UI components
│   ├── Layout/         # Layout wrappers
│   ├── Single/         # Single post view components
│   └── HOC/            # Higher-order components
├── pages/              # Route components (lazy-loaded)
├── context/            # React context providers
├── services/           # API and external services
├── helper/             # Utility functions
└── JsonFiles/          # Static configuration data
```

### Data Flow
1. **Pages** use **Context** for global state
2. **Components** call **API Service** for data
3. **API Service** communicates with **Mock Backend**
4. **HOC** handles authentication logic

## 🔧 Mock Backend

### JSON Server Configuration
- **File**: `db.json`
- **Port**: 3001
- **Endpoints**:
  - `GET /posts` - List all posts
  - `GET /posts/:id` - Get single post
  - `POST /posts` - Create new post
  - `GET /users` - List users

### Data Structure
```json
{
  "posts": [
    {
      "id": 1,
      "code": "unique-code",
      "title": "Post title",
      "category": "category-slug",
      "description": "Post description",
      "images": ["url1", "url2"],
      "location": {
        "city": "City name",
        "mahal": "District name"
      },
      "postDetail": {
        "status": { "type": "number", "value": "85", "unit": "متر" },
        "featured": [{ "title": "Feature", "value": "Value" }],
        "datas": [{ "title": "Data", "value": "Value" }],
        "price": [{ "title": "Price", "value": "5500000000" }]
      },
      "author": "user-id",
      "created_at": "2024-01-15T10:30:00Z"
    }
  ]
}
```

## 🔐 Authentication System

### Mock Authentication
- **Storage**: localStorage
- **Session Key**: `mockSession`
- **Default Users**: Defined in `db.json`

### Usage
```javascript
import apiService from './services/api';

// Sign in
await apiService.signIn('user@example.com', 'password');

// Get current session
const session = apiService.getSession();

// Sign out
await apiService.signOut();
```

### Protected Routes
Use the `WithAuthCheck` HOC:
```javascript
import WithAuthCheck from './components/HOC/WithAuthCheck';

const ProtectedComponent = (props) => {
  // props.user contains the authenticated user
  return <div>Protected content</div>;
};

export default WithAuthCheck(ProtectedComponent);
```

## 📱 Lazy Loading

All pages are lazy-loaded for better performance:

```javascript
// src/pages/index.js
import { lazy } from 'react';

export const Home = lazy(() => import('./Home/Home'));
export const Login = lazy(() => import('./Login/Login'));
// ... other pages
```

## 🎨 Styling

- **Framework**: Tailwind CSS
- **Components**: Material Tailwind
- **Icons**: React Icons
- **Responsive**: Mobile-first approach

### Custom Classes
Check `src/index.css` for custom utility classes and component styles.

## 🧪 Testing the Application

### Manual Testing Checklist
1. **Navigation**
   - [ ] City selection works
   - [ ] Category filtering works
   - [ ] Search functionality works

2. **Authentication**
   - [ ] Login with any email/password
   - [ ] Logout functionality
   - [ ] Protected routes redirect to login

3. **Posts**
   - [ ] Post listing displays correctly
   - [ ] Single post view works
   - [ ] Create new post (requires login)

4. **Responsive Design**
   - [ ] Mobile navigation works
   - [ ] Layouts adapt to screen size
   - [ ] Touch interactions work

## 🔄 Switching to Real Backend

To replace the mock backend with a real API:

1. **Update API Service** (`src/services/api.js`):
   ```javascript
   constructor() {
     this.baseURL = 'https://your-real-api.com/api';
   }
   ```

2. **Update Authentication**:
   - Replace mock auth with real auth service
   - Update session management
   - Handle real JWT tokens

3. **Update File Upload**:
   - Replace mock upload with real storage service
   - Handle real file URLs

4. **Database Schema**:
   - Ensure your backend matches the expected data structure
   - Update API endpoints as needed

## 🐛 Common Issues

### Mock Server Not Starting
```bash
# Check if port 3001 is available
netstat -an | grep 3001

# Kill process using port 3001
npx kill-port 3001

# Restart mock server
npm run mock-server
```

### Build Issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf node_modules/.vite
```

### Authentication Issues
```bash
# Clear localStorage in browser dev tools
localStorage.clear()

# Or programmatically
apiService.signOut()
```

## 📦 Adding New Features

### Adding a New Page
1. Create component in `src/pages/NewPage/`
2. Add lazy import to `src/pages/index.js`
3. Add route to `src/App.jsx`
4. Add navigation links as needed

### Adding API Endpoints
1. Update `src/services/api.js` with new methods
2. Add corresponding data to `db.json`
3. Update TypeScript types if using TypeScript

### Adding New Components
1. Create in appropriate `src/components/` subdirectory
2. Follow existing patterns for props and styling
3. Add to relevant parent components

## 🚀 Performance Tips

1. **Lazy Loading**: Already implemented for pages
2. **Image Optimization**: Consider adding image optimization
3. **Bundle Analysis**: Use `npm run build` and analyze bundle size
4. **Memoization**: Components are memoized where appropriate
5. **Code Splitting**: Consider splitting large components

## 📚 Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Material Tailwind](https://www.material-tailwind.com/)
- [JSON Server](https://github.com/typicode/json-server)