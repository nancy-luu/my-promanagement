// import { useState } from 'react';
// import { months } from "../../util/generateDate";
import dayjs from "dayjs";

// styles
import './Meeting.css';

const Meeting = ({ meeting }) => {

  const startTime = (dayjs(meeting.start)).format('h:mm A');
  const endTime = (dayjs(meeting.end)).format('h:mm A');

  console.log(meeting.id)


  return (
    <div className="meeting-container">
        <p className="meeting-title">{meeting.title}</p>
        <p>{startTime} - {endTime}</p>
    </div>
  )
}

export default Meeting
