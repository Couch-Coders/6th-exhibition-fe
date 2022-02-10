import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Banner from './components/Banner/Banner';
import MyPage from './pages/MyPage';
import Main from './pages/Main'
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {AuthProvider} from './modules/AuthProvider'
import GlobalStyle from './common/GlobalStyle'

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <Router basename='/pages'>
        <GlobalStyle/>
        <App>
          <Banner/>
          <Routes>
            <Route path='/' element={<Main/>}/>
            <Route path='/mypage' element={<MyPage/>}/>
        </Routes>
        </App>
      </Router>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
