import React, { useState } from "react";
import "./freeboardlist.css";
import FreeBoardCard from "./FreeBoardCard";

const data = [
  {
    id: 0,
    title: "다이어트중인데 떡볶이가 먹고 싶어요",
    nickname: "떠뽀끼",
    created_date: "2023-12-07",
    views: "6",
    comments: "14",
  },
  {
    id: 1,
    title: "다이어트중인데 떡볶이가 먹고 싶어요",
    nickname: "떠뽀끼",
    created_date: "2023-12-07",
    views: "6",
    comments: "14",
  },

  {
    id: 2,
    title: "다이어트중인데 떡볶이가 먹고 싶어요",
    nickname: "떠뽀끼",
    created_date: "2023-12-07",
    views: "6",
    comments: "14",
  },
  {
    id: 3,
    title: "다이어트중인데 떡볶이가 먹고 싶어요",
    nickname: "떠뽀끼",
    created_date: "2023-12-07",
    views: "6",
    comments: "14",
  },
  {
    id: 4,
    title: "다이어트중인데 떡볶이가 먹고 싶어요",
    nickname: "떠뽀끼",
    created_date: "2023-12-07",
    views: "6",
    comments: "14",
  },

  {
    id: 5,
    title: "다이어트중인데 떡볶이가 먹고 싶어요",
    nickname: "떠뽀끼",
    created_date: "2023-12-07",
    views: "6",
    comments: "14",
  },
  {
    id: 6,
    title: "다이어트중인데 떡볶이가 먹고 싶어요",
    nickname: "떠뽀끼",
    created_date: "2023-12-07",
    views: "6",
    comments: "14",
  },
];

const FreeBoardList = () => {
  const [free, setFree] = useState(data);

  return (
    <div className="freeboard-list">
      {free.map((a, i) => {
        return <FreeBoardCard content={a} key={i} />;
      })}
    </div>
  );
};

export default FreeBoardList;
