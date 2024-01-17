import React from "react";
import Notifications from "react-notifications-menu";
import logo from "../../../images/logo.png"

const NotificationList = () => {

  return (
    <Notifications
      data={[
        {
          image: "logo",
          message: 'Kameshwaran S had shared a feedback with you.',
          detailPage: '/',
        },
        {
          image: logo,
          message: (
            <p>
              Kameshwaran S had shared a{' '}
              <span style={{ color: '#7ac2fa' }}>feedback</span> with you.
            </p>
          ),
          detailPage: '/',
        },
        {
          image: logo,
          message: (
            <p>
              Kameshwaran S had shared a{' '}
              <span style={{ color: '#7ac2fa' }}>feedback</span> with you.
            </p>
          ),
          detailPage: '/',
        },
        {
          image: logo,
          message: (
            <p>
              Kameshwaran S had shared a{' '}
              <span style={{ color: '#7ac2fa' }}>feedback</span> with you.
            </p>
          ),
          detailPage: '/',
        },
      ]}
      header={{
        title: 'Notifications',
        option: { text: 'View All', onClick: () => console.log('Clicked') },

      }}
    // icon={
    //   <FontAwesomeIcon icon={faBell} style={{color: "#1c8d6b"}} />
    // }

    />
  );
};


export default NotificationList;