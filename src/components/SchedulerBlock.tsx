import React, { ReactNode } from "react";

type Calendarprops = {
        timeblock: string, 
        lecturetype : string, 
        lectureaddress : string,
        lecturename : string,
        lecturetimings : string
    }

const SchedulerBlock = (props : Calendarprops) => {
        return (
            <div className="scheduler-block">
                <div className="time-block">
                    {props.timeblock}
                </div>
                <div className="event-block">
                        <div className="event-block-top">
                        {props.lecturetype + ' ' + props.lectureaddress}
                        </div>
                        <div className="event-block-lecture-name">
                            {props.lecturename}
                        </div>
                        <div className="event-block-timings">
                            {props.lecturetimings}
                        </div>
                </div>
            </div>
        )
}

export default SchedulerBlock;


