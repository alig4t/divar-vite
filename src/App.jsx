import React from 'react';
import './App.css'

import Home from "./pages/Home/Home"

import { Routes, Route, useNavigate } from "react-router-dom"
import { ContextProvider } from './context/SiteContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Login from './pages/Login/Login';
import Single from './pages/Single/Single';
import SelectCity from './pages/SelectCity/SelectCity';
import Login2 from './pages/Login/Login2';
import Dashboard from './pages/Dashboard/Dashboard';
import NewPost from './pages/NewPost/NewPost';

function App() {
  return (
    <>
    <GoogleOAuthProvider clientId='43882728349-gg9scue8fuf99cvorrvac1tv9q5gtf3b.apps.googleusercontent.com'>

      <ContextProvider>
        <Routes>
          <Route path='/' element={<SelectCity />} />
          <Route path='/new' element={<NewPost />} />
          <Route path='/s/:city/:cat?' element={<Home />} />
          <Route path='/v/:code/:title?' element={<Single />} />
          <Route path='/login' element={<Login />} />
          <Route path='/login2' element={<Login2 />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='*' element={<h1>nothing</h1>} />
        </Routes>
      </ContextProvider>
    </GoogleOAuthProvider>
    </>
  )
}

export default App
