import './App.css';
import Feed from './component/Feed/Feed';

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

  

  return (
    <div className="App">
        {FeedList}
    </div>
  );
}

export default App;
