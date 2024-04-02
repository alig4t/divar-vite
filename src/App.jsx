import React from 'react';
import { Routes, Route } from "react-router-dom"

import './App.css'

import Home from "./pages/Home/Home"
import Login from './pages/Login/Login';
import Single from './pages/Single/Single';
import SelectCity from './pages/SelectCity/SelectCity';
import Dashboard from './pages/Dashboard/Dashboard';
import NewPost from './pages/NewPost/NewPost';

import { ContextProvider } from './context/SiteContext';

function App() {
  return (
      <ContextProvider>
        <Routes>
          <Route path='/' element={<SelectCity />} />
          <Route path='/new' element={<NewPost />} />
          <Route path='/s/:city/:cat?' element={<Home />} />
          <Route path='/v/:code/:title?' element={<Single />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='*' element={<h1>nothing</h1>} />
        </Routes>
      </ContextProvider> 
  )
}

export default App
