import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Navbar from './components/Navabar/Navbar';
import Member from './components/Member';
import Main from './components/Main'
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {AuthProvider} from './components/AuthProvider'

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <Router basename='/pages'>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Main/>}/>
          <Route path='/member/me' element={<Member/>}/>
        </Routes>
      </Router>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
