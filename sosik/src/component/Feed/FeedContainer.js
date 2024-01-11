import Feed from "./Feed";
import "./feedContainer.css";

function FeedContainer() {
  const personList = [
    {
      name: "minu",
      nickname: "minu11",
      context: "안녕하세요",
    },
    {
      name: "minu",
      nickname: "minu12",
      context: "안녕하세요",
    },
    {
      name: "minu",
      nickname: "minu13",
      context: "안녕하세요",
    },
    {
      name: "minu",
      nickname: "minu13",
      context: "안녕하세요",
    },
    {
      name: "minu",
      nickname: "minu13",
      context: "안녕하세요",
    },
  ];

  const FeedList = personList.map((a, b) => {
    return <Feed person={a}></Feed>;
  });

  return <div className="FeedContainer">{FeedList}</div>;
}

export default FeedContainer;
