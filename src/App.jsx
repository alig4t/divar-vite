import React from 'react';
import './App.css'

import Home from "./pages/Home/Home"

import { Routes, Route } from "react-router-dom"
import { ContextProvider } from './context/SiteContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Login from './pages/Login/Login';

function App() {

  return (
    <>
    <GoogleOAuthProvider clientId='43882728349-gg9scue8fuf99cvorrvac1tv9q5gtf3b.apps.googleusercontent.com'>

      <ContextProvider>
        <Routes>
          <Route path='/s/:city/:cat?' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<h1>nothing</h1>} />
        </Routes>
      </ContextProvider>
    </GoogleOAuthProvider>
    </>
  )
}

export default App
