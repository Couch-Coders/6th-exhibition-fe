import Banner from './components/Banner/Banner';
import MyPage from './pages/MyPage';
import MyLists from './pages/MyLists';
import Main from './pages/Main';
import Exhibition from './pages/Exhibition';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AuthProvider from './modules/AuthProvider';

function App() {
  return(
    <AuthProvider>
      <Router basename='/pages'>
        <Banner/>
          <Routes>
            <Route path = '/' element = {<Main/>}/>
            <Route path = '/exhibitions/:id' element = {<Exhibition/>} />
            <Route path = '/mypage' element = {<MyPage/>}/> 
            <Route path = '/mypage/likes' element = {<MyLists/>}/>
            <Route path = '/mypage/reviews' element = {<MyLists/>}/>
            {/* 회원 정보를 어디서 요청? <- 일단 로그인 되지 않은 사람은 접근 할 수 없도록 조정 필요 */}
          </Routes>
      </Router>
      </AuthProvider>
  )
}

export default App;