import React from "react";
import { IonDatetime, IonDatetimeButton, IonModal } from '@ionic/react';
import './Calendar.scss';
import SchedulerBlock from "./SchedulerBlock";
import CalendarData from "./CalendarData";

const Calendar: React.FC = () => {
    
    const today = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const day = today.getDate();
    const month = monthNames[today.getMonth()];

    return (
        <div className="calendar-component">
            <h3 className="present-date">Today, {day} {month}</h3>
            {CalendarData.map(({ timeblock, lecturetype, lectureaddress, lecturename, lecturetimings }) => (
     <SchedulerBlock timeblock= {timeblock}
                     lecturetype= {lecturetype}
                     lectureaddress= {lectureaddress}
                     lecturename=  {lecturename}
                    lecturetimings={lecturetimings}
     ></SchedulerBlock>
 ))}
        </div>
    );
};

export default Calendar;
