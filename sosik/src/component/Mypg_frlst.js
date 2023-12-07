import React, { useState } from "react";
import "../../src/common/css/mypg_frlst.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import Pagination from '@mui/material/Pagination';
// import Stack from '@mui/material/Stack';

function MypgFrlst() {
  const [friendList, setFriendList] = useState([
    "친구1",
    "친구2",
    "친구3",
    "친구4",
    "친구5",
    "친구6",
    "친구7",
    "친구8",
    "친구9",
    "친구10",
    "친구11",
    "친구12",
    "친구13",
    "친구14",
    "친구15",
    "친구16",
    "친구17",
    "친구18",
    "친구19",
    "친구20",
    "친구21",
    "친구22",
    "친구23",
    "친구24",
    "친구25",
    "친구26",
    "친구27",
    "친구28",
    "친구29",
    "친구30",
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = friendList.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    
    <div className="mypgFrlst">
      <aside className="sidebar">
        <p>친구 목록</p>
        <div className="friend-list">
          <ul>
            {currentItems.map((friend, index) => (
              <li key={index}>{friend}</li>
            ))}
          </ul>
          <ul className="pagination">
            {[...Array(Math.ceil(friendList.length / itemsPerPage))].map(
              (_, index) => (
                <li key={index}>
                  <button onClick={() => paginate(index + 1)}>
                    {index + 1}
                  </button>
                </li>
              )
            )}
            {/* <Stack spacing={2}>
              <Pagination count={10} />
              <Pagination count={10} color="primary" />
              <Pagination count={10} color="secondary" />
              <Pagination count={10} disabled />
            </Stack> */}
          </ul>
        </div>
      </aside>
    </div>
  );
}

export default MypgFrlst;
