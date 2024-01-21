import { Route, Router, Switch } from 'react-router-dom';
import './App.css';
import Feed from './component/feed/Feed';
import Login from './component/member/loginform/Login';
import MyPage from './component/member/mypage/Mypage';
import PrivateRoute from './component/common/router/PrivateRoute';

function App() {
  
 const personList = [
      {
        name : "minu",
        nickname:"minu11",
        context:"안녕하세요"
      },
      {
        name : "minu",
        nickname:"minu12",
        context:"안녕하세요"
      },
      {
        name : "minu",
        nickname:"minu13",
        context:"안녕하세요"
      },
      {
        name : "minu",
        nickname:"minu13",
        context:"안녕하세요"
      },
      {
        name : "minu",
        nickname:"minu13",
        context:"안녕하세요"
      },
  ]

  const FeedList =  personList.map((a,b) => {
    return <Feed person={a}></Feed>
     
  })


  const isLoggedIn = () => {
    const token = sessionStorage.getItem('accesstoken'); // 여기서 'yourTokenKey'는 실제로 사용하는 토큰의 키입니다.
    
    // 토큰이 존재하는지 여부에 따라 로그인 상태 판단
    return token !== null;
  };

  

  return (
    <div className="App">
        {FeedList}
        
        <Router>
          <Switch>
          <Route path="/login" component={Login} />
          <PrivateRoute exact path="/mypage" component={MyPage} loggedIn={isLoggedIn} />
          </Switch>
        </Router>
    </div>
  );
}

export default App;
