import { Suspense } from 'react';
import { Routes, Route } from "react-router-dom";

import './App.css';

import { ContextProvider } from './context/SiteContext';
import { Home, Login, Single, SelectCity, Dashboard, NewPost } from './pages';

// Loading component for Suspense
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-500"></div>
  </div>
);

function App() {
  return (
    <ContextProvider>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path='/' element={<SelectCity />} />
          <Route path='/new' element={<NewPost />} />
          <Route path='/s/:city/:cat?' element={<Home />} />
          <Route path='/v/:code/:title?' element={<Single />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='*' element={<div className="text-center mt-20"><h1>صفحه یافت نشد</h1></div>} />
        </Routes>
      </Suspense>
    </ContextProvider> 
  );
}

export default App;
