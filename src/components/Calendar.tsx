import React from "react";
import { IonDatetime, IonDatetimeButton, IonModal } from '@ionic/react';
import './Calendar.scss';
import Schedulerblock from "./schedulerblock";
import calendardata from "./calendardata";

const Calendar: React.FC = () => {
    
    const today = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const day = today.getDate();
    const month = monthNames[today.getMonth()];

    function propcomp(comp: { timeblock: string; lecturetype: string; lectureaddress: string; lecturename: string; lectureimings: string; }){
        return(
            <Schedulerblock timeblock= {comp.timeblock}
                            lecturetype= {comp.lecturetype}
                            lectureaddress= {comp.lectureaddress}
                            lecturename=  {comp.lecturename}
                            lecturetimings={comp.lectureimings}
            ></Schedulerblock>
        )
    }
    return (
        <div className="calendar-component">
            <div className="present-date">
                <p className="date-text">Today, {day} {month}</p>
            </div>
            {calendardata.map(propcomp)}
        </div>
    );
};

export default Calendar;