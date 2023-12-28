import React from "react";
import "./Notifications.scss";

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      message:
        "Notice: Initiation of best research performance for UG and PG ( MTech/ MCA/MSc) students in MIT. This award will be given on Research Day at MIT. The last date of submission is 8th March 2023",
    },
    {
      id: 2,
      message:
        "Seat Allocation - JAN 14- FIRST SEM BTECH- ENGG.MATHEMATICS_(CHEMISTRY GROUP AND REREGISTERED STUDENTS)- 2.30 PM - 5.30 PM",
    },
    {
      id: 3,
      message:
        "Notice: Initiation of best research performance for UG and PG ( MTech/ MCA/MSc) students in MIT. This award will be given on Research Day at MIT. The last date of submission is 8th March 2023",
    },
    { id: 4, message: "Seat Allocation - JAN 14- FIRST SEM BTECH- ENGG.MATHEMATICS_(CHEMISTRY GROUP AND REREGISTERED STUDENTS)- 2.30 PM - 5.30 PM" },
    { id: 5, message: "Notice: Initiation of best research performance for UG and PG ( MTech/ MCA/MSc) students in MIT. This award will be given on Research Day at MIT. The last date of submission is 8th March 2023" },
    { id: 6, message: "Your order has been shipped" },
    { id: 7, message: "Seat Allocation - JAN 14- FIRST SEM BTECH- ENGG.MATHEMATICS_(CHEMISTRY GROUP AND REREGISTERED STUDENTS)- 2.30 PM - 5.30 PM" },
    { id: 8, message: "Your order has been shipped" },
  ];

  return (
    <div className="notifications-container">
      <h3 className="notifications-heading">Notifications</h3>
      <ul className="notifications-list">
        {notifications.map((notification) => (
          <li key={notification.id} className="notifications-item">
            {notification.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
