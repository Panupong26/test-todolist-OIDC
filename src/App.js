import React from 'react';
import './App.css';
import { useState } from 'react';
import localstorage from './tokenCheck/localstorage'
import { Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './page/LoginPage';
import RegisterPage from './page/RegisterPage';
import ListPage from './page/ListPage';
import ProfilePage from './page/ProfilePage';
import KeycloakLoginPage from './page/KeycloakLoginPage';

 


function App() {
  const [status, setStatus] = useState(localstorage.getStatus());

  return (
    <>
      {status === 'guest' && 
        <Routes>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/keycloaklogin' element={<KeycloakLoginPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='*' element={<Navigate to={'/login'}/>}/>
        </Routes>
      }
      {status === 'user' && 
        <Routes>
          <Route path='/profile' element={<ProfilePage/>}/>
          <Route path='/list' element={<ListPage/>}/>
          <Route path='*' element={<Navigate to={'/profile'}/>}/>
        </Routes>
      }
    </>
  )
}

export default App ;