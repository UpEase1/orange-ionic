import React from "react";
import { IonDatetime, IonDatetimeButton, IonModal } from '@ionic/react';
import './Calendar.scss';
import Schedulerblock from "./schedulerblock";
import CalendarData from "./CalendarData";

const Calendar: React.FC = () => {
    
    const today = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const day = today.getDate();
    const month = monthNames[today.getMonth()];

    return (
        <div className="calendar-component">
            <div className="present-date">
                <p className="date-text">Today, {day} {month}</p>
            </div>
            {CalendarData.map(({ timeblock, lecturetype, lectureaddress, lecturename, lecturetimings }) => (
     <Schedulerblock timeblock= {timeblock}
                     lecturetype= {lecturetype}
                     lectureaddress= {lectureaddress}
                     lecturename=  {lecturename}
                    lecturetimings={lecturetimings}
     ></Schedulerblock>
 ))}
        </div>
    );
};

export default Calendar;