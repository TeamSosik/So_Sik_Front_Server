import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast';
import './notification.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

function NotificationList() {
  const [showA, setShowA] = useState(false);

  const toggleShowA = () => setShowA(!showA);

  return (
    <>
      <Button onClick={toggleShowA} className="notification-btn" variant="link" >
        <FontAwesomeIcon icon={faBell} size="lg" style={{ color: "#59BD82" }} cursor={"pointer"} />
      </Button>
      <Toast show={showA} onClose={toggleShowA} className="notification-toast">
        <Toast.Header>
          <strong className="me-auto">알림</strong>
          <small>11 mins ago</small>
        </Toast.Header>
        <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
      </Toast>
    </>
  );
}

export default NotificationList;